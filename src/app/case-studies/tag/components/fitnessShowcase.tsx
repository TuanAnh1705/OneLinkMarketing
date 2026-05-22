"use client"

import Image from "next/image"

function ParallaxStrong({ src, alt, className }: { src: string; alt: string; className?: string }) {
    return (
        <div className={`relative overflow-hidden bg-transparent ${className}`}>
            <Image src={src} alt={alt} fill className="object-cover" priority />
        </div>
    )
}

export default function FitnessShowcase() {
    return (
        <div className="min-h-screen bg-white">
            {/* Top Section */}
            <section className="container mx-auto px-6 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto space-y-12">

                    {/* Top Row */}
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                        {/* Image */}
                        <div className="relative aspect-video overflow-hidden rounded-2xl">
                            <Image
                                src="/assets/tag1.png"
                                alt="Fitness outdoor class"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Title */}
                        <div className="flex flex-col justify-center">
                            <h1 className="archivo-expanded text-3xl md:text-5xl font-medium tracking-tight">
                                Launching a Niche Performance Brand from a Standstill to a Community for Tag.
                            </h1>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            ["Service", "Website Design & Landing Pages"],
                            ["Client", "Tag. Fitness"],
                            ["Date", "January 2025"],
                            ["Technology", "Figma, Adobe Creative Suite, Shopify"],
                        ].map(([label, value], i) => (
                            <div key={i} className="space-y-3">
                                <div className="h-[0.5px] w-full bg-linear-to-r from-[#0074E5] to-[#162660]" />
                                <p className="generalsans-regular text-sm text-[#444444]">{label}</p>
                                <p className="generalsans-regular text-base font-medium text-[#000A1D]">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PARALLAX STRONG SECTION --- */}
            <section className="w-full h-[60vh] md:h-[85vh]">
                <ParallaxStrong
                    src="/assets/tag1.png"
                    alt="Tag Fitness - Where progress never stops"
                    className="w-full h-full"
                />
            </section>

        </div>
    )
}
