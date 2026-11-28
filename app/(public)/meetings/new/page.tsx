import Link from 'next/link';
import MeetingForm from '@/components/MeetingForm';

export default function NewMeetingPage() {
  return (
    <div className="meetings-page">
      <header className="meetings-page-heading">
        <p className="eyebrow">Meeting program</p>
        <h1 className="meetings-page-title">Create a Meeting</h1>
        <p className="meetings-page-intro">
          Add the details for an upcoming sacrament meeting program.
        </p>
      </header>
      <MeetingForm />
      <Link href="/meetings" className="button button-secondary">
        Cancel and return to meetings
      </Link>
    </div>
  );
}
