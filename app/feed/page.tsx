import { StormHero } from '@/components/feed/StormHero';
import { SectionHead } from '@/components/feed/SectionHead';
import {
  CompanyRow,
  EventCard,
  InsightCard,
  MemberRow,
  NewsCard,
  OpportunityCard,
  ProductCard,
} from '@/components/feed/Cards';
import { getFeedData } from '@/lib/queries';

// Cached HTML + data, refreshed every 5 min (ISR). Repeat navigations are
// served from the edge cache instead of re-running SSR + Supabase each time.
export const revalidate = 300;

const icons = {
  products: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  members: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  companies: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" />
    </svg>
  ),
  insights: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z" />
    </svg>
  ),
  events: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  news: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9h4" />
      <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
    </svg>
  ),
  opportunities: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 7h-9M14 17H5M17 3l3 4-3 4M7 13l-3 4 3 4" />
    </svg>
  ),
};

function EmptyNote() {
  return <p className="text-muted" style={{ fontSize: 14 }}>Nothing here yet — seed the database to populate this section.</p>;
}

export default async function FeedPage() {
  const data = await getFeedData();

  return (
    <>
      <StormHero />

      {/* Digital Trade Show (products) */}
      <section className="feed-section">
        <SectionHead
          icon={icons.products}
          title="Digital Trade Show"
          viewAllLabel="View all products"
          viewAllHref="/trade-show"
        />
        {data.products.length ? (
          <div className="grid-3">
            {data.products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <EmptyNote />
        )}
      </section>

      {/* Members */}
      <section className="feed-section">
        <SectionHead
          icon={icons.members}
          title="Members"
          viewAllLabel="View all members"
          viewAllHref="/network"
        />
        {data.members.length ? (
          <div className="grid-2">
            {data.members.map((m) => (
              <MemberRow key={m.id} member={m} />
            ))}
          </div>
        ) : (
          <EmptyNote />
        )}
      </section>

      {/* Companies & Organisations */}
      <section className="feed-section">
        <SectionHead
          icon={icons.companies}
          title="Companies & Organisations"
          viewAllLabel="View all companies"
          viewAllHref="/companies"
        />
        {data.companies.length ? (
          <div className="grid-2">
            {data.companies.map((c) => (
              <CompanyRow key={c.id} company={c} />
            ))}
          </div>
        ) : (
          <EmptyNote />
        )}
      </section>

      {/* Thought Leadership */}
      <section className="feed-section">
        <SectionHead
          icon={icons.insights}
          title="Thought Leadership"
          viewAllLabel="View all insights"
          viewAllHref="/insights"
        />
        {data.insights.length ? (
          <div className="grid-3">
            {data.insights.map((i) => (
              <InsightCard key={i.id} insight={i} />
            ))}
          </div>
        ) : (
          <EmptyNote />
        )}
      </section>

      {/* Events */}
      <section className="feed-section">
        <SectionHead
          icon={icons.events}
          title="Events"
          viewAllLabel="View all events"
          viewAllHref="/events"
        />
        {data.events.length ? (
          <div className="grid-3">
            {data.events.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <EmptyNote />
        )}
      </section>

      {/* News */}
      <section className="feed-section">
        <SectionHead
          icon={icons.news}
          title="News"
          viewAllLabel="View all news"
          viewAllHref="/news"
        />
        {data.news.length ? (
          <div className="grid-3">
            {data.news.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
          </div>
        ) : (
          <EmptyNote />
        )}
      </section>

      {/* Opportunities */}
      <section className="feed-section">
        <SectionHead
          icon={icons.opportunities}
          title="Opportunities"
          viewAllLabel="View all opportunities"
          viewAllHref="/opportunities"
        />
        {data.opportunities.length ? (
          <div className="grid-3">
            {data.opportunities.map((o) => (
              <OpportunityCard key={o.id} opportunity={o} />
            ))}
          </div>
        ) : (
          <EmptyNote />
        )}
      </section>
    </>
  );
}
