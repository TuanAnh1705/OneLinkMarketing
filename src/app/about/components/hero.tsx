"use client"

import { Fragment } from "react"
import type { AboutHeroSection } from "@vns-core/core/types/about"

// Đường line gradient
function GradientBorder() {
    return <div className="h-[0.8px] w-full bg-linear-to-r from-[#0074E5] to-[#162660]" />
}

// Section chính
export default function Hero({ data }: { data?: AboutHeroSection | null }) {
    const titleLine1 = data?.titleLine1 || "MADE IN"
    const titleLine2 = data?.titleLine2 || "VIETNAM"
    const subtitle = data?.subtitle || "International Team\nGlobal Mindset\nVietnamese Resources"
    const subtitleLines = subtitle.split("\n")

    return (
        <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="archivo-expanded text-5xl md:text-8xl font-bold text-center tracking-wider bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent ">
                        {titleLine1}
                    </h1>
                    {/* THAY ĐỔI TẠI ĐÂY: Thay 'to-[60%]' thành 'to-[30%]' */}
                    <h1 className="archivo-expanded text-5xl md:text-8xl font-bold text-center tracking-wider bg-[#FC0000] bg-clip-text text-transparent mb-8">
                        {titleLine2}
                    </h1>
                    <GradientBorder />
                    <p className="generalsans-regular font-medium text-[#000A1D] text-center text-xl md:text-5xl max-w-5xl mx-auto leading-none py-8">
                        {subtitleLines.map((line, i) => (
                            <Fragment key={i}>
                                {i > 0 && <br />}
                                {line}
                            </Fragment>
                        ))}
                    </p>
                    <GradientBorder />
                </div>
            </div>
        </section>
    )
}
