# Isha Nashir Shaikh — Portfolio

A cinematic dark-themed developer portfolio. Near-black ground, gold accent,
high-contrast serif display type, and a deliberately small motion budget.

Built with React, TypeScript, Tailwind CSS v4, and Vite.

## Running locally

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
npm run lint
```

## Editing content

**All copy lives in one file: [`src/data/content.ts`](src/data/content.ts).** Nothing
in the components needs touching to update the site — the hero, stats, capabilities,
projects, experience, certifications, education, and contact details all read from
there, typed by exported interfaces.

A few notes on that file:

- `stats` values are derived from real counts and documented inline. Update them if
  the underlying content changes.
- `experience` is currently empty, so the Experience section hides itself. Add an
  entry and it appears, numbered automatically.
- `projects[].stack` is optional — it's omitted where the stack isn't confirmed
  rather than guessed.
- `portrait.src` accepts a path in `public/`, a hosted URL, or a data URI.

## Structure

```
src/
├── data/content.ts        all site copy
├── hooks/
│   ├── useReveal.ts       scroll entrance + reduced-motion guard
│   └── useParallax.ts     portrait drift, desktop only, clamped
└── components/            one per section, plus shared primitives
```

Design tokens (palette, fonts, easing) are defined once in
[`src/index.css`](src/index.css) using Tailwind v4's `@theme`, so no raw hex
appears in any component.

## Accessibility

- All body text meets WCAG AA contrast (4.8:1 minimum, measured against the
  composited background).
- Full `prefers-reduced-motion` support — animations are skipped, not just
  shortened, and content is visible on first paint.
- Gold `:focus-visible` ring on every interactive element; project rows respond
  to keyboard focus identically to hover.
- Skip link, semantic heading hierarchy, and screen-reader labels on link
  destinations.
