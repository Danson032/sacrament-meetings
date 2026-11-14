
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/', label: 'Home' },
    { href: '/meetings', label: 'All Meetings' },
    { href: '/meetings/current', label: 'Current Meeting' },
];

export default function NavLinks() {
    const pathname = usePathname();
    const isMeetingDetailPage = /^\/meetings\/\d+$/.test(pathname);

    return (
        <nav aria-label="Main navigation" className="primary-nav">
            <div className="nav-inner">
                {links.map((link) => {
                    const isActive =
                        pathname === link.href ||
                        (link.href === '/meetings' && isMeetingDetailPage);

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive ? 'page' : undefined}
                            className={`nav-link${isActive ? ' nav-link-active' : ''}`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
