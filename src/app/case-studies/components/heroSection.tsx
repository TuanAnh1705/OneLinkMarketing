"use client"

import type { CspHero } from "@vns-core/core/types/case-study-page"

// Đường line gradient
function GradientBorder() {
    return <div className="h-[1px] w-full bg-gradient-to-r from-[#0074E5] to-[#162660]" />
}

// Section chính — nhận hero từ Strapi, fallback về text mặc định khi null (build-safe)
export default function HeroSection({ data }: { data?: CspHero | null }) {
    const titleLine1 = data?.titleLine1 ?? "CASE STUDIES"
    const titleLine2 = data?.titleLine2 ?? "AND INSIGHTS"
    const subtitle = data?.subtitle ?? "Explore our work and learn\nfrom our team of experts."

    return (
        <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="archivo-expanded text-3xl md:text-8xl font-bold text-center tracking-wider bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent mb-8">
                        {titleLine1} <br/> {titleLine2}
                    </h1>
                    <GradientBorder />
                    <p className="generalsans-regular font-medium text-[#000A1D] text-center text-xl md:text-5xl max-w-5xl mx-auto leading-none py-14 whitespace-pre-line">
                        {subtitle}
                    </p>
                    <GradientBorder />
                </div>
            </div>
        </section>
    )
}
