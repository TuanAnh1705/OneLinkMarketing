/**
 * Reproduce the old bespoke case-study image layout from CKEditor HTML.
 *
 * In the CMS, the images that belonged to one "row" are grouped inside a single
 * <p>. This transform wraps each image-only <p> with an explicit layout class so
 * the FE can render the exact old arrangement:
 *   - 1 image   → left as-is (full-width, natural aspect)
 *   - 2 images  → 2 equal columns
 *   - 3 images  → the FIRST such group is "2+1" (two on top at 3fr/2fr, third
 *                 full-width below); every later 3-image group is 3 equal columns
 *   - 4+ images → 3-column grid (wraps)
 *
 * Runs on the server (pure string transform), applied only to case-study content.
 */
export function layoutCaseStudyImages(html: string): string {
  if (!html) return html

  let threeGroupIndex = 0

  return html.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (full, inner: string) => {
    // A row only qualifies if the paragraph contains nothing but <img> tags.
    const withoutImgs = inner.replace(/<img\b[^>]*>/gi, "").replace(/&nbsp;|\s+/g, "")
    if (withoutImgs !== "") return full

    const imgs = inner.match(/<img\b[^>]*>/gi) || []
    const n = imgs.length
    if (n <= 1) return full // single image: keep default full-width rendering

    if (n === 2) {
      return `<div class="cs-figrow cs-figrow-2">${imgs.join("")}</div>`
    }

    if (n === 3) {
      threeGroupIndex += 1
      if (threeGroupIndex === 1) {
        // "2 + 1": two images on top (3fr / 2fr), one full-width below.
        return (
          `<div class="cs-figrow cs-figrow-split">` +
          `<div class="cs-split-top">${imgs[0]}${imgs[1]}</div>` +
          `${imgs[2]}` +
          `</div>`
        )
      }
      return `<div class="cs-figrow cs-figrow-3">${imgs.join("")}</div>`
    }

    // 4+ images → 3-column grid that wraps.
    return `<div class="cs-figrow cs-figrow-3">${imgs.join("")}</div>`
  })
}
