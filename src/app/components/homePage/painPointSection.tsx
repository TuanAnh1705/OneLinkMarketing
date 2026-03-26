"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const timelineItems = [
    {
        title: "Fragmented Marketing",
        description:
            "Juggling multiple freelancers or agencies across different countries, cultures and languages, results in inconsistent branding, lack of cohesion across company touchpoints, and confused messaging.",
        image: "/assets/pp1.png",
    },
    {
        title: "High Costs, Low ROI",
        description:
            "Bloated Western salaries, Over-inflated city-centre office space, Unnecessary bureaucracy and overheads - all passed onto you, before any work has even started.",
        image: "/assets/pp2.png",
    },
    {
        title: "Weak Brand Identity",
        description:
            "Poorly converting websites, inconsistent messaging, no clear strategy or roadmap, distinctly average content production, yet high monthly costs. What exactly are you paying for?",
        image: "/assets/pp3.png",
    },
    {
        title: "Scaling Issues",
        description:
            "You want to scale, but have no solid metrics to work from, whilst the cost to increase output is concerningly high. Surely A/B testing shouldn't be this costly?",
        image: "/assets/pp4.png",
    },
]

export default function Page() {
    const [hoveredIndex, setHoveredIndex] = useState<number>(0)

    return (
        <main className="min-h-screen px-4 py-12 md:px-8 lg:px-0 lg:py-0 -mt-20 md:mt-5">
            <div className="mx-auto max-w-screen-2xl">
                {/* Title Section */}
                <div className="mb-12 lg:mb-20">
                    <h1 className="archivo-expanded mb-4 text-2xl md:text-6xl lg:text-7xl font-bold text-[#000A1D] lg:translate-x-36">
                        Are you struggling with <br /> these pain points?
                    </h1>
                </div>

                {/* Content Section */}
                <div className="relative w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Side - Image Stack */}
                    <div className="relative hidden lg:flex w-full max-w-md lg:max-w-none lg:w-112.5 items-center justify-center shrink-0 order-2 lg:order-1">
                        <div className="relative h-100 sm:h-112.5 lg:h-137.5 w-full lg:translate-x-20 lg:-translate-y-8">
                            {timelineItems.map((item, index) => (
                                <div
                                    key={`${index}-${hoveredIndex}`}
                                    className={cn(
                                        "absolute inset-0 origin-center transform-gpu",
                                        // Hiển thị tất cả ảnh có index <= hoveredIndex
                                        index <= hoveredIndex ? "opacity-100" : "opacity-0"
                                    )}
                                    style={{
                                        zIndex: index,
                                        // Ảnh hiện tại sẽ có animation zoom
                                        animation: index === hoveredIndex 
                                            ? "zoomIn 0.6s ease-out forwards" 
                                            : "none"
                                    }}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-contain"
                                        priority={index === 0}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Text List */}
                    <div className="w-full flex-1 flex flex-col justify-center lg:pl-28 lg:-translate-y-8 relative order-1 lg:order-2">
                        <div className="relative">
                            {/* Line đầu */}
                            <div className="h-px bg-linear-to-r from-[#0074E5] to-[#162660]" />

                            {timelineItems.map((item, index) => (
                                <div key={index} className="relative">
                                    <div
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onClick={() => setHoveredIndex(index)}
                                        className={cn(
                                            "relative py-8 px-3 cursor-pointer group transition-all duration-300",
                                            hoveredIndex === index
                                                ? "bg-[#162660] z-10"
                                                : "bg-transparent"
                                        )}
                                    >
                                        {/* Title - Description */}
                                        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                                            {/* Title */}
                                            <h3
                                                className={cn(
                                                    "generalsans-light text-2xl lg:text-[24px] lg:whitespace-nowrap transition-all duration-300 transform",
                                                    hoveredIndex === index
                                                        ? "text-white lg:translate-x-3"
                                                        : "bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent translate-x-0"
                                                )}
                                            >
                                                {item.title}
                                            </h3>

                                            {/* Description */}
                                            <p
                                                className={cn(
                                                    "generalsans-regular md:text-[15px] leading-relaxed transition-all duration-300 w-full lg:w-130 lg:-translate-x-5 whitespace-pre-line text-left",
                                                    hoveredIndex === index
                                                        ? "text-white"
                                                        : "text-[#444444]"
                                                )}
                                            >
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Line giữa */}
                                    {index < timelineItems.length - 1 && (
                                        <div
                                            className={cn(
                                                "h-px transition-all duration-300",
                                                hoveredIndex === index ||
                                                    hoveredIndex === index + 1
                                                    ? "bg-[#162660]"
                                                    : "bg-linear-to-r from-[#0074E5] to-[#162660]"
                                            )}
                                        />
                                    )}
                                </div>
                            ))}

                            {/* Line cuối */}
                            <div className="h-px bg-linear-to-r from-[#0074E5] to-[#162660]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS Animation */}
            <style jsx>{`
                @keyframes zoomIn {
                    0% {
                        transform: scale(0);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
            `}</style>
        </main>
    )
}