import type { Metadata } from "next";
import { ProsePage } from "@/components/prose-page";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "How TrailNestCo earns money, in plain language.",
};

export default function AffiliateDisclosurePage() {
  return (
    <ProsePage kicker="Disclosure" title="Affiliate Disclosure" updated="2026">
      <p>
        {site.name} is reader-supported. Some links on this site are affiliate
        links: if you click one and make a qualifying purchase, we may earn a
        commission at no additional cost to you.
      </p>
      <h2>What this means in practice</h2>
      <p>
        In accordance with FTC guidelines on endorsements and testimonials, we
        disclose that we participate in affiliate programs with retailers and
        affiliate networks. The price you pay is the same whether or not you
        use our links.
      </p>
      <h2>What never changes</h2>
      <ul>
        <li>
          Our rankings and ratings, which are determined by testing — never by
          commission rates.
        </li>
        <li>
          Whether we recommend a product at all. We publish criticism and
          &ldquo;don&apos;t buy&rdquo; guidance regardless of affiliate
          availability.
        </li>
        <li>
          Our update policy: guides are revised when products change, not when
          a partner asks.
        </li>
      </ul>
      <h2>Questions</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> with any
        question about how a specific article is monetized.
      </p>
    </ProsePage>
  );
}
