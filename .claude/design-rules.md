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

- Implemented via the `--page-max: 1980px` token. The body shell (`.feed-layout`,
  or each marketing page's outer container) sets
  `max-width: var(--page-max); margin-inline: auto;`.
- **The top header is the exception to centering:** its **white background must be
  full-bleed (edge-to-edge)**, while its *content* stays within `--page-max`. This
  is done with gutter padding, not `max-width`, on `.feed-header`:
  `padding-inline: calc(max(0px, (100% - var(--page-max)) / 2) + <base>)`.
- Below 1980px the layout is fluid (100% width); at/above 1980px it locks and the
  surrounding canvas/gradient fills the remaining space.

**Why:** unbounded line lengths and control spacing on 4K/ultra-wide monitors
break rhythm and readability. 1980px is the hard ceiling for the platform. The
header bar, however, should always span the full screen so the chrome never looks
"boxed".

**How to verify:** at a viewport ≥ 2400px wide, the body content is 1980px wide and
centered with even gutters, while the header's white bar still reaches both screen
edges (its logo/avatar align to the 1980px content edges).

---

## Rule 3 — Popovers & overlays always render on top  ⚠️

**Every popover, dropdown, menu, tooltip, modal, drawer, or other transient
overlay must paint ABOVE all surrounding page content — never behind or clipped
by a neighbouring block.**

- Use the z-index scale (`--z-dropdown` < `--z-overlay` < `--z-modal` <
  `--z-popover` < `--z-toast` < `--z-tooltip`); never invent ad-hoc values.
- **Beware stacking-context traps.** A `backdrop-filter`, `filter`, `transform`,
  `opacity < 1`, or non-`visible` `overflow` on an ancestor creates a stacking
  context that *traps* a child's z-index. A glass card (`backdrop-filter: blur`)
  containing a popover will hide that popover behind later siblings unless the
  card itself is elevated. Fix by raising the trapping ancestor's z-index while
  the overlay is open (e.g. `.search-hero:has(.filters-wrap.is-open)`), or render
  the overlay outside the trap.
- **Never use `overflow: hidden` on a scroll/layout ancestor of an overlay** — it
  clips the overlay. Use `overflow: clip` only when strictly needed for the X axis
  (it also avoids breaking `position: sticky`).

**How to verify:** open every popover/tooltip and confirm it sits fully above all
adjacent cards, stats, lists, the sticky sidebar, and (for tooltips) the top bar —
nothing bleeds through or covers it.

---

## Rule 4 — Sticky global chrome

**The top header and the left side-navigation are sticky.** The header pins to the
top of the viewport; the sidebar takes the full available height
(`calc(100vh - header)`) and stays in view while the page content scrolls beneath.

- `.feed-header { position: sticky; top: 0 }`,
  `.feed-sidebar { position: sticky; top: <header-height>; height: calc(100vh - <header-height>) }`.
- Do **not** put `overflow: hidden`/`auto` on an ancestor of the sticky elements —
  it silently disables sticking (use `overflow-x: clip` if you must constrain X).

**How to verify:** scroll a long page — the header and the sidebar stay fixed in
place while only the main content scrolls; "Close sidebar" stays pinned to the
bottom of the sidebar, not the bottom of the document.
