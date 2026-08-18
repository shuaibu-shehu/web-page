import { unstable_cache } from "next/cache";
import type { JsonValue } from "@prisma/client/runtime/library";
import { db } from "@/lib/db";

/**
 * Public content access. Every helper is wrapped in unstable_cache with its
 * revalidation tag, so the pages render as SSG (build-time HTML — Google
 * indexing unchanged) while admin saves revalidateTag(...) and the affected
 * pages regenerate within seconds. Pages may additionally set
 * `export const revalidate = 60` as the fallback cadence.
 */

export const getPublishedProjects = unstable_cache(
  async () =>
    db.project.findMany({
      where: { published: true },
      orderBy: { updatedAt: "desc" },
    }),
  ["projects-list"],
  { revalidate: 60, tags: ["projects"] },
);

export const getProjectBySlug = unstable_cache(
  async (slug: string) =>
    db.project.findFirst({ where: { slug, published: true } }),
  ["project-by-slug"],
  { revalidate: 60, tags: ["projects"] },
);

export const getPublishedPosts = unstable_cache(
  async () =>
    db.post.findMany({
      where: { status: "published" },
      orderBy: { updatedAt: "desc" },
    }),
  ["posts-list"],
  { revalidate: 60, tags: ["posts"] },
);

export const getPostBySlug = unstable_cache(
  async (slug: string) =>
    db.post.findFirst({ where: { slug, status: "published" } }),
  ["post-by-slug"],
  { revalidate: 60, tags: ["posts"] },
);

export const getTeamMembers = unstable_cache(
  async () => db.teamMember.findMany({ orderBy: { order: "asc" } }),
  ["team-list"],
  { revalidate: 60, tags: ["team"] },
);

export const getPartners = unstable_cache(
  async () => db.partner.findMany({ orderBy: { order: "asc" } }),
  ["partners-list"],
  { revalidate: 60, tags: ["partners"] },
);

export const getPublishedFaqs = unstable_cache(
  async () =>
    db.faq.findMany({ where: { status: "published" }, orderBy: { order: "asc" } }),
  ["faq-list"],
  { revalidate: 60, tags: ["faq"] },
);

/** Body Json columns arrive as JsonValue — narrow to the string[] we render. */
export function bodyStrings(body: JsonValue | null | undefined): string[] {
  if (Array.isArray(body)) return body.filter((x): x is string => typeof x === "string");
  return [];
}

/**
 * Body content can be TipTap HTML (string — admin-authored) or legacy
 * paragraphs (string[] — seed rows). Public pages call this to decide.
 */
export function bodyRender(body: JsonValue | null | undefined): {
  html: string | null;
  paragraphs: string[];
} {
  if (typeof body === "string" && body.trim() !== "") {
    return { html: body, paragraphs: [] };
  }
  return { html: null, paragraphs: bodyStrings(body) };
}
