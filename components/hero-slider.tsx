"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SliderArticle {
  slug: string;
  type: "review" | "guide";
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  image: string;
  alt: string;
  href?: string; // custom override URL
}

interface HeroSliderProps {
  articles: SliderArticle[];
}

/* Renders <a> for raw .html hrefs (bypasses Next.js trailingSlash) or <Link> otherwise */
function SlideLink({
  href,
  tabIndex,
  children,
}: {
  href: string;
  tabIndex: number;
  children: React.ReactNode;
}) {
  const cls = "absolute inset-0 flex cursor-pointer flex-col justify-end p-5 pb-12 min-[390px]:p-6 min-[390px]:pb-12 sm:p-10 lg:p-12";
  if (href.endsWith(".html")) {
    return (
      <a href={href} className={cls} tabIndex={tabIndex}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} tabIndex={tabIndex}>
      {children}
    </Link>
  );
}

export function HeroSlider({ articles }: HeroSliderProps) {
  const autoplay = useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 28 },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, setCanScrollPrev] = useState(false);
  const [, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncAutoplay = () => {
      if (reducedMotion.matches) autoplay.current.stop();
      else autoplay.current.play();
    };
    syncAutoplay();
    reducedMotion.addEventListener("change", syncAutoplay);
    return () => reducedMotion.removeEventListener("change", syncAutoplay);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <div className="relative w-full overflow-hidden rounded-[16px] border border-white/10 bg-pine-900 shadow-[0_28px_70px_rgba(4,12,8,0.42)] sm:rounded-[22px]">
      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {articles.map((article, i) => {
            const href = article.href
              ?? (article.type === "review"
                ? `/reviews/${article.slug}`
                : `/guides/${article.slug}`);

            return (
              <div
                key={article.slug}
                className="relative min-w-0 flex-[0_0_100%] aspect-[4/5] min-[430px]:aspect-[4/3] sm:aspect-[16/9]"
              >
                {/* Ken Burns image */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: selectedIndex === i ? 1.07 : 1.0 }}
                  transition={{ duration: 6, ease: "linear" }}
                >
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                    className="object-cover"
                    priority={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </motion.div>

                {/* Multi-layer gradient: bottom-heavy for text, subtle top vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/15" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                {/* Content */}
                <SlideLink href={href} tabIndex={selectedIndex === i ? 0 : -1}>
                  <AnimatePresence mode="wait">
                    {selectedIndex === i && (
                      <motion.div
                        key={article.slug}
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-2xl"
                      >
                        {/* Badges */}
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center rounded-full bg-ember-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-pine-950">
                            {article.type === "review" ? "Review" : "Guide"}
                          </span>
                          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/90 backdrop-blur-sm">
                            {article.category}
                          </span>
                          <span className="hidden sm:inline-flex items-center rounded-full border border-white/20 bg-white/8 px-3 py-1 text-[10px] font-medium text-white/65 backdrop-blur-sm">
                            {article.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-xl font-bold leading-snug text-white drop-shadow-sm sm:text-2xl lg:text-[28px] lg:leading-tight">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="mt-3 hidden text-sm leading-relaxed text-white/75 sm:line-clamp-2 sm:block sm:text-[15px]">
                          {article.excerpt}
                        </p>

                        {/* CTA */}
                        <motion.div
                          className="mt-5 inline-flex"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-pine-950 shadow-lg transition-all hover:bg-ember-400">
                            Read Review
                            <ArrowRight size={14} />
                          </span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </SlideLink>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide counter — top right */}
      <div className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[11px] font-bold tabular-nums text-white/90 backdrop-blur-sm sm:right-5 sm:top-5">
        {selectedIndex + 1} / {articles.length}
      </div>

      {/* Prev/Next arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-black/55 sm:left-6 sm:flex sm:h-12 sm:w-12"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-black/55 sm:right-6 sm:flex sm:h-12 sm:w-12"
      >
        <ChevronRight size={20} />
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-3 left-1/2 z-10 flex min-h-11 -translate-x-1/2 items-center gap-1 sm:bottom-4 sm:gap-1.5">
        {articles.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`flex h-11 min-w-7 items-center justify-center rounded-full transition-all duration-300 before:block before:h-2 before:rounded-full before:content-[''] ${
              i === selectedIndex
                ? "w-9 before:w-7 before:bg-ember-400"
                : "w-5 before:w-2 before:bg-white/50 hover:before:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
