/**
 * Baseline motion controller — loaded on every page, always tiny.
 *
 * Decision 2.8: two-tier delivery. This module decides, once per page load,
 * whether the visitor gets the "rich" tier (GSAP scroll choreography + the
 * procedural Three.js scenes) or stays on the CSS-only "lite" tier that ships
 * with every page regardless. The decision is a one-time capability check,
 * not a live media-query listener — flipping tiers mid-session after the
 * heavy bundle already loaded (or didn't) would be wasted work either way.
 *
 * Touch/press ripple feedback runs unconditionally in both tiers: it's cheap
 * (Web Animations API, no library) and every visitor benefits from it.
 */

export type MotionTier = 'rich' | 'lite';

export function computeMotionTier(): MotionTier {
  if (typeof window === 'undefined' || !window.matchMedia) return 'lite';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointerFine = window.matchMedia('(pointer: fine)').matches;
  const wideEnough = window.matchMedia('(min-width: 900px)').matches;

  if (reducedMotion || !pointerFine || !wideEnough) return 'lite';
  return 'rich';
}

/**
 * Header capsule/glassmorphism on scroll (founder direction, Phase 3.5).
 * Cheap and structural, not a "rich" embellishment, so it runs in both
 * tiers: rAF-throttled scroll listener flipping one data attribute — CSS
 * (Header.astro) does the actual shape/blur transition.
 */
function initHeaderScroll(): void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return;

  const THRESHOLD = 40;
  let ticking = false;

  function update(): void {
    header!.dataset.scrolled = window.scrollY > THRESHOLD ? 'true' : 'false';
    ticking = false;
  }

  update();
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
}

function initRipple(): void {
  document.addEventListener(
    'pointerdown',
    (event) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('.ripple');
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.6;
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const dot = document.createElement('span');
      dot.setAttribute('aria-hidden', 'true');
      dot.style.cssText = `
        position:absolute; left:${x}px; top:${y}px; width:${size}px; height:${size}px;
        border-radius:9999px; background:currentColor; opacity:0.28; pointer-events:none;
        transform:scale(0); mix-blend-mode:soft-light;
      `;

      const previousPosition = getComputedStyle(target).position;
      if (previousPosition === 'static') target.style.position = 'relative';
      target.style.overflow = 'hidden';
      target.appendChild(dot);

      const anim = dot.animate([{ transform: 'scale(0)', opacity: 0.28 }, { transform: 'scale(1)', opacity: 0 }], {
        duration: 500,
        easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      });
      anim.finished.then(() => dot.remove()).catch(() => dot.remove());
    },
    { passive: true },
  );
}

export async function initMotion(): Promise<void> {
  const tier = computeMotionTier();
  document.documentElement.dataset.motionTier = tier;

  // prefers-reduced-motion is a hard "no" — never animate ripple feedback either.
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) initRipple();
  initHeaderScroll();

  if (tier === 'rich') {
    const { initRichMotion } = await import('./motion-rich');
    await initRichMotion();
  }
}
