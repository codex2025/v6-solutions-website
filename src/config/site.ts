/**
 * Site-wide constants. Single source of truth.
 *
 * Every value here traces to an approved decision in DECISIONS.md.
 * Do not add brand colours, fonts or taglines to this file — those are
 * Phase 2 decisions and are not yet approved.
 */

/**
 * Decision 1.4 — v6solutions.in is being purchased within days.
 * Canonical URLs, sitemap and Open Graph tags all read from this one constant,
 * so switching to the real domain is a single-line change.
 */
export const SITE_URL = 'https://v6solutions.pages.dev';
// export const SITE_URL = 'https://v6solutions.in'; // ← switch to this once DNS resolves

/** Decision 1.9 — plain brand name for body copy and page titles. */
export const BRAND = 'V6 Solutions';

/**
 * Decision 1.9 — ™ appears in the wordmark/logo ONLY, never in body copy.
 * Never use ® : no trademark registration has been granted.
 */
export const BRAND_MARK = 'V6 Solutions™';

/**
 * Decision 1.8 — holding-page descriptor. This is NOT the tagline.
 * The tagline is a Phase 2 decision and has not been made.
 */
export const ONE_LINER =
  'Hardware. Software. Design. Engineering solutions for businesses worldwide.';

/**
 * Decision 1.13 — business email only; no phone number published yet.
 * CLAUDE.md forbids committing founders' personal phone numbers.
 */
// PLACEHOLDER: replace with the real business email address
export const CONTACT_EMAIL = 'PLACEHOLDER@v6solutions.in';

/** True once a real business email exists. Gates the contact link on the holding page. */
export const HAS_CONTACT_EMAIL = !CONTACT_EMAIL.startsWith('PLACEHOLDER');

/** Decision 1.10 — approved primary navigation, in this order. */
export const NAV = [
  { label: 'Services', href: '/services/' },
  { label: 'Products', href: '/products/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Team', href: '/team/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const satisfies ReadonlyArray<{ label: string; href: string }>;
