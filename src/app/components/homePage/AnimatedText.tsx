"use client"

import Image from "next/image"

export default function AnimatedText() {
    return (
        <section className="w-full relative -mt-40 -mb-40">
            <Image
                src="/assets/banner.png"
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
