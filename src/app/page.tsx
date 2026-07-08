import SectionHero from "./components/homePage/heroSection"
import SectionWork from "./components/homePage/workSection"
import SectionProjects from "./components/homePage/projectSection"
import ServiceSection from "./components/homePage/serviceSection"
import TestimonialsSection from "./components/homePage/testimonalSection"
import PainPointSection from "./components/homePage/painPointSection"
import GetAFree from "./components/homePage/getFree"
import AnimatedText from "./components/homePage/AnimatedText"
import { homepageController } from "@vns-core/core"
import type { HomepageData } from "@vns-core/core/types/homepage"

export default async function Home() {
  // Homepage content from Strapi via @vns-core/core. Every section falls back to its
  // built-in defaults when data is null, so the page always renders (build-safe).
  let data: HomepageData | null = null
  try {
    const res = await homepageController.getPageData()
    data = res.data
  } catch (error) {
    console.error("Error fetching homepage data:", error)
  }

  return (
    <div>
      {/* -mt-20 cancels main's pt-20 so background extends under the fixed navbar */}
      <div className="relative hero-bg -mt-20">
        <SectionHero data={data?.hero ?? null} />
      </div>
      <PainPointSection data={data?.painPoint ?? null} />
      <div className="hidden lg:block">
        <AnimatedText data={data?.banner ?? null} />
      </div>
      <SectionWork data={data?.work ?? null} />
      <SectionProjects data={data?.projects ?? null} />
      <ServiceSection data={data?.services ?? null} />
      <TestimonialsSection data={data?.testimonials ?? null} />
      <GetAFree data={data?.cta ?? null} />
    </div>
  )
}

// ISR: render once, then serve cached HTML for `revalidate` seconds. /api/revalidate
// (Strapi publish webhook) busts this so CMS edits appear immediately.
export const revalidate = 300
