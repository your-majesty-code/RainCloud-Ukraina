'use client';

import { useState, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';

/**
 * Client wrapper for the area below the header: the sticky sidebar plus the
 * scrolling main column. Owns the sidebar collapse state so "Close sidebar"
 * works; a small floating button brings it back.
 */
export function ShellBody({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`feed-layout${collapsed ? ' is-sidebar-collapsed' : ''}`}>
      {collapsed ? (
        <button
          className="sidebar-reopen"
          type="button"
          onClick={() => setCollapsed(false)}
          aria-label="Open sidebar"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18M11 9l3 3-3 3" />
          </svg>
        </button>
      ) : (
        <Sidebar onClose={() => setCollapsed(true)} />
      )}

      <main className="feed-main">
        <div className="feed-main__inner">{children}</div>
      </main>
    </div>
  );
}
