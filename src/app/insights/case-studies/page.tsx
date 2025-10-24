"use client"


import { useRef } from "react"
import FitnessShowcase from "./components/fitnessShowcase"
import ChallengeSection from "./components/challenge"
import SolutionsSection from "./components/solution"


export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerRef}>
            <FitnessShowcase/>
            <ChallengeSection/>
            <SolutionsSection/>
        </div>
    )
}
