"use client"

import { useRef, memo } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"



// Đường line gradient
function GradientBorder() {
    return <div className="h-[1px] w-full bg-gradient-to-r from-[#0074E5] to-[#162660]" />
}

// Section chính
export default function TitleSection() {
    return (
        <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="archivo-expanded text-8xl md:text-8xl font-bold text-center tracking-wider bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent mb-8">
                        CONTACT
                    </h1>
                    <GradientBorder />
                </div>
            </div>
        </section>
    )
}
