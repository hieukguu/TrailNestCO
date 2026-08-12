# Owner Verification Required
**Date:** 2026-08-12 (updated)  
**Purpose:** Actions only the site owner can complete — cannot be done by editorial/code work.

---

## Priority 1 — Deployment & Search Console

- [ ] **Deploy the new build to Hostinger** — the `out/` folder is ready. See deployment instructions below.
- [ ] **Verify ownership of `www.trailnestco.com` in Google Search Console**
- [ ] **Submit sitemap:** `https://www.trailnestco.com/sitemap.xml`
- [ ] **Confirm no manual actions or crawl errors** after deploying KETL migration
- [ ] **Request re-indexing** for `ketlmtn-review.html` (now 301s) and `/reviews/ketl-mtn-outdoor-apparel/` (new canonical)

---

## Priority 2 — Analytics Verification

- [ ] **Confirm Google Analytics (GA4) is active** on the live site — no GA4 tracking script was found in `app/layout.tsx`. Verify it is injected by Hostinger or via another mechanism.
- [ ] **Confirm Microsoft Clarity (if used)** is active
- [ ] **Confirm Search Console verification tag** is present

> If GA4 is missing from the site, add the tracking snippet to `app/layout.tsx` using `<Script>` from `next/script` with `strategy="afterInteractive"`.

---

## Priority 3 — Affiliate Account Health

- [ ] **Verify AvantLink confirmation file:** `avantlink_confirmation.txt` in `public/` — confirm it matches current account
- [ ] **Confirm affiliate tracking parameters:**
  - KETL: `ref=hpakmutk`
  - OutdoorMaster: `ref=gvghbqwy`
  - Sunjoy: `ref=TRAILNESTCO`
- [ ] **Confirm FTC disclosure language satisfies AvantLink program terms**

---

## Priority 4 — Business Information

- [ ] Confirm "Arrow Group LLC" is registered in California
- [ ] Confirm address `17224 S. Figueroa Street, #E8917, Gardena, CA 90248` is valid for business mail
- [ ] Confirm `contact@trailnestco.com` is monitored and responsive

---

## Priority 5 — Editor Score Methodology

- The homepage previously displayed editor scores (4.8★, 4.9★, 4.7★) for affiliate brand spotlights. These have been **removed** in this remediation because no scoring rubric is publicly documented.
- If you want to restore editorial scores: document and publish the scoring rubric (criteria, weights, scale) in the editorial policy page, then re-add scores to brand spotlight cards.
- Do not add scores to structured data (`Review` schema, `ratingValue`) without this documentation.

---

## Priority 6 — KETL Review Canonical Update

The KETL HTML review (`ketlmtn-review.html`) still physically exists in `out/` (needed temporarily until .htaccess redirect is confirmed working on the live server). Once the redirect is confirmed:

- [ ] Verify `https://www.trailnestco.com/ketlmtn-review.html` redirects to `https://www.trailnestco.com/reviews/ketl-mtn-outdoor-apparel/`
- [ ] If confirmed, the HTML file can be removed from `out/` in future builds
- [ ] In Google Search Console, use "Inspect URL" on `/ketlmtn-review.html` to confirm redirect is detected

---

## Deployment Instructions

1. Ensure dev server is stopped
2. Run: `npm run build`
3. Copy LP files to `out/`:
   ```powershell
   $src = "C:\Users\hieuk\OneDrive\Desktop\TrailNestCo"
   @("ketlmtn-review.html","sunjoy-review.html","outdoormaster-review.html","outdoormaster-lp-v4.html") | ForEach-Object { Copy-Item "$src\$_" "$src\out\$_" -Force }
   ```
4. ZIP the `out/` folder
5. Upload to Hostinger via File Manager → public_html

### Post-Deployment Checklist (Google Search Console)

After deploying:
- [ ] Request indexing for homepage
- [ ] Request indexing for `/reviews/ketl-mtn-outdoor-apparel/`
- [ ] Submit sitemap
- [ ] Use "Inspect URL" to verify `ketlmtn-review.html` → 301 redirect is working
- [ ] Use "Inspect URL" to verify category hub pages return 200
- [ ] Check for crawl errors after 48 hours
