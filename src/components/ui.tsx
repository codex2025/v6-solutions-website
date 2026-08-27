import type { ReactNode } from "react";
import Link from "next/link";

export function GridBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-backdrop absolute inset-0" />
      <div className="glow-orb absolute right-[-10%] top-1/4 h-[500px] w-[500px] rounded-full" />
    </div>
  );
}

export function Kicker({
  children,
  as: Tag = "p",
}: {
  children: ReactNode;
  as?: "p" | "h2";
}) {
  return (
    <Tag className="font-mono text-xs font-medium tracking-[0.2em] text-accent-cyan">
      {children}
    </Tag>
  );
}

export function ScopeBadge({ scope }: { scope: "WORLDWIDE" | "INDIA" }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] font-medium tracking-wider text-fg-muted">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          scope === "WORLDWIDE" ? "bg-accent-cyan" : "bg-accent-green"
        }`}
      />
      {scope}
    </span>
  );
}

export function Dashes() {
  return <div aria-hidden="true" className="dashed-divider w-full" />;
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-muted transition-colors hover:text-fg"
    >
      ← {children}
    </Link>
  );
}

export function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-accent-blue px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-fg-muted"
    >
      {children}
    </Link>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-border-soft bg-surface p-6 transition-colors hover:border-border ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}

export function PageHero({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border-soft">
      <GridBackdrop />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Kicker>{kicker}</Kicker>
        <h1 className="mt-4 max-w-3xl font-mono text-4xl font-semibold leading-[1.1] text-fg sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-base text-fg-muted sm:text-lg">{description}</p>
        )}
      </div>
    </section>
  );
}
