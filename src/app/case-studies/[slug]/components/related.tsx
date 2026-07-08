"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { getMediaUrl } from "@vns-core/core/api/media-url"
import type { PostData } from "@vns-core/core/types/post"

export function RelatedPosts({ posts }: { posts: PostData[] }) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="bg-white pt-20 pb-32 px-8 md:px-16 lg:px-24 mb-20 md:mb-0">
      <div className="max-w-7xl mx-auto">
        <div className="w-full max-w-[1250px] h-px bg-linear-to-r from-[#0074E5] to-[#162660] mx-auto mb-6" />

        <h2 className="archivo-expanded text-4xl md:text-5xl font-medium text-center text-[#000A1D] mb-16">
          Related Posts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} totalItems={posts.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PostCard({
  post,
  index,
  totalItems,
}: {
  post: PostData
  index: number
  totalItems: number
}) {
  const authorNames = post.author && post.author.trim() ? post.author : "OneLink Marketing"
  const cover = post.featureImage?.url ? getMediaUrl(post.featureImage.url) : "/placeholder.svg"

  return (
    <Link href={`/${post.slug}`}>
      <motion.div
        className="relative text-left group"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 1, 0.3, 1],
          delay: index * 0.2,
        }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {index < totalItems - 1 && (
          <div className="absolute top-0 -right-4 w-px h-full bg-linear-to-b from-[#0074E5] to-[#162660] hidden md:block" />
        )}

        <div className="relative w-full aspect-4/3 rounded-md overflow-hidden bg-[#E9E9E9]">
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.05 }}
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

        <h3 className="archivo-expanded mt-6 font-medium text-lg text-[#2d2d2d] leading-tight duration-300">
          {post.title}
        </h3>

        <p className="generalsans-regular mt-2 text-sm font-medium text-[#666666]">
          By {authorNames}
        </p>
      </motion.div>
    </Link>
  )
}
