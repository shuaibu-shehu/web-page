"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";

/** Bulk operations from the articles table toolbar. */

const idsSchema = z.array(z.string()).min(1);

export async function bulkSetStatus(formData: FormData): Promise<void> {
  const ids = z.array(z.string()).min(1).safeParse(JSON.parse(String(formData.get("ids") ?? "[]")));
  const status = z.enum(["draft", "underReview", "published"]).safeParse(formData.get("status"));
  if (!ids.success || !status.success) return;

  await db.post.updateMany({ where: { id: { in: ids.data } }, data: { status: status.data } });
  revalidateTag("posts");
  revalidatePath("/blog");
}

export async function bulkDelete(formData: FormData): Promise<void> {
  const ids = z.array(z.string()).min(1).safeParse(JSON.parse(String(formData.get("ids") ?? "[]")));
  if (!ids.success) return;

  await db.post.deleteMany({ where: { id: { in: ids.data } } });
  revalidateTag("posts");
  revalidatePath("/blog");
}

const postInput = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and dashes only"),
  excerpt: z.string().min(1),
  category: z.string().min(1),
  categoryTone: z.enum(["sage", "clay"]),
  date: z.string().min(1),
  image: z.string().min(1),
  authorName: z.string().min(1),
  contentHtml: z.string().optional(),
  intent: z.enum(["draft", "publish"]),
});

export async function savePost(
  _prev: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const parsed = postInput.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }
  const { id, contentHtml, intent, ...data } = parsed.data;

  const postData = {
    ...data,
    // TipTap HTML (or null for an empty editor) — Json column accepts both.
    body: (contentHtml || null) as never,
    status: intent === "publish" ? "published" : "draft",
  };

  try {
    if (id) {
      await db.post.update({ where: { id }, data: postData });
    } else {
      await db.post.create({ data: { ...postData, slug: data.slug } });
    }
  } catch (e) {
    if (e instanceof Error && e.message.includes("Unique")) {
      return { error: "That slug is already in use." };
    }
    throw e;
  }

  revalidateTag("posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  redirect("/admin/articles");
}
