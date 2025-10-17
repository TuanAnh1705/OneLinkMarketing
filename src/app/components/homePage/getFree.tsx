"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

export default function GetAFree() {
    const containerRef = useRef<HTMLDivElement>(null)

    const marqueeText = "LET'S WORK TOGETHER -"
    const marqueeItems = Array(8).fill(marqueeText)

    return (
        <section className="relative flex flex-col items-center justify-center h-screen mt-[20vh] space-y-16 overflow-hidden bg-white">
            {/* ======= Main Button ======= */}
            <motion.div
                ref={containerRef}
                className="inline-flex flex-col items-center gap-4 cursor-pointer"
                whileHover="hover"
                initial="initial"
            >
                {/* Text Wrapper */}
                <div
                    className="relative overflow-hidden flex items-center justify-center"
                    style={{ height: "7.5rem" }}
                >
                    <motion.div
                        className="flex flex-col items-center justify-center"
                        variants={{
                            initial: { y: "35%" },
                            hover: { y: "-15%" },
                        }}
                        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    >
                        <div className="archivo-expanded text-6xl font-bold bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent leading-[7.5rem]">
                            GET A FREE CONSULTATION
                        </div>
                        <div className="archivo-expanded text-7xl font-bold bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent leading-[7.5rem]">
                            GO
                        </div>
                    </motion.div>
                </div>

                {/* Gradient Line */}
                <motion.div
                    className="h-[4px] rounded-full transition-all"
                    style={{
                        background: "linear-gradient(90deg, #0074E5 0%, #162660 100%)",
                    }}
                    variants={{
                        initial: { width: "1050px" },
                        hover: { width: "140px" },
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                />
            </motion.div>

            {/* ======= Marquee ======= */}
            <div className="absolute bottom-10 w-full overflow-hidden">
                <motion.div
                    className="flex whitespace-nowrap text-[8vw] font-bold uppercase tracking-tight"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 25,
                        ease: "linear",
                    }}
                >
                    {/* 🔁 Hai bản liên tiếp để không bị đứt đoạn */}
                    {[...marqueeItems, ...marqueeItems].map((text, index) => (
                        <span
                            key={index}
                            className="neulis-alt-extralight font-bold px-8 bg-[#000A1D] bg-clip-text text-transparent"
                        >
                            {text}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
