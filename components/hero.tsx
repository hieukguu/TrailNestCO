"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { HeroSlider } from "@/components/hero-slider";
import { reviewArticles } from "@/lib/articles";

const ease = [0.16, 1, 0.3, 1] as const;

const ketlSlide = {
  slug: "ketlmtn-review",
  type: "review" as const,
  title: "KETL Mtn. — The Best-Kept Secret in Outdoor Apparel",
  category: "Brand Spotlight",
  excerpt: "Lifetime repairs, no swoosh fabric, and technical shorts & pants that outperform brands twice the price. An independent deep-dive.",
  readTime: "12 min read",
  image: "https://ketlmtn.com/cdn/shop/files/KETL-Sun-Hoodie-Comparison-Hero-Desktop_344adb31-adc5-4845-970b-9739c9fb9365.jpg?v=1773264796&width=2600",
  alt: "KETL Mtn. outdoor apparel collection — brand review",
  href: "/ketlmtn-review.html",
};

const sunjoySlide = {
  slug: "sunjoy-review",
  type: "review" as const,
  title: "Sunjoy — Hampton 12×16 Cedar Gazebo, Pergolas & Patio Swings",
  category: "Brand Spotlight",
  excerpt: "10 million backyards built. The Hampton hardtop gazebo survives rain, snow, and UV with a dual-tier steel roof over premium cedar — starting at $1,717.",
  readTime: "15 min read",
  image: "https://sunjoyshop.com/cdn/shop/files/SUNJOY_12x16_Wooden_Gazebo_A102032660_26H1_world_cup.webp?v=1775803685&width=2000",
  alt: "Sunjoy Hampton 12x16 Double-Roof Cedar Gazebo — outdoor family living",
  href: "/sunjoy-review.html",
};

const outdoorMasterSlide = {
  slug: "outdoormaster-review",
  type: "review" as const,
  title: "OutdoorMaster — SHARK 3 Pump, MIPS Helmets & ZEISS Sunglasses",
  category: "Brand Spotlight",
  excerpt: "The fastest electric SUP pump on the market, MIPS-certified helmets from $55, and ZEISS-lens sunglasses under $160. Full brand review.",
  readTime: "14 min read",
  image: "https://outdoormaster.com/cdn/shop/files/OutdoorMaster-RHINO_MIPS_Full_Face_Bike_Helmets-Pearl_White-01.webp?width=2000",
  alt: "OutdoorMaster RHINO MIPS Full Face Bike Helmet — brand review",
  href: "/outdoormaster-review.html",
};

const sliderArticles = [
  ketlSlide,
  outdoorMasterSlide,
  sunjoySlide,
  ...reviewArticles.map((a) => ({
    slug: a.slug,
    type: a.type,
    title: a.title,
    category: a.category,
    excerpt: a.excerpt,
    readTime: a.readTime,
    image: a.image,
    alt: a.alt,
  })),
];

const brands = ["Osprey", "YETI", "Roborock", "Salomon", "Petzl", "MSR"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-pine-950 pt-[var(--header-h)]">
      {/* Subtle texture overlay */}
      <div className="dark-shapes absolute inset-0 pointer-events-none" />

      <div className="container-site relative z-10 flex flex-col items-center pb-12 pt-14 text-center sm:pt-20">

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm"
        >
          <ShieldCheck size={13} className="text-ember-400" />
          Independent Gear Reviews · Zero Pay-to-Play
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-7 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
        >
          Independent Research.
          <br className="hidden sm:block" />{" "}
          <span className="text-ember-400">Honest Advice.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          Independent product reviews, comparisons and buying guides for
          camping &amp; outdoor, home essentials, and travel &amp; EDC.
        </motion.p>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32, ease }}
          className="mt-12 w-full max-w-5xl"
        >
          <HeroSlider articles={sliderArticles} />
        </motion.div>
      </div>

      {/* Brand strip */}
      <div className="relative z-10 border-t border-white/8">
        <div className="container-site flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-7">
          <span className="mr-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
            Brands reviewed
          </span>
          {brands.map((b) => (
            <span
              key={b}
              className="font-display text-[15px] font-bold tracking-wider text-white/50 transition-colors hover:text-white/80"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
