"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import Image from "next/image"

export default function FitnessShowcase() {
    const parallaxRef = useRef<HTMLDivElement>(null)

    // Theo dõi tiến trình cuộn
    const { scrollYProgress } = useScroll({
        target: parallaxRef,
        offset: ["start end", "end start"],
    })

    // Mượt hơn: scale nhỏ + scroll nhỏ + spring smoothing
    const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
    const y = useSpring(rawY, {
        stiffness: 15,  // lực đàn hồi thấp => chuyển động mượt
        damping: 15,    // lực cản mềm => trôi nhẹ, không giật
        mass: 0.8,      // thêm chút độ nặng => cinematic
    })

    return (
        <div className="min-h-screen bg-neutral-100">
            {/* Top Section */}
            <section className="container mx-auto px-6 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Top Row */}
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                        {/* Image */}
                        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                            <Image
                                src="/assets/hero.jpg"
                                alt="Fitness outdoor class"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Title */}
                        <div className="flex flex-col justify-center">
                            <h1 className="archivo-expanded text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight">
                                Tag.
                                <br />
                                <span className="archivo-expanded font-medium">Fitness</span>
                            </h1>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            ["Service", "Digital Asset Development"],
                            ["Client", "Tag. Fitness"],
                            ["Date", "January 2025"],
                            ["Technology", "Figma, Adobe Creative Suite, Shopify"],
                        ].map(([label, value], i) => (
                            <div key={i} className="space-y-3">
                                <div className="h-[0.5px] w-full bg-gradient-to-r from-[#0074E5] to-[#162660]" />
                                <p className="neulis-alt-regular text-sm text-[#444444]">{label}</p>
                                <p className="neulis-alt-regular text-base font-medium text-[#000A1D]">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Parallax Section */}
            <section
                ref={parallaxRef}
                className="relative min-h-screen w-full overflow-hidden"
            >
                <motion.div
                    className="absolute inset-0 w-full h-full will-change-transform"
                    style={{
                        y,
                        scale: 1.25, // phóng to hơn một chút cho chiều sâu mạnh hơn
                    }}
                >
                    <Image
                        src="/assets/hero.jpg"
                        alt="Tag Fitness - Where progress never stops"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </section>
        </div>
    )
}
