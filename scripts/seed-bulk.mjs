/**
 * Bulk-populates the RainCloud Ukraina database with realistic placeholder data:
 *   - 30 companies across 10 industries / 8 existing locations
 *   - ~70 products (with descriptions) assigned to those companies
 *   - 200 members distributed across the companies & locations
 *
 * Members carry city/country (so they cluster on the Google Map placeholder)
 * and DiceBear avatar URLs. Deterministic (seeded RNG) so re-runs are stable.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-bulk.mjs
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.');
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });

/* ---- deterministic RNG (mulberry32) ---- */
let _s = 42;
const rnd = () => {
  _s |= 0; _s = (_s + 0x6d2b79f5) | 0;
  let t = Math.imul(_s ^ (_s >>> 15), 1 | _s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
const sample = (arr, n) => {
  const c = [...arr];
  const out = [];
  while (out.length < n && c.length) out.push(c.splice(Math.floor(rnd() * c.length), 1)[0]);
  return out;
};

/* ---- locations (only cities that exist on the map) ---- */
const CITIES = [
  { city: 'Kyiv', country: 'Ukraine' },
  { city: 'Lviv', country: 'Ukraine' },
  { city: 'Dnipro', country: 'Ukraine' },
  { city: 'Kharkiv', country: 'Ukraine' },
  { city: 'Odesa', country: 'Ukraine' },
  { city: 'Warsaw', country: 'Poland' },
  { city: 'Berlin', country: 'Germany' },
  { city: 'Copenhagen', country: 'Denmark' },
];

/* ---- names by country ---- */
const NAMES = {
  Ukraine: {
    first: ['Olena', 'Andriy', 'Dmytro', 'Iryna', 'Maksym', 'Kateryna', 'Ivan', 'Sofiia', 'Oleh', 'Nataliia', 'Taras', 'Yuliia', 'Serhii', 'Mariia', 'Volodymyr', 'Anna', 'Petro', 'Oksana', 'Bohdan', 'Viktoriia'],
    last: ['Kovalenko', 'Bondarenko', 'Melnyk', 'Shevchenko', 'Tkachenko', 'Kravchenko', 'Boyko', 'Kovalchuk', 'Lysenko', 'Marchenko', 'Petrenko', 'Savchenko', 'Tymoshenko', 'Hrytsenko', 'Moroz', 'Polishchuk', 'Romanenko', 'Zhuk', 'Pavlenko', 'Ivanov'],
  },
  Poland: {
    first: ['Tomasz', 'Katarzyna', 'Piotr', 'Agnieszka', 'Marcin', 'Magdalena', 'Krzysztof', 'Anna', 'Jakub', 'Zofia', 'Michał', 'Joanna'],
    last: ['Jabłoński', 'Nowak', 'Wiśniewski', 'Wójcik', 'Kowalczyk', 'Kamiński', 'Lewandowski', 'Zieliński', 'Szymański', 'Woźniak', 'Dąbrowski', 'Kozłowski'],
  },
  Germany: {
    first: ['Anna', 'Lukas', 'Maximilian', 'Sophie', 'Felix', 'Laura', 'Jonas', 'Hannah', 'Leon', 'Marie', 'Paul', 'Lena'],
    last: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Wagner', 'Becker', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter'],
  },
  Denmark: {
    first: ['Sofia', 'Mikkel', 'Freja', 'Magnus', 'Ida', 'Frederik', 'Emma', 'Oliver', 'Clara', 'Lucas'],
    last: ['Larsen', 'Jensen', 'Nielsen', 'Hansen', 'Andersen', 'Pedersen', 'Christensen', 'Rasmussen', 'Sørensen', 'Madsen'],
  },
};

/* ---- industry taxonomy → companies, sectors, products ---- */
const INDUSTRIES = [
  { name: 'Technology, Defense & Space', sector: 'Defense & Demining', type: 'Technology Provider', tag: 'Defense', category: 'infrastructure', productNoun: 'demining and ISR systems', companies: ['SafeGround Systems', 'Sentinel Defense Tech', 'Orbital Shield UA'] },
  { name: 'Infrastructure, Construction & Real Estate', sector: 'Construction & Housing', type: 'Manufacturer', tag: 'Housing', category: 'housing', productNoun: 'modular housing units', companies: ['UkrBuild Solutions', 'SteelFrame Ltd', 'Slava Modular'] },
  { name: 'Energy, Utilities & Natural Resources', sector: 'Renewable Energy', type: 'Energy Provider', tag: 'Energy', category: 'energy', productNoun: 'solar microgrid kits', companies: ['EcoGrid Power', 'EnerGreen Home', 'Dnipro Energy Co'] },
  { name: 'Agriculture, Food & Forestry', sector: 'AgriTech', type: 'Supplier', tag: 'AgriTech', category: 'water', productNoun: 'precision-irrigation systems', companies: ['Chornozem Agri', 'GreenField Foods', 'Harvest UA'] },
  { name: 'Manufacturing & Industrial', sector: 'Industrial Manufacturing', type: 'Manufacturer', tag: 'Manufacturing', category: 'infrastructure', productNoun: 'prefabricated steel components', companies: ['Kharkiv Industrial Works', 'ProMash Group', 'IronCore Mfg'] },
  { name: 'Financial Services & Investment', sector: 'Investment & Finance', type: 'Investor', tag: 'Investment', category: 'infrastructure', productNoun: 'reconstruction financing programmes', companies: ['Reconstruction Capital Partners', 'Kyiv Venture Fund', 'Baltic Recovery Capital'] },
  { name: 'Professional & Commercial Services', sector: 'Advisory & Consulting', type: 'Consultancy', tag: 'Advisory', category: 'infrastructure', productNoun: 'procurement advisory services', companies: ['Recovery Advisory Group', 'Meridian Consulting', 'Nordhaus Partners'] },
  { name: 'Government, International Affairs & NGOs', sector: 'Public Sector & Aid', type: 'Organisation', tag: 'Aid', category: 'infrastructure', productNoun: 'recovery coordination programmes', companies: ['Rebuild Ukraine Fund', 'Energy Recovery Council', 'CivicAid International'] },
  { name: 'Healthcare, MedTech & Pharmaceuticals', sector: 'MedTech', type: 'Manufacturer', tag: 'Healthcare', category: 'healthcare', productNoun: 'prefabricated clinic modules', companies: ['MedUnit Systems', 'Pulse Medical UA', 'CarePoint Modular'] },
  { name: 'Transportation & Logistics', sector: 'Logistics & Mobility', type: 'Supplier', tag: 'Logistics', category: 'transport', productNoun: 'cold-mix road repair material', companies: ['Autobahn Systems', 'LogiRail UA', 'Corridor Freight Co'] },
];

const TITLES = ['CEO', 'Managing Director', 'Business Development Lead', 'Project Director', 'Head of Procurement', 'Operations Manager', 'Investment Advisor', 'Policy Manager', 'Technical Lead', 'Partnerships Manager', 'Programme Coordinator', 'Regional Director', 'Head of Strategy', 'Commercial Manager'];
const PROFILE_TYPES = ['Investors', 'Product owners', 'Company representatives', 'Industry experts', 'Government / Municipal contacts', 'NGO / Aid fund representatives', 'Consultants / Advisors', 'Event speakers', 'Authors / Thought leaders'];
const ROLE_BADGE = {
  Investors: 'Investor', 'Product owners': 'Product Owner', 'Company representatives': 'Company Representative',
  'Industry experts': 'Industry Expert', 'Government / Municipal contacts': 'Gov / Municipal',
  'NGO / Aid fund representatives': 'NGO / Aid', 'Consultants / Advisors': 'Consultant',
  'Event speakers': 'Event Speaker', 'Authors / Thought leaders': 'Author',
};
const AVAILABILITY = ['Open to contact', 'Available for introductions', 'Investor meetings', 'Partnership requests', 'Speaking opportunities', 'Recently active'];
const PRODUCT_MEDIA = ['/assets/feed-product-2.png', '/assets/feed-product-3.jpg', '/assets/feed-product-4.jpg', '/assets/feed-product-5.jpg', '/assets/feed-product-6.jpg'];

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const initials = (s) => s.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
const avatar = (seed) => `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}&radius=50`;

/* ---- build companies (30) ---- */
const companies = [];
INDUSTRIES.forEach((ind, ii) => {
  ind.companies.forEach((cname, ci) => {
    const loc = CITIES[(ii * 3 + ci) % CITIES.length];
    companies.push({
      slug: slugify(cname),
      name: cname,
      logo_text: initials(cname),
      type: ind.type,
      sector: ind.sector,
      country: loc.country,
      verified: rnd() > 0.35,
      _industry: ind,
      _city: loc.city,
    });
  });
});

/* ---- build 200 members distributed across companies ---- */
const members = [];
for (let i = 0; i < 200; i++) {
  const company = companies[i % companies.length];
  const country = company.country;
  const pool = NAMES[country] || NAMES.Ukraine;
  const name = `${pick(pool.first)} ${pick(pool.last)}`;
  const profile = pick(PROFILE_TYPES);
  const title = pick(TITLES);
  const ind = company._industry;
  members.push({
    name,
    role_badge: ROLE_BADGE[profile],
    title,
    profile_type: profile,
    company_name: company.name,
    headline: `${title} at ${company.name} · ${company._city}, ${country}`,
    location: `${company._city}, ${country}`,
    city: company._city,
    country,
    avatar_url: avatar(name + i),
    industries: [ind.name],
    tags: [ind.tag, pick(['Recovery', 'B2B', 'Reconstruction', 'Partnerships'])],
    availability: sample(AVAILABILITY, 1 + Math.floor(rnd() * 2)),
    _companySlug: company.slug,
  });
}

/* ---- build products (1-3 per company) ---- */
const products = [];
let pmedia = 0;
companies.forEach((c) => {
  const n = 1 + Math.floor(rnd() * 3);
  for (let k = 0; k < n; k++) {
    const base = c._industry.productNoun;
    const owner = members.find((m) => m._companySlug === c.slug);
    products.push({
      slug: `${c.slug}-p${k + 1}`,
      name: `${c.name.split(' ')[0]} ${base.replace(/^[a-z]/, (x) => x.toUpperCase())}`.slice(0, 80),
      description: `${c.name} supplies ${base} engineered for Ukraine's reconstruction — built to ${pick(['deploy in days', 'scale across regions', 'meet EU standards', 'cut delivery time', 'operate off-grid'])}.`,
      category: c._industry.category,
      _companySlug: c.slug,
      company_name: c.name,
      location: c._city,
      media_url: PRODUCT_MEDIA[pmedia++ % PRODUCT_MEDIA.length],
      owner_name: owner ? owner.name : 'Mark Weber',
      owner_role: owner ? owner.title : 'Business Development Lead',
      owner_initials: initials(owner ? owner.name : 'Mark Weber'),
    });
  }
});

async function clear(table) {
  const { error } = await db.from(table).delete().gte('created_at', '1970-01-01');
  if (error) throw new Error(`clear ${table}: ${error.message}`);
}
async function insertAll(table, rows, chunk = 100) {
  let inserted = 0;
  for (let i = 0; i < rows.length; i += chunk) {
    const { data, error } = await db.from(table).insert(rows.slice(i, i + chunk)).select('id');
    if (error) throw new Error(`insert ${table}: ${error.message}`);
    inserted += data.length;
  }
  console.log(`  ${table}: +${inserted}`);
  return inserted;
}

async function main() {
  console.log('Clearing products, members, companies…');
  await clear('products');
  await clear('members');
  await clear('companies');

  console.log('Seeding companies…');
  const { data: insertedCompanies, error: cErr } = await db
    .from('companies')
    .insert(companies.map(({ _industry, _city, ...c }) => c))
    .select('id, slug');
  if (cErr) throw new Error(`companies: ${cErr.message}`);
  const idBySlug = Object.fromEntries(insertedCompanies.map((c) => [c.slug, c.id]));
  console.log(`  companies: +${insertedCompanies.length}`);

  console.log('Seeding members…');
  await insertAll(
    'members',
    members.map(({ _companySlug, ...m }) => ({ ...m, company_id: idBySlug[_companySlug] ?? null })),
  );

  console.log('Seeding products…');
  await insertAll(
    'products',
    products.map(({ _companySlug, ...p }) => ({ ...p, company_id: idBySlug[_companySlug] ?? null })),
  );

  // Update per-company counts.
  console.log('Updating company counts…');
  for (const c of companies) {
    const mc = members.filter((m) => m._companySlug === c.slug).length;
    const pc = products.filter((p) => p._companySlug === c.slug).length;
    await db.from('companies').update({ members_count: mc, products_count: pc }).eq('slug', c.slug);
  }

  // Reflect real totals in the header pill.
  await db.from('platform_stats').upsert({
    id: 1,
    members_count: members.length,
    companies_count: companies.length,
    products_count: products.length,
  });

  console.log(`Done. ${companies.length} companies, ${members.length} members, ${products.length} products.`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
