import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Home } from "lucide-react";
import { reviewArticles, guideArticles } from "@/lib/articles";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Home Essentials — Reviews, Comparisons & Buying Guides",
  description:
    "Independent reviews and buying guides for air fryers, robot vacuums, coffee makers, and other home appliances. Based on specifications and verified data.",
  openGraph: {
    title: "Home Essentials Reviews — TrailNestCo",
    description:
      "Independent reviews and buying guides for air fryers, robot vacuums, coffee makers, and home appliances.",
    url: "https://www.trailnestco.com/categories/home-essentials/",
  },
};

const homeReviews = reviewArticles.filter(
  (a) => a.category === "Home Essentials"
);
const homeGuides = guideArticles.filter(
  (a) => a.category === "Home Essentials"
);

const categoryJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Home Essentials Reviews",
  description: "Independent product reviews and buying guides for home appliances and kitchen gear.",
  url: `${site.url}/categories/home-essentials/`,
  publisher: { "@type": "Organization", name: site.name },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Home Essentials", item: `${site.url}/categories/home-essentials/` },
    ],
  },
};

export default function HomeEssentialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />

      <section className="relative overflow-hidden bg-pine-950 pb-20 pt-[calc(var(--header-h)+64px)]">
        <Image
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1800&q=70&auto=format&fit=crop"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-950/60 to-pine-950" />
        <div className="container-site relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[13px] text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Home Essentials</span>
          </nav>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ember-500">
              <Home size={18} className="text-pine-950" />
            </span>
            <span className="kicker !text-ember-400">Category</span>
          </div>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Home Essentials
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">
            Independent reviews and buying guides for air fryers, robot vacuums,
            coffee makers, and other home appliances — based on specifications
            and verified performance data.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-site">
          <h2 className="font-display text-2xl font-bold tracking-tight text-pine-950">Appliance Reviews</h2>
          <p className="mt-2 text-[15px] text-pine-500">Compared on manufacturer specifications, design, and verified user data.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {homeReviews.map((r) => (
              <Link
                key={r.slug}
                href={`/reviews/${r.slug}`}
                className="group flex flex-col rounded-xl border border-stone-200 bg-white overflow-hidden hover:border-stone-400 hover:shadow-md transition-all"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
                  <Image src={r.image} alt={r.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[15px] font-bold leading-snug text-pine-950 group-hover:text-ember-600 transition-colors">{r.title}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-pine-500 line-clamp-2">{r.excerpt}</p>
                  <span className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-ember-600">Read review <ArrowRight size={12} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {homeGuides.length > 0 && (
        <section className="border-t border-stone-200 bg-stone-50 py-16">
          <div className="container-site">
            <h2 className="font-display text-2xl font-bold tracking-tight text-pine-950">How-To Guides</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {homeGuides.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="group rounded-xl border border-stone-200 bg-white p-6 hover:border-stone-400 hover:shadow-sm transition-all">
                  <h3 className="font-display text-[15px] font-bold leading-snug text-pine-950 group-hover:text-ember-600 transition-colors">{g.title}</h3>
                  <span className="mt-3 flex items-center gap-1 text-[12px] font-semibold text-ember-600">Read guide <ArrowRight size={12} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-12 border-t border-stone-200">
        <div className="container-site flex gap-4">
          <Link href="/reviews" className="btn-primary">All Reviews <ArrowRight size={14} /></Link>
          <Link href="/categories/camping-outdoor" className="btn-ghost">Camping &amp; Outdoor →</Link>
          <Link href="/categories/travel-edc" className="btn-ghost">Travel &amp; EDC →</Link>
        </div>
      </section>
    </>
  );
}
