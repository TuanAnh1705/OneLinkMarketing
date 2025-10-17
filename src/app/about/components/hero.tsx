"use client"

import { useRef, memo } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"



// Đường line gradient
function GradientBorder() {
    return <div className="h-[0.8px] w-full bg-gradient-to-r from-[#0074E5] to-[#162660]" />
}

// Section chính
export default function Hero() {
    return (
        <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="archivo-expanded text-8xl md:text-8xl font-bold text-center tracking-wider bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent mb-8">
                        MADE IN
                    </h1>
                    <h1 className="archivo-expanded text-8xl md:text-8xl font-bold text-center tracking-wider bg-gradient-to-r from-[#FFDE1F] to-[#FC0000] bg-clip-text text-transparent mb-8">
                        VIETNAM
                    </h1>
                    <GradientBorder />
                    <p className="archivo-expanded font-semibold text-[#000A1D] text-center text-5xl md:text-5xl max-w-5xl mx-auto leading-relaxed py-8">
                        International Team
                        <br />Global Mindset
                        <br />Vietnamese Resources
                    </p>
                    <GradientBorder />
                </div>
            </div>
        </section>
    )
}
