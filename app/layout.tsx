
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavLinks from '@/components/NavLinks';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export const metadata: Metadata = {
  title: 'Sacrament Meeting Planner',
  description:
    'Plan, organize, and view sacrament meeting programs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} site-shell`}>
        <Header />
        <NavLinks />
        <main className="site-main page-shell">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
