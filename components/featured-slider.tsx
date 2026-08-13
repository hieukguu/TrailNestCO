"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export interface FeaturedBrand {
  id: string;
  kicker: string;
  title: string;
  excerpt: string;
  readTime: string;
  /** Landing page on TrailNestCo */
  href: string;
  /** Outbound affiliate shop link */
  shopHref: string;
  shopLabel: string;
  image: string;
  alt: string;
}

const AUTOPLAY_MS = 6000;

export function FeaturedSlider({ brands }: { brands: FeaturedBrand[] }) {
  // Autoplay pauses on hover and on keyboard focus, and never fights the user.
  const autoplay = useRef(
    Autoplay({
      delay: AUTOPLAY_MS,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 26 }, [
    autoplay.current,
  ]);

  const [selected, setSelected] = useState(0);

  // `playing` is the reader's stated intent, not embla's transient state —
  // hovering the carousel pauses autoplay internally, and the button label
  // should not flicker every time the pointer crosses it.
  const [playing, setPlaying] = useState(true);
  const playingRef = useRef(true);
  const setIntent = useCallback((next: boolean) => {
    playingRef.current = next;
    setPlaying(next);
  }, []);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Embla resumes autoplay on mouse-leave. If the reader has explicitly
  // paused, undo that so their choice sticks.
  useEffect(() => {
    if (!emblaApi) return;
    const guard = () => {
      if (!playingRef.current) emblaApi.plugins()?.autoplay?.stop();
    };
    emblaApi.on("autoplay:play", guard);
    return () => {
      emblaApi.off("autoplay:play", guard);
    };
  }, [emblaApi]);

  // Readers who prefer reduced motion get a static, manually-driven carousel.
  useEffect(() => {
    if (!emblaApi || typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        emblaApi.plugins()?.autoplay?.stop();
        setIntent(false);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [emblaApi, setIntent]);

  const toggle = useCallback(() => {
    const a = emblaApi?.plugins()?.autoplay;
    if (!a) return;
    if (playingRef.current) {
      a.stop();
      setIntent(false);
    } else {
      setIntent(true);
      a.play();
    }
  }, [emblaApi, setIntent]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured brand reviews"
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {brands.map((b, i) => {
            const active = i === selected;
            return (
              <div
                key={b.id}
                className="min-w-0 flex-[0_0_100%]"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${brands.length}: ${b.title}`}
                aria-hidden={!active}
              >
                <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:items-center">
                  {/* Image */}
                  <a
                    href={b.href}
                    className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember-500 rounded-xl"
                    tabIndex={active ? 0 : -1}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={b.image}
                        alt={b.alt}
                        loading={i === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                      <span className="absolute left-4 top-4 rounded border border-white/30 bg-black/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                        Affiliate
                      </span>
                    </div>
                  </a>

                  {/* Editorial */}
                  <div>
                    <span className="kicker">{b.kicker}</span>
                    <h3 className="mt-3 font-display text-3xl font-bold leading-snug text-pine-950 sm:text-4xl">
                      {b.title}
                    </h3>
                    <p className="mt-4 text-[16px] leading-relaxed text-pine-600">
                      {b.excerpt}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-pine-400">
                      <span>TrailNestCo Editorial</span>
                      <span>·</span>
                      <span>{b.readTime}</span>
                      <span>·</span>
                      <span className="font-semibold text-ember-600">
                        Affiliate brand spotlight
                      </span>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={b.href}
                        className="btn-primary"
                        tabIndex={active ? 0 : -1}
                      >
                        Read Full Review <ArrowRight size={14} />
                      </a>
                      <a
                        href={b.shopHref}
                        target="_blank"
                        rel="noopener nofollow sponsored"
                        className="btn-ghost"
                        tabIndex={active ? 0 : -1}
                      >
                        {b.shopLabel}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous featured review"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-pine-600 transition-colors hover:border-pine-950 hover:text-pine-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-500"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next featured review"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-pine-600 transition-colors hover:border-pine-950 hover:text-pine-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-500"
        >
          <ChevronRight size={18} />
        </button>

        {/* Dots */}
        <div className="ml-1 flex items-center gap-2">
          {brands.map((b, i) => (
            <button
              key={b.id}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Show ${b.title}`}
              aria-current={i === selected}
              className="group flex h-11 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-500"
            >
              <span
                className={`block rounded-full transition-all duration-300 motion-reduce:transition-none ${
                  i === selected
                    ? "h-2 w-8 bg-pine-950"
                    : "h-2 w-2 bg-stone-300 group-hover:bg-pine-400"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause automatic rotation" : "Resume automatic rotation"}
          className="ml-auto flex h-11 items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 text-[12px] font-semibold text-pine-500 transition-colors hover:border-pine-950 hover:text-pine-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-500"
        >
          {playing ? <Pause size={13} /> : <Play size={13} />}
          <span className="hidden sm:inline">{playing ? "Pause" : "Play"}</span>
        </button>
      </div>

      {/* Announce slide changes to assistive tech without stealing focus */}
      <p className="sr-only" aria-live="polite">
        {`Slide ${selected + 1} of ${brands.length}: ${brands[selected]?.title ?? ""}`}
      </p>
    </div>
  );
}
