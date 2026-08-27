"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [pointerOnLink, setPointerOnLink] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 260, mass: 0.4 });
  const ringY = useSpring(y, { damping: 28, stiffness: 260, mass: 0.4 });

  useEffect(() => {
    const canHover = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reducedMotion) return;

    // One-time capability check on mount; window.matchMedia isn't available
    // during render/SSR, so this can't be computed outside an effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(true);
    document.documentElement.classList.add("custom-cursor-active");

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setPointerOnLink(Boolean(target.closest("a, button, summary, input, textarea")));
    };

    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!active) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-accent-cyan"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-accent-cyan/60"
        animate={{
          width: pointerOnLink ? 44 : 28,
          height: pointerOnLink ? 44 : 28,
          opacity: pointerOnLink ? 0.9 : 0.5,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
