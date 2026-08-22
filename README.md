# OpenSurge Website

The SEO-first public website for [OpenSurge for Mac](https://github.com/YTwsy/OpenSurge-for-Mac), an open-source macOS whole-home gateway and control plane powered by mihomo.

The website lives in a separate repository so product releases, Go/Swift/React application work, and public content can evolve on independent deployment schedules.

## What is built in

- Next.js App Router with static export; every public page is crawlable HTML.
- 30 English and Simplified Chinese URLs across feature, guide, documentation, and journal sections.
- Per-page title, description, keywords, canonical URL, Open Graph, Twitter Card, and language alternates.
- `WebSite`, `SoftwareApplication`, `CollectionPage`, `TechArticle`, breadcrumb, and visible FAQ structured data.
- Generated `sitemap.xml`, `robots.txt`, and web app manifest.
- Real OpenSurge screenshots, topology diagrams, and social artwork—no stock placeholders.
- Automated SEO contract checked after every production build.

## Local development

Requirements: Node.js 22 and pnpm 11.19.

```bash
pnpm install
pnpm dev
```

Run the complete repository check:

```bash
pnpm verify
```

That command runs ESLint, creates the static export in `out/`, and checks all generated pages for the required SEO signals.

## Canonical site URL

The default production origin is `https://opensurge-website.pages.dev`. Set `NEXT_PUBLIC_SITE_URL` at build time when attaching a custom domain:

```bash
NEXT_PUBLIC_SITE_URL=https://opensurge.example pnpm build
```

This value is compiled into canonical links, language alternates, Open Graph URLs, JSON-LD, `robots.txt`, and `sitemap.xml`. Do not deploy a production build with a preview origin.

## Free Cloudflare Pages deployment

Create a Pages project from this GitHub repository with:

- Framework preset: `Next.js (Static HTML Export)` or `None`
- Build command: `pnpm build`
- Build output directory: `out`
- Node version: `22`
- Environment variable: `NEXT_PUBLIC_SITE_URL` set to the final HTTPS origin

No server function, database, or paid service is required. `public/_headers` supplies baseline response headers and immutable caching for Next.js assets.

## Content model

Reusable bilingual content is defined in `src/lib/content.ts`. Each new search-intent page should include:

1. One clear intent and one unique H1.
2. A truthful description grounded in the current OpenSurge behavior.
3. A real image with useful alternative text.
4. Two or more substantive sections and visible FAQs.
5. A matching translation with the same section and slug.

Add new high-value pages before adding thin keyword variants. The sitemap and route generation derive from this content registry.

## Repository relationship

This repository contains marketing and documentation presentation only. Product code, releases, issues, and the source of truth for network behavior remain in [OpenSurge-for-Mac](https://github.com/YTwsy/OpenSurge-for-Mac).

## License

GPL-3.0-only. See [LICENSE](./LICENSE).
