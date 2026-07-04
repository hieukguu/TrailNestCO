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
  { href: "/reviews#camping-outdoor", label: "Camping & Outdoor" },
  { href: "/reviews#home-essentials", label: "Home Essentials" },
  { href: "/reviews#travel-edc", label: "Travel & EDC" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pine-950 text-ember-500">
              <Mountain size={18} strokeWidth={2.4} />
            </span>
            <span className="font-display text-lg font-bold uppercase tracking-wide text-pine-950">
              {site.name}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-pine-500">
            {site.tagline} — independent gear reviews built on hands-on testing
            since {site.founded}.
          </p>
        </div>

        <nav aria-label="Quick Links">
          <h3 className="font-display text-base font-semibold text-pine-950">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-sm text-pine-500 transition-colors hover:text-pine-950"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Categories & Legal">
          <h3 className="font-display text-base font-semibold text-pine-950">
            Categories
          </h3>
          <ul className="mt-4 space-y-2.5">
            {categoryLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-sm text-pine-500 transition-colors hover:text-pine-950"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-base font-semibold text-pine-950">
            Get the Latest Field Notes
          </h3>
          <form
            className="mt-4"
            action="https://formspree.io/f/xlgywbjn"
            method="POST"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email *"
              className="min-h-[46px] w-full rounded-lg border border-pine-200 bg-white px-4 text-sm text-pine-950 placeholder:text-pine-400 focus:border-pine-950 focus:outline-none"
            />
            <input type="hidden" name="_subject" value="Newsletter signup — trailnestco.com" />
            <input type="hidden" name="form_type" value="newsletter" />
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <button
              type="submit"
              className="mt-3 w-full rounded-lg bg-pine-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-pine-800"
            >
              Subscribe Now
            </button>
          </form>
          <p className="mt-3 text-xs leading-relaxed text-pine-400">
            {site.address} · {site.phone}
          </p>
        </div>
      </div>

      <div className="container-site">
        <div className="border-t border-pine-200 py-6">
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-pine-400">
            {site.name} is reader-supported. When you buy through links on our
            site, we may earn an affiliate commission at no extra cost to you —
            this never determines which products we recommend or how we rank
            them. Copyright © {new Date().getFullYear()} {site.company}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
