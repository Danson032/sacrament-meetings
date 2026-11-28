import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MeetingDetail from '@/components/MeetingDetail';
import { formatMeetingDate } from '@/lib/meeting-dates';
import { getMeetingById } from '@/lib/meetings-db';
import { getPublicSiteUrl } from '@/lib/site-config';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

function parseMeetingId(rawId: string): number | null {
  if (!/^[1-9]\d*$/.test(rawId)) {
    return null;
  }

  const id = Number(rawId);
  return Number.isSafeInteger(id) ? id : null;
}

export async function generateMetadata({
  params,
}: MeetingPageProps): Promise<Metadata> {
  const { id: rawId } = await params;
  const id = parseMeetingId(rawId);
  const meeting = id === null ? null : await getMeetingById(id);

  if (!meeting) {
    return {
      title: 'Meeting Not Found',
      description: 'The requested sacrament meeting program could not be found.',
      robots: { index: false, follow: true },
    };
  }

  const date = formatMeetingDate(meeting.date, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return {
    title: `Meeting Program for ${date}`,
    description: `View and print the Meru Ward sacrament meeting program for ${date}.`,
    ...(getPublicSiteUrl()
      ? { alternates: { canonical: `/meetings/${meeting.id}` } }
      : {}),
  };
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id: rawId } = await params;
  const id = parseMeetingId(rawId);

  const meeting = id === null ? null : await getMeetingById(id);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="meeting-page">
      <Link
        href="/meetings"
        className="button button-secondary meeting-page-back print-hidden"
      >
        Back to All Meetings
      </Link>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
