"use client";

import { useEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

export function ProcessTimeline({
  steps,
}: {
  steps: { title: string; description: string }[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const fill = fillRef.current;
    if (!container || !fill || prefersReducedMotion()) return;
    const gsap = getGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );

      stepRefs.current.forEach((stepEl, i) => {
        const circle = circleRefs.current[i];
        if (!stepEl || !circle) return;

        gsap.fromTo(
          stepEl,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stepEl,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        ScrollTriggerToggle(gsap, stepEl, circle);
      });
    }, containerRef);

    return () => ctx.revert();
  }, [steps]);

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border-soft" />
      <div
        ref={fillRef}
        className="absolute left-[15px] top-2 bottom-2 w-px origin-top bg-accent-green"
      />
      <div className="space-y-9">
        {steps.map((step, i) => (
          <div
            key={step.title}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className="relative flex gap-5"
          >
            <div
              ref={(el) => {
                circleRefs.current[i] = el;
              }}
              className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-border bg-bg font-mono text-sm font-semibold text-fg-muted transition-colors duration-300"
            >
              {i + 1}
            </div>
            <div className="pt-0.5">
              <h3 className="font-mono text-base font-semibold text-fg">{step.title}</h3>
              <p className="mt-1 text-sm text-fg-muted">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScrollTriggerToggle(
  gsap: ReturnType<typeof getGsap>,
  stepEl: HTMLElement,
  circle: HTMLElement
) {
  gsap.timeline({
    scrollTrigger: {
      trigger: stepEl,
      start: "top 65%",
      end: "bottom 35%",
      toggleActions: "play reverse play reverse",
    },
  }).to(circle, {
    borderColor: "#22e6a8",
    color: "#22e6a8",
    duration: 0.3,
    ease: "power1.out",
  });
}
