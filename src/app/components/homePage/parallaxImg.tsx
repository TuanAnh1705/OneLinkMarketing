"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import Image from "next/image"

export default function ParallaxImage() {
    const sectionRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    // Giữ nguyên hiệu ứng di chuyển -400px
    const y = useTransform(scrollYProgress, [0, 0.8], [0, -400])
    const smoothY = useSpring(y, { stiffness: 100, damping: 20 })

    return (
        // Responsive negative margin
        <div className="-mt-40 md:-mt-60 lg:-mt-80 relative h-screen overflow-hidden">
            <section
                ref={sectionRef}
                className="relative h-[120vh] flex items-center justify-center bg-white"
            >
                {/*
                  FIX: Căn giữa (justify-center) trên mobile
                  Và căn phải (lg:justify-end) trên desktop
                  Thêm px-4 cho mobile, bỏ đi trên lg (lg:px-0)
                */}
                <div className="flex justify-center lg:justify-end w-full max-w-7xl mx-auto px-4 lg:px-0">
                    
                    {/* Khung chứa ảnh (mask) */}
                    {/*
                      FIX: Đã XÓA 'ml-auto' (để được căn giữa trên mobile)
                      Và THÊM 'lg:ml-auto' (để căn phải lại trên desktop)
                    */}
                    <div
                        className="relative overflow-hidden bg-white/5
                                   w-[90%] h-[350px] -translate-y-12 
                                   md:h-[500px] md:-translate-y-16
                                   lg:ml-auto lg:w-[180%] lg:max-w-[1200px] lg:h-[650px] lg:-translate-y-24 lg:translate-x-24"
                    >
                        {/* ✅ Vẫn giữ h-[250%] để parallax không bị hụt */}
                        <motion.div
                            style={{ y: smoothY }}
                            className="relative w-full h-[250%] -top-[20%]"
                        >
                            <Image
                                src="/assets/section1.jpg"
                                alt="Scroll animation visual"
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        </motion.div>
                    </div>

                </div>
            </section>
        </div>
    )
}