import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  FlaskConical,
  Mountain,
  ShieldCheck,
} from "lucide-react";
import { Hero } from "@/components/hero";
import { FadeIn, HoverLift, Stagger, StaggerItem } from "@/components/motion";
import { categories, guides, reviews, site } from "@/lib/data";

const stats = [
  { Icon: FlaskConical, value: "150+", label: "Products tested hands-on" },
  { Icon: Compass, value: "18", label: "In-depth reviews & guides" },
  { Icon: ShieldCheck, value: "0", label: "Paid placements. Ever." },
];

const categoryDetails = [
  {
    ...categories[0],
    points: [
      "Tents, sleep systems, and camp cooking tested on real trips.",
      "Wind, rain, and cold-weather trials — not spec-sheet rewrites.",
      "Updated when products change or sell out.",
    ],
  },
  {
    ...categories[1],
    points: [
      "Air fryers, robot vacuums, and coffee makers tested for weeks.",
      "Measured results: temperatures, runtimes, debris pickup.",
      "Honest trade-offs for every budget tier.",
    ],
  },
  {
    ...categories[2],
    points: [
      "Carry-on packs flown on three airlines before we recommend them.",
      "Bottles, power stations, and EDC that survive real transit.",
      "Airline size limits and packing strategy included.",
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* About — white, 2-col + stats (Web Rocket pattern) */}
      <section className="bg-white py-24">
        <div className="container-site">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <h2 className="max-w-lg font-display text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
                Honest Reviews, Real Trips &amp; Tested Gear for Everyday
                Adventurers.
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-pine-500">
                We&apos;re not your typical review site. Founded in {site.founded},
                we&apos;re a team of editors and testers who believe gear advice
                should come from people who actually use the products — not from
                whoever pays the highest commission. From weekend campers to
                daily commuters, we help readers buy once and buy right.
              </p>
              <Link href="/about" className="btn-ghost mt-8">
                Know More About Us
              </Link>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1000&q=70&auto=format&fit=crop"
                  alt="Tent pitched on a mountainside at sunset during a field test"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>

          <hr className="mt-16 border-pine-200" />

          <Stagger className="mt-12 grid gap-10 sm:grid-cols-3">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="flex items-center gap-5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pine-950 text-white">
                    <s.Icon size={22} />
                  </span>
                  <div>
                    <p className="font-display text-3xl font-semibold">{s.value}</p>
                    <p className="mt-0.5 text-sm text-pine-500">{s.label}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Categories — light gray, numbered white cards */}
      <section className="bg-sand-100 py-24">
        <div className="container-site">
          <FadeIn>
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              What We Cover
            </h2>
          </FadeIn>
          <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
            {categoryDetails.map((c, i) => (
              <StaggerItem key={c.slug}>
                <HoverLift className="h-full">
                  <Link
                    href={`/reviews#${c.slug}`}
                    className="glass-card flex h-full flex-col p-8"
                  >
                    <h3 className="font-display text-xl font-semibold">
                      {i + 1}. {c.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-pine-500">
                      {c.blurb}
                    </p>
                    <ul className="mt-5 space-y-3">
                      {c.points.map((p) => (
                        <li key={p} className="flex gap-2.5 text-sm leading-snug text-pine-600">
                          <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-pine-950" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto pt-6 text-sm font-semibold text-ember-600">
                      Explore category →
                    </span>
                  </Link>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Showcase — black section with image cards */}
      <section className="dark-shapes bg-pine-950 py-24">
        <div className="container-site">
          <FadeIn>
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Fresh From the Test Bench
            </h2>
          </FadeIn>
          <Stagger className="mt-14 grid gap-10 md:grid-cols-2">
            {reviews.slice(0, 4).map((r) => (
              <StaggerItem key={r.slug}>
                <Link href={`/reviews/${r.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                    <Image
                      src={r.image}
                      alt={r.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white transition-colors group-hover:text-ember-400">
                    {r.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/25 px-3 py-1 text-xs font-medium text-white/80">
                      {r.category}
                    </span>
                    <span className="rounded-full border border-white/25 px-3 py-1 text-xs font-medium text-white/80">
                      {r.readTime}
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-14 text-center">
            <Link href="/reviews" className="btn-ghost-light">
              View All Reviews
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Guides — white, numbered cards */}
      <section className="bg-white py-24">
        <div className="container-site">
          <FadeIn>
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              How-To Guides
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-pine-500">
              Practical, step-by-step guides to help you choose, use, and
              maintain your gear.
            </p>
          </FadeIn>
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g, i) => (
              <StaggerItem key={g.slug}>
                <HoverLift className="h-full">
                  <Link
                    href={`/guides/${g.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-pine-200 bg-white p-7 transition-colors hover:border-pine-950"
                  >
                    <span className="font-display text-2xl font-semibold text-pine-300 transition-colors group-hover:text-ember-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-pine-400">
                      {g.category}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug">
                      {g.title}
                    </h3>
                    <span className="mt-auto pt-5 text-sm font-semibold text-ember-600">
                      Read guide →
                    </span>
                  </Link>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA — black centered (Web Rocket "Meet the Minds" pattern) */}
      <section className="dark-shapes bg-pine-950 py-24">
        <div className="container-site flex flex-col items-center text-center">
          <FadeIn className="flex flex-col items-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ember-500 text-pine-950">
              <Mountain size={28} strokeWidth={2.2} />
            </span>
            <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Never Buy Blind Again
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              Start with our tested top picks — every recommendation earned its
              place in the field.
            </p>
            <Link href="/reviews" className="btn-primary mt-8">
              Browse Top Picks <ArrowRight size={16} />
            </Link>
            <p className="mt-10 text-sm font-medium text-white/60">Prefer Email?</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 font-semibold text-white underline underline-offset-4 hover:text-ember-400"
            >
              {site.email}
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
