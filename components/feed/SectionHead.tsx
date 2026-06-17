import Link from 'next/link';
import type { ReactNode } from 'react';

const chevron = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export function SectionHead({
  icon,
  title,
  viewAllLabel,
  viewAllHref,
}: {
  icon: ReactNode;
  title: string;
  viewAllLabel?: string;
  viewAllHref?: string;
}) {
  return (
    <div className="section-head">
      <div className="section-head__left">
        <span className="section-head__bubble">{icon}</span>
        <span className="section-head__title">{title}</span>
      </div>
      {viewAllLabel && viewAllHref ? (
        <Link className="view-all" href={viewAllHref}>
          {viewAllLabel} {chevron}
        </Link>
      ) : null}
    </div>
  );
}
