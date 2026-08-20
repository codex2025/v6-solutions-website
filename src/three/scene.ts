/**
 * Procedural Three.js scenes — decision 2.9: no external 3D asset files
 * exist yet, so every visual here is generated in code, not loaded from a
 * GLB/GLTF. Rich-tier only (see motion-rich.ts): a lite-tier visitor never
 * fetches this module.
 *
 * The mount element must be a positioned block with a real width/height
 * (an aspect-ratio wrapper works well) — the renderer sizes to its bounds
 * via ResizeObserver. `kind` selects which procedural scene populates it:
 * "nodes" (default, Home hero) or "chip" (Products/IC Tester hero).
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

type FrameUpdate = (elapsed: number) => void;

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

function buildNodesScene(tiltGroup: THREE.Group): FrameUpdate {
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

  return (t) => {
    pulses.forEach((pulse) => {
      const { a, b, offset } = pulse.userData as { a: number; b: number; offset: number };
      const cycle = (((t * 0.35 + offset) % 1) + 1) % 1;
      pulse.position.lerpVectors(new THREE.Vector3(...NODES[a]), new THREE.Vector3(...NODES[b]), cycle);
    });
  };
}

// A chip on a test bed, swept by a scanning beam — the IC Tester product
// page's hero. Purely procedural: no photo of the real device exists yet
// (decision 2.9), so this reads as "a chip being tested", not a render of
// the actual unit.
function buildChipScene(tiltGroup: THREE.Group): FrameUpdate {
  const grid = new THREE.GridHelper(4.2, 14, 0x1a63e0, 0x14284a);
  grid.position.y = -0.55;
  tiltGroup.add(grid);

  const bodyGeometry = new THREE.BoxGeometry(2.5, 0.26, 1.5);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x0e1420,
    emissive: 0x0b2a4a,
    emissiveIntensity: 0.4,
    metalness: 0.35,
    roughness: 0.55,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  tiltGroup.add(body);

  const pin1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0x9cfa7c }),
  );
  pin1.position.set(-1.05, 0.16, -0.6);
  tiltGroup.add(pin1);

  const pinGeometry = new THREE.BoxGeometry(0.42, 0.05, 0.08);
  const pinMaterial = new THREE.MeshStandardMaterial({
    color: 0xb9c4d6,
    emissive: 0x2e7cff,
    emissiveIntensity: 0.15,
    metalness: 0.8,
    roughness: 0.3,
  });
  const pinCount = 7;
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < pinCount; i++) {
      const pin = new THREE.Mesh(pinGeometry, pinMaterial);
      const z = -0.6 + (1.2 / (pinCount - 1)) * i;
      pin.position.set(side * 1.46, -0.02, z);
      tiltGroup.add(pin);
    }
  }

  const beamGeometry = new THREE.PlaneGeometry(0.05, 1.7);
  const beamMaterial = new THREE.MeshBasicMaterial({
    color: 0x84f660,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const beam = new THREE.Mesh(beamGeometry, beamMaterial);
  beam.rotation.x = -Math.PI / 2;
  beam.position.y = 0.16;
  tiltGroup.add(beam);

  return (t) => {
    const sweep = Math.sin(t * 0.9) * 1.15;
    beam.position.x = sweep;
    const glow = 0.4 + Math.abs(Math.sin(t * 0.9)) * 0.3;
    (beamMaterial as THREE.MeshBasicMaterial).opacity = glow;
  };
}

export function mountScene(container: HTMLElement, kind: string): void {
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, kind === 'chip' ? 1.6 : 0, 7.2);
  camera.lookAt(0, 0, 0);

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

  const update = kind === 'chip' ? buildChipScene(tiltGroup) : buildNodesScene(tiltGroup);

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

    update(t);

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else tick();
  });

  tick();
}
