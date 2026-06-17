import { unstable_cache } from 'next/cache';
import { getPublicSupabase } from '@/lib/supabase/public';
import type {
  Company,
  Insight,
  Member,
  NewsItem,
  Opportunity,
  PlatformEvent,
  PlatformStats,
  Product,
} from '@/lib/database.types';

const DEFAULT_STATS: PlatformStats = {
  id: 1,
  members_count: 4280,
  companies_count: 1140,
  products_count: 2123,
  updated_at: new Date(0).toISOString(),
};

/** Caps any single Supabase round-trip so a hang can never stall a page. */
function withTimeout<T>(p: PromiseLike<T>, ms = 2500): Promise<T> {
  return Promise.race([
    Promise.resolve(p),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('supabase timeout')), ms),
    ),
  ]);
}

// Revalidate window for the cached public reads (seconds).
const REVALIDATE = 300;

/** Header live-stats pill. Cached; falls back to marketing defaults on any error. */
const statsCached = unstable_cache(
  async (): Promise<PlatformStats> => {
    const sb = getPublicSupabase();
    if (!sb) throw new Error('supabase not configured');
    const { data, error } = await withTimeout(
      sb.from('platform_stats').select('*').limit(1).maybeSingle(),
    );
    if (error) throw error;
    return data ?? DEFAULT_STATS;
  },
  ['platform-stats'],
  { revalidate: REVALIDATE, tags: ['platform_stats'] },
);

export async function getPlatformStats(): Promise<PlatformStats> {
  try {
    return await statsCached();
  } catch {
    return DEFAULT_STATS;
  }
}

/** All members for the Network directory (client filters over this set). */
const networkMembersCached = unstable_cache(
  async (): Promise<Member[]> => {
    const sb = getPublicSupabase();
    if (!sb) throw new Error('supabase not configured');
    const { data, error } = await withTimeout(
      sb.from('members').select('*').order('created_at', { ascending: false }).limit(500),
    );
    if (error) throw error;
    return data ?? [];
  },
  ['network-members'],
  { revalidate: REVALIDATE, tags: ['members'] },
);

export async function getNetworkMembers(): Promise<Member[]> {
  try {
    return await networkMembersCached();
  } catch {
    return [];
  }
}

export interface FeedData {
  stats: PlatformStats;
  products: Product[];
  members: Member[];
  companies: Company[];
  insights: Insight[];
  events: PlatformEvent[];
  news: NewsItem[];
  opportunities: Opportunity[];
}

const EMPTY_FEED: FeedData = {
  stats: DEFAULT_STATS,
  products: [],
  members: [],
  companies: [],
  insights: [],
  events: [],
  news: [],
  opportunities: [],
};

/**
 * Loads everything the Feed page renders, in parallel, from Supabase.
 * Cached (ISR) + timeout-guarded, so repeat navigations are served from cache
 * and a slow/unconfigured DB degrades to empty sections instead of hanging.
 */
const feedCached = unstable_cache(
  async (): Promise<FeedData> => {
    const sb = getPublicSupabase();
    if (!sb) throw new Error('supabase not configured');

    const [stats, products, members, companies, insights, events, news, opportunities] =
      await withTimeout(
        Promise.all([
          sb.from('platform_stats').select('*').limit(1).maybeSingle(),
          sb.from('products').select('*').order('created_at', { ascending: false }).limit(6),
          sb.from('members').select('*').order('created_at', { ascending: false }).limit(4),
          sb.from('companies').select('*').order('created_at', { ascending: false }).limit(4),
          sb.from('insights').select('*').order('published_at', { ascending: false }).limit(3),
          sb.from('events').select('*').order('event_date', { ascending: true }).limit(3),
          sb.from('news').select('*').order('published_at', { ascending: false }).limit(3),
          sb.from('opportunities').select('*').order('deadline', { ascending: true }).limit(3),
        ]),
      );

    return {
      stats: stats.data ?? DEFAULT_STATS,
      products: products.data ?? [],
      members: members.data ?? [],
      companies: companies.data ?? [],
      insights: insights.data ?? [],
      events: events.data ?? [],
      news: news.data ?? [],
      opportunities: opportunities.data ?? [],
    };
  },
  ['feed-data'],
  { revalidate: REVALIDATE, tags: ['feed'] },
);

export async function getFeedData(): Promise<FeedData> {
  try {
    return await feedCached();
  } catch {
    return EMPTY_FEED;
  }
}
