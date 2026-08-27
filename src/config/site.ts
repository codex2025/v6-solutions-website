export const SITE_URL = "https://v6solutions.in";
export const SITE_NAME = "V6 Solutions";

export const NAV_LINKS = [
  { label: "Services", href: "/services/" },
  { label: "Products", href: "/products/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Team", href: "/team/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const FOOTER_COMPANY_LINKS = [
  { label: "Services", href: "/services/" },
  { label: "Products", href: "/products/" },
  { label: "Portfolio", href: "/portfolio/" },
] as const;

export const FOOTER_MORE_LINKS = [
  { label: "Team", href: "/team/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: "Terms", href: "/terms/" },
  { label: "Privacy", href: "/privacy/" },
] as const;

export const SITE_TAGLINE = "Build · Innovate · Elevate";
export const SITE_DESCRIPTION =
  "Hardware. Software. Design. Engineering solutions for businesses worldwide.";

export function canonical(path: string) {
  return { alternates: { canonical: `${SITE_URL}${path}` } };
}
