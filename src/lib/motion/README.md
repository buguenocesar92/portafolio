# Motion industrial (Fase 2)

El HTML está visible antes de ejecutar JavaScript. `mountMotion` usa IntersectionObserver
para activar GSAP solo cuando una sección entra al viewport; no se importa GSAP
en el chunk crítico. `prefers-reduced-motion: reduce` evita importar el motor.

- `reveal`, `splitReveal`, `scrambleText`: efectos GSAP con reversión.
- `magnetic` y `spotlight`: pointer events y cleanup explícito.
- `useGsap` y `useReducedMotion`: hooks para islas React.

No utilizar estilos iniciales `opacity: 0` en HTML servido: jamás ocultar texto
indefinidamente cuando falla una dependencia o JavaScript está deshabilitado.
