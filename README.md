# TrailNestCo — v2 Redesign

Modern rebuild of [trailnestco.com](https://trailnestco.com) — same content and brand messaging, completely new premium UI.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** with a custom design-token theme (`pine` / `ember` / `sand`)
- **Framer Motion** — scroll reveals, stagger, parallax hero, sticky-header transition
- **Lucide** icons, **Fraunces + Inter** via `next/font`

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Structure

```
app/            pages (home, reviews, guides, about, legal)
components/     header, footer, hero, motion primitives, prose layout
lib/data.ts     all site content in one place — edit here to update copy
```

## Notes

- All copy, categories, team, and policies mirror the original site's published content.
- Images are Unsplash placeholders sized via `next/image` — swap in your own product photography by editing URLs in `lib/data.ts` and page files.
- WCAG: skip link, focus states, reduced-motion support, semantic landmarks, alt text.
