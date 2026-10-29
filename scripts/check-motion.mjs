import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const read = (name) => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const landing = read('src/components/Landing.astro');
const wrapper = read('src/components/infrastructure/InfrastructureExperience.tsx');
const scene = read('src/components/infrastructure/scene.ts');
const motion = read('src/lib/motion/registry.ts');

assert.match(landing, /client:visible/);
assert.match(wrapper, /lazy\(\(\) => import\('\.\/InfrastructureBlueprint3D'\)\)/);
assert.match(wrapper, /InfrastructureBlueprint/);
assert.match(scene, /forceContextLoss/);
assert.match(scene, /visibilitychange/);
assert.match(scene, /IntersectionObserver/);
assert.match(motion, /import\('gsap'\)/);
assert.doesNotMatch(landing, /--security=strict/);
console.log('Motion guards: OK (pruebas estáticas, no Lighthouse).');
