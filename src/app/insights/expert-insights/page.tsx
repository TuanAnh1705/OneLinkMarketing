"use client"

import Footer from "@/app/components/homePage/Footer"
import Navbar from "@/app/components/homePage/navBar"
import { useRef } from "react"
import BlogSection from "./components/blog"
import { ReplyForm } from "./components/leaveAReply"
import { RelatedPosts } from "./components/related"


export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerRef}>
            <div className="relative">
                <Navbar />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#0074E5] to-[#162660]" />
            </div>
            <BlogSection/>
            <ReplyForm/>
            <RelatedPosts/>
            <Footer />
        </div>
    )
}
