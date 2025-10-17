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

const logos = [
    {
        name: "Google Analytics",
        svg: (
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 fill-white">
                <path d="M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z" />
            </svg>
        ),
    },
    {
        name: "Figma",
        svg: (
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 fill-white">
                <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
            </svg>
        ),
    },
    {
        name: "WordPress",
        svg: (
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 fill-white"><title>WordPress</title><path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0" /></svg>
        ),
    },
    {
        name: "Shopify",
        svg: (
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 fill-white"><title>Shopify</title><path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z" /></svg>
        ),
    },
    {
        name: "Meta",
        svg: (
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 fill-white"><title>Meta</title><path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" /></svg>
        ),
    },
    {
        name: "HubSpot",
        svg: (
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 fill-white"><title>HubSpot</title><path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" /></svg>
        ),
    },

    {
        name: "Nextjs",
        svg: (
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 fill-white"><title>Next.js</title><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" /></svg>
        ),
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
            background: "#FFFFFF",
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

            <p className={`archivo-expanded font-medium relative z-10 leading-relaxed mb-6 ${testimonial.isSquare ? "text-gray-800" : "text-gray-200"}`}>
                {testimonial.text}
            </p>
            <div className="relative z-10">
                <p className={`neulis-alt-extralight font-medium ${testimonial.isSquare ? "text-black" : "text-white"}`}>{testimonial.author}</p>
                <p className={`neulis-alt-extralight font-medium text-sm ${testimonial.isSquare ? "text-black" : "text-white"}`}>{testimonial.role}</p>
            </div>
        </motion.div>
    )
}

export default function TestimonialsSection() {
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
            className="relative bg-[#000A1D] text-white w-full overflow-hidden py-24 sm:py-32 -translate-y-24 z-10"
        >
            <div className="container mx-auto px-6 lg:px-8 min-h-screen flex flex-col justify-center">
                <motion.h2
                    ref={titleRef}
                    variants={titleVariants} // Vẫn dùng variants để định nghĩa các trạng thái
                    initial="hidden"
                    // 👇 Thay thế prop animate cũ bằng controls
                    animate={controls}
                    style={{ perspective: 1000 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-medium archivo-expanded text-left text-white translate-x-80 translate-y-28 leading-tight mb-24 max-w-4xl mx-auto"
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
                <p className="text-center text-white mb-12 text-xl neulis-alt-extralight font-medium">Accelerate Business Growth with <br /> OneLink Marketing</p>
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
                        {[...logos, ...logos].map((logo, index) => (
                            <motion.div
                                key={index}
                                className="flex-shrink-0 flex items-center justify-center p-4 rounded-full h-16 w-36 shadow-md relative"
                                style={{
                                    background: "linear-gradient(90deg, #0074E5 0%, #00407F 100%)",
                                    padding: "1px",
                                }}
                            >
                                <div className="bg-[#000A1D] rounded-full w-full h-full flex items-center justify-center">
                                    {logo.svg}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}