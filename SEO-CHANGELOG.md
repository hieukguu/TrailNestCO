# SEO Changelog
**Project:** TrailNestCo  
**Format:** newest first

---

## 2026-08-12 — Full SEO & Content Integrity Remediation (Session 3)

### Content Integrity — Remaining Claims Fixed
- `components/article-page.tsx`: "All picks tested in the real world" → "Independent editorial research. Zero pay-to-play."
- `app/page.tsx`: "4.8 / 5" score on KETL removed → "Affiliate brand spotlight"
- `app/page.tsx`: "Editor Score 4.9★" (Sunjoy) → "Since 2001 / In business"
- `app/page.tsx`: "Editor Score 4.7★" (OutdoorMaster) → "MIPS cert. / Helmet safety"
- `app/page.tsx`: "Editor score 4.8★" (KETL) → "Lifetime / Repair policy"
- `app/about/page.tsx`: Description "people who actually use the products" → research-based language
- `app/page.tsx`: alt text "field test" → removed "field test" from alt text

### Phase 5 — KETL Migration COMPLETED
- Added `ketlArticle` data to `lib/articles.ts` (slug: `ketl-mtn-outdoor-apparel`)
- KETL page now renders via `/reviews/ketl-mtn-outdoor-apparel/` through dynamic route
- `.htaccess`: Enabled 301 redirect `ketlmtn-review.html` → `/reviews/ketl-mtn-outdoor-apparel/`
- `app/page.tsx`: All `href="/ketlmtn-review.html"` → `href="/reviews/ketl-mtn-outdoor-apparel/"`
- Added `howWeEvaluated` field: explicit methodology disclosure (affiliate relationship, no hands-on testing claimed)
- Removed editor score 4.8/5 from KETL article (no scoring methodology documented)
- Sitemap: Added KETL canonical URL

### Navigation — Category Links Fixed
- `components/header.tsx`: All `/reviews#camping-outdoor` → `/categories/camping-outdoor/`
- `components/header.tsx`: All `/reviews#home-essentials` → `/categories/home-essentials/`
- `components/header.tsx`: All `/reviews#travel-edc` → `/categories/travel-edc/`
- `components/footer.tsx`: Same category link updates
- `app/page.tsx`: Category cards → `/categories/[slug]/`

### Technical SEO — Metadata & Canonical
- `lib/data.ts`: `url` changed from `https://trailnestco.com` → `https://www.trailnestco.com` (www canonical)
- `app/reviews/[slug]/page.tsx`: Added canonical, OG, Twitter Card to generateMetadata
- `app/guides/[slug]/page.tsx`: Added canonical, OG, Twitter Card to generateMetadata
- `app/page.tsx`: Added canonical, OG type, Twitter Card
- `app/reviews/page.tsx`: Added canonical and OG
- `app/guides/page.tsx`: Added canonical and OG
- `app/about/page.tsx`: Added canonical and OG, fixed description
- `app/contact/page.tsx`: Added canonical
- `app/editorial-policy/page.tsx`: Added canonical
- `app/affiliate-disclosure/page.tsx`: Added canonical
- `app/privacy-policy/page.tsx`: Added canonical
- `app/terms/page.tsx`: Added canonical
- `app/layout.tsx`: Default title "Tested in the Real World" → "Independent Gear Reviews, Comparisons and Buying Guides"

### Structured Data — Article Schema Improvements
- `components/article-page.tsx`: Added `datePublished`, `dateModified`, `image`, `url`, `mainEntityOfPage`, `logo` to Article JSON-LD
- `components/article-page.tsx`: Added separate BreadcrumbList JSON-LD
- `lib/articles.ts`: Added `datePublished`, `dateModified` optional fields to Article type
- `lib/articles.ts`: Added `howWeEvaluated` optional field to Article type
- KETL article uses `howWeEvaluated` to disclose methodology

### Article Template — "How We Evaluated" Section
- `components/article-page.tsx`: Renders `howWeEvaluated` field as a dedicated callout box when present

---

## 2026-08-12 — SEO Remediation (Session 2)

### Content Integrity
- Air fryers excerpt: "We ran 40 cooking batches" → specifications-based language
- RHINO MIPS intro: "We rode for eight weeks" → ASTM certification language
- YETI/RTIC intro: "20 lb ice loads at 85°F" → "published ice retention specifications"
- Affiliate links `rel`: all HTML files + `app/page.tsx` updated to `rel="noopener nofollow sponsored"`

### New Pages
- `app/categories/camping-outdoor/page.tsx` — CollectionPage + BreadcrumbList schema
- `app/categories/home-essentials/page.tsx`
- `app/categories/travel-edc/page.tsx`

### Sitemap & robots.txt
- All pages updated with `lastmod` dates
- Category hubs added to sitemap
- robots.txt: Disallow rules added for internal paths

### Structured Data
- `app/layout.tsx`: Added WebSite JSON-LD schema
- Organization schema: address, legalName, no phone

---

## 2026-08-12 — SEO Remediation (Session 1)

### Business Identity
- Legal entity: `TrailNestCo Media LLC` → `Arrow Group LLC`
- Address: Wilmington, DE → Gardena, CA 90248
- Phone: Removed from all pages
- Footer copyright updated

### Fake Authors Removed
- All `author:` and `reviewer:` fields → `"TrailNestCo"`
- Article schema: `{ "@type": "Person" }` → `{ "@type": "Organization" }`
- UI byline: `By TrailNestCo Editorial`

### Homepage
- H1: Added `<h1 className="sr-only">` (was missing)
- KETL `<h1>` → `<h2>` (wrong heading level on homepage)
- `Sponsored` badge → `Affiliate`

### Articles — Testing Claims Removed
- All `intro` paragraphs: "we tested/spent/wore" → "we evaluated/compared/researched"
- Titles: "Tested" → "Reviewed & Compared"

---

## 2026-06 to 2026-07 — Initial Site Build

- Initial Next.js 15 project created
- Review and guide articles added to `lib/articles.ts`
- Dynamic routing `/reviews/[slug]/` and `/guides/[slug]/`
- KETL, Sunjoy, OutdoorMaster LP pages created
- Static export configured for Hostinger
- AvantLink affiliate program integrated
