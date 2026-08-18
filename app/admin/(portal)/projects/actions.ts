"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";

/**
 * Project editor — one action for create + update.
 * `intent` carries which button was pressed: "draft" → published=false,
 * "publish" → published=true (the design's Save Draft / Publish Changes).
 */



const projectInput = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and dashes only"),
  description: z.string().max(240),
  summary: z.string().max(240, "Summary must stay under 240 characters").optional(),
  tag: z.string().min(1),
  tagTone: z.enum(["sage", "clay"]),
  date: z.string().min(1),
  image: z.string().min(1),
  heroImage: z.string().min(1),
  byline: z.string().min(1),
  publishedOn: z.string().min(1),
  readTime: z.string().min(1),
  body: z.string().optional(), // TipTap HTML (name="body" hidden input)
  partners: z.string().min(1),
  location: z.string().min(1),
  timeline: z.string().min(1),
  status: z.string().min(1),
  statusTone: z.enum(["sage", "clay"]),
  technologies: z.string().min(1),
  paperJournal: z.string().optional(),
  paperUrl: z.string().optional(),
  published: z.coerce.boolean(),
  completion: z.coerce.number().min(0).max(100),
  publications: z.coerce.number().min(0),
  teamSize: z.coerce.number().min(0),
  partnerCount: z.coerce.number().min(0),
  leadResearcher: z.string().optional(),
  videoUrl: z.string().optional(),
  milestonesJson: z.string().optional(),
  publicationEntriesJson: z.string().optional(),
});

const milestoneSchema = z.array(
  z.object({ title: z.string(), date: z.string(), status: z.string() }),
);
const publicationSchema = z.array(
  z.object({ title: z.string(), journal: z.string(), status: z.string() }),
);

export async function saveProject(
  _prev: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const raw = Object.fromEntries(formData.entries());
  raw.published = formData.get("intent") === "publish" ? "true" : "false";

  const parsed = projectInput.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }
  const data = parsed.data;
  const {
    id,
    summary: _summary,
    milestonesJson: _mj,
    publicationEntriesJson: _pj,
    ...rest
  } = data;

  const headline =
    (formData.get("headline") as string)?.trim() || data.title;

  try {
    const milestones = milestoneSchema.safeParse(
    JSON.parse((formData.get("milestonesJson") as string) || "[]"),
  );
  const publications = publicationSchema.safeParse(
    JSON.parse((formData.get("publicationEntriesJson") as string) || "[]"),
  );

  const projectData = {
    ...rest,
    headline,
    body: (data.body || null) as never,
    paperJournal: data.paperJournal || null,
    paperUrl: data.paperUrl || null,
    leadResearcher: data.leadResearcher || null,
    videoUrl: data.videoUrl || null,
    milestones: (milestones.success ? milestones.data : []) as never,
    publicationEntries: (publications.success ? publications.data : []) as never,
  };

    if (id) {
      await db.project.update({ where: { id }, data: projectData });
    } else {
      await db.project.create({ data: { ...projectData, slug: data.slug } });
    }
  } catch (e) {
    if (e instanceof Error && e.message.includes("Unique")) {
      return { error: "That slug is already in use." };
    }
    throw e;
  }

  revalidateTag("projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
  redirect("/admin/projects");
}
