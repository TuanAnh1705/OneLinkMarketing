"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState, useMemo } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getMediaUrl } from "@vns-core/core/api/media-url"
import type { PostData } from "@vns-core/core/types/post"
import type { CategoryData } from "@vns-core/core/types/category"

interface Tab {
  name: string
  slug: string // "" = the "All" tab
}

function FilterTabs({
  tabs,
  activeSlug,
  onTabChange,
}: {
  tabs: Tab[]
  activeSlug: string
  onTabChange: (slug: string) => void
}) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const activeName = tabs.find((t) => t.slug === activeSlug)?.name ?? "All"

  return (
    <div className="w-full max-w-7xl mx-auto mb-12 md:mb-20 px-4 sm:px-8 md:px-0">
      {/* Mobile dropdown */}
      <div className="relative md:hidden">
        <button
          onClick={() => setDropdownOpen((o) => !o)}
          className="flex items-center justify-between w-full px-4 py-3 text-[#000A1D] text-base generalsans-regular"
        >
          <span>{activeName}</span>
          <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="w-4 h-4 text-[#0074E5]" />
          </motion.span>
        </button>
        <div className="h-px w-full bg-linear-to-r from-[#0074E5] to-[#162660]" />

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden absolute left-0 right-0 z-20"
            >
              <div className="px-px pb-px bg-linear-to-r from-[#0074E5] to-[#162660]">
                <div className="bg-white">
                  {tabs.map((tab) => (
                    <button
                      key={tab.slug || "all"}
                      onClick={() => { onTabChange(tab.slug); setDropdownOpen(false) }}
                      className={`flex items-center justify-between w-full px-4 py-3 text-left text-base generalsans-regular transition-colors ${activeSlug === tab.slug ? "text-[#000A1D] font-medium" : "text-[#444444] hover:text-[#000A1D]"}`}
                    >
                      {tab.name}
                      {activeSlug === tab.slug && <div className="w-1.5 h-1.5 bg-[#0074E5]" />}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop tabs */}
      <div className="hidden md:grid md:grid-cols-5 gap-y-6">
        {tabs.map((tab) => {
          const isActive = activeSlug === tab.slug
          const isHovered = hoveredSlug === tab.slug

          return (
            <div
              key={tab.slug || "all"}
              onClick={() => onTabChange(tab.slug)}
              onMouseEnter={() => setHoveredSlug(tab.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className="relative flex flex-col items-start cursor-pointer group pr-8 md:pr-0"
            >
              <span className="text-base md:text-lg text-[#444444] group-hover:text-[#000A1D] transition-colors duration-300 relative z-10 pb-3 whitespace-nowrap">
                {tab.name}
              </span>

              <motion.div
                className="absolute bottom-0 left-0 w-full bg-[#D1D1D1]"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: isActive || isHovered ? 0.9 : 0,
                  height: isActive || isHovered ? 2 : 1,
                  backgroundColor: isActive || isHovered ? "#000A1D" : "#D1D1D1",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PostCard({ post, index }: { post: PostData; index: number }) {
  const authorNames = post.author && post.author.trim() ? post.author : "OneLink Marketing"
  const cover = post.featureImage?.url ? getMediaUrl(post.featureImage.url) : "/placeholder.svg"

  return (
    <Link href={`/${post.slug}`}>
      <motion.div
        className="text-left cursor-pointer relative"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 2.4,
          ease: [0.25, 1, 0.3, 1],
          delay: (index % 3) * 0.2,
        }}
        viewport={{ once: false, amount: 0.4 }}
      >
        {(index % 3) < 2 && (
          <div className="absolute top-0 -right-4 w-px h-full bg-linear-to-b from-[#0074E5] to-[#162660] hidden md:block" />
        )}

        <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden bg-[#D9D9D9] border border-[#e5e5e5]">
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center"
            />
          </motion.div>
        </div>

        <h3 className="mt-6 generalsans-regular font-bold text-lg text-[#000A1D] leading-tight">
          {post.title}
        </h3>
        <p className="mt-2 text-sm generalsans-regular text-[#666666]">
          By {authorNames}
        </p>
      </motion.div>
    </Link>
  )
}

// ============================================================================
// 🔹 ExpertSection — posts + categories từ Strapi; lọc client-side, đồng bộ URL
//    thành /{category-slug} (không reload). "All" → /case-studies.
// ============================================================================
export default function ExpertSection({
  posts,
  categories,
  heading,
  initialCategory,
}: {
  posts?: PostData[]
  categories?: CategoryData[]
  heading?: string | null
  /** Category slug pre-selected when the page is opened at /{category-slug}. */
  initialCategory?: string
}) {
  const section4Ref = useRef<HTMLDivElement>(null)

  const allPosts = useMemo(() => posts ?? [], [posts])

  const tabs: Tab[] = useMemo(
    () => [
      { name: "All", slug: "" },
      ...(categories ?? []).map((c) => ({ name: c.name.trim(), slug: c.slug })),
    ],
    [categories],
  )

  // Only honour an initialCategory that matches a real category slug.
  const validInitial = tabs.some((t) => t.slug && t.slug === initialCategory)
    ? (initialCategory as string)
    : ""
  const [activeSlug, setActiveSlug] = useState(validInitial)

  const handleTabChange = (slug: string) => {
    setActiveSlug(slug)
    // Update the address bar in place (no navigation / no scroll jump).
    if (typeof window !== "undefined") {
      const url = slug ? `/${slug}` : "/case-studies"
      window.history.replaceState(window.history.state, "", url)
    }
  }

  const filtered = useMemo(() => {
    if (!activeSlug) return allPosts
    return allPosts.filter((p) =>
      (p.categories ?? []).some((c) => c.slug === activeSlug),
    )
  }, [allPosts, activeSlug])

  const rows: PostData[][] = []
  for (let i = 0; i < filtered.length; i += 3) {
    rows.push(filtered.slice(i, i + 3))
  }

  return (
    <motion.section
      ref={section4Ref}
      className="relative justify-center -mt-36 md:-mt-32 z-10 bg-white/0 pt-32 pb-32 px-4 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="archivo-expanded text-4xl sm:text-5xl md:text-6xl font-medium text-center text-[#000A1D] mb-12 md:mb-16">
          {heading ?? "Expert Insights"}
        </h2>

        <FilterTabs tabs={tabs} activeSlug={activeSlug} onTabChange={handleTabChange} />

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No posts available</p>
          </div>
        ) : (
          <div className="flex flex-col gap-12 md:gap-20">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
              >
                {row.map((post, i) => (
                  <PostCard key={post.id} post={post} index={rowIndex * 3 + i} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  )
}
