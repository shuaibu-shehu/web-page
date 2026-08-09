export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  categoryTone: "sage" | "clay"
  date: string
  image: string
  /**
   * Full article copy. The Figma has no blog-detail frame, so no body text was
   * supplied with the design — until it is, the detail page leads with `excerpt`.
   */
  body?: string[]
}

/** `v2-blog-page` content. */
export const featuredPost: Post = {
  slug: "who-africa-summit-2025",
  title: "Presenting at WHO Africa Summit 2025",
  excerpt:
    "We are proud to share our latest clinical validations with health ministers from 12 African nations. Together with our partners, we demonstrated offline, low-cost smartphone-driven malaria diagnostic tools capable of delivering laboratory-grade results in under 5 minutes.",
  category: "Announcement",
  categoryTone: "clay",
  date: "July 20, 2025",
  image: "/v2/post-featured.png",
}

export const posts: Post[] = [
  {
    slug: "johns-hopkins-mammography-partnership",
    title: "Partnership with Johns Hopkins for Mammography AI",
    excerpt:
      "Collaborative research deployment testing screening algorithms tailored to low-contrast digital mammograms inside mobile clinical environments.",
    category: "Partnership",
    categoryTone: "sage",
    date: "July 5, 2025",
    image: "/v2/post-1.png",
  },
  {
    slug: "malaria-detection-model-v2",
    title: "Open-Source: Malaria Detection Model v2.0",
    excerpt:
      "Our real-time deep-learning update brings a 94.2% diagnostic accuracy on offline mobile chips, reducing reliance on internet infrastructure.",
    category: "Release",
    categoryTone: "clay",
    date: "June 18, 2025",
    image: "/v2/post-2.png",
  },
  {
    slug: "ai-laparoscope-for-200-dollars",
    title: "Building an AI Laparoscope for $200",
    excerpt:
      "How we collaborated with Senegalese biomedical engineers to embed robust computer vision guidance onto locally sourced physical scopes.",
    category: "Hardware",
    categoryTone: "sage",
    date: "May 28, 2025",
    image: "/v2/post-3.png",
  },
  {
    slug: "ethics-in-healthcare-ai",
    title: "Ethics in Healthcare AI: Our Framework",
    excerpt:
      "Our core framework rejects exploitative clinical datasets and guarantees that AI diagnostic advancements are co-developed locally.",
    category: "Ethics",
    categoryTone: "clay",
    date: "May 10, 2025",
    image: "/v2/post-4.png",
  },
  {
    slug: "field-report-rural-ethiopia",
    title: "Field Report: AI Diagnostics in Rural Ethiopia",
    excerpt:
      "Frontline clinicians share outcomes of implementing smartphone microscopy adapters, noting massive reductions in screening bottleneck times.",
    category: "Field Work",
    categoryTone: "sage",
    date: "April 22, 2025",
    image: "/v2/post-5.png",
  },
  {
    slug: "google-ai-for-social-good-grant",
    title: "Google AI for Social Good Grant Winner",
    excerpt:
      "Grateful to receive financial backing and mentorship to optimize offline, tiny-ML models for remote and offline clinical hardware.",
    category: "Grant",
    categoryTone: "clay",
    date: "April 5, 2025",
    image: "/v2/post-6.png",
  },
]
