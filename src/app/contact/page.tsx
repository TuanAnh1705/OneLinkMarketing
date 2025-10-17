"use client"

import { useRef } from "react"
import Navbar from "../components/homePage/navBar"
import Footer from "../components/homePage/Footer"
import TitleSection from "./components/title"
import FaqAccordion from "../service/components/faqSection"
import { ContactFormSection } from "./components/form"


export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerRef}>
            <div className="relative">
                <Navbar />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#0074E5] to-[#162660]" />
            </div>
            <TitleSection/>
            <ContactFormSection/>
            <FaqAccordion/>
            <Footer />
        </div>
    )
}
