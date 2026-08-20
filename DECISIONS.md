# DECISIONS.md — V6 Solutions Website

Founder-approved decision register. Every entry here was explicitly confirmed in an interview batch.
Nothing is built on an assumption. If a decision is not in this file, it has not been made.

---

## Phase 1 — Kickoff

**Date:** 2026-08-15
**Batches:** 1a, 1b, 1c (1c revised after founder direction on global positioning)

### Tooling & infrastructure

| # | Decision | Choice | Notes |
|---|---|---|---|
| 1.1 | MCP servers | **Playwright** (already connected) + **Context7** + **GitHub** | All free. Founder to run `claude mcp add` for the latter two. Figma MCP is connected but **excluded from this project** — full features need a paid plan, and budget is ₹0. |
| 1.2 | Version control | **Local git + private GitHub repo** | Private until launch, so placeholder copy and unfinished pages stay unpublished. |
| 1.3 | Hosting | **Cloudflare Pages** | Unlimited free bandwidth, strongest India CDN presence, free `v6solutions.pages.dev` now and free custom domain + SSL later. Auto-deploy on push. |
| 1.4 | Domain | `v6solutions.in` — **buying within days** | Site canonical URL isolated in a single config constant (`SITE_URL`) so the switch is a one-line change. DNS steps to be prepared ahead of purchase. |
| 1.5 | `CLAUDE.md` filename | **Left as `CLAUDE (1).md`** — founder will handle | ⚠️ **Open risk:** Claude Code does not auto-load this filename. Any future session that does not manually read it will skip the Interview-First Protocol. |

### Brand & positioning

| # | Decision | Choice | Notes |
|---|---|---|---|
| 1.6 | **Market positioning** | **Global — not Tamil Nadu–only** | ⚠️ **Amends CLAUDE.md.** The source file says "serving clients pan-India", "across India, starting from Tamil Nadu", and proposes a footer line "Made in Tamil Nadu, serving Pan India". All superseded. **CLAUDE.md itself should be edited to match.** |
| 1.7 | Geography strategy | **Global brand voice, per-service reality** | Home / About / brand copy speak globally. Each service page states its true coverage: software, design, AR/VR, video editing and digital marketing = worldwide; **CCTV and hardware automation = India** (physical on-site work). Preserves local SEO on exactly the pages where it converts. |
| 1.8 | Holding-page one-liner | **"Hardware. Software. Design. Engineering solutions for businesses worldwide."** | Not the tagline. The tagline is a Phase 2 decision with 5 options to review. |
| 1.9 | Trademark mark | **"V6 Solutions™" — logo/wordmark only** | ™ is legal in India without registration. **Never ®** unless a registration is actually granted. ™ does not appear in body copy. |

### Site structure

| # | Decision | Choice | Notes |
|---|---|---|---|
| 1.10 | Header/footer nav | **Services · Products · Portfolio · Team · About · Contact** | Founder chose plural **Products** over a direct "IC Tester" link, so it scales to a second product. |
| 1.11 | Structure deviation | **Added `src/pages/products/index.astro`** | Not in CLAUDE.md's tree. Required as the container for 1.10; `products/ic-tester.astro` becomes its first entry. Approved consequence of 1.10. |
| 1.12 | Holding page scope | **Minimal — wordmark, one line, contact** | Ships in Phase 1 without pre-committing Phase 2 brand decisions. |
| 1.13 | Holding-page contact | **Business email only, for now** | No phone published. CLAUDE.md forbids committing founders' personal numbers. WhatsApp click-to-chat to be added once a dedicated business number exists. |

### Deferred to Phase 2 (do not decide unilaterally)

- Tagline (5 options to be offered) · logo direction (3 concepts) · brand voice
- Colour palette (3 full palettes) · typography (3 pairings) · animation level
- **Header and footer visual style** — Phase 1 builds an intentionally unstyled *structural* shell only, per CLAUDE.md's rule that each component's variants are offered before it is built.

### Technical notes from the Phase 1 build

Not founder decisions — recorded so nobody "corrects" these back later.

| Finding | Detail |
|---|---|
| **Tailwind is NOT via `@astrojs/tailwind`** | CLAUDE.md says "Tailwind via the official Astro integration". That integration is superseded. Astro 7 + Tailwind 4 use the **`@tailwindcss/vite`** plugin — this is what the official `astro add tailwind` command installs. Verified, not assumed. |
| Versions installed | Astro **7.2.2**, Tailwind **4.3.3**, `@astrojs/sitemap` **3.7.3**, `@astrojs/check` **0.9.10**. TypeScript pinned to **5.x**: TypeScript 7 is published but `@astrojs/check` does not support it yet. |
| Config is `astro.config.ts`, not `.mjs` | So it can import `SITE_URL` from `src/config/site.ts` and keep decision 1.4's "one-line domain switch" promise honest. |
| `z` imported from `astro/zod` | Astro 7 deprecates the `z` re-export from `astro:content` (48 deprecation hints). Zod 4 also wants top-level `z.email()` / `z.url()` over `z.string().email()`. Build is now **0 errors, 0 warnings, 0 hints**. |
| `trailingSlash: 'always'` | Matches Cloudflare Pages' default behaviour; avoids duplicate-URL SEO issues. |
| Assumption to confirm in Phase 3 | CLAUDE.md lists `process[]` on services without specifying its shape. Built as `{ step, detail }`. Say if you want something else. |

---

## Phase 1.5 — Founder portfolios

**Date:** 2026-08-16
**Source:** founder direction, given directly (no question batch was run — the
founder answered the integration question before it was asked).

### Decisions

| # | Decision | Choice | Notes |
|---|---|---|---|
| 1.14 | Founder portfolios | **Every founder gets a full portfolio page — same template, fully customised build per person** | Resolves the tension with CLAUDE.md's "all six are equal, no visual hierarchy": equality is preserved by giving everyone a portfolio, not by giving everyone a card. |
| 1.15 | Shyamalan's portfolio | **Rebuilt in Astro from his Next.js repo** (`github.com/Shyamalan-21/Portfolio`) | Not embedded, not iframed, not linked out. Ported to the project's own stack. |
| 1.16 | Portfolio implementation | **Zero-JS Astro components + per-founder markdown** | Verified: the built page ships **0 bytes of JavaScript**. See technical notes. |
| 1.17 | Portfolio visual identity | **Separate from the company brand palette** | Each founder's portfolio carries their OWN accent colours, set per-file. The company palette remains an open Phase 2 decision and is untouched — `global.css` was not modified. |

### What was built

```
src/content.config.ts                   founders schema + optional `portfolio` block
src/content/founders/shyamalan-v.md     all of Shyamalan's content, one file
src/content/founders/shyamalan-v.jpg    portrait (317kB → 11–35kB webp at build)
src/styles/portfolio.css                the shared template stylesheet
src/layouts/PortfolioLayout.astro       portfolio document shell + Person JSON-LD
src/components/portfolio/*.astro        10 section components
src/pages/team/[slug].astro             one page per founder with a portfolio
src/pages/team/index.astro              team index
```

Adding founder #2 is **one markdown file**. No code changes. Sections render only
when their data exists, so nobody gets an empty "Awards" band.

### Technical notes from the build

| Finding | Detail |
|---|---|
| **0 KB JavaScript** | Measured on the built output, not estimated. Scroll reveals use CSS `animation-timeline: view()`, marquees use keyframes, expandable skill panels use native `<details>`. Page weight: **45.8 KB HTML + ~29 KB CSS**. |
| What was dropped from the source, and why | **Three.js hero** (~230KB+ JS vs a ~50KB site budget) → replaced with a CSS radial gradient, blurred orbs and an inline SVG constellation. **Custom `cursor: none`** → removed; it hid the pointer entirely if the script failed, against the Accessibility ≥ 95 target. **Contact form** → omitted; the original only simulated sending, and a form that silently discards messages is worse than none. Needs the Web3Forms/Formspree key first. |
| **LeetCode stats are a dated snapshot** | The source proxied LeetCode's GraphQL through a Next.js route handler. `output: 'static'` has no server, and browser-side calls fail CORS. The page states "a snapshot, not a live feed — accurate as of August 2026" rather than implying live data. Restoring live data needs a Cloudflare Pages Function or a build-time fetch. |
| Reveal animations are progressively enhanced | Layered so content is **never** hidden by default: no scroll-timeline support → visible; `prefers-reduced-motion` → visible; both present → animates. |
| About-section text colours were darkened | The source's neon accents sat at ~2:1 contrast on the cream band. Darkened equivalents keep the hue relationships and pass WCAG AA. |
| Shyamalan's personal email withheld | `samzshyam21@gmail.com` is public on his own site, but decision 1.13 sets "business email only" here. Contact falls back to GitHub / LinkedIn / LeetCode. |
| Build status | `npm run build` → **0 errors, 0 warnings, 0 hints**. |

### Open items from this phase

- [ ] **Founder sign-off on Shyamalan's copy.** Every word is sourced from his own repo, but CLAUDE.md requires copy approval before it ships. Nothing here was invented.
- [ ] **The other five founders** — each needs one markdown file. Same template.
- [ ] **Headshots.** The portrait is a full-body cutout flattened onto black; it needs a strong back-glow to be visible at all, and it crops awkwardly into the round team-page avatar. A proper headshot would fix both.
- [ ] **Mobile verified only by construction.** The layout uses `clamp()`/`min()`/auto-fill grids throughout and every overflow guard was confirmed in-browser, but the automation browser ran a fixed viewport, so a real 360px render was never seen. Check on a phone.
- [ ] Decide whether the LeetCode numbers should become live via a Pages Function.

### Open items

- [ ] **Business email address** — holding page currently says "Contact details coming shortly" rather than publishing a fake address. Supply it and `src/config/site.ts` turns it into a live mailto automatically.
- [ ] **Context7 + GitHub MCP** — not yet connected by founder.
- [ ] **Private GitHub repo** — not yet created (decision 1.2). Needed before Cloudflare Pages auto-deploy.
- [ ] **Cloudflare Pages project** — not yet created; holding page is built and verified locally but is **not live**.
- [ ] `CLAUDE.md` rename, and amend it for decision 1.6 (global positioning).
