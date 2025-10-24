"use client"

// 🚀 THÊM useState và useEffect
import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

// ===================================================================
// BẮT ĐẦU CODE RESPONSIVE (Copy từ code mẫu của bạn)
// ===================================================================

// 1. Định nghĩa variants
const lineVariantsDesktop = {
    initial: { width: "1050px" },
    hover: { width: "140px" },
}

const lineVariantsMobile = {
    initial: { width: "350px" }, // Lấy từ code mẫu
    hover: { width: "90px" },  // Lấy từ code mẫu
}

// 2. 🚀 HOOK useMediaQuery ĐÃ SỬA LỖI "FLASH"
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
// KẾT THÚC CODE RESPONSIVE
// ===================================================================


export default function ReadyToTransform() {
    const containerRef = useRef<HTMLDivElement>(null)

    // 3. 🚀 SỬ DỤNG HOOK
    const isMobile = useMediaQuery("(max-width: 767px)")

    return (
        <section className="relative flex flex-col items-center justify-center h-screen -mt-[20vh] space-y-5 overflow-hidden bg-white/0">
            <div className="mb-16">
                <h1 className="archivo-expanded text-4xl md:text-6xl font-medium text-center tracking-wider text-[#000A1D] mb-2">
                    Ready to Transform Your Brand?
                </h1>
                <p className="neulis-alt-regular font-medium text-[#000A1D] text-center text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed py-8">
                    Start your transformation journey with Onelink today.
                </p>
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
                    // 4. 🚀 THAY ĐỔI: Chiều cao responsive
                    className="relative overflow-hidden flex items-center justify-center h-[5rem] md:h-[7.5rem]"
                // Bỏ style={{ height: "7.5rem" }}
                >
                    <motion.div
                        className="flex flex-col items-center justify-center"
                        variants={{
                            initial: { y: "35%" },
                            hover: { y: "-15%" },
                        }}
                        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    >
                        {/* 5. 🚀 THAY ĐỔI: Cỡ chữ (text-xl) và line-height responsive */}
                        <div className="archivo-expanded text-xl md:text-6xl font-bold bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent leading-[5rem] md:leading-[7.5rem] whitespace-nowrap">
                            GET A FREE CONSULTATION
                        </div>
                        {/* 6. 🚀 THAY ĐỔI: Cỡ chữ (text-4xl) và line-height responsive */}
                        <div className="archivo-expanded text-4xl md:text-7xl font-bold bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent leading-[5rem] md:leading-[7.5rem]">
                            GO
                         </div>
                    </motion.div>
                </div>

                {/* Gradient Line */}
                <motion.div
                    // 7. 🚀 THÊM suppressHydrationWarning
                    suppressHydrationWarning
                    className="h-[4px] rounded-full transition-all"
                    style={{
                        background: "linear-gradient(90deg, #0074E5 0%, #162660 100%)",
                    }}
                    // 8. 🚀 THAY ĐỔI: Áp dụng variants động
                    variants={isMobile ? lineVariantsMobile : lineVariantsDesktop}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                />
            </motion.div>
        </section>
    )
}