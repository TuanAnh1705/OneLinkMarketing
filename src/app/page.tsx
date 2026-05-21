"use client"

import SectionHero from "./components/homePage/heroSection"
import SectionWork from "./components/homePage/workSection"
import SectionProjects from "./components/homePage/projectSection"
import ServiceSection from "./components/homePage/serviceSection"
import TestimonialsSection from "./components/homePage/testimonalSection"
import PainPointSection from "./components/homePage/painPointSection"
import GetAFree from "./components/homePage/getFree"
import AnimatedText from "./components/homePage/AnimatedText"


export default function Home() {
  return (
    <div>
      {/* -mt-20 cancels main's pt-20 so background extends under the fixed navbar */}
      <div className="relative hero-bg -mt-20">
        <SectionHero />
      </div>
      <PainPointSection />
      <div className="hidden lg:block">
        <AnimatedText />
      </div>
      <SectionWork />
      <SectionProjects />
      <ServiceSection />
      <TestimonialsSection />
      <GetAFree />
    </div>
  )
}
