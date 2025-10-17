"use client"
import { motion } from "framer-motion"

export default function MarqueeLogos() {
    const logos = Array(12).fill("Google")

    return (
        <div className="relative mt-40 w-full h-[100px] overflow-hidden">
            <motion.div
                className="flex gap-12"
                animate={{ x: [0, -1440] }}
                transition={{
                    x: {
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        duration: 25,
                        ease: "linear",
                    },
                }}
            >
                {logos.concat(logos).map((_, i) => (
                    <div key={i} className="flex-shrink-0 opacity-30 grayscale">
                        <svg
                            className="h-8 w-24"
                            viewBox="0 0 272 92"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <text
                                x="50%"
                                y="50%"
                                dominantBaseline="middle"
                                textAnchor="middle"
                                fill="#9AA0A6"
                                fontSize="48"
                                fontFamily="Arial, sans-serif"
                                fontWeight="bold"
                            >
                                Google
                            </text>
                        </svg>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
