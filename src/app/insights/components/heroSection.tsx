"use client"

import { useRef, memo } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"



// Đường line gradient
function GradientBorder() {
    return <div className="h-[1px] w-full bg-gradient-to-r from-[#0074E5] to-[#162660]" />
}

// Section chính
export default function HeroSection() {
    return (
        <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="archivo-expanded text-8xl md:text-8xl font-bold text-center tracking-wider bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent mb-8">
                        CASE STUDIES <br/> AND INSIGHTS
                    </h1>
                    <GradientBorder />
                    <p className="archivo-expanded font-semibold text-[#000A1D] text-center text-5xl md:text-5xl max-w-5xl mx-auto leading-relaxed py-8">
                        Explore our work and learn <br/> from our team of experts.
                    </p>
                    <GradientBorder />
                </div>
            </div>
        </section>
    )
}
