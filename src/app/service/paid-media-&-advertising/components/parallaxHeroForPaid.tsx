"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

export function ParallaxHeroForPaid() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Di chuyển ảnh theo chiều cuộn (mượt hai chiều)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-40%", "40%"]) 
  // ↑ Cho phép ảnh trượt lên & xuống đối xứng

  const smoothImageY = useSpring(imageY, {
    stiffness: 90,
    damping: 26,
    mass: 0.8,
  })

  return (
    <div ref={containerRef} className="relative min-h-[110vh] w-full overflow-hidden bg-white">
      {/* Ảnh nền parallax */}
      <motion.div
        style={{
          y: smoothImageY,
        }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/assets/65.jpg"
          alt="Aurora parallax background"
          fill
          className="object-cover scale-[1] min-h-[200vh]" // object-cover cho cảm giác di chuyển rõ hơn
          priority
          quality={100}
        />
      </motion.div>

    </div>
  )
}
