import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

// Content-Security-Policy tuned for OLMA's stack: Next.js + flowbite/framer inline
// styles, Google Fonts, and images from any HTTPS host (matches the permissive image
// config below). Applied in production only so dev tooling (turbopack, HMR) isn't blocked.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' data: https://fonts.gstatic.com;
  img-src 'self' data: blob: https:;
  media-src 'self' https:;
  connect-src 'self' https:;
  frame-src 'self' https://www.google.com https://maps.google.com https://www.googletagmanager.com;
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
`.replace(/\n/g, ' ').trim();

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  ...(isDev
    ? []
    : [
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
      ]),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    // Client logos in Strapi are SVGs; allow the optimizer to serve them.
    // Safe here because sources are our own trusted CMS, and attachment disposition
    // + the site CSP prevent inline script execution from the SVG.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    remotePatterns: [
      { protocol: 'https', hostname: 'cms.onelinkmarketing.com', pathname: '/**' },
      { protocol: 'https', hostname: 'utfs.io', pathname: '/f/**' },
      { protocol: 'https', hostname: 'hsgcjcoeaqgq.sg.larksuite.com' },
      { protocol: 'https', hostname: '**.larksuite.com' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: '**' },
    ],
  },

  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // Static assets: cache 1 year
        source: '/:path*\\.(ico|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2|otf|ttf)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // API routes reflect live CMS/user state — never edge-cache globally.
        source: '/api/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' }],
      },
    ];
  },

  // Redirects to Dashboard (preserved from the original OLMA config).
  // NOTE: the '/blog' destination had a typo ('hhttp://') in the original — fixed to 'http://'.
  async redirects() {
    return [
      { source: '/admin', destination: 'http://103.110.87.227/admin', permanent: false },
      { source: '/aboutUs', destination: 'http://103.110.87.227/admin/utilities/aboutUs', permanent: false },
      { source: '/categories', destination: 'http://103.110.87.227/admin/categories', permanent: false },
      { source: '/blog', destination: 'http://103.110.87.227/admin/blog', permanent: false },
      { source: '/preview', destination: 'http://103.110.87.227/admin/preview', permanent: false },
      { source: '/review', destination: 'http://103.110.87.227/admin/review', permanent: false },
      { source: '/users-profile', destination: 'http://103.110.87.227/admin/authors', permanent: false },
    ];
  },
};

export default nextConfig;
