import type { Member } from '@/lib/database.types';

/**
 * Network directory filter taxonomy (source: Filters_Network.txt + Figma).
 * Each group is a multi-select dropdown; an empty selection means "all".
 * Filtering is instant + client-side (Pinterest-style) — see NetworkDirectory.
 */
export type FilterGroupId =
  | 'industries'
  | 'profileType'
  | 'locations'
  | 'company'
  | 'availability';

export interface FilterGroup {
  id: string;
  buttonLabel: string;
  searchPlaceholder: string;
  allLabel: string;
  options: string[];
}

export const FILTER_GROUPS: FilterGroup[] = [
  {
    id: 'industries',
    buttonLabel: 'Industries',
    searchPlaceholder: 'Search industries…',
    allLabel: 'All industry',
    options: [
      'Technology, Defense & Space',
      'Infrastructure, Construction & Real Estate',
      'Energy, Utilities & Natural Resources',
      'Agriculture, Food & Forestry',
      'Manufacturing & Industrial',
      'Financial Services & Investment',
      'Professional & Commercial Services',
      'Government, International Affairs & NGOs',
      'Healthcare, MedTech & Pharmaceuticals',
      'Transportation & Logistics',
    ],
  },
  {
    id: 'profileType',
    buttonLabel: 'Profile Type',
    searchPlaceholder: 'Search profile type…',
    allLabel: 'All members',
    options: [
      'Investors',
      'Product owners',
      'Company representatives',
      'Industry experts',
      'Government / Municipal contacts',
      'NGO / Aid fund representatives',
      'Consultants / Advisors',
      'Event speakers',
      'Authors / Thought leaders',
      'Open to contact',
    ],
  },
  {
    id: 'locations',
    buttonLabel: 'Locations',
    searchPlaceholder: 'Search locations…',
    allLabel: 'All locations',
    options: [
      'Ukraine',
      'Kyiv',
      'Lviv',
      'Dnipro',
      'Kharkiv',
      'Odesa',
      'Warsaw',
      'Berlin',
      'Copenhagen',
      'United States',
      'International',
    ],
  },
  {
    id: 'company',
    buttonLabel: 'Company&organisations',
    searchPlaceholder: 'Search companies…',
    allLabel: 'All companies',
    options: [
      'Slava Modular',
      'UkrBuild Solutions',
      'EcoGrid Power',
      'SafeGround Ukraine',
      'WeBuild',
      'Reconstruction Capital Partners',
      'Energy Recovery Council',
      'MedUnit Systems',
      'AquaTech UA',
    ],
  },
  {
    id: 'availability',
    buttonLabel: 'Availability',
    searchPlaceholder: 'Search availability…',
    allLabel: 'All availability',
    options: [
      'Open to contact',
      'Available for introductions',
      'Investor meetings',
      'Partnership requests',
      'Speaking opportunities',
      'Recently active',
    ],
  },
];

export type FilterState = Record<FilterGroupId, string[]>;

export const EMPTY_FILTERS: FilterState = {
  industries: [],
  profileType: [],
  locations: [],
  company: [],
  availability: [],
};

const UA_CITIES = new Set(['Kyiv', 'Lviv', 'Dnipro', 'Kharkiv', 'Odesa']);

function matchesLocation(selected: string[], member: Member): boolean {
  if (selected.length === 0) return true;
  return selected.some((sel) => {
    if (sel === 'Ukraine') return member.country === 'Ukraine';
    if (sel === 'International') return member.country !== 'Ukraine';
    if (sel === 'United States') return member.country === 'United States';
    // city names
    return member.city === sel || member.country === sel;
  });
}

function intersects(selected: string[], values: string[]): boolean {
  if (selected.length === 0) return true;
  return selected.some((s) => values.includes(s));
}

/** True when a member satisfies every active filter group + free-text query. */
export function memberMatches(
  member: Member,
  filters: FilterState,
  query: string,
): boolean {
  // Profile Type group also contains "Open to contact" (an availability value).
  const profileSel = filters.profileType.filter((p) => p !== 'Open to contact');
  const profileAvail = filters.profileType.includes('Open to contact')
    ? ['Open to contact']
    : [];

  if (profileSel.length && !profileSel.includes(member.profile_type)) return false;
  if (profileAvail.length && !intersects(profileAvail, member.availability)) return false;
  if (!intersects(filters.industries, member.industries)) return false;
  if (!matchesLocation(filters.locations, member)) return false;
  if (filters.company.length && !filters.company.includes(member.company_name)) return false;
  if (!intersects(filters.availability, member.availability)) return false;

  const q = query.trim().toLowerCase();
  if (q) {
    const haystack = [
      member.name,
      member.title,
      member.company_name,
      member.location,
      member.profile_type,
      ...member.industries,
      ...member.tags,
    ]
      .join(' ')
      .toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

export function countActive(filters: FilterState): number {
  return Object.values(filters).reduce((n, arr) => n + arr.length, 0);
}

/** Approx coordinates for placing members on the map by city. */
export const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  Kyiv: { lat: 50.4501, lng: 30.5234 },
  Lviv: { lat: 49.8397, lng: 24.0297 },
  Dnipro: { lat: 48.4647, lng: 35.0462 },
  Kharkiv: { lat: 49.9935, lng: 36.2304 },
  Odesa: { lat: 46.4825, lng: 30.7233 },
  Warsaw: { lat: 52.2297, lng: 21.0122 },
  Berlin: { lat: 52.52, lng: 13.405 },
  Copenhagen: { lat: 55.6761, lng: 12.5683 },
};
