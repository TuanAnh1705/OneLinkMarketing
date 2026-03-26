"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

// --- TYPES ---
interface Feature {
  number: string
  title: string
  description: string
}

interface FeatureItemProps extends Feature {
  index: number
}

export function PartnerSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const whyWeAreRef = useRef<HTMLDivElement>(null)

  // 1. Logic tính toán scroll cho đường line
  const { scrollYProgress: lineScrollProgress } = useScroll({
    target: whyWeAreRef,
    offset: ["start center", "end center"],
  })

  // 2. Scroll cho parallax image (giữ nguyên)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-30%", "30%"])

  return (
    <section className="bg-[#0a0e1a] text-white py-16 md:py-20">
      <div className="mx-auto">

        {/* ================== WHY WE ARE SECTION ================== */}
        <div className="max-w-full mx-auto px-6 md:px-12 lg:px-20 mb-16 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

            {/* Left Column - Title */}
            <div className="lg:col-span-4">
              <h2 className="archivo-expanded text-3xl md:text-4xl lg:text-5xl text-white font-medium leading-tight">
                Why We Are Your<br/> Ideal Partner?
              </h2>
            </div>

            {/* Right Column - Line & Features */}
            <div className="lg:col-span-8 relative" ref={whyWeAreRef}>

              {/* Đường line dọc */}
              <div className="absolute left-0 top-0 bottom-0 w-px md:w-0.5">
                <div className="absolute inset-0 bg-white" />
                <motion.div
                  className="absolute inset-0 bg-[#0074E5] origin-top"
                  style={{ scaleY: lineScrollProgress }}
                />
              </div>

              {/* Danh sách tính năng */}
              <div className="pl-8 lg:pl-16 grid grid-cols-1 gap-12 lg:gap-12">
                {features.map((feature, index) => (
                  <FeatureItem
                    key={index}
                    index={index}
                    {...feature}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================== METRICS SECTION ================== */}
        <div className="flex flex-col items-center px-4">
          {/* Two-column container for image and text */}
          {/* Chuyển sang flex-col trên mobile, lg:flex-row trên desktop */}
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12 lg:gap-20 max-w-8xl">
            {/* Hình bên trái với parallax effect */}
            <div
              ref={containerRef}
              className="relative w-full max-w-2xl lg:w-180 h-100 lg:h-200 overflow-hidden shrink-0"
            >
              <motion.div
                style={{ y: isMobile ? undefined : y }}
                className="relative w-full h-full lg:h-[140%] lg:-top-[20%] will-change-transform"
              >
                <Image
                  src="/assets/6.png"
                  alt="Abstract gradient"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>

            {/* Cột phải: metrics */}
            {/* Bỏ h cố định, thêm mt-12 trên mobile */}
            <div className="h-auto lg:h-200 flex-1 flex flex-col w-full max-w-md lg:max-w-none lg:w-auto -mt-20 lg:mt-0">
              <div>
                {/* Giảm font-size và căn giữa trên mobile */}
                <h3 className="archivo-expanded text-3xl md:text-5xl lg:text-6xl font-medium mb-8 md:mb-12 leading-tight text-white md:text-left lg:text-left">
                  Metrics That Matter
                </h3>
              </div>

              {/* Bỏ justify-between, dùng gap-10 trên mobile */}
              <div className="archivo-expanded grow flex flex-col justify-start lg:justify-between pt-0 lg:pt-8 gap-10 lg:gap-0">
                <MetricItem value="327%+" label="Improvement in website traffic" />
                <MetricItem value="54%+" label="Increase in lead conversion rates" />
                <MetricItem value="22%+" label="Reduction in bounce rate" />
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-16 md:mt-20">
            <motion.div whileHover={{ scale: 1.05 }}>
              {/* Giảm padding và font-size trên mobile */}
              <Link href="/contact">
                <button className="relative overflow-hidden px-10 py-3 md:px-5 md:py-3 rounded-full generalsans-regular text-base md:text-sm text-white border border-white/30 hover:border-transparent bg-transparent transition-colors duration-300 group">
                  <span className="relative z-20 flex items-center justify-center w-full h-full">
                    Contact Us
                  </span>
                  <span className="absolute inset-0 bg-linear-to-r from-[#0074E5] to-[#162660] translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-10"></span>
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ================== DATA ==================
const features: Feature[] = [
  { number: "01", title: "Unified Marketing Strategy", description: "All channels and activities are aligned under one clear strategy, ensuring your marketing works together to drive stronger results and measurable growth." },
  { number: "02", title: "International Standard Delivery", description: "Our globally experienced team delivers marketing built for US, UK, and Australian markets, combining local understanding with international best practice." },
  { number: "03", title: "High Value Marketing Execution", description: "By operating from our Vietnam office, we deliver exceptional marketing output and expertise at a significantly more efficient cost." },
  { number: "04", title: "Evidence Led Decision Making", description: "Every recommendation is grounded in data, market insight, and performance analysis to ensure decisions are strategic, not speculative." },
  { number: "05", title: "Full Lifecycle Partnership", description: "From brand foundations to performance scaling, we work alongside you at every stage of growth as a long term marketing partner." },
]

// ================== SUB-COMPONENTS ==================

function FeatureItem({ number, title, description, index }: FeatureItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)

  const isInView = useInView(itemRef, {
    once: false,
    amount: 0.2,
  })

  const isLeftColumn = index % 2 === 0

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-x-4 ${
        isLeftColumn ? "" : "lg:pl-4 lg:-mt-30 lg:-mb-30"
      }`}
    >
      <div className={isLeftColumn ? "lg:col-start-1" : "lg:col-start-2"}>
        <div className="space-y-2">
          <p className="archivo-expanded text-xl md:text-3xl font-medium text-white">
            ({number})
          </p>
          <h3 className="archivo-expanded text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-tight">
            {title}
          </h3>
          <p className="generalsans-regular text-[#ADADAD] text-base md:text-lg leading-relaxed max-w-sm">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function MetricItem({
  value,
  label,
  showLine = true,
}: {
  value: string
  label: string
  showLine?: boolean
}) {
  return (
    <div>
      {showLine && (
        // Thêm w-full và max-w để giới hạn chiều rộng trên mobile
        <div className="w-full max-w-92.5 h-px bg-linear-to-r from-[#0094FF] to-[#162660] mb-6" />
      )}
      {/* Chuyển sang flex-col trên mobile, và flex-row trên desktop */}
      <div className="flex flex-col lg:flex-row items-start lg:items-start gap-4 lg:gap-28">
        {/* Column for number (fixed width for alignment) */}
        <div className="w-full lg:w-[320px]">
          {/* Giảm font-size trên mobile */}
          <div className="archivo-expanded text-6xl md:text-7xl lg:text-8xl font-extrabold">{value}</div>
        </div>

        {/* Column for label (font size increased) */}
        {/* Giảm font-size và bỏ pt-3 trên mobile */}
        <div className="generalsans-regular pt-0 lg:pt-3 text-lg md:text-xl text-white/80">
          {label}
        </div>
      </div>
    </div>
  )
}