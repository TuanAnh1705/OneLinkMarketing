"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ServicesSection } from "@vns-core/core/types/homepage"

const FALLBACK_SERVICES = [
    {
        title: "Strategy Consulting",
        desc: "Laying the strategic foundation with brand audits and market research.",
        href: "/strategy-consulting"
    },
    {
        title: "Digital Asset Development",
        desc: "Building your core brand identity and creating SEO/UX-optimized websites.",
        href: "/digital-asset-development"
    },
    {
        title: "Search Engine Optimization",
        desc: "Driving organic traffic and sustainable growth with on-page and off-page SEO.",
        href: "/search-engine-optimization"
    },
    {
        title: "Paid Media & Advertising",
        desc: "Optimizing multi-channel ad campaigns for maximum ROI and lead generation.",
        href: "/paid-media-&-advertising"
    },
    {
        title: "Social Media Management",
        desc: "Building and engaging your community with consistent and high-quality content.",
        href: "/social-media-management"
    },
]

export default function ServiceSection({ data }: { data?: ServicesSection | null }) {
    const services = data?.items?.length
        ? data.items.map((it) => ({ title: (it.title || "").trim(), desc: it.description, href: it.href }))
        : FALLBACK_SERVICES
    const titlePlain1 = data?.titlePlain1 || "From"
    const titleHighlight1 = data?.titleHighlight1 || "Strategy"
    const titlePlain2 = data?.titlePlain2 || "to"
    const titleHighlight2 = data?.titleHighlight2 || "Performance Growth"
    const sectionLabel = data?.sectionLabel || "Our Services"
    const ctaLabel = data?.ctaLabel || "Discover"
    const [labelHead, ...labelRest] = sectionLabel.split(" ")

    return (
        <section className="bg-white py-16 md:py-10 -mt-10 md:-mt-10 px-4 sm:px-8 md:px-16 lg:px-24">
            {/* TITLE */}
            <div className="text-center mb-30 md:mb-40">
                <h2
                    className="text-3xl md:text-6xl lg:text-7xl font-medium leading-tight "
                    style={{ fontFamily: "'GeneralSans Regular', sans-serif" }}
                >
                    <span className="text-[#0074E5]">
                        {titlePlain1}
                    </span>
                    <span className="text-[#000A1D] font-bold italic">
                        {titleHighlight1}
                    </span>
                    <span className="text-[#0074E5]">
                        {" "}{titlePlain2}
                    </span>
                    <br />
                    <span className="text-[#000A1D] font-bold italic ">
                        {titleHighlight2}
                    </span>
                </h2>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-350 mx-auto md:-mt-20">
                {/* GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 md:gap-y-14 gap-x-4 md:gap-x-6 lg:gap-x-1">
                    {/* ROW 1 - OUR SERVICES + 2 CARDS */}
                    <div className="flex items-center justify-center md:col-span-2 lg:col-span-1">
                        <h3
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-[#000A1D] leading-tight text-center lg:text-left"
                            style={{ fontFamily: "'Archivo Expanded', sans-serif" }}
                        >
                            {labelHead} <span className="lg:block">{labelRest.join(" ")}</span>
                        </h3>
                    </div>

                    {/* Card 1 - Strategy Consulting */}
                    <div className="relative bg-[#f0f0f0] rounded-3xl p-6 md:p-8 group w-full max-w-101.5 h-auto min-h-72 md:min-h-82.75 mx-auto flex flex-col cursor-pointer">
                        <Link href={services[0].href} className="absolute inset-0 z-0 rounded-3xl" aria-label={services[0].title} />
                        <svg className="absolute inset-0 w-full h-full pointer-events-none border-svg-container" style={{ overflow: 'visible' }}>
                            <defs>
                                <linearGradient id="borderGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0074E5" />
                                    <stop offset="50%" stopColor="#162660" />
                                    <stop offset="100%" stopColor="#0074E5" />
                                </linearGradient>
                            </defs>
                            <rect
                                x="1" y="1"
                                width="calc(100% - 2px)"
                                height="calc(100% - 2px)"
                                rx="23"
                                fill="none"
                                stroke="url(#borderGradient1)"
                                strokeWidth="1"
                                className="border-draw-path"
                            />
                        </svg>
                        <div className="relative z-10 flex flex-col h-full pointer-events-none">
                            <h4 className="text-3xl md:text-4xl font-medium text-[#000A1D] mb-4 leading-tight" style={{ fontFamily: "'Archivo Expanded', sans-serif", whiteSpace: 'pre-line' }}>
                                {services[0].title}
                            </h4>
                            <div className="w-full h-px mb-4 bg-linear-to-r from-[#0074E5] to-[#162660]" />
                            <p className="text-[#666666] text-lg leading-relaxed mb-6" style={{ fontFamily: "'GeneralSans Regular', sans-serif" }}>
                                {services[0].desc}
                            </p>
                            {/* FIX: Bọc w-fit để giới hạn độ dài đường line */}
                            <div className=" w-fit mt-auto select-none">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent" style={{ fontFamily: "'GeneralSans Regular', sans-serif" }}>
                                        {ctaLabel}
                                    </span>
                                    <div className="relative">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute inset-0 pointer-events-none">
                                            <defs>
                                                <linearGradient id="iconGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#0074E5" />
                                                    <stop offset="100%" stopColor="#162660" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 relative" style={{ stroke: 'url(#iconGradient1)' }} strokeWidth={2} />
                                    </div>
                                </div>
                                <div className="h-px w-full bg-linear-to-r from-[#0074E5] to-[#162660]" />
                            </div>
                        </div>
                    </div>

                    {/* Card 2 - Digital Asset Development */}
                    <div className="relative bg-[#f0f0f0] rounded-3xl p-6 md:p-8 group w-full max-w-101.5 h-auto min-h-72 md:min-h-82.75 mx-auto flex flex-col cursor-pointer">
                        <Link href={services[1].href} className="absolute inset-0 z-0 rounded-3xl" aria-label={services[1].title} />
                        <svg className="absolute inset-0 w-full h-full pointer-events-none border-svg-container" style={{ overflow: 'visible' }}>
                            <defs>
                                <linearGradient id="borderGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0074E5" />
                                    <stop offset="50%" stopColor="#162660" />
                                    <stop offset="100%" stopColor="#0074E5" />
                                </linearGradient>
                            </defs>
                            <rect
                                x="1" y="1"
                                width="calc(100% - 2px)"
                                height="calc(100% - 2px)"
                                rx="23"
                                fill="none"
                                stroke="url(#borderGradient2)"
                                strokeWidth="1"
                                className="border-draw-path"
                            />
                        </svg>
                        <div className="relative z-10 flex flex-col h-full pointer-events-none">
                            <h4 className="text-3xl md:text-4xl font-medium text-[#000A1D] mb-4 leading-tight" style={{ fontFamily: "'Archivo Expanded', sans-serif", whiteSpace: 'pre-line' }}>
                                {services[1].title}
                            </h4>
                            <div className="w-full h-px mb-4 bg-linear-to-r from-[#0074E5] to-[#162660]" />
                            <p className="text-[#666666] text-lg leading-relaxed mb-6" style={{ fontFamily: "'GeneralSans Regular', sans-serif" }}>
                                {services[1].desc}
                            </p>
                            <div className="w-fit mt-auto select-none">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent" style={{ fontFamily: "'GeneralSans Regular', sans-serif" }}>
                                        {ctaLabel}
                                    </span>
                                    <div className="relative">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute inset-0 pointer-events-none">
                                            <defs>
                                                <linearGradient id="iconGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#0074E5" />
                                                    <stop offset="100%" stopColor="#162660" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 relative" style={{ stroke: 'url(#iconGradient2)' }} strokeWidth={2} />
                                    </div>
                                </div>
                                <div className="h-px w-full bg-linear-to-r from-[#0074E5] to-[#162660]" />
                            </div>
                        </div>
                    </div>

                    {/* ROW 2 - 3 CARDS */}
                    {/* Card 3 - SEO Services */}
                    <div className="relative bg-[#f0f0f0] rounded-3xl p-6 md:p-8 group w-full max-w-101.5 h-auto min-h-72 md:min-h-82.75 mx-auto flex flex-col cursor-pointer">
                        <Link href={services[2].href} className="absolute inset-0 z-0 rounded-3xl" aria-label={services[2].title} />
                        <svg className="absolute inset-0 w-full h-full pointer-events-none border-svg-container" style={{ overflow: 'visible' }}>
                            <defs>
                                <linearGradient id="borderGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0074E5" />
                                    <stop offset="50%" stopColor="#162660" />
                                    <stop offset="100%" stopColor="#0074E5" />
                                </linearGradient>
                            </defs>
                            <rect
                                x="1" y="1"
                                width="calc(100% - 2px)"
                                height="calc(100% - 2px)"
                                rx="23"
                                fill="none"
                                stroke="url(#borderGradient3)"
                                strokeWidth="1"
                                className="border-draw-path"
                            />
                        </svg>
                        <div className="relative z-10 flex flex-col h-full pointer-events-none">
                            <h4 className="text-3xl md:text-4xl font-medium text-[#000A1D] mb-4 leading-tight" style={{ fontFamily: "'Archivo Expanded', sans-serif", whiteSpace: 'pre-line' }}>
                                {services[2].title}
                            </h4>
                            <div className="w-full h-px mb-4 bg-linear-to-r from-[#0074E5] to-[#162660]" />
                            <p className="text-[#666666] text-lg leading-relaxed mb-6" style={{ fontFamily: "'GeneralSans Regular', sans-serif" }}>
                                {services[2].desc}
                            </p>
                            <div className="w-fit mt-auto select-none">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent" style={{ fontFamily: "'GeneralSans Regular', sans-serif" }}>
                                        {ctaLabel}
                                    </span>
                                    <div className="relative">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute inset-0 pointer-events-none">
                                            <defs>
                                                <linearGradient id="iconGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#0074E5" />
                                                    <stop offset="100%" stopColor="#162660" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 relative" style={{ stroke: 'url(#iconGradient3)' }} strokeWidth={2} />
                                    </div>
                                </div>
                                <div className="h-px w-full bg-linear-to-r from-[#0074E5] to-[#162660]" />
                            </div>
                        </div>
                    </div>

                    {/* Card 4 - Paid Media & Advertising */}
                    <div className="relative bg-[#f0f0f0] rounded-3xl p-6 md:p-8 group w-full max-w-101.5 h-auto min-h-72 md:min-h-82.75 mx-auto flex flex-col cursor-pointer">
                        <Link href={services[3].href} className="absolute inset-0 z-0 rounded-3xl" aria-label={services[3].title} />
                        <svg className="absolute inset-0 w-full h-full pointer-events-none border-svg-container" style={{ overflow: 'visible' }}>
                            <defs>
                                <linearGradient id="borderGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0074E5" />
                                    <stop offset="50%" stopColor="#162660" />
                                    <stop offset="100%" stopColor="#0074E5" />
                                </linearGradient>
                            </defs>
                            <rect
                                x="1" y="1"
                                width="calc(100% - 2px)"
                                height="calc(100% - 2px)"
                                rx="23"
                                fill="none"
                                stroke="url(#borderGradient4)"
                                strokeWidth="1"
                                className="border-draw-path"
                            />
                        </svg>
                        <div className="relative z-10 flex flex-col h-full pointer-events-none">
                            <h4 className="text-3xl md:text-4xl font-medium text-[#000A1D] mb-4 leading-tight" style={{ fontFamily: "'Archivo Expanded', sans-serif", whiteSpace: 'pre-line' }}>
                                {services[3].title}
                            </h4>
                            <div className="w-full h-px mb-4 bg-linear-to-r from-[#0074E5] to-[#162660]" />
                            <p className="text-[#666666] text-lg leading-relaxed mb-6" style={{ fontFamily: "'GeneralSans Regular', sans-serif" }}>
                                {services[3].desc}
                            </p>
                            <div className="w-fit mt-auto select-none">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent" style={{ fontFamily: "'GeneralSans Regular', sans-serif" }}>
                                        {ctaLabel}
                                    </span>
                                    <div className="relative">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute inset-0 pointer-events-none">
                                            <defs>
                                                <linearGradient id="iconGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#0074E5" />
                                                    <stop offset="100%" stopColor="#162660" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 relative" style={{ stroke: 'url(#iconGradient4)' }} strokeWidth={2} />
                                    </div>
                                </div>
                                <div className="h-px w-full bg-linear-to-r from-[#0074E5] to-[#162660]" />
                            </div>
                        </div>
                    </div>

                    {/* Card 5 - Social Media Management */}
                    <div className="relative bg-[#f0f0f0] rounded-3xl p-6 md:p-8 group w-full max-w-101.5 h-auto min-h-72 md:min-h-82.75 mx-auto flex flex-col cursor-pointer">
                        <Link href={services[4].href} className="absolute inset-0 z-0 rounded-3xl" aria-label={services[4].title} />
                        <svg className="absolute inset-0 w-full h-full pointer-events-none border-svg-container" style={{ overflow: 'visible' }}>
                            <defs>
                                <linearGradient id="borderGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0074E5" />
                                    <stop offset="50%" stopColor="#162660" />
                                    <stop offset="100%" stopColor="#0074E5" />
                                </linearGradient>
                            </defs>
                            <rect
                                x="1" y="1"
                                width="calc(100% - 2px)"
                                height="calc(100% - 2px)"
                                rx="23"
                                fill="none"
                                stroke="url(#borderGradient5)"
                                strokeWidth="1"
                                className="border-draw-path"
                            />
                        </svg>
                        <div className="relative z-10 flex flex-col h-full pointer-events-none">
                            <h4 className="text-3xl md:text-4xl font-medium text-[#000A1D] mb-4 leading-tight" style={{ fontFamily: "'Archivo Expanded', sans-serif", whiteSpace: 'pre-line' }}>
                                {services[4].title}
                            </h4>
                            <div className="w-full h-px mb-4 bg-linear-to-r from-[#0074E5] to-[#162660]" />
                            <p className="text-[#666666] text-lg leading-relaxed mb-6" style={{ fontFamily: "'GeneralSans Regular', sans-serif" }}>
                                {services[4].desc}
                            </p>
                            <div className="w-fit mt-auto select-none">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent" style={{ fontFamily: "'GeneralSans Regular', sans-serif" }}>
                                        {ctaLabel}
                                    </span>
                                    <div className="relative">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute inset-0 pointer-events-none">
                                            <defs>
                                                <linearGradient id="iconGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#0074E5" />
                                                    <stop offset="100%" stopColor="#162660" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 relative" style={{ stroke: 'url(#iconGradient5)' }} strokeWidth={2} />
                                    </div>
                                </div>
                                <div className="h-px w-full bg-linear-to-r from-[#0074E5] to-[#162660]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}