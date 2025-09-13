'use client'

import { Twitter, Github, Linkedin, Rss, Mail } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
function Footer() {
    return (
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
                                <span>contact@codetherapy.ml</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-6 mt-12 text-sm text-gray-400 border-t border-gray-800">
                    <p>© {new Date().getFullYear()} CodeTherapy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer