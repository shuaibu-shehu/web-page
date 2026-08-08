"use client"

import { Button } from "@/components/ui/button"
import { Bot, Menu } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import type React from "react" // Added import for React
import { useRef } from "react"

import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { cn } from "@/lib/utils"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu"
import { MobileNavbar } from "./mobile-navbar"
import { ContactForm } from "./contact-form"

interface NavbarProps {
    newsletterRef?: React.RefObject<HTMLElement>,
    scrollToNewsletter?: () => void
}
export default function Navbar({
    newsletterRef,
    scrollToNewsletter
}: NavbarProps) {

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-[99] flex items-center justify-between px-6 py-4 glass border-b border-white/10"
        >
            <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-white">Code<span className="gradient-text">Therapy</span></span>
            </Link>



            <div className="items-center hidden space-x-8 md:flex">
                <Menubar className="items-center hidden space-x-8 bg-transparent border-none md:flex">

                    <NavLink href="/projects/">Projects</NavLink>
                    <NavLink href="/partnerships/">Partnerships</NavLink>
                    <NavLink href="/about/">About</NavLink>
                    {/* <MenubarMenu>
            <MenubarTrigger>
                <NavLink>About</NavLink>
            </MenubarTrigger>
            <MenubarContent className="border rounded-md shadow-md bg-background z-[100] border-white/10">
                <MenubarItem>
                    <NavLink href="/team/">Team</NavLink>
                </MenubarItem>
                <MenubarItem>
                    <NavLink href="/purpose/">Our Purpose</NavLink>
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu> */}
                </Menubar >
            </div >
            <div className="items-center hidden space-x-4 md:flex">
                {/* <Button variant="ghost" className="text-white hover:text-purple-400">
                    Sign In
                </Button>
                <Button className="text-white bg-blue-800 hover:bg-blue-700">Get Started</Button> */}
                <ContactForm>
                    <Button
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/25"
                        onClick={scrollToNewsletter}
                    >
                        Partner with us
                    </Button>
                </ContactForm>
            </div>
            <MobileNavbar>
                <Button variant="ghost" size="icon" className="text-white md:hidden">
                    <Menu className="w-6 h-6" />
                </Button>
            </MobileNavbar>
        </motion.nav>
    )
}

export function NavLink({ href, children, className }: { href?: string; children: React.ReactNode, className?: string }) {
    if (href) {
        return (
            <Link href={href} className={cn("relative text-gray-300 transition-colors hover:text-white group", className)} >
                {children}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all group-hover:w-full" />
            </Link>
        )
    }

    return (
        <span className={cn("relative text-gray-300 transition-colors hover:text-white group", className)}>
            {children}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all group-hover:w-full" />
        </span>
    )
}


// {/* <div className="items-center hidden space-x-8 md:flex">
//     <Menubar className="items-center hidden space-x-8 border-none md:flex">

//         <NavLink href="/Purpose/">Our Purpose</NavLink>
//         <NavLink href="/Projects/">Projects</NavLink>
//         <NavLink href="/Partnerships/">Partnerships</NavLink>
//         {/* <NavLink href="/topics/">Topics</NavLink> */}
//         <MenubarMenu>
//             <MenubarTrigger>
//                 <NavLink>About</NavLink>
//             </MenubarTrigger>
//             <MenubarContent className="border rounded-md shadow-md bg-background z-[100] border-white/10">
//                 <MenubarItem>
//                     <NavLink href="/about/team/">Team</NavLink>
//                 </MenubarItem>
//                 <MenubarItem>
//                     <NavLink href="/about/team/">Our Purpose</NavLink>
//                 </MenubarItem>
//             </MenubarContent>
//         </MenubarMenu>
//     </Menubar >
//     </div >*/}


// {/* <div className="items-center hidden space-x-8 md:flex">
//                 <NavigationMenu  className="items-center hidden space-x-8 border-none md:flex">
//                     <NavigationMenuList className="items-center hidden space-x-8 border-none md:flex">
//                 <NavLink href="/Purpose/">Our Purpose</NavLink>
//                 <NavLink href="/Projects/">Projects</NavLink>
//                 <NavLink href="/Partnerships/">Partnerships</NavLink>
//                 {/* <NavLink href="/topics/">Topics</NavLink> */}
// <NavigationMenuItem >
//     <NavigationMenuTrigger >
//         <NavLink>About</NavLink>
//     </NavigationMenuTrigger>
//     <NavigationMenuContent>
//         <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//             <li className="row-span-3">
//                 <NavigationMenuLink asChild>
//                     <NavLink href="/about/team/">Team</NavLink>

//                 </NavigationMenuLink>
//             </li>

//         </ul>
//     </NavigationMenuContent>
// </NavigationMenuItem>
//                   </NavigationMenuList >
//                 </NavigationMenu >
//             </div > */}