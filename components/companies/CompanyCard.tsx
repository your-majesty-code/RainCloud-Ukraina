import type { Company } from '@/lib/database.types';

const LOGO_COLORS = ['#0f172a', '#f05c26', '#2563eb', '#16a34a', '#7c3aed', '#0891b2', '#b91c1c', '#a16207'];

function colorFor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return LOGO_COLORS[h % LOGO_COLORS.length];
}

const Pin = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const Box = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);
const People = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const Check = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export function CompanyCard({ company }: { company: Company }) {
  return (
    <article className="company-card">
      <div className="company-card__top">
        {company.logo_url ? (
          <span className="company-logo" style={{ background: '#fff', border: '1px solid var(--border)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={company.logo_url} alt="" width={56} height={56} loading="lazy" decoding="async" />
          </span>
        ) : (
          <span className="company-logo" style={{ background: colorFor(company.name) }}>
            {company.logo_text}
          </span>
        )}
        <div style={{ minWidth: 0 }}>
          <div className="company-card__name">
            {company.name}
            {company.verified ? (
              <span className="company-verified" title="Verified">
                {Check}
              </span>
            ) : null}
          </div>
          <div className="company-card__typerow">
            <span className="type-chip">{company.sector}</span>
            <span className="company-card__sector">{company.type}</span>
          </div>
        </div>
      </div>

      {company.description ? <p className="company-card__desc">{company.description}</p> : null}

      <div className="company-meta">
        <span className="company-meta__item">
          {Pin}
          {company.city ? `${company.city}, ${company.country}` : company.country}
        </span>
        <span className="company-meta__item">
          {Box}
          {company.products_count} products
        </span>
        <span className="company-meta__item">
          {People}
          {company.members_count} members
        </span>
      </div>

      <div className="company-card__bottom">
        <span className="company-card__sector" style={{ fontSize: 12 }}>
          {company.website ? company.website.replace(/^https?:\/\//, '') : ''}
        </span>
        <button className="btn btn--secondary btn--pill" type="button">
          Follow
        </button>
      </div>
    </article>
  );
}
