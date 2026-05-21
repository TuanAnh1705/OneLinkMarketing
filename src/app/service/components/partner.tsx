"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useInView } from "framer-motion"
import Image from "next/image"

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
  const whyWeAreRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: lineScrollProgress } = useScroll({
    target: whyWeAreRef,
    offset: ["start center", "end center"],
  })

  return (
    <>
      {/* Đã thêm relative và overflow-hidden vào section */}
      <section className="relative overflow-hidden bg-[#0a0e1a] text-white pt-16 md:pt-20 pb-20 md:pb-28">
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

        </div>

        {/* Arc trắng hoà với nền section phía dưới (vòng cung hướng xuống) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 md:h-48 pointer-events-none z-10"
          style={{
            background: "radial-gradient(ellipse 200% 100% at 50% 0%, transparent 0%, transparent 30%, rgba(255,255,255,0.8) 70%, #ffffff 100%)"
          }}
        />
      </section>

      {/* ================== METRICS CARD ================== */}
      {/* Nổi tại giao thoa giữa dark section và white section phía dưới */}
      <div className="relative z-10 -mt-16 md:-mt-45 px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

          {/* Ảnh */}
          <div className="relative h-[280px] md:h-[550px] overflow-hidden bg-white shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
            <Image
              src="/assets/6.png"
              alt="Team"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Metric columns */}
          <MetricColumn value="327%+" label="Improvement in website traffic" />
          <MetricColumn value="54%+"  label="Increase in lead conversion rates" />
          <MetricColumn value="22%+"  label="Reduction in bounce rate" />
        </div>
      </div>
    </>
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

function FeatureItem({ title, description, index }: FeatureItemProps) {
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
          <div className="w-4 h-4 bg-[#0074E5]" />
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

function MetricColumn({ value, label }: { value: string; label: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="flex flex-col justify-between p-6 md:p-8 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.10)] h-[200px] md:h-[550px] cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="generalsans-regular text-7xl md:text-7xl lg:text-7xl font-medium text-[#000A1D]">
        {value}
      </span>

      <div className="flex items-start">
        <div
          className="shrink-0 bg-[#0074E5] transition-all duration-300 ease-out"
          style={{
            width:       hovered ? "14px" : "0px",
            minWidth:    hovered ? "14px" : "0px",
            height:      "14px",
            marginTop:   "3px",
            marginRight: hovered ? "8px" : "0px",
            opacity:     hovered ? 1 : 0,
          }}
        />
        <span
          className="generalsans-regular text-sm md:text-base leading-snug transition-colors duration-150"
          style={{ color: hovered ? "#0074E5" : "#000A1D" }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}