/**
 * Replaces placeholder member avatars with real open-archive portrait photos
 * from randomuser.me (free for placeholder use). Gender is inferred from the
 * first name so men/women photos roughly match the names.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-avatars.mjs
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.');
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });

// First names that are female across the seed name pools (UA/PL/DE/DK).
const FEMALE = new Set([
  'Olena', 'Iryna', 'Kateryna', 'Sofiia', 'Nataliia', 'Yuliia', 'Mariia', 'Anna', 'Oksana', 'Viktoriia',
  'Katarzyna', 'Agnieszka', 'Magdalena', 'Zofia', 'Joanna',
  'Sophie', 'Laura', 'Hannah', 'Marie', 'Lena',
  'Sofia', 'Freja', 'Ida', 'Emma', 'Clara',
]);

const portrait = (gender, n) => `https://randomuser.me/api/portraits/${gender}/${n % 100}.jpg`;

async function main() {
  // Fetch all members in a stable order.
  const { data: members, error } = await db
    .from('members')
    .select('id, name')
    .order('created_at', { ascending: true })
    .limit(1000);
  if (error) throw new Error(error.message);

  const counters = { men: 0, women: 0 };
  let updated = 0;
  for (const m of members) {
    const first = (m.name || '').split(' ')[0];
    const gender = FEMALE.has(first) ? 'women' : 'men';
    const avatar = portrait(gender, counters[gender]++);
    const { error: uErr } = await db.from('members').update({ avatar_url: avatar }).eq('id', m.id);
    if (uErr) throw new Error(`update ${m.id}: ${uErr.message}`);
    updated++;
  }
  console.log(`Updated ${updated} avatars (men: ${counters.men}, women: ${counters.women}).`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
