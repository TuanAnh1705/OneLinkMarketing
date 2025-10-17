"use client"

import { useRef } from "react"
import Navbar from "../components/homePage/navBar"
import Footer from "../components/homePage/Footer"
import Hero from "./components/hero"
import { StorySection } from "./components/ourStory"
import { RoadmapSection } from "./components/roadMap"
import { CoreValuesSection } from "./components/coreValue"
import { TeamSection } from "./components/member"
import Partner from "./components/partner"

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerRef}>
            <div className="relative">
                <Navbar />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#0074E5] to-[#162660]" />
            </div>
            <Hero/>
            <StorySection/>
            <RoadmapSection/>
            <CoreValuesSection/>
            <TeamSection/>
            <Partner/>
            <Footer/>
        </div>
    )
}