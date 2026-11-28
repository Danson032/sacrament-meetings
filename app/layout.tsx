
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavLinks from '@/components/NavLinks';
import { getPublicSiteUrl } from '@/lib/site-config';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const siteUrl = getPublicSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  title: {
    default: 'Sacrament Meeting Planner',
    template: '%s | Sacrament Meeting Planner',
  },
  description:
    'Browse, review, and print sample sacrament meeting programs for Meru Ward.',
  applicationName: 'Sacrament Meeting Planner',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: 'Sacrament Meeting Planner',
    title: 'Sacrament Meeting Planner',
    description:
      'Browse, review, and print sample sacrament meeting programs for Meru Ward.',
  },
  twitter: {
    card: 'summary',
    title: 'Sacrament Meeting Planner',
    description:
      'Browse, review, and print sample sacrament meeting programs for Meru Ward.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} site-shell`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <NavLinks />
        <main id="main-content" className="site-main page-shell">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
