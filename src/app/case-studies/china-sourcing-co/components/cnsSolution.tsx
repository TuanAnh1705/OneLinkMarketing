"use client"

import Image from "next/image"

function ParallaxStrong({ src, alt, className, objectFit = "cover" }: { src: string; alt: string; className?: string; objectFit?: "cover" | "contain" }) {
    return (
        <div className={`relative overflow-hidden bg-transparent ${className}`}>
            <Image src={src} alt={alt} fill className={`object-${objectFit}`} />
        </div>
    )
}

export default function CNSSolution() {
    return (
        <div className="bg-white pb-16">
            {/* Header */}
            <section className="container mx-auto px-6 mb-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="archivo-expanded text-3xl lg:text-4xl font-medium tracking-tight text-[#000A1D] mb-4">
                        3. Our Solutions
                    </h2>
                    <p className="generalsans-regular text-base leading-relaxed text-[#444444]">
                        After a full audit of China Sourcing Co&apos;s digital ecosystem, we built a five-phase roadmap to reconstruct their online presence and marketing foundation.
                    </p>
                </div>
            </section>

            {/* --- 1. Website Redesign --- */}
            <section className="container mx-auto px-6 mb-16">
                <div className="max-w-7xl mx-auto">
                    <h3 className="generalsans-regular text-lg text-[#000A1D] mb-2">
                        1. Website Redesign & Conversion Rate Optimization (CRO)
                    </h3>
                    <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-8">
                        The core of the project was a complete website redesign — transforming it from a static company page into a conversion-driven digital engine.
                    </p>

                    {/* Banner Image - Parallax Mạnh */}
                    <ParallaxStrong
                        src="/assets/cns2.png"
                        alt="Website Redesign Banner"
                        className="h-[300px] md:h-[500px] w-full rounded-2xl mb-10"
                    />

                    {/* Lists */}
                    <div className="mb-8">
                        <p className="generalsans-regular text-base text-[#000A1D] mb-3">
                            Our approach included:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 generalsans-regular text-base leading-relaxed text-[#444444]">
                            <li>A modern, minimalist interface emphasizing professionalism and sourcing expertise.</li>
                            <li>Restructured content flow following a clear conversion funnel (Awareness → Consideration → Action).</li>
                            <li>Strategic <span className="font-semibold text-black">call-to-action placements</span> such as &quot;Get a Quote&quot; and &quot;Talk to a Sourcing Expert&quot;.</li>
                            <li>Mobile-first, high-speed UX design optimized for B2B engagement.</li>
                            <li><span className="font-semibold text-black">A/B testing</span> on landing pages to find the best-performing layouts.</li>
                            <li>Integrated <span className="font-semibold text-black">analytics stack</span> (GA4, Tag Manager) for real-time tracking.</li>
                        </ul>
                    </div>

                    <div className="mb-1 md:mb-10">
                        <p className="generalsans-regular text-base text-[#000A1D] mb-2">
                            Result:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 generalsans-regular text-base leading-relaxed text-[#444444]">
                            <li>The redesigned site increased user engagement and improved navigation clarity.</li>
                            <li>&quot;Get a Quote&quot; submissions rose by <span className="font-semibold text-black">192%</span> within the first 90 days.</li>
                        </ul>
                    </div>

                    {/* Charts Grid - Parallax Mạnh */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:mb-16 -mb-20 pl-0">
                        <div className="relative h-[350px] w-full rounded-xl overflow-hidden">
                            <Image
                                src="/assets/cns3.png"
                                alt="Traffic Chart"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="relative h-[350px] w-full rounded-xl overflow-hidden">
                            <Image
                                src="/assets/cns4.png"
                                alt="Conversion Chart"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>


                </div>
            </section>

            {/* --- 2. SEO & Content Strategy --- */}
            <section className="container mx-auto px-6 mb-12">
                <div className="max-w-7xl mx-auto">
                    <h3 className="generalsans-regular text-lg text-[#000A1D] mb-3">
                        2. SEO & Content Strategy
                    </h3>
                    <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-4">
                        To build sustainable organic growth, we implemented a <span className="font-semibold text-black">6-month SEO roadmap</span> covering:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 generalsans-regular text-base leading-relaxed text-[#444444] mb-6">
                        <li>In-depth keyword research targeting sourcing, manufacturing, and logistics.</li>
                        <li>Full <span className="font-semibold text-black">on-page optimization</span> (meta, internal linking, schema markup).</li>
                        <li>Creation of <span className="font-semibold text-black">content pillars</span> like: &quot;Vietnam vs China Sourcing,&quot; &quot;How to Find Reliable Suppliers.&quot;</li>
                        <li><span className="font-semibold text-black">Off-page link building</span> through digital PR and guest posts.</li>
                    </ul>

                    <p className="generalsans-regular text-base text-[#000A1D] mb-2">Result:</p>
                    <ul className="list-disc pl-5 space-y-1 generalsans-regular text-base leading-relaxed text-[#444444]">
                        <li>Organic traffic increased <span className="font-semibold text-black">2.4x.</span></li>
                        <li>Top 10 keyword rankings rose by <span className="font-semibold text-black">110%</span> within 3 months.</li>
                    </ul>
                </div>
            </section>

            {/* --- 3. Social Media Marketing --- */}
            <section className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto">
                    <h3 className="generalsans-regular text-lg text-[#000A1D] mb-3">
                        3. Social Media Marketing
                    </h3>
                    <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-4">
                        We redefined <span className="font-semibold text-black">brand voice and visual identity</span> for LinkedIn, Facebook, and X (Twitter).
                    </p>
                    <p className="generalsans-regular text-base text-[#000A1D] mb-2">Execution:</p>
                    <ul className="list-disc pl-5 space-y-2 generalsans-regular text-base leading-relaxed text-[#444444] mb-6">
                        <li>Built a 3-month content calendar focused on Factory Insights, Client Stories, and Industry Trends.</li>
                        <li>Designed cohesive post templates and storytelling visuals.</li>
                    </ul>
                    <p className="generalsans-regular text-base text-[#000A1D] mb-2">Result:</p>
                    <ul className="list-disc pl-5 space-y-1 generalsans-regular text-base leading-relaxed text-[#444444]">
                        <li>Engagement rate improved by <span className="font-semibold text-black">145%.</span></li>
                        <li>Significant rise in inbound inquiries from <span className="font-semibold text-black">US, Australia, and Europe.</span></li>
                    </ul>
                </div>
            </section>
        </div>
    )
}