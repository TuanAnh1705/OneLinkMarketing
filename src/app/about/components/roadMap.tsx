"use client"

import React from "react"
import type { RoadmapSection as RoadmapSectionData } from "@vns-core/core/types/about"

// --- Components Mũi tên ---
function GradientArrowHorizontal() {
    return (
        <svg 
            width="100" // Giảm chiều rộng mũi tên để dành chỗ cho khoảng cách
            height="24" 
            viewBox="0 0 120 24" 
            fill="none" 
            className="hidden lg:block shrink-0 self-start mt-2" // self-start để cố định vị trí đỉnh
        >
            <defs>
                <linearGradient id="arrow-gradient-horizontal" x1="0" y1="12" x2="120" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0074E5" /><stop offset="1" stopColor="#162660" />
                </linearGradient>
            </defs>
            <path d="M0 12H110L100 2M110 12L100 22" stroke="url(#arrow-gradient-horizontal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function GradientArrowVertical() {
    return (
        <svg width="24" height="60" viewBox="0 0 24 100" fill="none" className="block lg:hidden my-8">
            <defs>
                <linearGradient id="arrow-gradient-vertical" x1="12" y1="0" x2="12" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0074E5" /><stop offset="1" stopColor="#162660" />
                </linearGradient>
            </defs>
            <path d="M12 0V90M12 90L2 80M12 90L22 80" stroke="url(#arrow-gradient-vertical)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

const FALLBACK_STEPS = [
    {
        title: "Strategic Foundation",
        subtitle: "Insight before action.",
        description: "Market research, brand audits and keyword analysis uncover opportunities and shape a clear, data driven marketing strategy.",
    },
    {
        title: "Core Brand Development",
        subtitle: "Define how your brand shows up.",
        description: "We build a strong brand identity and messaging framework that ensures clarity, consistency and differentiation.",
    },
    {
        title: "Digital Platform Activation",
        subtitle: "Turn digital presence to growth.",
        description: "Designing SEO/UX-optimized websites and digital collateral that work as lead magnets.",
    },
    {
        title: "Scalable Performance Marketing",
        subtitle: "Drive measurable growth.",
        description: "Integrated SEO, paid media and social campaigns generate qualified leads, improve ROI and scale your business.",
    },
]

export function RoadmapSection({ data }: { data?: RoadmapSectionData | null }) {
    const heading = data?.heading || "Our 4-Step Roadmap to Sustainable Growth"
    const roadmapData = data?.steps?.length ? data.steps : FALLBACK_STEPS

    return (
        <section className="bg-white py-20 md:py-32 px-8 md:-translate-y-30">
            <div className="max-w-7xl mx-auto">
                <h2 className="archivo-expanded text-2xl md:text-5xl font-medium text-[#000A1D] text-center max-w-4xl mx-auto leading-tight mb-24">
                    {heading}
                </h2>

                {/* - lg:gap-x-12: Tạo khoảng cách ngang giữa Title và Mũi tên.
                   - grid-cols: 4 cột nội dung chính + mũi tên xen kẽ.
                */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:gap-x-8 items-start">
                    
                    {roadmapData.map((step, index) => (
                        <React.Fragment key={index}>
                            {/* Cột Nội Dung: Thêm max-w-[240px] để bóp gọn chiều rộng văn bản */}
                            <div className="flex flex-col text-center lg:text-left lg:max-w-45 mx-auto lg:mx-0">
                                {/* Row 1: Title */}
                                <div className="min-h-20 flex items-start">
                                    <h3 className="archivo-expanded text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#0074E5] to-[#162660] w-full leading-tight">
                                        {step.title}
                                    </h3>
                                </div>

                                {/* Row 2: Subtitle */}
                                <div className="mt-3 min-h-16">
                                    <p className="generalsans-regular text-[#000A1D] font-bold text-[17px] leading-snug">
                                        {step.subtitle}
                                    </p>
                                </div>

                                {/* Row 3: Description */}
                                <div className="mt-6">
                                    <p className="generalsans-regular text-[#666666] leading-relaxed text-[15px] font-light">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Cột Mũi Tên: Thêm padding-x để tách xa Title và cột nội dung tiếp theo */}
                            {index < roadmapData.length - 1 && (
                                <div className="flex flex-col items-center justify-start lg:px-4">
                                    <GradientArrowHorizontal />
                                    <GradientArrowVertical />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    )
}