/**
 * Backfills the columns added in 0003_company_profile_geo.sql:
 *   - companies: description, logo_url, website, city, latitude, longitude
 *   - members:   latitude, longitude (city centre, for map clustering)
 *
 * Re-derives the deterministic company→city mapping used by seed-bulk.mjs.
 * Run AFTER applying 0003 and AFTER seed-bulk.mjs.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-geo.mjs
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.');
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });

const COORDS = {
  Kyiv: { lat: 50.4501, lng: 30.5234 },
  Lviv: { lat: 49.8397, lng: 24.0297 },
  Dnipro: { lat: 48.4647, lng: 35.0462 },
  Kharkiv: { lat: 49.9935, lng: 36.2304 },
  Odesa: { lat: 46.4825, lng: 30.7233 },
  Warsaw: { lat: 52.2297, lng: 21.0122 },
  Berlin: { lat: 52.52, lng: 13.405 },
  Copenhagen: { lat: 55.6761, lng: 12.5683 },
};
const CITIES = [
  { city: 'Kyiv', country: 'Ukraine' }, { city: 'Lviv', country: 'Ukraine' },
  { city: 'Dnipro', country: 'Ukraine' }, { city: 'Kharkiv', country: 'Ukraine' },
  { city: 'Odesa', country: 'Ukraine' }, { city: 'Warsaw', country: 'Poland' },
  { city: 'Berlin', country: 'Germany' }, { city: 'Copenhagen', country: 'Denmark' },
];
const INDUSTRIES = [
  { type: 'Technology Provider', sector: 'Defense & Demining', productNoun: 'demining and ISR systems', companies: ['SafeGround Systems', 'Sentinel Defense Tech', 'Orbital Shield UA'] },
  { type: 'Manufacturer', sector: 'Construction & Housing', productNoun: 'modular housing units', companies: ['UkrBuild Solutions', 'SteelFrame Ltd', 'Slava Modular'] },
  { type: 'Energy Provider', sector: 'Renewable Energy', productNoun: 'solar microgrid kits', companies: ['EcoGrid Power', 'EnerGreen Home', 'Dnipro Energy Co'] },
  { type: 'Supplier', sector: 'AgriTech', productNoun: 'precision-irrigation systems', companies: ['Chornozem Agri', 'GreenField Foods', 'Harvest UA'] },
  { type: 'Manufacturer', sector: 'Industrial Manufacturing', productNoun: 'prefabricated steel components', companies: ['Kharkiv Industrial Works', 'ProMash Group', 'IronCore Mfg'] },
  { type: 'Investor', sector: 'Investment & Finance', productNoun: 'reconstruction financing programmes', companies: ['Reconstruction Capital Partners', 'Kyiv Venture Fund', 'Baltic Recovery Capital'] },
  { type: 'Consultancy', sector: 'Advisory & Consulting', productNoun: 'procurement advisory services', companies: ['Recovery Advisory Group', 'Meridian Consulting', 'Nordhaus Partners'] },
  { type: 'Organisation', sector: 'Public Sector & Aid', productNoun: 'recovery coordination programmes', companies: ['Rebuild Ukraine Fund', 'Energy Recovery Council', 'CivicAid International'] },
  { type: 'Manufacturer', sector: 'MedTech', productNoun: 'prefabricated clinic modules', companies: ['MedUnit Systems', 'Pulse Medical UA', 'CarePoint Modular'] },
  { type: 'Supplier', sector: 'Logistics & Mobility', productNoun: 'cold-mix road repair material', companies: ['Autobahn Systems', 'LogiRail UA', 'Corridor Freight Co'] },
];
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const jitter = () => (Math.random() - 0.5) * 0.08; // ~±4 km

async function main() {
  console.log('Backfilling company profiles + geo…');
  let i = 0;
  for (let ii = 0; ii < INDUSTRIES.length; ii++) {
    const ind = INDUSTRIES[ii];
    for (let ci = 0; ci < ind.companies.length; ci++) {
      const name = ind.companies[ci];
      const slug = slugify(name);
      const loc = CITIES[(ii * 3 + ci) % CITIES.length];
      const co = COORDS[loc.city];
      const { error } = await db
        .from('companies')
        .update({
          description: `${name} is a ${loc.country}-based ${ind.type.toLowerCase()} in ${ind.sector}, delivering ${ind.productNoun} for Ukraine's reconstruction.`,
          logo_url: `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(name)}&radius=12`,
          website: `https://${slug}.example.ua`,
          city: loc.city,
          latitude: co.lat + jitter(),
          longitude: co.lng + jitter(),
        })
        .eq('slug', slug);
      if (error) throw new Error(`company ${slug}: ${error.message}`);
      i++;
    }
  }
  console.log(`  companies updated: ${i}`);

  console.log('Backfilling member coordinates (by city)…');
  for (const { city } of CITIES) {
    const co = COORDS[city];
    const { error } = await db
      .from('members')
      .update({ latitude: co.lat, longitude: co.lng })
      .eq('city', city);
    if (error) throw new Error(`members ${city}: ${error.message}`);
  }
  console.log('  members coordinates set.');
  console.log('Done.');
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
