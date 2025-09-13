"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Cpu, Eye, Github, Linkedin, Mail, Rss, Twitter } from "lucide-react"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer"

// Static topic data for GitHub Pages
const topics = [
  {
    title: "Generative AI",
    description: "Explore the latest advancements in generative AI models, including GANs, diffusion models, and more.",
    icon: <BrainCircuit className="w-6 h-6" />,
    count: 12,
    slug: "generative-ai",
  },
  {
    title: "Computer Vision",
    description:
      "Discover how AI is revolutionizing image and video analysis, object detection, and scene understanding.",
    icon: <Eye className="w-6 h-6" />,
    count: 8,
    slug: "computer-vision",
  },
  {
    title: "Deep Learning",
    description: "Learn about neural network architectures, training techniques, and applications in various domains.",
    icon: <Cpu className="w-6 h-6" />,
    count: 15,
    slug: "deep-learning",
  },
  {
    title: "AI Ethics",
    description: "Examine the ethical implications of AI development and deployment in society.",
    icon: <BrainCircuit className="w-6 h-6" />,
    count: 6,
    slug: "ai-ethics",
  },
  {
    title: "Natural Language Processing",
    description: "Explore how AI understands, generates, and interacts with human language.",
    icon: <BrainCircuit className="w-6 h-6" />,
    count: 9,
    slug: "nlp",
  },
  {
    title: "AI Research",
    description: "Stay updated with the latest research papers, breakthroughs, and academic developments in AI.",
    icon: <BrainCircuit className="w-6 h-6" />,
    count: 11,
    slug: "ai-research",
  },
]

export default function TopicsPage() {
  const router = useRouter()

  const handleSubscribeClick = () => {
    router.push("/#newsletter")
  }

  return (
    <div className="min-h-screen text-white bg-black">
      <header className="container py-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            Neural<span className="text-purple-500">Pulse</span>
          </Link>
          <nav className="items-center hidden space-x-6 text-sm md:flex">
            <Link href="/" className="text-gray-400 transition-colors hover:text-white">
              Home
            </Link>
            <Link href="/articles/" className="text-gray-400 transition-colors hover:text-white">
              Articles
            </Link>
            <Link href="/topics/" className="pb-1 text-white transition-colors border-b-2 border-purple-500">
              Topics
            </Link>
            <Link href="/about/" className="text-gray-400 transition-colors hover:text-white">
              About
            </Link>
          </nav>
          <Button
            variant="outline"
            className="text-purple-500 border-purple-500 hover:bg-purple-950 hover:text-white"
            onClick={handleSubscribeClick}
          >
            Subscribe
          </Button>
        </div>
      </header>

      <main className="container px-4 py-12 mx-auto">
        <section className="mb-12">
          <h1 className="mb-8 text-4xl font-bold">Topics</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, index) => (
              <TopicCard
                key={index}
                title={topic.title}
                description={topic.description}
                icon={topic.icon}
                count={topic.count}
                slug={topic.slug}
              />
            ))}
          </div>
        </section>
      </main>

     <Footer />
    </div>
  )
}

type TopicCardProps = {
  title: string
  description: string
  icon: React.ReactNode
  count: number
  slug?: string
}

function TopicCard({ title, description, icon, count, slug = "" }: TopicCardProps) {
  return (
    <Link href={`/articles/`} className="group">
      <Card className="h-full transition-colors bg-gray-900 border-gray-800 hover:border-purple-500/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="p-3 text-purple-500 rounded-lg bg-purple-500/10">{icon}</div>
            <div className="px-3 py-1 text-sm bg-gray-800 rounded-full">{count} articles</div>
          </div>
          <CardTitle className="mt-4 text-xl transition-colors group-hover:text-purple-400">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-400">{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <span className="text-sm text-purple-500 transition-colors group-hover:text-purple-400">View articles →</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
