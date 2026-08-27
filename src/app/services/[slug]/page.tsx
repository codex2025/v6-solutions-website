import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BackLink, Dashes, GridBackdrop, Kicker, PrimaryButton } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { ProcessTimeline } from "@/components/process-timeline";
import { getAdjacentService, getServiceBySlug, services } from "@/data/services";
import { canonical } from "@/config/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.tagline,
    ...canonical(`/services/${service.slug}/`),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const next = getAdjacentService(slug)!;
  const scopeLabel = service.scope === "WORLDWIDE" ? "WORLDWIDE" : "INDIA — ON-SITE";

  return (
    <>
      <section className="relative overflow-hidden border-b border-border-soft">
        <GridBackdrop />
        <Reveal className="relative mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
          <BackLink href="/services/">All services</BackLink>
          <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] font-medium tracking-wider text-fg-muted">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                service.scope === "WORLDWIDE" ? "bg-accent-cyan" : "bg-accent-green"
              }`}
            />
            {scopeLabel}
          </div>
          <h1 className="mt-4 font-mono text-4xl font-semibold leading-tight text-fg sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-fg-muted">{service.tagline}</p>
          <p className="mt-5 max-w-xl text-base text-fg-muted">{service.summary}</p>
          <div className="mt-8">
            <PrimaryButton href="/contact/">Start a project</PrimaryButton>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <Reveal>
          <Kicker as="h2">WHAT&apos;S INCLUDED</Kicker>
        </Reveal>
        <RevealGroup className="mt-5 grid gap-3 sm:grid-cols-2">
          {service.whatsIncluded.map((item) => (
            <RevealItem key={item}>
              <div className="rounded-xl border border-border-soft bg-surface px-4 py-3 text-sm text-fg">
                {item}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="border-t border-border-soft bg-bg-raised">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
          <Reveal>
            <Kicker as="h2">HOW IT RUNS</Kicker>
          </Reveal>
          <div className="mt-8">
            <ProcessTimeline steps={service.process} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <Reveal>
          <Kicker>QUESTIONS</Kicker>
          <div className="mt-5 divide-y divide-border-soft border-y border-border-soft">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-sm font-medium text-fg">
                  {faq.question}
                  <span className="text-fg-dim transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-fg-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      <Dashes />

      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <Link
          href={`/services/${next.slug}/`}
          className="flex items-center justify-between text-fg-muted hover:text-fg"
        >
          <span className="font-mono text-xs tracking-wider">NEXT</span>
          <span className="font-mono text-base font-semibold">{next.title} →</span>
        </Link>
      </section>
    </>
  );
}
