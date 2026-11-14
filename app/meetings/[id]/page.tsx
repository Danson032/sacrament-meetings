import Link from 'next/link';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id: rawId } = await params;

  if (!/^[1-9]\d*$/.test(rawId)) {
    notFound();
  }

  const id = Number(rawId);

  if (!Number.isSafeInteger(id)) {
    notFound();
  }

  const meeting = getMeetingById(id);

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
