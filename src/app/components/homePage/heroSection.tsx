"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function SectionHero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 pt-20 relative z-10 overflow-hidden">
      {/* Logo trắng góc trái — chỉ hiện trên mobile */}
      <div className="lg:hidden absolute top-6 left-5 z-20">
        <Image
          src="/assets/logoWhite.png"
          alt="Onelink Marketing"
          width={140}
          height={40}
          className="h-8 w-auto"
          priority
        />
      </div>

      <div
        className="relative z-10 text-center max-w-7xl mx-auto"
        style={{ fontFamily: "'Archivo Expanded', sans-serif" }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-white select-none">
          <span style={{ display: "block" }}>
            <em><strong>high-end</strong></em> quality,
          </span>
          <span style={{ display: "block" }}>
            without <em><strong>high-end</strong></em> overheads
          </span>
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        className="relative z-10 mt-10"
      >
        {/* Mobile: 3-col grid — hình vuông thẳng hàng dọc */}
        <div className="sm:hidden grid grid-cols-[1fr_auto_1fr] gap-x-4 gap-y-3 items-center justify-items-center">
          <span className="generalsans-regular text-white text-lg text-right justify-self-end"><strong>More</strong> Aligned</span>
          <span className="w-2 h-2 bg-[#0074E5] shrink-0" />
          <span className="generalsans-regular text-white text-lg justify-self-start"><strong>More</strong> Efficient</span>
          <span className="generalsans-regular text-white text-lg text-right justify-self-end"><strong>Better</strong> Value</span>
          <span className="w-2 h-2 bg-[#0074E5] shrink-0" />
          <span className="generalsans-regular text-white text-lg justify-self-start"><strong>Smarter</strong> Structure</span>
        </div>

        {/* Desktop: flex row */}
        <div className="hidden sm:flex items-center gap-6 justify-center">
          <span className="generalsans-regular text-white text-lg"><strong>More</strong> Aligned</span>
          <span className="w-2 h-2 bg-[#0074E5] shrink-0" />
          <span className="generalsans-regular text-white text-lg"><strong>More</strong> Efficient</span>
          <span className="w-2 h-2 bg-[#0074E5] shrink-0" />
          <span className="generalsans-regular text-white text-lg"><strong>Better</strong> Value</span>
          <span className="w-2 h-2 bg-[#0074E5] shrink-0" />
          <span className="generalsans-regular text-white text-lg"><strong>Smarter</strong> Structure</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="generalsans-regular text-white/50 text-xs tracking-widest uppercase">
          scroll to explore
        </span>
        <div className="relative w-0.5 h-[50px] bg-white/20 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-white"
            style={{ height: "100%" }}
            animate={{ y: ["-100%", "250%"] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </section>
  )
}
