"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

// Component ParallaxImage độc lập (giữ nguyên)
function ParallaxStrong({
    src,
    alt,
    className,
}: {
    src: string
    alt: string
    className?: string
}) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    // biên độ mạnh
    const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"])

    return (
        <div ref={ref} className={`relative overflow-hidden bg-transparent rounded-3xl ${className}`}>
            <motion.div
                style={{ y }}
                className="relative w-full h-[150%] -top-[25%] will-change-transform"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
        </div>
    )
}


export default function ChallengeSection() {
    return (
        <div className="min-h-screen bg-white -mt-10 md:mt-8">
            {/* ✅ Top Section với đầy đủ text */}
            <section className="container mx-auto px-6 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Left - Title */}
                        <div>
                            <h2 className="archivo-expanded text-4xl lg:text-5xl font-medium tracking-tight text-[#000A1D]">
                                1. About the project
                            </h2>
                        </div>

                        {/* Right - Description */}
                        <div className="space-y-6">
                            <p className=" generalsans-regular text-lg leading-relaxed text-[#444444]">
                                Tag, a high-performance running apparel brand, had a premium product line but no direct-to-consumer (D2C) channel. Their entire business was reliant on inefficient, unscalable sales through third-party retailers and social media DMs, which offered zero brand control or access to vital customer data. They needed to launch their first-ever flagship e-commerce platform to build a real brand, own their customer relationships, and create a scalable revenue stream.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-16 lg:py-20 -mt-28">
                <div className="max-w-7xl mx-auto">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Left - Title */}
                        <div>
                            <h2 className="archivo-expanded text-4xl lg:text-5xl font-medium tracking-tight text-[#000A1D]">
                                2. Our Solutions
                            </h2>
                        </div>

                        {/* Right - Description */}
                        <div className="space-y-6">
                            <p className=" generalsans-regular text-lg leading-relaxed text-[#444444]">
                                Our solution was to architect and deploy their entire D2C ecosystem from the ground up, centered on our two core services: <span className="font-semibold">Website Design</span> and <span className="font-semibold">Landing Pages.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Parallax Grid Section */}
            <section className="relative -mt-72 lg:-mt-72 h-[1400px] lg:h-[1800px] w-full">
                <div className="container mx-auto px-6 h-full flex items-center">
                    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 lg:gap-6">

                        <ParallaxStrong
                            src="/assets/tag2.png"
                            alt="Tag fitness socks"
                            className="h-[300px] lg:h-[600px]"
                        />

                        <ParallaxStrong
                            src="/assets/tag3.png"
                            alt="Athlete on sports court"
                            className="h-[300px] lg:h-[600px]"
                        />

                        <ParallaxStrong
                            src="/assets/tag4.jpg"
                            alt="People on athletic track"
                            className="col-span-1 lg:col-span-2 h-[300px] lg:h-[600px]"
                        />

                    </div>
                </div>
            </section>
        </div>
    )
}