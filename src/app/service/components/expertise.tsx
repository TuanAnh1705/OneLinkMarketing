"use client"

import { useRef, memo } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

const expertiseData = [
    {
        number: "01",
        title: "Strategy \n Consulting",
        services: ["Brand Audit & Insight Analysis", "Market & Competitor Research", "Key Messaging Framework"],
        image: "/assets/21.png",
    },
    {
        number: "02",
        title: "Digital Asset \n Development",
        services: ["Brand Identity", "Website Design", "Landing Page", "Digital Collateral"],
        image: "/assets/22.png",
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
        image: "/assets/23.png",
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
        image: "/assets/24.png",
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
        image: "/assets/25.png",
    },
]

// Đường line gradient
function GradientBorder() {
    return <div className="h-[1px] w-full bg-gradient-to-r from-[#0074E5] to-[#162660]" />
}

// Item chuyên môn
const ExpertiseItem = memo(({ item, showLine }: { item: (typeof expertiseData)[0]; showLine: boolean }) => {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    })

    const clipValue = useTransform(scrollYProgress, [0, 1], [100, 0])
    const clipSpring = useSpring(clipValue, { stiffness: 70, damping: 20 })

    const imageTranslateX = useTransform(scrollYProgress, [0, 1], [25, 0])
    const imageTranslateXSpring = useSpring(imageTranslateX, { stiffness: 60, damping: 18 })

    const titleTranslateX = useTransform(scrollYProgress, [0, 0.8], [-100, 0])
    const titleTranslateXSpring = useSpring(titleTranslateX, { stiffness: 60, damping: 18 })

    const sharpImageOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
    const sharpImageOpacitySpring = useSpring(sharpImageOpacity, { stiffness: 100, damping: 30 })

    return (
        <div ref={ref} className="py-16 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Number */}
                <div className="lg:col-span-2">
                    <p className="archivo-expanded text-3xl md:text-3xl font-medium text-[#000000]">({item.number})</p>
                </div>

                {/* Services */}
                <div className="lg:col-span-5 pl-52">
                    <ul className="space-y-2">
                        {item.services.map((service, idx) => (
                            <li key={idx} className="neulis-alt-regular font-medium text-[#000000] md:text-lg">
                                {service}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Image */}
                <div className="lg:col-span-5">
                    <motion.div
                        className="relative w-full h-64 md:h-80 overflow-hidden rounded-3xl shadow-lg"
                        style={{
                            clipPath: useTransform(clipSpring, (v) => `inset(0 0 0 ${v}% round 24px)`),
                            willChange: "clip-path",
                        }}
                    >
                        <img
                            src={item.image}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
                        />
                        <motion.img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{
                                x: useTransform(imageTranslateXSpring, (v) => `${v}%`),
                                scale: useSpring(useTransform(scrollYProgress, [0, 1], [1.1, 1]), {
                                    stiffness: 80,
                                    damping: 20,
                                }),
                                opacity: sharpImageOpacitySpring,
                                willChange: "transform, opacity",
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <motion.div
                            className="absolute inset-0 flex items-center justify-start px-6"
                            style={{
                                x: useTransform(titleTranslateXSpring, (v) => `${v}%`),
                                willChange: "transform",
                            }}
                        >
                            <h3 className="archivo-expanded text-white text-2xl md:text-3xl font-semibold leading-snug whitespace-pre-line text-left">
                                {item.title}
                            </h3>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Line dưới mỗi item, trừ item cuối */}
            {showLine && (
                <div className="absolute bottom-0 left-0 w-full">
                    <GradientBorder />
                </div>
            )}
        </div>
    )
    ExpertiseItem.displayName = "ExpertiseItem"
})

// Section chính
export default function ExpertiseSection() {
    return (
        <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="archivo-expanded text-9xl md:text-9xl font-bold text-center tracking-wider bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent mb-8">
                        EXPERTISE
                    </h1>
                    <GradientBorder />
                    <p className="archivo-expanded font-semibold text-[#000A1D] text-center text-5xl md:text-5xl max-w-5xl mx-auto leading-relaxed py-8">
                        We provide a single, <br /> integrated roadmap to solve <br /> all your marketing challenges.
                    </p>
                    <GradientBorder />
                </div>

                {/* Danh sách item */}
                <div>
                    {expertiseData.map((item, i) => (
                        <ExpertiseItem
                            key={i}
                            item={item}
                            showLine={i < expertiseData.length - 1} // Chỉ vẽ line nếu chưa phải item cuối
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
