"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Heart,
    Globe,
    Shield,
    Users,
    ShieldCheck,
    Network,
    Search,
    UserPlus,
    Lightbulb,
    Share2,
    ArrowRight,
    Play,
    MapPin,
    Code,
    Stethoscope,
    TrendingUp,
    Filter,
    Link,
} from "lucide-react"
import Footer from "@/components/footer"

const teamMembers = [
    {
        id: 1,
        name: "Mohammed Abdoullahi",
        role: "Co-Founder & CEO",
        location: "Mali",
        flag: "🇲🇱",
        specialty: "Global Health",
        image:
            "/mahmud.jpeg",
        bio: "Former WHO epidemiologist who witnessed firsthand how technology gaps cost lives in rural communities. Amara founded CodeTherapy after seeing a pregnant woman walk 50km for care that could have been provided locally with the right tools.",
        quote: "Every line of code we write should ask: will this reach the woman walking 50km for care?",
    },
    {
        id: 2,
        name: "Shuaibu Shehu",
        role: "Co-Founder & CTO",
        location: "Nigeria",
        flag: "🇳🇬",
        specialty: "AI/ML Engineering",
        image:
            "/shuaibu.jpg",
        bio: "AI researcher who dedicate his career to building technology that works in low-resource settings. Shuaibu specializes in creating AI models that function offline and on basic hardware.",
        quote: "The best AI is invisible - it just works, everywhere, for everyone.",
    },
    {
        id: 3,
        name: "Dr. Sarah Chen",
        role: "Head of Clinical Research",
        location: "Canada",
        flag: "🇨🇦",
        specialty: "Digital Health",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&h=400&auto=format&fit=crop&crop=face",
        bio: "Pediatric surgeon turned digital health researcher. Sarah ensures our AI tools meet the highest clinical standards while remaining accessible to frontline health workers with minimal training.",
        quote: "Technology should amplify human expertise, not replace human connection.",
    },
    {
        id: 4,
        name: "Kofi Asante",
        role: "Community Partnerships Lead",
        location: "Ghana",
        flag: "🇬🇭",
        specialty: "Community Health",
        image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop&crop=face",
        bio: "Community health advocate with 15 years of experience in rural health programs. Kofi ensures our solutions are co-created with the communities they serve.",
        quote: "The best solutions come from listening, not assuming.",
    },
    {
        id: 5,
        name: "Dr. Maria Santos",
        role: "Head of Ethics & Policy",
        location: "Brazil",
        flag: "🇧🇷",
        specialty: "AI Ethics",
        image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop&crop=face",
        bio: "Bioethicist and former UN advisor on AI governance. Maria ensures our work upholds the highest ethical standards and respects local values and practices.",
        quote: "Ethical AI isn't a feature - it's the foundation.",
    },
    {
        id: 6,
        name: "James Ochieng",
        role: "Field Operations Director",
        location: "Kenya",
        flag: "🇰🇪",
        specialty: "Implementation",
        image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=400&auto=format&fit=crop&crop=face",
        bio: "Former MSF logistics coordinator who understands the realities of delivering healthcare in challenging environments. James leads our field implementation teams.",
        quote: "A solution that works in the lab but fails in the field isn't a solution.",
    },
]

const impactStats = [
    { label: "Lives Touched", value: "2.3M+", icon: Heart },
    { label: "Countries Active", value: "23", icon: Globe },
    { label: "Health Workers Trained", value: "15K+", icon: Users },
    { label: "Open Source Models", value: "47", icon: Code },
]

const values = [
    {
        title: "Humanity First",
        icon: Shield,
        description:
            "Technology must serve people, not profit. Every decision we make starts with asking: how does this help the most vulnerable?",
        example: "We rejected a $50M acquisition offer because it would have compromised our open-source commitment.",
    },
    {
        title: "Radical Inclusion",
        icon: Users,
        description: "We design with communities, never for them. Local wisdom guides our global solutions.",
        example: "Our malaria prediction model was redesigned after rural health workers showed us patterns we missed.",
    },
    {
        title: "Ethical Courage",
        icon: ShieldCheck,
        description:
            "We reject exploitative AI practices, even when they're profitable. Privacy and dignity are non-negotiable.",
        example: "We turned down partnerships with companies that wanted to monetize patient data.",
    },
    {
        title: "Global Mindset",
        icon: Network,
        description:
            "We honor local wisdom while building global solutions. What works in Mali informs what we build in India.",
        example: "Our diagnostic tool incorporates traditional healing knowledge alongside modern medicine.",
    },
]

const workProcess = [
    {
        step: 1,
        title: "Problem Selection",
        icon: Search,
        description: "We only tackle challenges identified by frontline health workers, not Silicon Valley boardrooms.",
    },
    {
        step: 2,
        title: "Co-Creation",
        icon: UserPlus,
        description: "Rural health workers, patients, and communities help design every solution from day one.",
    },
    {
        step: 3,
        title: "Appropriate Technology",
        icon: Lightbulb,
        description: "If it doesn't work offline, on a $50 phone, in 45°C heat, it's not ready for deployment.",
    },
    {
        step: 4,
        title: "Open Impact",
        icon: Share2,
        description: "All non-sensitive models, tools, and learnings are open-sourced for maximum global benefit.",
    },
]

export default function AboutPage() {
    const [selectedFilter, setSelectedFilter] = useState("All")
    const [selectedMember, setSelectedMember] = useState<null>(null)
    const [selectedValue, setSelectedValue] = useState<{
        title: string
        icon: React.ComponentType<any>
        description: string
        example: string
    } | null>(null)
    const videoRef = useRef(null)

    const filters = ["All", "Leadership", "Clinical", "Engineering", "Operations"]

    const filteredTeam = teamMembers.filter((member) => {
        if (selectedFilter === "All") return true
        if (selectedFilter === "Leadership")
            return member.role.includes("Co-Founder") || member.role.includes("CEO") || member.role.includes("CTO")
        if (selectedFilter === "Clinical")
            return member.specialty.includes("Health") || member.specialty.includes("Clinical")
        if (selectedFilter === "Engineering")
            return member.specialty.includes("AI") || member.specialty.includes("Engineering")
        if (selectedFilter === "Operations")
            return member.role.includes("Operations") || member.role.includes("Partnerships")
        return true
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Hero Section */}
            <section className="relative flex items-center justify-center h-screen overflow-hidden text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2000&h=1200&auto=format&fit=crop"
                        alt="Diverse hands converging around holographic heart over world map"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900"></div>
                </div>

                {/* Animated gradient orbs */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                <div className="relative z-10 max-w-4xl px-4 mx-auto text-center text-white">
                    <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
                        Where <span className="gradient-text">Humanity</span>
                        <br />
                        Guides <span className="gradient-text">Technology</span>
                    </h1>
                    <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-300 md:text-2xl leading-relaxed">
                        Building AI that serves the last mile first, because healthcare is a human right, not a privilege.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button size="lg" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/25">
                            Our Impact <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="px-8 py-3 text-white border-cyan-500/50 hover:bg-cyan-500/10 hover:border-cyan-400 glass"
                        >
                            <Play className="w-5 h-5 mr-2" />
                            Watch Our Story
                        </Button>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}


            {/* Mission & Vision */}
            <section className="py-20">
                <div className="container px-4 mx-auto">
                    <div className="grid max-w-4xl gap-8 mx-auto md:grid-cols-2">
                        <Card className="transition-all duration-300 glass-card hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
                            <CardHeader className="text-center">
                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full">
                                    <Heart className="w-8 h-8 text-white" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-white">Our Mission</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center text-gray-300">
                                    To harness AI as a force for global health equity, ensuring that life-saving technology reaches the
                                    most underserved communities first.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="transition-all duration-300 glass-card hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
                            <CardHeader className="text-center">
                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-green-400 rounded-full">
                                    <Globe className="w-8 h-8 text-white" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-white">Our Vision</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center text-gray-300">
                                    A world where geography doesn't determine the quality of care you receive, and where AI amplifies
                                    human compassion at global scale.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-20">
                <div className="container px-4 mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-bold">Our Values</h2>
                        <p className="max-w-2xl mx-auto text-xl text-gray-300">
                            These principles guide every decision we make, from code commits to partnership agreements.
                        </p>
                    </div>

                    <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => (
                            <Card
                                key={index}
                                className="transition-all duration-300 cursor-pointer glass-card hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
                                onClick={() => setSelectedValue(value)}
                            >
                                <CardHeader className="text-center">
                                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30">
                                        <value.icon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <CardTitle className="text-lg font-bold text-white">{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-center text-gray-300">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Showcase */}
            <section className="py-20">
                <div className="container px-4 mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-bold">Our Global Collective</h2>
                        <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-300">
                            Meet the diverse team of changemakers building technology that serves humanity.
                        </p>

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {filters.map((filter) => (
                                <Button
                                    key={filter}
                                    variant={selectedFilter === filter ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedFilter(filter)}
                                    className={selectedFilter === filter ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0" : "glass text-gray-300 hover:text-white border-slate-700"}
                                >
                                    <Filter className="w-4 h-4 mr-1" />
                                    {filter}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Team Grid */}
                    <div className="grid max-w-5xl gap-6 mx-auto mb-12 md:grid-cols-2 lg:grid-cols-3">
                        {filteredTeam.map((member) => (
                            <Dialog key={member.id}>
                                <DialogTrigger asChild>
                                    <Card className="transition-all duration-300 cursor-pointer glass-card hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
                                        <CardContent className="p-6 text-center">
                                            <div className="relative w-24 h-24 mx-auto mb-4">
                                                <Image
                                                    src={member.image || "/placeholder.svg"}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover rounded-full ring-2 ring-cyan-500/30"
                                                />
                                                <div className="absolute text-2xl -bottom-1 -right-1">{member.flag}</div>
                                            </div>
                                            <h3 className="mb-1 font-bold text-white">{member.name}</h3>
                                            <p className="mb-1 text-sm text-cyan-400">{member.role}</p>
                                            <div className="flex items-center justify-center text-xs text-gray-400">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                {member.location}
                                            </div>
                                            <Badge variant="secondary" className="mt-2 text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                                                {member.specialty}
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl glass-card border-slate-700">
                                    <DialogHeader>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="relative w-16 h-16">
                                                <Image
                                                    src={member.image || "/placeholder.svg"}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover rounded-full ring-2 ring-cyan-500/30"
                                                />
                                            </div>
                                            <div>
                                                <DialogTitle className="text-xl text-white">{member.name}</DialogTitle>
                                                <DialogDescription className="font-medium text-cyan-400">{member.role}</DialogDescription>
                                                <div className="flex items-center mt-1 text-sm text-gray-400">
                                                    <MapPin className="w-3 h-3 mr-1" />
                                                    {member.location} {member.flag}
                                                </div>
                                            </div>
                                        </div>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <p className="text-gray-300">{member.bio}</p>
                                        <blockquote className="pl-4 italic text-gray-400 border-l-4 border-cyan-500">
                                            "{member.quote}"
                                        </blockquote>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>

                    {/* Group Photo */}
                    <div className="text-center">
                        <div className="relative inline-block">
                            <div className="relative rounded-2xl overflow-hidden glass-card glow-effect">
                                <Image
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&h=600&auto=format&fit=crop"
                                    alt="Team collaborating outdoors"
                                    width={1000}
                                    height={600}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center transition-opacity rounded-lg opacity-0 bg-slate-900/60 hover:opacity-100">
                                    <Button className="text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border-0">
                                        <Play className="w-4 h-4 mr-2" />
                                        Watch Culture Reel
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-400">Annual team hackathon in Bamako, Mali 2023</p>
                    </div>
                </div>
            </section>

            {/* How We Work */}
            <section className="py-20">
                <div className="container px-4 mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-bold">How We Work</h2>
                        <p className="max-w-2xl mx-auto text-xl text-gray-300">
                            Our methodology ensures every solution is community-driven, culturally appropriate, and globally scalable.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {workProcess.map((step, index) => (
                            <div key={index} className="flex items-start gap-6 mb-8 last:mb-0">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full shadow-lg shadow-blue-500/25">
                                        {step.step}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <step.icon className="w-6 h-6 text-cyan-400" />
                                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                    </div>
                                    <p className="text-gray-300">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Showcase */}
            <section className="py-20">
                <div className="container px-4 mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-bold">Our Impact</h2>
                        <p className="max-w-2xl mx-auto text-xl text-gray-300">
                            Real solutions creating measurable change in communities worldwide.
                        </p>
                    </div>

                    {/* Impact Stats */}
                    <div className="grid max-w-4xl gap-6 mx-auto mb-16 md:grid-cols-4">
                        {impactStats.map((stat, index) => (
                            <Card key={index} className="text-center glass-card hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                                <CardContent className="p-6">
                                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
                                    <div className="mb-1 text-3xl font-bold gradient-text">{stat.value}</div>
                                    <div className="text-sm text-gray-300">{stat.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Impact Stories */}
                    {/* <div className="grid max-w-6xl gap-8 mx-auto lg:grid-cols-3">
                        <Card className="transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-center w-12 h-12 mb-3 bg-pink-100 rounded-full">
                                    <Heart className="w-6 h-6 text-pink-600" />
                                </div>
                                <CardTitle className="text-xl">Maternal Health</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4 text-gray-600">
                                    AI-powered risk assessment reduced maternal mortality by 40% in pilot regions.
                                </p>
                                <div className="p-4 rounded-lg bg-gray-50">
                                    <div className="flex justify-between mb-2 text-sm">
                                        <span>Before</span>
                                        <span>After</span>
                                    </div>
                                    <div className="w-full h-2 mb-1 bg-gray-200 rounded-full">
                                        <div className="h-2 bg-red-500 rounded-full" style={{ width: "60%" }}></div>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full">
                                        <div className="h-2 bg-green-500 rounded-full" style={{ width: "36%" }}></div>
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">Maternal mortality rate per 100,000 births</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-center w-12 h-12 mb-3 bg-green-100 rounded-full">
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                </div>
                                <CardTitle className="text-xl">Disease Tracking</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4 text-gray-600">
                                    Outbreak prediction models provide 2-week early warning for disease surveillance.
                                </p>
                                <div className="relative h-32 overflow-hidden rounded-lg bg-gray-50">
                                    <Image
                                        src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=400&h=200&auto=format&fit=crop"
                                        alt="Disease tracking map visualization"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
                                        <Badge className="bg-green-600">14 Days Early Warning</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-center w-12 h-12 mb-3 bg-blue-100 rounded-full">
                                    <Stethoscope className="w-6 h-6 text-blue-600" />
                                </div>
                                <CardTitle className="text-xl">Diagnostic Access</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4 text-gray-600">
                                    Mobile diagnostics reduced cost by 90% and increased access by 500%.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Cost Reduction</span>
                                        <Badge variant="secondary">90% ↓</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Access Increase</span>
                                        <Badge variant="secondary">500% ↑</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Time to Diagnosis</span>
                                        <Badge variant="secondary">75% ↓</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div> */}
                </div>
            </section>

            {/* Join Section */}
            {/* <section className="py-20 bg-gray-50">
                <div className="container px-4 mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">Join Our Mission</h2>
                        <p className="max-w-2xl mx-auto text-xl text-gray-600">
                            Whether you're a technologist, healthcare professional, or passionate advocate, there's a place for you in
                            our global collective.
                        </p>
                    </div>

                    <div className="grid max-w-5xl gap-8 mx-auto lg:grid-cols-3">
                        <Card className="text-center transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                                    <Code className="w-8 h-8 text-blue-600" />
                                </div>
                                <CardTitle className="text-xl">Innovators</CardTitle>
                                <CardDescription>Bring your skills to build technology that saves lives</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-6 text-gray-600">
                                    Join our engineering, design, and research teams to create AI solutions that work in the world's most
                                    challenging environments.
                                </p>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    View Careers <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="text-center transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                                    <Users className="w-8 h-8 text-green-600" />
                                </div>
                                <CardTitle className="text-xl">Partners</CardTitle>
                                <CardDescription>Let's co-create solutions for your community</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-6 text-gray-600">
                                    Healthcare organizations, NGOs, and governments partnering with us to deploy AI solutions that respect
                                    local contexts.
                                </p>
                                <Button className="w-full bg-green-600 hover:bg-green-700">
                                    Collaborate <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="text-center transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full">
                                    <Heart className="w-8 h-8 text-yellow-600" />
                                </div>
                                <CardTitle className="text-xl">Allies</CardTitle>
                                <CardDescription>Support tools that reach the last mile first</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-6 text-gray-600">
                                    Your support helps us keep our tools open-source and accessible to communities that need them most.
                                </p>
                                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                                    Donate <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section> */}

            {/* Closing Banner */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2000&h=800&auto=format&fit=crop"
                        alt="Sunrise over rural clinic"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to black/30"></div>
                </div>

                <div className="container relative z-10 px-4 mx-auto text-center">
                    <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                        Technology that reaches
                        <br />
                        <span className="text-yellow-400">the last mile first.</span>
                    </h2>
                    <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-200">
                        Because every person, regardless of where they're born, deserves access to life-saving healthcare.
                    </p>
                    <Button size="lg" className="px-8 py-3 text-black bg-white hover:bg-gray-100">
                        Start Your Journey <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </section>

            {/* Value Detail Modal */}
            {selectedValue && (
                <Dialog open={!!selectedValue} onOpenChange={() => setSelectedValue(null)}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                                    <selectedValue.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <DialogTitle className="text-2xl">{selectedValue.title}</DialogTitle>
                            </div>
                        </DialogHeader>
                        <div className="space-y-4">
                            <p className="text-gray-300">{selectedValue.description}</p>
                            <div className="p-4 rounded-lg ">
                                <h4 className="mb-2 font-semibold text-gray-400">Real Example:</h4>
                                <p className="text-gray-300">{selectedValue.example}</p>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            <Footer />
        </div>
    )
}
