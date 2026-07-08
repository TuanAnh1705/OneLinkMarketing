import {
    caseStudyPageController,
    caseStudyController,
    postController,
    categoryController,
} from "@vns-core/core"
import type { CaseStudyPageData } from "@vns-core/core/types/case-study-page"
import type { CaseStudyData } from "@vns-core/core/types/case-study"
import type { PostData } from "@vns-core/core/types/post"
import type { CategoryData } from "@vns-core/core/types/category"

import HeroSection from "./heroSection"
import CaseStudies from "./caseStudies"
import ExpertSection from "./expert"
import FaqAccordion from "./faqSection"
import ExploreSection from "./explore"

/**
 * The `/case-studies` landing. Rendered both by `case-studies/page.tsx` (no filter)
 * and by the flat `/{category-slug}` route (`initialCategory` set) so a category URL
 * opens the page with that Expert-Insights tab pre-selected.
 */
export default async function CaseStudiesView({
    initialCategory,
}: {
    initialCategory?: string
}) {
    let page: CaseStudyPageData | null = null
    let caseStudies: CaseStudyData[] = []
    let posts: PostData[] = []
    let categories: CategoryData[] = []

    const [pageRes, csRes, postRes, catRes] = await Promise.allSettled([
        caseStudyPageController.getPageData(),
        caseStudyController.getAll(),
        postController.getAll(),
        categoryController.getAll(),
    ])

    if (pageRes.status === "fulfilled") page = pageRes.value.data ?? null
    else console.error("Error fetching case-study-page:", pageRes.reason)

    if (csRes.status === "fulfilled") caseStudies = csRes.value.data ?? []
    else console.error("Error fetching case-studies:", csRes.reason)

    if (postRes.status === "fulfilled") posts = postRes.value.data ?? []
    else console.error("Error fetching posts:", postRes.reason)

    if (catRes.status === "fulfilled") categories = catRes.value.data ?? []
    else console.error("Error fetching categories:", catRes.reason)

    return (
        <div>
            <HeroSection data={page?.hero ?? null} />
            <CaseStudies items={caseStudies} heading={page?.caseStudiesHeading ?? null} />
            <ExpertSection
                posts={posts}
                categories={categories}
                heading={page?.expertInsightsHeading ?? null}
                initialCategory={initialCategory}
            />
            <FaqAccordion data={page?.faq ?? null} />
            <ExploreSection data={page?.explore ?? null} />
        </div>
    )
}
