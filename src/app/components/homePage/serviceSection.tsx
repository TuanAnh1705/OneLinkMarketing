"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link" // <-- THÊM IMPORT NÀY

gsap.registerPlugin(ScrollTrigger)

export default function ServiceSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const textGroupRef = useRef<HTMLDivElement>(null)
    const blackLinesRef = useRef<HTMLDivElement[]>([])
    const gradientLinesRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            let scrollVelocity = 0
            let lastScrollY = 0
            let velocityCheckInterval: NodeJS.Timeout

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=2500",
                    scrub: 0.5,
                    pin: true,
                    onUpdate: (self) => {
                        const currentScrollY = self.scroll()
                        scrollVelocity = Math.abs(currentScrollY - lastScrollY)
                        lastScrollY = currentScrollY
                    },
                },
            })

            blackLinesRef.current.forEach((line, i) => {
                const baseDuration = 1.4
                const speedMultiplier = i * 0.3

                tl.to(
                    [line, gradientLinesRef.current[i]],
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        ease: "power2.inOut",
                        duration: baseDuration + speedMultiplier,
                    },
                    i === 0 ? "+=0.2" : `<${i * 0.15}`
                )
            })

            tl.to(
                textGroupRef.current,
                {
                    scale: 28,
                    yPercent: -15,
                    opacity: 0,
                    transformOrigin: "center center",
                    ease: "expo.out",
                    duration: 3,
                },
                "+=0.5"
            )

            tl.to(
                containerRef.current,
                {
                    backgroundColor: "#000A1D",
                    duration: 2.8,
                    ease: "power2.inOut",
                },
                "<"
            )
        }, containerRef)

        return () => ctx.revert()
    }, [])

    const services = [
        {
            title: "Strategy \n Consulting",
            desc: "Laying the strategic \n foundation with brand \n audits and market research.",
        },
        {
            title: "Digital Asset \n Development",
            desc: "Building your core brand \n identity and creating SEO/ \n UX-optimized websites.",
        },
        {
            title: "SEO \n Services",
            desc: "Driving organic traffic and \n sustainable growth with \n on-page and off-page SEO.",
        },
        {
            title: "Paid Media \n & Advertising",
            desc: "Optimizing multi-channel ad \n campaigns for maximum ROI \n and lead generation.",
        },
        {
            title: "Social Media \n Management",
            desc: "Building and engaging your \n community with consistent \n and high-quality content.",
        },
    ]

    return (
        <>
            {/* SECTION 1 (Giữ nguyên) */}
            <section
                ref={containerRef}
                className="relative flex justify-center items-center overflow-hidden h-screen bg-white -top-40 md:-top-60 lg:-top-80"
            >
                <div
                    ref={textGroupRef}
                    className="fixed top-[45%] md:top-[40%] lg:top-[38%] z-10 flex flex-col justify-center items-center text-center leading-tight pointer-events-none archivo-expanded font-medium text-[clamp(36px,7vw,90px)]"
                >
                    {/* LAYER 1: Xám nền */}
                    <div className="text-gray-300">
                        <div>
                            From <span>Strategy</span> to
                        </div>
                        <div>
                            <span>Performance Growth</span>
                        </div>
                    </div>

                    {/* LAYER 2: Chữ đen */}
                    <div className="absolute text-black">
                        {["From Strategy to", "Performance Growth"].map((text, i) => (
                            <div
                                key={i}
                                ref={(el) => {
                                    if (el) blackLinesRef.current[i] = el
                                }}
                                style={{ clipPath: "inset(0% 100% 0% 0%)" }}
                            >
                                {text}
                            </div>
                        ))}
                    </div>

                    {/* LAYER 3: Gradient không viền đen */}
                    <div className="absolute text-transparent">
                        {[
                            {
                                text: (
                                    <>
                                        <span className="bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent">
                                            From Strategy
                                        </span>{" "}
                                        to
                                    </>
                                ),
                                key: "layer2",
                            },
                            {
                                text: (
                                    <span className="bg-gradient-to-r from-[#162660] to-[#0074E5] bg-clip-text text-transparent">
                                        Performance Growth
                                    </span>
                                ),
                                key: "layer3",
                            },
                        ].map((item, i) => (
                            <div
                                key={item.key}
                                ref={(el) => {
                                    if (el) gradientLinesRef.current[i] = el
                                }}
                                style={{
                                    clipPath: "inset(0% 100% 0% 0%)",
                                    WebkitFontSmoothing: "antialiased",
                                    MozOsxFontSmoothing: "grayscale",
                                    textShadow: "none",
                                    filter: "none",
                                    mixBlendMode: "normal",
                                    WebkitTextStroke: "0px transparent",
                                }}
                            >
                                {item.text}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 2 (ĐÃ CẬP NHẬT VỚI <Link>) */}
            <section className="relative -translate-y-[5vh] text-white bg-[#000A1D] z-40 -top-40 md:-top-60 lg:-top-80">
                <div className="flex flex-col w-full relative overflow-visible">
                    {/* LINE ĐẦU */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#002B6D] via-[#162660] to-[#0074E5] opacity-90 shadow-[0_0_12px_rgba(0,116,229,0.5)] z-50" />
                    
                    {/* ✅ FIX: THAY ĐỔI TỪ services.map((...) => (...)) THÀNH services.map((...) => { ... return ... }) */}
                    {services.map((item, index) => {
                        
                        // ✅ FIX: Tạo href bằng logic giống hệt Navbar
                        // Regex \s+ sẽ xử lý cả dấu cách và dấu \n (xuống dòng)
                        const href = `/service/${item.title
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`

                        return (
                            // ✅ FIX: Bọc toàn bộ div bằng <Link> và gán href
                            // Di chuyển key={item.title} và các className ra <Link>
                            <Link
                                key={item.title}
                                href={href}
                                className="relative w-full flex justify-center items-center overflow-visible group"
                            >
                                {/* NỀN DƯỚI */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#002B6D] via-[#162660] to-[#0074E5]" />
                                
                                {/* NỘI DUNG */}
                                <div className="relative z-10 bg-[#000A1D] transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] flex items-start gap-10 py-12 md:py-16 lg:py-20 w-full group-hover:rounded-l-[110px] group-hover:rounded-r-[110px]">
                                    <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-16 lg:gap-10 px-6 lg:pl-[10rem] lg:pr-20 w-full">
                                        <h2 className="text-4xl md:text-5xl lg:text-7xl text-white leading-[1.15] whitespace-pre-line flex-1 lg:translate-x-16 neulis-alt-extralight font-bold">
                                            {item.title}
                                        </h2>
                                        
                                        <p className="flex-1 max-w-xl text-lg lg:text-xl leading-relaxed whitespace-pre-line lg:translate-x-40 lg:translate-y-6 neulis-alt-extralight">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* LINE NGĂN */}
                                {index !== services.length - 1 && (
                                    <div className="absolute -bottom-[1.5px] left-0 w-full h-[2px] bg-gradient-to-r from-[#002B6D] via-[#162660] to-[#0074E5] opacity-90 shadow-[0_0_12px_rgba(0,116,229,0.5)] z-50" />
                                )}
                            </Link> // <-- Đóng thẻ Link
                        )
                    })}
                    
                    {/* LINE DƯỚI */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#002B6D] via-[#162660] to-[#0074E5] opacity-90 shadow-[0_0_12px_rgba(0,116,229,0.5)] z-50" />
                </div>
            </section>
        </>
    )
}