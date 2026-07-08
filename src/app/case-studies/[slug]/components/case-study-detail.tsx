"use client"

import Image from "next/image"
import { getMediaUrl } from "@vns-core/core/api/media-url"
import type { CaseStudyData } from "@vns-core/core/types/case-study"
import ParallaxBanner from "./parallax-banner"
import ArticleBody from "./article-body"

export default function CaseStudyDetail({
  data,
  contentHtml,
}: {
  data: CaseStudyData
  contentHtml: string
}) {
  const banner = data.featureImage?.url ? getMediaUrl(data.featureImage.url) : "/placeholder.svg"
  const metaInfo = data.metaInfo ?? []

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Top: featureImage + headline + meta grid (giữ nguyên layout OLMA cũ) */}
      <section className="container mx-auto px-6 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src={banner}
                alt={data.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="archivo-expanded text-3xl md:text-5xl font-medium tracking-tight">
                {data.headline}
              </h1>
            </div>
          </div>

          {metaInfo.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {metaInfo.map((info) => (
                <div key={info.id} className="space-y-3">
                  <div className="h-[0.5px] w-full bg-linear-to-r from-[#0074E5] to-[#162660]" />
                  <p className="generalsans-regular text-sm text-[#444444]">{info.label}</p>
                  <p className="generalsans-regular text-base font-medium text-[#000A1D] whitespace-pre-line">
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Parallax banner (dùng lại featureImage) */}
      <section className="w-full">
        <ParallaxBanner src={banner} alt={data.title} />
      </section>

      {/* Nội dung CKEditor + tags cuối bài */}
      <section className="bg-white py-12 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <ArticleBody html={contentHtml} tags={data.tags} variant="case-study" />
        </div>
      </section>
    </div>
  )
}
