"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { getMediaUrl } from "@vns-core/core/api/media-url"
import type { CaseStudyData } from "@vns-core/core/types/case-study"

interface CaseStudyCard {
    src: string;
    title: string;
    href: string;
    year: string;
}

// Fallback tĩnh (build-safe khi Strapi chưa có data)
const fallbackCards: CaseStudyCard[] = [
    { src: "/assets/tag1.png", title: "Tag. Fitness", year: "2025", href: "/case-studies/tag" },
    { src: "/assets/steel.png", title: "Steel Works Seattle", year: "2025", href: "/case-studies/steel" },
    { src: "/assets/cns1.png", title: "China Sourcing Co", year: "2025", href: "/case-studies/china-sourcing-co" },
    { src: "/assets/vns1.png", title: "Vietnam Sourcing Co", year: "2023", href: "/case-studies/vietnam-sourcing-co" },
]

function toCard(cs: CaseStudyData): CaseStudyCard {
    return {
        src: cs.featureImage?.url ? getMediaUrl(cs.featureImage.url) : "/placeholder.svg",
        title: cs.title,
        year: cs.year,
        href: `/${cs.slug}`,
    }
}

export default function CaseStudies({
    items,
    heading,
}: {
    items?: CaseStudyData[]
    heading?: string | null
}) {
    const section4Ref = useRef<HTMLDivElement>(null)

    const cards: CaseStudyCard[] =
        items && items.length > 0 ? items.map(toCard) : fallbackCards

    return (
        <motion.section
            ref={section4Ref}
            className="relative justify-center -mt-40 z-10 bg-white/0 pt-32 pb-32 px-4 sm:px-8 md:px-16 lg:px-24"
        >
            <div className="max-w-7xl mx-auto">
                <h2 className="archivo-expanded text-4xl sm:text-5xl md:text-6xl font-medium text-center text-[#000A1D] mb-12 md:mb-16">
                    {heading ?? "Case Studies"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    {cards.map((item, i) => (
                        <Link key={item.href + i} href={item.href}>
                            <motion.div
                                className="text-left cursor-pointer"
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{
                                    duration: 2.4,
                                    ease: [0.25, 1, 0.3, 1],
                                    delay: (i % 2) * 0.2,
                                }}
                                viewport={{ once: false, amount: 0.4 }}
                            >
                                <div className="relative w-full aspect-4/3 rounded-sm overflow-hidden border border-[#e5e5e5] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                                    <motion.div
                                        className="relative w-full h-full"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    >
                                        <Image src={item.src} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center" />
                                    </motion.div>
                                </div>
                                <h3 className="mt-7 archivo-expanded font-medium text-xl text-[#000A1D]">{item.title}</h3>
                                <p className="text-sm generalsans-regular text-[#444444]">{item.year}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}
