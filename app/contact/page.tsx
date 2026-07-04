import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the TrailNestCo team — corrections, partnership inquiries, press, or writing for us.",
};

/**
 * Formspree endpoint.
 * Replace YOUR_FORM_ID with the ID from your Formspree dashboard
 * (https://formspree.io → New Form → copy the /f/xxxx endpoint).
 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgywbjn";

const contactItems = [
  { Icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { Icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, "")}` },
  { Icon: MapPin, label: "Office", value: site.address },
];

export default function ContactPage() {
  return (
    <>
      {/* Dark hero */}
      <section className="dark-shapes bg-pine-950 pb-16 pt-[calc(var(--header-h)+64px)]">
        <div className="container-site text-center">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-ember-500">
              Contact
            </span>
            <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Let&apos;s Talk Gear
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Corrections, partnership inquiries, press, or pitching a story —
              we answer every serious message.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Contact info */}
          <FadeIn>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Reach us directly
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-pine-500">
              We aim to reply within 2 business days. For corrections, include
              the article URL so we can verify quickly.
            </p>
            <ul className="mt-8 space-y-6">
              {contactItems.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pine-950 text-ember-500">
                    <Icon size={19} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-pine-400">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block font-semibold text-pine-950 underline-offset-4 hover:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 max-w-xs font-semibold text-pine-950">
                        {value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Formspree form */}
          <FadeIn delay={0.12}>
            <form
              action={FORMSPREE_ENDPOINT}
              method="POST"
              className="glass-card p-8 sm:p-10"
            >
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Send us a message
              </h2>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
                    Full name <span className="text-ember-600">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className="min-h-[48px] w-full rounded-xl border border-pine-200 bg-white px-4 text-sm text-pine-950 placeholder:text-pine-300 focus:border-pine-950 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
                    Email <span className="text-ember-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="min-h-[48px] w-full rounded-xl border border-pine-200 bg-white px-4 text-sm text-pine-950 placeholder:text-pine-300 focus:border-pine-950 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="topic" className="mb-1.5 block text-sm font-semibold">
                  Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  defaultValue="General question"
                  className="min-h-[48px] w-full rounded-xl border border-pine-200 bg-white px-4 text-sm text-pine-950 focus:border-pine-950 focus:outline-none"
                >
                  <option>General question</option>
                  <option>Correction report</option>
                  <option>Partnership inquiry</option>
                  <option>Press request</option>
                  <option>Write for us</option>
                </select>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">
                  Message <span className="text-ember-600">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="How can we help?"
                  className="w-full rounded-xl border border-pine-200 bg-white px-4 py-3 text-sm text-pine-950 placeholder:text-pine-300 focus:border-pine-950 focus:outline-none"
                />
              </div>

              {/* Formspree config + spam honeypot */}
              <input type="hidden" name="_subject" value="New message from trailnestco.com" />
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <button type="submit" className="btn-primary mt-7 w-full sm:w-auto">
                Send Message
              </button>
              <p className="mt-4 text-xs leading-relaxed text-pine-400">
                This form is powered by Formspree. By submitting, you agree to
                our{" "}
                <a href="/privacy-policy" className="underline underline-offset-2">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
