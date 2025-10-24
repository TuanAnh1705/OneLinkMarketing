"use client"

import { useRef } from "react"
import HeroSection from "./components/hero"
import UspSectionForDigital from "./components/Usp"
import { ParallaxHeroForDigital } from "./components/parallaxHeroForDigital"
import FaqForDigital from "./components/faqForDigital"
import TestimonialsForDigital from "./components/testimonialForDigital"


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef}>
      <HeroSection/>
      <UspSectionForDigital/>
      <ParallaxHeroForDigital/>
      <FaqForDigital/>
      <TestimonialsForDigital/>
    </div>
  )
}