import type { MetadataRoute } from 'next';
import { getMeetings } from '@/lib/meetings-db';
import { getPublicSiteUrl } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getPublicSiteUrl();

  if (!siteUrl) {
    return [];
  }

  const publicPages = ['/', '/meetings'];
  const meetingPages = getMeetings().map(
    (meeting) => `/meetings/${meeting.id}`,
  );

  return [...publicPages, ...meetingPages].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
