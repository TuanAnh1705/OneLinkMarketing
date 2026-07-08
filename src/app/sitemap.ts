import type { MetadataRoute } from 'next';
import { caseStudyController, postController, categoryController } from '@vns-core/core';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://onelinkmarketing.com';

// Flat service URLs (served from app/service/<slug> via middleware rewrite).
const SERVICE_SLUGS = [
  'strategy-consulting',
  'digital-asset-development',
  'search-engine-optimization',
  'paid-media-&-advertising',
  'social-media-management',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                       changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/about`,            changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/service`,          changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/case-studies`,     changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/contact`,          changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`,   changeFrequency: 'yearly',  priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Case studies, posts and category filters are served FLAT at /<slug>.
  const [csRes, postRes, catRes] = await Promise.allSettled([
    caseStudyController.getAll(),
    postController.getAll(),
    categoryController.getAll(),
  ]);

  const caseStudyPages: MetadataRoute.Sitemap =
    csRes.status === 'fulfilled'
      ? (csRes.value.data ?? []).map((cs) => ({
          url: `${BASE_URL}/${cs.slug}`,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }))
      : [];

  const postPages: MetadataRoute.Sitemap =
    postRes.status === 'fulfilled'
      ? (postRes.value.data ?? []).map((p) => ({
          url: `${BASE_URL}/${p.slug}`,
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }))
      : [];

  const categoryPages: MetadataRoute.Sitemap =
    catRes.status === 'fulfilled'
      ? (catRes.value.data ?? [])
          // The " Case Studies" category slug ("case-studies") collides with the listing page.
          .filter((c) => c.slug && c.slug !== 'case-studies')
          .map((c) => ({
            url: `${BASE_URL}/${c.slug}`,
            changeFrequency: 'weekly' as const,
            priority: 0.5,
          }))
      : [];

  return [
    ...staticPages,
    ...servicePages,
    ...caseStudyPages,
    ...postPages,
    ...categoryPages,
  ];
}

export const revalidate = 3600;
