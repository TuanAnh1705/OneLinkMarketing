"use client"

import Image from "next/image"
import { getMediaUrl } from "@vns-core/core/api/media-url"
import type { CoreValuesSection as CoreValuesSectionData } from "@vns-core/core/types/about"

const FALLBACK_ITEMS = [
    {
        title: "Vision",
        description: "To be the trusted end-to-end partner for global brands seeking sustainable growth.",
    },
    {
        title: "Mission",
        description:
            "To help every brand achieve a strong identity and superior performance, solving the problem of fragmented and ineffective solutions.",
    },
    {
        title: "Value",
        description: "Excellence, Integrity, Partnership, and Innovation.",
    },
]

export function CoreValuesSection({ data }: { data?: CoreValuesSectionData | null }) {
    const heading = data?.heading || "Our Core Values"
    const coreValuesData = data?.items?.length ? data.items : FALLBACK_ITEMS
    const cardBg = data?.cardBackground?.url ? getMediaUrl(data.cardBackground.url) : "/assets/core.png"
    const bigImage = data?.image?.url ? getMediaUrl(data.image.url) : "/assets/ab8.png"

    return (
        <section className="bg-[#050B18] text-white py-20 md:py-32 px-6 md:px-8 overflow-hidden md:-translate-y-20">
            <div className="max-w-7xl mx-auto">
                {/* ==================== CORE VALUES ==================== */}
                <div className="text-center mb-20">
                    <h2 className="archivo-expanded text-4xl sm:text-5xl md:text-7xl text-white font-medium">{heading}</h2>
                </div>

                {/* --- 3 CARD --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
                    {coreValuesData.map((value) => (
                        <div
                            key={value.title}
                            className="relative rounded-2xl overflow-hidden p-6 md:p-8 h-64"
                        >
                            <div className="absolute inset-0">
                                <Image
                                    src={cardBg}
                                    alt="background"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-fill"
                                />
                            </div>
                            <div className="absolute inset-0"></div>
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <h3 className="archivo-expanded text-4xl md:text-5xl text-white font-bold">{value.title}</h3>
                                <p className="generalsans-regular text-white text-base md:text-lg leading-snug">{value.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ==================== LEAD ENGINE ==================== */}
                <div className="flex justify-center overflow-hidden -mt-16 lg:mt-0">
                    <div className="relative h-60 sm:h-137.5 lg:h-225 w-full max-w-7xl overflow-hidden">
                        <Image
                            src={bigImage}
                            alt="Abstract background"
                            fill
                            sizes="100vw"
                            className="object-cover object-[45%_center]"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
