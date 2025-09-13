"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BrainCircuit, Clock, Github, Linkedin, Mail, Rss, Twitter } from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { projectsHighlight } from "@/lib/constamts"
import Footer from "@/components/footer"
// Static article data for GitHub Pages

export default function ArticlesPage() {
    const router = useRouter()

    const handleSubscribeClick = () => {
        router.push("/#newsletter")
    }

    return (
        <div className="min-h-screen text-white bg-black">

            {/* <Navbar /> */}
            <main className="container px-4 py-12 mx-auto">
                <section className="mb-12">
                    <h1 className="mb-8 text-4xl font-bold">All Projects</h1>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {projectsHighlight.map((project, index) => (
                            <ArticleCard
                                key={index}
                                title={project.title}
                                description={project.description}
                                category={project.category}
                                date={project.date}
                                slug={project.slug}
                                image={project.image}
                            />
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

type ArticleCardProps = {
    title: string
    description: string
    category: string
    date: string
    slug?: string
    image?: string
}

function ArticleCard({ title, description, category, date, slug = "", image }: ArticleCardProps) {
    return (
        <Link href={`/blog/${slug}/`} className="group">
            <div className="space-y-3">
                <div className="relative h-48 overflow-hidden transition-colors border border-gray-800 rounded-lg group-hover:border-blue-500/50">
                    <Image src={image || "/placeholder.svg"} alt={`${title} thumbnail`} fill className="object-cover" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-2 text-xs text-blue-500">
                        <BrainCircuit className="w-4 h-4" />
                        <span>{category}</span>
                    </div>
                    <h3 className="font-medium transition-colors group-hover:text-blue-400">{title}</h3>
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
