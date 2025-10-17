"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

const coreValuesData = [
    {
        title: "Vision",
        description: "To be the trusted end-to-end partner for global brands seeking sustainable growth.",
        imageUrl: "/assets/core1.png",
    },
    {
        title: "Mission",
        description:
            "To help every brand achieve a strong identity and superior performance, solving the problem of fragmented and ineffective solutions.",
        imageUrl: "/assets/core2.png",
    },
    {
        title: "Value",
        description: "Excellence, Integrity, Partnership, and Innovation.",
        imageUrl: "/assets/core3.png",
    },
]

export function CoreValuesSection() {
    const parallaxRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: parallaxRef,
        offset: ["start end", "end start"],
    })

    const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 20 })
    const y = useTransform(smooth, [0, 1], ["-15%", "15%"])

    return (
        <section className="bg-[#050B18] text-white py-20 md:py-32 px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* ==================== CORE VALUES ==================== */}
                <div className="text-center mb-20">
                    <h2 className="archivo-expanded text-6xl md:text-7xl text-white font-medium">Our Core Values</h2>
                </div>

                {/* --- 3 CARD TRÊN --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
                    {coreValuesData.map((value) => (
                        <div
                            key={value.title}
                            className="relative rounded-2xl overflow-hidden p-8 h-64 bg-gradient-to-br from-[#0A4BE1] to-[#04205E]"
                        >
                            <div className="absolute inset-0">
                                <Image
                                    src={value.imageUrl}
                                    alt={value.title}
                                    fill
                                    className="object-contain translate-x-[10%] -translate-y-[30%] scale-110 opacity-80"
                                />
                            </div>
                            <div className="absolute inset-0 bg-[#0074E5]/70"></div>
                            {/* Vùng chứa text */}
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                {/* CHANGED: Điều chỉnh lại cỡ chữ cho phù hợp */}
                                <h3 className="archivo-expanded text-5xl text-white font-bold">{value.title}</h3>
                                {/* CHANGED: Xóa các class không cần thiết */}
                                <p className="neulis-alt-regular font-medium text-white text-lg leading-snug">{value.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ==================== LEAD ENGINE ==================== */}
                <div ref={parallaxRef} className="grid grid-cols-1 lg:grid-cols-3 gap-0 items-stretch  overflow-hidden">
                    {/* --- ẢNH PARALLAX --- */}
                    <div className="relative h-[700px] lg:col-span-2 overflow-hidden">
                        <motion.div style={{ y }} className="absolute inset-0 scale-120 will-change-transform">
                            <Image
                                src="/assets/core.jpg"
                                alt="Abstract background"
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    </div>

                    {/* --- CARD TEXT BÊN PHẢI --- */}
                    <div className="bg-gradient-to-br from-[#0074E5] to-[#162660] p-10 md:p-14 flex flex-col justify-center">
                        <div className="max-w-sm">
                            <h2 className="archivo-expanded text-white text-3xl md:text-4xl font-medium leading-tight mb-8">
                                From a Lifeless Website to a Lead Engine
                            </h2>
                            <ul className="neulis-alt-regular font-medium space-y-4 text-base md:text-lg text-white">
                                <ListItem>
                                    An <span className="font-bold">SEO/UX-optimized website</span> that generates leads in the <span className="font-bold">US, UK, and AU markets.</span>
                                </ListItem>
                                <ListItem>A <span className="font-bold">clear and professional brand identity.</span></ListItem>
                                <ListItem>
                                    Digital assets integrated into a single, effective <span className="font-bold">lead engine.</span> 
                                </ListItem>
                                <ListItem><span className="font-bold">Optimized costs</span> with high-performance results.</ListItem>
                            </ul>
                            <a
                                href="#"
                                className="group relative inline-block mt-10 text-white border border-white rounded-full px-6 py-2 text-sm transition-colors duration-300 ease-in-out overflow-hidden hover:text-black"
                            >
                                {/* Lớp nền trắng trượt lên */}
                                <span className="absolute inset-0 w-full h-full bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                                {/* Text nằm ở trên */}
                                <span className="neulis-alt-regular font-medium relative">Learn More</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ListItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start">
            <span className="text-white mr-3 mt-1.5">&#8226;</span>
            <span>{children}</span>
        </li>
    )
}