import { contactPageController } from "@vns-core/core"
import type { ContactPageData } from "@vns-core/core/types/contact-page"
import TitleSection from "./components/title"
import { ContactFormSection } from "./components/form"
import Faq from "./components/faq"

export const revalidate = 300

export default async function ContactPage() {
    let data: ContactPageData | null = null
    try {
        data = (await contactPageController.getPageData()).data
    } catch (e) {
        console.error("Failed to load contact page:", e)
    }

    return (
        <div>
            <TitleSection heroTitle={data?.heroTitle ?? null} />
            <ContactFormSection
                formHeading={data?.formHeading ?? null}
                getInTouchHeading={data?.getInTouchHeading ?? null}
                getInTouchText={data?.getInTouchText ?? null}
                contactEmail={data?.contactEmail ?? null}
                followHeading={data?.followHeading ?? null}
                socials={data?.socials ?? null}
            />
            <Faq heading={data?.faqHeading ?? null} items={data?.faqItems ?? null} />
        </div>
    )
}
