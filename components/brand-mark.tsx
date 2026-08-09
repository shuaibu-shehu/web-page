import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * The CodeTherapy logo: a stethoscope framed by curly braces (Figma `logo-mark`,
 * 55278:55). The source export sits on a 1600px canvas with ~26% padding a side,
 * which renders the mark at under half its box; the committed asset is cropped to
 * the artwork bounds so it fills the frame at nav sizes.
 *
 * Deliberately free of "use client" so server components can render it without
 * pulling the client navigation bundle along.
 */
export default function BrandMark({
  size = 36,
  textClass = "text-ink text-[22px]",
  label = true,
}: {
  size?: number
  textClass?: string
  label?: boolean
}) {
  return (
    <span className="flex items-center gap-[10px]">
      <span className="relative shrink-0" style={{ width: size, height: size }}>
        <Image
          src="/v2/logo-mark.png"
          alt={label ? "" : "CodeTherapy"}
          fill
          sizes={`${size}px`}
          className="object-contain"
          priority
        />
      </span>
      {label && <span className={cn("font-serif font-bold", textClass)}>CodeTherapy</span>}
    </span>
  )
}

/**
 * `author-avatar` from the article frames — a "C" monogram on a sage-soft disc,
 * used where CodeTherapy is the byline. Kept as a letter rather than the logo:
 * at 28px the stethoscope's strokes collapse, while the monogram stays legible.
 */
export function Monogram({ size = 28 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-sage-soft font-serif font-bold text-sage"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      aria-hidden
    >
      C
    </span>
  )
}
