"use client"

import { useRef } from "react"
import Navbar from "../components/homePage/navBar"
import Footer from "../components/homePage/Footer"
import FaqAccordion from "./components/faqSection"
import HeroSection from "./components/heroSection"
import CaseStudies from "./components/caseStudies"
import ExpertSection from "./components/expert"
import ExploreSection from "./components/explore"

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerRef}>
            <div className="relative">
                <Navbar />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#0074E5] to-[#162660]" />
            </div>
            <HeroSection/>
            <CaseStudies/>
            <ExpertSection/>
            <FaqAccordion />
            <ExploreSection/>
            <Footer />
        </div>
    )
}
