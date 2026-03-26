"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

// --- COMPONENT PARALLAX ---
function ParallaxStrong({
    src,
    alt,
    className,
}: {
    src: string
    alt: string
    className?: string
}) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

    return (
        <div ref={ref} className={`relative overflow-hidden bg-transparent ${className}`}>
            <motion.div
                style={{ y }}
                className="relative w-full h-[140%] -top-[20%] will-change-transform"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
        </div>
    )
}

export default function VNSShowcase() {
    return (
        <div className="bg-white min-h-screen">
            {/* --- TOP SECTION: Header Info --- */}
            <section className="container mx-auto px-6 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Top Row: Thumbnail + Title */}
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                        {/* Thumbnail Image (vns1.png) */}
                        <div className="relative aspect-video overflow-hidden rounded-2xl">
                            <Image
                                src="/assets/vns1.png"
                                alt="Vietnam Sourcing Project Thumbnail"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Title */}
                        <div className="flex flex-col justify-center">
                            <h1 className="archivo-expanded text-3xl md:text-5xl font-medium tracking-tight text-[#000A1D]">
                                Boosting Vietnam Sourcing Co’s Digital Presence and Lead Generation
                            </h1>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            ["Service", "Website Development, SEO, Social Media Marketing"],
                            ["Client", "Vietnam Sourcing Co"],
                            ["Date", "March 2023"], // Giả định ngày dựa trên ngữ cảnh
                            ["Technology", "Adobe Creative Suite, WordPress, Hubspot"],
                        ].map(([label, value], i) => (
                            <div key={i} className="space-y-3">
                                <div className="h-[0.5px] w-full bg-linear-to-r from-[#0074E5] to-[#162660]" />
                                <p className="generalsans-regular text-sm text-[#444444]">{label}</p>
                                <p className="generalsans-regular text-base font-medium text-[#000A1D]">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FULL WIDTH PARALLAX BANNER (vns1.png) --- */}
            <section className="w-full h-[50vh] md:h-[80vh] mb-20">
                <ParallaxStrong
                    src="/assets/vns1.png"
                    alt="Vietnam Sourcing Container Banner"
                    className="w-full h-full"
                />
            </section>

            {/* --- 1. THE CHALLENGE --- */}
            {/* --- 1. ABOUT THE PROJECT --- */}
            <section className="container mx-auto px-6 pb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24 items-start">
                        <h2 className="archivo-expanded text-3xl lg:text-4xl font-medium tracking-tight text-[#000A1D]">
                            1. About the project
                        </h2>
                        <div className="space-y-6">
                            <p className="generalsans-regular text-base leading-relaxed text-[#444444]">
                                Vietnam Sourcing Co is a sourcing and manufacturing service provider based in Vietnam, helping international buyers find reliable factories and manage production efficiently.
                            </p>
                            <p className="generalsans-regular text-base leading-relaxed text-[#444444]">
                                Although the company had strong expertise and a wide factory network, its <span className="font-semibold text-black">digital presence didn&apos;t reflect its true capabilities.</span> The old website was not SEO-optimized, the brand story lacked clarity, and content failed to communicate Vietnam&apos;s growing manufacturing strength to international clients.
                            </p>
                            <p className="generalsans-regular text-base leading-relaxed text-[#444444]">
                                That&apos;s when <span className="font-semibold text-black">Vietnam Sourcing Co partnered with OneLink Marketing</span> to translate their operational excellence into a strong digital identity that drives visibility, credibility, and qualified leads from around the world.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. THE CHALLENGES --- */}
            <section className="container mx-auto px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24 items-start">
                        <h2 className="archivo-expanded text-3xl lg:text-4xl font-medium tracking-tight text-[#000A1D]">
                            2. The Challenges
                        </h2>
                        <div className="space-y-4">
                            <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-2">
                                Before the partnership, Vietnam Sourcing Co faced three major challenges:
                            </p>
                            <div className="space-y-2 generalsans-regular text-base leading-relaxed text-[#444444]">
                                <p>
                                    <span className="font-semibold text-black">1. Limited global brand awareness:</span> Despite their strong service quality, they lacked recognition among international buyers.
                                </p>
                                <p>
                                    <span className="font-semibold text-black">2. Underperforming website & low organic visibility:</span> Their pages were not targeting high-intent keywords like “Vietnam sourcing company” or “manufacturing partner in Vietnam”, resulting in minimal search traffic.
                                </p>
                                <p>
                                    <span className="font-semibold text-black">3. Low conversion rate:</span> Website visitors were not converting into leads due to weak UX, unclear CTAs, and lack of nurturing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}