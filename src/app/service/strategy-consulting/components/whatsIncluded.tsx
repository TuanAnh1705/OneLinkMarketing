"use client"

import Link from "next/link"
import { useState } from "react"

const items = [
  {
    title: "Brand Audit & Insight Analysis",
    description:
      "We analyze your brand's current positioning and effectiveness to uncover key opportunities and strategic gaps.",
    link: "/case-studies",
  },
  {
    title: "Market & Competitor Research",
    description:
      "A deep dive into your market landscape and competitors to identify your unique space and competitive advantage.",
    link: "/case-studies",
  },
  {
    title: "Key Messaging Framework",
    description:
      "Crafting a clear, concise, and persuasive message that resonates with your target audience and drives action.",
    link: "/case-studies",
  },
  {
    title: "Go-to-Market Roadmap",
    description:
      "Developing a step-by-step, integrated marketing plan to launch your brand and drive sustainable growth.",
    link: "/case-studies",
  },
]

function IncludedItem({
  item,
  index,
}: {
  item: (typeof items)[0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const lineDir =
    index % 2 === 0
      ? "origin-right group-hover:origin-left"
      : "origin-left group-hover:origin-right"

  return (
    <div
      className="flex flex-col gap-5 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center overflow-hidden">
        <div
          className="shrink-0 bg-[#0074E5] transition-all duration-300 ease-out"
          style={{
            width: hovered ? "16px" : "0px",
            minWidth: hovered ? "16px" : "0px",
            height: "16px",
            marginRight: hovered ? "10px" : "0px",
            opacity: hovered ? 1 : 0,
          }}
        />
        <h3 className="generalsans-regular text-2xl md:text-3xl xl:text-4xl font-bold text-[#000A1D] leading-tight">
          {item.title}
        </h3>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#ADADAD]" />

      {/* Description + Learn more on the same row */}
      <div className="flex items-start justify-between gap-8">
        <p className="generalsans-regular text-[#444444] text-sm md:text-base leading-relaxed flex-1">
          {item.description}
        </p>

        <Link
          href={item.link}
          className="group shrink-0 generalsans-regular font-medium text-sm text-[#000000]"
        >
          <span className="relative inline-block">
            Learn more
            <span
              className={`absolute -bottom-0.5 left-0 w-full h-px bg-[#0074E5] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 ${lineDir}`}
            />
          </span>
        </Link>
      </div>
    </div>
  )
}

export default function WhatsIncluded() {
  return (
    <section className="bg-white px-6 md:px-16 pt-6 pb-16 md:pt-8 md:pb-24">
      <div className="max-w-8xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-12 md:mb-16">
          <div className="w-4 h-4 bg-[#0074E5] shrink-0" />
          <h2 className="generalsans-light text-2xl md:text-3xl xl:text-4xl uppercase text-[#000A1D]">
            What&apos;s Included
          </h2>
        </div>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
          {items.map((item, i) => (
            <IncludedItem key={i} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
