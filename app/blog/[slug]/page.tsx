"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, BrainCircuit, Clock, Share2, Twitter, Facebook, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"
import { projects } from "@/lib/constamts"

type RelatedPost = {
  slug: string
  title: string
  category: string
  image?: string
}

type Project = {
  title: string
  date: string
  author: string
  category: string
  readTime: string
  image: string
  content: string
  relatedPosts?: RelatedPost[]
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { toast } = useToast()
  const project: Project | undefined = projects[params.slug as keyof typeof projects]

  useEffect(() => {
    if (!project) {
      toast({
        title: "Post not found",
        description: "The requested blog post could not be found.",
        variant: "destructive",
      })
    }
  }, [project, toast])

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out this article: ${project.title}`

    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(url)
        toast({
          title: "Link copied",
          description: "The article link has been copied to your clipboard.",
        })
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }

  return (
    <div className="min-h-screen text-white bg-black">

        {/* <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            Neural<span className="text-purple-500">Pulse</span>
          </Link>
          <Button
            variant="outline"
            className="text-purple-500 border-purple-500 hover:bg-purple-950 hover:text-white"
            onClick={() => {
              const newsletterSection = document.getElementById("newsletter")
              if (newsletterSection) {
                newsletterSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Subscribe
          </Button>
        </div> */}
      {/* <Navbar/> */}

      <main className="container px-4 py-12 mx-auto">
        <div className="max-w-3xl mx-auto">
          <Link href="/projects/" className="inline-flex items-center mb-8 text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to projects
          </Link>

          <div className="flex items-center gap-2 mb-4 text-sm text-blue-500">
            <BrainCircuit className="w-5 h-5" />
            <span>{project.category}</span>
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{project.title}</h1>

          <div className="flex items-center gap-4 mb-8 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{project.readTime}</span>
            </div>
            <div>{project.date}</div>
            {/* <div>By {post.author}</div> */}
          </div>

          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-gray-800 mb-8">
            <Image
              src={project.image || "/placeholder.svg"}
              alt="Article hero image showing GAN-generated art"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 border-gray-800 hover:bg-gray-900"
                onClick={() => handleShare("twitter")}
              >
                <Twitter className="w-4 h-4 mr-1" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 border-gray-800 hover:bg-gray-900"
                onClick={() => handleShare("facebook")}
              >
                <Facebook className="w-4 h-4 mr-1" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 border-gray-800 hover:bg-gray-900"
                onClick={() => handleShare("linkedin")}
              >
                <Linkedin className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 border-gray-800 hover:bg-gray-900"
              onClick={() => handleShare("clipboard")}
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>

          <article className="prose prose-invert prose-purple max-w-none">
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </article>

          <div className="pt-8 mt-12 border-t border-gray-800">
            <h3 className="mb-6 text-xl font-bold">Related Projects</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {project.relatedPosts && project.relatedPosts.length > 0 ? (
                project.relatedPosts.map((relatedProject, index) => (
                  <Link href={`/blog/${relatedProject.slug}/`} className="group" key={index}>
                    <div className="space-y-3">
                      <div className="relative h-48 overflow-hidden transition-colors border border-gray-800 rounded-lg group-hover:border-purple-500/50">
                        <Image
                          src={relatedProject.image || "/placeholder.svg"}
                          alt={`${relatedProject.title} thumbnail`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-xs text-purple-500">
                          <BrainCircuit className="w-4 h-4" />
                          <span>{relatedProject.category}</span>
                        </div>
                        <h3 className="font-medium transition-colors group-hover:text-purple-400">{relatedProject.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-gray-400">No related projects found.</div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-gray-800">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <Link href="/" className="text-xl font-bold tracking-tighter">
              Code<span className="text-blue-500">Therapy</span>
            </Link>
            <p className="mt-4 mb-6 text-sm text-gray-400">
              Exploring the cutting edge of artificial intelligence and machine learning.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
            <div className="pt-6 mt-8 text-sm text-gray-400 border-t border-gray-800">
              <p>© {new Date().getFullYear()} CodeTherapy. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


