import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, X } from "lucide-react";
import { FadeIn } from "@/components/motion";
import type { Article } from "@/lib/articles";
import { site } from "@/lib/data";

export function ArticlePage({ article }: { article: Article }) {
  const hubHref = article.type === "review" ? "/reviews" : "/guides";
  const hubLabel = article.type === "review" ? "Reviews" : "Guides";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: site.name },
    description: article.excerpt,
  };

  return (
    <article>
      {/* Hero */}
      <header className="relative overflow-hidden bg-pine-950 pb-16 pt-[calc(var(--header-h)+56px)]">
        <Image
          src={article.image}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-950/60 to-pine-950" />
        <div className="container-site relative z-10 max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-sand-100/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <Link href={hubHref} className="hover:text-white">{hubLabel}</Link>
            <ChevronRight size={14} />
            <span className="text-sand-100/90">{article.category}</span>
          </nav>
          <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-sand-100/80">
            {article.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-sand-100/70">
            <span>By <strong className="text-white">{article.author}</strong></span>
            <span aria-hidden>·</span>
            <span>Reviewed by {article.reviewer}</span>
            <span aria-hidden>·</span>
            <span>{article.date}</span>
            <span aria-hidden>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </header>

      {/* Disclosure */}
      <div className="border-b border-pine-900/10 bg-sand-100/70">
        <div className="container-site max-w-4xl py-3.5">
          <p className="text-xs leading-relaxed text-pine-900/60">
            {site.name} is reader-supported. When you buy through links on our
            site, we may earn an affiliate commission at no extra cost to you.
            This never affects our rankings.{" "}
            <Link href="/affiliate-disclosure" className="font-semibold underline underline-offset-2">
              Learn more
            </Link>
          </p>
        </div>
      </div>

      <div className="container-site max-w-4xl py-14">
        {/* Intro */}
        <FadeIn>
          <div className="space-y-4 text-lg leading-relaxed text-pine-900/80">
            {article.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </FadeIn>

        {/* Picks */}
        {article.picks?.map((pick, i) => (
          <FadeIn key={pick.name} className="mt-14">
            <section>
              <span className="kicker">{pick.award}</span>
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {i + 1}. {pick.name}
              </h2>
              <p className="mt-4 leading-relaxed text-pine-900/80">{pick.body}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-pine-200 bg-pine-50 p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-pine-700">
                    What we liked
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {pick.pros.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm leading-snug text-pine-900/80">
                        <Check size={16} className="mt-0.5 shrink-0 text-pine-600" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-ember-500/20 bg-ember-400/5 p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-ember-600">
                    Trade-offs
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {pick.cons.map((c) => (
                      <li key={c} className="flex gap-2.5 text-sm leading-snug text-pine-900/80">
                        <X size={16} className="mt-0.5 shrink-0 text-ember-500" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </FadeIn>
        ))}

        {/* Comparison table */}
        {article.table && (
          <FadeIn className="mt-14">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              At a glance
            </h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-pine-900/10">
              <table className="w-full min-w-[560px] border-collapse bg-white/70 text-sm">
                <thead>
                  <tr className="bg-pine-900 text-left text-white">
                    {article.table.headers.map((h) => (
                      <th key={h} className="px-5 py-3.5 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {article.table.rows.map((row) => (
                    <tr key={row[0]} className="border-t border-pine-900/10">
                      {row.map((cell, ci) => (
                        <td
                          key={`${row[0]}-${ci}`}
                          className={`px-5 py-3.5 ${ci === 0 ? "font-semibold" : "text-pine-900/75"}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        )}

        {/* Sections */}
        {article.sections.map((s) => (
          <FadeIn key={s.heading} className="mt-14">
            <section>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                {s.heading}
              </h2>
              {s.body?.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-pine-900/80">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-3">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-pine-900/80">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </FadeIn>
        ))}

        {/* FAQ */}
        {article.faq.length > 0 && (
          <FadeIn className="mt-14">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
            <div className="mt-5 space-y-4">
              {article.faq.map((f) => (
                <div key={f.q} className="glass-card !rounded-xl p-6">
                  <h3 className="font-semibold">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pine-900/75">{f.a}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Footer nav */}
        <FadeIn className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-pine-900 p-7">
            <p className="font-display text-lg font-bold text-white">
              More from {article.category}
            </p>
            <Link href={hubHref} className="btn-primary">
              Browse all {hubLabel.toLowerCase()}
            </Link>
          </div>
        </FadeIn>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
