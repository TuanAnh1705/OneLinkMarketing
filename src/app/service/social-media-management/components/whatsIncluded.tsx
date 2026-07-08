"use client"

import Link from "next/link"
import { useState } from "react"
import type { SdWhatsIncludedSection } from "@vns-core/core/types/service-detail"

interface IncludedCard {
  title: string
  description: string
  link: string
}

const FALLBACK_ITEMS: IncludedCard[] = [
  {
    title: "Social Media Strategy & Planning",
    description: "Defining your audience, content pillars, and platform-specific goals to build a cohesive brand voice.",
    link: "/case-studies",
  },
  {
    title: "Content Creation & Scheduling",
    description: "Producing and scheduling engaging visuals, videos, and copy in a consistent content calendar.",
    link: "/case-studies",
  },
  {
    title: "Community Management & Engagement",
    description: "Actively engaging with your audience, responding to feedback, and fostering a loyal brand community.",
    link: "/case-studies",
  },
  {
    title: "Performance Analytics & Reporting",
    description: "Tracking key metrics, analyzing performance, and providing actionable reports to demonstrate ROI.",
    link: "/case-studies",
  },
]

function IncludedItem({ item, index }: { item: IncludedCard; index: number }) {
  const [hovered, setHovered] = useState(false)
  const lineDir = index % 2 === 0 ? "origin-right group-hover:origin-left" : "origin-left group-hover:origin-right"

  return (
    <div className="flex flex-col gap-5 cursor-default" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="flex items-center overflow-hidden">
        <div
          className="shrink-0 bg-[#0074E5] transition-all duration-300 ease-out"
          style={{ width: hovered ? "16px" : "0px", minWidth: hovered ? "16px" : "0px", height: "16px", marginRight: hovered ? "10px" : "0px", opacity: hovered ? 1 : 0 }}
        />
        <h3 className="generalsans-regular text-2xl md:text-3xl xl:text-4xl font-bold text-[#000A1D] leading-tight">
          {item.title}
        </h3>
      </div>
      <div className="h-px w-full bg-[#ADADAD]" />
      <div className="flex items-start justify-between gap-8">
        <p className="generalsans-regular text-[#444444] text-sm md:text-base leading-relaxed flex-1">{item.description}</p>
        <Link href={item.link} className="group shrink-0 generalsans-regular font-medium text-sm text-[#000000]">
          <span className="relative inline-block">
            Learn more
            <span className={`absolute -bottom-0.5 left-0 w-full h-px bg-[#0074E5] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 ${lineDir}`} />
          </span>
        </Link>
      </div>
    </div>
  )
}

export default function WhatsIncluded({ data }: { data?: SdWhatsIncludedSection | null }) {
  const items: IncludedCard[] = data?.items?.length
    ? data.items.map((it) => ({ title: it.title, description: it.description, link: it.link || "/case-studies" }))
    : FALLBACK_ITEMS
  const heading = data?.heading || "What's Included"

  return (
    <section className="bg-white px-6 md:px-16 pt-6 pb-16 md:pt-8 md:pb-24">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center gap-3 mb-12 md:mb-16">
          <div className="w-4 h-4 bg-[#0074E5] shrink-0" />
          <h2 className="generalsans-light text-2xl md:text-3xl xl:text-4xl uppercase text-[#000A1D]">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
          {items.map((item, i) => <IncludedItem key={i} item={item} index={i} />)}
        </div>
      </div>
    </section>
  )
}
