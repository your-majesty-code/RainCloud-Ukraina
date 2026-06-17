# RainCloud Ukraina

Live B2B platform powering global business to build the new Ukraine — connecting
people, companies, products, opportunities, events and insight around the
country's reconstruction.

Built with **Next.js (App Router) + TypeScript**, data in **Supabase
(Postgres)**, deployed on **Vercel**. The visual system reuses the project's
design tokens and rules (`styles/`, `.claude/design.md`, `.claude/design-rules.md`).

## Stack

- **Next.js 15** App Router, React 19, TypeScript
- **Supabase** — Postgres + RLS, queried server-side via `@supabase/ssr`
- **Plain CSS** design system (no Tailwind): `styles/tokens.css`, `styles/base.css`,
  `styles/components.css`, layered with the dark-navy header in `app/globals.css`

## Project layout

```
app/                     Next.js routes
  layout.tsx             root layout — header + sidebar shell (consistent chrome)
  page.tsx               redirects / → /feed
  feed/page.tsx          the Feed dashboard (live Supabase data)
  [section]/page.tsx     placeholders for the other nav sections
components/
  chrome/                Header, Sidebar (tooltips), ShellBody (collapse)
  feed/                  StormHero, SectionHead, Cards
  network/               Banner, FilterBar, MemberCard, NetworkMap, NetworkDirectory
lib/
  supabase/              server.ts + client.ts (@supabase/ssr)
  queries.ts             feed + network data fetchers (degrade gracefully)
  navigation.ts          sidebar items + tooltip copy (single source of truth)
  networkFilters.ts      filter taxonomy + matching + city coordinates
  database.types.ts      hand-authored DB types
styles/                  shared design system (tokens / base / components)
supabase/
  migrations/0001_init.sql   schema + RLS (public read)
  seed.sql                   launch content
public/
  brand/logo-raincloud.png   brand wordmark (image — used in the header)
  assets/                    feed media, avatars, icons
archive/prototype/        the original static-HTML prototype (design reference)
```

## Getting started

1. **Install**

   ```bash
   npm install
   ```

2. **Environment** — copy the template and fill in your Supabase keys
   (Supabase dashboard → Settings → API). A `.env.local` already exists for the
   current project.

   ```bash
   cp .env.example .env.local
   ```

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
   ```

   Optional — Google Maps for the Network → Map view (without it the map shows
   a placeholder and the list still works):

   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<maps-js-api-key>
   ```

3. **Database** — run the SQL in the Supabase SQL editor (or `supabase db push`),
   in order:

   1. `supabase/migrations/0001_init.sql` — base tables + RLS policies
   2. `supabase/migrations/0002_network.sql` — Network member attributes
   3. `supabase/seed.sql` — loads the launch content (safe to re-run)

4. **Run**

   ```bash
   npm run dev      # http://localhost:3000  → /feed
   ```

## Deploy (Vercel)

- Import the repo in Vercel (framework auto-detected as Next.js).
- Add the two `NEXT_PUBLIC_SUPABASE_*` env vars in Project → Settings →
  Environment Variables.
- Push to `main` — Vercel builds and deploys.

## Design consistency

The header (dark-navy chrome) and the left icon-nav rail are defined once in
`components/chrome/` and rendered by the root layout, so they are identical on
every page (design-rules.md Rule 1). Sidebar hover tooltips are CSS-only
(`.feed-nav__row[data-tip]`) with copy centralised in `lib/navigation.ts`.
The brand logo is a single image asset (`public/brand/logo-raincloud.png`).
