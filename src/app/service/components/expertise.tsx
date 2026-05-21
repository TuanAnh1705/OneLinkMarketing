"use client"

import { useRef, useEffect, memo } from "react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import Image from "next/image"

gsap.registerPlugin(SplitText, ScrollTrigger)

// --- DATA ---
const expertiseData = [
    {
        number: "01",
        title: "Strategy\nConsulting",
        services: ["Brand Audit & Insight Analysis", "Market & Competitor Research", "Key Messaging Framework", "Measurement, Data & Optimisation"],
        image: "/assets/7.png",
        slug: "/service/strategy-consulting",
    },
    {
        number: "02",
        title: "Digital Asset\nDevelopment",
        services: ["Brand Identity", "Website Design", "Landing Page", "Digital Collateral"],
        image: "/assets/8.png",
        slug: "/service/digital-asset-development",
    },
    {
        number: "03",
        title: "Search Engine\nOptimization",
        services: ["Keyword Research & Planning", "On-page Optimization", "Off-page Optimization", "Content Strategy & Production"],
        image: "/assets/9.png",
        slug: "/service/search-engine-optimization",
    },
    {
        number: "04",
        title: "Paid Media &\nAdvertising",
        services: ["Multi-channel Strategy", "Cost & Conversion Rate Optimization", "A/B Testing & Funnel Optimization", "Performance Reporting & Daily Insights"],
        image: "/assets/10.png",
        slug: "/service/paid-media-&-advertising",
    },
    {
        number: "05",
        title: "Social Media\nManagement",
        services: ["Platform Setup", "Research & Content Strategy", "Content Production", "Reporting & Community Engagement"],
        image: "/assets/11.png",
        slug: "/service/social-media-management",
    },
]

// --- COMPONENTS ---

function GradientBorder() {
    return <div className="h-px w-full bg-linear-to-r from-[#0074E5] to-[#162660] opacity-50" />
}

const ExpertiseItem = memo(({ item, index }: {
    item: (typeof expertiseData)[0]
    index: number
}) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const reversed = index % 2 !== 0

    useEffect(() => {
        if (!titleRef.current || !sectionRef.current) return

        const split = SplitText.create(titleRef.current, {
            type: "words,chars",
            wordsClass: "inline-block whitespace-nowrap",
        })

        const anim = gsap.from(split.chars, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            stagger: 0.03,
            ease: "back.out(1.7)",
            paused: true,
        })

        const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 75%",
            onEnter: () => anim.play(),
        })

        return () => {
            trigger.kill()
            split.revert()
        }
    }, [])

    const imageBlock = (
        <div className="w-full rounded-none overflow-hidden">
            <Image
                src={item.image}
                alt={item.title.replace("\n", " ")}
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto"
            />
        </div>
    )

    const textBlock = (
        <div className="flex flex-col justify-center gap-5 py-6 md:py-0">
            <h3
                ref={titleRef}
                className="archivo-expanded text-4xl md:text-5xl xl:text-6xl font-bold text-[#000A1D] leading-[1.05] uppercase whitespace-pre-line"
            >
                {item.title}
            </h3>

            <ul className="space-y-2 mt-2">
                {item.services.map((service, i) => (
                    <li
                        key={i}
                        className="generalsans-regular text-[#000A1D]/70 text-sm md:text-base leading-snug flex items-start gap-2"
                    >
                        <span className="mt-[5px] shrink-0 w-2 h-2 bg-[#0074E5]" />
                        {service}
                    </li>
                ))}
            </ul>

            <Link
                href={item.slug}
                className="mt-2 group shrink-0 generalsans-regular font-medium text-sm text-[#000000] w-fit"
            >
                <span className="relative inline-block">
                    Learn more
                    <span className={`absolute -bottom-0.5 left-0 w-full h-px bg-[#0074E5] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 ${reversed ? "origin-left group-hover:origin-right" : "origin-right group-hover:origin-left"}`} />
                </span>
            </Link>
        </div>
    )

    return (
        <div ref={sectionRef} className="py-10 md:py-16 relative">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 xl:gap-24 items-center`}>
                {reversed ? (
                    <>
                        <div className="order-2 md:order-1">{textBlock}</div>
                        <div className="order-1 md:order-2">{imageBlock}</div>
                    </>
                ) : (
                    <>
                        {imageBlock}
                        {textBlock}
                    </>
                )}
            </div>

        </div>
    )
})

ExpertiseItem.displayName = "ExpertiseItem"

// --- MAIN SECTION ---
export default function ExpertiseSection() {
    return (
        <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden bg-white">
            <div className="max-w-8xl mx-auto relative">

                {/* Header */}
                <div className="mb-16">
                    <h1 className="archivo-expanded text-5xl md:text-9xl font-bold text-center tracking-tighter bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent mb-8">
                        SERVICES
                    </h1>
                    <GradientBorder />
                    <p className="generalsans-regular font-medium text-[#000A1D] text-center text-xl md:text-4xl lg:text-5xl max-w-5xl mx-auto leading-tight py-12">
                        We provide a single, <br className="hidden md:block" />
                        integrated roadmap to solve <br className="hidden md:block" />
                        all your marketing challenges.
                    </p>
                    <GradientBorder />
                </div>

                {/* List */}
                <div className="mt-8">
                    {expertiseData.map((item, i) => (
                        <ExpertiseItem
                            key={item.number}
                            item={item}
                            index={i}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
