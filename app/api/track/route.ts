import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isBot, parseUserAgent } from "@/lib/user-agent";
import { prunePageViews, TRIGGER_EVERY } from "@/lib/analytics-prune";

/**
 * Pageview beacon — fired from the public site only (the client component is
 * mounted in the (site) layout, never in the admin). Writes one PageView row.
 *
 * Privacy rules:
 *  - raw IPs are never stored — only a coarse country code;
 *  - bots are dropped before any write;
 *  - requests respecting Do-Not-Track are never sent by the client at all;
 *  - the handler always returns 204 so tracking can never break a page.
 */

/** IP → country lookups, cached in-memory for 24h (avoid hammering the free API). */
const countryCache = new Map<string, { country: string | null; at: number }>();

async function countryFromIp(ip: string): Promise<string | null> {
  const cached = countryCache.get(ip);
  if (cached && Date.now() - cached.at < 24 * 60 * 60 * 1000) return cached.country;

  let country: string | null = null;
  try {
    const res = await fetch(`https://ip-api.com/json/${ip}?fields=countryCode`, {
      signal: AbortSignal.timeout(2500),
    });
    if (res.ok) {
      const data = (await res.json()) as { countryCode?: string };
      country = data.countryCode ?? null;
    }
  } catch {
    country = null;
  }

  countryCache.set(ip, { country, at: Date.now() });
  return country;
}

export async function POST(request: NextRequest) {
  const respond = () => new NextResponse(null, { status: 204 });

  try {
    const ua = request.headers.get("user-agent") ?? "";
    if (isBot(ua)) return respond();

    const body = await request.json().catch(() => null);
    if (!body || typeof body.path !== "string") return respond();
    const path = body.path.slice(0, 200);
    const referrer =
      typeof body.referrer === "string" ? body.referrer.slice(0, 300) : null;
    const anonId =
      typeof body.anonId === "string" ? body.anonId.slice(0, 64) : "unknown";

    const { browser, os } = parseUserAgent(ua);

    // Country: prefer Vercel's free geo header when deployed there, otherwise
    // fall back to a free IP lookup for self-hosted deployments.
    let country = request.headers.get("x-vercel-ip-country");
    if (!country) {
      const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
      if (forwarded) country = await countryFromIp(forwarded);
    }

    await db.pageView.create({
      data: {
        path,
        referrer,
        country: country?.slice(0, 2) ?? null,
        browser,
        os,
        anonId,
      },
    });

    // Opportunistic retention: ~1 in TRIGGER_EVERY beacons rolls old rows into
    // MonthlyStat and prunes them, keeping the PageView table bounded.
    if (Math.random() < 1 / TRIGGER_EVERY) {
      await prunePageViews();
    }
  } catch {
    // tracking must never surface errors to the visitor
  }

  return respond();
}
