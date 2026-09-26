"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Mountain, ChevronDown } from "lucide-react";

const categories = [
  { href: "/categories/camping-outdoor/", label: "Camping & Outdoor" },
  { href: "/categories/home-essentials/", label: "Home Essentials" },
  { href: "/categories/travel-edc/", label: "Travel & EDC" },
];

const links = [
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const reviewsRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!reviewsOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!reviewsRef.current?.contains(event.target as Node)) {
        setReviewsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setReviewsOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [reviewsOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-stone-200/90 bg-sand-50/95 transition-shadow duration-200 supports-[backdrop-filter]:backdrop-blur-xl ${
        scrolled ? "shadow-[0_8px_30px_rgba(16,29,23,0.08)]" : ""
      }`}
    >
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="group flex min-h-11 shrink-0 items-center gap-2.5 rounded-md" aria-label="TrailNestCo home">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-pine-950/10 bg-pine-950 text-ember-400 transition-colors group-hover:bg-pine-800">
            <Mountain size={17} strokeWidth={1.8} />
          </span>
          <span className="font-display text-[18px] font-bold tracking-tight text-pine-950">
            TrailNestCo
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {/* Reviews dropdown */}
            <li
              ref={reviewsRef}
              className="relative"
              onMouseEnter={() => setReviewsOpen(true)}
              onMouseLeave={() => setReviewsOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={reviewsOpen}
                onClick={() => setReviewsOpen(true)}
                className="flex min-h-11 items-center gap-1 rounded-md px-4 py-2 text-[14px] font-medium text-pine-700 transition-colors hover:bg-pine-50 hover:text-pine-950"
              >
                Reviews
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-150 ${reviewsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {reviewsOpen && (
                <div className="absolute left-0 top-full w-56 pt-1.5">
                  <div className="overflow-hidden rounded-xl border border-stone-200 bg-white py-2 shadow-[0_20px_45px_rgba(16,29,23,0.14)]">
                    <Link
                      href="/reviews"
                      className="block px-4 py-3 text-[13px] font-semibold text-pine-950 transition-colors hover:bg-pine-50"
                    >
                      All Reviews
                    </Link>
                    <div className="mx-3 my-1 border-t border-stone-100" />
                    {categories.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-4 py-2.5 text-[13px] text-pine-700 transition-colors hover:bg-pine-50 hover:text-pine-950"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-11 items-center rounded-md px-4 py-2 text-[14px] font-medium text-pine-700 transition-colors hover:bg-pine-50 hover:text-pine-950"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link
            href="/reviews"
            className="hidden min-h-11 items-center rounded-lg bg-pine-950 px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-pine-800 md:inline-flex"
          >
            All Reviews
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-pine-700 transition-colors hover:bg-pine-50 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          aria-label="Mobile"
          className="max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-stone-200 bg-sand-50 lg:hidden"
        >
          <ul className="container-site flex flex-col py-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <li className="border-b border-stone-100">
              <Link
                href="/reviews"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center py-3 text-[15px] font-semibold text-pine-950"
              >
                All Reviews
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.href} className="border-b border-stone-100">
                <Link
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center py-3 pl-4 text-[14px] text-pine-700"
                >
                  {c.label}
                </Link>
              </li>
            ))}
            {links.map((l) => (
              <li key={l.href} className="border-b border-stone-100 last:border-0">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center py-3 text-[15px] font-medium text-pine-800"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
