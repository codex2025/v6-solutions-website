/**
 * Procedural Three.js scenes — decision 2.9: no external 3D asset files
 * exist yet, so every visual here is generated in code, not loaded from a
 * GLB/GLTF. Rich-tier only (see motion-rich.ts): a lite-tier visitor never
 * fetches this module.
 *
 * The mount element must be a positioned block with a real width/height
 * (an aspect-ratio wrapper works well) — the renderer sizes to its bounds
 * via ResizeObserver.
 */
import * as THREE from 'three';

const GRADIENT_STOPS = [new THREE.Color('#014af0'), new THREE.Color('#03adc1'), new THREE.Color('#84f660')];

function gradientColorAt(t: number): THREE.Color {
  const clamped = Math.min(Math.max(t, 0), 1);
  const scaled = clamped * (GRADIENT_STOPS.length - 1);
  const i = Math.min(Math.floor(scaled), GRADIENT_STOPS.length - 2);
  const localT = scaled - i;
  return GRADIENT_STOPS[i].clone().lerp(GRADIENT_STOPS[i + 1], localT);
}

// Six nodes, two arms converging — a quiet echo of "six founders" / a V,
// not a redraw of the logo itself.
const NODES: Array<[number, number, number]> = [
  [-2.3, 1.7, 0.1],
  [-1.5, 0.55, 0.35],
  [-0.7, -0.55, 0],
  [0.7, -0.55, 0.25],
  [1.55, 0.6, 0],
  [2.35, 1.75, -0.15],
];

const EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [3, 4],
  [4, 5],
  [2, 3],
];

export function mountScene(container: HTMLElement, _kind: string): void {
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.domElement.style.cssText = 'display:block; width:100%; height:100%;';
  container.appendChild(renderer.domElement);

  // spinGroup carries the continuous ambient rotation; tiltGroup layers the
  // pointer-parallax on top so the two motions never fight or drift.
  const spinGroup = new THREE.Group();
  scene.add(spinGroup);
  const tiltGroup = new THREE.Group();
  spinGroup.add(tiltGroup);

  scene.add(new THREE.AmbientLight(0x0b1220, 1.1));
  const keyLight = new THREE.DirectionalLight(0x4c8cff, 2.4);
  keyLight.position.set(-4, 3, 5);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0x84f660, 1.6);
  rimLight.position.set(4, -2, 3);
  scene.add(rimLight);

  const nodeGeometry = new THREE.IcosahedronGeometry(0.24, 0);
  NODES.forEach(([x, y, z]) => {
    const t = (x + 2.6) / 5.2; // left -> right across the arrangement
    const color = gradientColorAt(t);
    const material = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.35,
      metalness: 0.55,
      roughness: 0.3,
    });
    const mesh = new THREE.Mesh(nodeGeometry, material);
    mesh.position.set(x, y, z);
    tiltGroup.add(mesh);
  });

  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x2e7cff, transparent: true, opacity: 0.5 });
  EDGES.forEach(([a, b]) => {
    const points = [new THREE.Vector3(...NODES[a]), new THREE.Vector3(...NODES[b])];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    tiltGroup.add(new THREE.Line(geometry, lineMaterial));
  });

  // Travelling "signal" pulses along the traces — a small, literal nod to
  // circuits actually carrying something, not just a static wireframe.
  const pulseGeometry = new THREE.IcosahedronGeometry(0.055, 0);
  const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0x9cfa7c });
  const pulses = EDGES.map(([a, b], i) => {
    const mesh = new THREE.Mesh(pulseGeometry, pulseMaterial);
    mesh.userData = { a, b, offset: i / EDGES.length };
    tiltGroup.add(mesh);
    return mesh;
  });

  function layout(): void {
    const { clientWidth, clientHeight } = container;
    if (clientWidth === 0 || clientHeight === 0) return;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight, false);
  }

  const resizeObserver = new ResizeObserver(layout);
  resizeObserver.observe(container);
  layout();

  if (reducedMotion) {
    renderer.render(scene, camera);
    return;
  }

  let pointerX = 0;
  let pointerY = 0;
  window.addEventListener(
    'pointermove',
    (event) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true },
  );

  const timer = new THREE.Timer();
  let rafId = 0;

  function tick(): void {
    timer.update();
    const t = timer.getElapsed();

    spinGroup.rotation.y += 0.0025;

    const targetTiltX = pointerY * -0.15;
    const targetTiltY = pointerX * 0.15;
    tiltGroup.rotation.x += (targetTiltX - tiltGroup.rotation.x) * 0.05;
    tiltGroup.rotation.y += (targetTiltY - tiltGroup.rotation.y) * 0.05;

    pulses.forEach((pulse) => {
      const { a, b, offset } = pulse.userData as { a: number; b: number; offset: number };
      const cycle = (((t * 0.35 + offset) % 1) + 1) % 1;
      pulse.position.lerpVectors(new THREE.Vector3(...NODES[a]), new THREE.Vector3(...NODES[b]), cycle);
    });

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else tick();
  });

  tick();
}
