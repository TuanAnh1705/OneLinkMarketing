"use client"

// 1. Import thêm useSpring
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

  // 1. 🔽 THAY ĐỔI: Cập nhật logic transform để khớp với trang SEO/Paid Media
  const imageY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"])

  // 2. Dùng useSpring để làm mượt giá trị từ useTransform
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
      {/* THAY ĐỔI: Giảm padding mobile */}
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
          {/* Header with gradient text (Nội dung Social Media) */}
          {/* THAY ĐỔI: Giảm margin mobile */}
          <div className="mb-12 md:mb-16">
            {/* THAY ĐỔI: Cỡ chữ mobile */}
            <h1 className="text-center text-3xl md:text-8xl font-bold tracking-wider mb-8">
              <span className="archivo-expanded bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent">
                SOCIAL MEDIA
              </span>
              <br />
              <span className="archivo-expanded bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent">
                MANAGEMENT
              </span>
            </h1>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#0074E5] to-[#162660]" />
          </div>

          {/* 🔽 THAY ĐỔI: Chuyển sang bố cục DỌC giống trang SEO */}
          {/* THAY ĐỔI: Giảm margin/spacing mobile */}
          <div className="mb-16 md:mb-24 space-y-10 md:space-y-20">
            {/* Căn giữa khối text */}
            <div className="flex items-start justify-center">
              <div className="max-w-3xl text-center">
                {/* THAY ĐỔI: Cỡ chữ mobile */}
                <p className="neulis-alt-regular text-sm md:text-xl text-[#444444] leading-relaxed">
                  Transform your social channels into powerful community-building and lead-nurturing platforms through strategic content and authentic engagement.
                </p>
              </div>
            </div>

            {/* Cập nhật khối container ảnh và motion.div */}
            <div className="flex items-center">
              {/* Container cha bọc ngoài (giữ tỷ lệ và overflow) */}
              {/* THAY ĐỔI: Bỏ min-h, đổi aspect-ratio mobile, prefix max-w */}
              <div className="relative w-full aspect-video md:aspect-[16/7] overflow-hidden md:max-w-[1600px] mx-auto">
                {/* Tăng chiều cao lên 133.33% (tức 4/3) để bù vào phần di chuyển */}
                <motion.div
                  style={{ y: smoothImageY }}
                  className="w-full h-[calc(100%_*_4/3)] relative"
                >
                  <Image
                    src="/assets/50.png" // Giữ ảnh của trang Social Media
                    alt="Never Stops - Athletes running on track"
                    fill={true}
                    className="object-cover"
                    priority={true}
                  />
                </motion.div>
              </div>
            </div>
          </div>
          {/* --- KẾT THÚC THAY ĐỔI --- */}


          {/* Services section (Nội dung Social Media) */}
          {/* THAY ĐỔI: Giảm gap mobile */}
          <div className="grid md:grid-cols-4 gap-8 md:gap-14">
            {[
              {
                title: (
                  <>
                    Social Media Strategy <br /> & Planning
                  </>
                ),
                desc: "Defining your audience, content pillars, and platform-specific goals to build a cohesive brand voice.",
              },
              {
                title: (
                  <>
                    Content Creation & <br /> Scheduling
                  </>
                ),
                desc: "Producing and scheduling engaging visuals, videos, and copy in a consistent content calendar.",
              },
              {
                title: (
                  <>
                    Community Management & Engagement
                  </>
                ),
                desc: "Actively engaging with your audience, responding to feedback, and fostering a loyal brand community.",
              },
              {
                title: (
                  <>
                    Performance Analytics <br /> & Reporting
                  </>
                ),
                desc: "Tracking key metrics, analyzing performance, and providing actionable reports to demonstrate ROI.",
              },
            ].map((s, i) => (
              <div key={i} className="space-y-4 flex flex-col">
                <div className="border-b border-[#0074E5] pb-3">
                  {/* THAY ĐỔI: Cỡ chữ h3 responsive */}
                  <h3 className="archivo-expanded text-lg md:text-lg font-bold text-[#000A1D]">
                    {s.title}
                  </h3>
                </div>
                <p className="neulis-alt-regular text-[#444444] leading-relaxed text-sm">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Nút "EXPLORE MORE" CHUNG */}
          {/* THAY ĐỔI: Giảm margin top mobile */}
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