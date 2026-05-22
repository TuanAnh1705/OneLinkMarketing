"use client"

import Image from "next/image"

function ParallaxStrong({ src, alt, className }: { src: string; alt: string; className?: string }) {
    return (
        <div className={`relative overflow-hidden bg-transparent ${className}`}>
            <Image src={src} alt={alt} fill className="object-contain" />
        </div>
    )
}

export default function CNSResults() {
    return (
        <div className="bg-white py-16 md:-mt-16 -mt-20 mb-10 md:mb-0">
            {/* --- GRID OF 6 VISUAL CARDS --- */}
            <section className="container mx-auto px-6 mb-20">
                <div className="max-w-7xl mx-auto">

                    {/* BEFORE LABEL */}
                    <h2 className="archivo-expanded text-xl md:text-2xl font-medium text-[#000A1D] mb-4 text-left">
                        Before
                    </h2>

                    {/* FIRST 3 IMAGES */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {[
                            "/assets/cns5.png",
                            "/assets/cns6.png",
                            "/assets/cns7.png",
                        ].map((src, i) => (
                            <ParallaxStrong
                                key={i}
                                src={src}
                                alt={`Before Visual ${i + 1}`}
                                className="aspect-3/4 rounded-2xl"
                            />
                        ))}
                    </div>

                    {/* AFTER LABEL */}
                    <h2 className="archivo-expanded text-xl md:text-2xl font-medium text-[#000A1D] mb-4 text-left">
                        After
                    </h2>

                    {/* LAST 3 IMAGES */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            "/assets/cns8.png",
                            "/assets/cns9.png",
                            "/assets/cns10.png",
                        ].map((src, i) => (
                            <ParallaxStrong
                                key={i}
                                src={src}
                                alt={`After Visual ${i + 1}`}
                                className="aspect-3/4 rounded-2xl"
                            />
                        ))}
                    </div>

                </div>
            </section>
            {/* --- 4. EMAIL MARKETING --- */}
            <section className="container mx-auto px-6 md:mb-16 -mb-32">
                <div className="max-w-7xl mx-auto">
                    <h3 className="generalsans-regular text-lg text-[#000A1D] mb-4">
                        4. Email Marketing & Lead Nurturing
                    </h3>
                    <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-4">
                        To maximize conversion potential, we developed a <span className="font-semibold text-black">targeted email nurture flow</span> that guided leads through every stage of decision-making.
                    </p>

                    <p className="generalsans-regular text-base text-[#000A1D] mb-2">
                        Actions taken:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 generalsans-regular text-base leading-relaxed text-[#444444] -mb-36 md:mb-8">
                        <li>Automated <span className="font-semibold text-black">welcome + sourcing guide + case study</span> email flow.</li>
                        <li>Segmented leads into hot, warm, and cold tiers for personalization.</li>
                        <li>Redesigned email templates consistent with the new website design.</li>
                    </ul>

                    {/* Chart Image Wide */}
                    <div className="relative h-[650px] w-full rounded-xl overflow-hidden">
                        <Image
                            src="/assets/cns11.png"
                            alt="Conversion Chart"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* --- 4. REPORTING --- */}
            <section className="container mx-auto px-6 -mb-36 md:mb-16">
                <div className="max-w-7xl mx-auto">
                    <h3 className="generalsans-regular text-lg text-[#000A1D] mb-4">
                        4. Reporting & Performance Insights
                    </h3>
                    <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-6">
                        Transparency and agility were key to this partnership. We created a live dashboard consolidating data from all channels to monitor daily performance.
                    </p>

                    <p className="generalsans-regular text-base text-[#000A1D] mb-2">
                        What we delivered:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 generalsans-regular text-base leading-relaxed text-[#444444] -mb-34 md:mb-8">
                        <li>Real-time tracking of traffic, leads, and conversion costs.</li>
                        <li>Weekly performance reviews and creative adjustments.</li>
                        <li>Quarterly executive reports to measure ROI.</li>
                    </ul>

                    {/* Analytics Dashboard Image */}
                    <div className="relative h-[650px] w-full rounded-xl overflow-hidden">
                        <Image
                            src="/assets/cns12.png"
                            alt="Conversion Chart"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* --- 4. KEY RESULTS --- */}
            <section className="container mx-auto px-6 mb-16">
                <div className="max-w-7xl mx-auto">
                    <h2 className="archivo-expanded text-3xl lg:text-4xl font-medium tracking-tight text-[#000A1D] mb-6">
                        4. Key Results
                    </h2>
                    <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-6">
                        Within just 90 days, China Sourcing Co saw measurable growth across every key performance metric.
                    </p>
                    <div className="space-y-4 generalsans-regular text-base leading-relaxed text-[#444444]">
                        <p>
                            The new website redesign alone drove a <span className="font-semibold text-black">192% increase in conversion rate</span>, rising from 1.2% to 3.5%. Organic traffic also surged by <span className="font-semibold text-black">240%</span> thanks to a well-structured SEO strategy.
                        </p>
                        <p>
                            On social media, engagement on LinkedIn grew by <span className="font-semibold text-black">145%</span>. User behavior metrics improved with <span className="font-semibold text-black">average session duration</span> increasing from 38s to 1m 4s.
                        </p>
                        <p>
                            Meanwhile, the new <span className="font-semibold text-black">email marketing flow</span> helped re-engage cold leads, achieving a <span className="font-semibold text-black">30% reactivation rate</span>.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- 5. CONCLUSION --- */}
            <section className="container mx-auto px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="archivo-expanded text-3xl lg:text-4xl font-medium tracking-tight text-[#000A1D] mb-6">
                        5. Conclusion
                    </h2>
                    <div className="space-y-6 generalsans-regular text-base leading-relaxed text-[#444444]">
                        <p>
                            <span className="font-semibold text-black">China Sourcing Co&apos;s</span> project demonstrates how a <span className="font-semibold text-black">data-driven redesign</span> combined with a multi-channel strategy can accelerate real business growth.
                        </p>
                        <p>
                            Through OneLink Marketing&apos;s blend of <span className="font-semibold text-black">creative direction, performance tracking, and ongoing optimization</span>, China Sourcing Co transformed its digital presence into a trusted sourcing platform with measurable ROI.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}