import type { Metadata } from "next";
import { ProsePage } from "@/components/prose-page";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "The standards that govern every review and guide published on TrailNestCo.",
};

export default function EditorialPolicyPage() {
  return (
    <ProsePage kicker="Standards" title="Editorial Policy" updated="2026">
      <p>
        This policy governs how the {site.name} editorial team operates,
        independent of any commercial relationship.
      </p>
      <h2>Independence</h2>
      <p>
        What we cover, how we score it, and what we publish is decided
        exclusively by our editors. No brand or affiliate partner can review,
        approve, or veto content before publication. We never accept payment
        for favorable coverage.
      </p>
      <h2>Testing &amp; research</h2>
      <p>
        Every guide goes through hands-on testing or verified research.
        Specifications are checked against manufacturer data, and guides are
        updated when products are revised or become unavailable.
      </p>
      <h2 id="fact-checking">Fact-checking</h2>
      <p>
        Every piece is reviewed by multiple editors before publication. If we
        get something wrong, we correct it and note the correction — we do not
        silently edit factual errors. Report suspected errors to{" "}
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
