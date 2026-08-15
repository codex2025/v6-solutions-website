# CLAUDE.md — V6 Solutions Company Website

## What this project is

Official website for **V6 Solutions** (brand always written as one unit: "V6 Solutions", never bare "V6" in public-facing text), a technology startup based in Tamil Nadu, India, serving clients pan-India. Six equal founders. Target domain: **v6solutions.in** (until purchased, deploy to the free `v6solutions.pages.dev` / `.vercel.app` subdomain).

The website's single job: **build client trust** — show who we are, what we do, and proof of real work. It must feel like an engineering company that builds real things (hardware + software), not a generic digital agency template.

---

## ⚠️ INTERVIEW-FIRST PROTOCOL — READ THIS BEFORE ANY OTHER SECTION

**Do not assume. Ask.** The founder wants to be consulted on every meaningful decision, A to Z. Before writing code in ANY phase, you must first interview the founder using short, numbered question batches (max 5–7 questions at a time, with suggested options so answering is fast). Wait for answers before proceeding. Treat every unanswered question as a blocker, not a license to guess.

**What you must ask about (minimum — extend this list whenever a new decision appears):**

1. **Brand & identity:** final tagline (offer 5 options to choose from or edit), logo direction (offer 3 concepts described in words, e.g. "six pins forming a V"), whether ™ symbol should appear next to the brand name (note: only add ® if a trademark is actually registered — never fake it), brand voice (formal / friendly-professional / bold).
2. **Color theme:** propose 3 complete palettes (each 4–6 named hex tokens with a preview description and where each color is used). Founder picks or mixes. Never apply a palette without approval.
3. **Typography:** propose 3 font pairings (display + body, from Google Fonts) with one-line personality descriptions. Founder picks.
4. **Site sections:** for EVERY page, list the proposed sections in order (e.g. Home = Hero → Services grid → Why V6 Solutions → Featured projects → IC Tester teaser → CTA) and ask: keep / remove / reorder / add? Do this page by page.
5. **Copy:** draft all headlines, taglines, service descriptions, and CTAs — then show them for approval or editing BEFORE they go into code. Ask for the founder's own words where authenticity matters (About story, founder bios).
6. **UI components:** before building each component (header style, hero layout, card style, buttons, forms, footer), describe 2–3 variants in one line each and ask which one. Example: "Header: (a) transparent over hero, solid on scroll (b) always solid with top contact strip (c) minimal centered logo."
7. **Content & assets:** founder photos (real photos or initials-avatars until photos ready?), project entries (what real/college projects exist?), which services get priority order, WhatsApp number for click-to-chat, contact email, social handles.
8. **Features:** confirm before adding anything interactive — service filter, dark mode, animations level (none / subtle / showcase), language (English only or English + Tamil later), brochure PDF download link on site?
9. **Legal & trust items:** what goes in the footer (Udyam/MSME registration number once available, partnership firm name, "Made in Tamil Nadu, serving Pan India" line?), Terms & Privacy placeholder pages, portfolio client-consent status before publishing any client name.
10. **Anything ambiguous:** if a decision point arises mid-build that isn't covered by a previous answer, STOP and ask. Never silently choose.

**Interview cadence:** at the start of each phase, run the interview for that phase only (don't front-load 50 questions). After the founder answers, summarize the decisions in a short "Decision log" block in `DECISIONS.md` at repo root (mirrors the company's internal decision register) and then build.

---

## MCP servers to suggest (all free) — ask the founder to connect these

At the very start of the project, tell the founder these free MCP servers will improve output quality, explain what each does in one line, and ask which to connect (all optional; proceed without them if declined):

- **Playwright MCP** (`@playwright/mcp`) — lets Claude Code open the local site in a real browser, take screenshots, and self-review the design visually. Highest impact for this project; strongly recommend it for the design and polish phases.
- **Context7 MCP** — pulls current, version-correct docs for Astro/Tailwind so generated code matches the latest APIs instead of outdated patterns.
- **GitHub MCP** — manage the repo, issues, and commits directly (free with a personal access token).
- Filesystem and git access are built into Claude Code — no MCP needed for those.

Do NOT suggest any paid MCP or paid service anywhere in this project. Budget is ₹0 beyond the domain.

---

## Business context (use this to write copy drafts)

- 6 founders, each with a portfolio section. All six are equal — no visual hierarchy among founder cards.
- Services: IT & Software Development, Design (Graphic/3D/Visual), Hardware Automation, CCTV & Security Infrastructure, CAD & Engineering Drawings, AR/VR & AI Solutions, Digital Marketing, Video Editing.
- Flagship in-house product under development: **Low-Cost IC Tester** (electronics test equipment MVP). Gets its own page — proof we build products, not just services.
- Target clients: SMEs, manufacturers, builders/architects, shops needing CCTV, businesses needing software/design — across India, starting from Tamil Nadu.
- Tone: professional, direct, technically confident. No startup buzzwords ("synergy", "revolutionize", "unleash"). Write like engineers who deliver. All copy drafts still require founder approval (see protocol above).

## Tech stack (do not deviate without asking)

- **Framework:** Astro (latest) — static-first, fast, SEO-friendly, free to host.
- **Styling:** Tailwind CSS via the official Astro integration.
- **Content:** Astro Content Collections (Markdown + frontmatter) for services, projects, founders — a founder can add a project by adding one .md file.
- **Forms:** Web3Forms or Formspree free tier for contact/enquiry. No backend server. Ask the founder for the access key when reaching the contact page.
- **Deployment:** Cloudflare Pages or Vercel free tier (ask which the founder prefers). Build `npm run build`, output `dist/`.
- **No CMS, no database, no React** unless a component genuinely needs interactivity (use Astro islands sparingly, and ask first).

## Project structure

```
/
├── CLAUDE.md
├── DECISIONS.md           # log of every founder-approved decision
├── src/
│   ├── components/        # Header, Footer, ServiceCard, ProjectCard, FounderCard, CTA, SEO
│   ├── layouts/           # BaseLayout.astro (SEO meta, header, footer)
│   ├── pages/
│   │   ├── index.astro
│   │   ├── services/index.astro + [slug].astro
│   │   ├── portfolio/index.astro + [slug].astro
│   │   ├── team/index.astro + [slug].astro
│   │   ├── products/ic-tester.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── terms.astro | privacy.astro | 404.astro
│   └── content/
│       ├── services/      # 8 markdown files
│       ├── projects/      # one per project
│       └── founders/      # 6 markdown files
├── public/                # images, favicon, brochure.pdf (later), robots.txt
└── astro.config.mjs
```

## Content collection schemas

**services/**: `title, slug, tagline, icon, summary, deliverables[], process[], faq[], order`
**projects/**: `title, slug, client (or "Confidential"), service, year, thumbnail, images[], problem, solution, outcome, testimonial?`
**founders/**: `name, slug, role, photo, skills[], domains[], bio, linkedin?, github?, email?, featuredProjects[]`

Placeholders must be clearly marked `<!-- PLACEHOLDER: replace with real content -->`. Never invent fake client names, fake testimonials, fake stats, or fake registration numbers. Honest "coming soon" beats fake proof.

## Design direction (baseline — final choices come from the interview)

- Identity anchor: **precision engineering**. Visual language from the company's own world — PCB traces, CAD linework, calibration marks — not generic SaaS gradients.
- Logo/signature motif candidate to propose: the "6" or the V formed from IC-chip pins / six nodes. Use the signature motif in ONE place (hero or section dividers), quiet everywhere else.
- Avoid AI-default looks: cream + terracotta serif, black + acid green, newspaper hairline layouts. Propose palettes rooted in this brand instead.
- Fully responsive down to 360px. Visible keyboard focus states. Respect `prefers-reduced-motion`.
- Animation level set by founder in interview; default subtle.

## SEO & performance requirements

- Unique `<title>` + meta description per page; Open Graph + Twitter cards via shared SEO component.
- JSON-LD: `Organization` (home), `Service` (service pages), `Person` (founder pages), `Product` (IC Tester).
- Sitemap integration + robots.txt. Target keywords per service page (e.g. "CCTV installation Tamil Nadu") — confirm keyword list with founder.
- Images as .webp via Astro `<Image>`, lazy-loaded, alt text everywhere.
- Lighthouse mobile targets: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95. Audience uses mid-range Android on 4G; keep total JS under ~50KB; site must work with JS disabled except form enhancement.

## Conventions

- TypeScript strict mode. Components PascalCase, page files kebab-case.
- Tailwind utilities only; global tokens in `src/styles/global.css`.
- Commit after every approved step, short imperative messages (`add founder collection schema`).
- A task is done only when `npm run build` passes with zero errors.
- Never commit credentials, client data, or founders' personal phone numbers.
- Update `DECISIONS.md` after every interview batch.

## Build phases (work in this order — each begins with its interview)

1. **Kickoff interview + scaffold:** suggest MCPs; ask deployment platform choice; scaffold Astro + Tailwind + collections + BaseLayout + header/footer shell; deploy "coming soon" page live.
2. **Brand & design system:** interview for tagline, logo direction, palette, typography, animation level; build tokens, type scale, buttons, cards, SEO component; get visual sign-off (Playwright screenshots if connected).
3. **Core pages:** section-by-section interview per page; build Home, Services index + 8 service pages, About, Contact with working form; all copy approved before coding.
4. **Trust layer:** collect real founder bios/photos and project entries via interview; build Team, Portfolio, IC Tester pages.
5. **Polish:** SEO/JSON-LD, sitemap, 404, performance + accessibility pass, Lighthouse audit; show results and fix below-target items.
6. **Handover:** README explaining how any founder adds a project/founder/service via one markdown file; final decision log review.

## Out of scope (do not build, do not suggest)

No blog (later), no client login, no payment gateway, no e-commerce, no CMS, no multi-language yet (English first; Tamil later if decided), no paid tools or services of any kind.
