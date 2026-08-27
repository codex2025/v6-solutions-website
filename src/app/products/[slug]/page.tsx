import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink, GridBackdrop, Kicker, PrimaryButton } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { getProductBySlug, products } from "@/data/products";
import { canonical } from "@/config/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
    ...canonical(`/products/${product.slug}/`),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border-soft">
        <GridBackdrop />
        <Reveal className="relative mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          <BackLink href="/products/">Products</BackLink>
          <div className="mt-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] font-medium tracking-wider text-accent-cyan">
              {product.status.toUpperCase()}
            </span>
          </div>
          <h1 className="mt-4 font-mono text-4xl font-semibold leading-tight text-fg sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-fg-muted">{product.summary}</p>
          <div className="mt-8">
            <PrimaryButton href="/contact/">Get in touch about it</PrimaryButton>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <Reveal>
          <Kicker>THE PROBLEM</Kicker>
          <p className="mt-4 text-lg text-fg">{product.problem}</p>
        </Reveal>
      </section>

      <section className="border-t border-border-soft bg-bg-raised">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <Reveal>
            <Kicker>OUR APPROACH</Kicker>
            <p className="mt-4 text-lg text-fg">{product.approach}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <Reveal>
          <p className="rounded-2xl border border-border-soft bg-surface p-6 text-sm text-fg-muted">
            {product.note}
          </p>
        </Reveal>
      </section>
    </>
  );
}
