"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
// 🚀 CẬP NHẬT: Xóa Sub (không còn dùng)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// THÊM MỚI: Imports cho Collapsible (vẫn dùng cho Services)
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"

// ... (Component GradientMenuIcon không đổi) ...
function GradientMenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="menuGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0074E5" />
          <stop offset="100%" stopColor="#162660" />
        </linearGradient>
      </defs>
      <rect
        x="3"
        y="6"
        width="18"
        height="2.5"
        rx="1.25"
        fill="url(#menuGradient)"
      />
      <rect
        x="3"
        y="11"
        width="18"
        height="2.5"
        rx="1.25"
        fill="url(#menuGradient)"
      />
      <rect
        x="8"
        y="16"
        width="12"
        height="2.5"
        rx="1.25"
        fill="url(#menuGradient)"
      />
    </svg>
  )
}


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  // 🚀 CẬP NHẬT: Xóa state của Insights và Case Studies
  const [servicesOpen, setServicesOpen] = useState(false)

  const [showNavbar, setShowNavbar] = useState(true)
  const lastScrollY = useRef(0)

  // Dữ liệu Services (giữ nguyên)
  const servicesItems = [
    "All Services",
    "Strategy Consulting",
    "Digital Asset Development",
    "SEO Services",
    "Paid Media & Advertising",
    "Social Media Management",
  ]

  // 🚀 CẬP NHẬT: Xóa insightsNavigation (không còn dùng)


  // ... (useEffect cho scroll không đổi) ...
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const inShowcase = document.body.classList.contains("in-showcase")

      if (inShowcase) {
        if (showNavbar) setShowNavbar(false)
        lastScrollY.current = currentScrollY
        return
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        if (showNavbar) setShowNavbar(false)
      } else {
        if (!showNavbar) setShowNavbar(true)
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showNavbar])


  // Hàm đóng sheet và reset accordions
  const closeSheet = () => {
    setIsOpen(false)
    setServicesOpen(false)
    // 🚀 CẬP NHẬT: Xóa reset state không còn tồn tại
  }

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
              {/* Logo (giữ nguyên) */}
              <Link href="/" className="shrink-0">
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
                <Link
                  href="/"
                  className="generalsans-regular text-[#000a1d] hover:text-[#0066FF] transition-colors font-medium"
                >
                  Home
                </Link>

                {/* Services Dropdown (giữ nguyên) */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="generalsans-regular flex items-center gap-1 text-[#000a1d] hover:text-[#0066FF] transition-colors font-medium outline-none">
                    Services
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-[#000a1d] border-none p-4">
                    {servicesItems.map((item) => {
                      const isAll = item === "All Services"
                      return (
                        <DropdownMenuItem
                          key={item}
                          className={`group generalsans-regular text-white cursor-pointer py-2.5 px-3 rounded-sm transition-all 
                                        ${
                                          isAll
                                            ? "hover:bg-white/10"
                                            : "pl-6 hover:bg-white/10"
                                        }`}
                        >
                          {!isAll && (
                            <span className="absolute left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              ▶
                            </span>
                          )}
                          <Link
                            href={
                              isAll
                                ? "/service"
                                : `/service/${item
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`
                            }
                            className={`block w-full transition-all duration-200 ${
                              isAll ? "" : "group-hover:translate-x-1"
                            }`}
                          >
                            {item}
                          </Link>
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link
                  href="/about"
                  className="generalsans-regular text-[#000a1d] hover:text-[#0066FF] transition-colors font-medium"
                >
                  About Us
                </Link>

                {/* 🚀 CẬP NHẬT: Insights đã đổi thành Case Studies (Link đơn) */}
                <Link
                  href="/case-studies"
                  className="generalsans-regular text-[#000a1d] hover:text-[#0066FF] transition-colors font-medium"
                >
                  Case Studies
                </Link>
              </div>

              {/* CTA Button and Mobile Menu (giữ nguyên) */}
              <div className="flex items-center gap-3">
                <Link href="/contact" className="hidden lg:flex">
                  <button className="relative overflow-hidden px-6 py-2 rounded-full generalsans-regular text-white bg-linear-to-r from-[#0074E5] to-[#162660] transition-colors duration-300 group">
                    <span className="relative z-20 flex items-center justify-center w-full h-full transition-colors duration-500 group-hover:text-[#162660]">
                      Let&apos;s Talk
                    </span>
                    <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-10"></span>
                    <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#444444] transition-colors duration-300 z-10 pointer-events-none"></span>
                  </button>
                </Link>

                {/* --- MENU MOBILE --- */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button
                      variant="outline"
                      size="icon"
                      className="relative p-0.5 rounded-full bg-white border-none shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="rounded-full w-full h-full flex items-center justify-center">
                        <GradientMenuIcon />
                      </div>
                      <span className="absolute inset-0 rounded-full p-px z-10"></span>
                    </Button>
                  </SheetTrigger>

                  {/* --- NỘI DUNG SHEET --- */}
                  <SheetContent
                    side="right"
                    className="w-75 sm:w-87.5 bg-white p-6 flex flex-col"
                  >
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                    {/* 1. Header Logo trong Sheet */}
                    <div className="pb-4 border-b border-gray-200">
                      <Link href="/" onClick={closeSheet}>
                        <Image
                          src="/assets/logo.png"
                          alt="Onelink Marketing"
                          width={160}
                          height={45}
                          className="h-10 w-auto"
                        />
                      </Link>
                    </div>

                    {/* 2. Danh sách Links */}
                    <div className="grow mt-6 flex flex-col gap-2">
                      <Link
                        href="/"
                        className="generalsans-regular text-[#000a1d] hover:text-[#0066FF] transition-colors font-semibold text-xl py-3"
                        onClick={closeSheet}
                      >
                        Home
                      </Link>

                      {/* Mobile Services (Accordion - giữ nguyên) */}
                      <Collapsible
                        open={servicesOpen}
                        onOpenChange={setServicesOpen}
                      >
                        <CollapsibleTrigger className="flex items-center justify-between w-full generalsans-regular text-[#000a1d] hover:text-[#0066FF] transition-colors font-semibold text-xl py-3">
                          <span>Services</span>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              servicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="flex flex-col gap-1 pl-6 pt-2 pb-2">
                          {servicesItems.map((item) => {
                            const isAll = item === "All Services"
                            const href = isAll
                              ? "/service"
                              : `/service/${item
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`

                            return (
                              <Link
                                key={item}
                                href={href}
                                className="generalsans-regular text-[#444444] hover:text-[#0066FF] transition-colors py-2 text-base"
                                onClick={closeSheet}
                              >
                                {item}
                              </Link>
                            )
                          })}
                        </CollapsibleContent>
                      </Collapsible>

                      <Link
                        href="/about"
                        className="generalsans-regular text-[#000a1d] hover:text-[#0066FF] transition-colors font-semibold text-xl py-3"
                        onClick={closeSheet}
                      >
                        About Us
                      </Link>

                      {/* 🚀 CẬP NHẬT: Insights đã đổi thành Case Studies (Link đơn) */}
                      <Link
                        href="/case-studies"
                        className="generalsans-regular text-[#000a1d] hover:text-[#0066FF] transition-colors font-semibold text-xl py-3"
                        onClick={closeSheet}
                      >
                        Case Studies
                      </Link>
                    </div>

                    {/* 3. Nút CTA "Let's Talk" */}
                    <div className="mt-8 mb-4">
                      <Link
                        href="/contact"
                        onClick={closeSheet}
                        className="block"
                      >
                        <button className="relative overflow-hidden w-full px-6 py-3 rounded-full generalsans-regular text-white bg-linear-to-r from-[#0074E5] to-[#162660] transition-colors duration-300 group">
                          <span className="relative z-20 flex items-center justify-center w-full h-full transition-colors duration-500 group-hover:text-[#162660]">
                            Let&apos;s Talk
                          </span>
                          <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-10"></span>
                          <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#444444] transition-colors duration-300 z-10 pointer-events-none"></span>
                        </button>
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