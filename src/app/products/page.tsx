import type { Metadata } from "next";
import Link from "next/link";
import { Card, GridBackdrop, Kicker } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { products } from "@/data/products";
import { canonical } from "@/config/site";

export const metadata: Metadata = {
  title: "Products",
  description: "Most of what we do is client work. This is what we build for ourselves.",
  ...canonical("/products/"),
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border-soft">
        <GridBackdrop />
        <Reveal className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Kicker>PRODUCTS</Kicker>
          <h1 className="mt-4 max-w-2xl font-mono text-4xl font-semibold leading-[1.1] text-fg sm:text-5xl">
            We build our own things, too.
          </h1>
          <p className="mt-5 max-w-xl text-base text-fg-muted sm:text-lg">
            Most of what we do is client work. This is what we build for ourselves — starting
            with one.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {products.map((product) => (
            <RevealItem key={product.slug}>
              <Link href={`/products/${product.slug}/`}>
                <Card className="h-full">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] font-medium tracking-wider text-accent-cyan">
                    {product.status.toUpperCase()}
                  </span>
                  <h2 className="mt-4 font-mono text-lg font-semibold text-fg">{product.name}</h2>
                  <p className="mt-2 text-sm text-fg-muted">{product.summary}</p>
                  <span className="mt-4 inline-block font-mono text-xs text-accent-blue">
                    View project →
                  </span>
                </Card>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
