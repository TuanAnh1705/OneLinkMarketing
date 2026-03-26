"use client"

import { useRef, memo } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Link from "next/link"

// --- DATA ---
const expertiseData = [
    {
        number: "01",
        title: "Strategy \n Consulting",
        services: ["Brand Audit & Insight Analysis", "Market & Competitor Research", "Key Messaging Framework","Measurement, Data & Optimisation"],
        image: "/assets/sv1.png",
        slug: "/service/strategy-consulting",
    },
    {
        number: "02",
        title: "Digital Asset \n Development",
        services: ["Brand Identity", "Website Design", "Landing Page", "Digital Collateral"],
        image: "/assets/sv2.png",
        slug: "/service/digital-asset-development",
    },
    {
        number: "03",
        title: "Search Engine \n Optimization",
        services: [
            "Keyword Research & Planning",
            "On-page Optimization",
            "Off-page Optimization",
            "Content Strategy & Production",
        ],
        image: "/assets/sv3.png",
        slug: "/service/seo-services",
    },
    {
        number: "04",
        title: "Paid Media & \n Advertising",
        services: [
            "Multi-channel Strategy",
            "Cost & Conversion Rate Optimization",
            "A/B Testing & Funnel Optimization",
            "Performance Reporting & Daily Insights",
        ],
        image: "/assets/sv4.png",
        slug: "/service/paid-media-&-advertising",
    },
    {
        number: "05",
        title: "Social Media \n Management",
        services: [
            "Platform Setup",
            "Research & Content Strategy",
            "Content Production",
            "Reporting & Community Engagement",
        ],
        image: "/assets/sv5.png",
        slug: "/service/social-media-management",
    },
]

// --- COMPONENTS ---

function GradientBorder() {
    return <div className="h-px w-full bg-linear-to-r from-[#0074E5] to-[#162660] opacity-50" />
}

const ExpertiseItem = memo(({ item, showLine }: { item: (typeof expertiseData)[0]; showLine: boolean }) => {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    })

    // Hiệu ứng Clip Path (mở hộp)
    const clipValue = useTransform(scrollYProgress, [0, 1], [100, 0])
    const clipSpring = useSpring(clipValue, { stiffness: 70, damping: 20 })

    // Hiệu ứng Text trượt ngang
    const titleTranslateX = useTransform(scrollYProgress, [0, 0.8], [-100, 0])
    const titleTranslateXSpring = useSpring(titleTranslateX, { stiffness: 60, damping: 18 })

    return (
        <div ref={ref} className="py-12 md:py-16 relative">
            {/* LAYOUT GRID MỚI: 
               - lg:col-span-2: Số thứ tự
               - lg:col-span-6: Danh sách dịch vụ (Chiếm nhiều chỗ hơn để đẩy box ra xa)
               - lg:col-span-4: Box Title (Nhỏ lại)
            */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* 1. Number */}
                <div className="lg:col-span-2">
                    <p className="archivo-expanded text-xl md:text-3xl font-medium text-[#000000]">
                        ({item.number})
                    </p>
                </div>

                {/* 2. Services List */}
                <div className="lg:col-span-6 pl-0 md:pl-20 lg:pl-32 text-left">
                    <ul className="space-y-1 md:space-y-2">
                        {item.services.map((service, idx) => (
                            <li
                                key={idx}
                                className="generalsans-regular text-[#000A1D] text-sm md:text-base lg:text-lg leading-snug"
                            >
                                {service}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 3. Blue Box Title (Đã thu gọn width) */}
                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                    <Link href={item.slug} className="w-full max-w-97.5"> 
                        <motion.div
                            className="relative w-full h-52 md:h-64 overflow-hidden rounded-3xl shadow-lg cursor-pointer bg-[#000A1D]"
                            style={{
                                clipPath: useTransform(clipSpring, (v) => `inset(0 0 0 ${v}% round 24px)`),
                                willChange: "clip-path",
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 flex items-center justify-start px-8"
                                style={{
                                    x: useTransform(titleTranslateXSpring, (v) => `${v}%`),
                                    willChange: "transform",
                                }}
                            >
                                <h3 className="archivo-expanded text-white text-lg md:text-2xl font-semibold leading-tight whitespace-pre-line text-left">
                                    {item.title}
                                </h3>
                            </motion.div>
                        </motion.div>
                    </Link>
                </div>
            </div>

            {/* Line dưới mỗi item */}
            {showLine && (
                <div className="absolute bottom-0 left-0 w-full">
                    <GradientBorder />
                </div>
            )}
        </div>
    )
})

ExpertiseItem.displayName = "ExpertiseItem"

// --- MAIN SECTION ---
export default function ExpertiseSection() {
    return (
        <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden bg-white">
            <div className="max-w-8xl mx-auto relative">
                
                {/* Header Section */}
                <div className="mb-16">
                    <h1 className="archivo-expanded text-5xl md:text-9xl font-bold text-center tracking-tighter bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent mb-8">
                        SERVICES
                    </h1>
                    <GradientBorder />
                    <p className="archivo-expanded font-medium text-[#000A1D] text-center text-xl md:text-4xl lg:text-5xl max-w-5xl mx-auto leading-tight py-12">
                        We provide a single, <br className="hidden md:block" /> 
                        integrated roadmap to solve <br className="hidden md:block" /> 
                        all your marketing challenges.
                    </p>
                    <GradientBorder />
                </div>

                {/* List of Items */}
                <div className="mt-8">
                    {expertiseData.map((item, i) => (
                        <ExpertiseItem
                            key={item.number}
                            item={item}
                            showLine={i < expertiseData.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}