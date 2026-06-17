'use client';

import { useMemo, useState } from 'react';
import type { Company } from '@/lib/database.types';
import {
  COMPANY_FILTER_GROUPS,
  EMPTY_COMPANY_FILTERS,
  companyMatches,
  type CompanyFilterState,
} from '@/lib/companyFilters';
import { FilterBar } from '@/components/network/FilterBar';
import { CompanyCard } from './CompanyCard';

export function CompaniesDirectory({ companies }: { companies: Company[] }) {
  const [filters, setFilters] = useState<CompanyFilterState>(EMPTY_COMPANY_FILTERS);
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => companies.filter((c) => companyMatches(c, filters, query)),
    [companies, filters, query],
  );

  function toggle(group: string, value: string) {
    const g = group as keyof CompanyFilterState;
    setFilters((prev) => {
      const set = prev[g];
      const next = set.includes(value) ? set.filter((v) => v !== value) : [...set, value];
      return { ...prev, [g]: next };
    });
  }

  return (
    <>
      <section className="search-hero">
        <h2 className="search-hero__title">Discover companies &amp; organisations</h2>
        <div className="search-row">
          <label className="search-field">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              placeholder="Search by company name, industry, type, or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search companies"
            />
          </label>
          <button className="btn-search" type="button">
            Search
          </button>
        </div>
        <FilterBar
          groups={COMPANY_FILTER_GROUPS}
          filters={filters}
          onToggle={toggle}
          onClearAll={() => setFilters(EMPTY_COMPANY_FILTERS)}
        />
      </section>

      <div className="nm-head">
        <div className="nm-head__left">
          <span className="section-head__bubble">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" />
            </svg>
          </span>
          <span className="section-head__title">Companies &amp; Organisations</span>
        </div>
      </div>

      <div className="nm-panel">
        <div className="nm-panel__head">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" />
          </svg>
          All Companies
          <span className="nm-panel__count">· {filtered.length} results</span>
        </div>
        <div className="nm-panel__body">
          {filtered.length ? (
            <div className="grid-3">
              {filtered.map((c) => (
                <CompanyCard key={c.id} company={c} />
              ))}
            </div>
          ) : (
            <div className="nm-empty">No companies match the current filters.</div>
          )}
        </div>
      </div>
    </>
  );
}
