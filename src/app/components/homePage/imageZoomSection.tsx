"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function SectionImageZoom() {
  const section2Ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: section2Ref,
    offset: ["start end", "end start"],
  })

  const outerY = useTransform(scrollYProgress, [0, 0.5], [0, -300])
  const smoothOuterY = useSpring(outerY, { stiffness: 100, damping: 20 })

  return (
    <section ref={section2Ref} className="min-h-screen flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 relative">
      <div className="max-w-7xl mx-auto w-full relative">
        <div className="flex justify-end">
          <div className="relative w-[180%] max-w-[1200px] -translate-y-72 translate-x-44 overflow-hidden bg-white/5 h-[550px]">
            <motion.div style={{ y: smoothOuterY }} className="relative w-full h-full">
              <Image
                src="/assets/section1.jpg"
                alt="Scroll animation visual"
                fill
                className="object-cover object-center w-[300%] h-[300%] translate-y-[180px]"
                priority
              />
            </motion.div>
          </div>
        </div>

        <motion.div className="relative -mt-40 w-full px-8 md:px-16 lg:px-24" style={{ perspective: 1000 }}>
          <motion.h2
            initial={{ rotateX: -90, opacity: 0, y: -40 }}
            whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.5 }}
            className="max-w-5xl mx-auto text-[clamp(2.8rem,6vw,4.2rem)] font-light text-[#000A1D] leading-tight tracking-tight text-left -translate-x-32"
            style={{ fontFamily: "'Archivo Expanded', sans-serif", transformOrigin: "top center" }}
          >
            <span className="text-gray-400">Shaping</span> digital <br />
            experiences <span className="text-gray-400">that</span> connect <br />
            <span className="text-gray-400">and</span> perform, for growing <br />
            markets since
          </motion.h2>
        </motion.div>
      </div>
    </section>
  )
}
