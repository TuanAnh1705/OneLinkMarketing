"use client"

import { useRef } from "react"
import HeroSection from "./components/hero"
import UspSectionForSocial from "./components/Usp"
import { ParallaxHeroForSocial } from "./components/parallaxHeroForSocial"
import FaqForSocial from "../paid-media-&-advertising/components/faqForPaid"
import TestimonialsForSocial from "./components/testimonialForSocial"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef}>
      <HeroSection/>
      <UspSectionForSocial/>
      <ParallaxHeroForSocial/>
      <FaqForSocial/>
      <TestimonialsForSocial/>
    </div>
  )
}