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


export default function SolutionsSection() {
    return (
        <div className="bg-neutral-50 py-24">
            {/* ==================== SOLUTIONS SECTION ==================== */}
            {/* ✅ SOLUTIONS LAYOUT: Xếp dọc, căn trái */}
            <section className="container mx-auto px-6 mb-14 -mt-72">
                <div className="max-w-7xl mx-auto flex justify-start"> {/* Dùng flex và justify-start để đẩy khối text sang trái */}
                    <div className="w-full lg:w-1/3 text-left"> {/* Khối text chiếm 1/2 chiều rộng trên màn hình lớn */}
                        <h2 className="archivo-expanded text-5xl lg:text-6xl font-medium tracking-tight text-[#000A1D] mb-6">
                            Solutions
                        </h2>
                        <p className="neulis-alt-regular font-medium text-base leading-relaxed text-[#444444]">
                            Visual hierarchy is the principle of arranging elements to show their order of importance. information easily. By laying out elements logically designers working process by wireframing.
                        </p>
                    </div>
                </div>
            </section>

            {/* Solutions Parallax Grid Section (giữ nguyên) */}
            <section className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ParallaxImage
                        src="/assets/tag4.png"
                        alt="Two people on a basketball court"
                        className="h-[500px] lg:h-[600px]"
                        speed="-10%"
                    />
                    <ParallaxImage
                        src="/assets/tag5.png"
                        alt="Tag logo on a product"
                        className="h-[500px] lg:h-[600px]"
                        speed="-15%"
                    />
                    <ParallaxImage
                        src="/assets/tag6.png"
                        alt="Athlete stretching on a running track"
                        className="h-[500px] lg:h-[600px]"
                        speed="-8%"
                    />
                </div>
            </section>

            {/* ==================== RESULTS SECTION ==================== */}
            {/* ✅ RESULTS LAYOUT: Xếp dọc, căn phải */}
            <section className="container mx-auto px-6 mt-20 mb-16">
                 <div className="max-w-7xl mx-auto flex justify-end"> {/* Dùng flex và justify-end để đẩy khối text sang phải */}
                    <div className="w-full lg:w-1/3 text-left"> {/* Khối text chiếm 1/2 chiều rộng trên màn hình lớn */}
                        <h2 className="archivo-expanded text-5xl lg:text-6xl font-medium tracking-tight text-[#000A1D] mb-6">
                            Results
                        </h2>
                        <p className="neulis-alt-regular font-medium text-base leading-relaxed text-[#444444]">
                            From textile design to murals, editorial illustrations and book covers, her style is recognized by her simple and perfectly arranged shapes as well as her rich and vibrant color palette.
                        </p>
                    </div>
                </div>
            </section>

            {/* Results Parallax Image Section (giữ nguyên) */}
            <section className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto">
                    <ParallaxImage
                        src="/assets/tag7.jpg"
                        alt="Group of people cheering"
                        className="w-full h-[500px] lg:h-[700px]"
                        speed="-12%"
                    />
                </div>
            </section>
        </div>
    )
}