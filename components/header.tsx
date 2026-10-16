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
      className={`fixed inset-x-0 top-0 z-50 border-b border-pine-950/10 bg-[#f7f8f2]/90 transition-all duration-300 supports-[backdrop-filter]:backdrop-blur-xl ${
        scrolled ? "border-pine-950/15 bg-[#f7f8f2]/96 shadow-[0_10px_30px_rgba(16,29,23,0.07)]" : ""
      }`}
    >
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="group flex min-h-11 shrink-0 items-center gap-3 rounded-md" aria-label="TrailNestCo home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pine-950 text-lime-300 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
            <Mountain size={17} strokeWidth={1.8} />
          </span>
          <span className="font-sans text-[14px] font-black uppercase tracking-[-0.04em] text-pine-950 sm:text-[15px]">
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
                className="flex min-h-11 items-center gap-1 rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-pine-700 transition-colors hover:bg-pine-950 hover:text-lime-300"
              >
                Reviews
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-150 ${reviewsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {reviewsOpen && (
                <div className="absolute left-0 top-full w-56 pt-1.5">
                  <div className="overflow-hidden rounded-2xl border border-pine-950/10 bg-white py-2 shadow-[0_20px_45px_rgba(16,29,23,0.14)]">
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
                  className="inline-flex min-h-11 items-center rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-pine-700 transition-colors hover:bg-pine-950 hover:text-lime-300"
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
            className="hidden min-h-11 items-center rounded-full bg-pine-950 px-5 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-lime-300 hover:text-pine-950 md:inline-flex"
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
