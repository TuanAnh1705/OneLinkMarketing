"use client"

import { useRef } from "react"
import FaqAccordion from "./components/faqSection"
import HeroSection from "./components/heroSection"
import CaseStudies from "./components/caseStudies"
import ExpertSection from "./components/expert"
import ExploreSection from "./components/explore"

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerRef}>
            <HeroSection/>
            <CaseStudies/>
            <ExpertSection/>
            <FaqAccordion />
            <ExploreSection/>
        </div>
    )
}
