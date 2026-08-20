/**
 * Rich-tier motion — only fetched when motion.ts's capability gate passes
 * (decision 2.8). GSAP + ScrollTrigger are dynamically imported here, not at
 * the top of motion.ts, so a lite-tier visitor never downloads them.
 *
 * Declarative data-attribute API so pages/components don't each write their
 * own GSAP code:
 *
 *   data-reveal              fade + rise into view once, on scroll
 *   data-reveal-group        stagger children that have data-reveal-item
 *   data-tilt                pointer-following 3D card tilt
 *   data-magnetic            button/label drifts slightly toward the pointer
 *   data-three-scene="hero"  mount point for a procedural Three.js scene
 */

export async function initRichMotion(): Promise<void> {
  const [{ default: gsap }, scrollTriggerModule] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);
  const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  initReveals(gsap);
  initTilt(gsap);
  initMagnetic(gsap);
  void initThreeScenes();
}

function initReveals(gsap: typeof import('gsap').default): void {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 28,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]');
    if (!items.length) return;
    gsap.from(items, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: group,
        start: 'top 82%',
        once: true,
      },
    });
  });
}

function initTilt(gsap: typeof import('gsap').default): void {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    card.style.transformStyle = 'preserve-3d';
    card.style.perspective = '800px';

    const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3.out' });
    const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3.out' });

    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      rotateY(px * 10);
      rotateX(py * -10);
    });

    card.addEventListener('pointerleave', () => {
      rotateX(0);
      rotateY(0);
    });
  });
}

function initMagnetic(gsap: typeof import('gsap').default): void {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const moveX = gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3.out' });
    const moveY = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3.out' });

    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const px = event.clientX - (rect.left + rect.width / 2);
      const py = event.clientY - (rect.top + rect.height / 2);
      moveX(px * 0.25);
      moveY(py * 0.25);
    });

    el.addEventListener('pointerleave', () => {
      moveX(0);
      moveY(0);
    });
  });
}

async function initThreeScenes(): Promise<void> {
  const mounts = document.querySelectorAll<HTMLElement>('[data-three-scene]');
  if (!mounts.length) return;

  const { mountScene } = await import('../three/scene');
  mounts.forEach((mount) => {
    const kind = mount.dataset.threeScene ?? 'nodes';
    mountScene(mount, kind);
  });
}
