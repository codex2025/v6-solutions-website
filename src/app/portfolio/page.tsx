import type { Metadata } from "next";
import Link from "next/link";
import { Card, GridBackdrop, Kicker } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { portfolioProjects } from "@/data/portfolio";
import { canonical } from "@/config/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Real work, not a mockup gallery.",
  ...canonical("/portfolio/"),
};

export default function PortfolioPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border-soft">
        <GridBackdrop />
        <Reveal className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Kicker>PORTFOLIO</Kicker>
          <h1 className="mt-4 max-w-2xl font-mono text-4xl font-semibold leading-[1.1] text-fg sm:text-5xl">
            Real work, not a mockup gallery.
          </h1>
          <p className="mt-5 max-w-xl text-base text-fg-muted sm:text-lg">
            Client work publishes here once cleared to share. What&apos;s below is real, sourced
            work from our own team.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {portfolioProjects.map((project) => (
            <RevealItem key={project.slug}>
              <Link href={`/portfolio/${project.slug}/`}>
                <Card className="h-full">
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-fg-dim">
                    <span>{project.year}</span>
                  </div>
                  <h2 className="mt-3 font-mono text-lg font-semibold text-fg">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-xs text-fg-dim">
                    {project.type} · {project.category}
                  </p>
                  <p className="mt-3 text-sm text-fg-muted">{project.solution}</p>
                </Card>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
