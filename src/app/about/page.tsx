import Hero from "./components/hero"
import { StorySection } from "./components/ourStory"
import { RoadmapSection } from "./components/roadMap"
import { CoreValuesSection } from "./components/coreValue"
import { TeamSection } from "./components/member"
import { aboutController } from "@vns-core/core"
import type { AboutData } from "@vns-core/core/types/about"

export default async function Home() {
    // About content from Strapi via @vns-core/core. Every section falls back to its
    // built-in defaults when data is null, so the page always renders (build-safe).
    let data: AboutData | null = null
    try {
        const res = await aboutController.getPageData()
        data = res.data
    } catch (error) {
        console.error("Error fetching about data:", error)
    }

    return (
        <div>
            <Hero data={data?.hero ?? null} />
            <StorySection data={data?.ourStory ?? null} />
            <RoadmapSection data={data?.roadmap ?? null} />
            <CoreValuesSection data={data?.coreValues ?? null} />
            <TeamSection data={data?.team ?? null} />
        </div>
    )
}

// ISR: render once, then serve cached HTML for `revalidate` seconds. /api/revalidate
// (Strapi publish webhook) busts this so CMS edits appear immediately.
export const revalidate = 300
