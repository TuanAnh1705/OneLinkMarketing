import type { Metadata } from "next"
import HeroSection from "./components/hero"
import UspSectionForSocial from "./components/Usp"
import FaqForSocial from "../paid-media-&-advertising/components/faqForPaid"
import TestimonialsForSocial from "./components/testimonialForSocial"
import { serviceDetailController } from "@vns-core/core"
import { buildMetadata } from "@vns-core/core/seo/metadata"
import type { ServiceDetailData } from "@vns-core/core/types/service-detail"

const SLUG = "social-media-management"

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
      <UspSectionForSocial data={data?.advantage ?? null} />
      <FaqForSocial data={data?.faq ?? null} />
      <TestimonialsForSocial data={data?.cta ?? null} />
    </div>
  )
}

export const revalidate = 300
