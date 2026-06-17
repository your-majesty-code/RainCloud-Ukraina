-- ============================================================
-- RainCloud Ukraina — Network directory enrichment
-- Adds the attributes the Network members directory filters on
-- (profile type, industries, location, company, availability) and
-- the fields its card renders. Run AFTER 0001_init.sql.
-- ============================================================

alter table public.members
  add column if not exists title        text not null default '',
  add column if not exists profile_type text not null default '',
  add column if not exists company_name text not null default '',
  add column if not exists city         text not null default '',
  add column if not exists country      text not null default '',
  add column if not exists industries   text[] not null default '{}',
  add column if not exists tags         text[] not null default '{}',
  add column if not exists availability text[] not null default '{}';

-- GIN indexes so array membership filters stay fast as the directory grows.
create index if not exists members_industries_idx   on public.members using gin (industries);
create index if not exists members_availability_idx on public.members using gin (availability);
create index if not exists members_profile_type_idx on public.members (profile_type);
create index if not exists members_city_idx         on public.members (city);
