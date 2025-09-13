"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Rss, Twitter } from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  const router = useRouter()

  const handleSubscribeClick = () => {
    router.push("/#newsletter")
  }

  return (
    <div className="min-h-screen text-white bg-black">
     {/* <Navbar /> */}
      <main className="container px-4 py-12 mx-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-8 text-4xl font-bold">About CodeTherapy</h1>

          <div className="prose prose-invert prose-purple max-w-none">
            <p className="mb-8 text-xl text-gray-300">
              CodeTherapy is dedicated to exploring the frontiers of artificial intelligence, with a focus on recent
              advancements in AI, GenAI, Computer Vision, and Deep Learning.
            </p>

            <h2>Our Mission</h2>
            <p>
              Our mission is to provide insightful, accessible, and cutting-edge content about the rapidly evolving
              field of artificial intelligence. We aim to bridge the gap between technical research and practical
              applications, making complex AI concepts understandable to a wider audience.
            </p>

            <h2>What We Cover</h2>
            <p>At NeuralPulse, we focus on several key areas in the AI landscape:</p>

            <ul>
              <li>
                <strong>Generative AI</strong>: From GANs to diffusion models, we explore how AI is creating
                increasingly realistic content across various media.
              </li>
              <li>
                <strong>Computer Vision</strong>: We delve into how machines perceive and understand visual information,
                and how this technology is transforming industries.
              </li>
              <li>
                <strong>Deep Learning</strong>: We examine the architectures, techniques, and applications that are
                pushing the boundaries of what AI can achieve.
              </li>
              <li>
                <strong>AI Ethics</strong>: We discuss the ethical implications of AI development and deployment,
                advocating for responsible innovation.
              </li>
            </ul>

            <h2>Our Team</h2>
            <p>
              NeuralPulse is run by a team of AI researchers, engineers, and enthusiasts who are passionate about the
              potential of artificial intelligence to transform our world for the better.
            </p>

            <h2>Contact Us</h2>
            <p>
              Have a question, suggestion, or want to collaborate? We'd love to hear from you! Reach out to us at{" "}
              <a href="mailto:ameyaudeshmukh@gmail.com" className="text-purple-400 hover:text-purple-300">
                contact@codetherapy.ml
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="text-xl font-bold tracking-tighter">
                Code<span className="text-blue-500">Therapy</span>
              </Link>
              <p className="text-sm text-gray-400">
                Exploring the cutting edge of artificial intelligence and machine learning.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Github className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Rss className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-medium">Topics</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Artificial Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Generative AI
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Computer Vision
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Deep Learning
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Machine Learning
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-medium">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Research Papers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Code Samples
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Datasets
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Tools
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-medium">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>codetherapy.contact@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-6 mt-12 text-sm text-gray-400 border-t border-gray-800">
            <p>© {new Date().getFullYear()} CodeTherapy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
