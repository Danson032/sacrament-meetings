import type { MetadataRoute } from 'next';
import { getPublicSiteUrl } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getPublicSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    ...(siteUrl ? { sitemap: new URL('/sitemap.xml', siteUrl).href } : {}),
  };
}
