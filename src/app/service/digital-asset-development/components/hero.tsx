"use client"

// 1. THAY ĐỔI: Import lại 'Image' và 'Link'
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // (Logic parallax giữ nguyên)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"])
  const smoothImageY = useSpring(imageY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      {/* --- Curtain Animation (Giữ nguyên) --- */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        className="fixed top-0 left-0 w-1/2 h-full bg-white z-[9999]"
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        className="fixed top-0 right-0 w-1/2 h-full bg-white z-[9999]"
      />

      {/* --- Page Content --- */}
      {/* 2. THAY ĐỔI: Giảm padding mobile */}
      <div className="min-h-screen bg-white p-6 md:p-16 relative z-10">
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id="chevronGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0074E5" />
              <stop offset="100%" stopColor="#162660" />
            </linearGradient>
          </defs>
        </svg>

        <div className="mx-auto max-w-7xl">
          {/* Header with gradient text */}
          {/* 3. THAY ĐỔI: Giảm margin mobile */}
          <div className="mb-12 md:mb-16">
            <h1 className="text-center text-3xl md:text-8xl font-bold tracking-wider mb-8">
              <span className="archivo-expanded bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent">
                DIGITAL ASSET
              </span>
              <br />
              <span className="archivo-expanded bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent">
                DEVELOPMENT
              </span>
            </h1>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#0074E5] to-[#162660]" />
          </div>

          {/* 4. THAY ĐỔI: Giảm khoảng cách mobile */}
          <div className="mb-16 md:mb-24 space-y-10 md:space-y-20">
            {/* Căn giữa khối text */}
            <div className="flex items-start justify-center">
              <div className="max-w-3xl text-center">
                <p className="neulis-alt-regular text-sm md:text-xl text-[#444444] leading-relaxed">
                  Build the digital assets that form the core of your lead - generation engine from compelling brand identities to high-performance websites.
                </p>
              </div>
            </div>

            {/* Cập nhật khối container ảnh và motion.div */}
            <div className="flex items-center">
              {/* 5. THAY ĐỔI: Áp dụng aspect-video, bỏ min-h, v.v. */}
              <div className="relative w-full aspect-video md:aspect-[16/7] overflow-hidden md:max-w-[1600px] mx-auto">
                {/* (Logic parallax giữ nguyên) */}
                <motion.div
                  style={{ y: smoothImageY }}
                  className="w-full h-[calc(100%_*_4/3)] relative"
                >
                  {/* 6. 🚀 THAY ĐỔI: Đổi 'img' thành 'Image' */}
                  <Image
                    src="/assets/hero1.png"
                    alt="Never Stops - Athletes running on track"
                    fill
                    className="object-cover will-change-transform"
                    />
                </motion.div>
              </div>
            </div>
          </div>
          {/* --- KẾT THÚC THAY ĐỔI --- */}


          {/* Services section */}
          {/* 7. THAY ĐỔI: Giảm gap mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
            {[
              { title: <>Brand Identity</>, desc: "Crafting a visual identity that is both professional and memorable." },
              { title: <>Website Design</>, desc: "Designing high-performance websites that are optimized for SEO and UX." },
              { title: <>Landing Pages</>, desc: "Creating targeted landing pages to convert visitors into leads efficiently." },
              { title: <>Digital Collateral</>, desc: "Producing assets like Ebooks and whitepapers to nurture leads." },
            ].map((s, i) => (
              <div key={i} className="space-y-4">
                <div className="border-b border-[#0074E5] pb-3">
                  {/* 8. THAY ĐỔI: Giảm cỡ chữ h3 mobile */}
                  <h3 className="archivo-expanded text-lg md:text-xl font-bold text-[#000A1D]">
                    {s.title}
                  </h3>
                </div>
                <p className="neulis-alt-regular text-[#444444] leading-relaxed text-sm">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 9. THAY ĐỔI: Giảm margin top mobile */}
          <div className="flex justify-center mt-12 md:mt-16">
            {/* 10. 🚀 THAY ĐỔI: Đổi 'a' thành 'Link' */}
            <Link
              href="/insights"
              className="flex items-center gap-2 text-[#444444] hover:text-[#0074E5] transition-colors text-sm group"
              >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="url(#chevronGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="neulis-alt-regular">Explore more</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                img               <path
                  d="M9 18L15 12L9 6"
                  stroke="url(#chevronGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}