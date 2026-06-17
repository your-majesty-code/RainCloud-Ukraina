import Image from 'next/image';
import Link from 'next/link';
import type { PlatformStats } from '@/lib/database.types';

function formatCount(n: number): string {
  return n.toLocaleString('en-US');
}

/**
 * Dark-navy global header (Figma "RC Ukraina Concept NEW").
 * Identical on every authenticated page (design-rules.md Rule 1).
 * The brand wordmark is a single image asset (requirement 2.2).
 */
export function Header({ stats }: { stats: PlatformStats }) {
  return (
    <header className="feed-header">
      <Link className="feed-header__brand" href="/feed" aria-label="RainCloud Ukraina — home">
        <Image
          src="/brand/logo-raincloud.png"
          alt="RainCloud Ukraina"
          width={258}
          height={27}
          priority
        />
        <span className="feed-header__tagline">
          Powering global business to build the new Ukraine
        </span>
      </Link>

      <span className="feed-header__divider" />
      <span className="feed-header__greeting">Hello, Mike</span>
      <span className="feed-header__spacer" />

      <div className="stats-pill">
        <span className="stats-pill__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="stats-pill__value">{formatCount(stats.members_count)}</span>
          <span className="stats-pill__label">Members</span>
        </span>
        <span className="stats-pill__sep" />
        <span className="stats-pill__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" />
            <path d="M9 9v.01M9 12v.01M9 15v.01" />
          </svg>
          <span className="stats-pill__value">{formatCount(stats.companies_count)}</span>
          <span className="stats-pill__label">Companies</span>
        </span>
        <span className="stats-pill__sep" />
        <span className="stats-pill__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
          </svg>
          <span className="stats-pill__value">{formatCount(stats.products_count)}</span>
          <span className="stats-pill__label">Products</span>
        </span>
      </div>

      <div className="feed-header__actions">
        <button className="feed-icon-btn" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
        <button className="feed-icon-btn" aria-label="Messages">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9 9 0 0 1-3.9-.9L3 21l1.9-5.6a8.38 8.38 0 0 1-.9-3.9A8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
          </svg>
        </button>
        <button className="feed-icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
          <span className="feed-icon-btn__dot" />
        </button>
        <button className="feed-icon-btn" aria-label="Storm AI">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </button>
        <span className="feed-avatar">MK</span>
      </div>
    </header>
  );
}
