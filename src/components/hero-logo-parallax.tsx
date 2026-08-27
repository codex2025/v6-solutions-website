"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

export function HeroLogoParallax({
  src,
  className,
}: {
  src: StaticImageData;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;
    const gsap = getGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { opacity: 0, scale: 0.85, y: 40, rotate: -6 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      if (!prefersReducedMotion()) {
        gsap.to(img, {
          y: -60,
          rotate: 6,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className={className}>
      <div ref={imgRef} className="relative h-full w-full">
        <Image
          src={src}
          alt="V6 Solutions"
          fill
          sizes="(min-width: 1024px) 420px, 0px"
          className="object-contain drop-shadow-[0_0_60px_rgba(59,130,246,0.35)]"
          priority
        />
      </div>
    </div>
  );
}
