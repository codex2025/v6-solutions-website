import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink, GridBackdrop, Kicker, PrimaryButton } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { getProjectBySlug, portfolioProjects } from "@/data/portfolio";
import { canonical } from "@/config/site";

export function generateStaticParams() {
  return portfolioProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.solution,
    ...canonical(`/portfolio/${project.slug}/`),
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border-soft">
        <GridBackdrop />
        <Reveal className="relative mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          <BackLink href="/portfolio/">Portfolio</BackLink>
          <p className="mt-6 font-mono text-xs tracking-wider text-fg-dim">
            {project.type.toUpperCase()} · {project.year}
          </p>
          <p className="mt-2 font-mono text-xs tracking-wider text-accent-cyan">
            {project.category}
          </p>
          <h1 className="mt-3 font-mono text-4xl font-semibold leading-tight text-fg sm:text-5xl">
            {project.title}
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <Reveal>
          <Kicker>PROBLEM</Kicker>
          <p className="mt-4 text-lg text-fg">{project.problem}</p>
        </Reveal>
      </section>

      <section className="border-t border-border-soft bg-bg-raised">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          <Reveal>
            <Kicker>SOLUTION</Kicker>
            <p className="mt-4 text-lg text-fg">{project.solution}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <Reveal>
          <Kicker>OUTCOME</Kicker>
          <p className="mt-4 text-lg text-fg">{project.outcome}</p>
          <div className="mt-8">
            <PrimaryButton href="/contact/">Start something like this</PrimaryButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
