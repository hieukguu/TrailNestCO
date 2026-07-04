import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { FadeIn, HoverLift, Stagger, StaggerItem } from "@/components/motion";
import { categories, featuredGuide, reviews } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Reviews & Top Picks",
  description:
    "Every TrailNestCo review, built on hands-on testing across camping & outdoor, home essentials, and travel & EDC.",
};

export default function ReviewsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-pine-950 pb-20 pt-[calc(var(--header-h)+64px)]">
        <Image
          src={featuredGuide.image}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-950/70 to-pine-950" />
        <div className="container-site relative z-10">
          <FadeIn>
            <span className="kicker !text-ember-400">Top Picks</span>
            <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Reviews built on testing, not talking points
            </h1>
            <p className="mt-4 max-w-xl text-lg text-sand-100/80">
              Every recommendation below went through hands-on testing or
              verified research — and gets updated when products change.
            </p>
          </FadeIn>
        </div>
      </section>

      {categories.map((c, i) => (
        <section
          key={c.slug}
          id={c.slug}
          className={`scroll-mt-24 py-20 ${i % 2 ? "bg-sand-100/60" : ""}`}
        >
          <div className="container-site">
            <FadeIn>
              <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.6fr]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-square">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-display text-3xl font-bold tracking-tight">
                    {c.name}
                  </h2>
                  <p className="mt-3 max-w-lg text-pine-900/70">{c.blurb}</p>

                  <div className="mt-8 space-y-4">
                    {reviews
                      .filter((r) => r.category === c.name)
                      .map((r) => (
                        <HoverLift key={r.slug}>
                          <Link
                            href={`/reviews/${r.slug}`}
                            className="glass-card flex items-center justify-between gap-4 !rounded-xl p-5"
                          >
                            <div>
                              <h3 className="font-semibold leading-snug">
                                {r.title}
                              </h3>
                              <p className="mt-1 text-sm text-pine-900/60">
                                {r.readTime}
                              </p>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-pine-100 px-3 py-1.5 text-sm font-bold text-pine-800">
                              Read →
                            </span>
                          </Link>
                        </HoverLift>
                      ))}
                    {reviews.filter((r) => r.category === c.name).length === 0 && (
                      <p className="rounded-xl border border-dashed border-pine-900/20 p-6 text-sm text-pine-900/60">
                        New reviews in this category are in testing now — they
                        publish after our multi-editor review process.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      ))}

      <section className="pb-24">
        <div className="container-site">
          <Stagger className="grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <StaggerItem key={r.slug}>
                <HoverLift className="h-full">
                  <Link
                    href={`/reviews/${r.slug}`}
                    className="glass-card group flex h-full flex-col overflow-hidden !rounded-2xl"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-ember-600">
                        {r.category}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-bold leading-snug">
                        {r.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm text-pine-900/70">
                        {r.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-pine-900/10 pt-4 text-sm">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-pine-700">
                          <Clock size={14} />
                          {r.readTime}
                        </span>
                        <span className="font-semibold text-ember-600">Read →</span>
                      </div>
                    </div>
                  </Link>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
