'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface MeetingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingsError({ error, reset }: MeetingsErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="meetings-empty-state error-state" role="alert">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="meetings-page-title">We could not load meetings</h1>
      <p className="meetings-page-intro">
        Please try again. If the problem continues, return to the meeting list.
      </p>
      <div className="meeting-form-actions">
        <button className="button button-primary" onClick={reset} type="button">
          Try Again
        </button>
        <Link href="/meetings" className="button button-secondary">
          Back to Meetings
        </Link>
      </div>
    </section>
  );
}
