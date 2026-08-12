import Link from "next/link";
import { Mountain } from "lucide-react";
import { site } from "@/lib/data";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "All Reviews" },
  { href: "/guides", label: "Guides" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/contact", label: "Contact" },
];

const categoryLinks = [
  { href: "/categories/camping-outdoor/", label: "Camping & Outdoor" },
  { href: "/categories/home-essentials/", label: "Home Essentials" },
  { href: "/categories/travel-edc/", label: "Travel & EDC" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="bg-pine-950">
      {/* Main grid */}
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">

        {/* Brand col */}
        <div>
          <Link href="/" className="flex items-center gap-2" aria-label="TrailNestCo home">
            <Mountain size={18} strokeWidth={2} className="text-ember-500" />
            <span className="font-display text-[16px] font-bold text-white tracking-tight">
              TrailNestCo
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-white/45">
            {site.tagline} — independent product reviews, comparisons and buying guides since {site.founded}.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Zero sponsored rankings
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Quick Links">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/35">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-[14px] text-white/55 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Categories */}
        <nav aria-label="Categories & Legal">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/35">
            Categories
          </h3>
          <ul className="mt-4 space-y-2.5">
            {categoryLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-[14px] text-white/55 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Newsletter */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/35">
            Field Notes Newsletter
          </h3>
          <p className="mt-3 text-[13px] leading-relaxed text-white/40">
            New reviews, buying guides, and gear intel — straight to your inbox.
          </p>
          <form
            className="mt-4"
            action="https://formspree.io/f/xlgywbjn"
            method="POST"
          >
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Your email address"
              className="min-h-[42px] w-full rounded-md border border-white/10 bg-white/5 px-4 text-[14px] text-white placeholder:text-white/25 focus:border-ember-500 focus:outline-none transition-colors"
            />
            <input type="hidden" name="_subject" value="Newsletter signup — trailnestco.com" />
            <input type="hidden" name="form_type" value="newsletter" />
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <button
              type="submit"
              className="btn-primary mt-3 w-full justify-center"
            >
              Subscribe Free
            </button>
          </form>
          <p className="mt-4 text-[11px] leading-relaxed text-white/25">
            {site.address}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-[12px] text-white/30">
            © {new Date().getFullYear()} {site.name}. Owned and operated by Arrow Group LLC.
          </p>
          <p className="text-[12px] text-white/25 sm:text-right">
            {site.name} is reader-supported. Affiliate commissions never influence our rankings.
          </p>
        </div>
      </div>
    </footer>
  );
}