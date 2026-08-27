import Link from "next/link";
import { LogoMark } from "@/components/logo";
import {
  FOOTER_COMPANY_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_MORE_LINKS,
  SITE_TAGLINE,
} from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-soft bg-bg-raised">
      <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border-soft py-3 font-mono text-[11px] tracking-wider text-fg-dim">
          <span>SERVICES</span>
          <span>PRODUCTS</span>
          <span>PORTFOLIO</span>
          <span>TEAM</span>
          <span className="ml-auto flex items-center gap-2 text-accent-green">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green pulse-dot" />
            Available for projects
          </span>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <LogoMark className="h-7 w-auto" />
            <span className="font-mono text-sm font-semibold text-fg">V6 Solutions</span>
          </div>
          <p className="mt-3 text-sm text-fg-muted">{SITE_TAGLINE}</p>
          <p className="mt-4 text-sm text-fg-dim">Contact details coming shortly.</p>
        </div>

        <div>
          <p className="font-mono text-xs tracking-wider text-fg-dim">COMPANY</p>
          <ul className="mt-3 space-y-2">
            {FOOTER_COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-fg-muted hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs tracking-wider text-fg-dim">MORE</p>
          <ul className="mt-3 space-y-2">
            {FOOTER_MORE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-fg-muted hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-border-soft px-5 py-6 text-sm text-fg-dim sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {year} V6 Solutions. All rights reserved.</p>
        <div className="flex gap-5">
          {FOOTER_LEGAL_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-fg-muted">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
