
import Link from 'next/link';
import DeleteMeetingForm from '@/components/DeleteMeetingForm';
import { formatMeetingDate } from '@/lib/meeting-dates';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = formatMeetingDate(meeting.date, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="meeting-card">
      <div className="meeting-card-top">
        <div>
          <h2 className="meeting-card-date">{formattedDate}</h2>
          <p className="meeting-card-type">{meeting.meetingType} meeting</p>
        </div>

        <span className="meeting-id">
          Program #{meeting.id}
        </span>
      </div>

      <dl className="meeting-card-info">
        <div>
          <dt>Presiding</dt>
          <dd>{meeting.presiding}</dd>
        </div>
        <div>
          <dt>Conducting</dt>
          <dd>{meeting.conducting}</dd>
        </div>
        <div>
          <dt>Opening hymn</dt>
          <dd>{meeting.openingHymn.title}</dd>
        </div>
      </dl>

      <div className="meeting-card-actions">
        <Link
          href={`/meetings/${meeting.id}`}
          className="button button-primary meeting-card-action"
        >
          View Meeting
        </Link>
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="button button-secondary meeting-card-action"
        >
          Edit Meeting
        </Link>
        <DeleteMeetingForm meetingId={meeting.id} />
      </div>
    </article>
  );
}
