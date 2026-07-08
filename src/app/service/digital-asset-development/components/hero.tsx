"use client"

import { motion } from "framer-motion"
import WhatsIncluded from "./whatsIncluded"
import type { SdHeroSection, SdWhatsIncludedSection } from "@vns-core/core/types/service-detail"

export default function HeroSection({ hero, whatsIncluded }: { hero?: SdHeroSection | null; whatsIncluded?: SdWhatsIncludedSection | null }) {
  const titleLine1 = hero?.titleLine1 || "DIGITAL ASSET"
  const titleLine2 = hero?.titleLine2 ?? "DEVELOPMENT"
  const description = hero?.description || "Build the digital assets that form the core of your lead-generation engine from compelling brand identities to high-performance websites."
  return (
    <div className="relative overflow-hidden">
      <motion.div initial={{ x: 0 }} animate={{ x: "-100%" }} transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }} className="fixed top-0 left-0 w-1/2 h-full bg-white z-9999" />
      <motion.div initial={{ x: 0 }} animate={{ x: "100%" }} transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }} className="fixed top-0 right-0 w-1/2 h-full bg-white z-9999" />

      <div className="bg-white p-6 md:p-16 relative z-10">
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id="chevronGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0074E5" />
              <stop offset="100%" stopColor="#162660" />
            </linearGradient>
          </defs>
        </svg>

        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16">
            <h1 className="text-center text-3xl md:text-8xl font-bold tracking-wider mb-8">
              <span className="archivo-expanded bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent">{titleLine1}</span>
              {titleLine2 && (
                <>
                  <br />
                  <span className="archivo-expanded bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent">{titleLine2}</span>
                </>
              )}
            </h1>
            <div className="h-px w-full bg-linear-to-r from-[#0074E5] to-[#162660]" />
          </div>

          <div className="mb-8 md:mb-10">
            <div className="flex items-start justify-center">
              <div className="max-w-3xl text-center">
                <p className="generalsans-regular text-sm md:text-xl text-[#444444] leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhatsIncluded data={whatsIncluded} />
    </div>
  )
}
