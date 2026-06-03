"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"

/* ── Icons ──────────────────────────────────────────── */

function GradientMenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="menuGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0074E5" />
          <stop offset="100%" stopColor="#162660" />
        </linearGradient>
      </defs>
      <rect x="3" y="6"  width="18" height="2.5" rx="1.25" fill="url(#menuGradient)" />
      <rect x="3" y="11" width="18" height="2.5" rx="1.25" fill="url(#menuGradient)" />
      <rect x="8" y="16" width="12" height="2.5" rx="1.25" fill="url(#menuGradient)" />
    </svg>
  )
}

function GradientChevronDown({ uid }: { uid: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <defs>
        <linearGradient id={`cg-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0074E5" />
          <stop offset="100%" stopColor="#60BFFF" />
        </linearGradient>
      </defs>
      <path d="M3 5.5l5 5 5-5" stroke={`url(#cg-${uid})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* Gradient 2-line hamburger for compact glass navbar */
function GradientTwoLineIcon({ dark }: { dark?: boolean }) {
  const bg = dark ? "white" : "linear-gradient(to right, #0074E5, #162660)"
  const line: React.CSSProperties = {
    display: "block",
    height: "2.2px",
    width: "22px",
    borderRadius: "2px",
    background: bg,
  }
  return (
    <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <span style={line} />
      <span style={line} />
    </span>
  )
}

function CloseIcon({ dark }: { dark?: boolean }) {
  const bg = dark ? "white" : "linear-gradient(to right, #0074E5, #162660)"
  const baseBar: React.CSSProperties = {
    position: "absolute",
    display: "block",
    height: "2.2px",
    width: "20px",
    borderRadius: "2px",
    background: bg,
    top: "50%",
    left: "50%",
    transformOrigin: "center",
  }
  return (
    <span style={{ position: "relative", display: "inline-block", width: "20px", height: "20px" }}>
      <span style={{ ...baseBar, transform: "translate(-50%, -50%) rotate(45deg)" }} />
      <span style={{ ...baseBar, transform: "translate(-50%, -50%) rotate(-45deg)" }} />
    </span>
  )
}

/* Detect whether the background behind the navbar (skip navbar itself) is dark */
function bgIsDark(x: number, y: number, skip: Element | null): boolean {
  const elements = document.elementsFromPoint(x, y)
  for (const el of elements) {
    if (skip?.contains(el)) continue
    if (el === document.documentElement || el === document.body) continue

    const style = getComputedStyle(el)

    // skip fixed/sticky overlays that aren't the section background
    if (style.position === "fixed" || style.position === "sticky") continue

    // skip elements using backgroundColor as a text-gradient clip, not a real bg
    if (style.backgroundClip === "text" || style.getPropertyValue("-webkit-background-clip") === "text") continue

    const bg = style.backgroundColor
    const m  = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/)
    if (m) {
      const alpha = m[4] !== undefined ? parseFloat(m[4]) : 1
      if (alpha > 0.3) {
        const lum = (parseInt(m[1]) * 299 + parseInt(m[2]) * 587 + parseInt(m[3]) * 114) / 1000
        return lum < 80
      }
    }
  }
  return false
}

/* ── Data ───────────────────────────────────────────── */
const servicesItems = [
  "All Services",
  "Strategy Consulting",
  "Digital Asset Development",
  "Search Engine Optimization",
  "Paid Media & Advertising",
  "Social Media Management",
]

const compactNavLinks = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/service" },
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
]

/* ── Component ──────────────────────────────────────── */
export default function Navbar() {
  const pathname = usePathname()
  const isHome   = pathname === "/"

  const [isScrolled,          setIsScrolled]          = useState(false)
  const [menuOpen,            setMenuOpen]            = useState(false)
  const [sheetOpen,           setSheetOpen]           = useState(false)
  const [servicesOpen,        setServicesOpen]        = useState(false)
  const [compactServicesOpen, setCompactServicesOpen] = useState(false)
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false)
  const [isDarkBg,            setIsDarkBg]            = useState(false)
  const compactNavRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 80
      setIsScrolled(scrolled)
      if (!scrolled) setMenuOpen(false)
      setIsDarkBg(bgIsDark(window.innerWidth / 2, 30, compactNavRef.current))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const closeSheet = () => {
    setSheetOpen(false)
    setServicesOpen(false)
  }

  const EASE = [0.4, 0, 0.2, 1] as const

  return (
    <>
      {/* ══════════════════════════════════════════
          COMPACT GLASS NAVBAR — desktop only
          hidden on mobile, AnimatePresence on desktop
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            ref={compactNavRef}
            key="compact-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1,  y: 0 }}
            exit={{ opacity: 0,    y: -20 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="hidden lg:flex fixed top-4 left-0 right-0 z-50 justify-center px-4 pointer-events-none"
          >
            <div
              className="w-full max-w-sm rounded-xl overflow-hidden pointer-events-auto"
              style={{
                background: "rgba(255, 255, 255, 0.22)",
                backdropFilter: "blur(24px) saturate(160%)",
                WebkitBackdropFilter: "blur(24px) saturate(160%)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.18)",
              }}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between gap-5 px-5 py-3">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <Image
                    src={isDarkBg ? "/assets/logoWhite.png" : "/assets/logo.png"}
                    alt="Onelink Marketing"
                    width={180}
                    height={50}
                    className="h-10 w-auto transition-opacity duration-200"
                    priority
                  />
                </Link>

                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  <button className={`relative overflow-hidden px-6 py-2 rounded-xl generalsans-regular text-sm transition-colors duration-300 group ${
                    isDarkBg
                      ? "bg-white text-[#162660]"
                      : "bg-linear-to-r from-[#0074E5] to-[#162660] text-white"
                  }`}>
                    <span className={`relative z-20 flex items-center justify-center w-full h-full transition-colors duration-500 ${
                      isDarkBg ? "group-hover:text-white" : "group-hover:text-[#162660]"
                    }`}>
                      Let&apos;s Talk
                    </span>
                    <span className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-xl z-10 ${
                      isDarkBg
                        ? "bg-linear-to-r from-[#0074E5] to-[#162660]"
                        : "bg-white"
                    }`} />
                    <span className={`absolute inset-0 rounded-xl border border-transparent transition-colors duration-300 z-10 pointer-events-none ${
                      isDarkBg ? "group-hover:border-[#0074E5]" : "group-hover:border-[#444444]"
                    }`} />
                  </button>
                </Link>

                <button
                  onClick={() => { setMenuOpen((v) => { if (v) setCompactServicesOpen(false); return !v }) }}
                  className="p-2 rounded-xl transition-colors hover:bg-black/8"
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {menuOpen ? (
                      <motion.span
                        key="x"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0,   opacity: 1 }}
                        exit={{ rotate: 90,  opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex"
                      >
                        <CloseIcon dark={isDarkBg} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="menu"
                        initial={{ rotate: 90,  opacity: 0 }}
                        animate={{ rotate: 0,   opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex"
                      >
                        <GradientTwoLineIcon dark={isDarkBg} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Dropdown */}
              <AnimatePresence initial={false}>
                {menuOpen && (
                  <motion.div
                    key="menu-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className={`mx-5 h-px ${isDarkBg ? "bg-white/20" : "bg-black/10"}`} />
                    <div className="px-5 pt-4 pb-6">
                      <p className={`generalsans-regular text-[13px] mb-3 ${isDarkBg ? "text-white/50" : "text-gray-700"}`}>
                        Menu
                      </p>
                      <nav className="flex flex-col">
                        {compactNavLinks.map((item) => {
                          if (item.label === "Services") {
                            return (
                              <div key="services-compact">
                                <button
                                  onClick={() => setCompactServicesOpen((v) => !v)}
                                  className={`w-full flex items-center justify-between generalsans-regular text-2xl font-semibold transition-colors leading-snug py-1 ${
                                    isDarkBg ? "text-white hover:text-white/70" : "text-[#0a0a1a] hover:text-[#0074E5]"
                                  }`}
                                >
                                  <span>Services</span>
                                  <span className={`transition-transform duration-300 ${compactServicesOpen ? "rotate-180" : ""}`}>
                                    <GradientChevronDown uid="compact-services" />
                                  </span>
                                </button>

                                <AnimatePresence initial={false}>
                                  {compactServicesOpen && (
                                    <motion.div
                                      key="compact-services-list"
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                                      className="overflow-hidden"
                                    >
                                      <div className="flex flex-col pl-2 py-1 gap-0.5">
                                        {servicesItems.map((svc) => {
                                          const isAll = svc === "All Services"
                                          const href  = isAll ? "/service" : `/service/${svc.toLowerCase().replace(/\s+/g, "-")}`
                                          return (
                                            <Link
                                              key={svc}
                                              href={href}
                                              onClick={() => { setMenuOpen(false); setCompactServicesOpen(false) }}
                                              className={`group flex items-center overflow-hidden generalsans-regular text-base py-1.5 transition-colors ${
                                                isDarkBg ? "text-white/70 hover:text-white" : "text-[#444444] hover:text-[#0074E5]"
                                              }`}
                                            >
                                              {!isAll && (
                                                <div className="shrink-0 w-0 h-2.5 bg-[#0074E5] opacity-0 group-hover:w-2.5 group-hover:opacity-100 group-hover:mr-2 transition-all duration-300 ease-out" />
                                              )}
                                              {svc}
                                            </Link>
                                          )
                                        })}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )
                          }
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              className={`generalsans-regular text-2xl font-semibold transition-colors leading-snug py-1 ${
                                isDarkBg
                                  ? "text-white hover:text-white/70"
                                  : "text-[#0a0a1a] hover:text-[#0074E5]"
                              }`}
                            >
                              {item.label}
                            </Link>
                          )
                        })}
                      </nav>
                      <div className={`mt-6 pt-4 border-t ${isDarkBg ? "border-white/20" : "border-black/10"}`}>
                        <p className={`generalsans-regular text-[13px] mb-1 ${isDarkBg ? "text-white/50" : "text-gray-700"}`}>
                          Work With Us
                        </p>
                        <a
                          href="mailto:neil@onelinkmarketing.com"
                          className={`generalsans-regular text-sm hover:underline ${isDarkBg ? "text-white/80" : "text-[#0a0a1a]"}`}
                        >
                          neil@onelinkmarketing.com
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          MOBILE: hamburger button — fixed top-right, always visible
      ══════════════════════════════════════════ */}
      <div className="lg:hidden fixed top-10 right-4 z-50">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative p-0.5 rounded-full bg-white border-none shadow-sm hover:shadow-md transition-all">
              <div className="rounded-full w-full h-full flex items-center justify-center">
                <GradientMenuIcon />
              </div>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-75 sm:w-87.5 bg-white p-6 flex flex-col" style={{ willChange: "transform" }}>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="pb-4 border-b border-gray-200">
              <Link href="/" onClick={closeSheet}>
                <Image src="/assets/logo.png" alt="Onelink Marketing" width={160} height={45} className="h-10 w-auto" />
              </Link>
            </div>

            <div className="grow mt-6 flex flex-col gap-2">
              <Link href="/" className="generalsans-regular text-[#000a1d] hover:text-[#0066FF] transition-colors font-semibold text-xl py-3" onClick={closeSheet}>
                Home
              </Link>

              <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full generalsans-regular text-[#000a1d] hover:text-[#0066FF] transition-colors font-semibold text-xl py-3">
                  <span>Services</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col gap-1 pl-6 pt-2 pb-2">
                  {servicesItems.map((item) => {
                    const isAll = item === "All Services"
                    const href  = isAll ? "/service" : `/service/${item.toLowerCase().replace(/\s+/g, "-")}`
                    return (
                      <Link key={item} href={href} className="generalsans-regular text-[#444444] hover:text-[#0066FF] transition-colors py-2 text-base" onClick={closeSheet}>
                        {item}
                      </Link>
                    )
                  })}
                </CollapsibleContent>
              </Collapsible>

              <Link href="/about" className="generalsans-regular text-[#000a1d] hover:text-[#0066FF] transition-colors font-semibold text-xl py-3" onClick={closeSheet}>
                About Us
              </Link>

              <Link href="/case-studies" className="generalsans-regular text-[#000a1d] hover:text-[#0066FF] transition-colors font-semibold text-xl py-3" onClick={closeSheet}>
                Case Studies
              </Link>
            </div>

            <div className="mt-8 mb-4">
              <Link href="/contact" onClick={closeSheet} className="block">
                <button className="relative overflow-hidden w-full px-6 py-3 rounded-full generalsans-regular text-white bg-linear-to-r from-[#0074E5] to-[#162660] transition-colors duration-300 group">
                  <span className="relative z-20 flex items-center justify-center w-full h-full transition-colors duration-500 group-hover:text-[#162660]">
                    Let&apos;s Talk
                  </span>
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-10" />
                  <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#444444] transition-colors duration-300 z-10 pointer-events-none" />
                </button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE: logo cho non-home pages — mờ dần khi scroll
      ══════════════════════════════════════════ */}
      {!isHome && (
        <div
          className={[
            "lg:hidden fixed top-5 left-4 z-40 transition-opacity duration-150",
            isScrolled ? "opacity-0 pointer-events-none" : "opacity-100",
          ].join(" ")}
        >
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="Onelink Marketing"
              width={140}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>
      )}

      {/* ══════════════════════════════════════════
          DESKTOP FULL NAVBAR — hidden on mobile
      ══════════════════════════════════════════ */}
      <nav
        className={[
          "hidden lg:block fixed top-0 left-0 w-full z-40 transition-opacity duration-200",
          !isHome ? "bg-white shadow-sm" : "",
          isScrolled ? "opacity-0 pointer-events-none" : "",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex shrink-0">
              <Image
                src={isHome ? "/assets/logoWhite.png" : "/assets/logo.png"}
                alt="Onelink Marketing"
                width={180}
                height={50}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop links */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className={`generalsans-regular transition-colors font-medium ${
                  isHome ? "text-white hover:text-white/75" : "text-[#0a0a1a] hover:text-[#0074E5]"
                }`}
              >
                Home
              </Link>

              <DropdownMenu open={desktopServicesOpen} onOpenChange={setDesktopServicesOpen}>
                <DropdownMenuTrigger
                  className={`generalsans-regular flex items-center gap-1.5 transition-colors font-medium outline-none ${
                    isHome ? "text-white hover:text-white/75" : "text-[#0a0a1a] hover:text-[#0074E5]"
                  }`}
                >
                  Services
                  <span className={`transition-transform duration-300 ${desktopServicesOpen ? "rotate-180" : ""}`}>
                    <GradientChevronDown uid="services" />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={`w-64 border-none p-4 ${isHome ? "bg-[#000a1d]" : "bg-white shadow-lg"}`}>
                  {servicesItems.map((item) => {
                    const isAll = item === "All Services"
                    return (
                      <DropdownMenuItem
                        key={item}
                        className={`group generalsans-regular cursor-pointer py-2.5 px-3 rounded-sm transition-all ${
                          isHome
                            ? `text-white ${isAll ? "hover:bg-white/10" : "hover:bg-white/10"}`
                            : `text-[#0a0a1a] ${isAll ? "hover:bg-gray-100" : "hover:bg-gray-100"}`
                        }`}
                      >
                        <div className="flex items-center overflow-hidden">
                          {!isAll && (
                            <div className="shrink-0 w-0 h-3 bg-[#0074E5] opacity-0 group-hover:w-3 group-hover:opacity-100 group-hover:mr-2 transition-all duration-300 ease-out" />
                          )}
                          <Link
                            href={isAll ? "/service" : `/service/${item.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block w-full"
                          >
                            {item}
                          </Link>
                        </div>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/about"
                className={`generalsans-regular transition-colors font-medium ${
                  isHome ? "text-white hover:text-white/75" : "text-[#0a0a1a] hover:text-[#0074E5]"
                }`}
              >
                About Us
              </Link>

              <Link
                href="/case-studies"
                className={`generalsans-regular transition-colors font-medium ${
                  isHome ? "text-white hover:text-white/75" : "text-[#0a0a1a] hover:text-[#0074E5]"
                }`}
              >
                Case Studies
              </Link>
            </div>

            {/* CTA */}
            <Link href="/contact">
              <button className="relative overflow-hidden px-6 py-2 rounded-full generalsans-regular text-white bg-linear-to-r from-[#0074E5] to-[#162660] transition-colors duration-300 group">
                <span className="relative z-20 flex items-center justify-center w-full h-full transition-colors duration-500 group-hover:text-[#162660]">
                  Let&apos;s Talk
                </span>
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-10" />
                <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#444444] transition-colors duration-300 z-10 pointer-events-none" />
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

