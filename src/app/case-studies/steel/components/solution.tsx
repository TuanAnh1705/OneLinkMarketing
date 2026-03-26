"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

// Component ParallaxImage độc lập (giữ nguyên)
function ParallaxStrong({
    src,
    alt,
    className,
}: {
    src: string
    alt: string
    className?: string
}) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    // biên độ mạnh
    const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"])

    return (
        <div ref={ref} className={`relative overflow-hidden bg-transparent rounded-3xl ${className}`}>
            <motion.div
                style={{ y }}
                className="relative w-full h-[150%] -top-[25%] will-change-transform"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
        </div>
    )
}


export default function SolutionsSection() {
    return (
        <div className="bg-white py-24 mb-20">
            {/* ==================== PROBLEM SECTION (Phần 3) ==================== */}
            <section className="container mx-auto px-6 mb-14 -mt-40 md:-mt-72">
                <div className="max-w-7xl mx-auto flex justify-start mb-14">
                    <div className="w-full lg:w-full text-left">
                        <h2 className="archivo-expanded text-4xl lg:text-5xl font-medium tracking-tight text-[#000A1D] mb-10">
                            3. The Problem
                        </h2>

                        {/* ✅ SỬA LẠI: Dùng leading-relaxed cho dễ đọc */}
                        <div className="generalsans-regular text-lg leading-relaxed text-[#444444] space-y-4">
                            <p>
                                <strong>Steel Works Seattle</strong> faced a major identity crisis. They had two completely different customer profiles:
                            </p>
                            <ul className="list-decimal pl-5 space-y-3">
                                <li>
                                    Homeowners & Architects: Seeking artisanal, aesthetic products like custom gates, railings, and stairs.
                                </li>
                                <li>
                                    General Contractors & Developers: Needing a reliable, large-scale structural steel fabrication partner for commercial and industrial projects.
                                </li>
                            </ul>
                            <p>
                                Their old website failed to speak to either group. It mixed messages, making large contractors feel SWS was too small (&quot;they just make gates&quot;), while homeowners found SWS too &quot;industrial&quot; and intimidating. Their brand felt fractured, and their website was failing as a business tool.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ==================== SOLUTIONS SECTION (Phần 4) ==================== */}
                <div className="max-w-7xl mx-auto flex justify-start">
                    <div className="w-full lg:w-full text-left">
                        <h2 className="archivo-expanded text-4xl lg:text-5xl font-medium tracking-tight text-[#000A1D] mb-10">
                            4. Our Solution
                        </h2>

                        {/* === ✅ NỘI DUNG MỚI TỪ HÌNH ẢNH === */}
                        {/* Sửa thành leading-relaxed và space-y-6 */}
                        <div className="generalsans-regular text-lg leading-relaxed text-[#444444] space-y-6">
                            <p>
                                OneLink Marketing focuses on creating a single, powerful brand identity delivered through a strategic, custom-designed website.
                            </p>

                            {/* Step 1 */}
                            <div className="space-y-0">
                                <h3 className="font-semibold text-[#000A1D]">Step 1: Unifying the Brand Identity</h3>
                                <p>
                                    First, we solved their messaging problem. We developed a core brand strategy around the concept of &quot;Masterful Steel at Every Scale.&quot; This new identity celebrated their dual expertise, positioning them as a single, sophisticated firm that could handle both intricate custom work and large-scale commercial structures with equal precision.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="space-y-0">
                                <h3 className="font-semibold text-[#000A1D]">Step 2: Designing a Purpose-Driven Website</h3>
                                <p>
                                    We translated this new brand identity into a custom website. The core of our web design was creating two distinct user journeys:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>
                                        From the homepage, users are immediately guided to two clear paths: <strong>&quot;Custom Metalwork&quot;</strong> (for B2C) or <strong>&quot;Commercial Services&quot;</strong> (for B2B).
                                    </li>
                                </ul>
                            </div>

                            {/* Step 3 */}
                            <div className="space-y-0">
                                <h3 className="font-semibold text-[#000A1D]">Step 3: Engineering a Segment-Specific User Experience (UX)</h3>
                                <p>
                                    Our web development and UX design focused on building out these two paths to serve their specific audiences:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>
                                        The <strong>Commercial</strong> section was designed to build trust with B2B clients. It features technical language, highlights their advanced technology (CNC, automated beam lines), and showcases large-scale case studies. The primary call-to-action is &quot;Get a Bid.&quot;
                                    </li>
                                    <li>
                                        The <strong>Retail</strong> section was designed to inspire. It functions as a beautiful, visual portfolio, emphasizing craftsmanship, aesthetics, and the collaborative design process. The primary call-to-action is &quot;Schedule a Consultation.&quot;
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solutions Parallax Grid Section (giữ nguyên) */}
            <section className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ParallaxStrong
                        src="/assets/steel4.png"
                        alt="Tag fitness socks"
                        className="h-[300px] lg:h-[600px]"
                    />
                    <ParallaxStrong
                        src="/assets/steel5.png"
                        alt="Tag fitness socks"
                        className="h-[300px] lg:h-[600px]"
                    />
                    <ParallaxStrong
                        src="/assets/steel6.png"
                        alt="Tag fitness socks"
                        className="h-[300px] lg:h-[600px]"
                    />
                </div>
            </section>

            {/* ==================== RESULTS SECTION ==================== */}
            {/* ✅ RESULTS LAYOUT: Xếp dọc, căn trái */}
            {/* <section className="container mx-auto px-3 mt-20 mb-16">
                <div className="max-w-7xl mx-auto flex justify-start">
                    <div className="w-full lg:w-full text-left">
                        <h2 className="archivo-expanded text-4xl lg:text-5xl font-medium tracking-tight text-[#000A1D] mb-10">
                            5. The Results
                        </h2>
                        <div className="generalsans-regular text-base leading-relaxed text-[#444444] space-y-0">
                            <p className="mb-6">
                                The new, cohesive brand identity and custom website completely transformed their market position.
                            </p>

                            <ul className="list-disc pl-5 space-y-0 mb-6">
                                <li>
                                    <strong>45% increase</strong> in qualified bids for large-scale commercial projects, a direct result of the new, clear B2B user path and professional brand image.
                                </li>
                                <li>
                                    <strong>60% increase</strong> in consultation requests for custom metalwork, driven by the new, inspiring portfolio design.
                                </li>

                                <li>
                                    A significant <strong>increase in user engagement</strong> (time-on-page), indicating that visitors were no longer confused and were now finding the exact information they needed.
                                </li>
                                <li>
                                    <strong>Positive Brand Feedback:</strong> SWS reported a major improvement in brand perception. Contractors now view them as a high-capability partner, and homeowners feel confident approaching them for premium custom projects.
                                </li>
                            </ul>
                            <p>The SWS sales team now uses the new website as their primary presentation tool to close major contracts, demonstrating the site&apos;s value as a core business asset.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto">
                    <ParallaxImage
                        src="/assets/steel7.jpg"
                        alt="Group of people cheering"
                        className="w-full h-[500px] lg:h-[700px]"
                        speed="-12%"
                    />
                </div>
            </section> */}
        </div>
    )
}