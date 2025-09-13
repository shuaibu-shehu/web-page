"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BrainCircuit, Clock, Github, Linkedin, Mail, Rss, Twitter } from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Static article data for GitHub Pages
const articles = [
  {
    title: "The Evolution of Generative Adversarial Networks: From GAN to StyleGAN-3",
    description:
      "Explore the development of GAN architectures, highlighting key milestones like Progressive GAN, StyleGAN-1, StyleGAN-2, and the latest advancements in StyleGAN-3.",
    category: "GenAI",
    date: "May 15, 2023",
    slug: "evolution-of-gans",
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=600&h=400&auto=format&fit=crop",
  },
  {
    title: "AI in 2025: Transforming Daily Life",
    description:
      "Discuss how generative AI has integrated into everyday activities by 2025, providing personal style tips, translating conversations, analyzing diets, and more.",
    category: "Future Tech",
    date: "June 2, 2023",
    slug: "ai-in-2025",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=600&h=400&auto=format&fit=crop",
  },
  {
    title: "The Rise of Multimodal AI Models: Bridging Text, Image, and Beyond",
    description:
      "Examine the emergence of multimodal AI models that process and generate multiple data types, such as text, images, and videos, and their applications in various industries.",
    category: "AI Research",
    date: "June 28, 2023",
    slug: "multimodal-ai-models",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&h=400&auto=format&fit=crop",
  },
  {
    title: "Advancements in AI-Driven 3D Modeling and Virtual World Creation",
    description:
      "Explore how AI is revolutionizing 3D modeling and virtual world creation, enabling users to transform written prompts into immersive experiences.",
    category: "3D Modeling",
    date: "July 5, 2023",
    slug: "ai-driven-3d-modeling",
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=600&h=400&auto=format&fit=crop",
  },
  {
    title: "The Integration of AI in Wearable Technology: Enhancing User Experience",
    description:
      "Analyze the incorporation of AI into wearable devices, such as smart glasses, and how it enhances user interaction through features like real-world navigation and information accessibility.",
    category: "Wearable Tech",
    date: "July 18, 2023",
    slug: "ai-in-wearable-technology",
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=600&h=400&auto=format&fit=crop",
  },
  {
    title: "Computer Vision in Autonomous Vehicles",
    description:
      "Exploring how computer vision algorithms are enabling self-driving cars to perceive and navigate complex environments.",
    category: "Computer Vision",
    date: "August 3, 2023",
    slug: "computer-vision-autonomous-vehicles",
    image: "https://images.unsplash.com/photo-1563630381190-77c336ea545a?q=80&w=600&h=400&auto=format&fit=crop",
  },
  {
    title: "Deep Learning for Natural Language Processing",
    description: "How transformer models have revolutionized our ability to understand and generate human language.",
    category: "NLP",
    date: "August 15, 2023",
    slug: "deep-learning-nlp",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600&h=400&auto=format&fit=crop",
  },
  {
    title: "Ethical Considerations in Generative AI",
    description:
      "Examining the ethical implications of AI-generated content and the responsibility of AI researchers and practitioners.",
    category: "AI Ethics",
    date: "September 2, 2023",
    slug: "ethical-considerations-genai",
    image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=600&h=400&auto=format&fit=crop",
  },
  {
    title: "The Future of AI Research: What's Next?",
    description:
      "Predictions and insights into the next frontiers of artificial intelligence research and development.",
    category: "Future of AI",
    date: "September 20, 2023",
    slug: "future-of-ai-research",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&h=400&auto=format&fit=crop",
  },
]

export default function ArticlesPage() {
  const router = useRouter()

  const handleSubscribeClick = () => {
    router.push("/#newsletter")
  }

  return (
    <div className="min-h-screen text-white bg-black">
      
      <Navbar/>
      <main className="container px-4 py-12 mx-auto">
        <section className="mb-12">
          <h1 className="mb-8 text-4xl font-bold">All Articles</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                description={article.description}
                category={article.category}
                date={article.date}
                slug={article.slug}
                image={article.image}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer/>
    </div>
  )
}

type ArticleCardProps = {
  title: string
  description: string
  category: string
  date: string
  slug?: string
  image: string
}

function ArticleCard({ title, description, category, date, slug = "", image }: ArticleCardProps) {
  return (
    <Link href={`/blog/${slug}/`} className="group">
      <div className="space-y-3">
        <div className="relative h-48 overflow-hidden transition-colors border border-gray-800 rounded-lg group-hover:border-purple-500/50">
          <Image src={image || "/placeholder.svg"} alt={`${title} thumbnail`} fill className="object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs text-purple-500">
            <BrainCircuit className="w-4 h-4" />
            <span>{category}</span>
          </div>
          <h3 className="font-medium transition-colors group-hover:text-purple-400">{title}</h3>
          <p className="mt-2 text-sm text-gray-400 line-clamp-2">{description}</p>
          <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
