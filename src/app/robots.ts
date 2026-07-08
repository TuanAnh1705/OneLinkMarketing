import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://onelinkmarketing.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/cdn-cgi/'],
        crawlDelay: 6,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
