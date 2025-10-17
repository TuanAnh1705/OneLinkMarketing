"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence, cubicBezier } from "framer-motion"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const slides = [
  {
    id: 1,
    title: "Tag.",
    subtitle: "Fitness",
    description: "Digital Asset Development",
    year: "2025",
    image: "/assets/show1.png",
  },
  {
    id: 2,
    title: "Tag.",
    subtitle: "Fitness",
    description: "Digital Asset Development",
    year: "2025",
    image: "/assets/show2.png",
  },
  {
    id: 3,
    title: "Tag.",
    subtitle: "Fitness",
    description: "Digital Asset Development",
    year: "2025",
    image: "/assets/show3.png",
  },
  {
    id: 4,
    title: "Tag.",
    subtitle: "Fitness",
    description: "Digital Asset Development",
    year: "2025",
    image: "/assets/show4.png",
  },
]

export default function Showcase() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lastDirection, setLastDirection] = useState<"up" | "down">("down")
  const [curtainRevealed, setCurtainRevealed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  const slideVariants = {
    fromAbove: { y: "-100%" },
    fromBelow: { y: "100%" },
    animate: { y: "0%", transition: { duration: 0.9, ease: cubicBezier(0.33, 1, 0.68, 1) } },
    exit: (direction: "up" | "down") => ({
      y: direction === "down" ? "-20%" : "20%",
      transition: { duration: 0.9, ease: cubicBezier(0.33, 1, 0.68, 1) },
    }),
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleWheel = (event: WheelEvent) => {
      if (isScrolling.current) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      const scrollDirection = event.deltaY > 0 ? "down" : "up"
      const atFirstSlide = currentSlide === 0
      const atLastSlide = currentSlide === slides.length - 1

      if (atFirstSlide && scrollDirection === "up") {
        const trigger = scrollTriggerRef.current
        if (trigger) {
          window.scrollTo({
            top: trigger.start - window.innerHeight,
            behavior: "smooth",
          })
        }
        return
      }

      if (atLastSlide && scrollDirection === "down") {
        const trigger = scrollTriggerRef.current
        if (trigger) {
          window.scrollTo({
            top: trigger.end + 100,
            behavior: "smooth",
          })
        }
        return
      }

      event.preventDefault()
      event.stopPropagation()

      isScrolling.current = true

      if (scrollDirection === "down" && currentSlide < slides.length - 1) {
        setLastDirection("down")
        setCurrentSlide((prev) => prev + 1)
      } else if (scrollDirection === "up" && currentSlide > 0) {
        setLastDirection("up")
        setCurrentSlide((prev) => prev - 1)
      }

      setTimeout(() => {
        isScrolling.current = false
      }, 1000)
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * slides.length}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: false,
      onEnter: () => {
        if (!curtainRevealed) {
          setCurtainRevealed(true)
        }
        section.addEventListener("wheel", handleWheel, { passive: false })
      },
      onLeave: () => {
        section.removeEventListener("wheel", handleWheel)
      },
      onEnterBack: () => {
        section.addEventListener("wheel", handleWheel, { passive: false })
      },
      onLeaveBack: () => {
        section.removeEventListener("wheel", handleWheel)
      },
    })

    scrollTriggerRef.current = trigger

    return () => {
      trigger.kill()
      section.removeEventListener("wheel", handleWheel)
    }
  }, [currentSlide, curtainRevealed])

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-neutral-900">
      <div className="relative h-full w-full">
        <AnimatePresence initial={false} custom={lastDirection}>
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            variants={slideVariants}
            custom={lastDirection}
            initial={lastDirection === "down" ? "fromBelow" : "fromAbove"}
            animate="animate"
            exit="exit"
          >
            <Image
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!curtainRevealed && (
          <>
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 bg-neutral-950 z-50"
              initial={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.2, ease: cubicBezier(0.33, 1, 0.68, 1) }}
            />
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2 bg-neutral-950 z-50"
              initial={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.2, ease: cubicBezier(0.33, 1, 0.68, 1) }}
            />
          </>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-20 bottom-1/6 max-w-3xl overflow-hidden">
          <AnimatePresence custom={lastDirection} mode="wait">
            <motion.div
              key={currentSlide}
              custom={lastDirection}
              initial={{ y: lastDirection === "down" ? "100%" : "-100%", opacity: 1 }}
              animate={{ y: "0%", opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }}
              exit={{
                y: lastDirection === "down" ? "-100%" : "100%",
                opacity: 1,
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
            >
              <h1 className="archivo-expanded text-6xl md:text-8xl font-medium text-white mb-2">
                {slides[currentSlide].title}
              </h1>
              <h2 className="archivo-expanded text-6xl md:text-8xl font-medium text-white mb-6">
                {slides[currentSlide].subtitle}
              </h2>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="neulis-alt-regular font-medium px-4 py-2 border border-white/30 text-white text-sm rounded-full">
                  {slides[currentSlide].description}
                </span>
                <span className="neulis-alt-regular font-medium px-4 py-2 border border-white/30 text-white text-sm rounded-full">
                  {slides[currentSlide].year}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-14 left-20 w-1/3 max-w-xl flex gap-2">
          {slides.map((_, i) => (
            <div key={i} className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: i <= currentSlide ? "100%" : "0%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
