// Static audit of the exported site in out/: broken internal links, missing
// metadata, sitemap drift, oversized assets, duplicate titles.
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("out");
const SITE = "https://www.trailnestco.com";

async function walk(dir, acc = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const files = await walk(OUT);
const htmlFiles = files.filter((f) => f.endsWith(".html"));
const rel = (f) => f.slice(OUT.length + 1).replace(/\\/g, "/");

// Every URL path the server can actually serve
const served = new Set();
for (const f of files) {
  const r = rel(f);
  served.add("/" + r);
  if (r.endsWith("/index.html")) {
    const dir = "/" + r.slice(0, -"index.html".length);
    served.add(dir);
    served.add(dir.replace(/\/$/, ""));
  }
}

const problems = { brokenLinks: [], noTitle: [], noDesc: [], noCanonical: [], dupTitle: [], longTitle: [], badDesc: [] };
const titles = new Map();

for (const f of htmlFiles) {
  const html = await readFile(f, "utf8");
  const page = "/" + rel(f);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const canon = html.match(/rel="canonical" href="([^"]*)"/)?.[1];

  if (!title) problems.noTitle.push(page);
  else {
    if (title.length > 70) problems.longTitle.push(`${page} (${title.length})`);
    if (!titles.has(title)) titles.set(title, []);
    titles.get(title).push(page);
  }
  if (!desc) problems.noDesc.push(page);
  else if (desc.length < 70 || desc.length > 170) problems.badDesc.push(`${page} (${desc.length})`);
  if (!canon) problems.noCanonical.push(page);

  // Internal links. Paths are percent-encoded in the HTML (Next.js route
  // groups like [slug] become %5Bslug%5D) but literal on disk.
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    let target = m[1];
    if (target.startsWith("//")) continue;
    try { target = decodeURIComponent(target); } catch { /* leave as-is */ }
    if (served.has(target) || served.has(target + "/") || served.has(target + "index.html")) continue;
    if (served.has(target.replace(/\/$/, "") + "/index.html")) continue;
    problems.brokenLinks.push(`${page} → ${target}`);
  }
}

for (const [t, pages] of titles) if (pages.length > 1) problems.dupTitle.push(`"${t.slice(0, 55)}" on ${pages.join(", ")}`);

// Sitemap drift
const sitemap = await readFile(path.join(OUT, "sitemap.xml"), "utf8");
const smUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, ""));
const smMissing = smUrls.filter((u) => !served.has(u) && !served.has(u + "index.html"));

// Indexable pages that are not in the sitemap
const indexable = htmlFiles
  .map((f) => "/" + rel(f))
  .filter((p) => !p.startsWith("/404") && !p.includes("/_next/"))
  .map((p) => (p.endsWith("/index.html") ? p.slice(0, -"index.html".length) : p));
const notInSitemap = indexable.filter((p) => !smUrls.includes(p));

// Heavy assets
const heavy = [];
for (const f of files) {
  if (/\.(png|jpe?g|webp|gif|svg)$/i.test(f)) {
    const s = await stat(f);
    if (s.size > 300 * 1024) heavy.push(`${rel(f)} — ${Math.round(s.size / 1024)} KB`);
  }
}

const out = (label, arr, limit = 12) => {
  const mark = arr.length ? "FAIL" : "OK  ";
  console.log(`${mark} ${label}: ${arr.length}`);
  arr.slice(0, limit).forEach((x) => console.log(`       ${x}`));
  if (arr.length > limit) console.log(`       … +${arr.length - limit} more`);
};

console.log(`Scanned ${htmlFiles.length} HTML pages, ${files.length} files total\n`);
out("Broken internal links", [...new Set(problems.brokenLinks)]);
out("Pages missing <title>", problems.noTitle);
out("Pages missing meta description", problems.noDesc);
out("Pages missing canonical", problems.noCanonical);
out("Duplicate titles", problems.dupTitle);
out("Titles over 70 chars", problems.longTitle);
out("Descriptions outside 70-170 chars", problems.badDesc);
out("Sitemap URLs that 404", smMissing);
out("Live pages missing from sitemap", notInSitemap);
out("Images over 300 KB", heavy);
