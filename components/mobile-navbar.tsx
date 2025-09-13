import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { motion } from "framer-motion"
import Link from "next/link"
import { NavLink } from "./navbar"
import { ContactForm } from "./contact-form"

export function MobileNavbar({ children }: { children?: React.ReactNode }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="w-full z-[999] text-center">
                <SheetHeader>
                    <SheetTitle className="text-center ">Menu</SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                </SheetHeader>

                <motion.nav
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    className="sticky top-0 z-[99] flex flex-col items-center justify-between px-6 py-4 border-b border-white/10 bg-background/80 backdrop-blur-3xl"
                >
                    <div className="flex flex-col justify-center gap-4 items-centers ">

                        <NavLink href="/projects/">
                            <SheetClose asChild>
                                <Button variant={"default"} className="text-white bg-transparent hover:bg-transparent ">
                                    Projects
                                </Button>
                            </SheetClose>
                        </NavLink>

                        <NavLink href="/partnerships/">
                            <SheetClose asChild>
                                <Button variant={"default"} className="text-white bg-transparent hover:bg-transparent ">
                                    Partnerships
                                </Button>
                            </SheetClose>
                        </NavLink>

                        <NavLink href="/about/">
                            <SheetClose asChild>
                                <Button variant={"default"} className="text-white bg-transparent hover:bg-transparent ">
                                    About
                                </Button>
                            </SheetClose>
                        </NavLink>
                    </div >
                    <div className="items-center m-10 space-x-4 md:flex">
                        <SheetClose asChild>
                            <ContactForm>
                            <Button
                                variant="outline"
                                className="text-blue-500 border-blue-500 hover:bg-blue-950 hover:text-white"
                            >
                                Partner with us
                                </Button>
                            </ContactForm>
                        </SheetClose>
                    </div>
                </motion.nav>

            </SheetContent>
        </Sheet>
    )
}
