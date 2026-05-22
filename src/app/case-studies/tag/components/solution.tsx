"use client"

import Image from "next/image"

function ParallaxStrong({ src, alt, className }: { src: string; alt: string; className?: string }) {
    return (
        <div className={`relative overflow-hidden bg-transparent rounded-3xl ${className}`}>
            <Image src={src} alt={alt} fill className="object-cover" priority />
        </div>
    )
}


export default function SolutionsSection() {
    return (
        <div className="bg-white py-24 mb-20">
            {/* ==================== SOLUTIONS SECTION ==================== */}
            {/* ✅ SOLUTIONS LAYOUT: Xếp dọc, căn trái */}
            <section className="container mx-auto px-6 mb-14 -mt-72 md:-mt-72">
                <div className="max-w-7xl mx-auto flex justify-start">
                    {/* Thay đổi từ lg:w-1/3 thành lg:w-full để có thêm không gian cho văn bản */}
                    <div className="w-full lg:w-full text-left">
                        <h3 className="generalsans-regular text-lg tracking-tight text-[#000A1D]">
                            Phase 1: High-Performance Website Design (The Foundation)
                        </h3>

                        {/* Thay thế <p> cũ bằng nội dung mới từ hình ảnh */}
                        <div className="generalsans-regular text-lg leading-relaxed text-[#444444] space-y-4">
                            <p>
                                We built their complete e-commerce foundation on the Shopify 2.0 platform. This was broken into three key streams:
                            </p>
                            <ul className="list-disc pl-5 space-y-3">
                                <li>
                                    <strong>Technical SEO & Performance:</strong> To ensure the new site was visible from day one, we implemented a complete technical SEO strategy. This included configuring the HTTPS & SSL certificate, optimizing all meta titles and descriptions, and enforcing a clean H1-H2 header structure. We ensured all URLs were search-friendly before submitting the final sitemap to Google Search Console. Critically, we engineered advanced page speed optimization, implementing image compression and lazy loading to achieve sub-second load times.
                                </li>
                                <li>
                                    <strong>Frictionless UX Design:</strong> We conducted a full UX/UI Design process, building all key site pages from scratch: the homepage, product listing pages (with filters), product detail pages, and a streamlined shopping cart and checkout. We applied Tag&apos;s brand identity, color palette, and typography consistently across all templates and implemented subtle animations and hover states to enhance user engagement. This was all validated through rigorous Responsive Design & Testing, including specific Touch-Friendly Optimization for all buttons and navigation.
                                </li>
                                <li>
                                    <strong>Full E-commerce Website Setup:</strong> To bring the design to life, we handled the complete site setup. This involved inputting all website copy and media, uploading the full product catalog with all variants and descriptions, and integrating their chosen payment gateways. We configured the Shopify CMS admin panel for easy product and order management and integrated their entire lead capture and tracking stack, including Google Analytics 4, Meta Pixel, and TikTok Pixel.
                                </li>
                            </ul>

                            {/* Thêm nội dung Phase 2 */}
                            <h3 className="generalsans-regular text-lg tracking-tight text-[#000A1D] mt-8 mb-0">
                                Phase 2: Targeted Landing Pages
                            </h3>
                            <p>
                                To maximize their ad spend right at launch, we designed a suite of high-impact <strong>Landing Pages.</strong> Each page featured a custom layout, <strong>custom UI elements, and micro-interactions</strong> to guide the user flow. We integrated crucial <strong>functionality & tracking</strong> for each campaign, including chat plugins and lead capture forms, ensuring every new visitor was tracked and converted efficiently.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solutions Parallax Grid Section (giữ nguyên) */}
            <section className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ParallaxStrong
                            src="/assets/tag5.png"
                            alt="Tag fitness socks"
                            className="h-[300px] lg:h-[600px]"
                        />
                    <ParallaxStrong
                            src="/assets/tag6.png"
                            alt="Tag fitness socks"
                            className="h-[300px] lg:h-[600px]"
                        />
                    <ParallaxStrong
                            src="/assets/tag7.png"
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
                        <div className="generalsans-regular text-lg leading-relaxed text-[#444444] space-y-0">
                            <p className="mb-8">
                                The new platform was a success from the moment it launched. By building the site correctly from the foundation, we bypassed the typical &quot;growing pains&quot; of a new store.
                            </p>

                            <ul className="list-disc pl-5 space-y-0">
                                <li>
                                    Achieved a Conversion Rate 110% Above Industry Benchmark
                                </li>
                                <li>
                                    From day one, the site&apos;s intuitive UX and speed meant it converted traffic at a rate more than double the apparel industry average.
                                </li>

                                <li>
                                    Secured a Cart Abandonment Rate 45% Below Industry Average
                                </li>
                                <li>
                                    The streamlined, touch-friendly checkout process proved highly effective, retaining customers far better than competing stores.
                                </li>

                                <li>
                                    60% Month-Over-Month Organic Traffic Growth
                                </li>
                                <li>
                                    Our technical SEO-first approach meant the new site began ranking on Google within 30 days, capturing a rapidly growing stream of qualified, free traffic.
                                </li>

                                <li>
                                    Achieved Sub-Second Page Load Times
                                </li>
                                <li>
                                    The site&apos;s performance was in the top tier of all e-commerce stores, establishing a premium brand experience that matched the quality of their products.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto">
                    <ParallaxImage
                        src="/assets/ab5.png"
                        alt="Group of people cheering"
                        className="w-full h-[500px] lg:h-[700px]"
                        speed="-12%"
                    />
                </div>
            </section> */}
        </div>
    )
}