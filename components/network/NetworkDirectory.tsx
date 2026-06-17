'use client';

import { useMemo, useState } from 'react';
import type { Member } from '@/lib/database.types';
import {
  EMPTY_FILTERS,
  FILTER_GROUPS,
  memberMatches,
  type FilterGroupId,
  type FilterState,
} from '@/lib/networkFilters';
import { FilterBar } from './FilterBar';
import { MemberCard } from './MemberCard';
import { NetworkMap } from './NetworkMap';

type View = 'list' | 'map';

export function NetworkDirectory({ members }: { members: Member[] }) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [query, setQuery] = useState('');
  const [view, setView] = useState<View>('list');

  const filtered = useMemo(
    () => members.filter((m) => memberMatches(m, filters, query)),
    [members, filters, query],
  );

  function toggle(group: string, value: string) {
    const g = group as FilterGroupId;
    setFilters((prev) => {
      const set = prev[g];
      const next = set.includes(value) ? set.filter((v) => v !== value) : [...set, value];
      return { ...prev, [g]: next };
    });
  }

  return (
    <>
      {/* Search hero */}
      <section className="search-hero">
        <h2 className="search-hero__title">Find the right people to connect with</h2>
        <div className="search-row">
          <label className="search-field">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              placeholder="Search by company name, industry, location, or contact person..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search members"
            />
          </label>
          <button className="btn-filters" type="button" aria-hidden tabIndex={-1}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            Filters
          </button>
          <button className="btn-search" type="button">
            Search
          </button>
        </div>
        <FilterBar groups={FILTER_GROUPS} filters={filters} onToggle={toggle} onClearAll={() => setFilters(EMPTY_FILTERS)} />
      </section>

      {/* Heading + view toggle */}
      <div className="nm-head">
        <div className="nm-head__left">
          <span className="section-head__bubble">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          <span className="section-head__title">Members</span>
          <button className="nm-invite" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Invite new member
          </button>
        </div>
        <div className="nm-toggle" role="tablist" aria-label="View">
          <button
            type="button"
            role="tab"
            aria-selected={view === 'list'}
            className={view === 'list' ? 'is-active' : ''}
            onClick={() => setView('list')}
          >
            List view
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'map'}
            className={view === 'map' ? 'is-active' : ''}
            onClick={() => setView('map')}
          >
            Map view
          </button>
        </div>
      </div>

      {/* Results */}
      {view === 'list' ? (
        <div className="nm-panel">
          <div className="nm-panel__head">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            All Members
            <span className="nm-panel__count">· {filtered.length} results</span>
          </div>
          <div className="nm-panel__body">
            {filtered.length ? (
              <div className="nm-grid">
                {filtered.map((m) => (
                  <MemberCard key={m.id} member={m} />
                ))}
              </div>
            ) : (
              <div className="nm-empty">No members match the current filters.</div>
            )}
          </div>
        </div>
      ) : (
        <div className="nm-maprow">
          <div className="nm-maplist">
            {filtered.length ? (
              filtered.map((m) => <MemberCard key={m.id} member={m} />)
            ) : (
              <div className="nm-empty">No members match the current filters.</div>
            )}
          </div>
          <NetworkMap members={filtered} />
        </div>
      )}
    </>
  );
}
