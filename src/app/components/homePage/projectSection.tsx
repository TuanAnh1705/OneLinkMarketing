"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function SectionProjects() {
  const section4Ref = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  // Đã điều chỉnh stiffness và damping để di chuyển nhanh hơn
  const smoothX = useSpring(mouseX, { stiffness: 350, damping: 20 }) // Tăng stiffness, giảm damping
  const smoothY = useSpring(mouseY, { stiffness: 350, damping: 20 }) // Tăng stiffness, giảm damping

  const { scrollYProgress } = useScroll({ target: section4Ref, offset: ["start end", "center start"] })
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const buttonY = useTransform(scrollYProgress, [0, 0.4], [100, 0])

  return (
    <motion.section
  ref={section4Ref}
  className="
    relative justify-center
    -mt-362.5
    min-[200px]:-mt-110
    min-[200px]:-mt-130
    md:-mt-96
    lg:-mt-60
    z-10 bg-white pt-0 pb-10 px-8 md:px-16 lg:px-24
  "
  onMouseMove={(e) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }}
>
      {/* Custom cursor */}
      <motion.div
        className="generalsans-regular fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center rounded-4xl bg-[#FFFFFF] border-none text-[#444444] text-sm shadow-lg px-5 py-3"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          scale: hoveredIndex !== null ? 1.1 : 0,
        }}
        // Bạn cũng có thể điều chỉnh transition cho scale ở đây nếu muốn nó xuất hiện/biến mất nhanh hơn
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        View Project
      </motion.div>

      {/* grid ảnh */}
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {[
          [
            { src: "/assets/tag1.png", title: "Tag. Fitness",year:"2025", href: "/case-studies/tag" },
            { src: "/assets/steel.png", title: "Steel Works Seattle",year:"2025", href: "/case-studies/steel" },
            { src: "/assets/cns1.png", title: "China Sourcing Co",year:"2025", href: "/case-studies/china-sourcing-co" },
            { src: "/assets/vns1.png", title: "Vietnam Sourcing Co",year:"2023", href: "/case-studies/vietnam-sourcing-co" },
          ],
        ].map((row, rowIndex) => (
          <div key={rowIndex} className="grid md:grid-cols-2 gap-16">
            {row.map((item, i) => (
              // 💡 (1) BỌC BẰNG LINK VÀ DÙNG item.href
              <Link key={i} href={item.href}>
                <motion.div
                  // 💡 (2) KEY ĐÃ CHUYỂN LÊN <Link>
                  onMouseEnter={() => setHoveredIndex(rowIndex * 2 + i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`text-left ${hoveredIndex === rowIndex * 2 + i ? "cursor-none" : ""}`} // 👈 Xóa 'cursor-pointer' vì Link đã xử lý
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 2.4,
                    ease: [0.25, 1, 0.3, 1],
                    delay: i * 0.2,
                  }}
                  viewport={{ once: false, amount: 0.4 }}
                >
                  <div className="relative w-full aspect-4/3 rounded-[2.5rem] overflow-hidden border border-[#e5e5e5] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                    <Image src={item.src} alt={item.title} fill className="object-cover object-center" />
                  </div>
                  <h3 className="mt-7 archivo-expanded font-medium text-xl text-[#000A1D]">{item.title}</h3>
                  <p className="text-sm generalsans-regular text-[#444444]">{item.year}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* nút cuối */}
      <div className="flex justify-center mt-20 relative">
        <motion.div whileHover={{ scale: 1.05 }} style={{ opacity: buttonOpacity, y: buttonY }}>
          <Link href="/case-studies">
            <button className="generalsans-regular relative overflow-hidden px-5 py-3.5 rounded-full font-medium text-sm text-[#444444] border-[0.5px] border-[#444444] hover:border-transparent bg-white transition-colors duration-300 group">
              <span className="relative z-20 flex items-center justify-center w-full h-full transition-colors duration-500 group-hover:text-white">
                View All Work
              </span>
              <span className="absolute inset-0 bg-linear-to-r from-[#0074E5] to-[#162660] translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-10"></span>
            </button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}