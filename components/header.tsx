"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white border-b border-stone-200 transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="TrailNestCo home">
          <Mountain size={19} strokeWidth={2} className="text-ember-600" />
          <span className="font-display text-[18px] font-bold text-pine-950 tracking-tight">
            TrailNestCo
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {/* Reviews dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setReviewsOpen(true)}
              onMouseLeave={() => setReviewsOpen(false)}
            >
              <button className="flex items-center gap-1 rounded-md px-4 py-2 text-[14px] font-medium text-pine-600 transition-colors hover:bg-stone-100 hover:text-pine-950">
                Reviews
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-150 ${reviewsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {reviewsOpen && (
                <div className="absolute left-0 top-full mt-1 w-52 overflow-hidden rounded-lg border border-stone-200 bg-white py-1.5 shadow-lg">
                  <Link
                    href="/reviews"
                    className="block px-4 py-2.5 text-[13px] font-semibold text-pine-950 transition-colors hover:bg-stone-50"
                  >
                    All Reviews
                  </Link>
                  <div className="mx-3 my-1 border-t border-stone-100" />
                  {categories.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block px-4 py-2 text-[13px] text-pine-600 transition-colors hover:bg-stone-50 hover:text-pine-950"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-md px-4 py-2 text-[14px] font-medium text-pine-600 transition-colors hover:bg-stone-100 hover:text-pine-950"
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
            className="hidden md:inline-flex items-center rounded-md bg-pine-950 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-pine-800"
          >
            All Reviews
          </Link>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md text-pine-600 hover:bg-stone-100 lg:hidden"
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
          className="border-t border-stone-200 bg-white lg:hidden"
        >
          <ul className="container-site flex flex-col py-3">
            <li className="border-b border-stone-100">
              <Link
                href="/reviews"
                onClick={() => setOpen(false)}
                className="block py-3.5 text-[15px] font-semibold text-pine-950"
              >
                All Reviews
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.href} className="border-b border-stone-100">
                <Link
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 pl-4 text-[14px] text-pine-600"
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
                  className="block py-3.5 text-[15px] font-medium text-pine-800"
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