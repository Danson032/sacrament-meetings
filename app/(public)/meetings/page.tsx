import MeetingCard from '@/components/MeetingCard';
import { getMeetingsPage } from '@/lib/meetings-db';
import { getPublicSiteUrl } from '@/lib/site-config';
import {
  clampPageNumber,
  MEETINGS_PER_PAGE,
  parsePageNumber,
} from '@/lib/meeting-pagination';
import type { Metadata } from 'next';
import Link from 'next/link';

interface MeetingsPageProps {
  searchParams: Promise<{
    q?: string | string[];
    page?: string | string[];
  }>;
}

export const metadata: Metadata = {
  title: 'All Meetings',
  description:
    'Browse sample sacrament meeting programs and schedules for Meru Ward.',
  ...(getPublicSiteUrl()
    ? { alternates: { canonical: '/meetings' } }
    : {}),
};

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const { q, page: rawPage } = await searchParams;
  const searchTerm = typeof q === 'string' ? q.trim() : '';
  const requestedPage = parsePageNumber(rawPage);
  const { meetings, total } = await getMeetingsPage(
    searchTerm,
    requestedPage,
    MEETINGS_PER_PAGE,
  );
  const totalPages = Math.ceil(total / MEETINGS_PER_PAGE);
  const currentPage = clampPageNumber(requestedPage, totalPages);

  function pageHref(page: number): string {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set('q', searchTerm);
    }
    params.set('page', String(page));
    return `/meetings?${params.toString()}`;
  }

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

      <form className="meeting-search" action="/meetings" method="get">
        <label className="meeting-search-label" htmlFor="meeting-search-input">
          Search meetings
        </label>
        <div className="meeting-search-controls">
          <input
            id="meeting-search-input"
            className="meeting-search-input"
            type="search"
            name="q"
            value={searchTerm}
            placeholder="Search by date, type, leader, or speaker"
          />
          <button className="button button-primary" type="submit">
            Search
          </button>
        </div>
      </form>

      {meetings.length > 0 ? (
        <>
          <p className="meeting-results-count" role="status">
            {total} {total === 1 ? 'meeting' : 'meetings'} found
          </p>
          <section
            className="meeting-list-grid"
            aria-label="Available sacrament meeting programs"
          >
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </section>
          {totalPages > 1 && (
            <nav className="meeting-pagination" aria-label="Meetings pagination">
              {currentPage > 1 ? (
                <Link
                  className="button button-secondary"
                  href={pageHref(currentPage - 1)}
                  rel="prev"
                >
                  Previous
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
              <span aria-current="page">
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages ? (
                <Link
                  className="button button-secondary"
                  href={pageHref(currentPage + 1)}
                  rel="next"
                >
                  Next
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
            </nav>
          )}
        </>
      ) : (
        <section className="meetings-empty-state" role="status">
          <h2>{searchTerm ? 'No matching meetings' : 'No meetings available'}</h2>
          <p>
            {searchTerm
              ? 'Try a different search term.'
              : 'There are no meeting programs to display right now. Please check back later.'}
          </p>
        </section>
      )}
    </div>
  );
}
