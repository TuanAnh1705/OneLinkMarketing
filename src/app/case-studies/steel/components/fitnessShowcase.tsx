"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

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
        <div ref={ref} className={`relative overflow-hidden bg-transparent ${className}`}>
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

export default function FitnessShowcase() {

    return (
        <div className="min-h-screen bg-white">
            {/* Top Section */}
            <section className="container mx-auto px-6 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Top Row */}
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                        {/* Image */}
                        <div className="relative aspect-video overflow-hidden rounded-2xl">
                            <Image
                                src="/assets/steel.png"
                                alt="Fitness outdoor class"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Title */}
                        <div className="flex flex-col justify-center">
                            <h1 className="archivo-expanded text-4xl md:text-6xl font-medium tracking-tight">
                                Forging a Digital Identity for Steel Works Seattle
                            </h1>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            ["Service", "Brand Identity \n Custom Web Design & Development"],
                            ["Client", "Steel Works Seattle"],
                            ["Date", "January 2025"],
                            ["Technology", "Figma \n Adobe Creative Suite \n WordPress"],
                        ].map(([label, value], i) => (
                            <div key={i} className="space-y-3">
                                <div className="h-[0.5px] w-full bg-linear-to-r from-[#0074E5] to-[#162660]" />
                                <p className="generalsans-regular text-sm text-[#444444]">{label}</p>
                                <p className="generalsans-regular text-base font-medium text-[#000A1D] whitespace-pre-line">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Parallax Section */}
            <section className="w-full h-[60vh] md:h-[85vh] mb-20">
                <ParallaxStrong
                    src="/assets/steel.png"
                    alt="China Sourcing Large Banner"
                    className="w-full h-full"
                />
            </section>
        </div>
    )
}
