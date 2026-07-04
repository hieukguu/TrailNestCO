"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Mountain } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/about", label: "About" },
  { href: "/reviews#camping-outdoor", label: "Camping & Outdoor" },
  { href: "/reviews#home-essentials", label: "Home Essentials" },
  { href: "/reviews#travel-edc", label: "Travel & EDC" },
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-pine-950 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : ""
      }`}
    >
      <div className="container-site flex h-[var(--header-h)] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="TrailNestCo home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ember-500 text-pine-950">
            <Mountain size={18} strokeWidth={2.4} />
          </span>
          <span className="font-display text-lg font-bold uppercase tracking-wide text-white">
            TrailNestCo
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href + l.label}>
                <Link
                  href={l.href}
                  className="text-sm font-medium text-white/85 transition-colors hover:text-ember-400"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/reviews" className="btn-white hidden !min-h-[42px] !px-6 !py-2.5 md:inline-flex">
            All Reviews
          </Link>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-pine-950 lg:hidden"
          >
            <ul className="container-site flex flex-col py-3">
              {links.map((l) => (
                <li key={l.href + l.label} className="border-b border-white/5 last:border-0">
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3.5 text-[15px] font-medium text-white/90"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
