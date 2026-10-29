import * as THREE from 'three';

/**
 * Objeto escultórico genérico, sin datos de infraestructura.
 * Geometría procedural, sin modelos externos ni peticiones de red.
 */
export function createForgeScene(canvas: HTMLCanvasElement): () => void {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
  camera.position.set(0, 0, 10.8);
  camera.lookAt(0, 0, 0);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.75;

  const sculpture = new THREE.Group();
  scene.add(sculpture);

  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.65, 1),
    new THREE.MeshPhysicalMaterial({
      color: 0xb95836,
      metalness: 0.54,
      roughness: 0.24,
      clearcoat: 0.7,
      clearcoatRoughness: 0.15,
      flatShading: true,
    }),
  );
  sculpture.add(core);
  const underlay = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.86, 1),
    new THREE.MeshBasicMaterial({
      color: 0xfbb478,
      transparent: true,
      opacity: 0.13,
      wireframe: true,
    }),
  );
  sculpture.add(underlay);

  const ribbon = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.68, 0.10, 180, 12, 2, 3),
    new THREE.MeshStandardMaterial({
      color: 0x242a27,
      metalness: 0.86,
      roughness: 0.22,
      emissive: 0x160b09,
    }),
  );
  sculpture.add(ribbon);

  const rings: THREE.Object3D[] = [];
  [
    { radius: 2.5, tilt: 0.43 },
    { radius: 2.85, tilt: -0.66 },
  ].forEach(({ radius, tilt }, index) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.012, 6, 140),
      new THREE.MeshBasicMaterial({
        color: index === 0 ? 0xab6244 : 0x7d988c,
        transparent: true,
        opacity: 0.58,
      }),
    );
    ring.rotation.set(tilt, index * 0.56, -0.38);
    scene.add(ring);
    rings.push(ring);
  });

  const emberCount = 150;
  const positions = new Float32Array(emberCount * 3);
  for (let i = 0; i < emberCount; i++) {
    const phi = (i * 2.399963229728653) % (Math.PI * 2);
    const y = 1 - (i / (emberCount - 1)) * 2;
    const spread = Math.sqrt(Math.max(0, 1 - y * y));
    const r = 2.3 + (i % 7) * 0.09;
    positions[i * 3] = Math.cos(phi) * spread * r;
    positions[i * 3 + 1] = y * r;
    positions[i * 3 + 2] = Math.sin(phi) * spread * r;
  }
  const emberGeometry = new THREE.BufferGeometry();
  emberGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const embers = new THREE.Points(
    emberGeometry,
    new THREE.PointsMaterial({
      color: 0xc76c45,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    }),
  );
  scene.add(embers);

  scene.add(new THREE.AmbientLight(0xffffff, 1.3));
  const bronze = new THREE.PointLight(0xf18a4a, 110, 16);
  bronze.position.set(3.6, 2.8, 4.2);
  scene.add(bronze);
  const fill = new THREE.PointLight(0xdce7df, 67, 15);
  fill.position.set(-3.5, -1.2, 3.2);
  scene.add(fill);
  const rim = new THREE.PointLight(0xe06b39, 80, 12);
  rim.position.set(0, 0, -4);
  scene.add(rim);

  let disposed = false;
  let visible = false;
  let running = false;
  let raf = 0;
  let lastFrame = 0;
  let elapsed = 0;
  let lookX = 0;
  let lookY = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
    renderer.setSize(rect.width, rect.height, false);
  };

  const frame = (now: number) => {
    if (!running || disposed) return;
    const delta = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 0;
    lastFrame = now;
    elapsed += delta;
    sculpture.rotation.y = elapsed * 0.18 + lookX;
    sculpture.rotation.x = Math.sin(elapsed * 0.25) * 0.09 + lookY;
    sculpture.position.y = Math.sin(elapsed * 0.52) * 0.10;
    rings[0].rotation.z = elapsed * 0.07 - 0.38;
    rings[1].rotation.z = -elapsed * 0.045 + 0.5;
    embers.rotation.y = -elapsed * 0.025;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };

  const reconcile = () => {
    const shouldRun = !disposed && visible && !document.hidden &&
      !document.documentElement.classList.contains('motion-paused') &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (shouldRun === running) return;
    running = shouldRun;
    if (shouldRun) {
      resize();
      lastFrame = 0;
      raf = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(raf);
    }
  };
  const pointerMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    lookX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.38;
    lookY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.18;
  };
  const pointerLeave = () => { lookX = 0; lookY = 0; };
  const contextLost = (event: Event) => { event.preventDefault(); running = false; cancelAnimationFrame(raf); };

  const resizeObserver = new ResizeObserver(resize);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? false;
    reconcile();
  }, { threshold: 0.01 });
  resizeObserver.observe(canvas);
  intersectionObserver.observe(canvas);
  document.addEventListener('visibilitychange', reconcile);
  canvas.addEventListener('pointermove', pointerMove);
  canvas.addEventListener('pointerleave', pointerLeave);
  canvas.addEventListener('webglcontextlost', contextLost);
  resize();
  renderer.render(scene, camera);

  return () => {
    disposed = true;
    running = false;
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener('visibilitychange', reconcile);
    canvas.removeEventListener('pointermove', pointerMove);
    canvas.removeEventListener('pointerleave', pointerLeave);
    canvas.removeEventListener('webglcontextlost', contextLost);
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
        geometries.add(object.geometry);
        const list = Array.isArray(object.material) ? object.material : [object.material];
        list.forEach((m) => materials.add(m));
      }
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    renderer.dispose();
    renderer.forceContextLoss();
  };
}
