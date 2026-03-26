"use client"

import { useRef } from "react"
import ExpertiseSection from "./components/expertise"
import ReadyToTransform from "./components/readyToTransform"
import { PartnerSection } from "./components/partner"
import FaqSection from "./components/faqSection"

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerRef}>
            <ExpertiseSection/>
            <PartnerSection/>
            <FaqSection/>
            <ReadyToTransform/>
        </div>
    )
}