import type { Metadata } from "next";
import Link from "next/link";
import { Card, GridBackdrop, Kicker, ScopeBadge } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { services } from "@/data/services";
import { canonical } from "@/config/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Eight fields, one accountable team — from software to CCTV installation.",
  ...canonical("/services/"),
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border-soft">
        <GridBackdrop />
        <Reveal className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Kicker>BUILD · INNOVATE · ELEVATE</Kicker>
          <h1 className="mt-4 max-w-2xl font-mono text-4xl font-semibold leading-[1.1] text-fg sm:text-5xl">
            Eight fields, one accountable team.
          </h1>
          <p className="mt-5 max-w-xl text-base text-fg-muted sm:text-lg">
            Software and design ship anywhere. Hardware automation and CCTV are on-site work —
            for now, that&apos;s India only.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <RevealItem key={service.slug}>
              <Link href={`/services/${service.slug}/`}>
                <Card className="h-full">
                  <ScopeBadge scope={service.scope} />
                  <h2 className="mt-4 font-mono text-lg font-semibold text-fg">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm text-fg-muted">{service.tagline}</p>
                </Card>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
