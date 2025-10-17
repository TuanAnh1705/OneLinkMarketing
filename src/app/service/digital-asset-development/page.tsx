"use client"

import Navbar from "@/app/components/homePage/navBar"
import { useRef } from "react"
import HeroSection from "./components/hero"
import Footer from "@/app/components/homePage/Footer"
import ProcessSection from "../strategy-consulting/components/processSection"
import { ParallaxHero } from "../strategy-consulting/components/parallaxImg"
import FaqAccordion from "../strategy-consulting/components/faq"
import TestimonialsSection from "../strategy-consulting/components/testimonal"


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