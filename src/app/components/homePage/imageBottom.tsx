"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

export default function ImageBottomContainer() {
    const ref = useRef<HTMLDivElement>(null)

    // Theo dõi tiến trình scroll của section
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    // Di chuyển chữ mềm mượt — không dừng cứng
    const moveY = useTransform(scrollYProgress, [0, 1], [0, 300])
    const smoothY = useSpring(moveY, { stiffness: 80, damping: 25 })

    // Nội dung cố định
    const backgroundImage = "/assets/olmcont.png"
    const topRightText = `Onelink Marketing provides a complete \ntransformation. We solve the problem \nof fragmented marketing and weak \nbrand identity,`
    const bottomLeftText = `We understand. \nWe are the \nsolution.`

    return (
        <section
            ref={ref}
            className="relative w-screen h-[120vh] overflow-hidden flex items-center justify-center" // 👈 tăng chiều cao để bg hiển thị nhiều hơn
        >
            {/* 🌆 Background image */}
            <div
                className="absolute inset-0 bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "110%", // 👈 ảnh to hơn 1 chút, tràn đều
                }}
            >
                {/* Lớp phủ để tăng độ tương phản chữ */}
                <div className="absolute inset-0 bg-black/35" />
            </div>

            {/* 🔹 Top Right Text */}
            <motion.div
                style={{ y: smoothY }}
                className="absolute -top-[10%] right-[8%] max-w-[40vw] md:max-w-[45vw] text-right"
            >
                <h2 className="neulis-alt-extralight text-4xl md:text-2xl font-semibold text-white drop-shadow-2xl tracking-tight leading-snug whitespace-pre-line">
                    {topRightText}
                </h2>
            </motion.div>

            {/* 🔸 Bottom Left Text */}
            <motion.div
                style={{ y: smoothY }}
                className="absolute bottom-[15%] left-[8%] text-left"
            >
                <p className="archivo-expanded text-6xl md:text-7xl font-semibold text-white drop-shadow-2xl tracking-tight leading-tight whitespace-pre-line">
                    {bottomLeftText}
                </p>
            </motion.div>
        </section>
    )
}
