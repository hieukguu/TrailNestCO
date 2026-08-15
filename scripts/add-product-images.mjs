// Attaches product photography to review picks.
//
// Only brands TrailNestCo has an affiliate relationship with are covered, since
// that is the only basis on which their imagery may be used. Every URL below
// was confirmed to return 200, and each image was viewed before its alt text
// was written — a live URL is not evidence that the photo shows what you think.
import { readFile, writeFile } from "node:fs/promises";

const OM = "https://outdoormaster.com/cdn/shop/files";
const CREDIT = "Image: OutdoorMaster";

/** Product images, keyed by article slug then by the pick's `name`. */
const PICK_IMAGES = {
  "outdoormaster-ski-goggles-pro-review": {
    "OutdoorMaster Ski Goggles PRO — Rose Gold / Revo Lens": {
      image: `${OM}/PRO_GOGGLES.jpg`,
      imageAlt: "OutdoorMaster Ski Goggles PRO frameless snow goggle with a mirrored revo lens",
      imageCredit: CREDIT,
    },
    // No image for the Dark Smoke lens pick: the only PRO-series stock photo
    // available shows a blue mirrored lens, and illustrating a dark-tint
    // variant with a blue-tint photo would misrepresent the product.
  },
  "outdoormaster-otg-snow-goggles-review": {
    "OutdoorMaster OTG Snow Goggles — Blue Revo Lens": {
      image: `${OM}/outdoormaster-otg_snow_goggles-ski-goggles-black_frame_vlt_10_00001.webp`,
      // Frame depth is the point of an OTG goggle but is not visible in a
      // side-on studio shot, so the alt text does not claim it.
      imageAlt: "OutdoorMaster OTG snow goggle with a black frame and mirrored lens, shown side on",
      imageCredit: CREDIT,
    },
  },
  "outdoormaster-rhino-mips-helmet-review": {
    "OutdoorMaster RHINO MIPS Full Face — Meteorite Black": {
      image: `${OM}/OutdoorMaster-RHINO_Full_Face_Bike_Helmets-Meteorite_Black-01.webp`,
      imageAlt: "OutdoorMaster RHINO MIPS full-face mountain bike helmet in meteorite black",
      imageCredit: CREDIT,
    },
    "OutdoorMaster RHINO MIPS Full Face — Emerald Green": {
      image: `${OM}/04-emerald_green-rhino_full_face_bike_helmets_42926468-6c72-489b-8b87-df9677aae432.jpg`,
      imageAlt: "OutdoorMaster RHINO MIPS full-face mountain bike helmet in emerald green",
      imageCredit: CREDIT,
    },
  },
};

const file = "lib/articles.ts";
let src = await readFile(file, "utf8");
const EOL = src.includes("\r\n") ? "\r\n" : "\n";

let picksDone = 0;
const notes = [];

// ── Product images ────────────────────────────────────────────────
for (const [slug, byName] of Object.entries(PICK_IMAGES)) {
  const start = src.indexOf(`slug: "${slug}"`);
  if (start === -1) {
    notes.push(`article missing: ${slug}`);
    continue;
  }
  for (const [pickName, fields] of Object.entries(byName)) {
    const needle = `      name: ${JSON.stringify(pickName)},${EOL}`;
    const at = src.indexOf(needle, start);
    if (at === -1) {
      notes.push(`pick not found: ${slug} → ${pickName}`);
      continue;
    }
    // Skip if this pick already carries an image.
    const window = src.slice(at, at + 700);
    if (/^\s{8}image:/m.test(window)) {
      notes.push(`already has image: ${pickName}`);
      continue;
    }
    const block = Object.entries(fields)
      .map(([k, v]) => `        ${k}: ${JSON.stringify(v)},${EOL}`)
      .join("");
    src = src.slice(0, at + needle.length) + block + src.slice(at + needle.length);
    picksDone++;
  }
}

await writeFile(file, src);
console.log(`product images added: ${picksDone}`);
notes.forEach((n) => console.log(`  note: ${n}`));
