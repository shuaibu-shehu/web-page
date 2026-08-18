import { db } from "@/lib/db";
import type { JsonValue } from "@prisma/client/runtime/library";

/**
 * Orphan detection for Cloudinary assets. Assets are "used" when their secure
 * URL appears in any content column (article/project bodies, card images, hero
 * images, team photos, settings logos). Editor deletions only remove the HTML
 * reference — cleanup is the Media Library's "Delete unused files" action.
 */

function cloudUrlsFrom(value: JsonValue | string | null | undefined): string[] {
  const text = typeof value === "string" ? value : JSON.stringify(value ?? "");
  if (!text) return [];
  const matches = text.match(/https:\/\/res\.cloudinary\.com\/[^\s"'<>\\\\)]+/g);
  return matches ?? [];
}

/** Every Cloudinary URL currently referenced by any content column. */
export async function getUsedAssetUrls(): Promise<Set<string>> {
  const [projects, posts, team, settings] = await Promise.all([
    db.project.findMany({
      select: { body: true, image: true, heroImage: true },
    }),
    db.post.findMany({ select: { body: true, image: true } }),
    db.teamMember.findMany({ select: { photo: true } }),
    db.setting.findMany(),
  ]);

  const used = new Set<string>();
  for (const p of projects) {
    for (const url of [...cloudUrlsFrom(p.body), p.image, p.heroImage]) used.add(url);
  }
  for (const post of posts) {
    for (const url of [...cloudUrlsFrom(post.body), post.image]) used.add(url);
  }
  for (const m of team) used.add(m.photo);
  for (const s of settings) {
    for (const url of cloudUrlsFrom(s.value as never)) used.add(url);
  }
  return used;
}
