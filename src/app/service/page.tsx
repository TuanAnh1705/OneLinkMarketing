"use client"

import { useRef } from "react"
import Navbar from "../components/homePage/navBar"
import ExpertiseSection from "./components/expertise"
import Footer from "../components/homePage/Footer"
import ReadyToTransform from "./components/readyToTransform"
import { PartnerSection } from "./components/partner"
import Showcase from "./components/showCase"
import FaqSection from "./components/faqSection"
import MarqueeLogos from "./components/marquee"

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerRef}>
            <div className="relative">
                <Navbar />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#0074E5] to-[#162660]" />
            </div>
            <ExpertiseSection/>
            <PartnerSection/>
            <Showcase/>
            <FaqSection/>
            <MarqueeLogos/>
            <ReadyToTransform/>
            <Footer/>
        </div>
    )
}