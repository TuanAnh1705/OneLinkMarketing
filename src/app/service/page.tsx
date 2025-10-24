"use client"

import { useRef } from "react"
import ExpertiseSection from "./components/expertise"
import ReadyToTransform from "./components/readyToTransform"
import { PartnerSection } from "./components/partner"
import Showcase from "./components/showCase"
import FaqSection from "./components/faqSection"
import MarqueeLogos from "./components/marquee"

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerRef}>
            <ExpertiseSection/>
            <PartnerSection/>
            <Showcase/>
            <FaqSection/>
            <MarqueeLogos/>
            <ReadyToTransform/>
        </div>
    )
}