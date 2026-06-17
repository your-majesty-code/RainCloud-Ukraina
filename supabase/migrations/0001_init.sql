-- ============================================================
-- RainCloud Ukraina — initial schema
-- Public directory data for the Feed dashboard. All tables are
-- read-only to the anon/authenticated roles via RLS; writes happen
-- through the service role (seeding / admin tooling) only.
-- ============================================================

create extension if not exists "pgcrypto";

-- ---- Platform stats (header live-stats pill, singleton) ----
create table if not exists public.platform_stats (
  id              smallint primary key default 1,
  members_count   integer not null default 0,
  companies_count integer not null default 0,
  products_count  integer not null default 0,
  updated_at      timestamptz not null default now(),
  constraint platform_stats_singleton check (id = 1)
);

-- ---- Companies & Organisations ----
create table if not exists public.companies (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  name           text not null,
  logo_text      text not null default '',
  type           text not null default '',
  sector         text not null default '',
  country        text not null default '',
  products_count integer not null default 0,
  members_count  integer not null default 0,
  verified       boolean not null default false,
  created_at     timestamptz not null default now()
);

-- ---- Members ----
create table if not exists public.members (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role_badge  text not null default '',
  headline    text not null default '',
  location    text not null default '',
  avatar_url  text,
  company_id  uuid references public.companies(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- ---- Products (Digital Trade Show) ----
create table if not exists public.products (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  name           text not null,
  description    text not null default '',
  category       text not null default 'infrastructure'
                   check (category in ('housing','infrastructure','energy','water','healthcare','transport')),
  company_id     uuid references public.companies(id) on delete set null,
  company_name   text not null default '',
  location       text not null default '',
  media_url      text,
  owner_name     text not null default '',
  owner_role     text not null default '',
  owner_initials text not null default '',
  created_at     timestamptz not null default now()
);

-- ---- Thought Leadership (insights) ----
create table if not exists public.insights (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text not null default '',
  kind         text not null default 'Article',
  author_name  text not null default '',
  published_at date not null default current_date,
  created_at   timestamptz not null default now()
);

-- ---- Events ----
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null default '',
  kind        text not null default 'Forum',
  event_date  date not null default current_date,
  location    text not null default '',
  created_at  timestamptz not null default now()
);

-- ---- News ----
create table if not exists public.news (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text not null default '',
  category     text not null default 'infrastructure',
  source       text not null default '',
  image_url    text,
  published_at date not null default current_date,
  created_at   timestamptz not null default now()
);

-- ---- Opportunities ----
create table if not exists public.opportunities (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null default '',
  kind        text not null default 'RFP',
  value_label text not null default '',
  location    text not null default '',
  deadline    date not null default current_date,
  created_at  timestamptz not null default now()
);

-- Helpful ordering indexes
create index if not exists products_created_idx      on public.products (created_at desc);
create index if not exists members_created_idx       on public.members (created_at desc);
create index if not exists companies_created_idx      on public.companies (created_at desc);
create index if not exists insights_published_idx     on public.insights (published_at desc);
create index if not exists events_date_idx            on public.events (event_date asc);
create index if not exists news_published_idx         on public.news (published_at desc);
create index if not exists opportunities_deadline_idx on public.opportunities (deadline asc);

-- ============================================================
-- Row Level Security — public read, no public write.
-- ============================================================
do $$
declare
  t text;
begin
  foreach t in array array[
    'platform_stats','companies','members','products',
    'insights','events','news','opportunities'
  ]
  loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists "public read %1$s" on public.%1$I;', t);
    execute format(
      'create policy "public read %1$s" on public.%1$I for select to anon, authenticated using (true);',
      t
    );
  end loop;
end$$;
