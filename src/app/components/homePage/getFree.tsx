"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import type { CtaSection } from "@vns-core/core/types/homepage"

// ===================================================================
// LOGIC RESPONSIVE (GIỮ NGUYÊN)
// ===================================================================

const lineVariantsDesktop = {
    initial: { width: "1050px" },
    hover: { width: "140px" },
}

const lineVariantsMobile = {
    initial: { width: "350px" },
    hover: { width: "90px" },
}

function useMediaQuery(query: string): boolean {
    const isClient = typeof window === 'object'

    const getInitialState = () => {
        if (!isClient) return false
        return window.matchMedia(query).matches
    }

    const [matches, setMatches] = useState(getInitialState)

    useEffect(() => {
        if (!isClient) return

        const media = window.matchMedia(query)
        const listener = () => setMatches(media.matches)

        if (media.matches !== matches) {
            setMatches(media.matches)
        }

        media.addEventListener("change", listener)
        return () => media.removeEventListener("change", listener)
    }, [isClient, query, matches])

    return matches
}

// ===================================================================
// COMPONENT CHÍNH
// ===================================================================

export default function GetAFree({ data }: { data?: CtaSection | null }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const isMobile = useMediaQuery("(max-width: 767px)")

    const line1 = data?.line1 || "GET A FREE CONSULTATION"
    const line2 = data?.line2 || "GO"
    const ctaHref = data?.href || "/contact"

    // Đã xóa các biến marqueeItems vì không cần dùng vòng lặp nữa

    return (
        <section className="relative flex flex-col items-center justify-center md:translate-y-0 -translate-y-25 py-35 md:py-42 space-y-16 overflow-hidden">
            
            {/* ======= Main Button ======= */}
            <Link href={ctaHref}>
                <motion.div
                    ref={containerRef}
                    className="inline-flex flex-col items-center gap-4 cursor-pointer"
                    whileHover="hover"
                    initial="initial"
                >
                    {/* Text Wrapper */}
                    <div className="relative overflow-hidden flex items-center justify-center h-20 md:h-30">
                        <motion.div
                            className="flex flex-col items-center justify-center"
                            variants={{
                                initial: { y: "35%" },
                                hover: { y: "-15%" },
                            }}
                            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                        >
                            <div className="archivo-expanded text-xl md:text-6xl font-bold bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent leading-20 md:leading-30 whitespace-nowrap">
                                {line1}
                            </div>
                            <div className="archivo-expanded text-4xl md:text-7xl font-bold bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent leading-20 md:leading-30">
                                {line2}
                            </div>
                        </motion.div>
                    </div>

                    {/* Gradient Line */}
                    <motion.div
                        suppressHydrationWarning
                        className="h-1 rounded-full transition-all"
                        style={{
                            background: "linear-gradient(90deg, #0074E5 0%, #162660 100%)",
                        }}
                        variants={isMobile ? lineVariantsMobile : lineVariantsDesktop}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    />
                </motion.div>
            </Link>

            {/* ======= Static Text (Đã sửa: Bỏ Marquee) ======= */}
            {/* Căn giữa và chỉ hiển thị text tĩnh */}
            
        </section>
    )
}