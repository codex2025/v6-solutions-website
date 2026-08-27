import type { Metadata } from "next";
import Link from "next/link";
import { Card, GridBackdrop, Kicker } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { founders, TOTAL_FOUNDERS } from "@/data/team";
import { canonical } from "@/config/site";

export const metadata: Metadata = {
  title: "Team",
  description: "Six equal founders. People who build.",
  ...canonical("/team/"),
};

const placeholderCount = TOTAL_FOUNDERS - founders.length;

export default function TeamPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border-soft">
        <GridBackdrop />
        <Reveal className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Kicker>THE TEAM</Kicker>
          <h1 className="mt-4 max-w-2xl font-mono text-4xl font-semibold leading-[1.1] text-fg sm:text-5xl">
            People who build.
          </h1>
          <p className="mt-5 max-w-xl text-base text-fg-muted sm:text-lg">
            Six equal founders. Each one keeps their own portfolio — click through for the full
            picture.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {founders.map((founder) => (
            <RevealItem key={founder.slug}>
              <Link href={`/team/${founder.slug}/`}>
                <Card className="h-full">
                  <h2 className="font-mono text-lg font-semibold text-fg">{founder.name}</h2>
                  <p className="mt-1 text-sm text-accent-cyan">{founder.title}</p>
                  <p className="mt-3 text-sm text-fg-muted">{founder.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {founder.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-fg-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-block font-mono text-xs text-accent-blue">
                    View portfolio →
                  </span>
                </Card>
              </Link>
            </RevealItem>
          ))}

          {Array.from({ length: placeholderCount }).map((_, i) => (
            <RevealItem key={i}>
              <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-border-soft p-6 text-center">
                <p className="font-mono text-sm text-fg-dim">Profile not published yet</p>
                <p className="mt-2 text-xs text-fg-dim">
                  We&apos;d rather leave this blank than fill it with a placeholder bio.
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
