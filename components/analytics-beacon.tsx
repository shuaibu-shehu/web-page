"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Self-hosted pageview beacon for the public site.
 *  - Respects Do-Not-Track — no request is sent at all.
 *  - Anonymous id in localStorage (random string, not personal data).
 *  - The admin portal never mounts this component.
 */
export default function AnalyticsBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    if (navigator.doNotTrack === "1") return;

    let anonId = localStorage.getItem("ct_anon");
    if (!anonId) {
      anonId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("ct_anon", anonId);
    }

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer,
        anonId,
      }),
      // Fire-and-forget: never block navigation on tracking.
      keepalive: true,
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
