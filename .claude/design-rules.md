# RainCloud Ukraina — Design Rules

A living checklist for cross-page consistency. Every page in the platform must
satisfy every rule below. When reviewing or building a page, verify each rule.
Companion to [design.md](design.md) (the token/visual system).

---

## Rule 1 — Consistent global chrome (side nav + top panel)

**The left side-navigation panel and the top header panel must be identical on
every authenticated app page** (Feed, Network, Companies & Organisations,
Virtual Trade Show, Business Pavilions, Opportunities, Thought Leadership,
Events, News).

- **Top panel** — the white glass header (`.feed-header`): logo + tagline ·
  "Hello, Mike" greeting · live-stats pill (Members · Companies · Products) ·
  action icons (search, messages, notifications, Storm AI) · user avatar.
- **Side panel** — the icon-nav rail (`.feed-sidebar`): the same item set, in the
  same order, with the same icons; only the **active** item differs per page;
  "Close sidebar" pinned at the bottom.
- The markup/classes come from `styles/components.css` (or the inlined feed-shell
  block on self-contained pages). Do not fork the header or sidebar per page —
  changing one must change all.

**Why:** a single, stable frame lets users navigate the whole platform without
re-orienting. Inconsistent chrome reads as a different product.

**How to verify:** the header and sidebar render pixel-identically across pages
(same height, same items, same styling); only `.is-active` moves.

---

## Rule 2 — Maximum page width: 1980px  ⚠️ EXTREMELY IMPORTANT

**Every page's content must be capped at a maximum width of `1980px` and centered
horizontally.** No layout may stretch edge-to-edge beyond 1980px on ultra-wide
displays.

- Implemented via the `--page-max: 1980px` token. The app shell (`.feed-header`
  and `.feed-layout`, or each marketing page's outer container) sets
  `max-width: var(--page-max); margin-inline: auto;`.
- Below 1980px the layout is fluid (100% width); at/above 1980px it locks and the
  surrounding canvas/gradient fills the remaining space.

**Why:** unbounded line lengths and control spacing on 4K/ultra-wide monitors
break rhythm and readability. 1980px is the hard ceiling for the platform.

**How to verify:** at a viewport ≥ 2400px wide, the header and content block are
1980px wide and centered, with even gutters on both sides.
