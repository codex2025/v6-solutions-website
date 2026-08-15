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

### Open items blocking nothing yet

- [ ] Business email address for the holding page — marked `PLACEHOLDER` in code until supplied
- [ ] Context7 + GitHub MCP connection by founder
- [ ] `CLAUDE.md` rename and amendment for decision 1.6
