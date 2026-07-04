export const site = {
  name: "TrailNestCo",
  tagline: "Explore More. Live Better.",
  description:
    "Independent gear reviews built on hands-on testing. Camping & outdoor, home essentials, and travel & EDC — zero pay-to-play.",
  url: "https://trailnestco.com",
  company: "TrailNestCo Media LLC",
  address: "1201 N Market St, Suite 111, Wilmington, DE 19801, USA",
  phone: "+1 (302) 600-4298",
  email: "contact@trailnestco.com",
  founded: 2022,
};

export const categories = [
  {
    slug: "camping-outdoor",
    name: "Camping & Outdoor",
    blurb: "Tents, sleep systems, camp cooking, lighting, and hiking gear — tested on real trips.",
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
  title: a.title,
  category: a.category,
  excerpt: a.excerpt,
  readTime: a.readTime,
  image: a.image,
  alt: a.alt,
}));

export const featuredGuide = {
  slug: "best-camping-tents-review",
  title: "Best Camping Tents of 2026: 6 Tested Across 4 Trips",
  excerpt:
    "Our flagship review: six 3-season tents tested through sustained rain, high wind, and a multi-night backpacking loop — updated as products change or sell out.",
  image:
    "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1400&q=70&auto=format&fit=crop",
  alt: "Hiker standing at a mountain summit at sunrise",
};

export const guides = guideArticles.map((a) => ({
  slug: a.slug,
  title: a.title,
  category: a.category,
}));

export const team = [
  { name: "James Carter", role: "Editor-in-Chief" },
  { name: "Sarah Nguyen", role: "Senior Editor" },
  { name: "Mike Alvarez", role: "Category Specialist, Outdoor Gear" },
  { name: "Laura Bennett", role: "Category Specialist, Home & Travel" },
] as const;

export const principles = [
  {
    title: "Hands-on testing first",
    body: "Every guide goes through hands-on testing or verified research by editors who actually use the gear.",
  },
  {
    title: "Zero pay-to-play",
    body: "We never accept payment for favorable coverage. Rankings are set by test results, not commission rates.",
  },
  {
    title: "Multi-editor review",
    body: "Specs are verified against manufacturer data and every piece is reviewed by multiple editors before publication.",
  },
  {
    title: "Guides that stay alive",
    body: "We update our guides when products change, get revised, or become unavailable — not once a year.",
  },
] as const;
