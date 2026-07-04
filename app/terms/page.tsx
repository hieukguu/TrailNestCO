import type { Metadata } from "next";
import { ProsePage } from "@/components/prose-page";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the TrailNestCo website.",
};

export default function TermsPage() {
  return (
    <ProsePage kicker="Legal" title="Terms of Service" updated="2026">
      <p>
        By accessing {site.url.replace("https://", "")}, you agree to these
        terms.
      </p>
      <h2>Use of content</h2>
      <p>
        Content is for personal, non-commercial use. Brief quotations with
        attribution and a link back are welcome; wholesale reproduction is not.
      </p>
      <h2>No professional advice</h2>
      <p>
        Our content is general information, not professional or safety advice.
        Always follow manufacturer instructions for any product we cover.
      </p>
      <h2>Accuracy &amp; third-party links</h2>
      <p>
        Pricing and availability shown via retailer links are controlled by the
        retailer and change without notice. We are not responsible for
        third-party sites.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {site.company} is not liable
        for indirect or consequential damages arising from use of this site.
      </p>
      <h2>Contact</h2>
      <p>
        Questions: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </ProsePage>
  );
}
