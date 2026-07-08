"use client"

import Link from "next/link"
import type { WorkSection as WorkSectionData } from "@vns-core/core/types/homepage"

// Flatten Strapi Blocks rich-text into plain paragraph text.
function blocksToText(blocks: unknown): string {
    if (!Array.isArray(blocks)) return ""
    return blocks
        .map((b) => {
            const children = (b as { children?: { text?: string }[] })?.children
            return Array.isArray(children) ? children.map((c) => c?.text ?? "").join("") : ""
        })
        .join("\n\n")
        .trim()
}

export default function SectionWork({ data }: { data?: WorkSectionData | null }) {
    const title = data?.title || "OUR WORK"
    const description =
        blocksToText(data?.description) ||
        "We are Onelink Marketing – uniting strategy, creativity, and technical execution to transform bold ideas into lasting impact. Our experienced international team delivers global quality with a superior price/performance ratio."
    const buttonLabel = data?.buttonLabel || "Learn More About Us"
    const buttonHref = data?.buttonHref || "/about"

    return (
        <section className="relative px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24">
            <div className="flex flex-col items-center justify-center gap-10 md:gap-12">

                {/* CHỮ OUR WORK */}
                <div
                    style={{ fontFamily: "'Archivo Expanded', sans-serif" }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-[#000A1D] leading-none tracking-tight">
                        {title}
                    </h2>
                </div>

                {/* DESCRIPTION + BUTTON */}
                <div className="flex flex-col items-center gap-6 lg:gap-8 max-w-3xl">
                    {/* DESCRIPTION */}
                    <div
                        style={{ fontFamily: "'GeneralSans Regular', sans-serif" }}
                        className="text-center w-full"
                    >
                        <p className="text-lg leading-relaxed text-[#444444]">
                            {description}
                        </p>
                    </div>

                    {/* BUTTON */}
                    <div
                        style={{ fontFamily: "'GeneralSans Regular', sans-serif" }}
                        className="shrink-0"
                    >
                        <Link href={buttonHref}>
                            <button className="relative overflow-hidden px-5 py-3.5 rounded-full text-xs md:text-sm text-white bg-linear-to-r from-[#0074E5] to-[#162660] transition-colors duration-300 group">
                                <span className="relative z-20 flex items-center justify-center w-full h-full transition-colors duration-500 group-hover:text-[#162660]">
                                    {buttonLabel}
                                </span>
                                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-10"></span>
                                <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#444444] transition-colors duration-300 z-10 pointer-events-none"></span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
