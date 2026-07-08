"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

/** Full-width parallax banner (featureImage) — shared by case-study & post details. */
export default function ParallaxBanner({ src, alt }: { src: string; alt: string }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])

  return (
    <div
      ref={heroRef}
      className="relative w-full h-[500px] md:h-[600px] lg:h-[900px] overflow-hidden"
    >
      <motion.div
        style={mounted ? { y, opacity } : undefined}
        className="absolute inset-0"
      >
        <Image src={src} alt={alt} fill className="object-cover" priority sizes="100vw" />
      </motion.div>
    </div>
  )
}
