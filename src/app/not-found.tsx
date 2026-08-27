import { GridBackdrop, PrimaryButton } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <GridBackdrop />
      <div className="relative mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
        <p className="font-mono text-sm font-semibold tracking-[0.3em] text-accent-cyan">404</p>
        <h1 className="mt-4 font-mono text-3xl font-semibold text-fg sm:text-4xl">
          That page doesn&apos;t exist.
        </h1>
        <p className="mt-4 text-base text-fg-muted">
          Maybe it moved, or maybe it was never built.
        </p>
        <div className="mt-8 flex justify-center">
          <PrimaryButton href="/">Back to home</PrimaryButton>
        </div>
      </div>
    </section>
  );
}
