"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

const BlogSection = () => {
    const [offsetY, setOffsetY] = useState(0)
    const image1Ref = useRef<HTMLDivElement>(null)
    const image2Ref = useRef<HTMLDivElement>(null)
    const image3Ref = useRef<HTMLDivElement>(null)

    const handleScroll = () => setOffsetY(window.pageYOffset)

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const getParallaxOffset = (ref: React.RefObject<HTMLDivElement | null>, speed: number) => {
        if (!ref.current) return 0
        const rect = ref.current.getBoundingClientRect()
        const elementTop = rect.top + window.pageYOffset
        const scrolled = offsetY - elementTop + window.innerHeight
        return scrolled * speed
    }


    const imageUrl = "/assets/hero.jpg"

    return (
        <div className="bg-white font-sans text-gray-800">
            {/* --- Header Section (Wider width) --- */}
            <div className="max-w-7xl mx-auto px-6 pt-16">
                <header className="max-w-3xl mb-12">
                    <h1 className="archivo-expanded text-4xl md:text-5xl font-medium leading-tight mb-2">
                        Various ideas and creative concepts based on market research
                    </h1>
                    <p className="text-gray-500">By Olma - 2025</p>
                </header>
            </div>

            {/* --- Parallax Image Section (Full-width) --- */}
            <div className="relative h-[900px] w-full overflow-hidden shadow-xl my-12">
                <div
                    className="absolute top-0 left-0 w-full h-[1500px] bg-gray-200 bg-no-repeat bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        transform: `translateY(${-100 + offsetY * 0.4}px)`,
                        willChange: "transform",
                    }}
                ></div>
            </div>

            {/* --- Main Content & Footer (Wider width) --- */}
            <div className="max-w-7xl mx-auto px-6 pb-16">
                <main className="space-y-20 text-[#000A1D] leading-relaxed">
                    <p className="neulis-alt-regular font-medium text-lg">
                        Myriam was first trained as a sculptor in Montreal and then in Helsinki, Finland. She is now based in Quebec
                        but works on site on all kinds of projects. She has developed her own practice of creating large-scale works
                        in situ that are temporary by their nature and perfectly inscribed places as well as her more vibrant pocket
                        universe. Striking power-studded appliques down side ribs for dominating and unique edge single breasted
                        jacket. There are quilted inserts along a business would consider it finished.
                    </p>

                    {/* --- Typography Hierarchy Section --- */}
                    <section>
                        <h2 className="archivo-expanded text-4xl font-medium text-[#000A1D] mb-6">Typography Hierarchy</h2>
                        <p className="neulis-alt-regular text-lg mb-8 font-medium text-[#000A1D]">
                            Always ready to push the boundaries, especially when it comes to our own platform. Our analytical eye to
                            create a site that has a minimum design but maximum performance. It also perfectly reflects the journey to
                            help it tell a story to increase its understanding and drive action.
                        </p>
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <div ref={image1Ref} className="relative overflow-hidden rounded-lg h-[400px]">
                                <img
                                    src="/assets/steel.jpg"
                                    alt="Typography hierarchy visual"
                                    className="w-full h-[700px] object-cover"
                                    style={{
                                        transform: `translateY(${-100 + getParallaxOffset(image1Ref, 0.1)}px)`,
                                        willChange: "transform",
                                    }}
                                />
                            </div>
                            <div className="neulis-alt-regular font-medium space-y-5 text-lg text-[#000A1D]">
                                <p>
                                    Beckoning a diverse audience of food lovers who appreciate both the time-honored traditions of Italian
                                    cuisine and the thrill of innovation. Its personality sets this brand apart, making its own statement.
                                    Here we are, where food is part of the family. We love to bring designs to life in a digital
                                    environment. So for designers proper tools and tools are necessary.
                                </p>
                                <p>
                                    Hex-mesh panels placed to hidden midfoot runs for support firm hold strong power mesh front liner
                                    provides for stability. Lined pockets on the side, the body large pocket at the front full button
                                    detail a versatile shirt that can be styled to your needs primary colors of the brands palette. Visual
                                    hierarchy a key principle of smart design success. A digital tool that lets you explore possibilities
                                    and lay out digital elements logically and strategically on a page.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* --- Visual Hierarchy Section --- */}
                    <section>
                        <h2 className="archivo-expanded text-4xl font-medium text-[#000A1D] mb-6">Visual Hierarchy</h2>
                        <div className="neulis-alt-regular font-medium prose max-w-none text-lg text-[#000A1D]">
                            <p>
                                We had observers go into the workplace and we timed people&apos;s activities (to the second). We&apos;ve been to
                                various workplaces for several years to see &quot;how a day in the life&quot; unfolds for them. We had observers
                                shadow each person for three and a half days each and timed every activity to the second.
                            </p>

                            <ul className="pl-5 space-y-2 list-disc mt-4">
                                <li>Create the wireframes here</li>
                                <li>Discuss the wireframes thoroughly</li>
                                <li>Refine them</li>
                                <li>Shopify Development</li>
                            </ul>

                            <p className="mt-4">
                                Achieving deep work should be our goal in any team, but doing it in an office setting can be challenging
                                because of so many distractions. It&apos;s a method where we observe from a psychological perspective. The
                                method for user shadowing entails many interesting details, so I&apos;ll &quot;jump&quot; into the subject right away.
                                My goal consists of several points: thus, girls can be cheerleaders and athletes. And girls can be both
                                when you feel empowered to be both. Girls can be both. We needed to create an easily digestible help
                                section where users could learn more about the more complex workflows. Let&apos;s go and do that!
                            </p>
                        </div>
                    </section>

                    {/* --- UX Principal Section --- */}
                    <section>
                        <h2 className="archivo-expanded text-4xl medium text-[#000A1D] mb-6">UX Principal</h2>
                        <p className="neulis-alt-regular font-medium mb-8 text-lg text-[#000A1D]">
                            Always ready to push the boundaries, especially when it comes to our own platform. Our analytical eye to
                            create a site that has minimum design but maximum performance. It also perfectly reflects the journey to
                            help it tell a story to increase its understanding and drive action.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div ref={image2Ref} className="relative overflow-hidden rounded-lg h-[400px]">
                                <img
                                    src="/assets/tag.png"
                                    alt="UX principal visual 1"
                                    className="w-full h-[700px] object-cover"
                                    style={{
                                        transform: `translateY(${-100 + getParallaxOffset(image2Ref, 0.08)}px)`,
                                        willChange: "transform",
                                    }}
                                />
                            </div>
                            <div ref={image3Ref} className="relative overflow-hidden rounded-lg h-[400px]">
                                <img
                                    src="/assets/steel.jpg"
                                    alt="UX principal visual 2"
                                    className="w-full h-[700px] object-cover"
                                    style={{
                                        transform: `translateY(${-100 + getParallaxOffset(image3Ref, 0.08)}px)`,
                                        willChange: "transform",
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                </main>

                {/* --- Footer --- */}
                <footer className="mt-24 pt-1 flex items-center space-x-4 text-sm">
                    <span className="neulis-alt-regular font-medium text-[#000A1D]">Tags:</span>
                    <span className="neulis-alt-regular font-medium text-[#444444] border border-gray-300 rounded-full px-4 py-1">Agency</span>
                    <span className="neulis-alt-regular font-medium text-[#444444] border border-gray-300 rounded-full px-4 py-1">Digital</span>
                </footer>
            </div>
        </div>
    )
}

export default BlogSection