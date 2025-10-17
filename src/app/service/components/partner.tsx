"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

export function PartnerSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    // [!code focus:5]
    // Tinh chỉnh thông số vật lý của animation để tạo cảm giác "trôi nổi"
    const smoothYProgress = useSpring(scrollYProgress, {
        stiffness: 50,  // Giảm độ "cứng", làm animation chậm hơn
        damping: 40,    // Tăng độ "giảm chấn" để mượt mà, không bị rung
        mass: 0.5,      // Tăng "khối lượng" để có quán tính, tạo độ trễ
    })

    const y = useTransform(smoothYProgress, [0, 1], ["-25%", "25%"])

    return (
        // Xóa overflow-hidden để đảm bảo animation không bị cắt xén
        <section className="bg-[#0a0e1a] text-white py-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <h2 className="archivo-expanded text-5xl md:text-6xl text-white font-medium text-center mb-20">
                    Why We Are Your Ideal Partner?
                </h2>

                {/* ================== FEATURE CARDS ================== */}
                <div className="flex justify-center items-stretch mb-32 gap-0 relative translate-x-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`flex items-stretch ${index >= 1 ? "-translate-x-4" : ""}`}
                        >
                            <FeatureCard
                                iconSrc={feature.iconSrc}
                                title={feature.title}
                                description={feature.description}
                                reversed={index % 2 === 1}
                                alignTop={index === 1 || index === 3} // Global Quality + Data-Driven Decisions
                            />
                            {index < features.length - 1 && <GradientDivider />}
                        </div>
                    ))}
                </div>

                {/* ================== METRICS SECTION ================== */}
                <div className="flex flex-col items-center">
                    {/* Two-column container for image and text */}
                    <div className="flex justify-center items-start gap-20">
                        {/* Hình bên trái */}
                        <div
                            ref={containerRef}
                            className="relative w-[640px] h-[800px] overflow-hidden rounded-2xl flex-shrink-0"
                        >
                            <motion.div
                                style={{ y }}
                                className="absolute inset-0 flex justify-center items-center"
                            >
                                <div className="relative w-[90%] h-[150%]">
                                    <Image
                                        src="/assets/5.jpg"
                                        alt="Abstract gradient"
                                        fill
                                        className="object-cover rounded-2xl"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Cột phải: metrics */}
                        <div className="h-[800px] flex-1 flex flex-col">
                            <div>
                                <h3 className="archivo-expanded text-5xl md:text-6xl font-medium mb-12 leading-tight text-white">
                                    Metrics That Matter
                                </h3>
                            </div>

                            {/* This container will grow and space its children evenly */}
                            <div className="archivo-expanded flex-grow flex flex-col justify-between pt-8">
                                <MetricItem value="300%+" label="Improvement in website traffic" />
                                <MetricItem value="50%+" label="Increase in lead conversion rates" />
                                <MetricItem value="20%+" label="Reduction in bounce rate" />
                            </div>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="mt-20">
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <button className="relative overflow-hidden px-12 py-4 rounded-full font-medium text-lg text-white border border-white/30 hover:border-transparent bg-transparent transition-colors duration-300 group">
                                <span className="relative z-20 flex items-center justify-center w-full h-full">
                                    Contact Us
                                </span>
                                <span className="absolute inset-0 bg-gradient-to-r from-[#0074E5] to-[#162660] translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-10"></span>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// ================== COMPONENTS ==================
const features = [
    {
        iconSrc: "/assets/1.png",
        title: "Integrated \n Approach",
        description:
            "Our unified strategy \n ensures all your marketing \n efforts work together for \n maximum impact.",
    },
    {
        iconSrc: "/assets/2.png",
        title: "Global \n Quality",
        description:
            "Our international team \n delivers world-class service \n tailored to the US, UK, and \n AU markets.",
    },
    {
        iconSrc: "/assets/3.png",
        title: "Cost-Effective \n Solutions",
        description:
            "Leverage our Vietnam-based \n resources for a superior price- \n to-performance ratio.",
    },
    {
        iconSrc: "/assets/4.png",
        title: "Data-Driven \n Decisions",
        description:
            "Every strategy is built on \n solid market research and \n data analysis for \n predictable results.",
    },
    {
        iconSrc: "/assets/5.png",
        title: "End-To-End \n Partnership",
        description:
            "From brand foundation to \n performance growth, we \n are with you every step of \n the way.",
    },
]

function FeatureCard({
    iconSrc,
    title,
    description,
    reversed = false,
    alignTop = false,
}: {
    iconSrc: string
    title: string
    description: string
    reversed?: boolean
    alignTop?: boolean
}) {
    // ---- Render Blocks ----
    const TextBlock = () => (
        <div>
            <h3 className="archivo-expanded text-2xl text-white font-medium mb-2 whitespace-pre-line leading-tight">
                {title}
            </h3>
            <p className="neulis-alt-regular text-[#ADADAD] text-sm md:text-base leading-relaxed whitespace-pre-line">
                {description}
            </p>
        </div>
    )

    const Icon = ({ marginClass }: { marginClass: string }) => (
        <div className={`relative w-20 h-20 ${marginClass}`}>
            <Image src={iconSrc} alt={title} fill className="object-contain" />
        </div>
    )

    // ---- Logic Rendering ----
    if (alignTop) {
        return (
            <div
                className="flex-shrink-0 w-[240px] flex flex-col justify-between text-left pl-[16px]"
                style={{ height: "340px" }}
            >
                <TextBlock />
                <Icon marginClass="mt-3" />
            </div>
        )
    }
    if (reversed) {
        return (
            <div
                className="flex-shrink-0 w-[240px] flex flex-col justify-end text-left pl-[16px]"
                style={{ height: "340px" }}
            >
                <TextBlock />
                <Icon marginClass="mt-3" />
            </div>
        )
    }
    return (
        <div
            className="flex-shrink-0 w-[240px] flex flex-col justify-between text-left pl-[16px]"
            style={{ height: "340px" }}
        >
            <Icon marginClass="mb-3" />
            <TextBlock />
        </div>
    )
}

function GradientDivider() {
    return (
        <div className="flex-shrink-0 w-px h-[340px] bg-gradient-to-b from-[#0074E5] to-[#162660] opacity-70 mx-[30px]" />
    )
}

function MetricItem({
    value,
    label,
    showLine = true,
}: {
    value: string
    label: string
    showLine?: boolean
}) {
    return (
        <div>
            {showLine && (
                <div className="w-[370px] h-[1px] bg-gradient-to-r from-[#0094FF] to-[#162660] mb-6" />
            )}
            <div className="flex items-start gap-28">
                {/* Column for number (fixed width for alignment) */}
                <div className="w-[320px]">
                    <div className="text-7xl md:text-8xl font-extrabold">{value}</div>
                </div>

                {/* Column for label (font size increased) */}
                <div className="neulis-alt-regular font-medium pt-3 text-xl text-white/80">{label}</div>
            </div>
        </div>
    )
}