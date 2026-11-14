
import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
    meeting: SacramentMeeting;
}

export default function MeetingCard({
    meeting,
}: MeetingCardProps) {
    return (
        <article className="meeting-card">
            <div className="meeting-card-top">
                <div>
                    <h2 className="meeting-card-date">
                        {new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
                            'en-KE',
                            {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            }
                        )}
                    </h2>

                    <p className="meeting-card-type">
                        {meeting.meetingType} meeting
                    </p>
                </div>

                <span className="meeting-id">
                    #{meeting.id}
                </span>
            </div>

            <div className="meeting-card-info">
                <p>
                    <strong>Presiding:</strong> {meeting.presiding}
                </p>
                <p>
                    <strong>Conducting:</strong> {meeting.conducting}
                </p>
                <p>
                    <strong>Opening Hymn:</strong> {meeting.openingHymn.title}
                </p>
            </div>

            <Link
                href={`/meetings/${meeting.id}`}
                className="button button-primary meeting-card-action"
            >
                View Meeting
            </Link>
        </article>
    );
}
