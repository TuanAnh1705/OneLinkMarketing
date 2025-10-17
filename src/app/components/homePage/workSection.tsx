"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

export default function SectionWork() {
    const section3Ref = useRef<HTMLDivElement>(null)

    // ... (toàn bộ code hooks của bạn giữ nguyên)
    const { scrollYProgress } = useScroll({
        target: section3Ref,
        offset: ["start start", "end start"],
    })
    const textXRaw = useTransform(scrollYProgress, [0, 0.4], ["45%", "-33%"])
    const textX = useSpring(textXRaw, { stiffness: 60, damping: 20, mass: 1.2 })
    const yearsOpacity = useSpring(useTransform(scrollYProgress, [0.38, 0.42], [1, 0]), { stiffness: 80, damping: 25 })
    const workScale = useSpring(useTransform(scrollYProgress, [0.4, 0.7], [1, 0.3]), { stiffness: 80, damping: 25 })
    const workOpacity = useSpring(useTransform(scrollYProgress, [0.7, 0.85], [1, 0]), { stiffness: 80, damping: 25 })
    const descriptionOpacity = useSpring(useTransform(scrollYProgress, [0.3, 0.5], [1, 0]), { stiffness: 80, damping: 25 })
    const descriptionClip = useTransform(scrollYProgress, [0.3, 0.5], ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 100%)"])


    return (
        <section ref={section3Ref} className="min-h-[250vh] relative px-8 md:px-16 lg:px-24">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
                {/* CHỮ CHẠY NGANG */}
                <motion.div
                    style={{ x: textX, fontFamily: "'Archivo Expanded', sans-serif" }}
                    className="absolute whitespace-nowrap flex items-center justify-center -mt-96"
                >
                    <motion.span
                        style={{ opacity: yearsOpacity }}
                        className="text-[15vw] font-bold text-[#000A1D] leading-none tracking-tight"
                    >
                        2022 - 2026&nbsp;&nbsp;
                    </motion.span>
                    <motion.span
                        style={{ scale: workScale, opacity: workOpacity }}
                        className="text-[15vw] font-bold text-[#000A1D] leading-none tracking-tight"
                    >
                        WORK
                    </motion.span>
                </motion.div>

                {/* DESCRIPTION */}
                <motion.div
                    style={{ opacity: descriptionOpacity, clipPath: descriptionClip, fontFamily: "'Neulis Alt Extralight', sans-serif" }}
                    className="absolute bottom-64 right-24 text-left max-w-md font-semibold"
                >
                    <p className="text-lg leading-relaxed text-[#444444]">
                        Onelink Marketing is not just another digital <br />
                        agency. We are your end-to-end partner,<br />
                        providing a comprehensive roadmap to solve <br />
                        your marketing challenges. Our experienced <br />
                        international team delivers global quality with <br />
                        a superior price/performance ratio.
                    </p>
                </motion.div>

                {/* BUTTON */}
                <motion.div className="absolute bottom-40 right-80" style={{ opacity: descriptionOpacity, clipPath: descriptionClip, fontFamily: "'Neulis Alt Extralight', sans-serif"}} >
                    <button className="relative overflow-hidden px-5 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#0074E5] to-[#162660] transition-colors duration-300 group">
                        
                        {/* Lớp Chữ (Trên Cùng) */}
                        <span className="relative z-20 flex items-center justify-center w-full h-full transition-colors duration-500 group-hover:text-[#162660]">
                            Learn More About Us
                        </span>
                        
                        {/* Lớp Nền Trắng Trượt Lên */}
                        <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-10"></span>
                        
                        {/* Lớp Viền Mới (Nằm trên lớp nền trắng) */}
                        <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#444444] transition-colors duration-300 z-10 pointer-events-none"></span>

                    </button>
                </motion.div>
            </div>
        </section>
    )
}