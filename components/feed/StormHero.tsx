/**
 * Storm AI hero — greeting, AI super-search field and suggestion chips.
 * Presentational for now; the search wiring (supersearch) is a follow-up.
 */
export function StormHero() {
  return (
    <section className="storm-hero">
      <h1 className="storm-hero__title">Hello, Mike. What are you looking for today?</h1>
      <p className="storm-hero__sub">
        You have <span className="hero-pill hero-pill--blue">12 new matches</span>,{' '}
        <span className="hero-pill hero-pill--amber">5 pending requests</span> and{' '}
        <span className="hero-pill hero-pill--purple">3 upcoming events</span>. Let&apos;s review them!
      </p>

      <div className="ss-wrap">
        <div className="hero-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder="Search by industry, product type, or company..."
            aria-label="Search"
            autoComplete="off"
          />
          <span className="hero-search__ask">
            Ask Storm <span className="key-chip">Tab</span>
          </span>
        </div>
      </div>

      <div className="hero-chips">
        <button className="hero-chip" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21v-1a6 6 0 0 1 12 0v1" />
          </svg>
          <span>
            <span className="hero-chip__title">Anna Müller</span>
            <br />
            <span className="hero-chip__sub">Project Director at WeBuild</span>
          </span>
        </button>
        <button className="hero-chip" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" />
          </svg>
          <span>
            <span className="hero-chip__title">UkrBuild Solutions</span>
            <br />
            <span className="hero-chip__sub">Construction</span>
          </span>
        </button>
        <button className="hero-chip" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
          <span>
            <span className="hero-chip__title">Modular Wall Panel</span>
            <br />
            <span className="hero-chip__sub">Housing</span>
          </span>
        </button>
      </div>
    </section>
  );
}
