import type { Metadata } from "next"
import { caseStudyPageController } from "@vns-core/core"
import { buildMetadata } from "@vns-core/core/seo/metadata"
import type { CaseStudyPageData } from "@vns-core/core/types/case-study-page"
import CaseStudiesView from "./components/CaseStudiesView"

export async function generateMetadata(): Promise<Metadata> {
    let seo: CaseStudyPageData["DefaultSEO"] = null
    try {
        seo = (await caseStudyPageController.getPageData()).data?.DefaultSEO ?? null
    } catch (error) {
        console.error("Error fetching case-study-page SEO:", error)
    }
    return buildMetadata(seo ?? null, "/case-studies") as Metadata
}

export default async function Page() {
    return <CaseStudiesView />
}

// ISR: render once, then serve cached HTML for `revalidate` seconds. /api/revalidate
// (Strapi publish webhook) busts this so CMS edits appear immediately.
export const revalidate = 300
