"use client"

import { motion } from "framer-motion"
import type { TagRef } from "@vns-core/core/types/tag"

/**
 * Renders CKEditor 5 HTML (already passed through `rewriteContentMedia` on the server)
 * with the OLMA prose styling, plus the tag chips at the bottom of the article.
 */
export default function ArticleBody({
  html,
  tags,
  variant = "post",
}: {
  html: string
  tags?: TagRef[]
  /** "case-study" turns image-only paragraphs into the old multi-column row grid. */
  variant?: "case-study" | "post"
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`blog-content${variant === "case-study" ? " case-study-content" : ""}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {tags && tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="generalsans-regular text-sm text-[#000A1D] border border-[#000A1D]/20 rounded-full px-4 py-1.5"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <style jsx global>{`
        .blog-content {
          font-family: 'Neulis Alt', sans-serif !important;
          font-size: 1.125rem !important;
          line-height: 1.75rem !important;
          color: #444444 !important;
        }
        .blog-content * { max-width: 100% !important; }
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          font-family: 'Archivo Expanded', sans-serif !important;
          font-weight: 500 !important;
          color: #000A1D !important;
          margin-top: 2.5rem !important;
          margin-bottom: 1.25rem !important;
        }
        .blog-content h1 { font-size: 2.25rem !important; line-height: 2.5rem !important; }
        .blog-content h2 { font-size: 1.875rem !important; line-height: 2.25rem !important; }
        .blog-content h3 { font-size: 1.5rem !important; line-height: 2rem !important; }
        .blog-content p {
          margin-bottom: 1.5rem !important;
          line-height: 1.75 !important;
          color: #444444 !important;
        }
        .blog-content a {
          color: #0074E5 !important;
          text-decoration: none !important;
          transition: all 0.2s !important;
        }
        .blog-content a:hover { text-decoration: underline !important; }
        .blog-content strong,
        .blog-content b { color: #000A1D !important; font-weight: 600 !important; }
        .blog-content ul,
        .blog-content ol {
          margin: 1.5rem 0 !important;
          padding-left: 2.5rem !important;
          color: #444444 !important;
        }
        .blog-content ul { list-style-type: disc !important; }
        .blog-content ol { list-style-type: decimal !important; }
        .blog-content li {
          margin: 0.75rem 0 !important;
          padding-left: 0.5rem !important;
          line-height: 1.75 !important;
        }
        .blog-content ul ul,
        .blog-content ol ol,
        .blog-content ul ol,
        .blog-content ol ul {
          margin: 0.5rem 0 !important;
          padding-left: 2rem !important;
        }
        .blog-content img {
          display: block !important;
          max-width: 100% !important;
          height: auto !important;
          margin: 2rem auto !important;
        }

        /* ── Case study image layout (giữ y bố cục cũ) ──────────────────────────
           layoutCaseStudyImages() bọc mỗi hàng ảnh bằng .cs-figrow + class bố cục:
           2 ảnh = 2 cột; nhóm 3 ảnh ĐẦU = "2 trên (3fr/2fr) + 1 full dưới";
           nhóm 3 ảnh sau = 3 cột đều. Ảnh trong hàng: cao cố định + object-cover +
           bo góc, giống các trang case study cũ (tag/steel). */
        .case-study-content .cs-figrow {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin: 2.5rem 0;
        }
        .case-study-content .cs-figrow img,
        .case-study-content .cs-split-top img {
          width: 100% !important;
          height: 300px !important;
          object-fit: cover !important;
          border-radius: 1.5rem !important;
          margin: 0 !important;
          display: block !important;
        }
        .case-study-content .cs-split-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .case-study-content .cs-figrow-2 { grid-template-columns: 1fr 1fr; }
          .case-study-content .cs-figrow-3 { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .case-study-content .cs-figrow { gap: 1.5rem; }
          .case-study-content .cs-split-top {
            grid-template-columns: 3fr 2fr;
            gap: 1.5rem;
          }
          .case-study-content .cs-figrow img,
          .case-study-content .cs-split-top img {
            height: 600px !important;
          }
        }
        .blog-content figure { margin: 2rem 0 !important; }
        .blog-content figcaption {
          text-align: center !important;
          font-size: 0.875rem !important;
          color: #666666 !important;
          margin-top: 0.5rem !important;
          font-style: italic !important;
        }
        .blog-content blockquote {
          border-left: 4px solid #0074E5 !important;
          margin: 1.5rem 0 !important;
          font-style: italic !important;
          color: #666666 !important;
          background-color: #f9fafb !important;
          padding: 1.5rem !important;
          border-radius: 0.5rem !important;
        }
        .blog-content code {
          background-color: #f3f4f6 !important;
          padding: 0.125rem 0.5rem !important;
          border-radius: 0.25rem !important;
          font-size: 0.875rem !important;
          color: #0074E5 !important;
        }
        .blog-content pre {
          background-color: #1f2937 !important;
          color: #f9fafb !important;
          padding: 1.5rem !important;
          border-radius: 0.75rem !important;
          overflow-x: auto !important;
          margin: 1.5rem 0 !important;
        }
        .blog-content pre code {
          background-color: transparent !important;
          padding: 0 !important;
          color: #f9fafb !important;
        }
        .blog-content table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin: 1.5rem 0 !important;
        }
        .blog-content th,
        .blog-content td {
          padding: 0.75rem !important;
          border: 1px solid #e5e7eb !important;
        }
        .blog-content th { background-color: #f3f4f6 !important; font-weight: 600 !important; }
        .blog-content iframe,
        .blog-content embed,
        .blog-content video {
          max-width: 100% !important;
          height: auto !important;
          margin: 2rem 0 !important;
          border-radius: 0.75rem !important;
        }
      `}</style>
    </>
  )
}
