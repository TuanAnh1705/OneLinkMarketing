"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

interface GalleryImage {
	src: string
	alt: string
	widthClass: string
	heightClass: string
}

const galleryImageData: GalleryImage[] = [
	{ src: "/assets/tag1.png", alt: "Image 1", widthClass: "w-[30vw]", heightClass: "h-[30vh]" },
	{ src: "/assets/tag2.png", alt: "Image 2", widthClass: "w-[22vw]", heightClass: "h-[55vh]" },
	{ src: "/assets/tag3.png", alt: "Image 3", widthClass: "w-[16vw]", heightClass: "h-[35vh]" },
	{ src: "/assets/tag4.png", alt: "Image 4", widthClass: "w-[24vw]", heightClass: "h-[60vh]" },
	{ src: "/assets/tag5.png", alt: "Image 5", widthClass: "w-[35vw]", heightClass: "h-[50vh]" },
	{ src: "/assets/tag6.png", alt: "Image 6", widthClass: "w-[30vw]", heightClass: "h-[30vh]" },
	{ src: "/assets/tag1.png", alt: "Image 7", widthClass: "w-[30vw]", heightClass: "h-[60vh]" },
]

export function StorySection() {
	const targetRef = useRef<HTMLDivElement>(null)

	// Theo dõi tiến trình cuộn
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start 90%", "end start"], // Kéo dài khoảng cuộn để chuyển động chậm, tự nhiên hơn
	})

	// Mapping scroll progress -> translateX
	const rawX = useTransform(scrollYProgress, [0, 1], ["30vw", "-130vw"])

	// 🔥 Dùng useSpring để smoothing chuyển động
	const x = useSpring(rawX, {
		stiffness: 60,   // Độ đàn hồi
		damping: 20,     // Mức giảm rung
		mass: 0.8,       // Mức độ "nặng" của chuyển động
	})

	return (
		<section ref={targetRef} className="bg-white py-20 md:py-32 overflow-hidden -mt-36">
			<div className="max-w-7xl mx-auto px-8 mb-20">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
					<div className="flex items-start">
						<h2 className="archivo-expanded text-4xl md:text-5xl font-medium text-[#000A1D] leading-tight">
							Our Story <br /> and History
						</h2>
					</div>
					<div className="neulis-alt-regular font-medium text-[#444444] text-lg leading-relaxed space-y-6">
						<p>
							Founded with a mission to solve the fragmentation problem in digital marketing, Onelink Marketing was
							born to provide a unified, high-performance solution. We believe every brand deserves a strong
							identity and superior performance, without the high costs of local agencies.
						</p>
						<p>Our journey is one of bridging the gap between quality and efficiency.</p>

						<motion.div
							transition={{ type: "spring", stiffness: 300 }}
							className="inline-block mt-4"
						>
							<button className="relative overflow-hidden px-4 py-3 rounded-full font-medium text-sm group border border-slate-400">
								<span className="neulis-alt-regular font-medium relative z-30 text-white group-hover:text-slate-700 transition-colors duration-300">
									Explore Services
								</span>
								<span
									className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-20"
									aria-hidden="true"
								></span>
								<span
									className="absolute inset-0 bg-gradient-to-r from-[#0074E5] to-[#162660] rounded-full z-10"
									aria-hidden="true"
								></span>
							</button>
						</motion.div>
					</div>
				</div>
			</div>

			{/* 🔹 Dải ảnh trượt ngang mượt mà */}
			<motion.div
				style={{ x }}
				className="flex items-start gap-4 lg:gap-8 w-[200vw] will-change-transform"
			>
				{galleryImageData.map((image, index) => (
					<div
						key={index}
						className={`relative shrink-0 rounded-lg overflow-hidden ${image.widthClass} ${image.heightClass}`}
					>
						<Image src={image.src} alt={image.alt} fill className="object-cover" />
					</div>
				))}
			</motion.div>
		</section>
	)
}
