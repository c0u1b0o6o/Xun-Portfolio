import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://xun-portfolio.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  // 由於網站是 SPA (Single Page Application)，所有頁面都通過客戶端路由在 / 上
  // 只列出真實存在的 URL 路由
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  return routes;
}
