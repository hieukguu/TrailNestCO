import type { Metadata } from "next";
import { ProsePage } from "@/components/prose-page";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Editorial Policy",
  alternates: { canonical: "https://www.trailnestco.com/editorial-policy/" },
  description:
    "The standards that govern every review and guide published on TrailNestCo.",
};

export default function EditorialPolicyPage() {
  return (
    <ProsePage kicker="Standards" title="Editorial Policy" updated="2026">
      <p>
        This policy governs how {site.name} content is researched, written,
        and published, independent of any commercial relationship.
      </p>
      <h2>Independence</h2>
      <p>
        What we cover, how we evaluate it, and what we publish is decided
        independently of any brand or affiliate partner. No brand can review,
        approve, or veto content before publication. We never accept payment
        for favorable coverage.
      </p>
      <h2>Research &amp; accuracy</h2>
      <p>
        Our content is researched and written based on publicly available
        product information, manufacturer specifications, and editorial
        analysis. Specifications are checked against manufacturer data, and
        guides are updated when products are revised or become unavailable.
      </p>
      <h2 id="fact-checking">Corrections</h2>
      <p>
        If we get something wrong, we correct it and note the correction — we
        do not silently edit factual errors. Report suspected errors to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <h2>Affiliate relationships</h2>
      <p>
        Commission rates are never a factor in scoring or ranking. See our{" "}
        <a href="/affiliate-disclosure">Affiliate Disclosure</a> for details.
      </p>
    </ProsePage>
  );
}
