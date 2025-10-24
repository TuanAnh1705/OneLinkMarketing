"use client"

import { useRef } from "react"
import TestimonialsSection from "./components/testimonal"
import FaqAccordion from "./components/faq"
import HeroSection from "./components/hero"
import ProcessSection from "./components/processSection"
import { ParallaxHero } from "./components/parallaxImg"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef}>
      <HeroSection/>
      <ProcessSection/>
      <ParallaxHero/>
      <FaqAccordion/>
      <TestimonialsSection/>
    </div>
  )
}