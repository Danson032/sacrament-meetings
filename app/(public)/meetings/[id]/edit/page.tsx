import Link from 'next/link';
import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { getMeetingById } from '@/lib/meetings-db';

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

function parseMeetingId(rawId: string): number | null {
  if (!/^[1-9]\d*$/.test(rawId)) {
    return null;
  }

  const id = Number(rawId);
  return Number.isSafeInteger(id) ? id : null;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id: rawId } = await params;
  const id = parseMeetingId(rawId);
  if (id === null) {
    notFound();
  }

  const meeting = await getMeetingById(id);
  if (!meeting) {
    notFound();
  }

  return (
    <div className="meetings-page">
      <header className="meetings-page-heading">
        <p className="eyebrow">Meeting program #{meeting.id}</p>
        <h1 className="meetings-page-title">Edit Meeting</h1>
        <p className="meetings-page-intro">
          Update the meeting schedule and program details.
        </p>
      </header>
      <MeetingForm meeting={meeting} />
      <Link
        href={`/meetings/${meeting.id}`}
        className="button button-secondary"
      >
        Cancel and return to meeting
      </Link>
    </div>
  );
}
