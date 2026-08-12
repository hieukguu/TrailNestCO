export const site = {
  name: "TrailNestCo",
  tagline: "Explore More. Live Better.",
  description:
    "Independent product reviews, comparisons and buying guides. Camping & outdoor, home essentials, and travel & EDC — zero pay-to-play.",
  url: "https://www.trailnestco.com",
  company: "Arrow Group LLC",
  address: "17224 S. Figueroa Street, #E8917, Gardena, CA 90248, USA",

  email: "contact@trailnestco.com",
  founded: 2022,
};

export const categories = [
  {
    slug: "camping-outdoor",
    name: "Camping & Outdoor",
    blurb: "Tents, sleep systems, camp cooking, lighting, and hiking gear — researched and compared.",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&q=70&auto=format&fit=crop",
    alt: "Illuminated tent under a starry night sky",
  },
  {
    slug: "home-essentials",
    name: "Home Essentials",
    blurb: "Air fryers, robot vacuums, and storage systems that earn their counter space.",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&q=70&auto=format&fit=crop",
    alt: "Bright modern kitchen with cookware and fresh produce",
  },
  {
    slug: "travel-edc",
    name: "Travel & EDC",
    blurb: "Everyday carry and travel essentials that survive more than one trip.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=70&auto=format&fit=crop",
    alt: "Travel backpack product shot against a minimal white wall",
  },
] as const;

import { guideArticles, reviewArticles } from "./articles";

export const reviews = reviewArticles.map((a) => ({
  slug: a.slug,
  type: a.type,
  title: a.title,
  category: a.category,
  excerpt: a.excerpt,
  readTime: a.readTime,
  image: a.image,
  alt: a.alt,
}));

export const featuredGuide = {
  slug: "best-camping-tents-review",
  title: "Best Camping Tents of 2026: 6 Models Reviewed & Compared",
  excerpt:
    "Our flagship review: six 3-season tents evaluated on weather resistance, weight, setup, and value — updated as products change or sell out.",
  image:
    "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1400&q=70&auto=format&fit=crop",
  alt: "Hiker standing at a mountain summit at sunrise",
};

export const guides = guideArticles.map((a) => ({
  slug: a.slug,
  title: a.title,
  category: a.category,
}));

export const editorialProcess = [
  { label: "Research basis", detail: "Product specifications, manufacturer data and publicly available product information." },
  { label: "Comparisons", detail: "Products are evaluated side-by-side on relevant criteria for each category." },
  { label: "Accuracy", detail: "Specs are verified against manufacturer data before publication." },
  { label: "Updates", detail: "Guides are revised when products change, are revised, or become unavailable." },
] as const;

export const principles = [
  {
    title: "Independent research",
    body: "Content is grounded in product specifications, manufacturer data, and editorial research — not brand talking points.",
  },
  {
    title: "Zero pay-to-play",
    body: "We never accept payment for favorable coverage. Rankings are determined by research criteria, not commission rates.",
  },
  {
    title: "Editorial accuracy",
    body: "Specifications are verified against manufacturer data before publication. Corrections are noted transparently, not silently edited.",
  },
  {
    title: "Guides that stay alive",
    body: "We update our guides when products change, get revised, or become unavailable — not once a year.",
  },
] as const;
