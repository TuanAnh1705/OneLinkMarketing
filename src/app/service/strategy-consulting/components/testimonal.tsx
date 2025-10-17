"use client"

import { motion, useScroll, useTransform, useSpring, useInView, useAnimationControls } from "framer-motion"
import { FaQuoteLeft } from "react-icons/fa"
import { useEffect, useRef } from "react"



const testimonials = [
    {
        text: "Their mission is to empower the brands we believe in with tailor-made approaches that ignite creativity and growth without limits.",
        author: "Daryl Mitchell",
        role: "Lead Developer",
        position: { top: "50%", left: "0%", rotate: -8 },
        scrollSpeed: 2.0,
        jitterAmount: 25,
        isSquare: false,
    },
    {
        text: "Redox always eager to collaborate with forward-thinking individuals and organizations.",
        author: "Tom Banton",
        role: "Digital Marketer",
        position: { top: "45%", left: "28%", rotate: 5 },
        scrollSpeed: 2.7,
        jitterAmount: 30,
        isSquare: true,
    },
    {
        text: "Design is a team effort, and we believe in a true partnership, working closely with you.",
        author: "Lance Petter",
        role: "Web Designer",
        position: { top: "50%", left: "51%", rotate: -6 },
        scrollSpeed: 3.3,
        jitterAmount: 35,
        isSquare: false,
    },
    {
        text: "They took the time to understand my brand and target audience perfectly.",
        author: "Chip Mahanay",
        role: "CEO",
        position: { top: "48%", left: "78%", rotate: 8 },
        scrollSpeed: 2.3,
        jitterAmount: 28,
        isSquare: true,
    },
]



// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TestimonialCard({ testimonial, scrollYProgress }: any) {
    const y = useTransform(scrollYProgress, [0, 0.95], [1000 * testimonial.scrollSpeed, -1000 * testimonial.scrollSpeed])
    const smoothY = useSpring(y, { stiffness: 150, damping: 25 })

    const jitterY = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 1],
        [
            0,
            Math.random() * testimonial.jitterAmount - testimonial.jitterAmount / 2,
            Math.random() * testimonial.jitterAmount - testimonial.jitterAmount / 2,
            Math.random() * testimonial.jitterAmount - testimonial.jitterAmount / 2,
            Math.random() * testimonial.jitterAmount - testimonial.jitterAmount / 2,
            0,
        ],
    )
    const smoothJitter = useSpring(jitterY, { stiffness: 200, damping: 20 })

    const cardStyle = testimonial.isSquare
        ? {
            width: "350px",
            height: "350px",
            background: "#000A1D",
            boxShadow: "0 10px 40px rgba(255, 255, 255, 0.1)",
        }
        : {
            width: "450px",
            height: "330px",
            background: "linear-gradient(135deg, #0074E5 0%, #162660 100%)",
            boxShadow: "0 10px 40px rgba(0, 116, 229, 0.3)",
        }

    return (
        <motion.div
            className="absolute p-8 cursor-pointer"
            style={{
                ...testimonial.position,
                y: smoothY,
                rotate: testimonial.position.rotate,
                ...cardStyle,
                borderRadius: "0px", // ❌ bỏ bo tròn
            }}
            whileHover={{
                scale: 1.05,
                rotate: 0,
                transition: { duration: 0.3, ease: "easeOut" },
            }}
        >
            <motion.div style={{ y: smoothJitter }} whileHover={{ rotate: 15, scale: 1.1 }} transition={{ duration: 0.3 }}>
                <FaQuoteLeft
                    className={`absolute top-8 right-8 text-6xl ${testimonial.isSquare ? "text-gray-200" : "text-white/20"}`}
                />
            </motion.div>

            <p className={`archivo-expanded font-medium relative z-10 leading-relaxed mb-6 ${testimonial.isSquare ? "text-white" : "text-gray-200"}`}>
                {testimonial.text}
            </p>
            <div className="relative z-10">
                <p className={`neulis-alt-extralight font-medium ${testimonial.isSquare ? "text-white" : "text-white"}`}>{testimonial.author}</p>
                <p className={`neulis-alt-extralight font-medium text-sm ${testimonial.isSquare ? "text-white" : "text-white"}`}>{testimonial.role}</p>
            </div>
        </motion.div>
    )
}

export default function TestimonialsSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })
    const controls = useAnimationControls();
    const titleInView = useInView(titleRef, { once: false, margin: "-20% 0px -20% 0px" })
    const titleVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 100, z: -400 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            z: 0,
            transition: {
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1] as const,
            },
        },
    };

    // Code đã sửa ✅
    useEffect(() => {
        if (titleInView) {
            // Khi vào viewport, bắt đầu animation xuất hiện
            controls.start("visible");
        } else {
            // Khi ra khỏi viewport, reset về trạng thái ẩn ngay lập tức
            controls.set("hidden");
        }
    }, [titleInView, controls]);

    return (
        <section
            ref={sectionRef}
            className="relative bg-white text-[#000A1D] w-full overflow-hidden py-24 sm:py-32 -translate-y-24 z-10"
        >
            <div className="container mx-auto px-6 lg:px-8 min-h-screen flex flex-col justify-center">
                <motion.h2
                    ref={titleRef}
                    variants={titleVariants} // Vẫn dùng variants để định nghĩa các trạng thái
                    initial="hidden"
                    // 👇 Thay thế prop animate cũ bằng controls
                    animate={controls}
                    style={{ perspective: 1000 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-medium archivo-expanded text-left text-[#000A1D] translate-x-80 translate-y-28 leading-tight mb-24 max-w-4xl mx-auto"
                >
                    Our clients always say, how they are satisfied with our service.
                </motion.h2>

                <div className="flex justify-center h-[500px] w-full translate-y-1">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} scrollYProgress={scrollYProgress} />
                    ))}
                </div>
            </div>

            <div className="mt-20">
                <p className="text-center text-[#000A1D] mb-12 text-5xl archivo-expanded font-medium">Start Your Strategic Journey</p>
                <div className="relative w-full overflow-hidden">
                    <motion.div
                        className="flex gap-16"
                        animate={{ x: [0, -1005] }}
                        transition={{
                            x: {
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                duration: 20,
                                ease: "linear",
                            },
                        }}
                    >
                    </motion.div>
                </div>
            </div>

            {/* --- CTA Section (Căn giữa toàn bộ) --- */}
            <div className="flex flex-col items-center justify-center w-full -mt-10">
                <motion.div
                    ref={containerRef}
                    className="inline-flex flex-col items-center gap-4 cursor-pointer"
                    whileHover="hover"
                    initial="initial"
                >
                    {/* Text Wrapper */}
                    <div
                        className="relative overflow-hidden flex items-center justify-center"
                        style={{ height: "7.5rem" }}
                    >
                        <motion.div
                            className="flex flex-col items-center justify-center text-center"
                            variants={{
                                initial: { y: "35%" },
                                hover: { y: "-15%" },
                            }}
                            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                        >
                            <div className="archivo-expanded text-6xl font-bold bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent leading-[7.5rem]">
                                GET A FREE CONSULTATION
                            </div>
                            <div className="archivo-expanded text-7xl font-bold bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent leading-[7.5rem]">
                                GO
                            </div>
                        </motion.div>
                    </div>

                    {/* Gradient Line */}
                    <motion.div
                        className="h-[4px] rounded-full transition-all mx-auto"
                        style={{
                            background: "linear-gradient(90deg, #0074E5 0%, #162660 100%)",
                        }}
                        variants={{
                            initial: { width: "1050px" },
                            hover: { width: "140px" },
                        }}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    />
                </motion.div>
            </div>

        </section>
    )
}