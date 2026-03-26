"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, User } from "lucide-react"
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser'

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
  contentHtml: string
  coverImage: string | null
  wpStatus: string
  wpCreatedAt: string
  authors?: Author[] // ✅ Thêm optional
  categories?: Category[] // ✅ Thêm optional
  images?: { id: number; url: string }[] // ✅ Thêm optional
}

export default function BlogDetailSection({ id }: { id: string }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [firstImage, setFirstImage] = useState<string | null>(null)
  const [contentWithoutFirstImage, setContentWithoutFirstImage] = useState<string>("")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/post/${id}`)
        
        if (!response.ok) {
          throw new Error("Post not found")
        }

        const data = await response.json()
        
        let postData = null
        if (data.success && data.post) {
          postData = data.post
        } else if (data.post) {
          postData = data.post
        } else {
          postData = data
        }

        // ✅ Extract first image from content
        if (postData?.contentHtml) {
          const tempDiv = document.createElement('div')
          tempDiv.innerHTML = postData.contentHtml
          
          const firstImg = tempDiv.querySelector('img')
          if (firstImg && firstImg.src) {
            setFirstImage(firstImg.src)
            // Remove first image from content
            firstImg.remove()
            setContentWithoutFirstImage(tempDiv.innerHTML)
          } else {
            setContentWithoutFirstImage(postData.contentHtml)
          }
        }
        
        setPost(postData)
      } catch (err) {
        console.error("Error fetching post:", err)
        setError("Failed to load post")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  const parseOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.name === 'img') {
      const { src, alt, class: className } = domNode.attribs
      return (
        <div className="my-8">
          <img
            src={src}
            alt={alt || 'Blog image'}
            className={className || ''}
            loading="lazy"
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              margin: '0 auto'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </div>
      )
    }
  }
}

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000A1D]"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#000A1D] mb-4">Post Not Found</h1>
          <p className="text-gray-600">{error || "The post you're looking for doesn't exist."}</p>
        </div>
      </div>
    )
  }

  // ✅ Handle authors safely
  const authorNames = post.authors && post.authors.length > 0
    ? post.authors.map((author) => author.name).join(", ")
    : "Unknown Author"

  return (
    <>
      {/* ✅ PARALLAX HERO IMAGE - Full Width - NO TEXT OVERLAY */}
      {firstImage && isMounted ? (
        <ParallaxHero firstImage={firstImage} post={post} />
      ) : firstImage && !isMounted ? (
        <StaticHero firstImage={firstImage} post={post} />
      ) : null}

      {/* ✅ CONTENT SECTION */}
      <section className="bg-white py-12 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* ✅ Header - Always show (below hero image) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Title */}
            <h1 className="archivo-expanded text-4xl sm:text-5xl md:text-6xl font-medium text-[#000A1D] leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-[#666666] text-sm">
              {/* ✅ Authors - Safe check */}
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="generalsans-regular">
                  {authorNames}
                </span>
              </div>
              
              {/* ✅ Date - Safe check */}
              {post.wpCreatedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="generalsans-regular">
                    {new Date(post.wpCreatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Content with HTML Parser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="blog-content"
          >
            {parse(contentWithoutFirstImage || post.contentHtml, parseOptions)}
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
  /* Blog Content Styles with !important */
  .blog-content {
    font-family: 'Neulis Alt', sans-serif !important;
    font-size: 1.125rem !important;
    line-height: 1.75rem !important;
    color: #444444 !important;
  }

  .blog-content * {
    max-width: 100% !important;
  }

  /* Headings */
  .blog-content h1,
  .blog-content h2,
  .blog-content h3,
  .blog-content h4,
  .blog-content h5,
  .blog-content h6 {
    font-family: 'Archivo Expanded', sans-serif !important;
    font-weight: 500 !important;
    color: #000A1D !important;
    margin-top: 2.5rem !important;
    margin-bottom: 1.25rem !important;
  }

  .blog-content h1 {
    font-size: 2.25rem !important;
    line-height: 2.5rem !important;
  }

  .blog-content h2 {
    font-size: 1.875rem !important;
    line-height: 2.25rem !important;
  }

  .blog-content h3 {
    font-size: 1.5rem !important;
    line-height: 2rem !important;
  }

  /* Paragraphs */
  .blog-content p {
    margin-bottom: 1.5rem !important;
    line-height: 1.75 !important;
    color: #444444 !important;
  }

  /* Links */
  .blog-content a {
    color: #0074E5 !important;
    text-decoration: none !important;
    transition: all 0.2s !important;
  }

  .blog-content a:hover {
    text-decoration: underline !important;
  }

  /* Strong/Bold */
  .blog-content strong,
  .blog-content b {
    color: #000A1D !important;
    font-weight: 600 !important;
  }

  /* Lists - WordPress Bullets */
  .blog-content ul,
  .blog-content ol {
    margin: 1.5rem 0 !important;
    padding-left: 2.5rem !important;
    color: #444444 !important;
  }

  .blog-content ul {
    list-style-type: disc !important;
  }

  .blog-content ol {
    list-style-type: decimal !important;
  }

  .blog-content li {
    margin: 0.75rem 0 !important;
    padding-left: 0.5rem !important;
    line-height: 1.75 !important;
  }

  .blog-content ul ul,
  .blog-content ol ol,
  .blog-content ul ol,
  .blog-content ol ul {
    margin: 0.5rem 0 !important;
    padding-left: 2rem !important;
  }

  /* Images - NO border-radius, NO box-shadow, keep original size */
  .blog-content img {
    display: block !important;
    max-width: 100% !important;
    height: auto !important;
    margin: 2rem auto !important;
  }

  .blog-content figure {
    margin: 2rem 0 !important;
  }

  .blog-content figcaption {
    text-align: center !important;
    font-size: 0.875rem !important;
    color: #666666 !important;
    margin-top: 0.5rem !important;
    font-style: italic !important;
  }

  /* Blockquotes */
  .blog-content blockquote {
    border-left: 4px solid #0074E5 !important;
    padding-left: 1.5rem !important;
    margin: 1.5rem 0 !important;
    font-style: italic !important;
    color: #666666 !important;
    background-color: #f9fafb !important;
    padding: 1.5rem !important;
    border-radius: 0.5rem !important;
  }

  /* Code */
  .blog-content code {
    background-color: #f3f4f6 !important;
    padding: 0.125rem 0.5rem !important;
    border-radius: 0.25rem !important;
    font-size: 0.875rem !important;
    color: #0074E5 !important;
  }

  .blog-content pre {
    background-color: #1f2937 !important;
    color: #f9fafb !important;
    padding: 1.5rem !important;
    border-radius: 0.75rem !important;
    overflow-x: auto !important;
    margin: 1.5rem 0 !important;
  }

  .blog-content pre code {
    background-color: transparent !important;
    padding: 0 !important;
    color: #f9fafb !important;
  }

  /* Tables */
  .blog-content table {
    width: 100% !important;
    border-collapse: collapse !important;
    margin: 1.5rem 0 !important;
  }

  .blog-content th,
  .blog-content td {
    padding: 0.75rem !important;
    border: 1px solid #e5e7eb !important;
  }

  .blog-content th {
    background-color: #f3f4f6 !important;
    font-weight: 600 !important;
  }

  /* WordPress specific classes */
  .blog-content .wp-block-image img {
    display: block !important;
  }

  .blog-content .wp-caption {
    max-width: 100% !important;
  }

  .blog-content .wp-caption-text {
    text-align: center !important;
    font-size: 0.875rem !important;
    color: #666666 !important;
    margin-top: 0.5rem !important;
  }

  /* Handle iframe/embed */
  .blog-content iframe,
  .blog-content embed,
  .blog-content video {
    max-width: 100% !important;
    height: auto !important;
    margin: 2rem 0 !important;
    border-radius: 0.75rem !important;
  }
`}</style>
    </>
  )
}

// ✅ Parallax Hero - NO TEXT, JUST IMAGE
function ParallaxHero({ firstImage, post }: { firstImage: string; post: BlogPost }) {
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])

  return (
    <div 
      ref={heroRef}
      className="relative w-full h-[500px] md:h-[600px] lg:h-[900px] overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <Image
          src={firstImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>
    </div>
  )
}

// ✅ Static Hero - NO TEXT, JUST IMAGE
function StaticHero({ firstImage, post }: { firstImage: string; post: BlogPost }) {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={firstImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
    </div>
  )
}