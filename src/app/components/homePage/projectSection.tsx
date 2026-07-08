"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import type { ProjectsSection } from "@vns-core/core/types/homepage"
import { getMediaUrl } from "@vns-core/core/api/media-url"

const FALLBACK_PROJECT_IMAGES = ["/assets/tag1.png", "/assets/steel.png", "/assets/cns1.png", "/assets/vns1.png"]
const FALLBACK_PROJECTS = [
  { src: "/assets/tag1.png", title: "Tag. Fitness", year: "2025", href: "/case-studies/tag" },
  { src: "/assets/steel.png", title: "Steel Works Seattle", year: "2025", href: "/case-studies/steel" },
  { src: "/assets/cns1.png", title: "China Sourcing Co", year: "2025", href: "/case-studies/china-sourcing-co" },
  { src: "/assets/vns1.png", title: "Vietnam Sourcing Co", year: "2023", href: "/case-studies/vietnam-sourcing-co" },
]

// Case-study pages live under /case-studies/<slug>; Strapi stores bare slugs (/tag),
// so prefix them to keep links resolving (middleware doesn't flat-route case studies).
function normalizeCaseHref(href: string): string {
  if (!href) return "/case-studies"
  if (href.startsWith("/case-studies")) return href
  return `/case-studies${href.startsWith("/") ? href : `/${href}`}`
}

export default function SectionProjects({ data }: { data?: ProjectsSection | null }) {
  const section4Ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: section4Ref, offset: ["start end", "center start"] })
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const buttonY = useTransform(scrollYProgress, [0, 0.4], [100, 0])

  const projects = data?.items?.length
    ? data.items.map((it, i) => ({
        src: it.image?.url ? getMediaUrl(it.image.url) : (FALLBACK_PROJECT_IMAGES[i] ?? FALLBACK_PROJECT_IMAGES[FALLBACK_PROJECT_IMAGES.length - 1]),
        title: it.title,
        year: it.year,
        href: normalizeCaseHref(it.href),
      }))
    : FALLBACK_PROJECTS
  const buttonLabel = data?.buttonLabel || "View All Work"
  const buttonHref =
    (data as { buttonHref?: string; buttonhref?: string })?.buttonHref ||
    (data as { buttonHref?: string; buttonhref?: string })?.buttonhref ||
    "/case-studies"

  return (
    <motion.section
      ref={section4Ref}
      className="relative justify-center bg-white py-10 px-4 md:px-16 lg:px-24 md:-mt-15"
    >
      {/* grid ảnh */}
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {[projects].map((row, rowIndex) => (
          <div key={rowIndex} className="grid md:grid-cols-2 gap-16">
            {row.map((item, i) => (
              <Link key={i} href={item.href}>
                <motion.div
                  className="text-left cursor-pointer"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 1, 0.3, 1],
                    delay: i * 0.08,
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="relative w-full aspect-4/3 rounded-sm overflow-hidden border border-[#e5e5e5] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={70}
                        className="object-cover object-center"
                      />
                    </motion.div>
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
          <Link href={buttonHref}>
            <button className="generalsans-regular relative overflow-hidden px-5 py-3.5 rounded-full font-medium text-sm text-[#444444] border-[0.5px] border-[#444444] hover:border-transparent bg-white transition-colors duration-300 group">
              <span className="relative z-20 flex items-center justify-center w-full h-full transition-colors duration-500 group-hover:text-white">
                {buttonLabel}
              </span>
              <span className="absolute inset-0 bg-linear-to-r from-[#0074E5] to-[#162660] translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-10"></span>
            </button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}