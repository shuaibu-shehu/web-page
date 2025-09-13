"use client"

import { useState, useRef, type FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Clock, Cpu, Eye, Github, Linkedin, Mail, Rss, Twitter } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"

import { featuredProjectsHighlight } from "@/lib/constamts"
import Footer from "@/components/footer"

export default function Home() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const newsletterRef = useRef<HTMLElement>(null)

   const scrollToNewsletter = () => {
    newsletterRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate subscription process
    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)

    // For GitHub Pages, you could use a service like Formspree or a Google Form
    // to collect emails without needing a backend
    // Example: window.open(`https://formspree.io/f/yourformid?email=${encodeURIComponent(email)}`, '_blank')
  }

  return (
    <div className="min-h-screen text-white bg-black">
      {/* <header className="container py-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            Neural<span className="text-purple-500">Pulse</span>
          </Link>
          <nav className="items-center hidden space-x-6 text-sm md:flex">
            <Link href="/" className="transition-colors text-custome hover:text-white">
              Home
            </Link>
            <Link href="/articles/" className="text-gray-400 transition-colors hover:text-white">
              Articles
            </Link>
            <Link href="/topics/" className="text-gray-400 transition-colors hover:text-white">
              Topics
            </Link>
            <Link href="/about/" className="text-gray-400 transition-colors hover:text-white">
              About
            </Link>
          </nav>
          <Button
            variant="outline"
            className="text-purple-500 border-purple-500 hover:bg-purple-950 hover:text-white"
            onClick={scrollToNewsletter}
          >
            Subscribe
          </Button>
        </div>
      </header> */}
      {/* <Navbar newsletterRef={newsletterRef} scrollToNewsletter={scrollToNewsletter}/> */}
     <Hero/>
      <main className="container px-4 py-0 mx-auto -mt-20">
        <section className="mb-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="z-50 space-y-6">
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                Our <span className="text-blue-500">Moto</span>
              </h1>
              <p className="text-lg text-gray-400 md:text-xl">
                {/* We tackle real-world healthcare challenges by delivering scalable, affordable, and efficient solutions. Our mission is to create tangible impact through state-of-the-art AI diagnostic tools tailored for low-resource settings — ensuring equal access to quality healthcare across Africa and beyond. */}
                Our efforts focus on quickening disease identification and helping medical professionals offer effective therapy.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/about/">Our purpose</Link>
                </Button>
                {/* <Button variant="outline" className="border-gray-700 hover:bg-gray-900" onClick={scrollToNewsletter}>
                  Join Newsletter
                </Button> */}
              </div>
            </div>
            <div className="order-first  lg:order-none relative top-40 lg:top-0 h-[400px] rounded-xl overflow-hidden border border-b-0 border-gray-800">
              <Image
                src="/motto.jpg"
                alt="AI visualization showing neural network connections"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div>
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            
            <div className="order-first  lg:order-none relative top-40 lg:top-0 h-[400px] rounded-xl overflow-hidden border border-b-0 border-gray-800">
              <Image
                src="img2.png"
                alt="AI visualization showing neural network connections"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            <div className="z-50 space-y-6">
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                We <span className="text-blue-500">Collaborate</span>
              </h1>
              <p className="text-lg text-gray-400 md:text-xl">
                We forge strategic partnerships with leading healthcare institutions, pioneering researchers, and global health organizations to co-create transformative solutions. Through collaborative research and agile development cycles, we tackle urgent healthcare challenges—from diagnostic gaps in rural settings to disease surveillance across Africa and beyond. Our joint initiatives prioritize scalable, low-resource settings, turning cutting-edge AI into tangible tools that empower frontline workers and democratize healthcare access worldwide.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/partnerships/">Our Partners</Link>
                </Button>
                {/* <Button variant="outline" className="border-gray-700 hover:bg-gray-900" onClick={scrollToNewsletter}>
                  Join Newsletter
                </Button> */}
              </div>
            </div>
          </div>
        </section>

        <section>
          {/* <h1 className="text-l2xl"> A Team of Humane-centered approach</h1> */}
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            A Team of <span className="text-blue-500">Humane-centered approach</span>
          </h1>

          <p className="mt-4 text-lg text-gray-400 md:text-xl">
            Our team is dedicated to creating AI solutions that prioritize human needs and ethical considerations. We believe in a humane-centered approach, ensuring that our technologies are designed with empathy and respect for all individuals.
          </p>

          <div className="mt-8 mb-8">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link href="/about/">Learn More About Our Team</Link>
            </Button>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Projects and Research</h2>
            <Link href="/projects/" className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-400">
              View all <Eye className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredProjectsHighlight.map((project) => (
              <FeaturedCard
                key={project.title}
                title={project.title}
                description={project.description}
                image={project.image}
                date={project.date}
                category={project.category}
                icon={<Cpu className="w-4 h-4" />}
                slug={project.slug}
              />
            ))}
          </div>
        </section>

        {/* <section className="mb-20">
          <h2 className="mb-8 text-2xl font-bold">Recent Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ArticleCard
              title="Advancements in AI-Driven 3D Modeling and Virtual World Creation"
              description="Explore how AI is revolutionizing 3D modeling and virtual world creation, enabling users to transform written prompts into immersive experiences."
              category="3D Modeling"
              date="July 5, 2023"
              slug="ai-driven-3d-modeling"
              image="https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="The Integration of AI in Wearable Technology: Enhancing User Experience"
              description="Analyze the incorporation of AI into wearable devices, such as smart glasses, and how it enhances user interaction through features like real-world navigation and information accessibility."
              category="Wearable Tech"
              date="July 18, 2023"
              slug="ai-in-wearable-technology"
              image="https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="Computer Vision in Autonomous Vehicles"
              description="Exploring how computer vision algorithms are enabling self-driving cars to perceive and navigate complex environments."
              category="Computer Vision"
              date="August 3, 2023"
              slug="computer-vision-autonomous-vehicles"
              image="https://images.unsplash.com/photo-1563630381190-77c336ea545a?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="Deep Learning for Natural Language Processing"
              description="How transformer models have revolutionized our ability to understand and generate human language."
              category="NLP"
              date="August 15, 2023"
              slug="deep-learning-nlp"
              image="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="Ethical Considerations in Generative AI"
              description="Examining the ethical implications of AI-generated content and the responsibility of AI researchers and practitioners."
              category="AI Ethics"
              date="September 2, 2023"
              slug="ethical-considerations-genai"
              image="https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=600&h=400&auto=format&fit=crop"
            />
            <ArticleCard
              title="The Future of AI Research: What's Next?"
              description="Predictions and insights into the next frontiers of artificial intelligence research and development."
              category="Future of AI"
              date="September 20, 2023"
              slug="future-of-ai-research"
              image="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&h=400&auto=format&fit=crop"
            />
          </div>
        </section> */}

        <section ref={newsletterRef} id="newsletter" className="p-8 mb-20 bg-gray-900 rounded-xl">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Stay Updated</h2>
              <p className="text-gray-400">
                Subscribe to our newsletter to receive the latest insights on AI advancements, tutorials, and industry
                news.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-black border-gray-800 focus-visible:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />    
    </div>
  )
}

type FeaturedCardProps = {
  title: string
  description: string
  image: string
  date: string
  category: string
  icon: React.ReactNode
  slug?: string
}

function FeaturedCard({ title, description, image, date, category, icon, slug = "" }: FeaturedCardProps) {
  return (
    <Card className="overflow-hidden transition-colors bg-gray-900 border-gray-800 hover:border-blue-500/50">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2 text-sm text-blue-500">
          {icon}
          <span>{category}</span>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <Link href={`/blog/${slug}/`} className="text-blue-500 hover:text-blue-400">
          Read more →
        </Link>
      </CardFooter>
    </Card>
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
