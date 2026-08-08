'use client'

import { Twitter, Github, Linkedin, Rss, Mail } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
function Footer() {
    return (
        <footer className="py-12 border-t border-slate-800/50 glass">
            <div className="container px-4 mx-auto">
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="text-xl font-bold tracking-tighter">
                            Code<span className="gradient-text">Therapy</span>
                        </Link>
                        <p className="text-sm text-gray-300">
                            Pioneering AI solutions for global healthcare equity, transforming research into life-saving technology.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                <Github className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                <Rss className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-4 font-medium text-white">Research Areas</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>
                                <Link href="#" className="hover:text-cyan-400 transition-colors">
                                    AI Diagnostics
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-cyan-400 transition-colors">
                                    Medical Imaging
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-cyan-400 transition-colors">
                                    Disease Prediction
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-cyan-400 transition-colors">
                                    Healthcare Access
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-cyan-400 transition-colors">
                                    Global Health
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 font-medium text-white">Resources</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>
                                <Link href="/projects/" className="hover:text-cyan-400 transition-colors">
                                    Our Projects
                                </Link>
                            </li>
                            <li>
                                <Link href="/articles/" className="hover:text-cyan-400 transition-colors">
                                    Research Papers
                                </Link>
                            </li>
                            <li>
                                <Link href="/about/" className="hover:text-cyan-400 transition-colors">
                                    Our Team
                                </Link>
                            </li>
                            <li>
                                <Link href="/partnerships/" className="hover:text-cyan-400 transition-colors">
                                    Partnerships
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 font-medium text-white">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-cyan-400" />
                                <span className="hover:text-cyan-400 transition-colors cursor-pointer">contact@codetherapy.ml</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-6 mt-12 text-sm text-gray-400 border-t border-slate-800/50">
                    <p>© {new Date().getFullYear()} CodeTherapy. All rights reserved. Building AI for humanity.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer