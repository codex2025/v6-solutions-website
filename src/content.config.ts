import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Content collection schemas.
 *
 * Field lists come from CLAUDE.md § "Content collection schemas".
 * A founder adds a service, project or founder by dropping ONE markdown file
 * into the matching folder under src/content/ — no code changes needed.
 *
 * Note: the glob loader derives each entry's id from its filename, so the
 * explicit `slug` field must match the filename. It is kept because CLAUDE.md
 * specifies it.
 */

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    tagline: z.string(),
    /** Icon identifier, resolved by the icon component. Not an image path. */
    icon: z.string(),
    summary: z.string(),
    deliverables: z.array(z.string()),
    process: z.array(
      z.object({
        step: z.string(),
        detail: z.string(),
      }),
    ),
    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
    /** Sort order in the services grid. Lower comes first. */
    order: z.number().int(),
    /**
     * Decision 1.7 — global brand voice, per-service reality.
     * 'worldwide' for services deliverable remotely (software, design, AR/VR,
     * video, marketing). 'india' for physical on-site work (CCTV, hardware
     * automation). Drives both page copy and SEO keyword targeting.
     */
    coverage: z.enum(['worldwide', 'india']),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      /**
       * Real client name ONLY with written consent. Use 'Confidential' otherwise.
       * Never invent a client name.
       */
      client: z.string().default('Confidential'),
      service: reference('services'),
      year: z.number().int(),
      thumbnail: image().optional(),
      images: z.array(image()).default([]),
      problem: z.string(),
      solution: z.string(),
      outcome: z.string(),
      /** Only ever a real, attributable quote. Never fabricated. */
      testimonial: z
        .object({
          quote: z.string(),
          author: z.string(),
          role: z.string().optional(),
        })
        .optional(),
    }),
});

/**
 * A CSS colour, stored as a hex string. Founder portfolios each carry their own
 * accent palette — this is the founder's personal identity, deliberately
 * separate from the company brand palette (a Phase 2 decision, still open).
 */
const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Must be a 6-digit hex colour, e.g. #2B6FFF');

/**
 * Per-founder portfolio.
 *
 * The TEMPLATE is shared: every founder gets the same section architecture and
 * the same components. The BUILD is customised: every value below comes from
 * the founder's own markdown file, so no two portfolios look or read alike.
 *
 * Every section is optional. A founder with no research papers simply omits
 * `awards` and that section does not render — no empty shell, no placeholder.
 */
const portfolio = z.object({
  /** Set false to keep a founder's card on /team/ but not generate their page yet. */
  enabled: z.boolean().default(true),

  /** Drives every accent in the page via CSS custom properties. */
  theme: z.object({
    accent: hex,
    accent2: hex,
    accent3: hex,
    /** Warm inverted band used by the About / Beyond sections. */
    paper: hex.default('#F2EFE6'),
    paper2: hex.default('#E8E3D8'),
  }),

  hero: z.object({
    /** Large display name. Split so the last part can carry the gradient. */
    displayName: z.string(),
    displayAccent: z.string().optional(),
    roles: z.array(z.string()).min(1),
    statement: z.string(),
    /** Giant low-opacity watermark type behind the hero. */
    backdropText: z.string(),
    badge: z.string().optional(),
  }),

  about: z
    .object({
      heading: z.string(),
      lines: z.array(z.object({ text: z.string(), color: hex })),
      chapters: z.array(
        z.object({
          num: z.string(),
          heading: z.string(),
          body: z.string(),
          accent: hex,
        }),
      ),
    })
    .optional(),

  work: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        category: z.string(),
        subtitle: z.string(),
        year: z.string(),
        description: z.string(),
        highlights: z.array(z.string()).default([]),
        architecture: z.string().optional(),
        tech: z.array(z.string()).default([]),
        accent: hex,
        link: z.url().optional(),
      }),
    )
    .optional(),

  experience: z
    .array(
      z.object({
        title: z.string(),
        role: z.string(),
        company: z.string(),
        location: z.string(),
        period: z.string(),
        tag: z.string(),
        accent: hex,
        skills: z.array(z.string()).default([]),
        responsibilities: z.array(z.string()).default([]),
      }),
    )
    .optional(),

  stack: z
    .object({
      /** Two marquee rows, sliding in opposite directions. */
      marquee: z.array(z.array(z.object({ label: z.string(), color: hex }))).length(2),
      categories: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          desc: z.string(),
          accent: hex,
          skills: z.array(z.object({ name: z.string(), level: z.number().min(0).max(100) })),
        }),
      ),
    })
    .optional(),

  /** Headline metrics. Static by design — see DECISIONS note on the LeetCode API. */
  metrics: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        suffix: z.string().optional(),
        note: z.string(),
        accent: hex,
        breakdown: z.array(z.object({ label: z.string(), color: hex })).default([]),
      }),
    )
    .optional(),

  awards: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        org: z.string(),
        location: z.string(),
        date: z.string(),
        badge: z.string(),
        accent: hex,
        desc: z.string(),
        impactPoints: z.array(z.string()).default([]),
      }),
    )
    .optional(),

  beyond: z
    .object({
      quads: z.array(
        z.object({ title: z.string(), tag: z.string(), accent: hex, desc: z.string() }),
      ),
      education: z.object({
        degree: z.string(),
        specialisation: z.string().optional(),
        institution: z.string(),
        period: z.string(),
        highlight: z.string().optional(),
        columns: z.array(z.object({ title: z.string(), accent: hex, items: z.array(z.string()) })),
      }),
    })
    .optional(),

  contact: z
    .object({
      heading: z.string(),
      blurb: z.string(),
      availability: z.string().optional(),
    })
    .optional(),
});

const founders = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/founders' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      slug: z.string(),
      role: z.string(),
      /** Optional until real photos are supplied; falls back to an initials avatar. */
      photo: image().optional(),
      skills: z.array(z.string()),
      domains: z.array(z.string()),
      bio: z.string(),
      linkedin: z.url().optional(),
      github: z.url().optional(),
      email: z.email().optional(),
      leetcode: z.url().optional(),
      featuredProjects: z.array(reference('projects')).default([]),
      /** Omit entirely and the founder gets a /team/ card but no portfolio page. */
      portfolio: portfolio.optional(),
    }),
});

export const collections = { services, projects, founders };
