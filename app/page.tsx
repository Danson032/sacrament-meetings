
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPublicSiteUrl } from '@/lib/site-config';

export const metadata: Metadata = {
  ...(getPublicSiteUrl() ? { alternates: { canonical: '/' } } : {}),
};

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A thoughtful way to prepare</p>

          <h1 className="hero-title">
            Review meaningful meetings with confidence.
          </h1>

          <p className="hero-description">
            Browse sample sacrament meeting programs in one place. Review
            schedules, hymns, speakers, prayers, and announcements, then print
            a program when you need it.
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
            src="/meeting-hero.svg"
            alt="Illustration of a chapel among green hills beneath a calm evening sky"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="hero-image"
          />
          <div className="hero-caption">
            <p className="hero-caption-label">Meru Ward</p>
            <p className="hero-caption-title">
              Gather, worship, and grow together.
            </p>
          </div>
        </div>
      </section>

      <section className="about-panel">
        <h2 className="section-title">About the Planner</h2>
        <p className="about-copy">
          Browse available meeting programs, review their agenda details, and
          print a copy. The current programs are demonstration data; creating
          or editing meetings and persistent storage are not yet available.
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
              title: 'Meeting Records',
              description: 'Browse sample meeting schedules by date.',
            },
            {
              title: 'Program Details',
              description: 'Review leaders, hymns, prayers, speakers, and announcements.',
            },
            {
              title: 'Print Programs',
              description: 'Print a readable program for meeting-day reference.',
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
