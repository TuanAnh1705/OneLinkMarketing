"use client"

import { motion } from "framer-motion"

export default function SectionHero() {
  return (
    <section className="min-h-[85vh] flex items-start px-8 md:px-16 lg:px-24 pt-32">
      <div className="relative max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ fontFamily: "'Archivo Expanded', sans-serif" }}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight text-[clamp(2.8rem,6vw,4.2rem)] font-bold text-[#000A1D]">
            CREATE.<br />CAPTIVATE.<br />ELEVATE.
          </h1>
        </motion.div>

        <div className="translate-x-[230px] leading-relaxed">
          <p>Escape the Loop</p>
          <p>of Fragmented &</p>
          <p>Costly Marketing</p>
        </div>

        <div className="flex justify-end">
          <div className="absolute -right-28 top-80 text-left">
            <p className="text-lg leading-relaxed">
              We are <span className="font-bold">Onelink Marketing</span> – uniting strategy,<br />
              creativity, and technical execution to<br />
              transform bold ideas into lasting impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
