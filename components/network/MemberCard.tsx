import type { Member } from '@/lib/database.types';

function initials(name: string): string {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

/** Vertical member card used in both the list and the map-view side list. */
export function MemberCard({ member }: { member: Member }) {
  return (
    <article className="nm-card">
      <div className="nm-card__head">
        {member.avatar_url ? (
          // Plain <img>: avatars are external placeholder URLs; skip next/image
          // optimisation (cost/limits) for a directory of many small avatars.
          // eslint-disable-next-line @next/next/no-img-element
          <img className="nm-card__av" src={member.avatar_url} alt="" width={40} height={40} loading="lazy" decoding="async" />
        ) : (
          <span className="nm-card__av rcard__av--logo" aria-hidden>
            {initials(member.name)}
          </span>
        )}
        <div style={{ minWidth: 0 }}>
          <div className="nm-card__name">{member.name}</div>
          <div className="nm-card__title">{member.title || member.role_badge}</div>
          {member.company_name ? (
            <div className="nm-card__company">{member.company_name}</div>
          ) : null}
        </div>
      </div>

      <div className="nm-card__tags">
        <span className="nm-tag nm-tag--type">{member.role_badge}</span>
        {member.tags.slice(0, 2).map((t) => (
          <span key={t} className="nm-tag">
            {t}
          </span>
        ))}
      </div>

      <div className="nm-card__foot">
        <span className="nm-avail">
          {member.availability.length ? (
            <>
              <span className="nm-avail__dot" />
              {member.availability[0]}
            </>
          ) : (
            <span style={{ color: 'var(--ink-400)' }}>Member</span>
          )}
        </span>
        <button className="nm-connect" type="button" aria-label={`Connect with ${member.name}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </article>
  );
}
