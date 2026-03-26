"use client"

import { useState, useEffect } from "react"

export default function ParallaxImage() {
    const [offsetY, setOffsetY] = useState(0)

    const handleScroll = () => setOffsetY(window.pageYOffset)

    useEffect(() => {
        const checkWidthAndAddListener = () => {
            const isDesktop = window.innerWidth >= 768 // 'md' breakpoint

            if (isDesktop) {
                window.addEventListener("scroll", handleScroll)
            } else {
                window.removeEventListener("scroll", handleScroll)
            }
        }

        checkWidthAndAddListener()
        window.addEventListener("resize", checkWidthAndAddListener)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", checkWidthAndAddListener)
        }
    }, [])

    return (
        <div className="relative md:h-screen z-0 isolate mt-5 md:-mt-[40vh]">
            <section className="relative md:h-[120vh] flex items-center justify-center overflow-hidden">
                <div className="flex justify-center lg:justify-end w-full max-w-7xl mx-auto px-4 lg:px-0">
                    <div
                        className="relative overflow-hidden bg-white/5
                                   w-full h-87.5 -translate-y-12 
                                   md:h-125 md:-translate-y-16
                                   lg:ml-auto lg:w-full lg:max-w-300 lg:h-170 lg:-translate-y-24 lg:translate-x-10"
                    >
                        {/* PARALLAX IMAGE - Approach từ BlogSection */}
                        <div
                            className="absolute top-0 left-0 w-full h-[130%] bg-white bg-no-repeat bg-contain md:bg-cover bg-center translate-y-15 md:-translate-y-5"
                            style={{
                                backgroundImage: `url(/assets/section1.png)`,
                                transform: `translateY(${-130 + offsetY * 0.3}px)`,
                                willChange: "transform",
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}