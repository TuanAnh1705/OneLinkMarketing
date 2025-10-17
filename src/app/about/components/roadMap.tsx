"use client"

import React from "react" // Import React để sử dụng Fragment

// ============================================================================
// 🔹 Component Mũi Tên Gradient (dùng SVG)
// ============================================================================
function GradientArrow() {
    return (
        <svg
            width="160" // Chiều dài của mũi tên
            height="28" // Chiều cao của mũi tên
            viewBox="0 0 120 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden lg:block mx-4" // Ẩn trên mobile và tablet, chỉ hiện trên desktop
        >
            <defs>
                {/* Định nghĩa màu gradient */}
                <linearGradient id="arrow-gradient" x1="0" y1="12" x2="120" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0074E5" />
                    <stop offset="1" stopColor="#162660" />
                </linearGradient>
            </defs>
            {/* Đường dẫn vẽ mũi tên, sử dụng màu gradient đã định nghĩa */}
            <path
                d="M0 12H110L100 2M110 12L100 22"
                stroke="url(#arrow-gradient)"
                strokeWidth="1" // Độ dày của mũi tên
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

// ============================================================================
// 🔹 Dữ liệu cho các bước
// ============================================================================
const roadmapData = [
    {
        title: "Strategic Foundation",
        description: "Market research, brand audit, and keyword analysis to build a data-driven strategy.",
    },
    {
        title: "Core Identity Building",
        description: "Crafting a professional brand identity, and a core messaging framework for consistency.",
    },
    {
        title: "Digital Asset Activation",
        description: "Designing SEO/UX-optimized websites and digital collateral that work as lead magnets.",
    },
    {
        title: "Sustainable Performance",
        description: "Implementing SEO, social, and paid media campaigns to generate leads and scale your business.",
    },
]

// ============================================================================
// 🔹 Component RoadmapSection chính
// ============================================================================
export function RoadmapSection() {
    return (
        <section className="bg-white py-20 md:py-32 px-8 -mt-28">
            <div className="max-w-7xl mx-auto">
                {/* Tiêu đề chính */}
                <h2 className="archivo-expanded text-4xl md:text-5xl font-medium text-[#000A1D] text-center max-w-4xl mx-auto leading-tight">
                    Our 4-Step Roadmap to <br/> Sustainable Growth
                </h2>

                {/* Container cho các bước và mũi tên */}
                <div className="mt-20 flex flex-col lg:flex-row items-start justify-between gap-y-12">
                    {roadmapData.map((step, index) => (
                        <React.Fragment key={step.title}>
                            {/* Nội dung của một bước */}
                            <div className="flex-1 text-center lg:text-left max-w-sm">
                                <h3 className="neulis-alt-regular text-xl font-medium text-[#000A1D] mb-4">{step.title}</h3>
                                <p className="neulis-alt-regular font-medium text-[#444444] leading-relaxed">{step.description}</p>
                            </div>

                            {/* Thêm mũi tên vào giữa các bước (trừ bước cuối) */}
                            {index < roadmapData.length - 1 && <GradientArrow />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    )
}