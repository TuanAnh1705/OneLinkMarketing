"use client"

import Image from "next/image"
import Link from "next/link"
import type { SdAdvantageSection } from "@vns-core/core/types/service-detail"
import { getMediaUrl } from "@vns-core/core/api/media-url"

const UspItem = ({
    item,
    index,
    total,
}: {
    item: { number: string; title: string; description: string }
    index: number
    total: number
}) => {
    return (
        <div>
            <div className="flex items-start gap-8 py-10">
                <span className="archivo-expanded text-[#000000] text-xl md:text-3xl font-medium min-w-15">{item.number}</span>
                <div className="flex-1 grid md:grid-cols-2 gap-8">
                    <h3 className="generalsans-regular text-[#000A1D] text-xl md:text-2xl font-medium">{item.title}</h3>
                    <p className="generalsans-regular text-sm md:text-sm text-gray-[#444444] leading-relaxed">{item.description}</p>
                </div>
            </div>

            {index < total - 1 && (
                <div
                    className="h-px w-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #0074E5, #162660)" }}
                />
            )}
        </div>
    )
}

// --- COMPONENT CHÍNH ---
const FALLBACK_ITEMS = [
    {
        number: "01",
        title: "Holistic & Integrated SEO",
        description:
            "Our SEO is not a standalone service; it's a core component of your integrated marketing roadmap.",
    },
    {
        number: "02",
        title: "Long-Term Value Focus",
        description:
            "We prioritize building long-term authority and quality traffic over quick, short-lived gains.",
    },
    {
        number: "03",
        title: "Technical & Content Excellence",
        description:
            "We combine technical optimization with high-quality content to achieve top rankings and engagement.",
    },
    {
        number: "04",
        title: "International Expertise",
        description:
            "We help you uncover your unique value proposition to stand out from the crowd.",
    },
]

export default function UspSectionForSeo({ data }: { data?: SdAdvantageSection | null }) {

    const uspItems = data?.items?.length ? data.items : FALLBACK_ITEMS
    const heading = data?.heading || "Gain Your SEO Advantage"
    const imageSrc = data?.image?.url ? getMediaUrl(data.image.url) : "/assets/sv8.png"
    const ctaLabel = data?.ctaLabel || "Contact Us"
    const ctaHref = data?.ctaHref || "/contact"

    return (
        <section
            className="bg-white pt-10 pb-32 md:pt-12 md:pb-40 px-8 md:px-16 lg:px-24 overflow-x-hidden"
        >
            <div className="max-w-7xl mx-auto">
                <h2 className="archivo-expanded text-3xl md:text-5xl lg:text-6xl font-medium leading-tight mb-12 text-[#000A1D]">
                    {heading}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Cột trái */}
                    <div className="lg:col-span-1">
                        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[500px]">
                            <Image
                                src={imageSrc}
                                alt={heading}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Cột phải */}
                    <div className="lg:col-span-2">
                        <div>
                            {/* Line đầu tiên cũng gradient */}
                            <div
                                className="h-px w-full rounded-full"
                                style={{ background: "linear-gradient(90deg, #0074E5, #162660)" }}
                            />
                            {uspItems.map((item, index) => (
                                <UspItem
                                    key={item.number}
                                    item={item}
                                    index={index}
                                    total={uspItems.length}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Nút CTA */}
                <div className="flex justify-center mt-0 mb-10 md:-mb-10 md:mt-20">
                    <Link href={ctaHref}>
                        <button className="relative overflow-hidden px-5 py-3.5 rounded-full generalsans-regular text-sm text-white bg-linear-to-r from-[#0074E5] to-[#162660] transition-colors duration-300 group">
                            {/* Lớp chữ trên cùng */}
                            <span className="relative z-20 flex items-center justify-center w-full h-full transition-colors duration-500 group-hover:text-[#162660]">
                                {ctaLabel}
                            </span>

                            {/* Nền trắng trượt lên */}
                            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-10"></span>

                            {/* Viền hiện khi hover */}
                            <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#444444] transition-colors duration-500 z-10 pointer-events-none"></span>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
