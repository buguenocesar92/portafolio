import * as THREE from 'three';

/** Solo etiquetas conceptuales; sin nombres, rutas, puertos ni nodos reales. */
export type NodeId = 'compute' | 'isolation' | 'gates' | 'resilience';

const NODE_POSITIONS: ReadonlyArray<{ id: NodeId; x: number; y: number; z: number }> = [
  { id: 'compute', x: -3.1, y: 1.05, z: 0 },
  { id: 'isolation', x: 0, y: 0.6, z: 0.45 },
  { id: 'gates', x: 3.1, y: 1.05, z: 0 },
  { id: 'resilience', x: 0, y: -1.65, z: 0.15 },
];

type SelectNode = (id: NodeId) => void;

export function createInfrastructureScene(canvas: HTMLCanvasElement, onSelect: SelectNode): () => void {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 2.4, 12.8);
  camera.lookAt(0, 0, 0);
  const renderer = new THREE.WebGLRenderer({
    canvas, alpha: true, antialias: true, powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  scene.add(new THREE.AmbientLight(0x8ca8b5, 1.2));
  const light = new THREE.PointLight(0x10b981, 35, 25);
  light.position.set(-2, 3, 5);
  scene.add(light);

  const targets: THREE.Mesh[] = [];
  const geometry = new THREE.OctahedronGeometry(0.64, 0);
  const nodes = new Map<NodeId, THREE.Mesh>();
  NODE_POSITIONS.forEach(({ id, x, y, z }, index) => {
    const material = new THREE.MeshStandardMaterial({
      color: index === 2 ? 0xf59e0b : 0x10b981,
      emissive: index === 2 ? 0x4b2707 : 0x073d2e,
      metalness: 0.42, roughness: 0.37, flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.userData.nodeId = id;
    scene.add(mesh);
    nodes.set(id, mesh);
    targets.push(mesh);

    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.4 }),
    );
    mesh.add(wire);
  });

  const connections: Array<[NodeId, NodeId]> = [
    ['compute', 'isolation'], ['isolation', 'gates'], ['isolation', 'resilience'],
  ];
  const signalGeometry = new THREE.SphereGeometry(0.065, 8, 8);
  const signalMaterial = new THREE.MeshBasicMaterial({ color: 0xa7f3d0 });
  const signals: Array<{ object: THREE.Mesh; from: THREE.Vector3; to: THREE.Vector3; phase: number }> = [];
  connections.forEach(([fromId, toId], i) => {
    const from = nodes.get(fromId)!.position.clone();
    const to = nodes.get(toId)!.position.clone();
    const points = new THREE.BufferGeometry().setFromPoints([from, to]);
    scene.add(new THREE.Line(points, new THREE.LineBasicMaterial({
      color: 0x10b981, transparent: true, opacity: 0.5,
    })));
    for (let n = 0; n < 3; n++) {
      const object = new THREE.Mesh(signalGeometry, signalMaterial);
      signals.push({ object, from, to, phase: (n + i * 0.33) / 3 });
      scene.add(object);
    }
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let aimX = 0;
  let aimY = 0;
  let visible = false;
  let running = false;
  let raf = 0;
  let elapsed = 0;
  let previous = 0;
  let disposed = false;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
    renderer.setSize(rect.width, rect.height, false);
  }
  function hit(event: PointerEvent): NodeId | undefined {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const found = raycaster.intersectObjects(targets)[0];
    return found?.object.userData.nodeId as NodeId | undefined;
  }
  function pointerMove(event: PointerEvent) {
    const bounds = canvas.getBoundingClientRect();
    aimX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.38;
    aimY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.2;
    canvas.style.cursor = hit(event) ? 'pointer' : 'default';
  }
  function pointerLeave() { canvas.style.cursor = 'default'; }
  function pointerClick(event: PointerEvent) {
    const selected = hit(event);
    if (selected) onSelect(selected);
  }
  function frame(now: number) {
    if (!running || disposed) return;
    const dt = previous ? Math.min(0.05, (now - previous) / 1000) : 0;
    previous = now;
    elapsed += dt;
    nodes.forEach((node, id) => {
      node.rotation.y = elapsed * (id === 'gates' ? -0.28 : 0.22);
      node.rotation.x = Math.sin(elapsed * 0.35) * 0.11;
    });
    signals.forEach((item) => {
      const t = (elapsed * 0.23 + item.phase) % 1;
      item.object.position.lerpVectors(item.from, item.to, t);
    });
    camera.position.x += (aimX - camera.position.x) * 0.025;
    camera.position.y += (2.4 - aimY - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function setRunning() {
    const shouldRun = visible && !document.hidden && !disposed;
    if (shouldRun === running) return;
    running = shouldRun;
    if (running) {
      previous = 0;
      resize();
      raf = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(raf);
    }
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const intersection = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? false;
    setRunning();
  }, { threshold: 0.01 });
  intersection.observe(canvas);
  document.addEventListener('visibilitychange', setRunning);
  canvas.addEventListener('pointermove', pointerMove);
  canvas.addEventListener('pointerleave', pointerLeave);
  canvas.addEventListener('pointerup', pointerClick);
  resize();
  renderer.render(scene, camera);

  return () => {
    disposed = true;
    running = false;
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    intersection.disconnect();
    document.removeEventListener('visibilitychange', setRunning);
    canvas.removeEventListener('pointermove', pointerMove);
    canvas.removeEventListener('pointerleave', pointerLeave);
    canvas.removeEventListener('pointerup', pointerClick);
    const geometrySet = new Set<THREE.BufferGeometry>();
    const materialSet = new Set<THREE.Material>();
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.LineSegments) {
        geometrySet.add(obj.geometry);
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach((m) => materialSet.add(m));
      }
    });
    geometrySet.forEach((g) => g.dispose());
    materialSet.forEach((m) => m.dispose());
    renderer.dispose();
    renderer.forceContextLoss();
  };
}
