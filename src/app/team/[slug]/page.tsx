import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink, Card, GridBackdrop, Kicker } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { founders, getFounderBySlug } from "@/data/team";
import { getProjectBySlug } from "@/data/portfolio";
import { canonical } from "@/config/site";

export function generateStaticParams() {
  return founders.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const founder = getFounderBySlug(slug);
  if (!founder) return {};
  return {
    title: `${founder.name} — ${founder.title}`,
    description: founder.intro,
    ...canonical(`/team/${founder.slug}/`),
  };
}

export default async function FounderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const founder = getFounderBySlug(slug);
  if (!founder) notFound();

  const projects = founder.projectSlugs
    .map((s) => getProjectBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <section className="relative overflow-hidden border-b border-border-soft">
        <GridBackdrop />
        <Reveal className="relative mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          <BackLink href="/team/">Team</BackLink>
          <h1 className="mt-6 font-mono text-4xl font-semibold leading-tight text-fg sm:text-5xl">
            {founder.name}
          </h1>
          <p className="mt-2 text-lg text-accent-cyan">{founder.title}</p>
          <p className="mt-5 max-w-xl text-lg text-fg-muted">{founder.intro}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {founder.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-fg-dim"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <a
              href={founder.externalPortfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-accent-blue px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              View full portfolio ↗
            </a>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <Reveal>
          <Kicker as="h2">ABOUT</Kicker>
        </Reveal>
        <RevealGroup className="mt-6 grid gap-6 sm:grid-cols-3">
          {founder.highlights.map((h) => (
            <RevealItem key={h.title}>
              <h3 className="font-mono text-sm font-semibold text-fg">{h.title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{h.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="border-t border-border-soft bg-bg-raised">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <Reveal>
            <Kicker as="h2">HONORS</Kicker>
          </Reveal>
          <RevealGroup className="mt-6 space-y-4">
            {founder.honors.map((honor) => (
              <RevealItem key={honor.title}>
                <div className="rounded-xl border border-border-soft bg-surface p-5">
                  <h3 className="font-mono text-sm font-semibold text-fg">{honor.title}</h3>
                  <p className="mt-1 font-mono text-xs text-accent-green">{honor.place}</p>
                  <p className="mt-2 text-sm text-fg-muted">{honor.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <Reveal>
          <Kicker as="h2">SELECTED WORK</Kicker>
        </Reveal>
        <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <RevealItem key={project.slug}>
              <Link href={`/portfolio/${project.slug}/`}>
                <Card className="h-full">
                  <p className="font-mono text-[10px] tracking-wider text-fg-dim">
                    {project.year} · {project.category}
                  </p>
                  <h3 className="mt-2 font-mono text-base font-semibold text-fg">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-fg-muted">{project.solution}</p>
                </Card>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
