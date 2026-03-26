"use client"

import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"

// Wrap Next/Image for Framer Motion
const MotionImage = motion(Image)

//-----------------------------------------------------
// VARIANTS FOR SERVICE CARDS
//-----------------------------------------------------

const overlayVariants: Variants = {
  rest: {
    y: "calc(100% - 7rem)",
  },
  hover: {
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
}

const contentVariants: Variants = {
  rest: { opacity: 0, y: 10 },
  hover: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.3 },
  },
}

const mobileCardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
}

//-----------------------------------------------------
// DATA
//-----------------------------------------------------

interface ServiceCardProps {
  title: React.ReactNode
  description: string
  imageUrl: string
  link: string
}

const services: ServiceCardProps[] = [
  {
    title: <>Brand Identity</>,
    description:
      "Crafting a visual identity that is both professional and memorable.",
    imageUrl: "/assets/22.png",
    link: "/case-studies",
  },
  {
    title: <>Website Design</>,
    description:
      "Designing high-performance websites that are optimized for SEO and UX.",
    imageUrl: "/assets/29.png",
    link: "/case-studies",
  },
  {
    title: <>Landing Pages</>,
    description:
      "Creating targeted landing pages to convert visitors into leads efficiently.",
    imageUrl: "/assets/30.png",
    link: "/case-studies",
  },
  {
    title: <>Digital Collateral</>,
    description:
      "Producing assets like Ebooks and whitepapers to nurture leads.",
    imageUrl: "/assets/31.png",
    link: "/case-studies",
  },
]

const DEFAULT_SERVICE_IMAGE = "/assets/22.png"

//-----------------------------------------------------
// MOBILE SERVICE CARD
//-----------------------------------------------------

const MobileServiceCard = ({ service, index }: { service: ServiceCardProps; index: number }) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={mobileCardVariants}
      className="flex flex-col overflow-hidden shadow-lg bg-[#0074E5]"
    >
      {/* Image Section */}
      <div className="relative w-full overflow-hidden">
        <MotionImage
          src={service.imageUrl}
          alt={typeof service.title === 'string' ? service.title : 'Service'}
          width={600}
          height={400}
          style={{
            width: '100%',
            height: 'auto',
          }}
          sizes="100vw"
          className="object-contain"
        />
      </div>

      {/* Content Overlay */}
      <div className="p-6 bg-[#0074E5] text-white">
        <h3 className="archivo-expanded text-lg font-bold mb-3 leading-tight text-white">
          {service.title}
        </h3>
        <p className="generalsans-regular text-sm leading-relaxed text-white mb-4">
          {service.description}
        </p>
        <Link
          href={service.link}
          className="group inline-flex items-center gap-2 px-4 py-3
          rounded-full bg-white text-[#444444] text-sm font-medium
          hover:bg-[#162660] hover:text-white transition-colors"
        >
          Explore Now
          <ArrowUpRight className="w-4 h-4 stroke-[url(#chevronGradient)] group-hover:stroke-white transition-colors duration-300" />
        </Link>
      </div>
    </motion.div>
  )
}

//-----------------------------------------------------
// MAIN COMPONENT
//-----------------------------------------------------

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"])
  const smoothImageY = useSpring(imageY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      {/* Curtain Animation */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        className="fixed top-0 left-0 w-1/2 h-full bg-white z-9999"
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        className="fixed top-0 right-0 w-1/2 h-full bg-white z-9999"
      />

      {/* Page Content */}
      <div className="min-h-screen bg-white p-6 md:p-16 relative z-10">
        
        {/* SVG Definition for Gradient */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id="chevronGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0074E5" />
              <stop offset="100%" stopColor="#162660" />
            </linearGradient>
          </defs>
        </svg>

        <div className="mx-auto max-w-7xl">
          {/* Header with gradient text */}
          <div className="mb-12 md:mb-16">
            <h1 className="text-center text-3xl md:text-8xl font-bold tracking-wider mb-8">
              <span className="archivo-expanded bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent">
                DIGITAL ASSET
              </span>
              <br />
              <span className="archivo-expanded bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent">
                DEVELOPMENT
              </span>
            </h1>
            <div className="h-px w-full bg-linear-to-r from-[#0074E5] to-[#162660]" />
          </div>

          {/* Main content section */}
          <div className="mb-16 md:mb-24 space-y-10 md:space-y-20">
            {/* Centered text */}
            <div className="flex items-start justify-center">
              <div className="max-w-3xl text-center">
                <p className="generalsans-regular text-sm md:text-xl text-[#444444] leading-relaxed">
                  Build the digital assets that form the core of your lead-generation engine from compelling brand identities to high-performance websites.
                </p>
              </div>
            </div>
          </div>

          {/* Services section - Mobile only inside container */}
          <div className="mb-12 md:mb-16 lg:hidden">
            <div className="space-y-12">
              {services.map((service, index) => (
                <MobileServiceCard
                  key={index}
                  service={service}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Services - Full Width, outside container */}
        <div className="hidden lg:block mb-12 md:-mb-18">
          <div
            className="relative h-[700px] xl:h-[800px] overflow-hidden shadow-lg w-full"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Default Background */}
            <MotionImage
              src={DEFAULT_SERVICE_IMAGE}
              alt="Digital Asset Development Services"
              fill
              className="object-fill"
              animate={{ opacity: 1 }}
            />

            {/* Hover images */}
            {services.map((service, index) => (
              <MotionImage
                key={index}
                src={service.imageUrl}
                alt={typeof service.title === 'string' ? service.title : 'Service'}
                fill
                className="object-fill"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            ))}

            <div className="absolute inset-0 grid grid-cols-4 z-10">
              {services.map((service, index) => {
                const animateState = hoveredIndex === index ? "hover" : "rest"

                return (
                  <div
                    key={index}
                    className="relative h-full"
                    onMouseEnter={() => setHoveredIndex(index)}
                  >
                    {/* Overlay */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-5
                      bg-[#0074E5]/70
                      text-white flex flex-col justify-start"
                      variants={overlayVariants}
                      animate={animateState}
                    >
                      <h3 className="archivo-expanded text-lg xl:text-2xl font-bold leading-tight text-white">
                        {service.title}
                      </h3>

                      <motion.div
                        className="mt-4 space-y-4"
                        variants={contentVariants}
                        animate={animateState}
                      >
                        <p className="generalsans-regular text-md md:text-xl text-white ">
                          {service.description}
                        </p>

                        <Link
                          href={service.link}
                          className="group flex items-center gap-2 px-4 py-4 w-fit
                          rounded-full bg-white text-[#444444] text-sm font-medium
                          hover:bg-[#162660] hover:text-white transition-colors"
                        >
                          Explore Now
                          <ArrowUpRight className="w-4 h-4 stroke-[url(#chevronGradient)] group-hover:stroke-white transition-colors duration-300" />
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                )
              })}
            </div>

            {/* Vertical dividers */}
            <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white/20 z-20" />
            <div className="absolute top-0 bottom-0 left-2/4 w-px bg-white/20 z-20" />
            <div className="absolute top-0 bottom-0 left-3/4 w-px bg-white/20 z-20" />
          </div>
        </div>
      </div>
    </div>
  )
}