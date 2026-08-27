import type { Metadata } from "next";
import { GridBackdrop, Kicker, SecondaryButton } from "@/components/ui";
import { canonical } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of Service.",
  ...canonical("/terms/"),
};

export default function TermsPage() {
  return (
    <section className="relative overflow-hidden">
      <GridBackdrop />
      <div className="relative mx-auto max-w-2xl px-5 py-28 text-center sm:px-8">
        <Kicker>LEGAL</Kicker>
        <h1 className="mt-4 font-mono text-3xl font-semibold text-fg sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-5 text-base text-fg-muted">
          This page isn&apos;t written yet. We&apos;d rather leave it blank than publish
          placeholder legal text as if it were real.
        </p>
        <div className="mt-8 flex justify-center">
          <SecondaryButton href="/contact/">Questions? Get in touch.</SecondaryButton>
        </div>
      </div>
    </section>
  );
}
