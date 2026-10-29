import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = (path) => readFileSync(new URL('../'+path, import.meta.url),'utf8');
const landing=source('src/components/Landing.astro');
const vault=source('src/components/vault/SecureVault.tsx');
const scene=source('src/components/vault/vaultScene.ts');
const svg=source('src/components/vault/VaultFallback.tsx');
const data=source('src/components/vault/vaultData.ts');

assert.match(landing, /SecureVault client:visible/);
assert.match(vault, /import\('\.\/vaultScene'\)/);
assert.match(vault, /aria-pressed/);
assert.match(vault, /VaultFallback/);
assert.match(vault, /aria-live="polite"/);
assert.match(vault, /useReducedMotion/);
assert.match(scene, /webglcontextlost/);
assert.match(scene, /visibilitychange/);
assert.match(scene, /IntersectionObserver/);
assert.match(scene, /forceContextLoss/);
assert.match(scene, /import\('gsap'\)/);
assert.match(svg, /<svg/);
assert.match(data, /Calify & Fit/);
assert.match(data, /no se muestra información de salud/);
assert.doesNotMatch(scene, /172\.31\.|10\.210\.|root@|deploy@/);
console.log('Secure Vault source checks: OK (static checks, not a rendered accessibility audit).');
