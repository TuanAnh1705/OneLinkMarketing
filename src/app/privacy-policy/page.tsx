import { privacyPageController } from "@vns-core/core"
import { rewriteContentMedia } from "@vns-core/core/api/media-url"
import type { PrivacyPageData } from "@vns-core/core/types/privacy-page"

export const revalidate = 300

export default async function PrivacyPolicyPage() {
  let data: PrivacyPageData | null = null
  try {
    data = (await privacyPageController.getPageData()).data
  } catch (e) {
    console.error("Failed to load privacy page:", e)
  }

  const title = data?.title ?? "Privacy Policy"
  const subtitle = data?.subtitle ?? "CUSTOMER INFORMATION PRIVACY POLICY"
  const lastUpdated = data?.lastUpdated ?? "October 28, 2025"
  const content = data?.content ? rewriteContentMedia(data.content) : null

  return (
    // MỚI: Thêm 'generalsans-regular' làm font chữ cơ sở cho cả trang
    <main className="bg-white py-16 sm:py-24 generalsans-regular mb-40 md:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* === TIÊU ĐỀ TRANG === */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-black archivo-expanded">
            {title}
          </h1>
          <p className="mt-4 text-base font-semibold uppercase text-black tracking-wider generalsans-regular">
            {subtitle}
          </p>
        </div>

        {/* === NỘI DUNG CHÍNH SÁCH === */}
        <article className="
          prose prose-lg lg:prose-xl
          max-w-7xl
          prose-headings:archivo-expanded
          prose-p:generalsans-regular
          prose-li:generalsans-regular
          prose-h2:font-semibold
          prose-h2:text-2xl
          prose-h2:mb-4
          prose-h2:mt-10
          prose-ul:list-disc
          prose-ul:ml-6
          prose-li:my-2
          prose-strong:font-semibold
          prose-strong:text-gray-800
        ">
          {content && <div dangerouslySetInnerHTML={{ __html: content }} />}

          {/* MỚI: Thêm font-semibold để làm nổi bật ngày */}
          <p className="font-semibold">
            This policy was last updated on {lastUpdated}.
          </p>
        </article>
      </div>
    </main>
  )
}
