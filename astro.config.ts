// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import { SITE_URL } from './src/config/site';

// https://astro.build/config
export default defineConfig({
  // Decision 1.4 — read from src/config/site.ts so the switch to
  // v6solutions.in stays a single-line change. Required by @astrojs/sitemap
  // and by canonical/Open Graph URLs.
  site: SITE_URL,

  // Decision 1.3 — Cloudflare Pages. Static output, no adapter, no server.
  output: 'static',

  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});
