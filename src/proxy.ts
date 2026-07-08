import { NextRequest, NextResponse } from 'next/server';

// Next.js 16 renamed `middleware` → `proxy` (file `proxy.ts`, function `proxy`).
// Same responsibilities as before: flat service-slug routing + anonymising headers
// + revalidate-secret guard + 404 → 301 home.

// ── Real top-level pages in app/ that render directly ────────────────────────
const KNOWN_EXACT = new Set<string>([
  '/',
  '/about',
  '/service',
  '/case-studies',
  '/contact',
  '/privacy-policy',
]);

// Service detail pages. They physically live at app/service/<slug>/ but are served
// on a FLAT url (/<slug>) — the canonical, SEO-friendly form the client asked for.
// Folder names are matched exactly (note the literal "&" in paid-media).
const SERVICE_SLUGS = new Set<string>([
  'strategy-consulting',
  'digital-asset-development',
  'search-engine-optimization',
  'paid-media-&-advertising',
  'social-media-management',
]);

// Strip identifying headers so the origin server stays anonymous.
function stripHeaders(res: NextResponse): NextResponse {
  res.headers.delete('Server');
  res.headers.delete('X-Powered-By');
  return res;
}

export function proxy(request: NextRequest): NextResponse {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // ── API routes: guard the revalidate secret, never apply flat routing ──
  if (pathname.startsWith('/api')) {
    if (pathname === '/api/revalidate') {
      const secret =
        url.searchParams.get('secret') ?? request.headers.get('x-revalidate-secret');
      if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
    return stripHeaders(NextResponse.next());
  }

  // ── Metadata / static-like files (sitemap.xml, robots.txt, *.ico…) pass through ──
  if (/\.[^/]+$/.test(pathname)) {
    return stripHeaders(NextResponse.next());
  }

  // Normalize a single trailing slash for the lookups below.
  const normalized =
    pathname !== '/' && pathname.endsWith('/') ? pathname.replace(/\/+$/, '') : pathname;

  const segments = normalized.split('/').filter(Boolean);

  // 1. Legacy nested service URLs → permanent (301) redirect to the flat url.
  //    /service/strategy-consulting → /strategy-consulting
  if (normalized.startsWith('/service/')) {
    const slug = normalized.slice('/service/'.length);
    if (SERVICE_SLUGS.has(slug)) {
      const dest = new URL(`/${slug}`, request.url);
      dest.search = url.search;
      return NextResponse.redirect(dest, 301);
    }
  }

  // 2. Legacy nested case-study/post URLs → 301 to the flat url.
  //    /case-studies/<slug> → /<slug>   (the listing /case-studies itself stays below)
  if (segments.length === 2 && segments[0] === 'case-studies') {
    const dest = new URL(`/${segments[1]}`, request.url);
    dest.search = url.search;
    return NextResponse.redirect(dest, 301);
  }

  // 3. Known real page → let Next render it (includes the /case-studies listing).
  if (KNOWN_EXACT.has(normalized)) {
    return stripHeaders(NextResponse.next());
  }

  // 4. Flat service slug → internal rewrite to the real page, keeping the flat url.
  if (segments.length === 1 && SERVICE_SLUGS.has(segments[0])) {
    const dest = new URL(`/service/${segments[0]}`, request.url);
    dest.search = url.search;
    return stripHeaders(NextResponse.rewrite(dest));
  }

  // 5. Any other single flat segment → rewrite to the case-studies [slug] resolver,
  //    which serves a case study, a post, or a category-filtered landing. Unknown
  //    slugs 301 to home from inside that page (data-driven, so it can't be decided
  //    statically here).
  if (segments.length === 1) {
    const dest = new URL(`/case-studies/${segments[0]}`, request.url);
    dest.search = url.search;
    return stripHeaders(NextResponse.rewrite(dest));
  }

  // 6. Deeper unknown paths → permanent (301) redirect to the homepage.
  return NextResponse.redirect(new URL('/', request.url), 301);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|woff|woff2|ttf|otf)).*)',
  ],
};
