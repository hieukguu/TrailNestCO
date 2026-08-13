import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  FlaskConical,
  Mountain,
  ShieldCheck,
  Tent,
  Home,
  Backpack,
} from "lucide-react";
import { categories, guides, reviews, site } from "@/lib/data";
import { FeaturedSlider, type FeaturedBrand } from "@/components/featured-slider";

/* Brand landing pages rotated in the Featured Review slider. */
const featuredBrands: FeaturedBrand[] = [
  {
    id: "ketl",
    kicker: "Brand Spotlight · Outdoor Apparel",
    title: "KETL Mtn. — The Best-Kept Secret in Outdoor Apparel",
    excerpt:
      "Lifetime repairs, no swoosh fabric, and technical shorts & pants that outperform brands twice the price — backed by a zero-risk return policy.",
    readTime: "12 min read",
    href: "/ketlmtn-review.html",
    shopHref: "https://ketlmtn.com/collections/mens?ref=hpakmutk",
    shopLabel: "Shop KETL Mtn. →",
    image: "/images/ketl/KETL-Sun-Hoodie-Comparison-Hero-Desktop.webp",
    alt: "KETL Mtn outdoor apparel — brand review",
  },
  {
    id: "cellercise",
    kicker: "Brand Spotlight · Home Fitness",
    title: "Cellerciser® — Tri-Fold vs Bi-Fold Rebounders Compared",
    excerpt:
      "Three foldable, all-steel rebounders built for low-impact home workouts. Compare balance bar options, portability and current pricing side by side.",
    readTime: "10 min read",
    href: "/cellercise-rebounder/",
    shopHref:
      "https://cellercise.com/pages/rebounder-home-gym-shop?sca_ref=11990000.3yDQMFCi1X",
    shopLabel: "Shop Cellercise →",
    image: "/images/cellercise/cellerciser-tri-fold-pro-hero-lg.webp",
    alt: "Cellerciser Tri-Fold Pro rebounder with balance bar and wheeled travel case",
  },
  {
    id: "sunjoy",
    kicker: "Brand Spotlight · Outdoor Structures",
    title: "Sunjoy — Hampton Cedar Gazebo, Pergolas & Patio Swings",
    excerpt:
      "10 million backyards built since 2001. The Hampton 12×16 hardtop gazebo handles rain, snow and UV — starting at $1,717.",
    readTime: "15 min read",
    href: "/sunjoy-review.html",
    shopHref:
      "https://sunjoyshop.com/collections/outdoor-gazebo-for-sale?ref=TRAILNESTCO",
    shopLabel: "Shop Sunjoy →",
    image:
      "https://sunjoyshop.com/cdn/shop/files/SUNJOY_12x16_Wooden_Gazebo_A102032660_26H1_world_cup.webp?v=1775803685&width=1400",
    alt: "Sunjoy Hampton 12x16 cedar hardtop gazebo in a backyard",
  },
  {
    id: "outdoormaster",
    kicker: "Brand Spotlight · Water & Cycling Sports",
    title: "OutdoorMaster — SUP Pumps, MIPS Helmets & ZEISS Sunglasses",
    excerpt:
      "The SHARK 3 inflates a full SUP board in under 4 minutes. MIPS-certified helmets from $55. ZEISS-lens sunglasses from $139.",
    readTime: "13 min read",
    href: "/outdoormaster-review.html",
    shopHref:
      "https://outdoormaster.com/collections/electric-sup-pump?ref=gvghbqwy&utm_medium=inhouse&utm_source=affiliate",
    shopLabel: "Shop OutdoorMaster →",
    image:
      "https://outdoormaster.com/cdn/shop/files/OutdoorMaster-RHINO_MIPS_Full_Face_Bike_Helmets-Pearl_White-01.webp?width=1400",
    alt: "OutdoorMaster RHINO MIPS full face bike helmet",
  },
];

export const metadata: Metadata = {
  title: "TrailNestCo — Independent Gear Reviews, Comparisons & Buying Guides",
  description: "Independent product reviews, comparisons and buying guides for camping & outdoor gear, home essentials, and travel & EDC. Zero paid placements.",
  alternates: { canonical: "https://www.trailnestco.com/" },
  openGraph: {
    title: "TrailNestCo — Independent Gear Reviews & Buying Guides",
    description: "Independent product reviews, comparisons and buying guides for camping & outdoor gear, home essentials, and travel & EDC.",
    url: "https://www.trailnestco.com/",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const stats = [
  { Icon: FlaskConical, value: "60+", label: "Products researched & compared" },
  { Icon: Compass, value: "28", label: "Reviews & guides published" },
  { Icon: ShieldCheck, value: "0", label: "Paid editorial placements. Ever." },
];

const categoryDetails = [
  {
    ...categories[0],
    Icon: Tent,
    points: [
      "Tents, sleep systems, camp cooking, lighting, and hiking gear.",
      "Evaluated on specs, construction, features, and verified user data.",
      "Updated when products change or sell out.",
    ],
  },
  {
    ...categories[1],
    Icon: Home,
    points: [
      "Air fryers, robot vacuums, coffee makers, and kitchen essentials.",
      "Compared on manufacturer specifications and documented performance.",
      "Honest trade-offs for every budget tier.",
    ],
  },
  {
    ...categories[2],
    Icon: Backpack,
    points: [
      "Carry-on packs evaluated against major airline size requirements.",
      "Bottles, power stations, and EDC compared on specs and design.",
      "Airline size limits and packing strategy included.",
    ],
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Site H1 (screen-reader / SEO only) ─────────────────────── */}
      <h1 className="sr-only">TrailNestCo — Independent Gear Reviews, Comparisons and Buying Guides</h1>

      {/* ── Featured Story ──────────────────────────────────────────── */}
      <section className="border-b border-stone-200 bg-white pt-[calc(var(--header-h)+40px)] pb-14">
        <div className="container-site">
          <div className="mb-6 flex items-center justify-between">
            <span className="section-label">Featured Review</span>
            <Link href="/reviews" className="text-[13px] font-medium text-pine-500 hover:text-pine-950 transition-colors">
              All Reviews →
            </Link>
          </div>

          <h2 className="sr-only">Featured brand reviews</h2>
          <FeaturedSlider brands={featuredBrands} />
        </div>
      </section>

      {/* ── Latest Reviews grid ──────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="container-site">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="section-label">Latest picks</span>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-pine-950 sm:text-3xl">
                Latest Reviews &amp; Top Picks
              </h2>
            </div>
            <Link href="/reviews" className="btn-ghost hidden sm:inline-flex">
              View All
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {reviews.slice(0, 4).map((r) => (
              <Link key={r.slug} href={`/reviews/${r.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-stone-100">
                  <Image
                    src={r.image}
                    alt={r.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-3 badge-dark text-[10px]">{r.category}</span>
                </div>
                <h3 className="mt-3 font-display text-[15px] font-bold leading-snug text-pine-950 group-hover:text-ember-600 transition-colors">
                  {r.title}
                </h3>
                <p className="mt-1 text-[12px] text-pine-400">{r.readTime}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link href="/reviews" className="btn-ghost w-full justify-center">
              View All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ── Brand Spotlights ─────────────────────────────────────────── */}
      <section className="border-y border-stone-200 bg-stone-50 py-16">
        <div className="container-site">
          <div className="mb-8">
            <span className="section-label">Brand Spotlights</span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-pine-950 sm:text-3xl">
              Gear Brands We Actually Trust
            </h2>
            <p className="mt-2 max-w-xl text-[15px] text-pine-500">
              These are affiliate partnerships — brands we researched, evaluated, and consider worth recommending. Affiliate commissions never determine our editorial conclusions.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {/* ── Sunjoy ── */}
            <div className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white">
              <div className="grid grid-cols-2 gap-1 p-2">
                {[
                  { src: "https://sunjoyshop.com/cdn/shop/files/SUNJOY_12x16_Wooden_Gazebo_A102032660_26H1_world_cup.webp?v=1775803685&width=600", alt: "Sunjoy Hampton 12x16 Cedar Gazebo" },
                  { src: "https://sunjoyshop.com/cdn/shop/files/A102032660_26H1_SUNJOY_12x16_Wooden_Gazebo.webp?v=1775806288&width=600", alt: "Sunjoy Hampton Gazebo in garden" },
                  { src: "https://sunjoyshop.com/cdn/shop/files/A102032660_12x16_Wood_Gazebo_Frame.jpg?v=1775806288&width=600", alt: "Sunjoy premium cedar wood frame" },
                  { src: "https://sunjoyshop.com/cdn/shop/files/A102032660_12x16_Wood_Gazebo_Roof.jpg?v=1775806288&width=600", alt: "Sunjoy dual-tier steel roof" },
                ].map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="kicker !text-amber-600">Outdoor Structures</span>
                <h3 className="font-display text-lg font-bold leading-snug text-pine-950">
                  Sunjoy — Hampton Cedar Gazebo, Pergolas &amp; Patio Swings
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-pine-500">
                  10 million backyards built since 2001. The Hampton 12×16 hardtop gazebo handles rain, snow, and UV — starting at $1,717.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[12px]">
                  {[{ val: "Since 2001", label: "In business" }, { val: "$1,717", label: "Starts at" }, { val: "336", label: "Amazon reviews" }].map(s => (
                    <div key={s.label} className="rounded-lg border border-stone-200 bg-stone-50 py-2.5">
                      <p className="font-bold text-pine-950">{s.val}</p>
                      <p className="text-[10px] text-pine-400 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2 xl:flex-col">
                  <a href="/sunjoy-review.html" className="btn-primary text-sm">Full Review <ArrowRight size={13} /></a>
                  <a href="https://sunjoyshop.com/collections/outdoor-gazebo-for-sale?ref=TRAILNESTCO" target="_blank" rel="noopener nofollow sponsored" className="btn-ghost text-sm">Shop →</a>
                </div>
              </div>
            </div>

            {/* ── OutdoorMaster ── */}
            <div className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white">
              <div className="grid grid-cols-2 gap-1 p-2">
                {[
                  { src: "https://outdoormaster.com/cdn/shop/files/OutdoorMaster-RHINO_MIPS_Full_Face_Bike_Helmets-Pearl_White-01.webp?width=600", alt: "OutdoorMaster RHINO MIPS Helmet" },
                  { src: "https://outdoormaster.com/cdn/shop/files/OutdoorMaster_PHOENIX_X_Sports_Glasses_Black_Frame_-_ZEISS_Violet_Ice_Blue-844114-01.webp?width=600", alt: "OutdoorMaster PHOENIX X ZEISS Sunglasses" },
                  { src: "https://outdoormaster.com/cdn/shop/files/01-shark2_6a150bff-1c7e-45ca-a0f2-40d64dc45fa1.jpg?width=600", alt: "OutdoorMaster SHARK 3 SUP Pump" },
                  { src: "https://outdoormaster.com/cdn/shop/files/01-black-Horse_Journey_Golf_Travel_Case.webp?v=1747881186&width=600", alt: "OutdoorMaster Golf Travel Case" },
                ].map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="kicker !text-blue-600">Water &amp; Cycling Sports</span>
                <h3 className="font-display text-lg font-bold leading-snug text-pine-950">
                  OutdoorMaster — SUP Pumps, MIPS Helmets &amp; ZEISS Sunglasses
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-pine-500">
                  The SHARK 3 inflates a full SUP board in under 4 minutes. MIPS helmets from $55. ZEISS-lens sunglasses from $139.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[12px]">
                  {[{ val: "MIPS cert.", label: "Helmet safety" }, { val: "$55+", label: "MIPS helmets" }, { val: "<4 min", label: "SUP inflate" }].map(s => (
                    <div key={s.label} className="rounded-lg border border-stone-200 bg-stone-50 py-2.5">
                      <p className="font-bold text-pine-950">{s.val}</p>
                      <p className="text-[10px] text-pine-400 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2 xl:flex-col">
                  <a href="/outdoormaster-review.html" className="btn-primary text-sm">Full Review <ArrowRight size={13} /></a>
                  <a href="https://outdoormaster.com/collections/electric-sup-pump?ref=gvghbqwy&utm_medium=inhouse&utm_source=affiliate" target="_blank" rel="noopener nofollow sponsored" className="btn-ghost text-sm">Shop →</a>
                </div>
              </div>
            </div>

            {/* ── KETL Mtn. ── */}
            <div className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white">
              <div className="grid grid-cols-2 gap-1 p-2">
                {[
                  { src: "https://ketlmtn.com/cdn/shop/files/KETL-Shenanigan-Outdoor-Pant-Brown-PDP-2-2026.jpg?v=1784152795&width=800", alt: "KETL Mtn Shenanigan Outdoor Pants Brown" },
                  { src: "https://ketlmtn.com/cdn/shop/files/KETL-Vent-Lightweight-Short-PDP-Green-1.webp?v=1&width=800", alt: "KETL Mtn Vent Lightweight Shorts Green" },
                  { src: "https://ketlmtn.com/cdn/shop/files/KETL-Escapade-LW-Jacket-Green-4x5-PDP-11.webp?v=1&width=800", alt: "KETL Mtn Escapade Jacket Green" },
                  { src: "https://ketlmtn.com/cdn/shop/files/KETL-Virtue-Hybrid-Short-Black-Brown-PDP-4x5-3.webp?v=1&width=800", alt: "KETL Mtn Virtue Hybrid Shorts" },
                ].map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-stone-100">
                    <Image src={img.src} alt={img.alt} fill sizes="25vw" className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="kicker">Outdoor Apparel</span>
                <h3 className="font-display text-lg font-bold leading-snug text-pine-950">
                  KETL Mtn. — The Best-Kept Secret in Outdoor Apparel
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-pine-500">
                  Lifetime repairs. Technical shorts, pants &amp; travel gear that outlasts brands twice the price.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[12px]">
                  {[{ val: "Lifetime", label: "Repair policy" }, { val: "$69+", label: "Starts at" }, { val: "No swoosh", label: "No logo fabric" }].map(s => (
                    <div key={s.label} className="rounded-lg border border-stone-200 bg-stone-50 py-2.5">
                      <p className="font-bold text-pine-950">{s.val}</p>
                      <p className="text-[10px] text-pine-400 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2 xl:flex-col">
                  <a href="/ketlmtn-review.html" className="btn-primary text-sm">Full Review <ArrowRight size={13} /></a>
                  <a href="https://ketlmtn.com/collections/mens?ref=hpakmutk" target="_blank" rel="noopener nofollow sponsored" className="btn-ghost text-sm">Shop →</a>
                </div>
              </div>
            </div>

            {/* ── Cellercise ── */}
            <div className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white">
              <div className="grid grid-cols-2 gap-1 p-2">
                {[
                  { src: "/images/cellercise/cellerciser-tri-fold-pro.webp", alt: "Cellerciser Tri-Fold Pro rebounder with balance bar" },
                  { src: "/images/cellercise/cellerciser-bi-fold-balance-bar.webp", alt: "Cellerciser Bi-Fold rebounder with removable balance bar" },
                  { src: "/images/cellercise/cellerciser-tridaptable-spring.webp", alt: "Tapered TriDaptable springs on a Cellerciser rebounder" },
                  { src: "/images/cellercise/cellerciser-tri-fold-dolly-case.webp", alt: "Cellerciser Tri-Fold Pro packed in its wheeled travel case" },
                ].map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="kicker !text-red-600">Home Fitness</span>
                <h3 className="font-display text-lg font-bold leading-snug text-pine-950">
                  Cellerciser® — Foldable Rebounders for Low-Impact Workouts
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-pine-500">
                  Three all-steel models compared on fold style, balance bar and portability. Patented TriDaptable® springs, lifetime frame warranty.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[12px]">
                  {[{ val: "3 models", label: "Compared" }, { val: "400 lb", label: "Max capacity" }, { val: "Lifetime", label: "Frame warranty" }].map(s => (
                    <div key={s.label} className="rounded-lg border border-stone-200 bg-stone-50 py-2.5">
                      <p className="font-bold text-pine-950">{s.val}</p>
                      <p className="text-[10px] text-pine-400 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2 xl:flex-col">
                  <a href="/cellercise-rebounder/" className="btn-primary text-sm">Full Review <ArrowRight size={13} /></a>
                  <a href="https://cellercise.com/pages/rebounder-home-gym-shop?sca_ref=11990000.3yDQMFCi1X" target="_blank" rel="noopener nofollow sponsored" className="btn-ghost text-sm">Shop →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="container-site">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="section-label">About us</span>
              <h2 className="mt-4 max-w-lg font-display text-2xl font-bold leading-snug tracking-tight text-pine-950 sm:text-3xl">
                Independent Gear Research and Buying Guides for Everyday Adventurers.
              </h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-pine-500">
                TrailNestCo is an independent affiliate publication. Since {site.founded}, we&apos;ve published product research, comparisons, and buying guides based on specifications, manufacturer data, and publicly available information — not on who pays the highest commission.
              </p>
              <Link href="/about" className="btn-ghost mt-7">
                Know More About Us
              </Link>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1000&q=70&auto=format&fit=crop"
                alt="Tent pitched on a mountainside at sunset"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 shadow-md backdrop-blur-sm">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span className="text-[12px] font-bold text-pine-950">Independent editorial research</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────── */}
      <section className="bg-pine-950 py-0">
        <div className="container-site">
          <div className="grid divide-y divide-white/8 sm:divide-x sm:divide-y-0 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-5 px-8 py-10">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-ember-400">
                  <s.Icon size={20} />
                </span>
                <div>
                  <p className="font-display text-3xl font-bold text-white">{s.value}</p>
                  <p className="mt-0.5 text-sm text-white/50">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────────── */}
      <section className="bg-stone-50 py-16 border-y border-stone-200">
        <div className="container-site">
          <div className="mb-8 text-center">
            <span className="section-label justify-center">What we cover</span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-pine-950 sm:text-3xl">
              Three Categories, One Standard
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[16px] text-pine-500">
              Independent research across every corner of the gear market.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {categoryDetails.map((c, i) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}/`}
                className="group flex flex-col rounded-xl border border-stone-200 bg-white p-7 shadow-sm transition-all hover:border-stone-400 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-pine-950 text-ember-400">
                    <c.Icon size={18} />
                  </span>
                  <span className="font-display text-4xl font-black text-pine-950/8 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-pine-950">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pine-500">{c.blurb}</p>
                <ul className="mt-4 space-y-2">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm leading-snug text-pine-600">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                      {p}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-ember-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Explore category <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guides ───────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="container-site">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="section-label">Buying guides</span>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-pine-950 sm:text-3xl">
                How-To Guides
              </h2>
              <p className="mt-2 max-w-xl text-[15px] text-pine-500">
                Practical, step-by-step guides to help you choose, use, and maintain your gear.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g, i) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group flex flex-col rounded-xl border border-stone-200 bg-stone-50 p-6 transition-all hover:border-stone-400 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-pine-950 font-display text-xs font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-pine-400">{g.category}</span>
                </div>
                <h3 className="mt-4 font-display text-[15px] font-bold leading-snug text-pine-950 group-hover:text-ember-600 transition-colors">
                  {g.title}
                </h3>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-ember-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Read guide <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-pine-950 py-20">
        <div className="container-site">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ember-500">
              <Mountain size={24} strokeWidth={2} className="text-pine-950" />
            </span>
            <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Never Buy Blind Again
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/60">
              Start with our top picks — every recommendation is backed by independent research, not commission rates.
            </p>
            <Link href="/reviews" className="btn-white mt-8">
              Browse Top Picks <ArrowRight size={15} />
            </Link>
            <div className="mt-8 flex items-center gap-5">
              <div className="h-px w-12 bg-white/15" />
              <p className="text-sm text-white/35">or reach us directly</p>
              <div className="h-px w-12 bg-white/15" />
            </div>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 text-sm font-medium text-white/60 underline underline-offset-4 transition-colors hover:text-ember-400"
            >
              {site.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}


