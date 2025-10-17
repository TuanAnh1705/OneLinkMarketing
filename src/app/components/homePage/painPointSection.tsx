"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const timelineItems = [
    {
        title: "Fragmented Marketing",
        description:
            "Working with multiple agencies leads to inconsistent \n messaging and a lack of control.",
        image: "/assets/mockup1.png",
    },
    {
        title: "High Costs, Low ROI",
        description:
            "You invest heavily, but campaigns lack synergy, \n resulting in an uncertain return on investment.",
        image: "/assets/mockup1.png",
    },
    {
        title: "Weak Brand Identity",
        description:
            "Your brand's message is unclear, and your website \n fails to generate real leads or conversions.",
        image: "/assets/mockup1.png",
    },
    {
        title: "Struggling to Scale Globally",
        description:
            "Lack of a cohesive strategy makes it difficult to \n compete and expand into international markets.",
        image: "/assets/mockup1.png",
    },
]

export default function Page() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <main className="min-h-screen">
            <div className="mx-auto max-w-screen-2xl">
                {/* Title Section */}
                <div className="mb-12">
                    <h1 className="archivo-expanded mb-4 text-7xl -translate-x-5 font-bold text-[#000A1D]">
                        Are you struggling with <br /> these pain points?
                    </h1>
                </div>

                {/* Content Section */}
                <div className="relative w-full flex items-center">
                    <div className="relative flex gap-20 w-full items-center">
                        {/* Left Side - Image */}
                        <div className="relative w-[450px] flex items-center justify-center shrink-0">
                            <div className="relative h-[550px] w-full -translate-x-12 translate-y-5">
                                {timelineItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] origin-bottom transform-gpu",
                                            hoveredIndex === index
                                                ? "opacity-100 scale-100 rotate-[18deg] translate-y-0"
                                                : "opacity-0 scale-95 rotate-0 translate-y-6 blur-[2px]",
                                        )}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-contain drop-shadow-2xl"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Text List */}
                        <div className="flex-1 flex flex-col justify-center pl-32 translate-y-16 relative">
                            <div className="relative">
                                {/* Line đầu */}
                                <div className="h-px bg-gradient-to-r from-[#0074E5] to-[#162660]" />

                                {timelineItems.map((item, index) => (
                                    <div key={index} className="relative">
                                        <div
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            className={cn(
                                                "relative py-8 px-3 cursor-pointer group transition-all duration-300",
                                                hoveredIndex === index ? "bg-[#162660] z-10" : "bg-transparent",
                                            )}
                                        >
                                            {/* Title - Description */}
                                            <div className="flex items-center justify-between gap-10">
                                                {/* Title */}
                                                <h3
                                                    className={cn(
                                                        "archivo-expanded font-medium text-2xl whitespace-nowrap transition-all duration-300 transform",
                                                        hoveredIndex === index
                                                            ? "text-white translate-x-3"
                                                            : "bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent translate-x-0",
                                                    )}
                                                >
                                                    {item.title}
                                                </h3>

                                                {/* Description */}
                                                <p
                                                    className={cn(
                                                        "neulis-alt-extralight font-semibold text-base leading-relaxed transition-all duration-300 w-[520px] translate-x-20 whitespace-pre-line text-left",
                                                        hoveredIndex === index ? "text-white" : "text-[#444444]",
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
                                                    hoveredIndex === index || hoveredIndex === index + 1
                                                        ? "bg-[#162660]"
                                                        : "bg-gradient-to-r from-[#0074E5] to-[#162660]",
                                                )}
                                            />
                                        )}
                                    </div>
                                ))}

                                {/* Line cuối */}
                                <div className="h-px bg-gradient-to-r from-[#0074E5] to-[#162660]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
