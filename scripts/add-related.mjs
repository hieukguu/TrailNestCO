// Injects a `related` field into each article. Pairs are chosen by genuine
// topical overlap — a reader finishing A plausibly wants B next — not by
// category alone. Every pair is reciprocal, so links run both ways.
import { readFile, writeFile } from "node:fs/promises";

const RELATED = {
  // ── Camping & Outdoor — reviews ─────────────────────────────────
  "best-camping-tents-review": ["what-size-tent-do-i-need", "how-to-set-up-a-tent", "how-to-waterproof-gear"],
  "best-headlamps-camping": ["headlamp-lumens-guide", "car-camping-checklist", "best-camping-tents-review"],
  "best-hiking-boots": ["how-to-waterproof-gear", "how-to-pack-a-backpack", "best-water-filters-camping"],
  "best-budget-backpacking-stoves": ["best-water-filters-camping", "car-camping-checklist", "best-camping-tents-review"],
  "best-water-filters-camping": ["best-budget-backpacking-stoves", "best-alternatives-to-nalgene-bottles", "best-hiking-boots"],
  "yeti-vs-rtic-coolers": ["car-camping-checklist", "best-budget-backpacking-stoves", "best-camping-tents-review"],
  "outdoormaster-ski-goggles-pro-review": ["outdoormaster-otg-snow-goggles-review", "outdoormaster-rhino-mips-helmet-review", "best-hiking-boots"],
  "outdoormaster-otg-snow-goggles-review": ["outdoormaster-ski-goggles-pro-review", "outdoormaster-rhino-mips-helmet-review", "best-headlamps-camping"],
  "outdoormaster-rhino-mips-helmet-review": ["outdoormaster-ski-goggles-pro-review", "outdoormaster-otg-snow-goggles-review", "best-hiking-boots"],

  // ── Camping & Outdoor — guides ──────────────────────────────────
  "how-to-set-up-a-tent": ["best-camping-tents-review", "what-size-tent-do-i-need", "how-to-waterproof-gear"],
  "how-to-waterproof-gear": ["best-camping-tents-review", "how-to-set-up-a-tent", "best-hiking-boots"],
  "car-camping-checklist": ["best-camping-tents-review", "yeti-vs-rtic-coolers", "best-headlamps-camping"],
  "how-to-choose-a-sleeping-bag": ["sleeping-pad-r-value", "best-camping-tents-review", "car-camping-checklist"],
  "sleeping-pad-r-value": ["how-to-choose-a-sleeping-bag", "best-camping-tents-review", "car-camping-checklist"],
  "what-size-tent-do-i-need": ["best-camping-tents-review", "how-to-set-up-a-tent", "car-camping-checklist"],
  "headlamp-lumens-guide": ["best-headlamps-camping", "car-camping-checklist", "best-camping-tents-review"],
  "how-to-pack-a-backpack": ["best-travel-backpack-carry-on", "carry-on-vs-personal-item", "best-hiking-boots"],

  // ── Home Essentials ─────────────────────────────────────────────
  "best-air-fryers-home": ["air-fryer-size-guide", "best-coffee-makers-home", "how-to-organize-kitchen-cabinets"],
  "best-robot-vacuums": ["robot-vacuum-maintenance", "how-to-organize-kitchen-cabinets", "best-air-fryers-home"],
  "best-coffee-makers-home": ["best-air-fryers-home", "how-to-organize-kitchen-cabinets", "air-fryer-size-guide"],
  "air-fryer-size-guide": ["best-air-fryers-home", "best-coffee-makers-home", "how-to-organize-kitchen-cabinets"],
  "robot-vacuum-maintenance": ["best-robot-vacuums", "how-to-organize-kitchen-cabinets", "best-air-fryers-home"],
  "how-to-organize-kitchen-cabinets": ["best-air-fryers-home", "best-coffee-makers-home", "best-robot-vacuums"],

  // ── Travel & EDC ────────────────────────────────────────────────
  "best-travel-backpack-carry-on": ["carry-on-vs-personal-item", "how-to-pack-a-backpack", "best-noise-cancelling-headphones-travel"],
  "best-alternatives-to-nalgene-bottles": ["best-water-filters-camping", "best-travel-backpack-carry-on", "carry-on-vs-personal-item"],
  "best-portable-power-stations": ["best-travel-backpack-carry-on", "car-camping-checklist", "best-headlamps-camping"],
  "best-noise-cancelling-headphones-travel": ["best-travel-backpack-carry-on", "carry-on-vs-personal-item", "best-portable-power-stations"],
  "carry-on-vs-personal-item": ["best-travel-backpack-carry-on", "how-to-pack-a-backpack", "best-noise-cancelling-headphones-travel"],
};

const file = "lib/articles.ts";
let src = await readFile(file, "utf8");

// Sanity: every target must exist as a real slug, or we would ship dead links.
const allSlugs = new Set([...src.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]));
const dangling = [];
for (const [from, tos] of Object.entries(RELATED)) {
  if (!allSlugs.has(from)) dangling.push(`source missing: ${from}`);
  for (const to of tos) if (!allSlugs.has(to)) dangling.push(`${from} → ${to}`);
}
if (dangling.length) {
  console.error("Dangling slugs, aborting:\n  " + dangling.join("\n  "));
  process.exit(1);
}

let injected = 0;
let skipped = 0;
for (const [slug, tos] of Object.entries(RELATED)) {
  const anchor = new RegExp(`(^\\s*slug:\\s*"${slug}",\\s*\\n)`, "m");
  const m = src.match(anchor);
  if (!m) continue;

  // Do not double-inject if the field is already present on this object.
  const objStart = src.indexOf(m[0]);
  const nextSlug = src.indexOf('slug: "', objStart + m[0].length);
  const objBody = src.slice(objStart, nextSlug === -1 ? undefined : nextSlug);
  if (/^\s*related:\s*\[/m.test(objBody)) {
    skipped++;
    continue;
  }

  const indent = m[1].match(/^\s*/)[0].replace(/\n/g, "");
  const line = `${indent}related: [${tos.map((t) => `"${t}"`).join(", ")}],\n`;
  src = src.replace(anchor, `$1${line}`);
  injected++;
}

await writeFile(file, src);

// Report reciprocity so one-way links are visible rather than silent.
const oneWay = [];
for (const [from, tos] of Object.entries(RELATED))
  for (const to of tos) if (!RELATED[to]?.includes(from)) oneWay.push(`${from} → ${to}`);

console.log(`injected ${injected}, already present ${skipped}`);
console.log(`links total: ${Object.values(RELATED).flat().length}`);
console.log(`one-way (informational): ${oneWay.length}`);
oneWay.slice(0, 10).forEach((l) => console.log(`  ${l}`));
