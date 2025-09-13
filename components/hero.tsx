"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FileText, Sparkles } from "lucide-react"
// import { FloatingPaper } from "@/components/floating-paper"
import { FloatingPaper } from "@/components/floating-paper"
import { RoboAnimation } from "@/components/robo-animation"
import Link from "next/link"

export default function Hero() {
    return (
        <div className="relative min-h-[calc(100vh-76px)] flex items-center">
            {/* Floating papers background */}
            <div className="absolute inset-0 overflow-hidden bg-[url('/hero.png')] bg-cover bg-center bg-no-repeat" />
            <div className="absolute inset-0 bg-black/60" />
            {/* <div className="absolute inset-0 overflow-hidden"> */}

                {/* <FloatingPaper count={6} /> */}
            {/* </div> */}

            <div className="container relative z-10 px-6 mx-auto">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
                            Transform Research into
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600">
                                {" "}
                                Impactful Tool
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-2xl mx-auto mb-8 text-xl text-gray-300"
                    >
                        Focused
                        exclusively on research in healthcare and artificial intelligence, exploring innovative applications and
                        transformative solutions.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <Button size="lg" className="px-8 text-white bg-blue-600 hover:bg-blue-700">
                            {/* <FileText className="w-5 h-5 mr-2" /> */}
                          <Link href="/projects" className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                                Explore our Research
                            </Link>
                        </Button>
                        {/* <Button size="lg" variant="outline" className="text-white border-purple-500 hover:bg-purple-500/20">
                            <Sparkles className="w-5 h-5 mr-2" />
                            See Examples
                        </Button> */}
                    </motion.div>
                </div>
            </div>

            {/* Animated robot */}
            {/* <div className="absolute bottom-0 right-0 w-96 h-96">
                <RoboAnimation />
            </div> */}
        </div>
    )
}
