"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useAnimationFrame, useVelocity } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface GalleryImage {
    src: string
    alt: string
}

const galleryImageData: GalleryImage[] = [
    { src: "/assets/ab1.jpg", alt: "Image 1" },
    { src: "/assets/ab2.png", alt: "Image 2" },
    { src: "/assets/ab3.jpg", alt: "Image 3" },
    { src: "/assets/ab4.jpg", alt: "Image 4" },
    { src: "/assets/ab5.png", alt: "Image 5" },
    { src: "/assets/ab6.png", alt: "Image 6" },
    { src: "/assets/ab7.png", alt: "Image 7" },
]

function CarouselRow({
    images,
    direction = "left",
    imageWidth = 500,
    gap = 20,
}: {
    images: GalleryImage[]
    direction?: "left" | "right"
    imageWidth?: number
    gap?: number
}) {
    const [isDragging, setIsDragging] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const baseVelocity = direction === "left" ? -0.5 : 0.5
    const x = useMotionValue(0)
    const dragVelocityRef = useRef(0)

    const itemWidth = imageWidth + gap
    const originalArrayLength = images.length
    const totalWidth = originalArrayLength * itemWidth

    const duplicatedImages = [
        ...images,
        ...images,
        ...images,
        ...images,
        ...images,
        ...images,
    ]

    const velocity = useVelocity(x)

    useAnimationFrame((_t, delta) => {
        if (!isDragging && !isHovering) {
            const moveBy = baseVelocity * (delta / 16)
            let currentX = x.get()

            if (Math.abs(dragVelocityRef.current) > 0.1) {
                dragVelocityRef.current *= 0.95
                currentX += dragVelocityRef.current * (delta / 16)
            }

            let newX = currentX + moveBy

            if (newX <= -totalWidth * 2) {
                newX += totalWidth
            } else if (newX >= -totalWidth) {
                newX -= totalWidth
            }

            x.set(newX)
        }
    })

    useEffect(() => {
        x.set(-totalWidth * 1.5)
    }, [x, totalWidth])

    const handleDragStart = () => {
        setIsDragging(true)
        dragVelocityRef.current = 0
    }

    const handleDrag = () => {
        const currentX = x.get()

        if (currentX <= -totalWidth * 2.5) {
            x.set(currentX + totalWidth)
        } else if (currentX >= -totalWidth * 0.5) {
            x.set(currentX - totalWidth)
        }
    }

    const handleDragEnd = () => {
        setIsDragging(false)

        const currentVelocity = velocity.get()
        dragVelocityRef.current = currentVelocity * 0.01

        let currentX = x.get()

        if (currentX <= -totalWidth * 2) {
            currentX += totalWidth
        } else if (currentX >= -totalWidth) {
            currentX -= totalWidth
        }

        x.set(currentX)
    }

    return (
        <div
            className="relative cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <motion.div
                style={{ x }}
                drag="x"
                dragElastic={0.05}
                dragMomentum={true}
                dragTransition={{
                    power: 0.2,
                    timeConstant: 200,
                    modifyTarget: (target) => target
                }}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                className="flex items-center gap-5 will-change-transform"
            >
                {duplicatedImages.map((image, index) => (
                    <div
                        key={index}
                        className="relative shrink-0 rounded-lg overflow-hidden w-75 h-75 md:w-125 md:h-125 select-none"
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover pointer-events-none"
                            draggable={false}
                            priority={index < 8}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

export function StorySection() {
    const topRowImages = galleryImageData.filter((_, i) => i % 2 === 0)
    const bottomRowImages = galleryImageData.filter((_, i) => i % 2 === 1)

    return (
        <section className="bg-white py-20 md:py-32 overflow-hidden -mt-36">
            <div className="max-w-7xl mx-auto px-8 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    <div className="flex items-start">
                        <h2 className="archivo-expanded text-3xl md:text-5xl font-medium text-[#000A1D] leading-tight">
                            Our Story <br /> and History
                        </h2>
                    </div>
                    <div className="generalsans-regular text-[#444444] text-sm md:text-lg leading-relaxed space-y-6">
                        <p>
                            Traditional marketing teams are costly, inefficient, and difficult to scale. OneLink replaces this with a streamlined model combining a Vietnam based delivery team, native English speaking account management, and structured processes to deliver more output at significantly lower cost without sacrificing quality.
                        </p>

                        <motion.div
                            transition={{ type: "spring", stiffness: 300 }}
                            className="inline-block mt-4"
                        >
                            <Link href="/service">
                                <button className="relative overflow-hidden px-4 py-3 rounded-full font-medium text-sm group border border-slate-400">
                                    <span className="generalsans-regular relative z-30 text-white group-hover:text-slate-700 transition-colors duration-300">
                                        Explore Services
                                    </span>
                                    <span
                                        className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-20"
                                        aria-hidden="true"
                                    ></span>
                                    <span
                                        className="absolute inset-0 bg-linear-to-r from-[#0074E5] to-[#162660] rounded-full z-10"
                                        aria-hidden="true"
                                    ></span>
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Desktop: Single row carousel */}
            <div className="hidden md:block">
                <CarouselRow
                    images={galleryImageData}
                    direction="left"
                />
            </div>

            {/* Mobile: Two rows carousel */}
            <div className="md:hidden space-y-5">
                <CarouselRow
                    images={topRowImages}
                    direction="left"
                    imageWidth={300}
                />
                <CarouselRow
                    images={bottomRowImages}
                    direction="right"
                    imageWidth={300}
                />
            </div>
        </section>
    )
}
