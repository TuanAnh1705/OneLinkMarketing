"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"

// Hook 'useMediaQuery'
const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const media = window.matchMedia(query);
            if (media.matches !== matches) {
                setMatches(media.matches);
            }
            const listener = () => setMatches(media.matches);
            media.addEventListener('change', listener);
            return () => media.removeEventListener('change', listener);
        }
    }, [matches, query]);
    return matches;
};

export default function SectionWork() {
    const section3Ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: section3Ref,
        offset: ["start start", "end start"],
    })
    const textXRaw = useTransform(scrollYProgress, [0, 0.4], ["56%", "-22%"])
    const textX = useSpring(textXRaw, { stiffness: 60, damping: 20, mass: 1.2 })
    const yearsOpacity = useSpring(useTransform(scrollYProgress, [0.38, 0.42], [1, 0]), { stiffness: 80, damping: 25 })
    const workScale = useSpring(useTransform(scrollYProgress, [0.4, 0.7], [1, 0.3]), { stiffness: 80, damping: 25 })
    const workOpacity = useSpring(useTransform(scrollYProgress, [0.7, 0.85], [1, 0]), { stiffness: 80, damping: 25 })
    const descriptionOpacity = useSpring(useTransform(scrollYProgress, [0.3, 0.5], [1, 0]), { stiffness: 80, damping: 25 })
    const descriptionClip = useTransform(scrollYProgress, [0.3, 0.5], ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 100%)"])

    const isDesktop = useMediaQuery("(min-width: 1024px)");

    return (
        <section ref={section3Ref} className="md:min-h-[250vh] relative px-4 sm:px-8 md:px-16 lg:px-24 top-32 sm:-top-32 md:-top-40">

            {/* ✅ BỎ "pin/sticky" trên mobile */}
            <div className="lg:sticky top-0 md:h-screen flex flex-col items-center justify-center">

                {/* CHỮ CHẠY NGANG */}
                <motion.div
                    style={{
                        x: isDesktop ? textX : undefined,
                        fontFamily: "'Archivo Expanded', sans-serif"
                    }}
                    className="absolute whitespace-nowrap flex items-center justify-center -mt-48 md:-mt-72 lg:-mt-96"
                >
                    <motion.span
                        style={{
                            opacity: isDesktop ? yearsOpacity : 1,
                            scale: isDesktop ? undefined : 1
                        }}
                        className="text-[11vw] lg:text-[15vw] font-bold text-[#000A1D] leading-none tracking-tight"
                    >
                        OUR&nbsp;
                    </motion.span>

                    <motion.span
                        style={{
                            scale: isDesktop ? workScale : 1,
                            opacity: isDesktop ? workOpacity : 1
                        }}
                        className="text-[11vw] lg:text-[15vw] font-bold text-[#000A1D] leading-none tracking-tight"
                    >
                        WORK
                    </motion.span>
                </motion.div>

                {/* FLEXBOX CONTAINER cho DESCRIPTION + BUTTON */}
                <motion.div
                    style={{
                        opacity: isDesktop ? descriptionOpacity : 1,
                        clipPath: isDesktop ? descriptionClip : undefined,
                    }}
                    className="
                        flex flex-col items-center lg:items-end
                        gap-6 lg:gap-8
                        absolute 
                        left-6 right-6 mx-auto
                        -top-10 sm:top-[55vh] md:top-[50vh]
                        lg:bottom-70 lg:top-auto lg:right-24 lg:left-auto lg:mx-0
                        max-w-md
                    "
                >
                    {/* DESCRIPTION */}
                    <div 
                        style={{
                            fontFamily: "'Neulis Alt Regular', sans-serif"
                        }}
                        className="text-center lg:text-left w-full"
                    >
                        <p className="text-lg leading-relaxed text-[#444444]">
                            <span className="font-bold">Onelink Marketing</span> - where strategy, creativity, and execution come together to turn bold ideas into real impact, powered by a global-standard team with exceptional value.
                        </p>
                    </div>

                    {/* BUTTON */}
                    <div
                        style={{
                            fontFamily: "'Neulis Alt Extralight', sans-serif"
                        }}
                        className="shrink-0 md:-translate-x-65"
                    >
                        <Link href="/about">
                            <button className="relative overflow-hidden px-5 py-3.5 rounded-full font-semibold text-xs md:text-sm text-white bg-linear-to-r from-[#0074E5] to-[#162660] transition-colors duration-300 group">
                                <span className="relative z-20 flex items-center justify-center w-full h-full transition-colors duration-500 group-hover:text-[#162660]">
                                    Learn More About Us
                                </span>
                                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-10"></span>
                                <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#444444] transition-colors duration-300 z-10 pointer-events-none"></span>
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}