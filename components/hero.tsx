"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="dark-shapes relative overflow-hidden bg-pine-950 pt-[var(--header-h)]">
      <div className="container-site flex flex-col items-center pb-20 pt-16 text-center sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white"
        >
          <ShieldCheck size={15} className="text-ember-500" />
          Independent Gear Reviews · Zero Pay-to-Play
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Where Real-World Testing
          <br className="hidden sm:block" /> Meets Honest Advice
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          We test camping, home, and travel gear in the field — for people who
          refuse to settle for untested &ldquo;best of&rdquo; lists.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="mt-9"
        >
          <Link href="/reviews" className="btn-primary">
            Browse Top Picks <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Framed showcase image (Web Rocket browser-frame motif) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
          className="mt-16 w-full max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-[28px] border-2 border-pine-600/60 bg-pine-900">
            <div className="relative aspect-[16/8]">
              <Image
                src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=2000&q=75&auto=format&fit=crop"
                alt="Hiker standing at a mountain summit at sunrise during gear testing"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Brand strip */}
      <div className="border-t border-white/10 bg-pine-950">
        <div className="container-site flex flex-wrap items-center justify-center gap-x-12 gap-y-4 py-8 opacity-80">
          {["Osprey", "YETI", "Roborock", "Salomon", "Petzl", "MSR"].map((b) => (
            <span
              key={b}
              className="font-display text-xl font-bold tracking-wide text-white/85"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
