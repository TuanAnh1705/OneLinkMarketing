"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export default function FlowerRevealOptimized() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const flowerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (!imageLoaded) return

    const ctx = gsap.context(() => {
      // Set initial state với GPU acceleration
      gsap.set(flowerRef.current, {
        scale: 0.5,
        transformOrigin: "center center",
        force3D: true, // Force GPU acceleration
        backfaceVisibility: "hidden",
        willChange: "transform, opacity",
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000",
          scrub: 0.8, // Giảm từ 1.2 xuống 0.8 để mượt hơn
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true, // Tối ưu cho fast scroll
        },
        defaults: { ease: "power2.inOut" },
      })

      tl.to(flowerRef.current, {
        scale: 45,
        rotate: 100,
        opacity: 0.95,
        duration: 0.45,
        force3D: true,
      })
        .to(
          bgRef.current,
          {
            backgroundColor: "#FFFFFF",
            duration: 0.25,
            ease: "power1.inOut",
            overwrite: "auto",
          },
          0.35,
        )
        .to(flowerRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power1.out",
        })
        .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "sine.inOut" }, 0.55)
        .to(overlayRef.current, { opacity: 0, duration: 0.25, ease: "sine.out" }, 0.75)

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1000",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress < 0.15) {
            gsap.to(bgRef.current, {
              backgroundColor: "#000A1D",
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            })
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [imageLoaded])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center -mt-[18vh] md:-mt-[22vh]"
    >
      {/* Nền */}
      <div ref={bgRef} className="absolute inset-0 bg-[#000A1D]" />

      {/* Overlay sáng nhẹ */}
      <div ref={overlayRef} className="absolute inset-0 bg-white opacity-0 pointer-events-none" />

      <div
        ref={flowerRef}
        className="z-10 relative w-[60px] md:w-[130px] lg:w-[180px] h-[60px] md:h-[130px] lg:h-[180px]"
        style={{
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          willChange: "transform, opacity",
        }}
      >
        <Image
          src="/assets/flower.png"
          alt="Flower"
          fill
          priority
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 60px, (max-width: 1024px) 130px, 180px"
          style={{
            objectFit: "contain",
            imageRendering: "-webkit-optimize-contrast", // Giảm răng cưa
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        />
      </div>
    </section>
  )
}
