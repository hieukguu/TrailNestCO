// Gives every article its own hero image.
//
// Eight Unsplash photos were each shared by two or three articles, which also
// meant those articles shared an og:image — post three of them to social and
// you get the same picture three times. One pair was actively wrong: a bike
// helmet review and a robot vacuum guide used the same photo.
//
// Every replacement below was downloaded and viewed before its alt text was
// written. An earlier attempt at this skipped that step and produced alt text
// describing images that turned out to be a wall-mounted TV, a plate of
// noodles and two URLs that did not exist at all.
//
// Unsplash Licence: free for commercial use, no attribution required.
import { readFile, writeFile } from "node:fs/promises";

const U = (id) => `https://images.unsplash.com/${id}?w=1600&q=70&auto=format&fit=crop`;

/** slug -> { image, alt }. Alt text describes the photo, not the article topic. */
const REPLACEMENTS = {
  // was sharing with best-air-fryers-home
  "air-fryer-size-guide": {
    image: U("photo-1585032226651-759b368d7246"),
    alt: "Stir-fried noodles served on a wooden plate with chopsticks resting across it",
  },
  // was sharing with best-travel-backpack-carry-on
  "how-to-pack-a-backpack": {
    image: U("photo-1622260614153-03223fb72052"),
    alt: "Green hiking backpack standing on rocks at the edge of a lake",
  },
  "carry-on-vs-personal-item": {
    image: U("photo-1502301197179-65228ab57f78"),
    alt: "Open suitcase on a floor packed with folded clothes, a sun hat and a camera",
  },
  // was sharing with best-hiking-boots
  "what-size-tent-do-i-need": {
    image: U("photo-1445308394109-4ec2920981b1"),
    alt: "Yellow and grey dome tent pitched at a desert campsite below red rock cliffs",
  },
  // was sharing with best-budget-backpacking-stoves
  "how-to-set-up-a-tent": {
    image: U("photo-1508873696983-2dfd5898f08b"),
    alt: "Person sitting with a dog in the doorway of a pitched tent looking out over a lake",
  },
  // was sharing with best-water-filters-camping
  "how-to-waterproof-gear": {
    image: U("photo-1527489377706-5bf97e608852"),
    alt: "Fast-flowing turquoise river running through a forested mountain valley",
  },
  // was sharing with best-portable-power-stations and car-camping-checklist
  "yeti-vs-rtic-coolers": {
    image: U("photo-1544376798-89aa6b82c6cd"),
    alt: "Wooden rowing boats moored on a still alpine lake below mist-covered peaks",
  },
  "car-camping-checklist": {
    image: U("photo-1488646953014-85cb44e25828"),
    alt: "Flat lay of a paper map, camera, notebook and small backpack laid out for trip planning",
  },
  // was sharing with best-camping-tents-review and sleeping-pad-r-value
  "how-to-choose-a-sleeping-bag": {
    image: U("photo-1496545672447-f699b503d270"),
    alt: "Tent and an unrolled sleeping bag on a ridge with the sun low on the horizon",
  },
  "sleeping-pad-r-value": {
    image: U("photo-1504851149312-7a075b496cc7"),
    alt: "Campfire burning beside a lit tent in a forest under a sky full of stars",
  },
  // was sharing with outdoormaster-rhino-mips-helmet-review — unrelated subjects
  "robot-vacuum-maintenance": {
    image: U("photo-1567690187548-f07b1d7bf5a9"),
    alt: "Minimalist living room with a wall-mounted television and storage bench on hardwood flooring",
  },
};

const file = "lib/articles.ts";
let src = await readFile(file, "utf8");
const EOL = src.includes("\r\n") ? "\r\n" : "\n";

let done = 0;
const notes = [];

for (const [slug, { image, alt }] of Object.entries(REPLACEMENTS)) {
  const start = src.indexOf(`slug: "${slug}"`);
  if (start === -1) {
    notes.push(`article missing: ${slug}`);
    continue;
  }
  const end = src.indexOf('slug: "', start + 20);
  const body = src.slice(start, end === -1 ? undefined : end);

  // Top-level hero fields sit at four-space indentation; pick images are deeper.
  const imgRe = /^ {4}image:[\s\S]{0,12}?"[^"]+",/m;
  const altRe = /^ {4}alt: "[^"]+",/m;
  if (!imgRe.test(body) || !altRe.test(body)) {
    notes.push(`hero fields not matched: ${slug}`);
    continue;
  }

  const updated = body
    .replace(imgRe, `    image:${EOL}      ${JSON.stringify(image)},`)
    .replace(altRe, `    alt: ${JSON.stringify(alt)},`);

  src = src.slice(0, start) + updated + src.slice(end === -1 ? src.length : end);
  done++;
}

await writeFile(file, src);
console.log(`heroes replaced: ${done}`);
notes.forEach((n) => console.log(`  note: ${n}`));
