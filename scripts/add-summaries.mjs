// Fills the scannable summary fields on existing articles.
//
// Written to describe the products and the buying decision, never TrailNestCo's
// process — that keeps each article internally consistent whether or not it
// claims hands-on testing elsewhere, and adds no new process claims.
import { readFile, writeFile } from "node:fs/promises";

/** @type {Record<string, {keyTakeaways?:string[], quickVerdict?:string, whoFor?:string[], whoShouldSkip?:string[], verdict?:string}>} */
const DATA = {
  "best-camping-tents-review": {
    keyTakeaways: [
      "The REI Co-op Half Dome SL 2+ is the best all-round choice: two doors, two vestibules and enough headroom to sit up, at a weight that still works for short approaches.",
      "For anything you carry far, the MSR Hubba Hubba NX saves meaningful weight — and you pay for every ounce of that saving.",
      "The Coleman Sundome 4-Person is the budget option that makes sense for car camping only. Weight and pack size rule it out for backpacking.",
      "Weight, liveable space and price form a triangle. Any tent optimises two of the three; decide which one you are willing to give up before you shop.",
      "A tent's floor rating counts people lying shoulder to shoulder with no gear. If you want your pack inside, size up one person.",
    ],
    quickVerdict:
      "Most people camping from a car or walking a short distance to a pitch should buy the REI Co-op Half Dome SL 2+. It is the only tent here that does not force a hard trade-off. Choose the MSR Hubba Hubba NX instead if you carry the tent for hours, and the Coleman Sundome if the budget is firm and the tent never leaves arm's reach of the boot.",
    whoFor: [
      "Car campers and weekend backpackers choosing a first serious 3-season tent",
      "Anyone replacing a cheap dome tent that leaks or sags in wind",
      "Couples who want to sit up, change clothes and store packs under cover",
    ],
    whoShouldSkip: [
      "Winter and alpine campers — none of these are 4-season tents",
      "Solo ultralight hikers counting grams, who are better served by a trekking-pole shelter",
      "Families of five or more, who need a larger cabin-style tent than anything compared here",
    ],
    verdict:
      "Buy the Half Dome SL 2+ unless you have a specific reason not to. The two-door layout is the feature you notice every single night, and it is the one thing budget tents almost never include. The Hubba Hubba earns its price only if you genuinely walk in; the Sundome earns its place only if you genuinely do not.",
  },

  "best-headlamps-camping": {
    keyTakeaways: [
      "The Black Diamond Spot 400 is the safest default: bright enough for trail use, simple to operate, and it runs on batteries you can buy anywhere.",
      "The Petzl Actik Core is the pick if you would rather recharge than buy AAAs — and it still accepts AAAs when the cell runs flat.",
      "The Fenix HL32R-T covers the budget end without the usual compromise on beam quality.",
      "Peak lumens is the number brands advertise and the number that matters least. Runtime at a usable brightness is what you actually live with.",
      "A red mode is worth more than extra lumens if you share a tent — it preserves night vision and does not wake anyone.",
      "Cold weather cuts battery performance sharply, which is the strongest argument for a headlamp that takes both a cell and disposables.",
    ],
    quickVerdict:
      "Buy the Black Diamond Spot 400 if you want one headlamp that handles campsite chores and the occasional night hike without fuss. Choose the Petzl Actik Core if you camp often enough that disposable batteries become an annoyance, and the Fenix HL32R-T if you want most of that capability for less.",
    whoFor: [
      "Campers who need light for cooking, tent admin and the walk to the toilet block",
      "Hikers who occasionally finish a route after dark and want a dependable beam",
      "Anyone tired of cheap headlamps whose brightness collapses after twenty minutes",
    ],
    whoShouldSkip: [
      "Runners wanting a wide, low-profile beam built for pace — a running-specific lamp suits better",
      "Cavers and night-technical users, who need far more output and a proper battery system",
      "Anyone who only needs light inside a tent, where a small lantern is more comfortable than a beam",
    ],
    verdict:
      "The Spot 400 wins because it is unremarkable in the right way: it turns on, it is bright enough, and it keeps going. Dual fuel on the Actik Core is the single most useful feature in this category once you camp in the cold, and it is the reason to spend more.",
  },

  "best-hiking-boots": {
    keyTakeaways: [
      "The Salomon X Ultra 4 GTX suits most hikers: light enough to move quickly, stable enough for loose ground.",
      "The Merrell Moab 3 Mid WP remains the value benchmark, and its wider fit works for feet the Salomon pinches.",
      "The Hoka Anacapa Mid GTX is the choice for long days, where cushioning matters more than ground feel.",
      "Fit beats every specification on the list. A boot that rubs at mile two will still rub at mile twenty, whatever the materials.",
      "A waterproof membrane keeps water out and also keeps sweat in. In consistently hot, dry country a non-waterproof boot is the more comfortable choice.",
      "Mid-height helps on uneven ground and with a loaded pack. On maintained trails with a daypack it mostly adds weight.",
    ],
    quickVerdict:
      "The Salomon X Ultra 4 GTX is the boot to try first — it covers day hikes and light overnights without feeling like equipment. Try the Merrell Moab 3 if your feet are wide or the budget is tight, and the Hoka Anacapa if your days run long and your knees notice.",
    whoFor: [
      "Day hikers and weekend backpackers on mixed, sometimes wet terrain",
      "Walkers with a light to moderate pack who want ankle support on uneven ground",
      "Anyone replacing trainers that offer no grip on wet rock",
    ],
    whoShouldSkip: [
      "Mountaineers needing a crampon-compatible, stiff-soled boot",
      "Hikers in consistently hot, dry conditions, where a breathable non-waterproof shoe is more comfortable",
      "Trail runners, who need a shoe built for repeated impact rather than support",
    ],
    verdict:
      "Buy on fit first and reputation second. The X Ultra 4 GTX is the safest starting point because it suits the widest range of feet and terrain, but a Moab 3 that fits your foot properly will outperform a Salomon that does not. Order both if the retailer's returns policy allows it.",
  },
};

const file = "lib/articles.ts";
let src = await readFile(file, "utf8");

// The file is CRLF. Emit the same ending we find so we do not leave a mixed
// bag behind, and match either ending when anchoring.
const EOL = src.includes("\r\n") ? "\r\n" : "\n";

const fmt = (v, indent) => {
  const pad = " ".repeat(indent);
  if (Array.isArray(v))
    return `[${EOL}${v.map((x) => `${pad}  ${JSON.stringify(x)},`).join(EOL)}${EOL}${pad}]`;
  return JSON.stringify(v);
};

let done = 0;
const skipped = [];
for (const [slug, fields] of Object.entries(DATA)) {
  // Anchor on the `related:` line we injected earlier — it is unique per article
  // and sits at the top level of the object, so insertion is unambiguous.
  const anchor = new RegExp(
    `(^([ \\t]*)slug:\\s*"${slug}",\\r?\\n[ \\t]*related: \\[[^\\]]*\\],\\r?\\n)`,
    "m"
  );
  const m = src.match(anchor);
  if (!m) {
    skipped.push(`${slug} (anchor not found)`);
    continue;
  }
  const indent = m[2];

  // Guard against re-running.
  const start = src.indexOf(m[0]);
  const next = src.indexOf('slug: "', start + m[0].length);
  if (/^\s*keyTakeaways:/m.test(src.slice(start, next === -1 ? undefined : next))) {
    skipped.push(`${slug} (already filled)`);
    continue;
  }

  const block = Object.entries(fields)
    .map(([k, v]) => `${indent}${k}: ${fmt(v, indent.length)},${EOL}`)
    .join("");

  src = src.replace(anchor, `$1${block}`);
  done++;
}

await writeFile(file, src);
console.log(`filled ${done} article(s)`);
skipped.forEach((s) => console.log(`  skipped: ${s}`));
