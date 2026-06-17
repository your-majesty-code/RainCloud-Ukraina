/**
 * Single source of truth for the left sidebar nav — same item set, order,
 * icons and tooltip copy on every authenticated page (design-rules.md Rule 1).
 * Tooltip text ported verbatim from the prototype's scripts/feed-nav.js.
 */
export interface NavItem {
  key: string;
  label: string;
  href: string;
  /** lucide-style 24x24 stroke icon path(s) */
  icon: string;
  tip: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    key: 'feed',
    label: 'Feed',
    href: '/feed',
    icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    tip: 'Your personalised overview of new matches, updates, products, people, companies, events, and opportunities across the RainCloud ecosystem.',
  },
  {
    key: 'network',
    label: 'Network',
    href: '/network',
    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    tip: "Find and connect with members, experts, company representatives, investors, and decision-makers involved in Ukraine's recovery.",
  },
  {
    key: 'companies',
    label: 'Companies & Organisations',
    href: '/companies',
    icon: 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-3',
    tip: 'Explore verified companies, suppliers, NGOs, public institutions, and organisations participating in reconstruction projects.',
  },
  {
    key: 'trade-show',
    label: 'Virtual Trade Show',
    href: '/trade-show',
    icon: 'M2 3h20v14H2zM8 21h8M12 17v4',
    tip: "Discover products, services, technologies, and companies offering solutions for Ukraine's reconstruction.",
  },
  {
    key: 'pavilions',
    label: 'Business Pavilions',
    href: '/pavilions',
    icon: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20',
    tip: 'Visit dedicated company and organisation spaces with curated products, services, contacts, and business materials.',
  },
  {
    key: 'opportunities',
    label: 'Opportunities',
    href: '/opportunities',
    icon: 'M20 7h-9M14 17H5M17 3l3 4-3 4M7 13l-3 4 3 4',
    tip: 'Browse active tenders, RFPs, partnership requests, investment opportunities, and reconstruction-related projects.',
  },
  {
    key: 'insights',
    label: 'Thought Leadership',
    href: '/insights',
    icon: 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z',
    tip: 'Read expert articles, reports, insights, and strategic analysis from members and organisations in the ecosystem.',
  },
  {
    key: 'events',
    label: 'Events',
    href: '/events',
    icon: 'M3 4h18v18H3zM16 2v4M8 2v4M3 10h18',
    tip: "Explore upcoming forums, conferences, roundtables, meetings, and trade events related to Ukraine's recovery.",
  },
  {
    key: 'news',
    label: 'News',
    href: '/news',
    icon: 'M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9h4M18 14h-8M15 18h-5M10 6h8v4h-8z',
    tip: "Stay current with announcements, funding updates, and developments shaping Ukraine's reconstruction.",
  },
];
