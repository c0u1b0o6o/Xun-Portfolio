import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* SEO and Performance Optimization */
  compress: true,
  poweredByHeader: false,
  
  /* Image Optimization */
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },

  /* Headers for SEO and Security */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()'
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
        ],
      },
    ];
  },

  /* Redirects for SEO */
  async redirects() {
    return [];
  },

  /* Rewrites for clean URLs */
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
