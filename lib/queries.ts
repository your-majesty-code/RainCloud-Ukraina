import { createSupabaseServerClient } from '@/lib/supabase/server';
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

/** Header live-stats pill. Falls back to the marketing defaults if unset
 *  or if Supabase is unconfigured/unreachable (keeps the chrome rendering). */
export async function getPlatformStats(): Promise<PlatformStats> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from('platform_stats')
      .select('*')
      .limit(1)
      .maybeSingle();
    return data ?? DEFAULT_STATS;
  } catch {
    return DEFAULT_STATS;
  }
}

/** All members for the Network directory (client filters over this set). */
export async function getNetworkMembers(): Promise<Member[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);
    return data ?? [];
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

/**
 * Loads everything the Feed page renders, in parallel, from Supabase.
 * Each query degrades gracefully: a failing/empty table yields an empty
 * section (or the default marketing stats) rather than crashing the page,
 * so the shell always renders even before the DB is seeded.
 */
export async function getFeedData(): Promise<FeedData> {
  const EMPTY: FeedData = {
    stats: DEFAULT_STATS,
    products: [],
    members: [],
    companies: [],
    insights: [],
    events: [],
    news: [],
    opportunities: [],
  };

  try {
    const supabase = await createSupabaseServerClient();

    const [stats, products, members, companies, insights, events, news, opportunities] =
      await Promise.all([
      supabase.from('platform_stats').select('*').limit(1).maybeSingle(),
      supabase.from('products').select('*').order('created_at', { ascending: false }).limit(6),
      supabase.from('members').select('*').order('created_at', { ascending: false }).limit(4),
      supabase.from('companies').select('*').order('created_at', { ascending: false }).limit(4),
      supabase.from('insights').select('*').order('published_at', { ascending: false }).limit(3),
      supabase.from('events').select('*').order('event_date', { ascending: true }).limit(3),
      supabase.from('news').select('*').order('published_at', { ascending: false }).limit(3),
      supabase
        .from('opportunities')
        .select('*')
        .order('deadline', { ascending: true })
        .limit(3),
    ]);

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
  } catch {
    return EMPTY;
  }
}
