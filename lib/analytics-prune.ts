import { db } from "@/lib/db";

/**
 * Analytics retention. Raw PageView rows are pruned after RETENTION_MONTHS,
 * but first each affected month's totals (distinct visitors + pageviews) are
 * rolled into MonthlyStat — so history is preserved while the big table
 * stays bounded.
 *
 * Runs opportunistically: roughly one in every TRIGGER_EVERY beacons fires it
 * (see app/api/track/route.ts), plus a manual button in Settings → Backups.
 */
const RETENTION_MONTHS = 6;
export const TRIGGER_EVERY = 200;

export async function prunePageViews(): Promise<{
  deleted: number;
  monthsAggregated: number;
}> {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - RETENTION_MONTHS);

  // 1. Roll up the doomed rows into MonthlyStat (upsert, per UTC month).
  await db.$executeRaw`
    INSERT INTO "MonthlyStat" ("month", "visitors", "pageviews")
    SELECT
      to_char("createdAt" AT TIME ZONE 'UTC', 'YYYY-MM'),
      COUNT(DISTINCT "anonId"),
      COUNT(*)
    FROM "PageView"
    WHERE "createdAt" < ${cutoff}
    GROUP BY 1
    ON CONFLICT ("month") DO UPDATE SET
      "visitors" = "MonthlyStat"."visitors" + EXCLUDED."visitors",
      "pageviews" = "MonthlyStat"."pageviews" + EXCLUDED."pageviews";
  `;

  // 2. Delete the raw rows.
  const { count } = await db.pageView.deleteMany({
    where: { createdAt: { lt: cutoff } },
  });

  const monthsAggregated = await db.monthlyStat.count();
  return { deleted: count, monthsAggregated };
}
