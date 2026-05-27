# Design System

Single-page design system demo built with OKLCH-based color tokens, M3 color roles, and separate light/dark theme blocks.

---

## 1. Foundations

### Color System

- **7 source base colors** defined per theme in `:root` / `[data-theme="dark"]`: primary, secondary, tertiary, error, success, warning, surface
- **Tertiary auto-derives** from primary via 120° OKLCH hue rotation, 0.85× chroma
- **Every derivative** uses `oklch(from var(--color-*-base) ...)` — single source of truth, no hardcoded variants
- **M3 color roles** (`--color-primary`, `--color-primary-container`, `--color-on-primary`, `--color-on-primary-container`, etc.) auto-computed for primary, secondary, tertiary, error, surface, outline (2 roles), and semantic custom (success, warning)
- **Direct derivatives** for each base: `-light` (brightest), `-subtle` (mid), `-base`, `-dark` (darkest)
- **Surface roles** carry a subtle primary hue tint via `oklch(from var(--color-primary-base) 0.995 0.008 h)` — not achromatic grey
- **Inverse surface** roles (`--color-inverse-surface`, `--color-on-inverse-surface`) for tooltip/overlay backgrounds

### Typography

- **DM Serif Display** (headings), **DM Sans** (body), **DM Mono** (code)
- Scale: 32px (H1), 24px (H2), 20px (H3), 18px (H4), 16px (body), 12px (small), 11px (label caps)

### Shadow & Border

- **Shadows:** none, small, medium, large, xlarge, primary (brand glow)
- **Borders:** default, focus, error, dashed — with radius scale xs (2px) through round (9999px)

### Spacing

- **Base unit:** 4px. Scale: `--space-1` (4px) through `--space-24` (96px). Grid: 12-column, 16px gap.

---

## 2. Architecture

### File Structure

| File | Role |
|---|---|---|
| `src/styles/core.css` | All design tokens (`:root` + `[data-theme="dark"]`), M3 roles, OKLCH derivations, layout & background utilities |
| `src/styles/components.css` | Component CSS — buttons, inputs, navigation, selection controls, data display, feedback/overlays |
| `src/styles/view.css` | Shared view layout — navbar, header, grid, card, skeleton for patterns & pages pages |
| `src/icons/icons.css` | SVG-based icon classes (Solar Icons) |
| `src/index.html` | Single-page demo; inline `<style>` for theme panel & color editor, `<script>` for interactivity |
| `src/patterns.html` | Standalone patterns page — reusable layout skeletons (auth, search, onboarding, data table, empty state, settings, cart) |
| `src/pages.html` | Standalone pages page — full page skeletons (dashboard, PDP, pricing, profile, 404, analytics) |
| `src/display.html` | Variation viewer — reads `?cat=patterns&type=empty-states`, loads each variation file in an `<iframe>` stacked in a column, auto-sizes via `postMessage` |
| `src/patterns/{type}/*.html` | Standalone variation HTML documents with design system CSS, includes `postMessage` for parent iframe resizing |
| `src/pages/{type}/*.html` | Same format as pattern variations |

### Theme Switching

- **Separate `:root` (light) and `[data-theme="dark"]` blocks** — no `light-dark()` — enabling future multi-theme extensibility
- Each block defines same base colors with theme-appropriate lightness targets for M3 roles
- JS toggle clears multiselect listbox selection, sets `data-theme` on `<html>`, all tokens recompute automatically

### Patterns Page (`patterns.html`)

- 7 pattern skeleton cards in a responsive 3-column grid
- Each card contains a pure-CSS skeleton preview inside a gradient-overlaid preview pane
- Skeletons use `--color-surface-container` for low-contrast shapes, no animation
- Covers: auth form, search & filter, onboarding carousel, data table, empty states, settings layout, cart summary

### Pages Page (`pages.html`)

- 6 page skeleton cards in the same responsive grid layout
- Full-page-level skeletons: user dashboard (metrics + chart + activity), PDP (image + info + stars + CTA), pricing (3-tier cards), profile (avatar + fields), 404 (large text + message + button), analytics (filters + charts + data table)

### Color Editor Panel

- Lists 7 base color swatches as circles, bordered by the color's `-dark` derivative
- Click opens a native `<input type="color">` picker
- On picker change, updates `--color-*-base` on `<html>` via inline `style.setProperty`
- All OKLCH-derived variables cascade automatically — no manual recalculation
- Hovering a swatch shows its name in the header

---

## 3. Components

### Navigation
- **Navbar:** Surface background with border, flexible brand/links layout
- **Tabs:** Primary-underline active indicator
- **Breadcrumbs:** Chevron-separated path with muted text

### Inputs & Controls
- **Buttons:** Primary, secondary, ghost — with small/default/large sizes, full-width, disabled states
- **Text Fields:** Default, filled, error, disabled states — small/default/large sizes
- **Select Dropdown:** Chevron-styled native select
- **Listbox:** Multi-select scrollable list with checked highlight
- **Checkbox / Radio / Switch:** Custom-styled with `appearance: none`

### Data Display
- **Cards:** Surface background, border, shadow, hover elevation
- **Badges:** Primary, secondary, success, error, warning, gray
- **Avatars:** Initial-letter display in circular containers
- **Accordion:** Collapsible sections with hover/active states

### Feedback & Overlays
- **Modal:** Centered dialog with overlay background, close button
- **Tooltip:** Inverse-surface background, positioned on hover
- **Toast:** Fixed-position notification with slide-in animation
- **Spinner / Progress Bar:** Track uses `surface-variant`, fill uses primary

---

## 4. Key Technical Decisions

- **OKLCH color space** for perceptual uniformity — derivatives use `oklch(from ... calc(l...) calc(c...) h)` relative color syntax
- **Browser support:** Chrome 111+, Firefox 113+, Safari 15.4+
- **`-light`/`-subtle` utility classes** use fixed `oklch(0.10 0.005 none)` text for contrast against always-light backgrounds
- **Color editor swatch borders** use each color's `-dark` derivative via inline `border-color`
- **Surface derivative chroma** uses fixed values (0.008–0.015) rather than multipliers to ensure visible hue
- **Surface dot pattern** on isolated containers auto-computes via `oklch(from var(--color-surface-base) 0.50 0.08 h)`

---

## 5. Getting Started

Open `src/index.html` in any modern browser. No build step required.

- **Color editor** at the bottom of the page to live-preview base color changes
- **Theme panel** to switch between light and dark modes
- **Patterns page** at `patterns.html` — layout structure blueprints
- **Pages page** at `pages.html` — full context-rich page mockups
- All tokens in `src/styles/core.css` — edit source base colors and everything cascades
