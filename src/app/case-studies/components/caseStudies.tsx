"use client"

import { motion, useSpring, useMotionValue } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
// 🚀 FIX: Import Link để sử dụng
import Link from "next/link"

// // ============================================================================
// // 🔹 Component FilterTabs - ĐÃ FIX RESPONSIVE VÀ LOGIC ANIMATION
// // ============================================================================
// const categories = ["All", "Websites", "SEO", "Paid Media", "Social Media"]

// function FilterTabs() {
//     const [activeTab, setActiveTab] = useState(categories[0])
//     const [hoveredTab, setHoveredTab] = useState<string | null>(null)

//     return (
//         // ✅ FIX 1: Chuyển sang flex + scroll ngang trên mobile, giữ grid trên desktop
//         <div className="flex flex-row overflow-x-auto md:grid md:grid-cols-5 w-full max-w-7xl mx-auto mb-12 md:mb-20 px-4 sm:px-8 md:px-0">
//             {categories.map((category) => {
//                 const isActive = activeTab === category
//                 const isHovered = hoveredTab === category

//                 return (
//                     <div
//                         key={category}
//                         onClick={() => setActiveTab(category)}
//                         onMouseEnter={() => setHoveredTab(category)}
//                         onMouseLeave={() => setHoveredTab(null)}
//                         // ✅ FIX 2: Thêm flex-shrink-0 và padding để scroll
//                         className="relative flex flex-col items-start cursor-pointer group shrink-0 pr-8 md:pr-0"
//                     >
//                         {/* ✅ FIX 3: Giảm cỡ chữ trên mobile */}
//                         <span className="text-base md:text-lg text-[#444444] group-hover:text-[#000A1D] transition-colors duration-300 relative z-10 pb-3 whitespace-nowrap">
//                             {category}
//                         </span>

//                         {/* Gạch chân với animation */}
//                         <motion.div
//                             className="absolute bottom-0 left-0 w-full bg-[#D1D1D1]"
//                             initial={{ scaleX: 0 }}
//                             animate={{
//                                 // ✅ SỬA LỖI LOGIC: Thay 0.9 thứ hai thành 0
//                                 scaleX: isActive || isHovered ? 0.9 : 0,
//                                 height: isActive || isHovered ? 2 : 1,
//                                 backgroundColor: isActive || isHovered ? "#000A1D" : "#D1D1D1",
//                             }}
//                             transition={{ type: "spring", stiffness: 350, damping: 30 }}
//                             style={{ transformOrigin: "left" }}
//                         />
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }
interface CaseStudyItem {
    src: string;
    title: string;
    href: string;
    year: string
}

const caseStudiesData: CaseStudyItem[][] = [
    [
        { src: "/assets/tag1.png", title: "Tag. Fitness",year:"2025", href: "/case-studies/tag" },
        { src: "/assets/steel.png", title: "Steel Works Seattle",year:"2025", href: "/case-studies/steel" },
        { src: "/assets/cns1.png", title: "China Sourcing Co",year:"2025", href: "/case-studies/china-sourcing-co" },
        { src: "/assets/vns1.png", title: "Vietnam Sourcing Co",year:"2023", href: "/case-studies/vietnam-sourcing-co" },
    ],
];

export default function CaseStudies() {
    const section4Ref = useRef<HTMLDivElement>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const smoothX = useSpring(mouseX, { stiffness: 350, damping: 20 })
    const smoothY = useSpring(mouseY, { stiffness: 350, damping: 20 })

    return (
        <motion.section
            ref={section4Ref}
            className="relative justify-center -mt-40 z-10 bg-white/0 pt-32 pb-32 px-4 sm:px-8 md:px-16 lg:px-24"
            onMouseMove={(e) => {
                mouseX.set(e.clientX)
                mouseY.set(e.clientY)
            }}
        >
            <motion.div
                className="fixed top-0 left-0 z-50 pointer-events-none hidden md:flex items-center justify-center rounded-4xl bg-[#FFFFFF] border-none text-[#444444] text-sm shadow-lg px-5 py-3"
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
                <h2 className="archivo-expanded text-4xl sm:text-5xl md:text-6xl font-medium text-center text-[#000A1D] mb-12 md:mb-16">
                    Case Studies
                </h2>
                <div className="flex flex-col gap-12 md:gap-20">
                    {caseStudiesData.map((row, rowIndex) => (
                        <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                            {row.map((item, i) => (
                                <Link key={i} href={item.href}>
                                    <motion.div
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
                                        <div className="relative w-full aspect-4/3 rounded-[2.5rem] overflow-hidden border border-[#e5e5e5] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                                            <Image src={item.src} alt={item.title} fill className="object-cover object-center" />
                                        </div>
                                        <h3 className="mt-7 archivo-expanded font-medium text-xl text-[#000A1D]">{item.title}</h3>
                                        <p className="text-sm generalsans-regular text-[#444444]">{item.year}</p>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}