"use client"

import { motion } from "framer-motion"

export default function SectionHero() {
    return (
        // ✅ THÊM 'isolate' ĐỂ BUỘC NÓ LÀM 1 LAYER Z-10 DUY NHẤT
        <section className="md:min-h-[85vh] flex items-start px-4 sm:px-8 md:px-16 lg:px-24 pt-24 md:pt-32 relative z-10 isolate">
            {/* ... code bên trong giữ nguyên ... */}

            <div className="relative max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
                {/* --- CỘT TRÁI: HEADING --- */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ fontFamily: "'Archivo Expanded', sans-serif" }}
                    className="text-center md:text-left"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight font-bold text-[#000A1D]">
                        CREATE.
                        <br />
                        CAPTIVATE.
                        <br />
                        ELEVATE.
                    </h1>
                </motion.div>

                {/* --- CỘT PHẢI: PARAGRAPH --- */}
                <div className="flex justify-center md:justify-end md:pt-40 md:translate-x-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-center md:text-right"
                    >
                        <p className="text-lg leading-relaxed text-[#2B2B2B]">
                            Onelink Marketing is your <span className="text-xl font-bold">end-to-end</span>
                            <br />
                            <span className="text-xl font-bold">partner</span>, offering a complete roadmap
                            <br />
                            to solve your marketing challenges.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}