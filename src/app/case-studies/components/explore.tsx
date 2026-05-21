"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link" // 🚀 1. IMPORT LINK TỪ NEXT/LINK

// ===================================================================
// ... (Hook useMediaQuery của bạn không thay đổi)
// ===================================================================
function useMediaQuery(query: string): boolean {
    const isClient = typeof window === 'object'

    const getInitialState = () => {
        if (!isClient) {
            return false
        }
        return window.matchMedia(query).matches
    }

    const [matches, setMatches] = useState(getInitialState)

    useEffect(() => {
        if (!isClient) {
            return
        }

        const media = window.matchMedia(query)

        const listener = () => {
            setMatches(media.matches)
        }

        if (media.matches !== matches) {
            setMatches(media.matches)
        }

        media.addEventListener("change", listener)
        return () => media.removeEventListener("change", listener)
    }, [isClient, query, matches])

    return matches
}

// ===================================================================
// ... (Các variants của bạn không thay đổi)
// ===================================================================

// Giá trị gốc của bạn cho desktop (DOWNLOAD NOW -> GO)
const lineVariantsDesktop = {
    initial: { width: "750px" }, // Khớp với "DOWNLOAD NOW" (text-6xl)
    hover: { width: "140px" }, // Khớp với "GO" (text-7xl)
}

// Giá trị mới cho mobile
const lineVariantsMobile = {
    initial: { width: "300px" }, // Ước tính cho "DOWNLOAD NOW" (text-2xl)
    hover: { width: "90px" },  // Khớp với "GO" (text-4xl)
}


export default function ExploreSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    const isMobile = useMediaQuery("(max-width: 767px)")

    return (
        <section className="relative flex flex-col items-center justify-center h-screen -mt-80 -mb-50 md:-mb-50 md:-mt-80 space-y-5 overflow-hidden bg-white/0">
            <div className="mb-0">
                <h1 className="archivo-expanded text-4xl md:text-6xl font-medium text-center tracking-wider text-[#000A1D] mb-2 px-4">
                    Ready to Take the Next Step?
                </h1>
            </div>

            {/* ======= Main Button ======= */}
            {/* 🚀 2. BỌC TOÀN BỘ NÚT BẰNG <Link> */}
            <Link href="/contact">
                <motion.div
                    ref={containerRef}
                    className="inline-flex flex-col items-center gap-4 cursor-pointer mt-5"
                    whileHover="hover"
                    initial="initial"
                >
                    <div
                        className="relative overflow-hidden flex items-center justify-center h-[5rem] md:h-[7.5rem]"
                    >
                        <motion.div
                            className="flex flex-col items-center justify-center"
                            variants={{
                                initial: { y: "35%" },
                                hover: { y: "-15%" },
                            }}
                            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                        >
                            <div className="archivo-expanded text-2xl md:text-6xl font-bold bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent leading-[5rem] md:leading-[7.5rem] whitespace-nowrap">
                                CONTACT US TODAY
                            </div>
                            <div className="archivo-expanded text-4xl md:text-7xl font-bold bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent leading-[5rem] md:leading-[7.5rem]">
                                GO
                            </div>
                        </motion.div>
                    </div>

                    {/* Gradient Line */}
                    <motion.div
                        suppressHydrationWarning
                        className="h-[4px] rounded-full"
                        style={{
                            background: "linear-gradient(90deg, #0074E5 0%, #162660 100%)",
                        }}
                        variants={isMobile ? lineVariantsMobile : lineVariantsDesktop}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    />
                </motion.div>
            </Link>
        </section>
    )
}