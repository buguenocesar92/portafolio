# Fase 2 — Portafolio de arquitectura interactivo

## Arquitectura

- Astro 7 SSG: HTML y contenido disponible sin JavaScript.
- React 19 solo para la isla de infraestructura (`client:visible`).
- Three.js puro: `InfrastructureExperience` importa dinámicamente
  `InfrastructureBlueprint3D` tras pruebas de WebGL y capacidades.
- `InfrastructureBlueprint` existente es fallback 2D y SSR.
- GSAP se importa dinámicamente cuando se activan secciones fuera del hero.
- Los elementos no requieren JS para ser leídos, enlazados o navegados.

## Activación 3D

Se usa 2D cuando falta WebGL2, cuando `prefers-reduced-motion` está activo,
cuando el usuario solicitó ahorro de datos, el navegador declara ≤4 GB RAM o
≤4 hilos, o el viewport mide ≤640 px. La heurística no determina el poder
real de hardware: es una preferencia conservadora y documentada.

`visibilitychange` e `IntersectionObserver` suspenden el render. El cleanup
libera geometrías, materiales, observer, eventos y contexto WebGL.

## Accesibilidad

El canvas es `aria-hidden`; el panel textual y botones son operables por
teclado. Los chips del marquee están representados una vez en el árbol
accesible. El contenido no comienza oculto con `opacity: 0`.
Se requiere revisión manual de contraste y auditoría Axe/Playwright.

## Seguridad y veracidad

La escena es una abstracción conceptual, **no** una topología. No contiene IP,
hostname, rutas, puertos ni nombres de islas. El estado superior se declara
como referencia, no como estado operacional. El hash de compilación proviene
del commit de GitHub Actions (o `local` al compilar fuera de CI).
Los CV permanecen sin publicar y LinkedIn es TODO.

## Validación

```bash
npm ci
npm run check:motion
npm run build
npx astro check
```

`npx astro check` requiere configurar el paquete `@astrojs/check` y TypeScript
como dependencias de desarrollo antes de exigirlo en CI (pendiente de la
verificación ampliada de Fase 5). No se ha ejecutado Lighthouse ni pruebas
con navegador; no se informan resultados inventados.

El CI de esta fase solo verifica instalaciones reproducibles, guards
estáticos y build. No despliega ni realiza pruebas con datos externos.

## Presupuesto

- JS inicial deseado: <100 KB gzip; **pendiente de medir**.
- Three.js: 0 KB dentro del grafo de imports estáticos de `Landing.astro`.
- Objetivo Lighthouse móvil: Performance ≥90, Accessibility y SEO 100;
  **no medido**.
