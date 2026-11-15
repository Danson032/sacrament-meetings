'use client';

import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="meetings-empty-state error-state" role="alert">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="meetings-page-title">We could not load this page</h1>
      <p className="meetings-page-intro">
        Please try again. If the problem continues, return to the home page.
      </p>
      <button className="button button-primary" onClick={reset} type="button">
        Try Again
      </button>
    </section>
  );
}
