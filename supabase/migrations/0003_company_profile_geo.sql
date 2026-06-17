-- ============================================================
-- RainCloud Ukraina — company profiles + geo for the map
-- Adds company description / logo image / website / location and
-- precise coordinates on both companies and members so the Google
-- Maps view can place company and user pins. Run AFTER 0002.
-- Backfill data with: node scripts/seed-geo.mjs
-- ============================================================

alter table public.companies
  add column if not exists description text not null default '',
  add column if not exists logo_url    text,
  add column if not exists website     text not null default '',
  add column if not exists city        text not null default '',
  add column if not exists latitude    double precision,
  add column if not exists longitude   double precision;

alter table public.members
  add column if not exists latitude  double precision,
  add column if not exists longitude double precision;

create index if not exists companies_city_idx on public.companies (city);
