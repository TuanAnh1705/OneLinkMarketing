"use client"

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

  // (Logic parallax của bạn giữ nguyên)
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
      {/* THAY ĐỔI: Giảm padding trên mobile từ p-8 xuống p-6 */}
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
          {/* THAY ĐỔI: Giảm margin bottom trên mobile từ mb-16 xuống mb-12 */}
          <div className="mb-12 md:mb-16">
            <h1 className="text-center text-4xl md:text-8xl font-bold tracking-wider mb-8">
              <span className="archivo-expanded bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent">
                STRATEGY
              </span>
              <br />
              <span className="archivo-expanded bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent">
                CONSULTING
              </span>
            </h1>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#0074E5] to-[#162660]" />
          </div>

          {/* --- BỐ CỤC ĐÃ THAY ĐỔI TẠI ĐÂY --- */}
          {/* THAY ĐỔI: Giảm khoảng cách trên mobile */}
          <div className="mb-16 md:mb-24 space-y-10 md:space-y-20">
            {/* Căn giữa khối text */}
            <div className="flex items-start justify-center">
              <div className="max-w-3xl text-center">
                {/* THAY ĐỔI: Giảm cỡ chữ p trên mobile từ text-xl xuống text-lg */}
                <p className="neulis-alt-regular text-lg md:text-xl text-[#444444] leading-relaxed">
                  Craft data-driven, actionable roadmaps that navigate market
                  complexities and position your brand for sustainable,
                  long-term growth.
                </p>
              </div>
            </div>

            {/* Container ảnh */}
            <div className="flex items-center">
              {/* Container cha bọc ngoài (giữ tỷ lệ và overflow) */}
              {/* THAY ĐỔI LỚN NHẤT:
                - Bỏ `min-h-[500px]` (gây xung đột trên mobile).
                - Đổi `aspect-[16/7]` (rất rộng) thành `aspect-video` (16/9) trên mobile.
                - Giữ `aspect-[16/7]` cho desktop (`md:`).
                - Chuyển `max-w-[1600px]` thành `md:max-w-[1600px]` để mobile `w-full`.
              */}
              <div className="relative w-full aspect-video md:aspect-[16/7] overflow-hidden md:max-w-[1600px] mx-auto">
                {/* (Logic parallax của bạn giữ nguyên) */}
                <motion.div
                  style={{ y: smoothImageY }}
                  className="w-full h-[calc(100%_*_4/3)] relative"
                >
                  <Image
                    src="/assets/hero.png"
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
          {/* THAY ĐỔI: Giảm gap trên mobile từ gap-12 xuống gap-8 */}
          <div className="grid md:grid-cols-4 gap-8 md:gap-16">
            {[
              {
                title: (
                  <>
                    Brand Audit
                    <br />& Insight Analysis
                  </>
                ),
                desc: "We analyze your brand's current positioning and effectiveness to uncover key opportunities.",
              },
              {
                title: (
                  <>
                    Market & Competitor
                    <br />
                    Research
                  </>
                ),
                desc: "A deep dive into your market landscape and competitors to identify your unique space.",
              },
              {
                title: (
                  <>
                    Key Messaging
                    <br />
                    Framework
                  </>
                ),
                desc: "Crafting a clear, concise, and persuasive message that resonates with your target audience.",
              },
              {
                title: (
                  <>
                    Go-to-Market
                    <br />
                    Roadmap
                  </>
                ),
                desc: "Developing a step-by-step, integrated marketing plan to launch your brand and drive sustainable growth.",
              },
            ].map((s, i) => (
              <div key={i} className="space-y-4">
                <div className="border-b border-[#0074E5] pb-3">
                  {/* THAY ĐỔI: Giảm cỡ chữ h3 trên mobile từ text-xl xuống text-lg */}
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

          {/* --- NÚT MỚI ĐƯỢC THÊM VÀO Ở ĐÂY --- */}
          {/* THAY ĐỔI: Giảm margin top trên mobile từ mt-16 xuống mt-12 */}
          <div className="flex justify-center mt-12 md:mt-16">
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
                <path
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