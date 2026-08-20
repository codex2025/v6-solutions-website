/**
 * Shared per-service icon set — hand-drawn, not a generic icon library, so
 * each of the 8 fields reads as visually distinct (founder direction: "each
 * section... portrayed uniquely"). Keyed by the `icon` field in
 * src/content/services/*.md frontmatter. Consumed by Home's services teaser
 * grid and by services/[slug].astro so there is one definition, not two.
 *
 * `accent` is a manual interpolation across the brand gradient
 * (#014af0 -> #03adc1 -> #84f660), spread evenly left to right across the
 * 8 services so the grid reads as one continuous spectrum.
 */

export interface ServiceIconDef {
  accent: string;
  svg: string;
}

export const SERVICE_ICONS: Record<string, ServiceIconDef> = {
  code: {
    accent: '#2e7cff',
    svg: `<path d="M17 14 L8 24 L17 34" /><path d="M31 14 L40 24 L31 34" /><line x1="24" y1="16" x2="24" y2="32" stroke-width="2.5" />`,
  },
  design: {
    accent: '#22c7d9',
    svg: `<circle cx="18" cy="19" r="9" stroke="#4c8cff" /><circle cx="30" cy="19" r="9" stroke="#3cd3e4" /><circle cx="24" cy="29" r="9" stroke="#9cfa7c" />`,
  },
  automation: {
    accent: '#1fa6d9',
    svg: `<circle cx="24" cy="24" r="10" /><circle cx="24" cy="24" r="4" /><line x1="24" y1="6" x2="24" y2="12" /><line x1="24" y1="36" x2="24" y2="42" /><line x1="6" y1="24" x2="12" y2="24" /><line x1="36" y1="24" x2="42" y2="24" /><line x1="10.9" y1="10.9" x2="15" y2="15" /><line x1="33" y1="33" x2="37.1" y2="37.1" /><line x1="10.9" y1="37.1" x2="15" y2="33" /><line x1="33" y1="15" x2="37.1" y2="10.9" />`,
  },
  cctv: {
    accent: '#17b7c7',
    svg: `<rect x="9" y="19" width="20" height="12" rx="3" /><circle cx="19" cy="25" r="4" /><path d="M29 22 L38 17 V33 L29 28" /><path d="M33 12 C37.5 16.5 37.5 31.5 33 36" stroke-dasharray="2 3" />`,
  },
  cad: {
    accent: '#0fc7b0',
    svg: `<path d="M8 36 L8 14 L30 36 Z" /><circle cx="34" cy="18" r="2" /><path d="M34 20 L34 28" stroke-dasharray="1 3" /><path d="M26 30 A8 8 0 0 0 34 30" />`,
  },
  arvr: {
    accent: '#3fd79a',
    svg: `<path d="M24 8 L38 16 V32 L24 40 L10 32 V16 Z" /><circle cx="24" cy="24" r="3" /><line x1="24" y1="24" x2="24" y2="14" /><line x1="24" y1="24" x2="33" y2="29" /><line x1="24" y1="24" x2="15" y2="29" /><circle cx="24" cy="14" r="1.6" fill="currentColor" /><circle cx="33" cy="29" r="1.6" fill="currentColor" /><circle cx="15" cy="29" r="1.6" fill="currentColor" />`,
  },
  marketing: {
    accent: '#6be97c',
    svg: `<line x1="8" y1="40" x2="40" y2="40" /><rect x="12" y="28" width="6" height="12" /><rect x="21" y="20" width="6" height="20" /><rect x="30" y="12" width="6" height="28" /><path d="M28 16 L38 8" /><path d="M31 8 H38 V15" />`,
  },
  video: {
    accent: '#84f660',
    svg: `<rect x="8" y="20" width="32" height="18" rx="2" /><path d="M8 20 L14 12 H20 L16 20" /><path d="M20 20 L26 12 H32 L28 20" /><path d="M32 20 L38 12 H40 V20" /><line x1="16" y1="28" x2="30" y2="28" />`,
  },
};
