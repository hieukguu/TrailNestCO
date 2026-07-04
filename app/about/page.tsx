import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { principles, site, team } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "TrailNestCo was founded in 2022 on one principle: gear advice should come from people who actually use the products.",
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
            <span className="kicker !text-ember-400">Est. {site.founded} · Wilmington, DE</span>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Gear advice from people who actually use the products.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-sand-100/80">
              Not from whoever pays the highest commission. That principle
              founded {site.name} in {site.founded}, and it still decides every
              ranking we publish.
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
                {site.name} takes a different approach: real-world testing by
                experienced editors, specifications verified against
                manufacturer data, and guides that get updated when products
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
              <h3 className="font-display text-xl font-bold">The team</h3>
              <ul className="mt-5 divide-y divide-pine-900/10">
                {team.map((t) => (
                  <li key={t.name} className="flex items-center justify-between gap-4 py-3.5">
                    <span className="font-semibold">{t.name}</span>
                    <span className="text-right text-sm text-pine-900/60">
                      {t.role}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-pine-900/60">
                Every contributor&apos;s full bio, expertise, and published
                work is listed on their author page.
              </p>
            </div>
          </FadeIn>
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
                  <p className="text-pine-900/70">{site.phone}</p>
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
