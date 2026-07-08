"use client"

import { motion } from "framer-motion"
import { Calendar, User } from "lucide-react"
import { getMediaUrl } from "@vns-core/core/api/media-url"
import type { PostData } from "@vns-core/core/types/post"
import ParallaxBanner from "./parallax-banner"
import ArticleBody from "./article-body"

export default function PostDetail({
  data,
  contentHtml,
}: {
  data: PostData
  contentHtml: string
}) {
  const banner = data.featureImage?.url ? getMediaUrl(data.featureImage.url) : null
  const authorNames = data.author && data.author.trim() ? data.author : "OneLink Marketing"
  const date = data.publishedAt || data.createdAt || null

  return (
    <>
      {banner && <ParallaxBanner src={banner} alt={data.title} />}

      <section className="bg-white py-12 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="archivo-expanded text-4xl sm:text-5xl md:text-6xl font-medium text-[#000A1D] leading-tight mb-6">
              {data.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-[#666666] text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="generalsans-regular">{authorNames}</span>
              </div>

              {date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="generalsans-regular">
                    {new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          <ArticleBody html={contentHtml} tags={data.tags} />
        </div>
      </section>
    </>
  )
}
