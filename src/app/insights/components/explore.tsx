"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

export default function ExploreSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <section className="relative flex flex-col items-center justify-center h-screen mt-[1vh] space-y-5 overflow-hidden bg-white">
            <div className="mb-16">
                <h1 className="archivo-expanded text-6xl md:text-6xl font-semibold text-center tracking-wider text-[#000A1D] mb-2">
                    Explore Our Full Portfolio and Insights
                </h1>
            </div>
            {/* ======= Main Button ======= */}
            <motion.div
                ref={containerRef}
                className="inline-flex flex-col items-center gap-4 cursor-pointer mt-20"
                whileHover="hover"
                initial="initial"
            >
                {/* Text Wrapper (Viewport) */}
                <div // Thẻ này có thể là div thường
                    className="relative overflow-hidden flex items-center justify-center"
                    style={{ height: "7.5rem" }}
                >
                    <motion.div
                        className="flex flex-col" // Bỏ items-center, justify-center ở đây
                        // ✅ FIX 3: Sửa lại variants cho chính xác tuyệt đối
                        variants={{
                            initial: { y: "0%" },
                            hover: { y: "-50%" }, // Trượt lên 50% vì container giờ cao gấp đôi viewport
                        }}
                        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    >
                        {/* --- SLIDE 1 --- */}
                        <div
                            className="flex items-center justify-center text-center"
                            style={{ height: "7.5rem" }}
                        >
                            {/* ✅ FIX 1 & 2: Dùng <br/> và thêm `leading-none` để ép chiều cao */}
                            <div className="archivo-expanded mt-44 text-6xl font-bold bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent leading-none">
                                DOWNLOAD NOW
                            </div>
                        </div>

                        {/* --- SLIDE 2 --- */}
                        <div
                            className="flex items-center justify-center"
                            style={{ height: "7.5rem" }}
                        >
                            <div className="archivo-expanded mt-40 text-7xl font-bold bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent">
                                GO
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Gradient Line */}
                <motion.div
                    className="h-[4px] rounded-full"
                    style={{
                        background: "linear-gradient(90deg, #0074E5 0%, #162660 100%)",
                    }}
                    variants={{
                        initial: { width: "650px" },
                        hover: { width: "140px" },
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                />
            </motion.div>
        </section>
    )
}