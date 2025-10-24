"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"

export default function ImageBottomContainer() {
    const ref = useRef<HTMLDivElement>(null)
    
    // --- 🚀 THAY ĐỔI RESPONSIVE ---
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // 1. Điều chỉnh khoảng cách parallax (Vẫn giữ)
    const moveDistance = isMobile ? 250 : 400

    // 2. Xóa 'backgroundZoom' vì chúng ta sẽ dùng "cover"
    // const backgroundZoom = ... (ĐÃ XÓA)
    // --- HẾT THAY ĐỔI ---

    // Theo dõi tiến trình scroll của section
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    // Sử dụng 'moveDistance' đã tính toán
    const moveY = useTransform(scrollYProgress, [0, 0.7], [0, moveDistance])
    const smoothY = useSpring(moveY, { stiffness: 80, damping: 25 })

    // Nội dung cố định
    const backgroundImage = "/assets/olmcont.png"
    const topRightText = `Onelink Marketing provides a complete \ntransformation. We solve the problem \nof fragmented marketing and weak \nbrand identity,`
    const bottomLeftText = `We understand. \nWe are the \nsolution.`

    return (
        <section
            ref={ref}
            className="relative w-screen h-[110vh] md:h-[120vh] overflow-hidden flex items-center justify-center -top-96"
        >
            {/* Example Background image */}
            <div
                // Xóa 'bg-no-repeat' vì 'cover' đã ngầm định điều đó
                className="absolute inset-0 bg-center"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    // 3. THAY ĐỔI CHÍNH: Luôn dùng "cover"
                    backgroundSize: "cover",
                }}
            >
                {/* Lớp phủ để tăng độ tương phản chữ */}
                <div className="absolute inset-0 bg-black/35" />
            </div>

            {/* 🔹 Top Right Text (Không thay đổi) */}
            <motion.div
                style={{ y: smoothY }}
                className="absolute -top-[10%] right-[5%] max-w-[80vw] md:right-[8%] md:max-w-[45vw] text-left"
            >
                <h2 className="neulis-alt-extralight text-xl md:text-sm font-semibold text-white drop-shadow-2xl tracking-tight leading-snug whitespace-pre-line">
                    {topRightText}
                </h2>
            </motion.div>

            {/* 🔸 Bottom Left Text (Không thay đổi) */}
            <motion.div
                style={{ y: smoothY }}
                className="absolute bottom-[30%] left-[5%] md:left-[8%] text-left"
            >
                <p className="archivo-expanded text-5xl md:text-7xl font-semibold text-white drop-shadow-2xl tracking-tight leading-tight whitespace-pre-line">
                    {bottomLeftText}
                </p>
            </motion.div>
        </section>
    )
}