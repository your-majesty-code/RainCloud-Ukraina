---
name: RainCloud Ukraina — v3 "Clarity / Slate & Storm"


colors:
  # Brand accent — Storm Orange
  primary: '#f05c26'            # Orange 600 — primary actions, active states, accents
  primary-hover: '#ea580c'      # Orange 700 — hover / pressed
  primary-strong: '#dc4f1f'     # pressed deep
  on-primary: '#ffffff'
  primary-soft: '#fff1eb'       # orange wash (badge / hover tint backgrounds)
  primary-soft-border: '#fdd9c8'

  # Ink / Slate — text + dark surfaces (navy pill nav, headings)
  ink: '#0f172a'                # Navy 900 — nav pill, strongest ink, active sidebar
  ink-800: '#1e293b'            # Navy 800
  ink-700: '#334155'            # Navy 700 — headings on light
  ink-600: '#475569'            # Navy 600 — body strong
  ink-500: '#64748b'            # Navy 500 — secondary text
  ink-400: '#94a3b8'            # Slate 400 — muted text / icons / placeholders
  ink-300: '#cbd5e1'            # Slate 300 — disabled / faint
  text-primary: '#111827'       # Gray 900 — primary reading text

  # Surfaces
  page: '#f8fafc'               # Slate 50 — app canvas
  surface: '#ffffff'            # white cards / panels
  surface-muted: '#f1f5f9'      # Slate 100 — inset / hover rows / track
  surface-subtle: '#f8fafc'     # Slate 50 — subtle fill
  surface-200: '#e2e8f0'        # Slate 200 — strong inset / skeleton

  # Lines
  border: '#e5e7eb'             # Border/Light (Gray 200) — hairline cards/inputs
  border-strong: '#cbd5e1'      # Slate 300 — emphasised divider

  # Glass (translucent floating header / overlays)
  glass: 'rgba(255,255,255,0.72)'   # header bar over content
  glass-soft: 'rgba(255,255,255,0.45)'

  # Semantic
  success: '#16a34a'
  success-soft: '#dcfce7'
  warning: '#d97706'
  warning-soft: '#fef3c7'
  danger: '#dc2626'
  danger-soft: '#fee2e2'
  info: '#2563eb'
  info-soft: '#dbeafe'


typography:
  # Single family — Montserrat — everywhere
  display:        { fontFamily: Montserrat, weight: '600', size: 36px, lineHeight: 45px, letterSpacing: '-0.9px' }
  title:          { fontFamily: Montserrat, weight: '600', size: 28px, lineHeight: 36px, letterSpacing: '-0.6px' }
  h3:             { fontFamily: Montserrat, weight: '500', size: 20px, lineHeight: 28px, letterSpacing: '-0.5px' }
  h4:             { fontFamily: Montserrat, weight: '600', size: 18px, lineHeight: 24px, letterSpacing: '-0.4px' }
  body-lg:        { fontFamily: Montserrat, weight: '400', size: 16px, lineHeight: 24px, letterSpacing: '0' }
  body:           { fontFamily: Montserrat, weight: '400', size: 14px, lineHeight: 20px, letterSpacing: '0' }
  body-medium:    { fontFamily: Montserrat, weight: '500', size: 14px, lineHeight: 20px, letterSpacing: '0' }
  label:          { fontFamily: Montserrat, weight: '500', size: 12px, lineHeight: 16px, letterSpacing: '0' }
  label-caps:     { fontFamily: Montserrat, weight: '600', size: 11px, lineHeight: 16px, letterSpacing: '0.06em', textTransform: uppercase }


rounded:
  sm: 6px
  DEFAULT: 8px
  md: 10px
  lg: 12px
  xl: 16px       # cards
  2xl: 20px
  3xl: 24px      # large panels / sidebar cards
  full: 9999px   # pills, chips, avatars


spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 24px
  sidebar-width: 285px
  nav-height: 80px
  content-max: 1155px


shadow:
  glass: '0 8px 32px rgba(2, 6, 23, 0.05)'
  card: '0 1px 2px rgba(2, 6, 23, 0.04), 0 1px 3px rgba(2, 6, 23, 0.06)'
  card-hover: '0 8px 24px rgba(2, 6, 23, 0.08), 0 2px 6px rgba(2, 6, 23, 0.05)'
  pill: '0 4px 16px rgba(2, 6, 23, 0.08)'
  primary: '0 6px 18px rgba(240, 92, 38, 0.30)'
---

## Brand & Style

**RainCloud Ukraina v3 — "Clarity / Slate & Storm."** The platform connects people, companies, products, opportunities, events and insight around the reconstruction of Ukraine. The product voice is **purposeful, modern, and credible** — an institutional-grade B2B network that still feels human and energetic.

The aesthetic is **clean modern-SaaS** built on a cool **slate** neutral palette, crisp **white glass cards**, and a single confident **Storm Orange** accent. Visual signatures:

- A **floating navy "pill" navigation** that hovers over a soft slate canvas.
- **Translucent glass surfaces** (header bar, overlays) with backdrop blur, anchored by very soft, wide shadows rather than hard borders.
- **Image-forward cards** with rounded corners, category badges, author avatars, and a strict typographic hierarchy.
- **Filter rails** on the left of every directory page — white rounded cards holding search + grouped filters.

This replaces the previous warm-paper / sage / Open-Sans concept (archived as `design.md.old`). It keeps the calm, low-noise philosophy but expresses it through cool light, glass, and a tighter single-typeface system.

## Colors

A **cool slate** system. ~70% canvas + white surfaces, ~20% slate text/lines, ~10% Storm Orange accent.

- **Storm Orange (`#f05c26`):** the only accent. Primary buttons, active nav/sidebar item, key badges, calendar event pills, links-as-actions, focus. Hover → `#ea580c`.
- **Ink / Slate scale (`#0f172a` → `#94a3b8`):** `#0f172a` (Navy 900) is the dark navigation pill and strongest ink; `#334155`–`#1e293b` for headings; `#475569`/`#64748b` for body and secondary text; `#94a3b8` for muted captions, placeholders, and inactive icons.
- **Reading text:** `#111827` (Gray 900) for primary body copy and card titles.
- **Canvas (`#f8fafc`):** the slate-50 app background. **Surface (`#ffffff`):** every card, panel, input.
- **Border (`#e5e7eb`):** 1px hairline on cards, inputs, dividers, calendar cells.
- **Glass:** translucent white (`rgba(255,255,255,0.72)`) + `backdrop-filter: blur(20px)` for the floating header.

Semantic colors (success/warning/danger/info) exist for system states only — never decorative. Default "positive/active" intent is carried by Storm Orange, not green.

## Typography

**Montserrat, everywhere** — headings, body, UI, numbers. One family creates a tight, institutional, modern feel. Weights: 400 / 500 / 600.

- **Display 36 / Title 28:** page-level identity (greeting, page H1).
- **H3 20 (Medium) / H4 18 (SemiBold):** section headers and card titles.
- **Body 14 / Body-lg 16:** default UI and reading text. Most directory UI runs at 14px Medium.
- **Label 12 / Label-caps 11:** metadata, filter-group headers (uppercase, tracked), badge text.

Headings carry slight negative tracking (-0.4 to -0.9px) for a crisp, engineered look. Body tracking is 0.

## Layout & Spacing

Two app shells, both on the `#f8fafc` canvas, max content width **1155px**:

1. **Feed shell** — a fixed **left icon-nav rail (285px)** (Feed, Network, Companies, Virtual Trade Show, Business Pavilions, Opportunities, Thought Leadership, Events, News) + a **white top header** (logo · greeting · live stats pill · action icons · avatar). Content = Storm AI hero + stacked feed sections.
2. **Directory shell** — a **floating navy pill top-nav** (logo left · centered section links · right action icons + avatar) + a **left filter rail** of white cards (search + grouped filters) + a main content grid.

Spacing rides an 8px-ish grid (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64). Page gutter 24–32px. Card grids are 3-up on desktop with 24px gaps, collapsing to 2-up (tablet) and 1-up (mobile, ≤ 640px). Internal spacing ≤ external spacing, always.

## Elevation & Depth

Depth comes from **soft, wide, low-opacity shadows on white** over the slate canvas — not heavy borders.

- **Cards:** white + 1px `#e5e7eb` border + `shadow-card` (barely-there). On hover, lift to `shadow-card-hover` and translate up 2px.
- **Floating header / overlays:** glass fill + `blur(20px)` + `shadow-glass` (`0 8px 32px rgba(2,6,23,.05)`).
- **Nav pill / primary buttons:** the navy pill uses `shadow-pill`; primary orange buttons use `shadow-primary` (orange glow) on hover.
- Motion: GPU-only (transform/opacity), `ease-out` ~160–200ms for entrances and hovers.

## Shapes

Friendly-but-precise rounding:

- **Cards / image thumbnails:** 16px (`xl`). Sidebar filter cards: 20–24px (`2xl`/`3xl`).
- **Buttons / inputs / select:** 10px (`md`).
- **Pills, chips, tabs, avatars, nav pill, badges:** fully rounded (`full`).
- Nested radii are always smaller than their parent.

## Components

- **Nav pill (directory shell):** dark navy `#0f172a`, fully rounded, ~52px tall; links in `#cbd5e1`/white at 14px Medium; the active link is a Storm-Orange filled pill; right cluster = circular icon buttons + avatar.
- **App sidebar (feed shell):** 285px; icon + 14px label rows; active row is a navy `#0f172a` filled pill with white text; "Close sidebar" affordance pinned bottom.
- **Filter rail card:** white, 20–24px radius, 1px border, soft shadow; contains a rounded search input (leading magnifier), uppercase 11px group headers, and rows/chips. Active filter = orange text/fill or orange dot.
- **Content card:** white, 16px radius, 1px border, `shadow-card`. Image header (16:10-ish) with absolutely-positioned category badge (uppercase 11px, white-glass or colored pill); body padding 16–20px; optional avatar(20–24px)+author row; title H4 18/sb clamped to 2 lines; meta row 12–14px in `#64748b`.
- **Buttons:** Primary = solid Storm Orange, white text, 10px radius, 40px tall, semibold; hover `#ea580c` + `shadow-primary`. Secondary = white, 1px `#e5e7eb` border, `#334155` text. Ghost = transparent, slate text, hover `#f1f5f9`.
- **Chips / toggles / segmented controls:** fully-rounded; selected = navy or orange fill with white text; idle = white/transparent with slate text + border.
- **Badges:** small uppercase pills. `NEWS`/category = colored or glass; status (e.g. "Online event") = subtle slate/colored soft pill.
- **Calendar:** 7-col grid, 1px `#e5e7eb` cell borders, weekend/out-of-month cells faintly greyed; day number 12–14px; events render as Storm-Orange filled pills (avatar + title) that can span the cell.
- **Inputs:** white, 1px border, 10px radius, 40px tall, `#94a3b8` placeholder; focus = orange ring (`0 0 0 3px rgba(240,92,38,.18)`) + orange border.
