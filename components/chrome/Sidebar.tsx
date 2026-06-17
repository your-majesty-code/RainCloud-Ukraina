'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/navigation';

/**
 * Left icon-nav rail — identical on every page (design-rules.md Rule 1).
 * Each row carries `data-tip`, so the CSS-only hover tooltip (components.css)
 * shows to the right of the item, exactly as in the prototype.
 */
export function Sidebar({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="feed-sidebar">
      <nav className="feed-nav" aria-label="Sections">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`feed-nav__row${isActive ? ' is-active' : ''}`}
              data-tip={item.tip}
              aria-current={isActive ? 'page' : undefined}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="feed-sidebar__foot">
        <button className="feed-nav__row" onClick={onClose} type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18M14 9l-3 3 3 3" />
          </svg>
          Close sidebar
        </button>
      </div>
    </aside>
  );
}
