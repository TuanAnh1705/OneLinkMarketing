"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

// --- COMPONENT PARALLAX (Cho Charts/Data) ---
function ParallaxStrong({
    src,
    alt,
    className,
    objectFit = "cover"
}: {
    src: string
    alt: string
    className?: string
    objectFit?: "cover" | "contain"
}) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })
    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])

    return (
        <div ref={ref} className={`relative overflow-hidden bg-transparent ${className}`}>
            <motion.div style={{ y }} className="relative w-full h-[130%] -top-[15%] will-change-transform">
                <Image src={src} alt={alt} fill className={`object-${objectFit}`} />
            </motion.div>
        </div>
    )
}

export default function VNSSolution() {
    return (
        <div className="bg-white pb-16">
            <section className="container mx-auto px-6 mb-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="archivo-expanded text-3xl lg:text-4xl font-medium tracking-tight text-[#000A1D] mb-12">
                        3. Our Solutions
                    </h2>

                    {/* --- 1. Brand Positioning (Static Image) --- */}
                    <div className="mb-20">
                        <h3 className="generalsans-regular text-xl text-[#000A1D] mb-4">
                            1. Brand Positioning & Messaging Framework
                        </h3>
                        <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-4">
                            We started by redefining Vietnam Sourcing Co&apos;s brand narrative—from a simple sourcing agency to “a strategic partner helping global businesses manufacture smarter in Vietnam.”
                        </p>
                        <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-8">
                            This new positioning became the foundation of all marketing communication. It emphasized human connection, transparency, and local expertise, the key values international clients look for when choosing a sourcing partner.
                        </p>

                        {/* vns1.png: Welcome Banner (Creative -> Static) */}
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                            <Image
                                src="/assets/vns2.png"
                                alt="Social Media Visual Identity"
                                fill
                                className="object-contain" // Thay đổi từ object-cover sang object-contain
                            />
                        </div>
                    </div>

                    {/* --- 2. SEO & Website Overhaul (Parallax Image) --- */}
                    <div className="mb-20">
                        <h3 className="generalsans-regular text-xl text-[#000A1D] mb-4">
                            2. SEO & Website Overhaul
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 generalsans-regular text-base leading-relaxed text-[#444444] mb-8">
                            <li>Conducted in-depth keyword research to identify high-value commercial keywords like Vietnam sourcing, product sourcing Vietnam, and manufacturing in Vietnam.</li>
                            <li>Rewrote website content to be clear, search-intent aligned, and professional in tone for global B2B readers.</li>
                            <li>Improved technical SEO, website speed, and internal linking structure.</li>
                            <li>Implemented a strong off-page SEO strategy with authoritative backlinks from global trade and industry sites.</li>
                        </ul>
                        <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-8">
                            Within just 4 months, the website started ranking in Google&apos;s Top 3 (with those important keywords) for highly competitive sourcing-related terms.
                        </p>

                        {/* vns2.png: Keyword Table (Data -> Parallax) */}
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                            <Image
                                src="/assets/vns3.png"
                                alt="Social Media Visual Identity"
                                fill
                                className="object-contain" // Thay đổi từ object-cover sang object-contain
                            />
                        </div>
                    </div>

                    {/* --- 3. Social Media Marketing (Static Image) --- */}
                    <div className="mb-20">
                        <h3 className="generalsans-regular text-xl text-[#000A1D] mb-4">
                            3. Social Media Marketing: Human-Centered Storytelling
                        </h3>
                        <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-4">
                            Our team developed a <span className="font-semibold text-black">human-centered content strategy</span>, highlighting authentic factory stories, manufacturing insights, and local perspectives from Vietnam.
                        </p>
                        <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-4">
                            Each post was crafted to emotionally resonate with business audiences, showing transparency, real people, and real expertise while reinforcing brand trust.
                        </p>
                        <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-16">
                            We also established a cohesive <span className="font-semibold text-black">visual identity system</span> to ensure every post reflected Vietnam Sourcing Co&apos;s brand values of reliability and precision.
                        </p>

                        {/* vns3.png: Social Media Grid (Creative -> Static) */}
                        <ParallaxStrong
                            src="/assets/vns4.png"
                            alt="Website Redesign Banner"
                            className="h-[300px] md:h-[500px] w-full rounded-2xl mb-10"
                        />
                        <ParallaxStrong
                            src="/assets/vns5.png"
                            alt="Website Redesign Banner"
                            className="h-[300px] md:h-[500px] w-full rounded-2xl mb-10"
                        />
                    </div>

                    {/* --- 4. Conversion Optimization (Parallax Image) --- */}
                    <div className="mb-10 md:-mb-10 ">
                        <h3 className="generalsans-regular text-xl text-[#000A1D] mb-4">
                            4. Conversion Optimization & Email Automation
                        </h3>
                        <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-4">
                            We then focused on turning traffic into leads:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 generalsans-regular text-base leading-relaxed text-[#444444] mb-8">
                            <li>Redesigned CTAs and optimized inquiry forms</li>
                            <li>Created an <span className="font-semibold text-black">automated 7-day nurturing funnel</span> for new leads</li>
                            <li>Segmented audiences based on behavior (catalog downloads, inquiry form submissions, link clicks)</li>
                            <li>Personalized follow-up emails to drive engagement</li>
                        </ul>
                        <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-8">
                            This approach steadily increased inbound leads from the <span className="font-semibold text-black">U.S., Australia, and the EU</span>, establishing a sustainable pipeline of qualified prospects.
                        </p>

                        {/* vns4.png: Conversion Funnel (Data -> Parallax) */}
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                            <Image
                                src="/assets/vns6.png"
                                alt="Social Media Visual Identity"
                                fill
                                className="object-contain" // Thay đổi từ object-cover sang object-contain
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}