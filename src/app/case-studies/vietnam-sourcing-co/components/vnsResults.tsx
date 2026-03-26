"use client"
import Image from "next/image"


export default function VNSResults() {
    return (
        <div className="bg-white/0 py-16 mb-10 md:mb-0">
            <section className="container mx-auto px-6 mb-20">
                <div className="max-w-7xl mx-auto">
                    {/* --- 4. KEY RESULTS --- */}
                    <h2 className="archivo-expanded text-3xl lg:text-4xl font-medium tracking-tight text-[#000A1D] mb-6">
                        4. Key Results
                    </h2>
                    <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-6">
                        After 4 months of implementation, Vietnam Sourcing Co achieved measurable growth:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 generalsans-regular text-base leading-relaxed text-[#444444] mb-8">
                        <li><span className="font-semibold text-black">+187% organic traffic growth</span></li>
                        <li><span className="font-semibold text-black">Top 1 Google rankings</span> for “Vietnam sourcing company” and “product sourcing in Vietnam”</li>
                        <li><span className="font-semibold text-black">Steady inbound leads</span> from verified international buyers (U.S., Australia, EU)</li>
                        <li><span className="font-semibold text-black">+45% session duration</span> and <span className="font-semibold text-black">-30% bounce rate</span>, showing stronger engagement</li>
                    </ul>
                    <p className="generalsans-regular text-base leading-relaxed text-[#444444] mb-12">
                        <span className="font-semibold text-black">Boosted brand authority</span>, positioning Vietnam Sourcing Co as a credible global sourcing partner
                    </p>

                    {/* vns5.png: Active Users Line Chart (Data -> Parallax) */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden -mb-20">
                        <Image
                            src="/assets/vns7.png"
                            alt="Social Media Visual Identity"
                            fill
                            className="object-contain" // Thay đổi từ object-cover sang object-contain
                        />
                    </div>
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden -mb-18">
                        <Image
                            src="/assets/vns8.png"
                            alt="Social Media Visual Identity"
                            fill
                            className="object-contain" // Thay đổi từ object-cover sang object-contain
                        />
                    </div>
                    {/* vns7.png */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                        <Image
                            src="/assets/vns9.png"
                            alt="Social Media Visual Identity"
                            fill
                            className="object-contain" // Thay đổi từ object-cover sang object-contain
                        />
                    </div>

                    {/* --- TESTIMONIAL --- */}
                    <div className=" p-8 md:p-12 rounded-2xl mb-20">
                        <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
                            <div>
                                <p className="archivo-expanded  text-xl text-[#000A1D]">Bheki,</p>
                                <p className="archivo-expanded text-xl text-[#000A1D]">General Manager</p>
                            </div>
                            <div className="border-l-2 border-gray-300 pl-6">
                                <p className="generalsans-regular text-lg italic text-[#444444] leading-relaxed">
                                    “Before working with the agency, we were doing great work but nobody knew about it online. Now, our content and SEO strategy consistently bring in the right leads and help us tell the Vietnam sourcing story the way it deserves to be told.”
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- 5. KEY TAKEAWAY --- */}
                    <div>
                        <h2 className="archivo-expanded text-3xl lg:text-4xl font-medium tracking-tight text-[#000A1D] mb-6">
                            5. Key Takeaway
                        </h2>
                        <ul className="list-disc pl-5 space-y-4 generalsans-regular text-base leading-relaxed text-[#444444] mb-8">
                            <li>
                                The partnership between <span className="font-semibold text-black">OneLink Marketing</span> and <span className="font-semibold text-black">Vietnam Sourcing Co</span> demonstrates how a strategic, full-funnel marketing approach can <span className="font-semibold text-black">turn operational expertise into brand power.</span>
                            </li>
                            <li>
                                By combining <span className="font-semibold text-black">SEO, content, social media, and conversion optimization</span>, we helped Vietnam Sourcing Co not only attract visibility but convert it into business growth.
                            </li>
                            <li>
                                Today, the company stands as one of <span className="font-semibold text-black">Vietnam&apos;s most trusted sourcing partners</span> for global buyers, with a digital presence that truly reflects its value.
                            </li>
                        </ul>
                        <p className="generalsans-regular text-base text-[#666666] mt-8">
                            OneLink Marketing – We don&apos;t just do marketing.<br />
                            We build ecosystems that connect great businesses with the world.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}