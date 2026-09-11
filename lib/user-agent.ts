/**
 * Minimal User-Agent parsing for the PageView tracker — browser family and OS,
 * no dependencies. Good enough for the dashboard's device breakdown; raw UAs
 * are never stored.
 */
export function parseUserAgent(
  ua: string,
): { browser: string | null; os: string | null } {
  if (!ua) return { browser: null, os: null };

  let browser: string | null = null;
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/.test(ua)) browser = "Opera";
  else if (/Chrome\//.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua)) browser = "Safari";

  let os: string | null = null;
  if (/Windows/.test(ua)) os = "Windows";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
  else if (/Mac OS X|Macintosh/.test(ua)) os = "macOS";
  else if (/Linux/.test(ua)) os = "Linux";

  return { browser, os };
}

/** Obvious crawlers — filtered out before any write. */
const BOT_PATTERN =
  /bot|crawl|spider|slurp|preview|curl|wget|headless|facebookexternalhit|whatsapp/i;

export function isBot(ua: string): boolean {
  return BOT_PATTERN.test(ua);
}
