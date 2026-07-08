"use client"

import { Fragment } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import type { HeroSection } from "@vns-core/core/types/homepage"
import { getMediaUrl } from "@vns-core/core/api/media-url"

const FALLBACK_PILLS = [
  { id: 1, boldPart: "More", normalPart: "Aligned" },
  { id: 2, boldPart: "More", normalPart: "Efficient" },
  { id: 3, boldPart: "Better", normalPart: "Value" },
  { id: 4, boldPart: "Smarter", normalPart: "Structure" },
]

// Render a title line with *emphasis* → italic-bold (matches the hero's design accent).
// If the Strapi text has no `*` markers, fall back to emphasizing the brand phrase
// "high-end" so plain CMS text still gets the italic accent. Edit the Strapi title to
// `*word*` to emphasize any other word.
function renderTitle(line: string) {
  const source = line.includes("*") ? line : line.replace(/high-end/gi, "*$&*")
  return source.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.length > 1 && part.startsWith("*") && part.endsWith("*") ? (
      <em key={i}>
        <strong>{part.slice(1, -1)}</strong>
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )
}

export default function SectionHero({ data }: { data?: HeroSection | null }) {
  const logoWhite = data?.logoWhite?.url ? getMediaUrl(data.logoWhite.url) : "/assets/logoWhite.png"
  const titleLine1 = data?.titleLine1 || "high-end quality,"
  const titleLine2 = data?.titleLine2 || "without high-end overheads"
  const scrollText = data?.scrollText || "scroll to explore"
  const pills = data?.pills?.length ? data.pills : FALLBACK_PILLS

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 pt-0 sm:pt-20 relative z-10 overflow-hidden">
      {/* Logo trắng góc trái — chỉ hiện trên mobile */}
      <div className="lg:hidden absolute top-12 left-5 z-20">
        <Image
          src={logoWhite}
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
          <span style={{ display: "block" }}>{renderTitle(titleLine1)}</span>
          <span style={{ display: "block" }}>{renderTitle(titleLine2)}</span>
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
          {Array.from({ length: Math.ceil(pills.length / 2) }).map((_, row) => {
            const left = pills[row * 2]
            const right = pills[row * 2 + 1]
            return (
              <Fragment key={left.id ?? row}>
                <span className="generalsans-regular text-white text-lg text-right justify-self-end"><strong>{left.boldPart}</strong> {left.normalPart}</span>
                <span className="w-2 h-2 bg-[#0074E5] shrink-0" />
                {right ? (
                  <span className="generalsans-regular text-white text-lg justify-self-start"><strong>{right.boldPart}</strong> {right.normalPart}</span>
                ) : (
                  <span />
                )}
              </Fragment>
            )
          })}
        </div>

        {/* Desktop: flex row */}
        <div className="hidden sm:flex items-center gap-6 justify-center">
          {pills.map((pill, i) => (
            <Fragment key={pill.id ?? i}>
              <span className="generalsans-regular text-white text-lg"><strong>{pill.boldPart}</strong> {pill.normalPart}</span>
              {i < pills.length - 1 && <span className="w-2 h-2 bg-[#0074E5] shrink-0" />}
            </Fragment>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="generalsans-regular text-white/50 text-xs tracking-widest uppercase">
          {scrollText}
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
