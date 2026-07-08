import type { Metadata } from "next"
import { redirect } from "next/navigation"
import {
  caseStudyController,
  postController,
  categoryController,
} from "@vns-core/core"
import { buildMetadata } from "@vns-core/core/seo/metadata"
import { rewriteContentMedia } from "@vns-core/core/api/media-url"
import { layoutCaseStudyImages } from "@/lib/caseStudyImages"
import type { CaseStudyData } from "@vns-core/core/types/case-study"
import type { PostData } from "@vns-core/core/types/post"

import CaseStudiesView from "../components/CaseStudiesView"
import CaseStudyDetail from "./components/case-study-detail"
import PostDetail from "./components/post-detail"
import { ReplyForm } from "./components/leaveAReply"
import { RelatedPosts } from "./components/related"

type Resolved =
  | { kind: "case-study"; cs: CaseStudyData }
  | { kind: "post"; post: PostData }
  | { kind: "category"; slug: string }
  | null

// Everything is served FLAT at /{slug}: a case study, a post, or a category
// (opens the /case-studies landing filtered to that category). Detail content is
// checked first (the common case), then category. Nothing matches → 301 home.
async function resolveEntry(slug: string): Promise<Resolved> {
  const cs = await caseStudyController.getBySlug(slug).catch(() => null)
  if (cs) return { kind: "case-study", cs }

  const post = await postController.getBySlug(slug).catch(() => null)
  if (post) return { kind: "post", post }

  const catRes = await categoryController.getAll().catch(() => null)
  const isCategory = (catRes?.data ?? []).some((c) => c.slug === slug)
  if (isCategory) return { kind: "category", slug }

  return null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = await resolveEntry(slug)
  const seo =
    entry?.kind === "case-study"
      ? entry.cs.DefaultSEO
      : entry?.kind === "post"
        ? entry.post.DefaultSEO
        : null
  return buildMetadata(seo ?? null, `/${slug}`) as Metadata
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = await resolveEntry(slug)

  if (!entry) redirect("/")

  if (entry.kind === "category") {
    return <CaseStudiesView initialCategory={entry.slug} />
  }

  if (entry.kind === "case-study") {
    const jsonld = entry.cs.seoSchemaJsonld
    return (
      <>
        {jsonld && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
          />
        )}
        <CaseStudyDetail
          data={entry.cs}
          contentHtml={layoutCaseStudyImages(rewriteContentMedia(entry.cs.content ?? ""))}
        />
      </>
    )
  }

  // Post — pull related posts (exclude current) for the bottom section.
  const listRes = await postController.getAll().catch(() => null)
  const related = (listRes?.data ?? [])
    .filter((p) => p.slug !== entry.post.slug)
    .slice(0, 3)

  const jsonld = entry.post.seoSchemaJsonld

  return (
    <div className="overflow-x-hidden">
      {jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
        />
      )}
      <PostDetail data={entry.post} contentHtml={rewriteContentMedia(entry.post.content ?? "")} />
      <ReplyForm />
      <RelatedPosts posts={related} />
    </div>
  )
}

export const revalidate = 300
