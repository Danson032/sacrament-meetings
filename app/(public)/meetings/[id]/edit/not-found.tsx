import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <section className="meetings-empty-state meeting-not-found" role="status">
      <p className="eyebrow">Program unavailable</p>
      <h1 className="meetings-page-title">Meeting not found</h1>
      <p className="meetings-page-intro">
        We could not find a meeting program with that ID.
      </p>
      <Link href="/meetings" className="button button-primary">
        Back to All Meetings
      </Link>
    </section>
  );
}
