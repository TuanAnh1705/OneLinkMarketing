"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import type { PainPointSection } from "@vns-core/core/types/homepage"
import { getMediaUrl } from "@vns-core/core/api/media-url"

const FALLBACK_ITEMS = [
    {
        title: "Fragmented Marketing",
        description:
            "Juggling multiple freelancers or agencies across different countries, cultures and languages, results in inconsistent branding, lack of cohesion across company touchpoints, and confused messaging.",
        image: "/assets/pp1.png",
    },
    {
        title: "High Costs, Low ROI",
        description:
            "Bloated Western salaries, Over-inflated city-centre office space, Unnecessary bureaucracy and overheads - all passed onto you, before any work has even started.",
        image: "/assets/pp2.png",
    },
    {
        title: "Weak Brand Identity",
        description:
            "Poorly converting websites, inconsistent messaging, no clear strategy or roadmap, distinctly average content production, yet high monthly costs. What exactly are you paying for?",
        image: "/assets/pp3.png",
    },
    {
        title: "Scaling Issues",
        description:
            "You want to scale, but have no solid metrics to work from, whilst the cost to increase output is concerningly high. Surely A/B testing shouldn't be this costly?",
        image: "/assets/pp4.png",
    },
]

// Local fallback images by index (Strapi painPoint items may not carry an image).
const FALLBACK_PP_IMAGES = FALLBACK_ITEMS.map((i) => i.image)

const ANIMATION_DURATION = 900
// Số vh cần scroll để chuyển 1 item (giảm xuống để không quá dài)
const SCROLL_PER_ITEM_VH = 60

export default function Page({ data }: { data?: PainPointSection | null }) {
    const headingLine1 = data?.headingLine1 || "Are you struggling with"
    const headingHighlight = data?.headingHighlight || "these pain points"
    const items = data?.items?.length
        ? data.items.map((it, i) => ({
              title: it.title,
              description: it.description,
              image: it.image?.url ? getMediaUrl(it.image.url) : (FALLBACK_PP_IMAGES[i] ?? FALLBACK_PP_IMAGES[FALLBACK_PP_IMAGES.length - 1]),
          }))
        : FALLBACK_ITEMS

    const [activeIndex, setActiveIndex] = useState(0)
    const [squareTop, setSquareTop] = useState(0)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const numberRefs = useRef<(HTMLSpanElement | null)[]>([])
    const totalItems = items.length

    useEffect(() => {
        const handleScroll = () => {
            if (!wrapperRef.current) return
            const rect = wrapperRef.current.getBoundingClientRect()
            const scrolledIn = -rect.top
            if (scrolledIn < 0) {
                setActiveIndex(0)
                return
            }
            const scrollPerItem = window.innerHeight * (SCROLL_PER_ITEM_VH / 100)
            const newIndex = Math.min(
                Math.floor(scrolledIn / scrollPerItem),
                totalItems - 1
            )
            setActiveIndex(newIndex)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll() // init
        return () => window.removeEventListener("scroll", handleScroll)
    }, [totalItems])

    // Đo vị trí thực của số active và di chuyển cục vuông tới đó
    useEffect(() => {
        const measure = () => {
            const numEl = numberRefs.current[activeIndex]
            const listEl = listRef.current
            if (!numEl || !listEl) return
            const numRect = numEl.getBoundingClientRect()
            const listRect = listEl.getBoundingClientRect()
            setSquareTop(numRect.top - listRect.top + numRect.height / 2)
        }
        measure()
        window.addEventListener("resize", measure)
        return () => window.removeEventListener("resize", measure)
    }, [activeIndex])

    return (
        <main className="px-4 md:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="pt-12 lg:pt-20 pb-0 lg:pb-0">
                    <h1 className="generalsans-regular text-3xl md:text-5xl lg:text-6xl font-medium text-[#000A1D] leading-tight">
                        {headingLine1} <br />
                        <span className="italic font-bold">{headingHighlight}</span>?
                    </h1>
                </div>
            </div>

            {/* Mobile only: static list, no animation */}
            <div className="lg:hidden pb-12 pt-8">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 py-5">
                        <span className="w-3 h-3 bg-[#0074E5] shrink-0 mt-2" />
                        <span className="text-sm font-medium pt-0.5 shrink-0 w-6 text-[#000A1D]">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1 min-w-0">
                            <h3 className="generalsans-light text-2xl font-semibold text-[#000A1D] mb-2">
                                {item.title}
                            </h3>
                            <p className="generalsans-regular text-sm leading-relaxed text-[#444444]">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/*
             * Wrapper cao totalItems * 100vh → tạo scroll space để section pin bên trong.
             * Khi user scroll qua wrapper, section sticky ở top:0 và activeIndex
             * được tính từ vị trí scroll tương đối với wrapper.
             */}
            <div
                ref={wrapperRef}
                style={{ height: `${(totalItems + 1) * SCROLL_PER_ITEM_VH}vh` }}
                className="relative hidden lg:block"
            >
                <section className="sticky top-0 h-screen">
                    <div className="mx-auto max-w-7xl h-full flex items-center px-4 md:px-8 lg:px-16">
                        <div className="w-full flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
                            {/* LEFT - Text list */}
                            <div className="w-full lg:flex-1 flex flex-col relative">
                                <div className="relative" ref={listRef}>
                                    {/* Cục vuông trượt ngang hàng với số active */}
                                    <div
                                        className="absolute left-0 w-3 h-3 bg-[#0074E5] pointer-events-none z-10"
                                        style={{
                                            top: squareTop,
                                            transform: `translateY(-50%) rotate(${activeIndex * 360}deg)`,
                                            transition: `top ${ANIMATION_DURATION}ms cubic-bezier(0.65, 0, 0.35, 1), transform ${ANIMATION_DURATION}ms cubic-bezier(0.65, 0, 0.35, 1)`,
                                        }}
                                    />

                                    {items.map((item, index) => {
                                        const isActive = activeIndex === index
                                        const itemNumber = String(
                                            index + 1
                                        ).padStart(2, "0")

                                        return (
                                            <div
                                                key={index}
                                                className="relative py-5"
                                            >
                                                <div
                                                    className={cn(
                                                        "flex items-start gap-4 transition-all ease-[cubic-bezier(0.65,0,0.35,1)]",
                                                        isActive
                                                            ? "translate-x-6 lg:translate-x-8"
                                                            : "translate-x-0"
                                                    )}
                                                    style={{
                                                        transitionDuration: `${ANIMATION_DURATION}ms`,
                                                    }}
                                                >
                                                    <span
                                                        ref={(el) => { numberRefs.current[index] = el }}
                                                        className={cn(
                                                            "text-sm font-medium pt-2 shrink-0 w-6 transition-colors",
                                                            isActive
                                                                ? "text-[#000A1D]"
                                                                : "text-gray-400"
                                                        )}
                                                        style={{
                                                            transitionDuration: `${ANIMATION_DURATION}ms`,
                                                        }}
                                                    >
                                                        {itemNumber}
                                                    </span>

                                                    <div className="flex-1 min-w-0">
                                                        <h3
                                                            className={cn(
                                                                "generalsans-light text-2xl lg:text-[28px] font-semibold mb-2 transition-colors",
                                                                isActive
                                                                    ? "text-[#000A1D]"
                                                                    : "text-gray-400"
                                                            )}
                                                            style={{
                                                                transitionDuration: `${ANIMATION_DURATION}ms`,
                                                            }}
                                                        >
                                                            {item.title}
                                                        </h3>
                                                        <p
                                                            className={cn(
                                                                "generalsans-regular text-sm md:text-[15px] leading-relaxed max-w-md transition-colors",
                                                                isActive
                                                                    ? "text-[#444444]"
                                                                    : "text-gray-400/70"
                                                            )}
                                                            style={{
                                                                transitionDuration: `${ANIMATION_DURATION}ms`,
                                                            }}
                                                        >
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* RIGHT - Image stack (ẩn trên mobile) */}
                            <div className="hidden lg:block relative lg:w-[480px] xl:w-[520px] shrink-0">
                                <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-gray-100">
                                    {items.map((item, index) => {
                                        // index < active → đã qua, trượt lên trên
                                        // index === active → đang hiển thị
                                        // index > active → chờ bên dưới
                                        const offset = index - activeIndex
                                        const translateY =
                                            offset < 0 ? -100 : offset > 0 ? 100 : 0

                                        return (
                                            <div
                                                key={index}
                                                className="absolute inset-0 will-change-transform"
                                                style={{
                                                    zIndex: totalItems - Math.abs(offset),
                                                    transform: `translateY(${translateY}%)`,
                                                    transition: `transform ${ANIMATION_DURATION}ms cubic-bezier(0.77, 0, 0.175, 1)`,
                                                }}
                                            >
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    sizes="(min-width: 1280px) 520px, (min-width: 1024px) 480px, 100vw"
                                                    className="object-cover"
                                                    priority={index === 0}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
