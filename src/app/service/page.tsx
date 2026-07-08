import type { Metadata } from "next"
import ExpertiseSection from "./components/expertise"
import ReadyToTransform from "./components/readyToTransform"
import { PartnerSection } from "./components/partner"
import FaqSection from "./components/faqSection"
import { serviceController } from "@vns-core/core"
import { buildMetadata } from "@vns-core/core/seo/metadata"
import type { ServiceData } from "@vns-core/core/types/service"

async function getServiceData(): Promise<ServiceData | null> {
    try {
        const res = await serviceController.getPageData()
        return res.data
    } catch (error) {
        console.error("Error fetching service page data:", error)
        return null
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const data = await getServiceData()
    return buildMetadata(data?.DefaultSEO ?? null, "/service") as Metadata
}

export default async function Home() {
    // Service page content from Strapi via @vns-core/core. Every section falls back to
    // its built-in defaults when data is null, so the page always renders (build-safe).
    const data = await getServiceData()

    return (
        <div>
            <ExpertiseSection data={data?.expertise ?? null} />
            <PartnerSection data={data?.partner ?? null} />
            <FaqSection data={data?.faq ?? null} />
            <ReadyToTransform data={data?.readyToTransform ?? null} />
        </div>
    )
}

// ISR: render once, then serve cached HTML for `revalidate` seconds. /api/revalidate
// (Strapi publish webhook) busts this so CMS edits appear immediately.
export const revalidate = 300
