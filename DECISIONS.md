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

---

## Phase 2 — Brand & design system

**Date:** 2026-08-20
**Batches:** 2a (brand identity), 2b (logo asset + palette, revised after founder supplied the
real logo file mid-interview), 2c (animation/3D direction and JS-budget policy — founder-initiated,
outside the original interview list)

### Brand identity

| # | Decision | Choice | Notes |
|---|---|---|---|
| 2.1 | **Tagline** | **"Build · Innovate · Elevate"** | ⚠️ **Supersedes an earlier pick in the same session** ("Engineering solutions for businesses worldwide."). Founder's actual logo artwork ships with this line baked in — treated as the real, already-decided tagline. The superseded line remains available as hero subhead copy (it's `ONE_LINER` in `site.ts`, decision 1.8, untouched). |
| 2.2 | **Logo** | **Founder supplied final artwork** — `public/logos/*.png` | Not designed by Claude Code. Icon: a V that resolves into a 6, gradient. Lockup: navy background, white "V6" + gradient "6", tagline underneath. Supersedes the "propose 3 logo concepts" instruction in CLAUDE.md §1 — moot once real artwork exists. |
| 2.3 | **Brand voice** | **Friendly-professional** | Direct, technically confident (per CLAUDE.md baseline) but approachable — second person, contractions okay. |
| 2.4 | **Trademark mark** | **No ™ anywhere, for now** | ⚠️ **Amends decision 1.9**, which set "V6 Solutions™" in the wordmark only. Founder overrode this directly. Never ® until an actual registration is granted (1.9's other clause still stands). |
| 2.5 | **Typography** | **IBM Plex Mono (display/technical labels) + IBM Plex Sans (body/headlines)** | ⚠️ **Not founder-confirmed — Claude Code's pick, flagged as provisional**, made under founder direction to keep moving rather than run another interview round. Chosen for the "precision engineering" identity anchor and because mono labels suit the HUD-style overlays used in the animated/3D sections (2.7). Change on request. |

### Colour palette

| # | Decision | Choice | Notes |
|---|---|---|---|
| 2.6 | **Palette strategy** | **C — Split by page type** | Colours **sampled directly from the logo file**, not eyeballed: royal blue `#014AF0` → cyan `#03ADC1` → lime green `#84F660` gradient, navy `#010717`. Home / About / Products render dark (navy background, matches the logo lockup and Shyamalan's portfolio). Services / Portfolio / Team index / Contact render light (white/near-white background, navy headlines). Founder portfolio pages keep their own independent palette per decision 1.17, untouched. |
| — | Full token values | See `src/styles/global.css` once written | Dark tokens and light tokens are both first-class — this is a **per-page brand choice**, not a `prefers-color-scheme` toggle. The visitor's OS theme preference is irrelevant here; each page's background is fixed by design. |

### Animation, 3D and the JS-budget policy

Founder-initiated, mid-session, outside CLAUDE.md's original interview checklist — treated as its
own decision batch because it directly amends existing hard requirements.

| # | Decision | Choice | Notes |
|---|---|---|---|
| 2.7 | **Overall direction** | **Rich, animated, uses 3D** — touch feedback, transitions, scroll choreography, and 3D visuals, applied to every page, each service area given a visually distinct treatment | Founder's stated reason: the site is also a **client-pitch tool**, not just an information site — first-impression polish matters as much as raw load time now. |
| 2.8 | ⚠️ **Amends CLAUDE.md's performance section** | **Two-tier delivery.** Full richness (3D scenes, GSAP-choreographed scroll/hover/touch) gated behind a capability check (`prefers-reduced-motion: no-preference` AND `pointer: fine` AND a minimum viewport width). Everything below that gate gets a CSS-only tier: transitions, `animation-timeline` reveals, hover/press states, zero extra JS. | The **old rule** — "keep total JS under ~50KB; site must work with JS disabled except form enhancement," Lighthouse Performance ≥ 90 on mid-range Android/4G — **no longer holds site-wide**. It still holds for the CSS-only lite tier, which is what phones and reduced-motion visitors actually get. The founder portfolio template's own 0 KB JS build (decision 1.16) is untouched — it predates and is independent of this decision. |
| 2.9 | **3D asset source** | **No real 3D files exist.** Generic, procedurally-built engineering visuals (PCB-trace structures, node clusters, gear/chip forms) — not a literal render of the IC Tester, which is still mid-development. Revisit once real product photography/3D scans exist. | Avoids sourcing external 3D assets of uncertain licence. Everything is generated in code. |
| 2.10 | **Tech stack** | **Three.js** (procedural geometry, no loaded GLB/GLTF files) for 3D, **GSAP** (including ScrollTrigger) for scroll/hover/touch choreography. **No React, no `@astrojs/react`.** | Founder delegated this choice ("do which is best, reliable, deployment-friendly, free"). Both are plain client-side JS/WebGL — Astro supports them via a normal `<script type="module">` in a `.astro` file, no UI framework needed, so CLAUDE.md's "no React unless asked" line is honoured by construction, not by exception. **Licensing check, done 2026-08-20:** Three.js is MIT. GSAP (including ScrollTrigger and every previously-paid "Club GreenSock" plugin) became 100% free for all use, including commercial, after Webflow's 2025 acquisition of GreenSock — no key, no attribution requirement, no budget impact. `<model-viewer>` was considered and set aside for now (best fit is real GLB/GLTF product scans, which decision 2.9 says don't exist yet); worth reconsidering once the IC Tester has real photography/3D capture. |

### Deferred / still open

- Animation level was originally meant to be a simple none/subtle/showcase pick (CLAUDE.md §7) — superseded by decision 2.7's much more specific direction.
- Per-service visual motif assignments (which of the 8 services gets which 3D/motion treatment) are a build-time judgment call, not individually interviewed — founder to review once Home ships and correct anything that reads wrong for that service.
- Typography (2.5) is provisional, not confirmed — see note above.

---

## Phase 3 — Core pages

**Date:** 2026-08-20
**Batches:** none — founder approved Home and said "continue this treatment to every other
page," so the remaining pages were built directly against the Phase 2 system rather than
interviewed section-by-section. Anything that needed a judgment call is logged below, not
silently decided.

### What was built

All 24 routes now build (`0 errors, 0 warnings, 0 hints`):

| Page | Theme | Notes |
|---|---|---|
| `/` (Home) | dark | Phase 2 build, unchanged this phase except reading services from the new collection. |
| `/services/` + 8 `/services/<slug>/` | light | New `services` content collection — 8 real markdown files (title/tagline/summary/deliverables/process/faq/coverage) per CLAUDE.md's schema. Copy is a **first draft**, not founder-approved. |
| `/products/` + `/products/ic-tester/` | dark | Honest "in development" framing — no invented specs, pricing or ship date. Second procedural Three.js scene (a chip on a test bed, swept by a scanning beam) — see decision 3.1. |
| `/portfolio/` + 4 `/portfolio/<slug>/` | light | New project entries — see decision 3.2. |
| `/team/` | light | **Rebuilt** onto the main `BaseLayout` (was on `PortfolioLayout` with no site nav) — see decision 3.3. `/team/<slug>/` pages are untouched. |
| `/about/` | dark | Honest, minimal, verified facts only — see decision 3.4. |
| `/contact/` | light | No working form — see decision 3.5. |
| `/terms/`, `/privacy/`, `/404/` | light | Placeholder pages, `noindex`, no invented legal text. |

### Decisions made without a separate interview batch

| # | Decision | Choice | Notes |
|---|---|---|---|
| 3.1 | **Second Three.js scene for the IC Tester hero** | A procedurally-built chip (box body, pin rows, pin-1 marker, test-bed grid, sweeping scan beam) — not a render of the real product. | Extends decision 2.9's "no external 3D assets" rule to a second page. `src/three/scene.ts` now takes a `kind` param (`'nodes'` \| `'chip'`) sharing one renderer/camera/resize/pointer-parallax harness. |
| 3.2 | **Portfolio's first 4 projects** | Shyamalan V's own personal/academic projects (VeriTrust-AI, Bizpulse, Beaute-AI, iLab XR Simulation), sourced verbatim from his own portfolio markdown — real problem/solution/outcome text, nothing invented. `client: Personal project` (not `Confidential`, which implies a real client is being hidden — see `portfolio/INTEGRATION.md` §4's suggested convention). | Client work publishes here once delivered and cleared to share; until then this is honest, not empty. |
| 3.3 | **Team index moved off `PortfolioLayout` onto `BaseLayout`** | The directory/grid page is a company page, not any one founder's space, so it now carries the real site Header/Footer and light-theme tokens. Each individual `/team/<slug>/` page is untouched — still `PortfolioLayout`, no site chrome, per decisions 1.14-1.17. | Previously the whole `/team/` section (index included) had zero way back into the main site except the browser back button — an unnoticed Phase 1.5 gap, now fixed for the index only. |
| 3.4 | **About page has no founding-story narrative** | Four verified facts (structure, range, reach, product proof) plus an explicit line saying the founders' own words are still needed. | CLAUDE.md requires the founders' own words for this section; Claude Code doesn't have them and won't invent them. |
| 3.5 | **Contact page ships without a working form** | Mailto link if `HAS_CONTACT_EMAIL` is true, otherwise the same honest "coming shortly" fallback as the holding page. | Continues the Phase 1.5 precedent: no Web3Forms/Formspree key exists yet, and a form that silently discards messages is worse than none. |

### Technical notes from this phase

| Finding | Detail |
|---|---|
| Astro/JSX whitespace trimming | Inline links split across source lines (`text\n<a>link</a>\ntext`) lose their surrounding spaces at build time — caught on `/about/` ("see theteam pagefor") and fixed with explicit `{' '}` spacers. Worth a second look on any future page that wraps inline links across lines. |
| `aspect-square` doesn't fit every hero visual | The IC Tester page's chip motif is inherently wide/flat; forcing it into a square container left a lot of dead space around the no-JS/lite-tier fallback SVG. Changed to `aspect-[4/3]` for that page only — the Home page's six-node scene keeps `aspect-square`, which suits it fine. |
| Two-tier delivery confirmed at the build level, not just by design | `dist/_astro/`: the only script referenced in a page's initial HTML is a ~2.7 KB baseline module. The Three.js scene chunk (~525 KB) and GSAP + ScrollTrigger (~113 KB) never appear as `<script>` or `modulepreload` tags — they're fetched only via the rich tier's dynamic `import()`. |
| Visual verification method | The Claude in Chrome extension wasn't connected in this session. Used the `playwright` CLI (already cached locally, no install) for real-browser screenshots instead — `npx playwright screenshot`, plus a small scripted `playwright-core` session (since removed) to confirm GSAP ScrollTrigger fires correctly on genuine scroll. **Caveat found and worth remembering:** Playwright's `--full-page` screenshot flag does not fire real scroll events, so ScrollTrigger-gated content below the fold renders as still-hidden in that specific capture mode even though it works correctly for real visitors — don't mistake that for a bug next time. |

### Open items carried forward from Phase 1/1.5, still true

- [ ] Business email address, Web3Forms/Formspree key — blocks a live Contact form.
- [ ] Founders #2-6 — each needs one markdown file (`FOUNDER-PORTFOLIOS.md`).
- [ ] Founder headshots.
- [ ] Context7 + GitHub MCP not connected; private GitHub repo and Cloudflare Pages project not created — **nothing built so far is live.**
- [ ] `CLAUDE.md` rename + amendment for decision 1.6.
- [ ] Terms/Privacy real legal text; Udyam/MSME registration number once issued.
- [ ] Typography (2.5) and per-service icon/motif choices (3.1's sibling for the other 7 services) are Claude Code's picks, not yet founder-reviewed.
- [ ] Service copy (tagline/summary/deliverables/process/faq for all 8) is a first draft.

---

## Phase 3.5 — Founder review of the live build

**Date:** 2026-08-20
**Trigger:** Founder reviewed the site running on localhost and gave direct feedback: strong
dissatisfaction with Home specifically, the per-page dark/light switching "irritates," the Home
hero's 3D scene is "the worst," and the header logo wasn't rendering fully.

| # | Decision | Choice | Notes |
|---|---|---|---|
| 2.11 | ⚠️ **Amends decision 2.6.** **One consistent light theme, site-wide.** | No more per-page dark/light split. Every page — including the four that were dark (Home, About, Products, IC Tester) — now renders on the same light tokens Services/Portfolio/Team/Contact already used. `BaseLayout`'s `theme` prop and `[data-page-theme]` CSS are removed entirely; `global.css` now defines one token set directly on `:root`. | Founder's own words: "dual themed page, switching between the themes irritates." Asked directly whether that meant a visitor-controlled toggle or one fixed theme — founder chose **one fixed theme, light**. |
| 2.12 | **Home's hero 3D scene removed.** | The procedural six-node Three.js scene is gone from `/`. Hero is now a single centered text block (tagline, heading, subhead, two CTAs) — no replacement visual. `src/three/scene.ts`'s `'nodes'` scene code is unused now but left in place in case a future page wants it; nothing imports it. | Founder: "the 3d model you used in the home page is worst, kindly remove it." Scoped to Home only — the IC Tester page's separate chip scene (`'chip'` kind) was not mentioned and was left as-is; flagged to the founder as something to call out too if it lands the same way. |
| 2.13 | **Fixed: header/footer logo was being cropped, not just small.** | Real bug, not a design opinion — `public`/`src/assets/logos/v6-icon.png` is 1402×1122 (5:4), and both `Header.astro` and `Footer.astro` forced it into an exact square (`width={30} height={30}` / `width={28} height={28}`), which crops part of the "6" loop off under Astro's image service. Fixed by passing proportional width/height (35×28 header, 33×26 footer) with `w-auto` sizing so nothing gets cropped or stretched. | Founder: "the company logo is not fully visible." Confirmed by rendering and zooming into the actual header before and after — this was not a subjective read, the shape was genuinely cut off. |

### What's still open from this feedback

- Founder said "worst design I've ever seen" / "I don't like the home page itself" as a general statement, broader than the three concrete items above. Decisions 2.11–2.13 address the specific, actionable parts of that feedback; whether the founder wants a more fundamental rework of Home's layout/copy/typography beyond these fixes is still an open question — surfaced back to them rather than guessed at.
- The IC Tester page still has its own procedural 3D scene (decision 3.1) — left in place since it wasn't named, but the founder may want it gone too given the Home scene's reception.
- Typography (2.5) is still provisional and unreviewed by the founder — the same IBM Plex Mono/Sans pick that shipped with the disliked Home page. Worth confirming explicitly now rather than assuming it survived the "worst design" verdict.
