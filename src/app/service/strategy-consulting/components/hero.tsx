"use client"

// 1. Import thêm useSpring
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])

  // 2. Dùng useSpring để làm mượt giá trị từ useTransform
  // Bạn có thể điều chỉnh stiffness và damping để thay đổi "độ mượt" và "độ nảy"
  const smoothImageY = useSpring(imageY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      {/* --- Curtain Animation --- */}
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
      <div className="min-h-screen bg-white p-8 md:p-16 relative z-10">
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
          <div className="mb-16">
            <h1 className="text-center text-6xl md:text-8xl font-bold tracking-wider mb-8">
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

          <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 md:gap-20 mb-24">
            {/* Left text */}
            <div className="flex items-start justify-start">
              <div className="max-w-md">
                <p className="neulis-alt-regular text-3xl md:text-3xl text-[#444444] leading-relaxed">
                  Building the <br /> strategic foundation <br /> for your brand&apos;s <br /> long-term
                  success.
                </p>
              </div>
            </div>

            {/* Right image */}
            <div className="flex items-center md:sticky md:top-16 md:h-[60vh]">
              <div className="relative w-full aspect-[16/9] overflow-hidden max-w-[1600px] min-h-[500px]">
                {/* 3. Sử dụng giá trị đã được làm mượt và bỏ transition */}
                <motion.div style={{ y: smoothImageY }} className="w-full h-full">
                  <Image
                    src="/assets/hero.jpg"
                    alt="Never Stops - Athletes running on track"
                    fill
                    className="object-contain scale-[1.8] will-change-transform max-w-[800px]"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Services section */}
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
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
            ].map((s, i) => (
              <div key={i} className="space-y-4">
                <div className="border-b border-[#0074E5] pb-3">
                  <h3 className="archivo-expanded text-xl font-bold text-[#000A1D]">
                    {s.title}
                  </h3>
                </div>
                <p className="neulis-alt-regular text-[#444444] leading-relaxed text-sm">
                  {s.desc}
                </p>
                <button className="flex items-center gap-2 text-[#444444] hover:text-[#0074E5] transition-colors text-sm group">
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
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}