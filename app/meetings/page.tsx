import MeetingCard from '@/components/MeetingCard';
import { getMeetings } from '@/lib/meetings-db';
import { getPublicSiteUrl } from '@/lib/site-config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Meetings',
  description:
    'Browse sample sacrament meeting programs and schedules for Meru Ward.',
  ...(getPublicSiteUrl()
    ? { alternates: { canonical: '/meetings' } }
    : {}),
};

export default function MeetingsPage() {
  const meetings = getMeetings();

  return (
    <div className="meetings-page">
      <header className="meetings-page-heading">
        <p className="eyebrow">Meru Ward</p>
        <h1 className="meetings-page-title">Sacrament Meetings</h1>
        <p className="meetings-page-intro">
          Browse available meeting programs, including schedules, hymns,
          speakers, prayers, and announcements.
        </p>
      </header>

      {meetings.length > 0 ? (
        <section
          className="meeting-list-grid"
          aria-label="Available sacrament meeting programs"
        >
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </section>
      ) : (
        <section className="meetings-empty-state" role="status">
          <h2>No meetings available</h2>
          <p>
            There are no meeting programs to display right now. Please check
            back later.
          </p>
        </section>
      )}
    </div>
  );
}
