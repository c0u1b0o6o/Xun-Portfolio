import { MetadataRoute } from 'next';

// 直接改成你的正式網域，確保 Google 抓到的是正確的 URL 範圍
const baseUrl = 'https://www.cuboouo.com'; 

export default function sitemap(): MetadataRoute.Sitemap {
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