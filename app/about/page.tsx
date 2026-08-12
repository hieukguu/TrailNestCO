import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { editorialProcess, principles, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "About TrailNestCo — Independent Gear Research",
  description:
    "TrailNestCo is an independent affiliate publication owned by Arrow Group LLC. We publish product research, comparisons and buying guides grounded in specifications and editorial analysis.",
  alternates: { canonical: "https://www.trailnestco.com/about/" },
  openGraph: {
    title: "About TrailNestCo — Independent Gear Research",
    description: "Independent product research, comparisons and buying guides — owned by Arrow Group LLC.",
    url: "https://www.trailnestco.com/about/",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-pine-950 pb-24 pt-[calc(var(--header-h)+72px)]">
        <Image
          src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1800&q=70&auto=format&fit=crop"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-950/60 to-pine-950" />
        <div className="container-site relative z-10">
          <FadeIn>
            <span className="kicker !text-ember-400">Est. {site.founded} · Gardena, CA</span>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Independent product research, reviews and buying guides.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-sand-100/80">
              Not from whoever pays the highest commission. That principle has
              guided {site.name} since {site.founded} and still decides every
              recommendation we publish.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="container-site grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <FadeIn>
            <span className="kicker">Our Story</span>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Why we exist
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-pine-900/75">
              <p>
                The gear market is oversaturated with untested &ldquo;best
                of&rdquo; lists that rarely receive updates. Products get
                revised, discontinued, or replaced — and the lists stay frozen.
              </p>
              <p>
                {site.name} takes a different approach: independent research
                grounded in product specifications, manufacturer data, and
                editorial analysis — with guides that get updated when products
                change or become unavailable.
              </p>
              <p>
                We cover camping &amp; outdoor gear, everyday home essentials,
                travel &amp; everyday carry, and fitness &amp; outdoor
                accessories. We&apos;re reader-supported through affiliate
                commissions — and that revenue never determines which products
                we recommend or how we rank them.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="glass-card !rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold">Editorial process</h3>
              <ul className="mt-5 divide-y divide-pine-900/10">
                {editorialProcess.map((item) => (
                  <li key={item.label} className="py-3.5">
                    <p className="text-xs font-bold uppercase tracking-widest text-pine-400">{item.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-pine-900/70">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Business Transparency ─────────────────────────────────── */}
      <section className="border-t border-stone-200 bg-stone-50 py-16">
        <div className="container-site max-w-3xl">
          <span className="kicker">Business Information</span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-pine-950">
            About this publication
          </h2>
          <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-pine-700">
            <p>
              TrailNestCo is an independent product review and affiliate publishing website owned and operated by Arrow Group LLC.
            </p>
            <p>
              We publish product reviews, buying guides, comparisons, and other editorial content designed to help readers research products and make informed purchasing decisions.
            </p>
            <p>
              Our website, content operations, advertising campaigns, and affiliate partnerships are managed on behalf of Arrow Group LLC.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-pine-900 to-pine-950 py-20">
        <div className="container-site">
          <FadeIn>
            <span className="kicker !text-ember-400">Editorial Standards</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white">
              What we will never compromise on
            </h2>
          </FadeIn>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="glass h-full rounded-2xl p-6">
                  <span className="font-display text-3xl font-bold text-ember-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sand-100/70">
                    {p.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="write-for-us" className="scroll-mt-24 py-20">
        <div className="container-site">
          <FadeIn>
            <div className="glass-card !rounded-3xl p-10 sm:p-14">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <span className="kicker">Contact</span>
                  <h2 className="font-display text-3xl font-bold tracking-tight">
                    Work with us
                  </h2>
                  <p className="mt-3 max-w-md text-pine-900/70">
                    Pitching a story, reporting a correction, or interested in
                    writing for us? We answer every serious inquiry.
                  </p>
                </div>
                <div className="space-y-2 text-[15px] lg:text-right">
                  <p className="font-semibold">{site.company}</p>
                  <p className="text-pine-900/70">{site.address}</p>

                  <p>
                    <a
                      href={`mailto:${site.email}`}
                      className="font-semibold text-ember-600 underline-offset-4 hover:underline"
                    >
                      {site.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
