"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FileText, Sparkles, Activity, Microscope } from "lucide-react"
import { FloatingPaper } from "@/components/floating-paper"
import { RoboAnimation } from "@/components/robo-animation"
import Link from "next/link"

export default function Hero() {
    return (
        <div className="relative min-h-[calc(100vh-76px)] flex items-center overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute inset-0 bg-[url('/hero.png')] bg-cover bg-center bg-no-repeat opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />

            {/* Floating papers background */}
            <div className="absolute inset-0 overflow-hidden">
                <FloatingPaper count={6} />
            </div>

            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="container relative z-10 px-6 mx-auto">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass-card">
                            <Activity className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm text-gray-300">AI-Powered Healthcare Research</span>
                        </div>
                        <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl leading-tight">
                            Transform Research into
                            <span className="gradient-text block mt-2">
                                Impactful Healthcare Solutions
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-2xl mx-auto mb-8 text-xl text-gray-300 leading-relaxed"
                    >
                        Pioneering the intersection of artificial intelligence and healthcare, we develop innovative AI solutions that save lives and democratize access to quality medical care worldwide.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <Button
                            size="lg"
                            className="px-8 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/25 glow-effect"
                        >
                            <Link href="/projects" className="flex items-center gap-2">
                                <Microscope className="w-5 h-5" />
                                Explore Our Research
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="px-8 text-white border-cyan-500/50 hover:bg-cyan-500/10 hover:border-cyan-400 glass"
                        >
                            <Sparkles className="w-5 h-5 mr-2" />
                            See Our Impact
                        </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto"
                    >
                        <div className="text-center">
                            <div className="text-3xl font-bold gradient-text">2.3M+</div>
                            <div className="text-sm text-gray-400 mt-1">Lives Touched</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold gradient-text">23</div>
                            <div className="text-sm text-gray-400 mt-1">Countries</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold gradient-text">47</div>
                            <div className="text-sm text-gray-400 mt-1">AI Models</div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Animated robot */}
            <div className="absolute bottom-0 right-0 w-96 h-96 opacity-20">
                <RoboAnimation />
            </div>
        </div>
    )
}
