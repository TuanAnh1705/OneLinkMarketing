"use client"

import { useRef } from "react"
import TitleSection from "./components/title"
import FaqAccordion from "../service/components/faqSection"
import { ContactFormSection } from "./components/form"


export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerRef}>
            <TitleSection/>
            <ContactFormSection/>
            <FaqAccordion/>
        </div>
    )
}
