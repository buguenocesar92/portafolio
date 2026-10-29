import * as THREE from 'three';
import type { VaultNodeId } from './vaultData';

export interface VaultSceneController {
  focusNode(id: VaultNodeId): void;
  setPaused(paused: boolean): void;
  dispose(): void;
}

const SATELLITES: ReadonlyArray<{ id: VaultNodeId; x: number; y: number; z: number; color: number }> = [
  { id: 'hefesto', x: -2.75, y: 1.43, z: .45, color: 0x10b981 },
  { id: 'calify', x: 2.75, y: 1.43, z: .45, color: 0xf59e0b },
  { id: 'kraftdo', x: -2.75, y: -1.6, z: .45, color: 0x10b981 },
  { id: 'secops', x: 2.75, y: -1.6, z: .45, color: 0xf59e0b },
];

/** Render exclusivo de motivos públicos y conceptuales, nunca de topología real. */
export function createVaultScene(
  canvas: HTMLCanvasElement,
  onSelect: (id: VaultNodeId) => void,
  onFailure: () => void,
): VaultSceneController {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 100);
  camera.position.set(0, .25, 10);
  const target = new THREE.Vector3(0, 0, 0);
  camera.lookAt(target);
  const renderer = new THREE.WebGLRenderer({
    canvas, alpha: true, antialias: true, powerPreference: 'high-performance',
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.6;
  renderer.setPixelRatio(Math.min(1.7, window.devicePixelRatio || 1));

  scene.add(new THREE.AmbientLight(0x7ca99e, 1.4));
  const key = new THREE.PointLight(0x10b981, 32, 19);
  key.position.set(-4, 4, 5); scene.add(key);
  const copper = new THREE.PointLight(0xf59e0b, 22, 14);
  copper.position.set(4, -3, 2); scene.add(copper);

  const core = new THREE.Group();
  core.rotation.y = -.28;
  scene.add(core);
  const monolith = new THREE.Mesh(
    new THREE.BoxGeometry(1.65, 2.65, 1.45, 1, 5, 1),
    new THREE.MeshPhysicalMaterial({
      color: 0x273d35, metalness: .78, roughness: .23,
      clearcoat: .52, clearcoatRoughness: .17,
    }),
  );
  core.add(monolith);
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(monolith.geometry),
    new THREE.LineBasicMaterial({ color: 0x73d4a2, transparent: true, opacity: .68 }),
  );
  monolith.add(edges);
  const inner = new THREE.Mesh(
    new THREE.BoxGeometry(.82, 1.85, 1.49),
    new THREE.MeshBasicMaterial({
      color: 0x0bbf89, transparent: true, opacity: .13,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }),
  );
  core.add(inner);
  for (let n = -3; n <= 3; n++) {
    const slot = new THREE.Mesh(
      new THREE.BoxGeometry(1.15, .026, 1.49),
      new THREE.MeshBasicMaterial({
        color: n % 2 === 0 ? 0xf59e0b : 0x10b981,
        transparent: true, opacity: .45,
      }),
    );
    slot.position.y = n * .34;
    core.add(slot);
  }
  const lockBody = new THREE.Mesh(
    new THREE.BoxGeometry(.28, .32, .06),
    new THREE.MeshBasicMaterial({ color: 0xc0ffe0 }),
  );
  lockBody.position.set(0, -.1, .77); core.add(lockBody);
  const lockShackle = new THREE.Mesh(
    new THREE.TorusGeometry(.102, .028, 7, 24, Math.PI),
    new THREE.MeshBasicMaterial({ color: 0xc0ffe0 }),
  );
  lockShackle.position.set(0, .1, .77); core.add(lockShackle);

  const orbitRings: Array<{ mesh: THREE.Mesh; speed: number }> = [];
  const orbitDefinitions = [
    { radius: 2.05, pitch: 1.10, roll: -.40, tint: 0xf59e0b, speed: .085 },
    { radius: 2.60, pitch: .67, roll: .58, tint: 0x10b981, speed: -.063 },
    { radius: 3.08, pitch: 1.08, roll: -.26, tint: 0x9bd1b7, speed: .047 },
  ];
  orbitDefinitions.forEach((ring, i) => {
    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(ring.radius, i === 0 ? .021 : .015, 7, 192),
      new THREE.MeshBasicMaterial({
        color: ring.tint, transparent: true, opacity: i === 2 ? .29 : .48,
        depthWrite: false,
      }),
    );
    mesh.rotation.set(ring.pitch, i * .2, ring.roll);
    scene.add(mesh);
    orbitRings.push({ mesh, speed: ring.speed });
  });

  const satellites = new Map<VaultNodeId, THREE.Mesh>();
  const clickable: THREE.Object3D[] = [];
  const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xbaffdd });
  const particleGeometry = new THREE.SphereGeometry(.037, 7, 7);
  const flows: Array<{ particle: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; phase: number }> = [];
  SATELLITES.forEach(({ id, x, y, z, color }, index) => {
    const orb = new THREE.Mesh(
      new THREE.OctahedronGeometry(.28, 0),
      new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: .35,
        metalness: .55, roughness: .24, flatShading: true,
      }),
    );
    orb.position.set(x, y, z);
    orb.userData.vaultNode = id;
    scene.add(orb);
    clickable.push(orb);
    satellites.set(id, orb);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(.45, .012, 5, 44),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .55 }),
    );
    ring.position.copy(orb.position);
    ring.rotation.x = .3;
    scene.add(ring);
    const start = new THREE.Vector3(x, y, z);
    const curve = new THREE.QuadraticBezierCurve3(
      start,
      new THREE.Vector3(x * .40, y * .37, -.22),
      new THREE.Vector3(0, 0, 0),
    );
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(35));
    scene.add(new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
      color: color, transparent: true, opacity: .37,
    })));
    for (let p = 0; p < 2; p++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      scene.add(particle);
      flows.push({ particle, curve, phase: (p * .5 + index * .17) % 1 });
    }
  });

  const dotCount = 140;
  const dots = new Float32Array(dotCount * 3);
  for (let i=0; i<dotCount; i++) {
    const angle = (i * 2.3999632) % (2 * Math.PI);
    const r = 3.4 + (i % 8) * .12;
    dots[i * 3] = Math.cos(angle) * r;
    dots[i * 3+1] = Math.sin(angle) * r * .69;
    dots[i * 3+2] = Math.sin(i * .9) * .65 - 1.1;
  }
  const dotsGeometry = new THREE.BufferGeometry();
  dotsGeometry.setAttribute('position', new THREE.BufferAttribute(dots, 3));
  const field = new THREE.Points(dotsGeometry, new THREE.PointsMaterial({
    color: 0x87b8a3, size: .025, transparent: true, opacity: .4,
  }));
  scene.add(field);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let selected: VaultNodeId = 'hefesto';
  let visible = false;
  let paused = false;
  let disposed = false;
  let running = false;
  let raf = 0;
  let last = 0;
  let elapsed = 0;
  let impulse = 0;
  let panX = 0;
  let panY = 0;
  let focusToken = 0;
  let tween: { kill(): void } | null = null;
  let targetTween: { kill(): void } | null = null;
  let failureReported = false;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
    renderer.setSize(rect.width, rect.height, false);
  };

  const frame = (now: number) => {
    if (!running || disposed) return;
    const dt = last ? Math.min(.05, (now - last) / 1000) : 0;
    last = now;
    elapsed += dt;
    impulse *= Math.pow(.93, dt * 60);
    core.rotation.y = -.25 + Math.sin(elapsed * .35) * .17;
    core.position.y = Math.sin(elapsed * .55) * .07;
    orbitRings.forEach(({ mesh, speed }, index) => {
      mesh.rotation.z += speed * dt * (1 + impulse * 1.2);
      mesh.rotation.y += speed * dt * .4;
      mesh.material;
      if (index === 0) mesh.scale.setScalar(1 + Math.sin(elapsed * .8) * .006);
    });
    satellites.forEach((mesh, id) => {
      mesh.rotation.y = elapsed * .32;
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = selected === id ? .7 + Math.sin(elapsed * 2) * .12 : .23;
    });
    flows.forEach(({ particle, curve, phase }) => {
      const t = (elapsed * (.24 + impulse * .14) + phase) % 1;
      particle.position.copy(curve.getPoint(t));
    });
    camera.position.x += (panX - camera.position.x * .015) * dt * .25;
    camera.position.y += (panY + .25 - camera.position.y) * dt * .12;
    camera.lookAt(target);
    field.rotation.z = elapsed * .003;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };

  const reconcile = () => {
    const shouldRun = !disposed && !paused && visible && !document.hidden &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (shouldRun === running) return;
    running = shouldRun;
    if (running) {
      resize();
      last = 0;
      raf = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(raf);
    }
  };
  const findHit = (event: PointerEvent): VaultNodeId | null => {
    const box = canvas.getBoundingClientRect();
    if (!box.width || !box.height) return null;
    pointer.x = ((event.clientX - box.left) / box.width) * 2 - 1;
    pointer.y = -((event.clientY - box.top) / box.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(clickable)[0];
    return hit ? (hit.object.userData.vaultNode as VaultNodeId) : null;
  };
  const pointerMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const box = canvas.getBoundingClientRect();
    if (!box.width || !box.height) return;
    panX = ((event.clientX-box.left)/box.width-.5) * .22;
    panY = -((event.clientY-box.top)/box.height-.5) * .10;
    canvas.style.cursor = findHit(event) ? 'pointer' : 'default';
  };
  const pointerLeave = () => { panX = 0; panY = 0; canvas.style.cursor = 'default'; };
  const pointerUp = (event: PointerEvent) => {
    const id = findHit(event);
    if (id) { impulse = 1.3; onSelect(id); }
  };
  let lastScroll = window.scrollY;
  const scroll = () => {
    const delta = Math.abs(window.scrollY - lastScroll);
    lastScroll = window.scrollY;
    if (visible && !paused && delta > 2) impulse = Math.min(2.5, impulse + delta / 400);
  };
  const loseContext = (event: Event) => {
    event.preventDefault();
    running = false;
    cancelAnimationFrame(raf);
    if (!failureReported) { failureReported = true; onFailure(); }
  };
  const resizeObserver = new ResizeObserver(resize);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? false;
    reconcile();
  }, { threshold: .02 });
  resizeObserver.observe(canvas);
  intersection.observe(canvas);
  document.addEventListener('visibilitychange', reconcile);
  window.addEventListener('scroll', scroll, { passive: true });
  canvas.addEventListener('pointermove', pointerMove);
  canvas.addEventListener('pointerleave', pointerLeave);
  canvas.addEventListener('pointerup', pointerUp);
  canvas.addEventListener('webglcontextlost', loseContext);
  resize();
  renderer.render(scene, camera);

  return {
    focusNode(id) {
      if (disposed) return;
      selected = id;
      impulse = 1.4;
      const p = satellites.get(id)?.position;
      if (!p) return;
      const token = ++focusToken;
      void import('gsap').then(({ gsap }) => {
        if (disposed || token !== focusToken) return;
        tween?.kill(); targetTween?.kill();
        tween = gsap.to(camera.position, {
          x: p.x * .23, y: p.y * .17 + .25, z: 8.7, duration: .85,
          ease: 'power3.inOut',
        });
        targetTween = gsap.to(target, {
          x: p.x * .18, y: p.y * .12, z: 0, duration: .85,
          ease: 'power3.inOut',
        });
      }).catch(() => {});
    },
    setPaused(value) { paused = value; reconcile(); },
    dispose() {
      disposed = true;
      focusToken++;
      running = false;
      cancelAnimationFrame(raf);
      tween?.kill(); targetTween?.kill();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', reconcile);
      window.removeEventListener('scroll', scroll);
      canvas.removeEventListener('pointermove', pointerMove);
      canvas.removeEventListener('pointerleave', pointerLeave);
      canvas.removeEventListener('pointerup', pointerUp);
      canvas.removeEventListener('webglcontextlost', loseContext);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points || object instanceof THREE.LineSegments) {
          geometries.add(object.geometry);
          const group = Array.isArray(object.material) ? object.material : [object.material];
          group.forEach(material => materials.add(material));
        }
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
