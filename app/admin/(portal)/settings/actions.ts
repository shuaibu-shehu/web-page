"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { prunePageViews } from "@/lib/analytics-prune";
import { db } from "@/lib/db";

/**
 * General + SEO settings — one action per tab section. Each Setting row is
 * keyed JSON; unknown keys are dropped by the schema.
 */

const generalInput = z.object({
  siteName: z.string().min(1),
  siteDescription: z.string(),
  siteUrl: z.string().url(),
  primaryAccent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  secondaryAccent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  standardLogo: z.string(),
  darkModeLogo: z.string(),
  twitter: z.string(),
  linkedin: z.string(),
  github: z.string(),
  youtube: z.string(),
  contactEmail: z.string().email(),
  emailOnComment: z.coerce.boolean(),
  emailOnFormSubmission: z.coerce.boolean(),
  weeklyAnalyticsDigest: z.coerce.boolean(),
  draftReminder7Days: z.coerce.boolean(),
});

export async function saveGeneralSettings(
  _prev: { ok: boolean },
  formData: FormData,
): Promise<{ ok: boolean }> {
  const parsed = generalInput.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { ok: false };
  const d = parsed.data;

  const rows: Record<string, unknown> = {
    siteName: d.siteName,
    siteDescription: d.siteDescription,
    siteUrl: d.siteUrl,
    primaryAccent: d.primaryAccent,
    secondaryAccent: d.secondaryAccent,
    standardLogo: d.standardLogo,
    darkModeLogo: d.darkModeLogo,
    socialLinks: { twitter: d.twitter, linkedin: d.linkedin, github: d.github, youtube: d.youtube },
    contactEmail: d.contactEmail,
    notifications: {
      emailOnComment: d.emailOnComment,
      emailOnFormSubmission: d.emailOnFormSubmission,
      weeklyAnalyticsDigest: d.weeklyAnalyticsDigest,
      draftReminder7Days: d.draftReminder7Days,
    },
  };

  for (const [key, value] of Object.entries(rows)) {
    await db.setting.upsert({
      where: { key },
      update: { value: value as never },
      create: { key, value: value as never },
    });
  }

  revalidateTag("settings");
  revalidatePath("/admin/settings");
  return { ok: true };
}

/** Rolls old PageView rows into MonthlyStat and prunes them (6-month retention). */
export async function pruneAnalytics(): Promise<{
  deleted: number;
  monthsAggregated: number;
}> {
  const result = await prunePageViews();
  revalidatePath("/admin");
  revalidatePath("/admin/settings");
  return result;
}

export async function clearCache(): Promise<void> {
  for (const tag of ["projects", "posts", "team", "partners", "faq", "settings"]) {
    revalidateTag(tag);
  }
  revalidatePath("/");
}

/**
 * Danger Zone — wipes all content rows (projects, posts, team, partners, FAQ,
 * leads, media). AdminUser and Setting survive so the portal keeps working.
 */
export async function deleteSiteContent(): Promise<void> {
  await db.$transaction([
    db.project.deleteMany(),
    db.post.deleteMany(),
    db.teamMember.deleteMany(),
    db.partner.deleteMany(),
    db.faq.deleteMany(),
    db.lead.deleteMany(),
    db.mediaAsset.deleteMany(),
  ]);
  for (const tag of ["projects", "posts", "team", "partnerships", "faq", "settings"]) {
    revalidateTag(tag);
  }
  revalidatePath("/");
}
