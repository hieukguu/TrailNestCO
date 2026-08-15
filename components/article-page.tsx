"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, X, ArrowLeft, FileSearch, ArrowUpRight } from "lucide-react";
import { articles, type Article } from "@/lib/articles";
import { site } from "@/lib/data";
import { useEffect, useState } from "react";

/* ── Reading progress bar ───────────────────────────────────────── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="progress-bar"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

/* ── Main component ─────────────────────────────────────────────── */
export function ArticlePage({ article }: { article: Article }) {
  const hubHref = article.type === "review" ? "/reviews" : "/guides";
  const hubLabel = article.type === "review" ? "Reviews" : "Guides";
  const typeLabel = article.type === "review" ? "Review" : "Buying Guide";

  const canonicalUrl = `${site.url}/${article.type === "review" ? "reviews" : "guides"}/${article.slug}/`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    url: canonicalUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/favicon.svg` },
    },
    ...(article.datePublished ? { datePublished: article.datePublished } : {}),
    ...(article.dateModified ? { dateModified: article.dateModified } : (article.datePublished ? { dateModified: article.datePublished } : {})),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url + "/" },
      { "@type": "ListItem", position: 2, name: article.type === "review" ? "Reviews" : "Guides", item: `${site.url}/${article.type === "review" ? "reviews" : "guides"}/` },
      { "@type": "ListItem", position: 3, name: article.title, item: canonicalUrl },
    ],
  };

  /* Ranked round-ups get an ItemList. No Offer or AggregateRating nodes:
     TrailNestCo is not the seller and holds no rating data of its own. */
  const itemListJsonLd =
    article.picks && article.picks.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: article.title,
          numberOfItems: article.picks.length,
          itemListElement: article.picks.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: p.name,
              ...(p.image ? { image: p.image.startsWith("http") ? p.image : site.url + p.image } : {}),
              ...(p.ctaUrl ? { url: p.ctaUrl } : {}),
            },
          })),
        }
      : null;

  /* FAQ markup only when the questions are actually rendered below. */
  const faqJsonLd =
    article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  const relatedArticles = (article.related ?? [])
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is Article => Boolean(a) && a!.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <ReadingProgress />

      <article>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <header className="relative overflow-hidden bg-pine-950 pb-16 pt-[calc(var(--header-h)+40px)]">
          <Image
            src={article.image}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pine-950/50 to-pine-950" />

          <div className="container-site relative z-10 max-w-4xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-white/50">
              <Link href="/" className="transition-colors hover:text-white/80">Home</Link>
              <ChevronRight size={13} />
              <Link href={hubHref} className="transition-colors hover:text-white/80">{hubLabel}</Link>
              <ChevronRight size={13} />
              <span className="text-white/75">{article.category}</span>
            </nav>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded bg-ember-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-pine-950">
                {typeLabel}
              </span>
              <span className="inline-flex items-center rounded border border-white/15 px-3 py-1 text-[11px] text-white/60">
                {article.category}
              </span>
              <span className="inline-flex items-center rounded border border-white/10 px-3 py-1 text-[11px] text-white/45">
                {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/70">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="mt-7 flex flex-wrap items-center gap-x-1 gap-y-2 text-sm text-white/50">
              <span>By <strong className="font-semibold text-white/80">TrailNestCo Editorial</strong></span>
              <span className="mx-2 text-white/25">·</span>
              <span>{article.date}</span>
            </div>
          </div>
        </header>

        {/* Affiliate disclosure */}
        <div className="border-b border-stone-200 bg-amber-50">
          <div className="container-site max-w-4xl py-3.5">
            <p className="text-[13px] leading-relaxed text-stone-600">
              <strong className="font-semibold text-stone-800">Transparency notice:</strong>{" "}
              {site.name} is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you. This never affects our rankings.{" "}
              <Link href="/affiliate-disclosure" className="font-semibold text-pine-900 underline underline-offset-2 hover:no-underline">
                Learn more →
              </Link>
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="container-site max-w-4xl py-14">

          <div className="space-y-5 text-[17px] leading-[1.85] text-pine-700">
            {article.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>

          {/* Key takeaways — scannable summary above the fold */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <aside
              aria-labelledby="key-takeaways"
              className="mt-8 rounded-xl border border-pine-200 bg-pine-50 p-6"
            >
              <h2
                id="key-takeaways"
                className="mb-4 font-display text-[15px] font-bold text-pine-950"
              >
                Key takeaways
              </h2>
              <ul className="space-y-2.5">
                {article.keyTakeaways.map((t) => (
                  <li key={t} className="flex gap-2.5 text-[15px] leading-relaxed text-pine-700">
                    <Check size={15} className="mt-1 shrink-0 text-ember-600" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Quick verdict */}
          {article.quickVerdict && (
            <div className="mt-8 rounded-xl border-l-4 border-ember-500 bg-stone-50 p-6">
              <h2 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-pine-500">
                Quick verdict
              </h2>
              <p className="text-[16px] leading-relaxed text-pine-800">{article.quickVerdict}</p>
            </div>
          )}

          {/* How We Evaluated */}
          {article.howWeEvaluated && (
            <div className="mt-8 rounded-xl border border-stone-200 bg-stone-50 p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <FileSearch size={16} className="text-pine-500 shrink-0" />
                <h2 className="font-display text-[15px] font-bold text-pine-950">How we evaluated</h2>
              </div>
              <p className="text-[14px] leading-relaxed text-pine-600">{article.howWeEvaluated}</p>
            </div>
          )}

          {article.picks?.map((pick, i) => (
            <section key={pick.name} className="mt-14 scroll-mt-24" id={`pick-${i + 1}`}>
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-pine-950 font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="kicker !mb-0">{pick.award}</span>
              </div>

              <h2 className="font-display text-2xl font-bold tracking-tight text-pine-950 sm:text-3xl">
                {pick.name}
              </h2>

              {(pick.bestFor || pick.priceTier) && (
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px]">
                  {pick.bestFor && (
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-pine-700">
                      Best for {pick.bestFor}
                    </span>
                  )}
                  {pick.priceTier && (
                    <span
                      className="rounded-full bg-stone-100 px-3 py-1 font-semibold text-pine-700"
                      title="Approximate price band, not a live price"
                    >
                      {pick.priceTier}
                    </span>
                  )}
                </div>
              )}

              {/* Product image. Lazy, since these all sit below the fold.
                  Width is capped: these are studio shots on a plain background
                  and at full body width they dwarf the copy around them. */}
              {pick.image && (
                <figure className="mt-6 max-w-md">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
                    <Image
                      src={pick.image}
                      alt={pick.imageAlt ?? pick.name}
                      fill
                      sizes="(max-width: 640px) 92vw, 448px"
                      loading="lazy"
                      className="object-contain p-4"
                    />
                  </div>
                  {pick.imageCredit && (
                    <figcaption className="mt-2 text-[12px] text-pine-400">
                      {pick.imageCredit}
                    </figcaption>
                  )}
                </figure>
              )}

              <p className="mt-6 text-[16px] leading-relaxed text-pine-700">{pick.body}</p>

              {pick.keySpecs && pick.keySpecs.length > 0 && (
                <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-4">
                  {pick.keySpecs.map((s) => (
                    <div key={s.label} className="bg-white p-3">
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-pine-400">
                        {s.label}
                      </dt>
                      <dd className="mt-1 text-[14px] font-semibold text-pine-950">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                  <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                    What we liked
                  </h3>
                  <ul className="space-y-2.5">
                    {pick.pros.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm leading-snug text-pine-800">
                        <Check size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-5">
                  <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-orange-700">
                    Trade-offs
                  </h3>
                  <ul className="space-y-2.5">
                    {pick.cons.map((c) => (
                      <li key={c} className="flex gap-2.5 text-sm leading-snug text-pine-800">
                        <X size={14} className="mt-0.5 shrink-0 text-orange-500" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {pick.ctaUrl && (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href={pick.ctaUrl}
                    target="_blank"
                    rel={
                      pick.ctaIsAffiliate
                        ? "noopener nofollow sponsored"
                        : "noopener noreferrer"
                    }
                    className="btn-primary"
                  >
                    {pick.ctaLabel ?? "Check Current Price"} <ArrowUpRight size={14} />
                  </a>
                  <span className="text-[12px] text-pine-400">
                    {pick.ctaIsAffiliate
                      ? "Affiliate link — we may earn a commission at no extra cost to you."
                      : "Links to the manufacturer. We earn nothing from this link."}
                  </span>
                </div>
              )}
            </section>
          ))}

          {article.table && (
            <div className="mt-14">
              <h2 className="mb-5 font-display text-2xl font-bold tracking-tight text-pine-950 sm:text-3xl">
                At a glance
              </h2>
              <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-sm">
                <table className="w-full min-w-[560px] border-collapse bg-white text-sm">
                  <thead>
                    <tr className="bg-pine-950">
                      {article.table.headers.map((h) => (
                        <th key={h} className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-white/80">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {article.table.rows.map((row, ri) => (
                      <tr
                        key={row[0]}
                        className={`border-t border-stone-100 transition-colors hover:bg-stone-50 ${ri === 0 ? "bg-amber-50/60" : ""}`}
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={`${row[0]}-${ci}`}
                            className={`px-4 py-3.5 ${ci === 0 ? "font-semibold text-pine-950" : "text-pine-700"}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {article.sections.map((s) => (
            <section key={s.heading} className="mt-12">
              <h2 className="mb-4 pb-2 font-display text-2xl font-bold tracking-tight text-pine-950 sm:text-[26px]" style={{ borderBottom: "2px solid #c6ef37" }}>
                {s.heading}
              </h2>
              {s.body?.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-[16px] leading-[1.85] text-pine-700">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-3">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3 text-[16px] leading-relaxed text-pine-700">
                      <span aria-hidden className="mt-2.5 h-1.5 w-4 shrink-0 rounded-full bg-ember-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Buying guide */}
          {article.buyingGuide?.map((s) => (
            <section key={s.heading} className="mt-12">
              <h2
                className="mb-4 pb-2 font-display text-2xl font-bold tracking-tight text-pine-950 sm:text-[26px]"
                style={{ borderBottom: "2px solid #c6ef37" }}
              >
                {s.heading}
              </h2>
              {s.body?.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-[16px] leading-[1.85] text-pine-700">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-3">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3 text-[16px] leading-relaxed text-pine-700">
                      <span aria-hidden className="mt-2.5 h-1.5 w-4 shrink-0 rounded-full bg-ember-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Who it suits / who should look elsewhere */}
          {(article.whoFor || article.whoShouldSkip) && (
            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              {article.whoFor && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                  <h2 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                    Who this is for
                  </h2>
                  <ul className="space-y-2.5">
                    {article.whoFor.map((w) => (
                      <li key={w} className="flex gap-2.5 text-[15px] leading-snug text-pine-800">
                        <Check size={14} className="mt-1 shrink-0 text-emerald-600" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {article.whoShouldSkip && (
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-6">
                  <h2 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-orange-700">
                    Who should skip it
                  </h2>
                  <ul className="space-y-2.5">
                    {article.whoShouldSkip.map((w) => (
                      <li key={w} className="flex gap-2.5 text-[15px] leading-snug text-pine-800">
                        <X size={14} className="mt-1 shrink-0 text-orange-500" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Final verdict */}
          {article.verdict && (
            <section className="mt-14 rounded-xl bg-pine-950 p-7 sm:p-9">
              <h2 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-ember-400">
                Final verdict
              </h2>
              <p className="text-[17px] leading-relaxed text-white/85">{article.verdict}</p>
            </section>
          )}

          {article.faq.length > 0 && (
            <div className="mt-14">
              <h2 className="mb-5 font-display text-2xl font-bold tracking-tight text-pine-950 sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="space-y-3">
                {article.faq.map((f) => (
                  <div key={f.q} className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-ember-500/15 text-[11px] font-bold text-ember-600">
                        Q
                      </span>
                      <div>
                        <h3 className="font-display font-semibold text-pine-950">{f.q}</h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-pine-600">{f.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-14">
              <h2 className="mb-5 font-display text-2xl font-bold tracking-tight text-pine-950 sm:text-3xl">
                Related reading
              </h2>
              <div className="grid gap-5 sm:grid-cols-3">
                {relatedArticles.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${r.type === "review" ? "reviews" : "guides"}/${r.slug}/`}
                    className="group block rounded-xl border border-stone-200 bg-white p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-stone-100">
                      <Image
                        src={r.image}
                        alt={r.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                      />
                    </div>
                    <p className="kicker !mb-0 mt-3">{r.category}</p>
                    <h3 className="mt-1.5 font-display text-[15px] font-bold leading-snug text-pine-950 group-hover:text-ember-600">
                      {r.title}
                    </h3>
                    <p className="mt-1 text-[12px] text-pine-400">{r.readTime}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-14 overflow-hidden rounded-xl bg-pine-950">
              <div className="p-8 sm:p-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="kicker !text-ember-400">Explore more</p>
                    <p className="font-display text-xl font-bold text-white sm:text-2xl">
                      More from {article.category}
                    </p>
                    <p className="mt-1.5 text-sm text-white/55">
                      Independent editorial research. Zero pay-to-play.
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                    <Link href={hubHref} className="btn-white">
                      Browse all {hubLabel.toLowerCase()}
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center gap-1.5 text-sm font-medium text-white/45 transition-colors hover:text-white/70"
                    >
                      <ArrowLeft size={13} />
                      Back to home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {itemListJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
          />
        )}
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
      </article>
    </>
  );
}
