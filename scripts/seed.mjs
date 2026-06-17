/**
 * Seeds the RainCloud Ukraina database via the Supabase service role.
 * Mirrors supabase/seed.sql but runs over the Data API (no DB password
 * needed). Idempotent: clears the directory tables, then repopulates.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed.mjs
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.');
  process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });
const ALL = '1970-01-01';

async function clear(table) {
  const { error } = await db.from(table).delete().gte('created_at', ALL);
  if (error) throw new Error(`clear ${table}: ${error.message}`);
}

async function insert(table, rows) {
  const { data, error } = await db.from(table).insert(rows).select();
  if (error) throw new Error(`insert ${table}: ${error.message}`);
  console.log(`  ${table}: +${data.length}`);
  return data;
}

const companies = [
  { slug: 'safeground-ukraine', name: 'SafeGround Ukraine', logo_text: 'SG', type: 'Technology Provider', sector: 'Defense & Demining', country: 'Ukraine', products_count: 6, members_count: 14, verified: true },
  { slug: 'steelframe-ltd', name: 'SteelFrame Ltd', logo_text: 'SF', type: 'Supplier', sector: 'Infrastructure', country: 'Denmark', products_count: 5, members_count: 17, verified: true },
  { slug: 'energreen-home', name: 'EnerGreen Home', logo_text: 'EG', type: 'Energy Provider', sector: 'Renewable Energy', country: 'Poland', products_count: 8, members_count: 24, verified: true },
  { slug: 'ukrbuild-solutions', name: 'UkrBuild Solutions', logo_text: 'UB', type: 'Manufacturer', sector: 'Construction & Housing', country: 'Ukraine', products_count: 12, members_count: 38, verified: true },
];

const members = [
  { name: 'Olena Kovalenko', role_badge: 'Industry Expert', title: 'Energy Policy Manager', profile_type: 'Industry experts', company_name: 'Energy Recovery Council', headline: 'Energy Policy Manager · Kyiv, Ukraine', location: 'Kyiv, Ukraine', city: 'Kyiv', country: 'Ukraine', avatar_url: '/assets/ins-avatar-olena.jpg', industries: ['Energy, Utilities & Natural Resources', 'Government, International Affairs & NGOs'], tags: ['Energy', 'Public Policy'], availability: ['Open to contact'] },
  { name: 'Ivan Petrov', role_badge: 'Product Owner', title: 'Business Development Lead', profile_type: 'Product owners', company_name: 'Slava Modular', headline: 'Business Development Lead at Slava Modular · Kyiv', location: 'Kyiv, Ukraine', city: 'Kyiv', country: 'Ukraine', avatar_url: '/assets/feed-avatar-3.jpg', industries: ['Infrastructure, Construction & Real Estate'], tags: ['Housing', 'Modular'], availability: ['Partnership requests'] },
  { name: 'Dmytro Melnyk', role_badge: 'Industry Expert', title: 'Defense Technology Specialist', profile_type: 'Industry experts', company_name: 'SafeGround Ukraine', headline: 'Defense Technology Specialist · Lviv, Ukraine', location: 'Lviv, Ukraine', city: 'Lviv', country: 'Ukraine', avatar_url: '/assets/ins-avatar-dmytro.jpg', industries: ['Technology, Defense & Space'], tags: ['Defense', 'Demining'], availability: ['Open to contact'] },
  { name: 'Anna Müller', role_badge: 'Company Representative', title: 'Project Director', profile_type: 'Company representatives', company_name: 'WeBuild', headline: 'Project Director at WeBuild · Berlin, Germany', location: 'Berlin, Germany', city: 'Berlin', country: 'Germany', avatar_url: '/assets/feed-avatar-1.jpg', industries: ['Infrastructure, Construction & Real Estate'], tags: ['Construction', 'Project Mgmt'], availability: ['Available for introductions'] },
  { name: 'Tomasz Jabłoński', role_badge: 'Investor', title: 'Investment Advisor', profile_type: 'Investors', company_name: 'Reconstruction Capital Partners', headline: 'Investment Advisor · Warsaw, Poland', location: 'Warsaw, Poland', city: 'Warsaw', country: 'Poland', avatar_url: '/assets/feed-avatar-4.jpg', industries: ['Financial Services & Investment'], tags: ['Investment', 'Recovery'], availability: ['Investor meetings'] },
  { name: 'Iryna Shevchenko', role_badge: 'Industry Expert', title: 'Microgrid Procurement Lead', profile_type: 'Consultants / Advisors', company_name: 'EcoGrid Power', headline: 'Microgrid Procurement Lead · Dnipro, Ukraine', location: 'Dnipro, Ukraine', city: 'Dnipro', country: 'Ukraine', avatar_url: '/assets/ins-avatar-iryna.jpg', industries: ['Energy, Utilities & Natural Resources', 'Professional & Commercial Services'], tags: ['Energy', 'Procurement'], availability: ['Open to contact', 'Speaking opportunities'] },
  { name: 'Andriy Bondarenko', role_badge: 'Company Representative', title: 'Municipal Recovery Officer', profile_type: 'Government / Municipal contacts', company_name: 'Kharkiv City Council', headline: 'Municipal Recovery Officer · Kharkiv, Ukraine', location: 'Kharkiv, Ukraine', city: 'Kharkiv', country: 'Ukraine', avatar_url: '/assets/ins-avatar-andriy.jpg', industries: ['Government, International Affairs & NGOs', 'Infrastructure, Construction & Real Estate'], tags: ['Public Sector', 'Recovery'], availability: ['Available for introductions'] },
  { name: 'Kateryna Tkachenko', role_badge: 'Industry Expert', title: 'Aid Programme Coordinator', profile_type: 'NGO / Aid fund representatives', company_name: 'Rebuild Ukraine Fund', headline: 'Aid Programme Coordinator · Odesa, Ukraine', location: 'Odesa, Ukraine', city: 'Odesa', country: 'Ukraine', avatar_url: '/assets/ins-avatar-kateryna.jpg', industries: ['Government, International Affairs & NGOs', 'Healthcare, MedTech & Pharmaceuticals'], tags: ['Aid', 'Healthcare'], availability: ['Open to contact'] },
  { name: 'Maksym Ivanov', role_badge: 'Company Representative', title: 'Logistics Director', profile_type: 'Company representatives', company_name: 'AquaTech UA', headline: 'Logistics Director at AquaTech UA · Kyiv', location: 'Kyiv, Ukraine', city: 'Kyiv', country: 'Ukraine', avatar_url: '/assets/ins-avatar-maksym.jpg', industries: ['Transportation & Logistics', 'Manufacturing & Industrial'], tags: ['Logistics', 'Water'], availability: ['Partnership requests'] },
  { name: 'Sofia Larsen', role_badge: 'Industry Expert', title: 'Modular Housing Author', profile_type: 'Authors / Thought leaders', company_name: 'Nordic Recovery Institute', headline: 'Author & Researcher · Copenhagen, Denmark', location: 'Copenhagen, Denmark', city: 'Copenhagen', country: 'Denmark', avatar_url: '/assets/net-avatar-anna.jpg', industries: ['Infrastructure, Construction & Real Estate', 'Professional & Commercial Services'], tags: ['Housing', 'Research'], availability: ['Speaking opportunities', 'Recently active'] },
  { name: 'Olena Marchenko', role_badge: 'Industry Expert', title: 'Recovery Strategy Speaker', profile_type: 'Event speakers', company_name: 'Ukraine Recovery Forum', headline: 'Recovery Strategy Speaker · Warsaw, Poland', location: 'Warsaw, Poland', city: 'Warsaw', country: 'Poland', avatar_url: '/assets/net-avatar-olena.jpg', industries: ['Professional & Commercial Services', 'Government, International Affairs & NGOs'], tags: ['Strategy', 'Events'], availability: ['Speaking opportunities'] },
  { name: 'Mark Weber', role_badge: 'Company Representative', title: 'Business Development Lead', profile_type: 'Company representatives', company_name: 'UkrBuild Solutions', headline: 'Business Development Lead at UkrBuild Solutions · Berlin', location: 'Berlin, Germany', city: 'Berlin', country: 'Germany', avatar_url: '/assets/feed-avatar-2.jpg', industries: ['Infrastructure, Construction & Real Estate', 'Manufacturing & Industrial'], tags: ['Construction', 'Modular'], availability: ['Open to contact', 'Partnership requests'] },
];

const productsRaw = [
  { slug: 'rapid-modular-housing', name: 'Rapid Modular Housing Units', description: 'Insulated prefabricated homes for displaced families, deployable in days.', category: 'housing', companySlug: 'ukrbuild-solutions', company_name: 'UkrBuild Solutions', location: 'Kyiv', media_url: '/assets/feed-product-1.gif' },
  { slug: 'steel-bridge-components', name: 'Steel Bridge Repair Components', description: 'Modular beams, decking plates and connectors for fast replacement of damaged spans.', category: 'infrastructure', companySlug: 'steelframe-ltd', company_name: 'DniproSteel Works', location: 'Dnipro', media_url: '/assets/feed-product-2.png' },
  { slug: 'solar-microgrid-kits', name: 'Solar Microgrid Kits', description: 'Containerised solar, battery and inverter systems for schools, clinics and community shelters.', category: 'energy', companySlug: 'energreen-home', company_name: 'EcoGrid Power', location: 'Lviv', media_url: '/assets/feed-product-3.jpg' },
  { slug: 'mobile-water-purification', name: 'Mobile Water Purification Units', description: 'Trailer-mounted treatment for emergency drinking water and temporary settlements.', category: 'water', companySlug: null, company_name: 'AquaTech UA', location: 'Kharkiv', media_url: '/assets/feed-product-4.jpg' },
  { slug: 'prefab-clinic-modules', name: 'Prefabricated Clinic Modules', description: 'Ready-to-install medical rooms with HVAC, sanitary cores and medical-grade utilities.', category: 'healthcare', companySlug: null, company_name: 'MedUnit Systems', location: 'Warsaw', media_url: '/assets/feed-product-5.jpg' },
  { slug: 'cold-mix-road-repair', name: 'Cold-Mix Road Repair Material', description: 'All-season asphalt repair for rapid resurfacing of damaged roads and logistics corridors.', category: 'transport', companySlug: null, company_name: 'Autobahn Systems', location: 'Berlin', media_url: '/assets/feed-product-6.jpg' },
];

const insights = [
  { title: 'How modular housing can shorten recovery timelines', description: 'Lessons from three pilot deployments on cutting time-to-shelter without cutting quality.', kind: 'Article', author_name: 'Olena Marchenko', published_at: '2025-03-12' },
  { title: 'Microgrid procurement checklist for public facilities', description: 'A practical checklist covering sizing, resilience and maintenance for municipal buyers.', kind: 'PDF', author_name: 'Iryna Shevchenko', published_at: '2025-03-08' },
  { title: 'Choosing cold-mix materials for damaged corridors', description: 'When cold-mix beats hot-mix for rapid, all-weather repair of critical logistics routes.', kind: 'Article', author_name: 'Dmytro Melnyk', published_at: '2025-03-08' },
];

const events = [
  { title: 'Ukraine Recovery Infrastructure Forum', description: 'Two days of matchmaking between municipalities, suppliers and financing partners.', kind: 'Forum', event_date: '2026-05-25', location: 'Kyiv, Ukraine' },
  { title: 'Modular Housing Roundtable', description: 'Standards, logistics and financing for scaling modular housing across regions.', kind: 'Roundtable', event_date: '2026-06-04', location: 'Warsaw, Poland' },
  { title: 'Energy Resilience Summit', description: 'Grid hardening, microgrids and distributed storage for critical facilities.', kind: 'Conference', event_date: '2026-06-18', location: 'Berlin, Germany' },
];

const news = [
  { title: 'New EU facility unlocks €2bn for grid repair', description: 'Funding targets distribution networks in front-line regions over the next 18 months.', category: 'energy', source: 'Reuters', image_url: '/assets/feed-news-1.png', published_at: '2025-03-14' },
  { title: 'First 500 modular homes handed over in Bucha', description: 'A consortium of manufacturers completes the largest modular delivery to date.', category: 'housing', source: 'Kyiv Independent', image_url: '/assets/feed-news-2.png', published_at: '2025-03-11' },
  { title: 'Bridge rebuilding programme adds 40 new sites', description: 'Standardised steel components cut average reconstruction time by a third.', category: 'infrastructure', source: 'UkrInform', image_url: '/assets/feed-news-3.png', published_at: '2025-03-09' },
];

const opportunities = [
  { title: 'Prefab housing supplier', description: 'Supply and install 300 modular housing units for a returning-residents programme.', kind: 'RFP', value_label: '£1.8M', location: 'Bucha, Ukraine', deadline: '2026-08-12' },
  { title: 'Solar panels, 2MW minimum', description: 'Procurement of PV modules and inverters for municipal microgrid resilience.', kind: 'Tender', value_label: '£3.2M', location: 'Odesa, Ukraine', deadline: '2026-08-20' },
  { title: 'Water treatment system — Kyiv', description: 'Design-build of a containerised water treatment plant for a district of 40,000.', kind: 'Procurement', value_label: '£940K', location: 'Kyiv, Ukraine', deadline: '2026-09-05' },
];

async function main() {
  console.log('Clearing tables…');
  for (const t of ['products', 'members', 'opportunities', 'news', 'events', 'insights', 'companies']) {
    await clear(t);
  }

  console.log('Seeding…');
  const { error: psErr } = await db
    .from('platform_stats')
    .upsert({ id: 1, members_count: 4280, companies_count: 1140, products_count: 2123 });
  if (psErr) throw new Error(`platform_stats: ${psErr.message}`);
  console.log('  platform_stats: set');

  const insertedCompanies = await insert('companies', companies);
  const idBySlug = Object.fromEntries(insertedCompanies.map((c) => [c.slug, c.id]));

  await insert('members', members);
  await insert(
    'products',
    productsRaw.map(({ companySlug, ...p }) => ({
      ...p,
      company_id: companySlug ? idBySlug[companySlug] : null,
      owner_name: 'Mark Weber',
      owner_role: 'Business Development Lead',
      owner_initials: 'MW',
    })),
  );
  await insert('insights', insights);
  await insert('events', events);
  await insert('news', news);
  await insert('opportunities', opportunities);

  console.log('Done.');
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
