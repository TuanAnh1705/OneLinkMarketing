"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform} from "framer-motion"
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

    // Tăng biên độ từ 10% lên 25% để thấy rõ chuyển động
    const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"])

    return (
        // bg-transparent để không lộ khung trắng/xám
        <div ref={ref} className={`relative overflow-hidden bg-transparent rounded-3xl ${className}`}>
            {/* Tăng chiều cao ảnh lên 150% và top -25% để bù trừ cho quãng đường di chuyển dài hơn */}
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
        <div className="min-h-screen bg-white mt-12">
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
                                OneLink Marketing partnered with Steel Works Seattle, a leading steel fabrication company with 30 years of experience, to completely transform their digital presence. They were masters of their craft, but their online brand was confusing and failed to communicate their true capabilities.
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
                                2. Services Used
                            </h2>
                        </div>

                        {/* Right - Description */}
                        <div className="space-y-6">
                            <p className=" generalsans-regular text-lg leading-relaxed text-[#444444] mb-0">
                                To solve their core identity problem and build a platform for growth, we provided our two key services:
                            </p>
                            <ul className="list-disc pl-5 text-lg">
                                <li> <strong>Brand Identity:</strong> We conducted a deep analysis of their market position and two distinct customer profiles (B2C and B2B). This informed a new, cohesive brand strategy, messaging, and visual direction.</li>
                                <li><strong>Custom Web Design & Development:</strong> We designed and built a new, high-performance website from the ground up, translating the new brand identity into a powerful, intuitive user experience.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Parallax Grid Section */}
            <section
                className="relative -mt-36 md:-mt-72 h-[1400px] lg:h-[1800px] w-full"
            >
                <div className="container mx-auto px-6 h-full flex items-center">
                    
                    {/* ✅ SỬA ĐỔI: Quay lại grid 2 cột [3fr_2fr] trên desktop */}
                    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 lg:gap-6">

                        <ParallaxStrong
                            src="/assets/steel1.png"
                            alt="Tag fitness socks"
                            className="h-[300px] lg:h-[600px]"
                        />
                        
                        {/* ✅ SỬA ĐỔI: Wrapper cho ảnh nền và logo */}
                        <ParallaxStrong
                            src="/assets/steel2.png"
                            alt="Tag fitness socks"
                            className="h-[300px] lg:h-[600px]"
                        />
                        
                        <ParallaxStrong
                            src="/assets/steel3.png"
                            alt="Tag fitness socks"
                            className="lg:col-span-2 h-[300px] lg:h-[600px]"
                        />

                    </div>
                </div>
            </section>
        </div>
    )
}