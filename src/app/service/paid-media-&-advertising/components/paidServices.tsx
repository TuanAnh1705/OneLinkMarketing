"use client"

import { motion, Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

const MotionImage = motion(Image)

const overlayVariants: Variants = {
  rest: { y: "calc(100% - 7rem)" },
  hover: { y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
}
const contentVariants: Variants = {
  rest: { opacity: 0, y: 10 },
  hover: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.3 } },
}
const mobileCardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

interface ServiceCardProps { title: React.ReactNode; description: string; imageUrl: string; link: string }

const services: ServiceCardProps[] = [
  { title: <><br />Multi-channel<br />Strategy</>, description: "Strategic planning across Meta, Google, TikTok, and Youtube.", imageUrl: "/assets/24.png", link: "/case-studies" },
  { title: <><br />Conversion Rate<br />Optimization</>, description: "Constantly refining campaigns to lower costs and increase conversions.", imageUrl: "/assets/35.png", link: "/case-studies" },
  { title: <><br />A/B Testing<br />&nbsp;</>, description: "Testing different creative and copy to find the most effective ad combination.", imageUrl: "/assets/36.png", link: "/case-studies" },
  { title: <><br />Performance<br />Reporting</>, description: "Transparent reporting and data-driven insights to help you make informed decisions.", imageUrl: "/assets/37.png", link: "/case-studies" },
]
const DEFAULT_SERVICE_IMAGE = "/assets/24.png"

const MobileServiceCard = ({ service, index }: { service: ServiceCardProps; index: number }) => (
  <motion.div custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={mobileCardVariants} className="flex flex-col overflow-hidden shadow-lg bg-[#0074E5]">
    <div className="relative w-full overflow-hidden">
      <MotionImage src={service.imageUrl} alt={typeof service.title === "string" ? service.title : "Service"} width={600} height={400} style={{ width: "100%", height: "auto" }} sizes="100vw" className="object-cover" />
    </div>
    <div className="p-6 bg-[#0074E5] text-white">
      <h3 className="archivo-expanded text-lg font-bold mb-3 leading-tight text-white">{service.title}</h3>
      <p className="generalsans-regular text-sm leading-relaxed text-white mb-4">{service.description}</p>
      <Link href={service.link} className="group inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white text-[#444444] text-sm font-medium hover:bg-[#162660] hover:text-white transition-colors">
        Explore Now <ArrowUpRight className="w-4 h-4 stroke-[url(#chevronGradient)] group-hover:stroke-white transition-colors duration-300" />
      </Link>
    </div>
  </motion.div>
)

export default function PaidServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  return (
    <>
      <div className="mb-12 md:mb-16 lg:hidden px-6 md:px-16">
        <div className="space-y-12">
          {services.map((service, index) => <MobileServiceCard key={index} service={service} index={index} />)}
        </div>
      </div>
      <div className="hidden lg:block mb-12 md:-mb-18">
        <div className="relative h-[700px] xl:h-[800px] overflow-hidden shadow-lg w-full" onMouseLeave={() => setHoveredIndex(null)}>
          <svg width="0" height="0" style={{ position: "absolute" }}><defs><linearGradient id="chevronGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#0074E5" /><stop offset="100%" stopColor="#162660" /></linearGradient></defs></svg>
          <MotionImage src={DEFAULT_SERVICE_IMAGE} alt="Paid Media Services" fill className="object-cover" animate={{ opacity: 1 }} />
          {services.map((service, index) => <MotionImage key={index} src={service.imageUrl} alt={typeof service.title === "string" ? service.title : "Service"} fill className="object-cover" initial={{ opacity: 0 }} animate={{ opacity: hoveredIndex === index ? 1 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} />)}
          <div className="absolute inset-0 grid grid-cols-4 z-10">
            {services.map((service, index) => (
              <div key={index} className="relative h-full" onMouseEnter={() => setHoveredIndex(index)}>
                <motion.div className="absolute bottom-0 left-0 right-0 p-5 bg-[#0074E5]/70 text-white flex flex-col justify-start" variants={overlayVariants} animate={hoveredIndex === index ? "hover" : "rest"}>
                  <h3 className="archivo-expanded text-lg xl:text-2xl font-bold leading-tight text-white">{service.title}</h3>
                  <motion.div className="mt-4 space-y-4" variants={contentVariants} animate={hoveredIndex === index ? "hover" : "rest"}>
                    <p className="generalsans-regular text-md md:text-xl text-white">{service.description}</p>
                    <Link href={service.link} className="group flex items-center gap-2 px-4 py-4 w-fit rounded-full bg-white text-[#444444] text-sm font-medium hover:bg-[#162660] hover:text-white transition-colors">
                      Explore Now <ArrowUpRight className="w-4 h-4 stroke-[url(#chevronGradient)] group-hover:stroke-white transition-colors duration-300" />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white/20 z-20" />
          <div className="absolute top-0 bottom-0 left-2/4 w-px bg-white/20 z-20" />
          <div className="absolute top-0 bottom-0 left-3/4 w-px bg-white/20 z-20" />
        </div>
      </div>
    </>
  )
}
