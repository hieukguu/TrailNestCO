# Content Claims Requiring Evidence
**Date:** 2026-08-12  
**Purpose:** Track specific quantified claims in published content that require either documented evidence or rewriting to hedged/general language.

---

## Status Key
- ✅ FIXED — claim has been rewritten to research-based language
- ⚠️ REVIEW — claim is present; may require softening or sourcing
- ❌ REMOVE — claim is unsupportable and must be removed or rewritten

---

## Homepage / Hero

| Claim | File | Status |
|---|---|---|
| "Fresh From the Test Bench" | app/page.tsx | ✅ Changed to "Latest Reviews & Top Picks" |
| "Every brand passed our field tests" | app/page.tsx | ✅ Rewritten |
| "100% independent testing" | app/page.tsx | ✅ Changed to "Independent editorial research" |
| "team of editors and testers who…use the products" | app/page.tsx | ✅ Rewritten |
| "Honest Reviews, Real Trips & Tested Gear" | components/hero.tsx | ✅ Changed to "Independent Research. Honest Advice." |

---

## KETL Mtn. Review (ketlmtn-review.html)

| Claim | Status |
|---|---|
| "We spent several months testing KETL Mtn.'s lineup" | ✅ Rewritten: "we researched and evaluated" |
| "We wore them kayaking, mountain biking, lounging…" | ✅ Rewritten to design/specification language |
| "We tested KETL Mtn." (meta description) | ✅ Removed |
| "months of testing" (pros/cons) | ✅ Changed to "in-depth research" |
| Editor score: 4.8/5 for KETL Mtn. brand | ⚠️ Score exists; methodology not publicly documented |

---

## Air Fryers Review (best-air-fryers-home)

| Claim | Status |
|---|---|
| "We ran over 40 cooking batches across six models" (excerpt) | ⚠️ Still in excerpt field — unsupported hands-on claim |
| "Testing revealed the most evenly cooked results" (pick body) | ⚠️ Implies hands-on testing |
| "Crispy at the top and soft in the middle" (pick body) | ⚠️ Specific result; reads as first-person test observation |

**Recommended action:** Rewrite excerpt from "We ran 40 batches" → "Based on specifications, wattage, basket design, and consumer reporting across six models…"

---

## OutdoorMaster RHINO MIPS Helmet (outdoormaster-rhino-mips-helmet-review)

| Claim | Status |
|---|---|
| "We rode the RHINO MIPS for eight weeks across technical trail riding, enduro-style descents, and a few incidents that tested the MIPS system's real-world performance." | ❌ Specific first-person riding claim — must be rewritten |

**Recommended action:** Replace with: "The RHINO MIPS is certified to ASTM F1952 DH and EN 1077 standards, with MIPS Brain Protection System included at a price point where MIPS is uncommon."

---

## YETI vs RTIC Coolers (yeti-vs-rtic-coolers)

| Claim | Status |
|---|---|
| "ice retention (20 lb ice loads at 85°F ambient, measured at 24, 48, and 72 hours)" (intro) | ⚠️ Specific measurement framing — reads as first-person lab test |

**Recommended action:** Attribute to published ice retention data or reframe as "based on published ice retention specifications and verified third-party lab data."

---

## OutdoorMaster Ski Goggles PRO (outdoormaster-ski-goggles-pro-review)

| Claim | Status |
|---|---|
| "The OutdoorMaster Ski Goggles PRO sits at #1 on Amazon's Snow Sports Goggles chart with 10,000+ reviews" | ⚠️ Dynamic data; may change — should be noted as "as of [date]" |

---

## Remaining Articles — Spot Check Status

The following articles' body/intro fields were audited via keyword search for "we tested/wore/spent/carried/hiked/camped":

- **Result:** No matches found in `lib/articles.ts` after previous remediation session.
- **Conclusion:** Major testing-claim language has been removed.
- **Caveat:** Individual pick body fields with product-specific performance language (cooking results, measurements) remain and should be reviewed on a rolling basis.

---

## Action Priority

| Priority | Item |
|---|---|
| 1 | Rewrite air fryers excerpt ("40 cooking batches") |
| 2 | Rewrite RHINO MIPS "rode for eight weeks" intro |
| 3 | Soften YETI/RTIC ice measurement framing |
| 4 | Add "(as of [date])" to Amazon ranking claims |
| 5 | Document editor score methodology for LP page scores |
