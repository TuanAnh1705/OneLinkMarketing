"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"

// ============================================================================
// 🔹 Component FilterTabs - VIẾT LẠI VỚI CSS GRID ĐỂ ĐẢM BẢO BỐ CỤC
// ============================================================================
const categories = ["All", "Websites", "SEO", "Paid Media", "Social Media"]

function FilterTabs() {
    const [activeTab, setActiveTab] = useState(categories[0])
    const [hoveredTab, setHoveredTab] = useState<string | null>(null)

    return (
        // ✅ THAY ĐỔI 1: Chuyển sang dùng CSS Grid với 5 cột bằng nhau
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
                        {/* Chữ của Tab */}
                        <span className="text-lg text-[#444444] group-hover:text-[#000A1D] transition-colors duration-300 relative z-10 pb-3">
                            {category}
                        </span>

                        {/* Gạch chân với animation */}
                        <motion.div
                            // ✅ THAY ĐỔI 2: Chiều rộng 100% để lấp đầy cột grid
                            className="absolute bottom-0 left-0 w-full bg-[#D1D1D1]"
                            // ✅ THAY ĐỔI 3: Dùng scaleX để có animation mượt mà
                            initial={{ scaleX: 0 }}
                            animate={{
                                scaleX: isActive || isHovered ? 0.9 : 0.9, // 90% khi thường, 100% khi active/hover
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
    src: string;
    title: string;
}

const caseStudiesData: CaseStudyItem[][] = [
    [
        { src: "/assets/tag.png", title: "Tag. Fitness" },
        { src: "/assets/steel.jpg", title: "Steel Works Seattle" },
    ],
    [
        { src: "/assets/tag.png", title: "Tag. Fitness" },
        { src: "/assets/steel.jpg", title: "Steel Works Seattle" },
    ],
    [
        { src: "/assets/tag.png", title: "Tag. Fitness" },
        { src: "/assets/steel.jpg", title: "Steel Works Seattle" },
    ],
];

// ============================================================================
// 🔹 Component CaseStudies chính
// ============================================================================
export default function CaseStudies() {
    const section4Ref = useRef<HTMLDivElement>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const smoothX = useSpring(mouseX, { stiffness: 200, damping: 25 })
    const smoothY = useSpring(mouseY, { stiffness: 200, damping: 25 })

    const { scrollYProgress } = useScroll({ target: section4Ref, offset: ["start end", "center start"] })
    const buttonOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
    const buttonY = useTransform(scrollYProgress, [0, 0.4], [100, 0])

    return (
        <motion.section
            ref={section4Ref}
            className="relative justify-center -mt-20 z-10 bg-white pt-32 pb-32 px-8 md:px-16 lg:px-24"
            onMouseMove={(e) => {
                mouseX.set(e.clientX)
                mouseY.set(e.clientY)
            }}
        >
            {/* Custom cursor */}
            <motion.div
                className="fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center rounded-4xl bg-[#FFFFFF] border border-[#444444]/70 text-[#444444] text-sm shadow-lg px-5 py-3"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale: hoveredIndex !== null ? 1.1 : 0,
                }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
                View Project
            </motion.div>
            
            <div className="max-w-7xl mx-auto">
                <h2 className="archivo-expanded text-6xl font-medium text-center text-[#000A1D] mb-16">
                    Case Studies
                </h2>
                <FilterTabs />
                <div className="flex flex-col gap-20">
                    {caseStudiesData.map((row, rowIndex) => (
                        <div key={rowIndex} className="grid md:grid-cols-2 gap-16">
                            {row.map((item, i) => (
                                <motion.div
                                    key={i}
                                    onMouseEnter={() => setHoveredIndex(rowIndex * 2 + i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className={`text-left ${hoveredIndex === rowIndex * 2 + i ? "cursor-none" : "cursor-pointer"}`}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        duration: 2.4,
                                        ease: [0.25, 1, 0.3, 1],
                                        delay: i * 0.2,
                                    }}
                                    viewport={{ once: false, amount: 0.4 }}
                                >
                                    <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-[#e5e5e5] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                                        <Image src={item.src} alt={item.title} fill className="object-cover object-center" />
                                    </div>
                                    <h3 className="mt-7 archivo-expanded font-medium text-xl text-[#000A1D]">{item.title}</h3>
                                    <p className="text-sm neulis-alt-extralight font-semibold text-[#444444]">Digital Asset Development · 2025</p>
                                </motion.div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}