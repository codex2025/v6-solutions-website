import type { Metadata } from "next";
import Link from "next/link";
import { Card, Dashes, GridBackdrop, Kicker, PrimaryButton, SecondaryButton } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { ZoomReveal } from "@/components/zoom-reveal";
import { HorizontalScrollCards } from "@/components/horizontal-scroll-cards";
import { Marquee } from "@/components/marquee";
import { HeroLogoParallax } from "@/components/hero-logo-parallax";
import { services } from "@/data/services";
import { products } from "@/data/products";
import { canonical } from "@/config/site";
import v6Icon from "@/assets/brand/v6-icon.png";

export const metadata: Metadata = canonical("/");

const whyPoints = [
  {
    number: "01",
    title: "Hardware and software, one roof",
    description:
      "Most agencies pick one side. We do both — from a PCB to the app that talks to it.",
  },
  {
    number: "02",
    title: "Six founders, no handoffs",
    description:
      "The people who scope the work are the people who build it — nothing gets lost between departments.",
  },
  {
    number: "03",
    title: "We build things that work",
    description:
      "Prototypes, MVPs and production systems — judged by whether they run, not just how they look in a deck.",
  },
];

export default function HomePage() {
  const icTester = products[0];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border-soft">
        <GridBackdrop />
        <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <Reveal>
            <Kicker>BUILD · INNOVATE · ELEVATE</Kicker>
            <h1 className="mt-5 max-w-2xl font-mono text-5xl font-semibold leading-[1.05] text-fg sm:text-6xl">
              Hardware. Software. Design.
            </h1>
            <p className="mt-6 max-w-lg text-base text-fg-muted sm:text-lg">
              Hardware. Software. Design. Engineering solutions for businesses worldwide.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <PrimaryButton href="/contact/">Start a project</PrimaryButton>
              <SecondaryButton href="/portfolio/">See our work</SecondaryButton>
            </div>
          </Reveal>
          <HeroLogoParallax src={v6Icon} className="relative hidden h-[420px] lg:block" />
        </div>
        <div className="relative border-t border-border-soft bg-bg-raised/60 py-4">
          <Marquee
            speed={34}
            items={services.map((s) => (
              <div key={s.slug} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                <span className="font-mono text-sm text-fg-muted">{s.title}</span>
              </div>
            ))}
          />
        </div>
        <Dashes />
      </section>

      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <HorizontalScrollCards
          heading={
            <>
              <Kicker>WHAT WE BUILD</Kicker>
              <ZoomReveal>
                <h2 className="mt-3 max-w-2xl font-mono text-3xl font-semibold text-fg sm:text-4xl lg:text-5xl">
                  Eight fields, one accountable team.
                </h2>
              </ZoomReveal>
              <p className="mt-4 max-w-md text-sm text-fg-dim lg:hidden">
                Scroll to see all eight — or keep scrolling the page for more.
              </p>
            </>
          }
        >
          {services.map((service) => (
            <div key={service.slug} className="lg:w-[300px] lg:shrink-0">
              <Link href={`/services/${service.slug}/`}>
                <Card className="h-full">
                  <h3 className="font-mono text-base font-semibold text-fg">{service.title}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{service.tagline}</p>
                </Card>
              </Link>
            </div>
          ))}
        </HorizontalScrollCards>
      </div>

      <section className="border-t border-border-soft bg-bg-raised">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <Kicker>WHY V6 SOLUTIONS</Kicker>
            <h2 className="mt-3 max-w-2xl font-mono text-3xl font-semibold text-fg sm:text-4xl">
              Built by people who ship, not just design.
            </h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-8 sm:grid-cols-3">
            {whyPoints.map((point) => (
              <RevealItem key={point.number}>
                <span className="font-mono text-sm text-accent-green">{point.number}</span>
                <h3 className="mt-3 font-mono text-lg font-semibold text-fg">{point.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{point.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <Kicker>IN DEVELOPMENT</Kicker>
          <h2 className="mt-3 max-w-2xl font-mono text-3xl font-semibold text-fg sm:text-4xl">
            Our first product: a low-cost IC Tester
          </h2>
          <p className="mt-5 max-w-2xl text-base text-fg-muted">{icTester.summary}</p>
          <div className="mt-7">
            <SecondaryButton href={`/products/${icTester.slug}/`}>
              See the project
            </SecondaryButton>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-border-soft bg-bg-raised">
        <Reveal className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
          <h2 className="font-mono text-3xl font-semibold text-fg sm:text-4xl">
            Have something to build?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-fg-muted">
            Tell us what it is — we&apos;ll tell you honestly if we&apos;re the right fit.
          </p>
          <div className="mt-8 flex justify-center">
            <PrimaryButton href="/contact/">Get in touch</PrimaryButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
