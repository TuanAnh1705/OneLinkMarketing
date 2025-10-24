"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue, useSpring } from "framer-motion"

// --- COMPONENT CON: UspItem ---
const UspItem = ({
    item,
    index,
    total,
    scrollYProgress,
}: {
    item: { number: string; title: string; description: string }
    index: number
    total: number
    scrollYProgress: MotionValue<number>
}) => {
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 30,
        mass: 0.3,
    })

    const delay = index * 0.1
    const range = 0.2

    const contentTranslateX = useTransform(smoothScroll, [delay, delay + range], ["70vw", "0vw"])
    const contentOpacity = useTransform(smoothScroll, [delay, delay + range * 0.7], [0, 1])

    const lineTranslateX = useTransform(smoothScroll, [delay + 0.05, delay + range], ["90vw", "0vw"])
    const lineOpacity = useTransform(smoothScroll, [delay + 0.02, delay + 0.12], [0, 1])

    return (
        <div>
            <motion.div
                style={{ x: contentTranslateX, opacity: contentOpacity }}
                className="flex items-start gap-8 py-10"
            >
                <span className="archivo-expanded text-xl md:text-3xl font-medium min-w-[60px]">{item.number}</span>
                <div className="flex-1 grid md:grid-cols-2 gap-8">
                    <h3 className="neulis-alt-regular text-xl md:text-2xl font-semibold">{item.title}</h3>
                    <p className="neulis-alt-regular text-sm md:text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
            </motion.div>

            {/* Chỉ hiển thị line nếu KHÔNG phải item cuối */}
            {index < total - 1 && (
                <motion.div
                    className="h-[1px] w-full rounded-full"
                    style={{
                        background: "linear-gradient(90deg, #0074E5, #162660)",
                        x: lineTranslateX,
                        opacity: lineOpacity,
                    }}
                />
            )}
        </div>
    )
}

// --- COMPONENT CHÍNH ---
export default function UspSectionForSocial() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const uspItems = [
        {
            number: "01",
            title: "Community Building Focus",
            description:
                "We go beyond simple posts to foster a loyal community that champions your brand.",
        },
        {
            number: "02",
            title: "Content That Converts",
            description:
                "Our content is not just engaging; it's strategically designed to drive real business outcomes.",
        },
        {
            number: "03",
            title: "Consistent Brand Voice",
            description:
                "We ensure your brand voice and visual identity are consistent across all social platforms for recognition.",
        },
        {
            number: "04",
            title: "Data-Driven Engagement",
            description:
                "We use analytics to understand what content performs best, allowing us to optimize for maximum impact.",
        },
    ]

    return (
        <section
            ref={containerRef}
            className="bg-white py-32 md:py-40 px-8 md:px-16 lg:px-24 overflow-x-hidden"
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Cột trái */}
                    <div className="lg:col-span-1">
                        <p className="neulis-alt-regular text-lg md:text-4xl  font-medium">Our</p>
                        <h1 className="archivo-expanded text-5xl md:text-7xl font-medium tracking-tighter leading-none ">
                            Strengths
                        </h1>
                    </div>

                    {/* Cột phải */}
                    <div className="lg:col-span-2">
                        <h2 className="archivo-expanded text-2xl md:text-5xl lg:text-6xl font-medium leading-tight mb-12">
                            Building Communities, <br/> Not Just Followings
                        </h2>

                        <div>
                            {/* Line đầu tiên cũng gradient */}
                            <div
                                className="h-[1px] w-full rounded-full"
                                style={{ background: "linear-gradient(90deg, #0074E5, #162660)" }}
                            />
                            {uspItems.map((item, index) => (
                                <UspItem
                                    key={item.number}
                                    item={item}
                                    index={index}
                                    total={uspItems.length}
                                    scrollYProgress={scrollYProgress}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Nút CTA */}
                <div className="flex justify-center mt-20">
                    <button className="relative overflow-hidden px-5 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#0074E5] to-[#162660] transition-colors duration-300 group">

                        {/* Lớp chữ trên cùng */}
                        <span className="relative z-20 flex items-center justify-center w-full h-full transition-colors duration-500 group-hover:text-[#162660]">
                            Contact Us
                        </span>

                        {/* Nền trắng trượt lên */}
                        <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-10"></span>

                        {/* Viền hiện khi hover */}
                        <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#444444] transition-colors duration-500 z-10 pointer-events-none"></span>
                    </button>
                </div>
            </div>
        </section>
    )
}
