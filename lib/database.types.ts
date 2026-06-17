/**
 * Hand-authored database types for the RainCloud Ukraina schema.
 * Mirrors supabase/migrations/0001_init.sql. If you change the SQL,
 * keep this in sync (or regenerate with `supabase gen types typescript`).
 */

export type ProductCategory =
  | 'housing'
  | 'infrastructure'
  | 'energy'
  | 'water'
  | 'healthcare'
  | 'transport';

export interface PlatformStats {
  id: number;
  members_count: number;
  companies_count: number;
  products_count: number;
  updated_at: string;
}

export interface Company {
  id: string;
  slug: string;
  name: string;
  logo_text: string; // initials shown in the avatar tile
  type: string; // Manufacturer / Supplier / Technology Provider …
  sector: string; // Construction & Housing, Infrastructure …
  country: string;
  products_count: number;
  members_count: number;
  verified: boolean;
  created_at: string;
}

export interface Member {
  id: string;
  name: string;
  role_badge: string; // short card badge — Company Representative / Industry Expert …
  title: string; // job title — "Energy Policy Manager"
  profile_type: string; // filter-canonical — "Industry experts", "Investors" …
  company_name: string;
  headline: string; // "Project Director at WeBuild · Berlin, Germany"
  location: string; // "City, Country" (display)
  city: string;
  country: string;
  avatar_url: string | null;
  industries: string[]; // filter-canonical industry names
  tags: string[]; // short display chips
  availability: string[]; // "Open to contact", "Investor meetings" …
  company_id: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  company_id: string | null;
  company_name: string;
  location: string;
  media_url: string | null;
  owner_name: string;
  owner_role: string;
  owner_initials: string;
  created_at: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  kind: string; // Article / PDF
  author_name: string;
  published_at: string;
  created_at: string;
}

export interface PlatformEvent {
  id: string;
  title: string;
  description: string;
  kind: string; // Forum / Roundtable / Conference
  event_date: string;
  location: string;
  created_at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: ProductCategory | string;
  source: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  kind: string; // RFP / Tender / Procurement
  value_label: string; // "£1.8M"
  location: string;
  deadline: string;
  created_at: string;
}

type ReadOnlyTable<Row> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

export interface Database {
  public: {
    Tables: {
      platform_stats: ReadOnlyTable<PlatformStats>;
      companies: ReadOnlyTable<Company>;
      members: ReadOnlyTable<Member>;
      products: ReadOnlyTable<Product>;
      insights: ReadOnlyTable<Insight>;
      events: ReadOnlyTable<PlatformEvent>;
      news: ReadOnlyTable<NewsItem>;
      opportunities: ReadOnlyTable<Opportunity>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: { product_category: ProductCategory };
    CompositeTypes: Record<string, never>;
  };
}
