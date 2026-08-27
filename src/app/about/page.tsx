import type { Metadata } from "next";
import { Card, GridBackdrop, Kicker, PrimaryButton } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { canonical } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: "Six founders, one company.",
  ...canonical("/about/"),
};

const points = [
  {
    label: "Structure",
    title: "Six equal founders",
    description:
      "No single founder sits above the others. Each one owns real parts of the work — see the team page for who does what.",
  },
  {
    label: "Range",
    title: "Hardware and software, together",
    description: "Eight fields under one roof — see the services page for the full list.",
  },
  {
    label: "Reach",
    title: "India and worldwide",
    description:
      "Software, design, AR/VR, marketing and video work ship anywhere. Hardware automation and CCTV are on-site work — India only, for now.",
  },
  {
    label: "Proof",
    title: "We build our own products too",
    description: "Our first is a low-cost IC tester, currently in development.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border-soft">
        <GridBackdrop />
        <Reveal className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Kicker>ABOUT</Kicker>
          <h1 className="mt-4 max-w-2xl font-mono text-4xl font-semibold leading-[1.1] text-fg sm:text-5xl">
            Six founders, one company.
          </h1>
          <p className="mt-5 max-w-xl text-base text-fg-muted sm:text-lg">
            We&apos;re a technology company based in Tamil Nadu, working with clients across
            India and worldwide — hardware, software, design and the engineering in between.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {points.map((point) => (
            <RevealItem key={point.label}>
              <Card>
                <p className="font-mono text-xs tracking-wider text-accent-cyan">
                  {point.label.toUpperCase()}
                </p>
                <h2 className="mt-3 font-mono text-lg font-semibold text-fg">{point.title}</h2>
                <p className="mt-2 text-sm text-fg-muted">{point.description}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="border-t border-border-soft bg-bg-raised">
        <Reveal className="mx-auto max-w-2xl px-5 py-16 text-center sm:px-8">
          <p className="text-base text-fg-muted">
            The founding story — in the founders&apos; own words — is coming. We&apos;d rather
            leave this section short than fill it with something nobody actually said.
          </p>
          <div className="mt-7 flex justify-center">
            <PrimaryButton href="/contact/">Get in touch</PrimaryButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
