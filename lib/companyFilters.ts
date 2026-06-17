import type { Company } from '@/lib/database.types';
import type { FilterGroup } from '@/lib/networkFilters';

/** Filter taxonomy for the Companies & Organisations directory. */
export type CompanyFilterId = 'industry' | 'locations' | 'type';

export const COMPANY_FILTER_GROUPS: FilterGroup[] = [
  {
    id: 'industry',
    buttonLabel: 'Industry',
    searchPlaceholder: 'Search industries…',
    allLabel: 'All industries',
    options: [
      'Defense & Demining',
      'Construction & Housing',
      'Renewable Energy',
      'AgriTech',
      'Industrial Manufacturing',
      'Investment & Finance',
      'Advisory & Consulting',
      'Public Sector & Aid',
      'MedTech',
      'Logistics & Mobility',
    ],
  },
  {
    id: 'locations',
    buttonLabel: 'Locations',
    searchPlaceholder: 'Search locations…',
    allLabel: 'All locations',
    options: ['Ukraine', 'Kyiv', 'Lviv', 'Dnipro', 'Kharkiv', 'Odesa', 'Warsaw', 'Berlin', 'Copenhagen', 'International'],
  },
  {
    id: 'type',
    buttonLabel: 'Type',
    searchPlaceholder: 'Search types…',
    allLabel: 'All types',
    options: ['Technology Provider', 'Manufacturer', 'Energy Provider', 'Supplier', 'Investor', 'Consultancy', 'Organisation'],
  },
];

export type CompanyFilterState = Record<CompanyFilterId, string[]>;

export const EMPTY_COMPANY_FILTERS: CompanyFilterState = {
  industry: [],
  locations: [],
  type: [],
};

function matchesLocation(selected: string[], c: Company): boolean {
  if (selected.length === 0) return true;
  return selected.some((sel) => {
    if (sel === 'Ukraine') return c.country === 'Ukraine';
    if (sel === 'International') return c.country !== 'Ukraine';
    return c.city === sel || c.country === sel;
  });
}

export function companyMatches(c: Company, f: CompanyFilterState, query: string): boolean {
  if (f.industry.length && !f.industry.includes(c.sector)) return false;
  if (f.type.length && !f.type.includes(c.type)) return false;
  if (!matchesLocation(f.locations, c)) return false;

  const q = query.trim().toLowerCase();
  if (q) {
    const hay = [c.name, c.sector, c.type, c.country, c.city ?? '', c.description ?? '']
      .join(' ')
      .toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}
