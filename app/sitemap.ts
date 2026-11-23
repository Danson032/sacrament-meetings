import type { MetadataRoute } from 'next';
import { getMeetings } from '@/lib/meetings-db';
import { getPublicSiteUrl } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getPublicSiteUrl();

  if (!siteUrl) {
    return [];
  }

  const publicPages = ['/', '/meetings'];
  const meetingPages = (await getMeetings()).map(
    (meeting) => `/meetings/${meeting.id}`,
  );

  return [...publicPages, ...meetingPages].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
