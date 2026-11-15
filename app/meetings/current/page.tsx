import Link from 'next/link';
import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';
import {
  formatMeetingDate,
  getMostRecentSundayDate,
} from '@/lib/meeting-dates';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Current Meeting',
  description:
    'Find the sample meeting program scheduled for the current Sunday in Meru Ward.',
  robots: { index: false, follow: true },
};

export default async function CurrentMeetingPage() {
  await connection();

  const sundayDate = getMostRecentSundayDate(new Date());
  const [meeting] = getMeetings(sundayDate);

  if (meeting) {
    redirect(`/meetings/${meeting.id}`);
  }

  const formattedDate = formatMeetingDate(sundayDate, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section
      className="meetings-empty-state current-meeting-empty"
      role="status"
    >
      <p className="eyebrow">Meru Ward</p>
      <h1 className="meetings-page-title">No meeting scheduled</h1>
      <p className="meetings-page-intro">
        There is no meeting program available for {formattedDate}. You can
        browse all meetings to view other programs.
      </p>
      <Link href="/meetings" className="button button-primary">
        View All Meetings
      </Link>
    </section>
  );
}
