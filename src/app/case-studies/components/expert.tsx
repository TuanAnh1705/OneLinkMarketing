"use client"

import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

interface Author {
  id: number
  name: string
}

interface Category {
  id: number
  name: string
  slug: string
}

interface BlogPost {
  id: number
  wpId: number
  title: string
  slug: string
  coverImage: string | null
  wpStatus: string
  isPublishedOnNextjs: boolean
  displayOrder: number | null
  wpCreatedAt: string
  authors: Author[]
  categories: Category[]
}

function FilterTabs({
  categories,
  activeTab,
  onTabChange,
}: {
  categories: string[]
  activeTab: string
  onTabChange: (category: string) => void
}) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  return (
    <div className="flex flex-row flex-wrap gap-y-6 overflow-x-auto md:grid md:grid-cols-5 w-full max-w-7xl mx-auto mb-12 md:mb-20 px-4 sm:px-8 md:px-0">
      {categories.map((category) => {
        const isActive = activeTab === category
        const isHovered = hoveredTab === category

        return (
          <div
            key={category}
            onClick={() => onTabChange(category)}
            onMouseEnter={() => setHoveredTab(category)}
            onMouseLeave={() => setHoveredTab(null)}
            className="relative flex flex-col items-start cursor-pointer group shrink-0 pr-8 md:pr-0"
          >
            <span className="text-base md:text-lg text-[#444444] group-hover:text-[#000A1D] transition-colors duration-300 relative z-10 pb-3 whitespace-nowrap">
              {category}
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
  )
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const authors = post.authors || []
  const authorNames = authors.length > 0 
    ? authors.map((author) => author.name).join(", ")
    : "Unknown Author"

  return (
    <Link href={`/case-studies/${post.id}`}>
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
            className="w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover object-center"
            />
          </motion.div>
        </div>
        
        <h3 className="mt-6 archivo-expanded font-medium text-lg text-[#000A1D] leading-tight">
          {post.title}
        </h3>
        <p className="mt-2 text-sm neulis-alt-extralight font-normal text-[#666666]">
          By {authorNames}
        </p>
      </motion.div>
    </Link>
  )
}

// ============================================================================
// 🔹 Component ExpertSection chính
// ============================================================================
export default function ExpertSection() {
  const section4Ref = useRef<HTMLDivElement>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>(["All"])
  const [activeTab, setActiveTab] = useState("All")
  const [loading, setLoading] = useState(true)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()
        
        const categoriesArray = data.categories || []
        const categoryNames = categoriesArray.map((cat: Category) => cat.name)
        
        setCategories(["All", ...categoryNames])
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        let url = "/api/post?per_page=9&published=true"
        if (activeTab !== "All") {
          url += `&category=${encodeURIComponent(activeTab)}`
        }

        const response = await fetch(url)
        const data = await response.json()
        
        // ✅ Posts already sorted by backend: displayOrder ASC, then wpCreatedAt DESC
        // Posts with displayOrder (1, 2, 3...) will appear first
        // Then posts without displayOrder sorted by date
        setPosts(data.posts || [])
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [activeTab])

  // Organize posts into rows of 3
  const rows: BlogPost[][] = []
  for (let i = 0; i < posts.length; i += 3) {
    rows.push(posts.slice(i, i + 3))
  }

  return (
    <motion.section
      ref={section4Ref}
      className="relative justify-center -mt-36 md:-mt-32 z-10 bg-white/0 pt-32 pb-32 px-4 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="archivo-expanded text-4xl sm:text-5xl md:text-6xl font-medium text-center text-[#000A1D] mb-12 md:mb-16">
          Expert Insights
        </h2>
        
        <FilterTabs
          categories={categories}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000A1D]"></div>
          </div>
        ) : posts.length === 0 ? (
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