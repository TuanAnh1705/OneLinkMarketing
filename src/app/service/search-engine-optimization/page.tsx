import type { Metadata } from "next"
import HeroSection from "./components/hero"
import UspSectionForSeo from "./components/UspForSeo"
import FaqForSeo from "./components/faqForSeo"
import TestimonialsForSeo from "./components/testimonialForSeo"
import { serviceDetailController } from "@vns-core/core"
import { buildMetadata } from "@vns-core/core/seo/metadata"
import type { ServiceDetailData } from "@vns-core/core/types/service-detail"

const SLUG = "search-engine-optimization"

async function getData(): Promise<ServiceDetailData | null> {
  try {
    return await serviceDetailController.getBySlug(SLUG)
  } catch (error) {
    console.error(`Error fetching service-detail "${SLUG}":`, error)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData()
  return buildMetadata(data?.DefaultSEO ?? null, `/${SLUG}`) as Metadata
}

export default async function Home() {
  const data = await getData()

  return (
    <div>
      <HeroSection hero={data?.hero ?? null} whatsIncluded={data?.whatsIncluded ?? null} />
      <UspSectionForSeo data={data?.advantage ?? null} />
      <FaqForSeo data={data?.faq ?? null} />
      <TestimonialsForSeo data={data?.cta ?? null} />
    </div>
  )
}

export const revalidate = 300
