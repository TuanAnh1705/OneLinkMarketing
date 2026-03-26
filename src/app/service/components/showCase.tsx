"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, cubicBezier } from "framer-motion"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ... (Dữ liệu 'slides' của bạn giữ nguyên) ...
const slides = [
  {
    id: 1,
    title: "Tag.",
    subtitle: "Fitness",
    year: "2025",
    image: "/assets/tag1.png",
  },
  {
    id: 2,
    title: "Steel",
    subtitle: "Work Seattle",
    year: "2025",
    image: "/assets/steel.png",
  },
  {
    id: 3,
    title: "China",
    subtitle: "Sourcing Co",
    year: "2025",
    image: "/assets/cns1.png",
  },
  {
    id: 4,
    title: "Vietnam",
    subtitle: "Sourcing Co",
    year: "2023",
    image: "/assets/vns1.png",
  },
]


const TRANSITION_DURATION_MS = 1000
const SWIPE_THRESHOLD = 50

// Hook 'useMediaQuery' (Giữ nguyên)
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

export default function Showcase() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lastDirection, setLastDirection] = useState<"up" | "down">("down")
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [curtainRevealed, setCurtainRevealed] = useState(isDesktop);


  const sectionRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const touchStartY = useRef<number | null>(null)


  // ... (slideVariants, changeSlide, changeSlideRef giữ nguyên) ...
  const slideVariants = {
    fromAbove: { y: "-100%" },
    fromBelow: { y: "100%" },
    animate: { y: "0%", transition: { duration: 0.9, ease: cubicBezier(0.33, 1, 0.68, 1) } },
    exit: (direction: "up" | "down") => ({
      y: direction === "down" ? "-20%" : "20%",
      transition: { duration: 0.9, ease: cubicBezier(0.33, 1, 0.68, 1) },
    }),
  }

  const changeSlide = useCallback((direction: "up" | "down") => {
    if (isScrolling.current) return
    const trigger = scrollTriggerRef.current
    const atFirstSlide = currentSlide === 0
    const atLastSlide = currentSlide === slides.length - 1

    if (atFirstSlide && direction === "up") {
      if (trigger) window.scrollTo({ top: trigger.start - window.innerHeight, behavior: "smooth" })
      return
    }
    if (atLastSlide && direction === "down") {
      if (trigger) window.scrollTo({ top: trigger.end + 100, behavior: "smooth" })
      return
    }

    isScrolling.current = true
    if (direction === "down" && currentSlide < slides.length - 1) {
      setLastDirection("down")
      setCurrentSlide((prev) => prev + 1)
    } else if (direction === "up" && currentSlide > 0) {
      setLastDirection("up")
      setCurrentSlide((prev) => prev - 1)
    }

    setTimeout(() => {
      isScrolling.current = false
    }, TRANSITION_DURATION_MS)
  }, [currentSlide])

  const changeSlideRef = useRef(changeSlide)

  useEffect(() => {
    changeSlideRef.current = changeSlide
  }, [changeSlide])

  useEffect(() => {
    if (!isDesktop) setCurtainRevealed(true)
  }, [isDesktop])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // 🚀 MOBILE: Auto slide
    if (!isDesktop) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 4000) // đổi slide mỗi 4 giây

      // Xóa ScrollTrigger nếu có tồn tại từ desktop
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
        document.body.classList.remove("in-showcase")
      }

      return () => clearInterval(interval)
    }

    // 🚀 DESKTOP: ScrollTrigger logic
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      event.stopPropagation()
      const scrollDirection = event.deltaY > 0 ? "down" : "up"
      changeSlideRef.current(scrollDirection)
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (isScrolling.current) return
      touchStartY.current = event.touches[0].clientY
    }

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault()
      if (touchStartY.current === null || isScrolling.current) return
      const currentY = event.touches[0].clientY
      const deltaY = touchStartY.current - currentY

      if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
        const scrollDirection = deltaY > 0 ? "down" : "up"
        touchStartY.current = null
        changeSlideRef.current(scrollDirection)
      }
    }

    const handleTouchEnd = () => {
      touchStartY.current = null
    }

    const addListeners = () => {
      section.addEventListener("wheel", handleWheel, { passive: false })
      section.addEventListener("touchstart", handleTouchStart, { passive: false })
      section.addEventListener("touchmove", handleTouchMove, { passive: false })
      section.addEventListener("touchend", handleTouchEnd, { passive: false })
    }

    const removeListeners = () => {
      section.removeEventListener("wheel", handleWheel)
      section.removeEventListener("touchstart", handleTouchStart)
      section.removeEventListener("touchmove", handleTouchMove)
      section.removeEventListener("touchend", handleTouchEnd)
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      pin: true,
      pinSpacing: true,
      end: `+=${window.innerHeight * slides.length}`,
      anticipatePin: 1,
      scrub: false,
      onEnter: () => {
        document.body.classList.add("in-showcase")
        if (!curtainRevealed) setCurtainRevealed(true)
        addListeners()
      },
      onLeave: () => {
        document.body.classList.remove("in-showcase")
        removeListeners()
      },
      onEnterBack: () => {
        document.body.classList.add("in-showcase")
        addListeners()
      },
      onLeaveBack: () => {
        document.body.classList.remove("in-showcase")
        removeListeners()
      },
    })

    scrollTriggerRef.current = trigger

    return () => {
      trigger.kill()
      document.body.classList.remove("in-showcase")
      removeListeners()
    }
  }, [curtainRevealed, isDesktop])


  return (
    <section
      id="showcase"
      ref={sectionRef}
      className={`relative h-[600px] md:h-screen w-full overflow-hidden ${isDesktop ? "bg-neutral-900" : "bg-black/90"}`}
    >
      {/* Phần JSX bên dưới không đổi. 
        Nó sẽ tự động hiển thị slide 0 (vì 'currentSlide' không đổi)
      */}
      <div className="relative h-full w-full">
        <AnimatePresence initial={false} custom={lastDirection}>
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            variants={slideVariants}
            custom={lastDirection}
            initial={isDesktop ? (lastDirection === "down" ? "fromBelow" : "fromAbove") : { opacity: 0 }}
            animate={isDesktop ? "animate" : { opacity: 1, transition: { duration: 1 } }}
            exit={isDesktop ? "exit" : { opacity: 0, transition: { duration: 0.6 } }}
          >

            <Image
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
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
        <div className="absolute left-6 bottom-24 w-[calc(100%-3rem)] md:left-20 md:bottom-1/6 md:w-auto max-w-3xl">
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={lastDirection} mode="wait">
              <motion.div
                key={currentSlide}
                custom={lastDirection}
                initial={{
                  y: lastDirection === "down" ? "30%" : "-30%",
                  opacity: 0,
                }}
                animate={{
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
                }}
                exit={{
                  y: lastDirection === "down" ? "-20%" : "20%",
                  opacity: 0,
                  transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
                }}
                className="will-change-transform"
              >
                <h1 className="archivo-expanded text-4xl sm:text-6xl md:text-8xl font-medium text-white mb-2">
                  {slides[currentSlide].title}
                </h1>
                <h2 className="archivo-expanded text-4xl sm:text-6xl md:text-8xl font-medium text-white mb-6">
                  {slides[currentSlide].subtitle}
                </h2>
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <span className="generalsans-regular px-4 py-2 border border-white/30 text-white text-sm rounded-full">
                    {slides[currentSlide].year}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>


        {/* 🚀 BƯỚC 2: Chỉ hiển thị thanh progress trên DESKTOP */}
        {isDesktop && (
          <div className="absolute bottom-10 left-6 right-6 md:left-20 md:right-auto md:w-1/3 max-w-xl flex gap-2">
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
        )}

      </div>
    </section>
  )
}