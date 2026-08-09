import { Anchor, Heart, Shield, Users, type LucideIcon } from "lucide-react"

/** Impact numbers — identical band on the landing and about pages. */
export const stats = [
  { value: "2.3M+", label: "Lives Touched" },
  { value: "23", label: "Countries Supported" },
  { value: "15K+", label: "Health Workers Trained" },
  { value: "47", label: "Open-Source Models" },
]

export const values: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Heart,
    title: "Humanity First",
    body: "Technology serves communities over profits. We design diagnostics based on real patient need, not business models.",
  },
  {
    icon: Users,
    title: "Radical Inclusion",
    body: "We actively build with medical institutions and clinicians inside their clinics, not from isolated hubs.",
  },
  {
    icon: Shield,
    title: "Ethical Courage",
    body: "We thoroughly reject exploitative medical datasets. All models are open-source and publicly auditable.",
  },
  {
    icon: Anchor,
    title: "Global Roots",
    body: "Honoring local clinical wisdom across our teams globally while introducing world-class computational science.",
  },
]
