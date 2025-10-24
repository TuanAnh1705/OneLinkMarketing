"use client"

import { motion } from "framer-motion"

export default function SectionHero() {
    return (
        // FIX: Giảm padding trên mobile, tăng dần lên desktop
        <section className="min-h-[85vh] flex items-start px-4 sm:px-8 md:px-16 lg:px-24 pt-24 md:pt-32 bg-white">
            {/* FIX: Thêm items-center để căn giữa 2 cột theo chiều dọc trên desktop */}
            <div className="relative max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
                
                {/* --- CỘT TRÁI: HEADING --- */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ fontFamily: "'Archivo Expanded', sans-serif" }}
                    // FIX: Thêm text-center md:text-left để căn giữa trên mobile
                    className="text-center md:text-left"
                >
                    {/*
                      FIX: Đã XÓA text-[clamp(2.8rem,6vw,4.2rem)]
                      Nó đang xung đột và ghi đè lên các lớp text-6xl, text-7xl...
                    */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight font-bold text-[#000A1D]">
                        CREATE.
                        <br />
                        CAPTIVATE.
                        <br />
                        ELEVATE.
                    </h1>
                </motion.div>

                {/* --- CỘT PHẢI: PARAGRAPH --- */}
                {/*
                  FIX: Bỏ 'absolute' và đưa vào grid cell thứ 2.
                  - Căn giữa trên mobile (justify-center)
                  - Căn phải trên desktop (md:justify-end)
                */}
                <div className="flex justify-center md:justify-end md:pt-40 md:translate-x-24">
                    {/* Thêm motion cho nhất quán */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        // FIX: Căn giữa text trên mobile, căn phải trên desktop
                        className="text-center md:text-right"
                    >
                        <p className="text-lg leading-relaxed">
                            Onelink Marketing is not just another digital
                            <br />
                            agency. We are your end-to-end partner,
                            <br />
                            providing a comprehensive roadmap to
                            <br />
                            solve your marketing challenges.
                        </p>
                    </motion.div>
                </div>
                
            </div>
        </section>
    )
}