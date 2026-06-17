import Image from 'next/image';
import type {
  Company,
  Insight,
  Member,
  NewsItem,
  Opportunity,
  PlatformEvent,
  Product,
  ProductCategory,
} from '@/lib/database.types';

const CAT_CLASS: Record<ProductCategory, string> = {
  housing: 'cat--housing',
  infrastructure: 'cat--infra',
  energy: 'cat--energy',
  water: 'cat--water',
  healthcare: 'cat--health',
  transport: 'cat--transport',
};

const CAT_LABEL: Record<ProductCategory, string> = {
  housing: 'Housing',
  infrastructure: 'Infrastructure',
  energy: 'Energy',
  water: 'Water',
  healthcare: 'Healthcare',
  transport: 'Transport',
};

function catMeta(category: string): { cls: string; label: string } {
  const key = category as ProductCategory;
  return {
    cls: CAT_CLASS[key] ?? 'cat--infra',
    label: CAT_LABEL[key] ?? category.charAt(0).toUpperCase() + category.slice(1),
  };
}

const PinIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

function formatDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ---------- Product card (Digital Trade Show / Products) ---------- */
export function ProductCard({ product }: { product: Product }) {
  const { cls, label } = catMeta(product.category);
  return (
    <article className="fcard">
      <div className="fcard__media">
        {product.media_url ? (
          <Image src={product.media_url} alt="" fill sizes="(max-width: 1100px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
        ) : null}
        <span className={`fcard__cat ${cls}`}>{label}</span>
      </div>
      <div className="fcard__body">
        <div className="fcard__toprow">
          <span className="fcard__company">{product.company_name}</span>
          <span className="fcard__loc">
            {PinIcon}
            {product.location}
          </span>
        </div>
        <h3 className="fcard__title">{product.name}</h3>
        <p className="fcard__desc">{product.description}</p>
        <div className="fcard__member">
          <span className="fcard__member-av">{product.owner_initials}</span>
          <div>
            <div className="fcard__member-name">{product.owner_name}</div>
            <div className="fcard__member-role">{product.owner_role}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- Member row card ---------- */
export function MemberRow({ member }: { member: Member }) {
  return (
    <article className="rcard">
      <div className="rcard__main">
        {member.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="rcard__av" src={member.avatar_url} alt="" width={48} height={48} loading="lazy" decoding="async" />
        ) : (
          <span className="rcard__av rcard__av--logo">
            {member.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
          </span>
        )}
        <div>
          <div className="rcard__name">{member.name}</div>
          <div className="rcard__sub">
            <span className="rcard__role-badge">{member.role_badge}</span>
            <span className="rcard__meta">{member.headline}</span>
          </div>
        </div>
      </div>
      <button className="btn btn--secondary btn--pill" type="button">
        Connect
      </button>
    </article>
  );
}

/* ---------- Company row card ---------- */
export function CompanyRow({ company }: { company: Company }) {
  return (
    <article className="rcard">
      <div className="rcard__main">
        <span className="rcard__av rcard__av--logo">{company.logo_text}</span>
        <div>
          <div className="rcard__name">{company.name}</div>
          <div className="rcard__sub">
            <span className="rcard__meta">
              {company.type} · {company.sector} · {company.country} · {company.products_count}{' '}
              products • {company.members_count} members
            </span>
          </div>
        </div>
      </div>
      <button className="btn btn--secondary btn--pill" type="button">
        Follow
      </button>
    </article>
  );
}

/* ---------- Thought-leadership card ---------- */
export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article className="tcard">
      <span className="tcard__cat tcard__cat--article">{insight.kind}</span>
      <span className="tcard__meta">{formatDate(insight.published_at)}</span>
      <h3 className="tcard__title">{insight.title}</h3>
      <p className="tcard__desc">{insight.description}</p>
      <span className="tcard__foot">{insight.author_name}</span>
    </article>
  );
}

/* ---------- Event card ---------- */
export function EventCard({ event }: { event: PlatformEvent }) {
  return (
    <article className="tcard">
      <span className="tcard__cat tcard__cat--event">{event.kind}</span>
      <span className="tcard__meta">{formatDate(event.event_date)}</span>
      <h3 className="tcard__title">{event.title}</h3>
      <p className="tcard__desc">{event.description}</p>
      <span className="tcard__foot">{event.location}</span>
    </article>
  );
}

/* ---------- Opportunity card ---------- */
export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <article className="tcard">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="tcard__cat tcard__cat--opp">{opportunity.kind}</span>
        <span className="tcard__value">{opportunity.value_label}</span>
      </div>
      <h3 className="tcard__title">{opportunity.title}</h3>
      <p className="tcard__desc">{opportunity.description}</p>
      <span className="tcard__foot">
        {opportunity.location} · Deadline: {formatDate(opportunity.deadline)}
      </span>
    </article>
  );
}

/* ---------- News card ---------- */
export function NewsCard({ item }: { item: NewsItem }) {
  const { cls, label } = catMeta(item.category);
  return (
    <article className="fcard">
      <div className="fcard__media">
        {item.image_url ? (
          <Image src={item.image_url} alt="" fill sizes="(max-width: 1100px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
        ) : null}
        <span className={`fcard__cat ${cls}`}>{label}</span>
      </div>
      <div className="fcard__body">
        <h3 className="fcard__title">{item.title}</h3>
        <p className="fcard__desc">{item.description}</p>
        <div className="fcard__member">
          <div>
            <div className="fcard__member-role" style={{ margin: 0 }}>
              {item.source} · {formatDate(item.published_at)}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
