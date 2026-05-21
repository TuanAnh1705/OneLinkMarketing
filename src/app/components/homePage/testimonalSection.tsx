"use client"

import { useState, useEffect } from "react"
import { motion, PanInfo, useMotionValue, useAnimationFrame } from "framer-motion"
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa"
import Image from "next/image"

// ===================================================================
// TYPESCRIPT TYPES & DATA
// ===================================================================

type Testimonial = {
    text: string
    author: string
    role: string
    isSquare: boolean
    avatarSrc: string
}

type Logo = {
    name: string
    src: string
}

const testimonials: Testimonial[] = [
    {
        text: "Partnering with OneLink Marketing was the best decision we made for our launch. We came to them with an idea, and they built our entire D2C platform from scratch. The results are phenomenal—our conversion rates are 110% above the industry benchmark, and our site is exceptionally fast. They didn't just build a website; they built the foundation of our business.",
        author: "Elliot Dyke",
        role: "Owner of Tag. Fitness",
        isSquare: true,
        avatarSrc: "/assets/taglogo.png",
    },
    {
        text: "Working with OneLink Marketing was a pivotal decision for my advisory firm. Their team didn't just build a website; they engineered a strategic client acquisition platform. Their understanding of the high-net-worth market is exceptional, and the results speak for themselves. They are a true strategic partner.",
        author: "Lewis",
        role: "Owner of LSJ | TAX",
        isSquare: false,
        avatarSrc: "/assets/taxlogo.png",
    },
    {
        text: "Here at Steel Works Seattle we had a great experience working with OneLink Marketing. As a new business with very little experience in branding and marketing, we greatly appreciated the one on one meetings and attention to detail we never would have thought of. As we got closer to completion, the team took extreme care to finely tune every aspect of our website until it was exactly how we wanted it.",
        author: "Trevor Torquato",
        role: "Founder, Steel Works Seattle",
        isSquare: true,
        avatarSrc: "/assets/avatar-1.png",
    },
    {
        text: "We knew we had strong sourcing capabilities, but OneLink Marketing helped us communicate that strength to the world. Their depth of understanding, attention to detail, and strategic approach reshaped our brand from the ground up. The increase in visibility, inbound leads, and credibility has been remarkable. OneLink didn't just improve our marketing, they elevated our entire business.",
        author: "Bheki",
        role: "General Manager, Vietnam Sourcing Co",
        isSquare: false,
        avatarSrc: "/assets/vns-logo.png",
    },
]

const logos: Logo[] = [
    { name: "Google Analytics", src: "/assets/google-analytics.svg" },
    { name: "Figma", src: "/assets/figma.svg" },
    { name: "WordPress", src: "/assets/wordpress.svg" },
    { name: "Shopify", src: "/assets/shopify.svg" },
    { name: "Meta", src: "/assets/meta.svg" },
    { name: "HubSpot", src: "/assets/hubspot.svg" },
    { name: "Nextjs", src: "/assets/nextjs.svg" },
]

// ===================================================================
// MAIN COMPONENT
// ===================================================================

const cardVariants = {
    front: {
        x: 0,
        z: 100,
        scale: 1,
        rotateY: 0,
        zIndex: 4,
        opacity: 1,
    },
    right: {
        x: "55%",
        z: 0,
        scale: 0.75,
        rotateY: -35,
        zIndex: 3,
        opacity: 0.6,
    },
    back: {
        x: 0,
        z: -100,
        scale: 0.7,
        rotateY: 0,
        zIndex: 2,
        opacity: 0.4,
    },
    left: {
        x: "-55%",
        z: 0,
        scale: 0.75,
        rotateY: 35,
        zIndex: 3,
        opacity: 0.6,
    },
}

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const getCardPosition = (index: number) => {
        const offset = (index - currentIndex + testimonials.length) % testimonials.length
        if (offset === 0) return "front"
        if (offset === 1) return "right"
        if (offset === testimonials.length - 1) return "left"
        return "back"
    }

    const swipeConfidenceThreshold = 10000
    const onDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
        const swipe = Math.abs(offset.x) * velocity.x
        if (swipe < -swipeConfidenceThreshold) {
            handleNext()
        } else if (swipe > swipeConfidenceThreshold) {
            handlePrev()
        }
    }

    // ===================================================================
    // LOGO MARQUEE LOGIC (Giống StorySection)
    // ===================================================================
    const baseVelocity = -0.5 // Tốc độ tự động chạy (âm = sang trái)
    const logoX = useMotionValue(0)
    
    // Kích thước và tính toán - responsive
    const logoWidthSm = 120
    const gapSm = 64
    
    // Sử dụng kích thước desktop để tính toán
    const itemWidth = logoWidthSm + gapSm
    const originalArrayLength = logos.length
    const totalWidth = originalArrayLength * itemWidth

    // Duplicate logos nhiều lần để tạo seamless loop
    const duplicatedLogos = [
        ...logos,
        ...logos,
        ...logos,
        ...logos,
        ...logos,
        ...logos,
        ...logos,
        ...logos,
        ...logos,
        ...logos,
        ...logos,
        ...logos,
        ...logos,
        ...logos,
        ...logos,
        ...logos,
    ]

    // Auto-scroll animation với infinite loop
    useAnimationFrame((_t, delta) => {
        const moveBy = baseVelocity * (delta / 16)
        const currentX = logoX.get()
        let newX = currentX + moveBy

        // Wrap position seamlessly
        if (newX <= -totalWidth * 2) {
            newX += totalWidth
        } else if (newX >= -totalWidth) {
            newX -= totalWidth
        }

        logoX.set(newX)
    })

    // Set vị trí ban đầu
    useEffect(() => {
        logoX.set(-totalWidth * 1.5)
    }, [logoX, totalWidth])

    return (
        <section className="relative bg-[#000A1D] text-white w-full overflow-hidden py-20 md:py-28 z-10 flex flex-col items-center justify-center">
            <div className="container mx-auto px-6 lg:px-8 flex flex-col items-center justify-center">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium generalsans-regular text-center text-white leading-tight mb-16 sm:mb-24 max-w-4xl mx-auto">
                    What Our Clients Say <br /> <span className="italic font-bold">About Our Work</span>
                </h2>

                <div className="relative w-full max-w-5xl h-112.5 sm:h-100 flex items-center justify-center">
                    <motion.div
                        className="relative w-full h-full flex items-center justify-center"
                        style={{ perspective: "1200px" }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={onDragEnd}
                    >
                        {testimonials.map((testimonial, index) => {
                            const cardStyle = testimonial.isSquare
                                ? {
                                    background: "linear-gradient(135deg, #0074E5 0%, #162660 100%)",
                                    textColor: "text-white",
                                    quoteColor: "text-white/20",
                                }
                                : {
                                    background: "#FFFFFF",
                                    textColor: "text-gray-800",
                                    quoteColor: "text-gray-200",
                                }

                            return (
                                <motion.div
                                    key={index}
                                    className="absolute w-[90%] max-w-125 h-95 sm:min-h-87.5 sm:h-87.5 p-6 sm:p-8 md:p-10 flex flex-col justify-center rounded-lg shadow-2xl cursor-grab active:cursor-grabbing"
                                    style={{
                                        ...cardStyle,
                                        transformStyle: "preserve-3d",
                                    }}
                                    variants={cardVariants}
                                    animate={getCardPosition(index)}
                                    transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                                >
                                    <div className="absolute inset-0 w-full h-full rounded-lg" style={{ background: cardStyle.background, transform: 'translateZ(-1px)' }} />
                                    <FaQuoteLeft className={`absolute bottom-8 right-8 text-8xl ${cardStyle.quoteColor}`} />
                                    
                                    <p className={`generalsans-regular font-medium relative z-10 leading-relaxed mb-6 text-xs md:text-[15px] ${cardStyle.textColor}`}>
                                        {testimonial.text}
                                    </p>
                                    <div className="relative z-10 mt-auto flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden relative">
                                            <Image
                                                src={testimonial.avatarSrc}
                                                alt={testimonial.author}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className={`generalsans-regular text-lg sm:text-xl ${cardStyle.textColor}`}>{testimonial.author}</p>
                                            <p className={`generalsans-light text-xs sm:text-sm ${cardStyle.textColor}`}>{testimonial.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>

                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={handlePrev}
                        className="
                            group relative z-20 w-14 h-14 rounded-full p-[1.5px]
                            bg-white hover:bg-linear-to-r from-[#0074E5] to-[#162660]
                            transition-all duration-300
                            "
                        aria-label="Previous testimonial"
                    >
                        <div className="
                            w-full h-full rounded-full flex items-center justify-center
                            bg-[#000A1D] 
                            group-hover:bg-linear-to-r from-[#0074E5] to-[#162660]
                            transition-all duration-300
                            ">
                            <FaArrowLeft className="text-white" />
                        </div>
                    </button>
                    <button
                        onClick={handleNext}
                        className="
                            group relative z-20 w-14 h-14 rounded-full p-[1.5px]
                            bg-white hover:bg-linear-to-r from-[#0074E5] to-[#162660]
                            transition-all duration-300
                            "
                        aria-label="Next testimonial"
                    >
                        <div className="
                            w-full h-full rounded-full flex items-center justify-center
                            bg-[#000A1D] 
                            group-hover:bg-linear-to-r from-[#0074E5] to-[#162660]
                            transition-all duration-300
                            ">
                            <FaArrowRight className="text-white" />
                        </div>
                    </button>
                </div>
            </div>

            {/* PHẦN LOGO MARQUEE - INFINITE SEAMLESS LOOP (Giống StorySection) */}
            <div className="mt-20 w-full">
                <div className="relative w-full overflow-hidden">
                    <motion.div
                        style={{ x: logoX }}
                        className="flex items-center gap-5 will-change-transform"
                    >
                        {duplicatedLogos.map((logo, index) => (
                            <div
                                key={index}
                                className="shrink-0 flex items-center justify-center p-4 rounded-full h-14 w-24 sm:w-30 shadow-md relative mr-8 sm:mr-16"
                                style={{
                                    background: "linear-gradient(90deg, #0074E5 0%, #00407F 100%)",
                                    padding: "1px",
                                }}
                            >
                                <div className="bg-[#000A1D] rounded-full w-full h-full flex items-center justify-center p-2">
                                    <Image
                                        src={logo.src}
                                        alt={logo.name}
                                        width={70}
                                        height={70}
                                        className="object-contain w-full h-full pointer-events-none"
                                        draggable={false}
                                        style={{ filter: 'brightness(0) invert(1)' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}