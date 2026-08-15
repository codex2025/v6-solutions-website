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
      featuredProjects: z.array(reference('projects')).default([]),
    }),
});

export const collections = { services, projects, founders };
