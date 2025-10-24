"use client"

import { useRef } from "react"
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
            <Hero/>
            <StorySection/>
            <RoadmapSection/>
            <CoreValuesSection/>
            <TeamSection/>
            <Partner/>
        </div>
    )
}