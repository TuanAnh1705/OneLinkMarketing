"use client"

import Navbar from "@/app/components/homePage/navBar"
import { useRef } from "react"
import TestimonialsSection from "./components/testimonal"
import FaqAccordion from "./components/faq"
import HeroSection from "./components/hero"
import Footer from "@/app/components/homePage/Footer"
import ProcessSection from "./components/processSection"
import { ParallaxHero } from "./components/parallaxImg"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef}>
      <Navbar/>
      <HeroSection/>
      <ProcessSection/>
      <ParallaxHero/>
      <FaqAccordion/>
      <TestimonialsSection/>
      <Footer/>
    </div>
  )
}