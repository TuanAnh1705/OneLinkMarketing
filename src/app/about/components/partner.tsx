"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

export default function Partner() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <section className="relative flex flex-col items-center justify-center h-screen  space-y-5 overflow-hidden bg-white/0 -mt-52">
            <div className="mb-16">
                    <h1 className="archivo-expanded text-6xl md:text-6xl font-semibold text-center tracking-wider text-[#000A1D] mb-2">
                        Partner with a Global Team Today
                    </h1>
                </div>
            {/* ======= Main Button ======= */}
            <motion.div
                ref={containerRef}
                className="inline-flex flex-col items-center gap-4 cursor-pointer -mt-20"
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
                            CONTACT US
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
                        initial: { width: "500px" },
                        hover: { width: "140px" },
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                />
            </motion.div>
        </section>
    )
}
