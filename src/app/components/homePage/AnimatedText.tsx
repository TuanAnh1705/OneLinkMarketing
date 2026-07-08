"use client"

import Image from "next/image"
import type { BannerSection } from "@vns-core/core/types/homepage"
import { getMediaUrl } from "@vns-core/core/api/media-url"

export default function AnimatedText({ data }: { data?: BannerSection | null }) {
    const bannerSrc = data?.image?.url ? getMediaUrl(data.image.url) : "/assets/banner.png"
    return (
        <section className="w-full relative -mt-40 -mb-40">
            <Image
                src={bannerSrc}
                alt="Banner"
                width={1920}
                height={600}
                className="w-full h-auto object-cover"
                priority
            />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </section>
    )
}
