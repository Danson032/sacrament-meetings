import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you requested could not be found.',
};

export default function NotFound() {
  return (
    <section className="meetings-empty-state meeting-not-found" role="status">
      <p className="eyebrow">Page unavailable</p>
      <h1 className="meetings-page-title">Page not found</h1>
      <p className="meetings-page-intro">
        The page may have moved, or the address may be incorrect.
      </p>
      <Link href="/" className="button button-primary">
        Return Home
      </Link>
    </section>
  );
}
