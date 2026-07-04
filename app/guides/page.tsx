import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { guides } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gear Guides & How-Tos",
  description:
    "Practical, step-by-step guides to help you choose, use, and maintain your gear.",
};

export default function GuidesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-pine-950 pb-20 pt-[calc(var(--header-h)+64px)]">
        <Image
          src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1800&q=70&auto=format&fit=crop"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-950/70 to-pine-950" />
        <div className="container-site relative z-10">
          <FadeIn>
            <span className="kicker !text-ember-400">How-To Guides</span>
            <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Choose, use, and maintain your gear
            </h1>
            <p className="mt-4 max-w-xl text-lg text-sand-100/80">
              Practical, step-by-step guides — from packing a backpack to
              organizing your kitchen cabinets.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="container-site">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <StaggerItem key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="glass-card group flex h-full flex-col justify-between gap-8 !rounded-2xl p-7 transition-colors hover:border-ember-500/40"
                >
                  <div>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-pine-100 text-pine-700">
                      <BookOpen size={20} />
                    </span>
                    <span className="mt-5 block text-[11px] font-bold uppercase tracking-[0.14em] text-pine-900/50">
                      {g.category}
                    </span>
                    <h2 className="mt-2 font-display text-xl font-bold leading-snug">
                      {g.title}
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ember-600">
                    Read guide
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
