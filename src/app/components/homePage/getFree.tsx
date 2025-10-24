"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

// ===================================================================
// BẮT ĐẦU SỬA RESPONSIVE
// ===================================================================

// 1. Định nghĩa variants (Giữ nguyên giá trị 50px của bạn)
const lineVariantsDesktop = {
    initial: { width: "1050px" },
    hover: { width: "140px" },
}

const lineVariantsMobile = {
    initial: { width: "350px" }, // Giữ 50px bạn đã set
    hover: { width: "90px" }, // Khớp với text-4xl
}

// 🚀 THAY ĐỔI: HOOK useMediaQuery ĐÃ SỬA LỖI "FLASH"
function useMediaQuery(query: string): boolean {
    // 1. Kiểm tra xem 'window' có tồn tại không (tức là đang ở client)
    const isClient = typeof window === 'object'

    // 2. Hàm lấy giá trị ban đầu MỘT CÁCH ĐỒNG BỘ (Synchronously)
    const getInitialState = () => {
        if (!isClient) {
            return false // Mặc định là 'false' khi ở Server-Side Rendering (SSR)
        }
        return window.matchMedia(query).matches // Lấy giá trị ĐÚNG ngay lập Ftrước khi render
    }

    // 3. Khởi tạo state với giá trị ĐÚNG
    const [matches, setMatches] = useState(getInitialState)

    // 4. useEffect bây giờ CHỈ dùng để LẮNG NGHE thay đổi (resize)
    useEffect(() => {
        if (!isClient) {
            return // Không làm gì ở server
        }

        const media = window.matchMedia(query)

        const listener = () => {
            setMatches(media.matches)
        }

        // Kiểm tra lại một lần nữa phòng trường hợp hydration
        if (media.matches !== matches) {
            setMatches(media.matches)
        }

        media.addEventListener("change", listener)
        return () => media.removeEventListener("change", listener)
    }, [isClient, query, matches]) // Thêm dependencies

    return matches
}

// ===================================================================
// KẾT THÚC SỬA RESPONSIVE
// ===================================================================

export default function GetAFree() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Dùng hook 'useMediaQuery' đã sửa
    const isMobile = useMediaQuery("(max-width: 767px)")

    const marqueeText = "LET'S WORK TOGETHER -"
    const marqueeItems = Array(8).fill(marqueeText)

    return (
        <section className="relative flex flex-col items-center justify-center h-screen -mt-[70vh] space-y-16 overflow-hidden bg-white/0">
            {/* ======= Main Button ======= */}
            <motion.div
                ref={containerRef}
                className="inline-flex flex-col items-center gap-4 cursor-pointer"
                whileHover="hover"
                initial="initial"
            >
                {/* Text Wrapper */}
                <div
                    // Chiều cao responsive
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
                        {/* Cỡ chữ (text-2xl) responsive */}
                        <div className="archivo-expanded text-xl md:text-6xl font-bold bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent leading-[5rem] md:leading-[7.5rem] whitespace-nowrap">
                            GET A FREE CONSULTATION
                        </div>
                        {/* Cỡ chữ (text-4xl) responsive */}
                        <div className="archivo-expanded text-4xl md:text-7xl font-bold bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent leading-[5rem] md:leading-[7.5rem]">
                            GO
                        </div>
                    </motion.div>
                </div>

                {/* Gradient Line */}
                <motion.div
                suppressHydrationWarning
                    className="h-[4px] rounded-full transition-all"
                    style={{
                        background: "linear-gradient(90deg, #0074E5 0%, #162660 100%)",
                    }}
                    // 'isMobile' bây giờ sẽ ĐÚNG ngay từ lần render đầu tiên
                    variants={isMobile ? lineVariantsMobile : lineVariantsDesktop}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                />
            </motion.div>

            {/* ======= Marquee ======= */}
            {/* (Không thay đổi) */}
            <div className="absolute bottom-4 md:bottom-10 w-full overflow-hidden">
                <motion.div
                    className="flex whitespace-nowrap text-[8vw] font-bold uppercase tracking-tight"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 25,
                        ease: "linear",
                    }}
                >
                    {[...marqueeItems, ...marqueeItems].map((text, index) => (
                        <span
                            key={index}
                            className="neulis-alt-extralight font-bold px-8 bg-[#000A1D] bg-clip-text text-transparent"
                        >
                            {text}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}