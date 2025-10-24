"use client"

import { useRef } from "react"
import HeroSection from "./components/hero"
import UspSectionForSeo from "./components/UspForSeo"
import { ParallaxHeroForSeo } from "./components/parallaxHeroForSeo"
import FaqForSeo from "./components/faqForSeo"
import TestimonialsForSeo from "./components/testimonialForSeo"


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef}>
      <HeroSection/>
      <UspSectionForSeo/>
      <ParallaxHeroForSeo/>
      <FaqForSeo/>
      <TestimonialsForSeo/>
    </div>
  )
}