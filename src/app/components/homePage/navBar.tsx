"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"


function GradientMenuIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="menuGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0074E5" />
                    <stop offset="100%" stopColor="#162660" />
                </linearGradient>
            </defs>
            <rect x="3" y="6" width="18" height="2.5" rx="1.25" fill="url(#menuGradient)" />
            <rect x="3" y="11" width="18" height="2.5" rx="1.25" fill="url(#menuGradient)" />
            <rect x="8" y="16" width="12" height="2.5" rx="1.25" fill="url(#menuGradient)" />
        </svg>
    )
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [showNavbar, setShowNavbar] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    const servicesItems = [
        "All Services",
        "Strategy Consulting",
        "Digital Asset Development",
        "SEO Services",
        "Paid Media & Advertising",
        "Social Media Management",
    ]

    const insightsItems = ["All Insights", "Case Studies", "Expert Insights"]

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // 🧩 Kéo xuống -> ẩn navbar
                setShowNavbar(false)
            } else {
                // 🧩 Kéo lên -> hiện navbar
                setShowNavbar(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    return (
        <AnimatePresence>
            {showNavbar && (
                <motion.nav
                    initial={{ y: -80 }}
                    animate={{ y: 0 }}
                    exit={{ y: -80 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            {/* Logo */}
                            <Link href="/" className="flex-shrink-0">
                                <Image
                                    src="/assets/logo.png"
                                    alt="Onelink Marketing"
                                    width={180}
                                    height={50}
                                    className="h-12 w-auto"
                                />
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center gap-8">
                                <Link href="/" className="neulis-alt-regular text-[#000a1d] hover:text-[#0066FF] transition-colors font-medium">
                                    Home
                                </Link>

                                {/* Services Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="neulis-alt-regular flex items-center gap-1 text-[#000a1d] hover:text-[#0066FF] transition-colors font-medium outline-none">
                                        Services
                                        <ChevronDown className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-64 bg-[#000a1d] border-none p-4">
                                        {servicesItems.map((item) => {
                                            const isAll = item === "All Services"
                                            return (
                                                <DropdownMenuItem
                                                    key={item}
                                                    className={`group neulis-alt-regular text-white cursor-pointer py-2.5 px-3 rounded-sm transition-all 
                                                        ${isAll ? "hover:bg-white/10" : "pl-6 hover:bg-white/10"}`}
                                                >
                                                    {!isAll && (
                                                        <span className="absolute left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                            ▶
                                                        </span>
                                                    )}
                                                    <Link
                                                        href={isAll ? "/service" : `/service/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                                        className={`block w-full transition-all duration-200 ${isAll ? "" : "group-hover:translate-x-1"}`}
                                                    >
                                                        {item}
                                                    </Link>
                                                </DropdownMenuItem>
                                            )
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>


                                <Link href="/about" className="neulis-alt-regular text-[#000a1d] hover:text-[#0066FF] transition-colors font-medium">
                                    About Us
                                </Link>

                                {/* Insights Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="neulis-alt-regular flex items-center gap-1 text-[#000a1d] hover:text-[#0066FF] transition-colors font-medium outline-none">
                                        Insights
                                        <ChevronDown className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 bg-[#000a1d] border-none p-4">
                                        {insightsItems.map((item) => {
                                            const isAll = item === "All Insights"
                                            return (
                                                <DropdownMenuItem
                                                    key={item}
                                                    className={`group neulis-alt-regular text-white cursor-pointer py-2.5 px-3 rounded-sm transition-all 
          ${isAll ? "hover:bg-white/10" : "pl-6 hover:bg-white/10"}`}
                                                >
                                                    {!isAll && (
                                                        <span className="absolute left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                            ▶
                                                        </span>
                                                    )}
                                                    <Link
                                                        href={isAll ? "/insights" : `/insights/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                                        className={`block w-full transition-all duration-200 ${isAll ? "" : "group-hover:translate-x-1"}`}
                                                    >
                                                        {item}
                                                    </Link>
                                                </DropdownMenuItem>
                                            )
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>


                                <Link href="/contact" className="neulis-alt-regular text-[#000a1d] hover:text-[#0066FF] transition-colors font-medium">
                                    Contact Us
                                </Link>
                            </div>

                            {/* CTA Button and Mobile Menu */}
                            <div className="flex items-center gap-3">
                                <Button className="neulis-alt-regular bg-gradient-to-r from-[#0074E5] to-[#162660] hover:opacity-90 text-white px-6 py-2 rounded-full font-medium transition-opacity">
                                    Let&apos;s Talk
                                </Button>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="
                                relative
                                p-[2px]
                                rounded-full
                                bg-white
                                border
                                border-none
                                shadow-sm
                                hover:shadow-md
                                transition-all
                            "
                                >
                                    <div className="rounded-full w-full h-full flex items-center justify-center">
                                        <GradientMenuIcon />
                                    </div>

                                    {/* Lớp gradient viền mảnh phía sau */}
                                    <span
                                        className="
                                    absolute inset-0 rounded-full p-[1px]
                                    bg-gradient-to-r from-[#0074E5] to-[#162660]
                                    -z-10
                                    "
                                    ></span>
                                </Button>


                                {/* Mobile Menu Toggle */}
                                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                    <SheetTrigger asChild className="lg:hidden">
                                        <Button variant="ghost" size="icon" className="text-[#0066FF]">
                                            <Menu className="h-6 w-6" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className="w-[300px] bg-white">
                                        <div className="flex flex-col gap-6 mt-8">
                                            <Link
                                                href="/"
                                                className="text-[#000a1d] hover:text-[#0066FF] transition-colors font-medium text-lg"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Home
                                            </Link>

                                            {/* Mobile Services */}
                                            <div className="flex flex-col gap-3">
                                                <span className="text-[#000a1d] font-medium text-lg">Services</span>
                                                <div className="flex flex-col gap-2 pl-4">
                                                    {servicesItems.map((item) => (
                                                        <Link
                                                            key={item}
                                                            href={`/services/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                                            className="text-[#444444] hover:text-[#0066FF] transition-colors"
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {item}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            <Link
                                                href="/about"
                                                className="text-[#000a1d] hover:text-[#0066FF] transition-colors font-medium text-lg"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                About Us
                                            </Link>

                                            {/* Mobile Insights */}
                                            <div className="flex flex-col gap-3">
                                                <span className="text-[#000a1d] font-medium text-lg">Insights</span>
                                                <div className="flex flex-col gap-2 pl-4">
                                                    {insightsItems.map((item) => (
                                                        <Link
                                                            key={item}
                                                            href={`/insights/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                                            className="text-[#444444] hover:text-[#0066FF] transition-colors"
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {item}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            <Link
                                                href="/contact"
                                                className="text-[#000a1d] hover:text-[#0066FF] transition-colors font-medium text-lg"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Contact Us
                                            </Link>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    )
}
