"use client"

import { motion } from "framer-motion"

export default function SectionHero() {
    return (
        // ✅ THÊM 'isolate' ĐỂ BUỘC NÓ LÀM 1 LAYER Z-10 DUY NHẤT
        <section className="md:min-h-[85vh] flex items-start px-4 sm:px-8 md:px-16 lg:px-24 pt-10 md:pt-32 relative z-10 isolate">
            {/* ... code bên trong giữ nguyên ... */}

            <div className="relative max-w-7xl mx-auto w-full grid md:grid-cols-[1fr_auto] gap-6 items-center">
                {/* --- CỘT TRÁI: HEADING --- */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ fontFamily: "'Archivo Expanded', sans-serif" }}
                    className="text-center md:text-left"
                >
                    <h1 className="text-2xl md:text-6xl uppercase lg:text-7xl leading-none tracking-tight font-semibold text-[#000A1D]">
                        High-end quality, without high-end overheads
                    </h1>
                </motion.div>

                {/* --- CỘT PHẢI: PARAGRAPH --- */}
                <div className="hidden md:flex justify-center md:justify-end md:pt-40 md:translate-x-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-center md:text-right"
                    >
                        <p className="generalsans-regular text-lg leading-relaxed text-[#2B2B2B]">
                            <span className="text-lg font-bold">More</span> Aligned
                            <br />
                            <span className="text-lg font-bold">More</span> Efficient
                            <br />
                            <span className="text-lg font-bold">Better</span> Value
                            <br />
                            <span className="text-lg font-bold">Smarter</span> Structure
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}