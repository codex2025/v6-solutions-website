"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

export function HorizontalScrollCards({
  heading,
  children,
}: {
  heading?: ReactNode;
  children: ReactNode[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || prefersReducedMotion()) return;
    const gsap = getGsap();

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollDistance = () => Math.max(0, track.scrollWidth - section.offsetWidth);
      if (scrollDistance() <= 0) return;

      const tween = gsap.to(track, {
        x: () => -scrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:pt-16"
    >
      {heading}
      <div
        ref={trackRef}
        className="mt-10 flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:flex-nowrap lg:gap-5"
      >
        {children}
      </div>
    </div>
  );
}
