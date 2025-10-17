"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"

// ============================================================================
// 🔹 Component FilterTabs
// ============================================================================
const categories = ["All", "Websites", "SEO", "Paid Media", "Social Media"]

function FilterTabs() {
    const [activeTab, setActiveTab] = useState(categories[0])
    const [hoveredTab, setHoveredTab] = useState<string | null>(null)

    return (
        <div className="grid grid-cols-5 w-full max-w-7xl mx-auto mb-20 px-8 md:px-0">
            {categories.map((category) => {
                const isActive = activeTab === category
                const isHovered = hoveredTab === category

                return (
                    <div
                        key={category}
                        onClick={() => setActiveTab(category)}
                        onMouseEnter={() => setHoveredTab(category)}
                        onMouseLeave={() => setHoveredTab(null)}
                        className="relative flex flex-col items-start cursor-pointer group"
                    >
                        <span className="text-lg text-[#444444] group-hover:text-[#000A1D] transition-colors duration-300 relative z-10 pb-3">
                            {category}
                        </span>

                        <motion.div
                            className="absolute bottom-0 left-0 w-full bg-[#D1D1D1]"
                            initial={{ scaleX: 0 }}
                            animate={{
                                scaleX: isActive || isHovered ? 0.9 : 0.9,
                                height: isActive || isHovered ? 2 : 1,
                                backgroundColor: isActive || isHovered ? "#000A1D" : "#D1D1D1",
                            }}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            style={{ transformOrigin: "left" }}
                        />
                    </div>
                )
            })}
        </div>
    )
}

// ============================================================================
// 🔹 Định nghĩa Type và Dữ liệu
// ============================================================================
interface CaseStudyItem {
    src: string
    title: string
    author: string
    year: string
}

const caseStudiesData: CaseStudyItem[][] = [
    [
        {
            src: "/assets/tag.png",
            title: "What a Full-Service Marketing Agency Can Do for Your Brand",
            author: "Olma",
            year: "2025",
        },
        {
            src: "/assets/tag.png",
            title: "Various ideas and creative concepts based on market research",
            author: "Olma",
            year: "2025",
        },
        {
            src: "/assets/tag.png",
            title: "Understanding the Full Spectrum of Services Provided by Digital Agencies",
            author: "Olma",
            year: "2025",
        },
    ],
    [
        {
            src: "/assets/tag.png",
            title: "What a Full-Service Marketing Agency Can Do for Your Brand",
            author: "Olma",
            year: "2025",
        },
        {
            src: "/assets/tag.png",
            title: "Various ideas and creative concepts based on market research",
            author: "Olma",
            year: "2025",
        },
        {
            src: "/assets/tag.png",
            title: "Understanding the Full Spectrum of Services Provided by Digital Agencies",
            author: "Olma",
            year: "2025",
        },
    ],
]

// ============================================================================
// 🔹 Component CaseStudies chính
// ============================================================================
export default function ExpertSection() {
    const section4Ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({ target: section4Ref, offset: ["start end", "center start"] })
    const buttonOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
    const buttonY = useTransform(scrollYProgress, [0, 0.4], [100, 0])

    return (
        <motion.section
            ref={section4Ref}
            className="relative justify-center -mt-10 z-10 bg-white pt-32 pb-32 px-8 md:px-16 lg:px-24"
        >
            <div className="max-w-7xl mx-auto">
                <h2 className="archivo-expanded text-6xl font-medium text-center text-[#000A1D] mb-16">Expert Insights</h2>
                <FilterTabs />
                <div className="flex flex-col gap-20">
                    {caseStudiesData.map((row, rowIndex) => (
                        <div key={rowIndex} className="relative grid md:grid-cols-3 gap-8">
                            {row.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="text-left cursor-pointer relative"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        duration: 2.4,
                                        ease: [0.25, 1, 0.3, 1],
                                        delay: i * 0.2,
                                    }}
                                    viewport={{ once: false, amount: 0.4 }}
                                >
                                    {i < row.length - 1 && (
                                        <div className="absolute top-0 -right-4 w-[1px] h-full bg-gradient-to-b from-[#0074E5] to-[#162660] hidden md:block" />
                                    )}
                                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#D9D9D9] border border-[#e5e5e5]">
                                        <motion.div
                                            className="w-full h-full"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                        >
                                            <Image
                                                src={item.src || "/placeholder.svg"}
                                                alt={item.title}
                                                fill
                                                className="object-cover object-center"
                                            />
                                        </motion.div>
                                    </div>
                                    <h3 className="mt-6 archivo-expanded font-medium text-lg text-[#000A1D] leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm neulis-alt-extralight font-normal text-[#666666]">
                                        By {item.author} - {item.year}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}
