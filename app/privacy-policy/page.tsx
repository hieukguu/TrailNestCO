import type { Metadata } from "next";
import { ProsePage } from "@/components/prose-page";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What data TrailNestCo collects and how it is used.",
  alternates: { canonical: "https://www.trailnestco.com/privacy-policy/" },
};

export default function PrivacyPolicyPage() {
  return (
    <ProsePage kicker="Privacy" title="Privacy Policy" updated="2026">
      <p>
        This policy explains what information {site.company} (&ldquo;we,&rdquo;
        &ldquo;us&rdquo;) collects and why.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>You provide:</strong> name and email if you subscribe to our
          newsletter or contact us.
        </li>
        <li>
          <strong>Collected automatically:</strong> IP address, browser and
          device type, pages visited — via cookies, for analytics and affiliate
          attribution.
        </li>
      </ul>
      <h2>Cookies</h2>
      <p>
        We use cookies for essential functionality, analytics, and affiliate
        tracking (so retailers can attribute a purchase to a referral from our
        site). You can control cookies in your browser settings.
      </p>
      <h2>Your rights</h2>
      <p>
        Depending on your location, you may have the right to access, correct,
        delete, or export your personal data. Contact{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> to exercise these
        rights.
      </p>
      <h2>Contact</h2>
      <p>
        {site.company}, {site.address}
      </p>
    </ProsePage>
  );
}
