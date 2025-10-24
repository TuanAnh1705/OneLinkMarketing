"use client"


import { useRef } from "react"
import BlogSection from "./components/blog"
import { ReplyForm } from "./components/leaveAReply"
import { RelatedPosts } from "./components/related"


export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerRef}>
            <BlogSection/>
            <ReplyForm/>
            <RelatedPosts/>
        </div>
    )
}
