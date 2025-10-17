"use client"

import { useRef } from "react"
import SectionHero from "./components/homePage/heroSection"
import SectionImageZoom from "./components/homePage/imageZoomSection"
import SectionWork from "./components/homePage/workSection"
import SectionProjects from "./components/homePage/projectSection"
import ServiceSection from "./components/homePage/serviceSection"
import TestimonialsSection from "./components/homePage/testimonalSection"
import FlowerReveal from "./components/homePage/FlowerReveal"
import PainPointSection from "./components/homePage/painPointSection"
import ImageBottomContainer from "./components/homePage/imageBottom"
import GetAFree from "./components/homePage/getFree"
import Footer from "./components/homePage/Footer"
import Navbar from "./components/homePage/navBar"



export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef}>
      <Navbar/>
      <SectionHero />
      <SectionImageZoom />
      <SectionWork />
      <SectionProjects />
      <ServiceSection/>
      <TestimonialsSection/>
      <FlowerReveal/>
      <PainPointSection/>
      <ImageBottomContainer/>
      <GetAFree/>
      <Footer/>
    </div>
  )
}
