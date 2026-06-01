---
name: RainCloud Ukraine


colors:
  surface: '#faf9f7'
  surface-dim: '#dadad8'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeec'
  surface-container-high: '#e9e8e6'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#424845'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#727875'
  outline-variant: '#c2c8c4'
  surface-tint: '#4e635a'
  primary: '#4e635a'
  on-primary: '#ffffff'
  primary-container: '#F16F26'
  on-primary-container: '#B54100'
  inverse-primary: '#CCBDB5'
  secondary: '#A37861'
  on-secondary: '#ffffff'
  secondary-container: '#e4e2e1'
  on-secondary-container: '#656464'
  tertiary: '#755755'
  on-tertiary: '#ffffff'
  tertiary-container: '#b99693'
  on-tertiary-container: '#482f2d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e8dd'
  primary-fixed-dim: '#b5ccc1'
  on-primary-fixed: '#0b1f18'
  on-primary-fixed-variant: '#374b43'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#e4bdbb'
  on-tertiary-fixed: '#2b1614'
  on-tertiary-fixed-variant: '#5b403e'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e3e2e0'


typography:
  display:
    fontFamily: Montserrat SemiBold
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat SemiBold
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Montserrat SemiBold
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Montserrat SemiBold
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Open Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Open Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Open Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Open Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em


rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px


spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 20px
  container-max: 800px
---

## Brand & Style

The design system is built on the philosophy of "quiet intentionality." It targets individuals seeking a disciplined yet peaceful approach to social interactions. 

The aesthetic is a blend of **High-End Minimalism** and **Modern Editorial**. It prioritizes clarity, breathability, and tactile focus through generous whitespace and a restricted palette. Drawing inspiration from the utility of tools like Linear and the spatial elegance of Things 3, this design system avoids all forms of visual noise—no gradients, no gamified animations, and no aggressive "celebration" UI. The emotional response should be one of calm, focus, and rhythmic progress.

## Colors

The color strategy is reductive and functional. 

- **Primary (#F16F26):** A vivid Orange used exclusively for progress indicators and primary action states. It signifies growth without urgency.
- **Secondary (#171717):** A Deep Charcoal used for high-contrast typography and iconography. 
- **Neutral (#5F5F5):** An Off-White "paper" base that reduces eye strain and provides a warm, organic foundation.
- **Border (#EFF1F3):** A subtle, low-contrast grey used to define structure without adding visual weight.

Avoid using secondary colors for feedback; "Success" is represented by the orange accent, while "Error" states should use a desaturated terracotta rather than bright red to maintain the calm atmosphere.

## Typography

This design system utilizes a traditional serif for structure and a contemporary sans-serif for utility.

- **Headlines (Montserrat):** Used for page titles and habit names. The variable weight of Montserrat provides an editorial, scholarly feel that encourages reflection.
- **Body & Interface (Montserrat):** Chosen for its institutional clarity. It remains highly legible at small sizes in data-dense habit grids.
- **Label Caps:** Used for metadata, dates, and category headers to provide a clear secondary hierarchy without increasing font size.

## Layout & Spacing

The layout follows a **Fixed-Width Centered** model for desktop to maintain focus, echoing a physical journal or planner. 

- **Rhythm:** A 4px baseline grid ensures vertical consistency.
- **Margins:** Generous "safe zones" (40px+) are preferred around content blocks to prevent the UI from feeling cramped.
- **Grid:** A simple 8-column grid for desktop, collapsing to a single column on mobile. 
- **Breakpoints:** 
  - Mobile: < 600px (Margins: 20px)
  - Tablet: 600px - 1024px (Margins: 40px)
  - Desktop: > 1280px (Max content width: 960px)

## Elevation & Depth

This design system rejects physical depth in favor of **Tonal Layering**.

- **Surfaces:** Depth is created by placing #FFFFFF (Pure White) containers on top of the #F9F8F6 background.
- **Borders:** Instead of shadows, use 1px solid strokes in `#E5E3E0` to define boundaries. 
- **Interactions:** On hover or active states, use a subtle shift in background color (e.g., from #FFFFFF to #F2F1EE) rather than raising the element with a shadow.
- **Focus:** If a modal or pop-over is required, use a very light, diffused tint of the primary color in the backdrop blur (2px blur) to maintain the "Glassmorphism" feel without the gloss.

## Shapes

The shape language is **Soft** but disciplined. 

- **Components:** Standard buttons and input fields use a `0.25rem` (4px) radius. This provides a hint of friendliness while remaining professional and structured.
- **Cards/Containers:** Large habit containers use `0.5rem` (8px). 
- **Selection Indicators:** Circular elements are reserved strictly for "Check" states and radio buttons to signify completion.

## Components

- **Buttons:** Primary buttons use a solid #F16F26 background with white text. Secondary buttons are ghost-style with a 1px border. No heavy rounded corners—stick to the 4px radius.
- **Habit Cells:** Use a simple row-based list. Completion is indicated by a fill-transition of the Vivid Orange (#F16F26). Avoid checkboxes; use a subtle strike-through or a change in typography weight for completed tasks.
- **Inputs:** Underlined or softly bordered fields. The focus state is a 1px solid #EFF1F3 border. No glow.
- **Progress Bars:** Thin (4px height) lines. The "track" should be #5F5F5 and the "progress" #F16F26. 
- **Calendar Heatmaps:** Instead of varying intensities of green, use a single Vivid Orange dot or square to represent "Done" and an empty outline for "Not Done". This maintains the quiet aesthetic.
- **Chips/Tags:** Small, rectangular with 2px radius. Use #F2F1EE background with #2D2D2D text.