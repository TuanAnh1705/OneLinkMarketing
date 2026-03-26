"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue, useSpring } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

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
                <span className="archivo-expanded text-[#000000] text-xl md:text-3xl font-medium min-w-15">{item.number}</span>
                <div className="flex-1 grid md:grid-cols-2 gap-8">
                    <h3 className="generalsans-regular text-[#000A1D] text-xl md:text-2xl font-medium">{item.title}</h3>
                    <p className="generalsans-regular text-sm md:text-sm text-gray-[#444444] leading-relaxed">{item.description}</p>
                </div>
            </motion.div>

            {/* Chỉ hiển thị line nếu KHÔNG phải item cuối */}
            {index < total - 1 && (
                <motion.div
                    className="h-px w-full rounded-full"
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
export default function ProcessSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const uspItems = [
        {
            number: "01",
            title: "Data-Driven Foundation",
            description:
                "Project timelines vary based on scope and complexity, but we always provide a clear timeline upfront.",
        },
        {
            number: "02",
            title: "Global Market Insight",
            description:
                "We understand the nuances of US, UK, and AU markets to give you a competitive edge.",
        },
        {
            number: "03",
            title: "Actionable Roadmaps",
            description:
                "We don't just provide reports; we deliver clear, step-by-step roadmaps that align with your business goals.",
        },
        {
            number: "04",
            title: "Holistic Perspective",
            description:
                "Our strategic approach considers every aspect of your brand and marketing ecosystem.",
        },
    ]

    return (
        <section
            ref={containerRef}
            // Thêm -translate-y-16 (hoặc số khác tùy ý) cho mobile 
            // và md:translate-y-0 để reset ở màn hình từ tablet trở lên
            className="bg-white py-32 md:py-40 px-8 md:px-16 lg:px-24 overflow-x-hidden -translate-y-30 md:translate-y-0"
        >
            <div className="max-w-7xl mx-auto">
                <h2 className="archivo-expanded text-2xl md:text-5xl lg:text-6xl font-medium leading-tight mb-12 text-[#000A1D]">
                    Gain Your Strategic Advantage
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Cột trái - Hình ảnh */}
                    <div className="lg:col-span-1">
                        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[500px] ">
                            <Image
                                src="/assets/sv6.png"
                                alt="Strategic Advantage"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Cột phải - Nội dung với hiệu ứng */}
                    <div className="lg:col-span-2">
                        <div>
                            {/* Line đầu tiên cũng gradient */}
                            <div
                                className="h-px w-full rounded-full"
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
                    <Link href="/contact">
                        <button className="relative overflow-hidden px-5 py-3.5 rounded-full generalsans-regular text-sm text-white bg-linear-to-r from-[#0074E5] to-[#162660] transition-colors duration-300 group">
                            {/* Lớp chữ trên cùng */}
                            <span className="relative z-20 flex items-center justify-center w-full h-full transition-colors duration-500 group-hover:text-[#162660]">
                                Contact Us
                            </span>

                            {/* Nền trắng trượt lên */}
                            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-10"></span>

                            {/* Viền hiện khi hover */}
                            <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#444444] transition-colors duration-500 z-10 pointer-events-none"></span>
                        </button>
                    </Link>

                </div>
            </div>
        </section>
    )
}