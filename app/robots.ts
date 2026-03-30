import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://xun-portfolio.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          '/*.json$',
          '/*?*sort=',
          '/*?*filter=',
        ],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
