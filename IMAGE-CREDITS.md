# Image Credits & Licensing

Every image shipped in `public/images/` is recorded here. Nothing goes into the
repository without a known source and a usage basis.

**Rule:** if the usage basis for a product photo cannot be confirmed, the article
ships without that image and carries a TODO instead. A lifestyle photo under a
permissive licence may stand in, but it must never be presented as a photo of the
specific product under review.

---

## Brand product photography

Supplied through an active affiliate relationship. Used to promote the brand's own
products, which is the purpose the material is distributed for. If a programme
ends, the images for that brand must be removed.

| Directory | Brand | Programme | Basis |
|---|---|---|---|
| `public/images/ketl/` | KETL Mtn. | AvantLink — `ref=hpakmutk` | Affiliate partner product imagery |
| `public/images/cellercise/` | Cellerciser® | `sca_ref=11990000.3yDQMFCi1X` | Affiliate partner product imagery |

Both sets were downloaded from the brands' own product pages and converted to
WebP. Originals are not retained.

### Remote-hosted brand imagery

Served directly from the brand CDN rather than copied into the repository.
Allowed hosts are declared in `next.config.mjs` under `images.remotePatterns`.

| Host | Brand | Programme |
|---|---|---|
| `sunjoyshop.com` | Sunjoy | `ref=TRAILNESTCO` |
| `outdoormaster.com` | OutdoorMaster | `ref=gvghbqwy` |
| `ketlmtn.com` | KETL Mtn. | `ref=hpakmutk` |

> KETL began refusing hotlinked requests, which is why that brand's images were
> copied locally. Treat the remaining remote hosts as liable to do the same.

---

## Editorial and lifestyle photography

| Source | Licence | Where used |
|---|---|---|
| Unsplash | [Unsplash Licence](https://unsplash.com/license) — free for commercial use, no attribution required | Article hero images across reviews and guides |

Unsplash photographs are generic scene-setting only. None depicts a specific
product being reviewed.

---

## Outstanding — owner action required

Articles that compare products from brands with no affiliate relationship cannot
carry manufacturer product photography, because no usage basis exists.

For those articles:

- The `ProductPick.image` field is left unset. The layout degrades cleanly.
- The `ctaUrl` points at the manufacturer's official page with **no tracking
  parameter**, and `ctaIsAffiliate` is `false`, so the disclosure text stays honest.

To fill these in, either join the relevant affiliate programme (which usually
grants a media kit) or obtain written permission from the manufacturer. Then set
`image`, `imageCredit`, and — once a tracking link exists — `ctaUrl` plus
`ctaIsAffiliate: true`.

---

## Never permitted

- Images scraped from Google Images or any search results page
- Screenshots or photography lifted from competing review sites
- Watermarked images
- Stock or AI-generated imagery presented as a photo of the actual product
- Any image URL that has not been confirmed to load
