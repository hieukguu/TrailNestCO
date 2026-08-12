# TrailNestCo — 90-Day Content Plan
**Start date:** 2026-08-12  
**End date:** 2026-11-11  
**Focus:** Build topical authority in Camping & Outdoor through complete topic clusters.

---

## Strategic Principles

- **70% informational** — how-to guides, explainers, gear education  
- **20% comparison/buying** — "best X" reviews, head-to-head comparisons  
- **10% affiliate brand/product** — sponsored-relationship spotlights  
- Do NOT expand Home Essentials in the first 90 days  
- No placeholder or thin articles — every piece must be complete before publishing  
- All articles: research-based, no invented testing experience, no fake authors

---

## Topic Cluster Map (Camping & Outdoor Priority)

### Tent Cluster
**Pillar (exists):** `/reviews/best-camping-tents-review/`  
**Supporting guides needed:**
- `what-size-tent-do-i-need` ✅ exists
- `how-to-set-up-a-tent` ✅ exists
- `how-to-waterproof-gear` ✅ exists
- `tent-waterproof-ratings-explained` ❌ to build
- `tent-materials-explained` ❌ to build
- `how-to-store-maintain-a-tent` ❌ to build

### Sleeping System Cluster
**Pillar (missing):** `/reviews/best-sleeping-bags/` — to build  
**Supporting guides:**
- `how-to-choose-a-sleeping-bag` ✅ exists
- `sleeping-pad-r-value` ✅ exists
- `down-vs-synthetic-sleeping-bags` ❌ to build
- `sleeping-bag-temperature-ratings` ❌ to build
- `inflatable-vs-foam-sleeping-pads` ❌ to build

### Camping Lighting Cluster
**Pillar (exists):** `/reviews/best-headlamps-camping/`  
**Supporting guides:**
- `headlamp-lumens-guide` ✅ exists
- `rechargeable-vs-battery-headlamps` ❌ to build
- `red-light-vs-white-light-headlamp` ❌ to build

### Backpack Cluster
**Pillar (exists):** `/reviews/best-travel-backpack-carry-on/`  
**Supporting guides:**
- `how-to-pack-a-backpack` ✅ exists
- `carry-on-vs-personal-item` ✅ exists
- `backpack-capacity-guide` ❌ to build
- `daypack-vs-hiking-backpack` ❌ to build

---

## Month 1 — August 12 – September 11

| Week | Article | Type | Intent | Target keyword | Cluster | Internal links to |
|---|---|---|---|---|---|---|
| 1 | Tent Waterproof Ratings Explained | Guide | Informational | tent waterproof rating | Tent | best-camping-tents, how-to-waterproof-gear |
| 1 | Best Sleeping Bags 2026 | Review | Commercial | best sleeping bags | Sleeping system | how-to-choose-sleeping-bag |
| 2 | Down vs Synthetic Sleeping Bags | Guide | Informational | down vs synthetic sleeping bag | Sleeping system | best-sleeping-bags, how-to-choose-sleeping-bag |
| 2 | Sleeping Bag Temperature Ratings Explained | Guide | Informational | sleeping bag temperature ratings | Sleeping system | sleeping-pad-r-value |
| 3 | Rechargeable vs Battery Headlamps | Guide | Informational | rechargeable headlamp vs battery | Lighting | best-headlamps-camping |
| 3 | Tent Materials Explained: Nylon, Polyester, Silnylon | Guide | Informational | tent materials comparison | Tent | best-camping-tents |
| 4 | How to Store and Maintain a Tent | Guide | Informational | how to store a tent | Tent | best-camping-tents, how-to-set-up-a-tent |
| 4 | Update: Best Camping Tents Review | Refresh | — | — | Tent | — |

**Category hub to update:** `/categories/camping-outdoor/` after each new article goes live.

---

## Month 2 — September 12 – October 11

| Week | Article | Type | Intent | Target keyword | Cluster |
|---|---|---|---|---|---|
| 5 | Best Sleeping Pads for Backpacking 2026 | Review | Commercial | best backpacking sleeping pads | Sleeping system |
| 5 | Inflatable vs Foam Sleeping Pads | Guide | Informational | inflatable vs foam sleeping pad | Sleeping system |
| 6 | Backpack Capacity Guide: 20L to 70L | Guide | Informational | backpack capacity guide | Backpack |
| 6 | Daypack vs Hiking Backpack: Which Do You Need? | Guide | Informational | daypack vs hiking backpack | Backpack |
| 7 | Best Trekking Poles 2026 | Review | Commercial | best trekking poles | Hiking standalone |
| 7 | Red Light vs White Light Headlamp: When to Use Each | Guide | Informational | headlamp red light vs white | Lighting |
| 8 | Best Camping Lanterns 2026 | Review | Commercial | best camping lanterns | Lighting |
| 8 | Update: Best Headlamps Review | Refresh | — | — | Lighting |

---

## Month 3 — October 12 – November 11

| Week | Article | Type | Intent | Cluster | Notes |
|---|---|---|---|---|---|
| 9 | Ski Goggle Lens Color Guide | Guide | Informational | Outdoor/winter | Feeds OutdoorMaster Ski Goggles |
| 9 | Best Ski Helmets Under $200 | Review | Commercial | Outdoor/winter | Feeds OutdoorMaster RHINO MIPS |
| 10 | How to Measure Torso Length for a Backpack | Guide | Informational | Backpack | Links to best-travel-backpack |
| 10 | Best Budget Camping Gear Under $50 | Guide | Informational | Camping roundup | |
| 11 | KETL Mtn. Review — Refresh for 2026/2027 Season | LP Update | — | Affiliate | Check current pricing, new products |
| 11 | OutdoorMaster Review — Refresh | LP Update | — | Affiliate | Verify Amazon #1 ranking claim date |
| 12 | Best Camping Tents Review — Year-end Update | Refresh | — | Tent | Update for 2026/2027 tent season |

---

## Deployment Checklist — Each New Article

1. [ ] Add article data to `lib/articles.ts` (type, slug, category, date, datePublished, howWeEvaluated, intro, picks, sections, faq)
2. [ ] Set `datePublished` (ISO 8601) and `dateModified` 
3. [ ] Write `howWeEvaluated` field — honest description of methodology
4. [ ] Verify article renders at `/reviews/[slug]/` or `/guides/[slug]/`
5. [ ] Add URL to `public/sitemap.xml`
6. [ ] Update relevant category hub (`/categories/[category]/`)
7. [ ] Add internal links from 2–3 related existing articles
8. [ ] All affiliate links: `rel="noopener nofollow sponsored"`
9. [ ] Run `npm run build` — confirm 0 errors
10. [ ] Copy LP files to `out/`
11. [ ] ZIP and upload to Hostinger

---

## Content Rules (Must Follow on Every Article)

1. No hands-on testing claims unless TrailNestCo has documented evidence.
2. No invented authors, reviewer names, credentials, or personal anecdotes.
3. Use `howWeEvaluated` to be transparent about methodology.
4. Never use affiliate URLs as canonical URLs.
5. New affiliate links: `rel="noopener nofollow sponsored"` + inline disclosure.
6. No new rating scores (e.g., "9.4/10 Editor Score") without a published scoring rubric.
7. Images: brand press kit or licensed product images only. No AI-generated product images.
8. Every article must have a unique title (50–60 chars) and description (140–160 chars).
