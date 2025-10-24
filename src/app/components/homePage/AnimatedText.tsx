"use client"

import { motion } from "framer-motion"

export default function AnimatedText() {
    return (
        // FIX: Giảm padding mobile (px-4) và căn giữa (items-center)
        <section className="min-h-[50vh] flex items-center justify-center px-4 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl w-full mx-auto">
                <motion.div
                    className="relative w-full"
                    style={{ perspective: 1000 }}
                >
                    <motion.h2
                        initial={{ rotateX: -90, opacity: 0, y: -40 }}
                        whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        viewport={{ once: false, amount: 0.5 }}
                        /*
                          FIX:
                          - Giảm clamp min: text-[clamp(2.5rem,6vw,4.2rem)]
                          - Căn giữa mobile: text-center
                          - Căn trái desktop: lg:text-left
                          - Bỏ translate-x mobile, chỉ áp dụng lg: lg:-translate-x-32
                        */
                        className="max-w-5xl mx-auto text-[clamp(2.5rem,6vw,4.2rem)] font-light text-[#000A1D] leading-tight tracking-tight text-center lg:text-left lg:-translate-x-32"
                        style={{
                            fontFamily: "'Archivo Expanded', sans-serif",
                            transformOrigin: "top center",
                        }}
                    >
                        <span className="text-gray-400">Shaping</span> digital <br />
                        <span className="text-gray-400">experiences that</span> connect{" "}
                        <br />
                        <span className="text-gray-400">and</span> perform{" "}
                        <span className="text-gray-400">, for</span> growing <br />
                        <span className="text-gray-400">markets since</span>
                    </motion.h2>
                </motion.div>
            </div>
        </section>
    )
}