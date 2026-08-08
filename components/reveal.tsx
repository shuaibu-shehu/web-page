"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveals its children once on scroll-in.
 *
 * The hidden start state lives in CSS under `.js-reveal` (see globals.css), so
 * this component only ever *adds* `is-visible`. If the class isn't on <html> —
 * no JS, or the visitor prefers reduced motion — there is nothing to reveal and
 * the observer never runs.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in ms. Keep within a single grid, never across a page. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!document.documentElement.classList.contains("js-reveal")) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
