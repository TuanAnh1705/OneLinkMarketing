"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

// Component ParallaxImage độc lập (giữ nguyên)
function ParallaxImage({
    src,
    alt,
    className,
    speed = "-15%",
}: {
    src: string
    alt: string
    className?: string
    speed?: string | number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const numericSpeed = typeof speed === 'string' ? parseFloat(speed) : speed;
    const positiveSpeed = Math.abs(numericSpeed);

    const y = useSpring(useTransform(scrollYProgress, [0, 1], [`-${positiveSpeed}%`, `${positiveSpeed}%`]), {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <div ref={ref} className={`overflow-hidden rounded-3xl ${className}`}>
            <motion.div
                style={{ y }}
                className="relative h-[140%] w-full top-[-20%] will-change-transform"
            >
                <Image src={src} alt={alt} fill className="object-cover" />
            </motion.div>
        </div>
    )
}


export default function ChallengeSection() {
    return (
        <div className="min-h-screen bg-neutral-50 mt-12">
            {/* ✅ Top Section với đầy đủ text */}
            <section className="container mx-auto px-6 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Left - Title */}
                        <div>
                            <h2 className="archivo-expanded text-5xl lg:text-6xl font-medium tracking-tight text-[#000A1D]">
                                Challenge
                            </h2>
                        </div>

                        {/* Right - Description */}
                        <div className="space-y-6">
                            <p className=" neulis-alt-regular font-medium text-base leading-relaxed text-[#444444]">
                                Myriam was first trained as a sculptor in Montreal and then in Helsinki, Finland. She is now based in Quebec but works for clients all around the globe. From textile design to murals, editorial illustrations and book covers, her style is recognized by her simple and perfectly arranged shapes as well as her rich and vibrant color palette. Striking pewter studded epaulettes silver zips inner drawstring waist channel
                            </p>
                            <ul className="neulis-alt-regular font-medium space-y-2 text-base text-[#444444]">
                                <li>• Brand Development</li>
                                <li>• UX/UI Design</li>
                                <li>• Front-end Development</li>
                                <li>• Copywriting</li>
                                <li>• Shopify Development</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Parallax Grid Section */}
            <section
                className="relative -mt-72 h-[1400px] lg:h-[1800px] w-full"
            >
                <div className="container mx-auto px-6 h-full flex items-center">
                    {/* ✅ FIX: Thay đổi grid-cols-2 thành grid-cols-[3fr_2fr] */}
                    <div className="max-w-7xl mx-auto w-full grid grid-cols-[3fr_2fr] gap-4 lg:gap-6">

                        <ParallaxImage
                            src="/assets/tag1.png"
                            alt="Tag fitness socks"
                            className="h-[400px] lg:h-[600px]"
                            speed="-8%"
                        />

                        <ParallaxImage
                            src="/assets/tag2.png"
                            alt="Athlete on sports court"
                            className="h-[400px] lg:h-[600px]"
                            speed="-12%"
                        />
                        
                        <ParallaxImage
                            src="/assets/tag3.png"
                            alt="People on athletic track"
                            className="col-span-2 h-[400px] lg:h-[600px]"
                            speed="-16%"
                        />

                    </div>
                </div>
            </section>
        </div>
    )
}