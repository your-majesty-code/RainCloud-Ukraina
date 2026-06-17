import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/database.types';

/**
 * Cookie-free Supabase client for PUBLIC reads (anon key + RLS read policies).
 * Used by the data layer so those reads can be cached (unstable_cache / ISR)
 * and never force a route to render dynamically.
 *
 * Returns null when env is missing so callers fail fast to fallback data
 * instead of constructing a client that hangs on an invalid URL.
 */
let cached: SupabaseClient<Database> | null | undefined;

export function getPublicSupabase(): SupabaseClient<Database> | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    cached = null;
    return cached;
  }

  cached = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
