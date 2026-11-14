import PrintProgramButton from '@/components/PrintProgramButton';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
    'en-KE',
    {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  );

  return (
    <article className="meeting-detail">
      <header className="meeting-detail-heading">
        <p className="meeting-detail-kicker">
          Meru Ward | Program #{meeting.id}
        </p>
        <h1 className="meeting-detail-title">Sacrament Meeting</h1>
        <p className="meeting-detail-date">{formattedDate}</p>
        <p className="meeting-detail-type">{meeting.meetingType} Meeting</p>
      </header>

      <div className="meeting-leaders">
        <div className="leader-item">
          <span className="leader-label">Presiding</span>
          <span className="leader-name">{meeting.presiding}</span>
        </div>
        <div className="leader-item">
          <span className="leader-label">Conducting</span>
          <span className="leader-name">{meeting.conducting}</span>
        </div>
      </div>

      <section className="agenda-section">
        <h2>Announcements</h2>
        {meeting.announcements?.length ? (
          <ul className="agenda-list">
            {meeting.announcements.map((announcement, index) => (
              <li key={`${announcement}-${index}`}>{announcement}</li>
            ))}
          </ul>
        ) : (
          <p className="agenda-note">No announcements.</p>
        )}
      </section>

      <section className="agenda-section">
        <h2>Opening Hymn</h2>
        <p>
          {meeting.openingHymn.number} - {meeting.openingHymn.title}
        </p>
      </section>

      <section className="agenda-section">
        <h2>Opening Prayer</h2>
        <p>{meeting.openingPrayer}</p>
      </section>

      <section className="agenda-section">
        <h2>Ward Business</h2>
        {meeting.wardBusiness.length ? (
          <ul className="agenda-list">
            {meeting.wardBusiness.map((item, index) => (
              <li key={`${item.description}-${index}`}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p className="agenda-note">No ward business.</p>
        )}
      </section>

      <section className="agenda-section">
        <h2>Stake Business</h2>
        <p className="stake-business-status">
          {meeting.stakeBusiness ? 'Yes' : 'No'}
        </p>
      </section>

      <section className="agenda-section">
        <h2>Sacrament Hymn</h2>
        <p>
          {meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}
        </p>
      </section>

      <section className="agenda-section">
        <h2>Speakers and Musical Numbers</h2>
        {meeting.speakers.length ? (
          <ul className="speaker-list">
            {meeting.speakers.map((item, index) => (
              <li key={`${item.name}-${index}`}>
                <p className="speaker-name">{item.name}</p>
                <p className="speaker-topic">
                  {item.type === 'speaker'
                    ? `Topic: ${item.topic}`
                    : `Musical Number: ${item.topic || 'Special musical number'}`}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="agenda-note">Open testimony meeting.</p>
        )}
      </section>

      <section className="agenda-section">
        <h2>Closing Hymn</h2>
        <p>
          {meeting.closingHymn.number} - {meeting.closingHymn.title}
        </p>
      </section>

      <section className="agenda-section">
        <h2>Closing Prayer</h2>
        <p>{meeting.closingPrayer}</p>
      </section>

      <div className="print-actions print-hidden">
        <PrintProgramButton />
      </div>
    </article>
  );
}
