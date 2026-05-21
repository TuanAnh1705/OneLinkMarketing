"use client"

import { useRef } from "react"
import HeroSection from "./components/hero"
import UspSectionForSeo from "./components/UspForSeo"
import FaqForSeo from "./components/faqForSeo"
import TestimonialsForSeo from "./components/testimonialForSeo"


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef}>
      <HeroSection/>
      <UspSectionForSeo/>
      <FaqForSeo/>
      <TestimonialsForSeo/>
    </div>
  )
}