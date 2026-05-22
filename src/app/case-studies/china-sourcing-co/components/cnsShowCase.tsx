"use client"

import Image from "next/image"

function ParallaxStrong({ src, alt, className }: { src: string; alt: string; className?: string }) {
    return (
        <div className={`relative overflow-hidden bg-transparent ${className}`}>
            <Image src={src} alt={alt} fill className="object-cover" priority />
        </div>
    )
}

export default function CNSShowcase() {
    return (
        <div className="bg-white min-h-screen">
            {/* --- TOP SECTION --- */}
            <section className="container mx-auto px-6 py-16 lg:py-24">
                            <div className="max-w-7xl mx-auto space-y-12">
                                {/* Top Row */}
                                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                                    {/* Image */}
                                    <div className="relative aspect-video overflow-hidden rounded-2xl">
                                        <Image
                                            src="/assets/cns1.png"
                                            alt="Fitness outdoor class"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
            
                                    {/* Title */}
                                    <div className="flex flex-col justify-center">
                                        <h1 className="archivo-expanded text-3xl md:text-5xl font-medium tracking-tight">
                                            Building a Conversion-Focused Digital Presence for China Sourcing Co
                                        </h1>
                                    </div>
                                </div>
            
                                {/* Info Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {[
                                        ["Service", "Website Design, SEO, Social Media Marketing"],
                                        ["Client", "China Sourcing Co"],
                                        ["Date", "July 2025"],
                                        ["Technology","Adobe Creative Suite, WordPress, Hubspot"],
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

            {/* --- FULL WIDTH PARALLAX BANNER (Cực mạnh vì khổ lớn) --- */}
            <section className="w-full h-[60vh] md:h-[85vh] mb-20">
                <ParallaxStrong
                    src="/assets/cns1.png"
                    alt="China Sourcing Large Banner"
                    className="w-full h-full"
                />
            </section>

            {/* --- 1. ABOUT THE PROJECT --- */}
            <section className="container mx-auto px-6 pb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24 items-start">
                        <h2 className="archivo-expanded text-3xl lg:text-4xl font-medium tracking-tight text-[#000A1D]">
                            1. About the project
                        </h2>
                        <div className="space-y-6">
                            <p className="generalsans-regular text-base leading-relaxed text-[#444444]">
                                <span className="font-semibold text-black">China Sourcing Co</span> is a sourcing service company that connects global businesses with reliable manufacturers across China. Despite having an extensive supplier network and a strong operational foundation, the company&apos;s online presence did not fully reflect its expertise and credibility.
                            </p>
                            <p className="generalsans-regular text-base leading-relaxed text-[#444444]">
                                The old website was outdated, hard to navigate, and lacked a clear brand narrative. Marketing activities were fragmented across channels, with no unified tracking or data integration.
                            </p>
                            <p className="generalsans-regular text-base leading-relaxed text-[#444444]">
                                That&apos;s when <span className="font-semibold text-black">China Sourcing Co partnered with OneLink Marketing</span> with three main goals:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 generalsans-regular text-base leading-relaxed text-[#444444]">
                                <li>
                                    <span className="font-semibold text-black">Redesign the website</span> with a modern, conversion-optimized layout.
                                </li>
                                <li>
                                    <span className="font-semibold text-black">Build a unified multi-channel marketing strategy</span> to strengthen brand positioning.
                                </li>
                                <li>
                                    <span className="font-semibold text-black">Increase qualified leads</span> while improving cost efficiency and user experience.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. THE CHALLENGES --- */}
            <section className="container mx-auto px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24 items-start">
                        <h2 className="archivo-expanded text-3xl lg:text-4xl font-medium tracking-tight text-[#000A1D]">
                            2. The Challenges
                        </h2>
                        <div className="space-y-4">
                            <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-4">
                                When we started, we identified three major bottlenecks:
                            </p>
                            <div className="space-y-4 generalsans-regular text-base leading-relaxed text-[#444444]">
                                <p>
                                    <span className="font-semibold text-black">1. Website not optimized for conversion:</span> The old site had a cluttered layout and lacked clear CTAs, leading to a high bounce rate and low quote submissions.
                                </p>
                                <p>
                                    <span className="font-semibold text-black">2. Inconsistent brand presence:</span> Messaging, visuals, and tone across social platforms didn&apos;t align with the company&apos;s professional positioning.
                                </p>
                                <p>
                                    <span className="font-semibold text-black">3. Lack of tracking and data insights:</span> There was no proper lead-tracking or analytics system, making it difficult to measure performance or optimize ad spend.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}