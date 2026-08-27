import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { GridBackdrop, Kicker } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { BorderBeam } from "@/components/magicui/border-beam";
import { canonical } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you're building.",
  ...canonical("/contact/"),
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <GridBackdrop />
      <Reveal className="relative mx-auto grid max-w-5xl gap-12 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-2 md:items-start">
        <div>
          <Kicker>CONTACT</Kicker>
          <h1 className="mt-4 font-mono text-4xl font-semibold leading-tight text-fg sm:text-5xl">
            Tell us what you&apos;re building.
          </h1>
          <p className="mt-5 max-w-md text-lg text-fg-muted">
            We&apos;ll tell you honestly if we&apos;re the right fit — and point you elsewhere if
            we&apos;re not.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-border-soft bg-surface p-6 sm:p-8">
          <BorderBeam duration={8} size={220} />
          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}
