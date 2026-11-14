
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A thoughtful way to prepare</p>

          <h1 className="hero-title">
            Plan meaningful meetings with confidence.
          </h1>

          <p className="hero-description">
            Organize and review sacrament meeting programs in one place.
            Find schedules, hymns, speakers, prayers, and announcements
            whenever you need them.
          </p>

          <div className="hero-actions">
            <Link
              href="/meetings"
              className="button button-primary"
            >
              View All Meetings
            </Link>

            <Link
              href="/meetings/current"
              className="button button-secondary"
            >
              Current Meeting
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <Image
            src="https://www.thechurchnews.com/resizer/v2/QJZDGNMXNNBOXHJHAICM5HMK5M.jpeg?auth=50dbfd9900e3489476fe21edeb3d87fc18721f3a6ccb56b6057f2d577e5f5c21&focal=1026%2C533&width=800&height=533"
            alt="Statue of Jesus Christ in a landscaped garden with flowers and palm trees"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="hero-image"
          />
          <div className="hero-caption">
            <p className="hero-caption-label">Meru Ward</p>
            <p className="hero-caption-title">Gather, worship, and grow together.</p>
          </div>
        </div>
      </section>

      <section className="about-panel">
        <h2 className="section-title">About the Planner</h2>
        <p className="about-copy">
          This application helps ward and branch leaders prepare
          organized meeting agendas. Members can also access
          current and previous meeting programs and print them
          whenever needed.
        </p>
      </section>

      <section className="features-section">
        <div className="features-heading">
          <div>
            <p className="eyebrow">Simple and organized</p>
            <h2 className="section-title">Everything in one place</h2>
          </div>
        </div>

        <div className="feature-grid">
          {[
            {
              title: 'Meeting Schedules',
              description: 'Browse current and previous meeting records.',
            },
            {
              title: 'Meeting Programs',
              description: 'View hymns, prayers, speakers, and announcements.',
            },
            {
              title: 'Print Programs',
              description: 'Print meeting agendas for easy reference.',
            },
          ].map((feature, index) => (
            <article key={feature.title} className="feature-card">
              <span className="feature-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
