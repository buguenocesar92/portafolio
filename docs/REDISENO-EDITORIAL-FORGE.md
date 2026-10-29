# Portafolio editorial · Hefesto Secure Vault

Referente de composición: Hefesto Studio. El portafolio conserva nombre e
identidad propios: monograma C.B, tipografía editorial y color cobre.

## Hero

La escultura geométrica inicial ha sido reemplazada por **Hefesto Secure Vault**:
núcleo de módulos aislados, tres escudos orbitales y cuatro nodos de proyectos.
Paleta del contenedor: grafito, esmeralda y ámbar, en contraste con el
marfil/cobre editorial.

El visitante puede seleccionar cada proyecto. Con WebGL compatible, Three.js
muestra la escena y GSAP desplaza suavemente la cámara; con WebGL ausente,
hardware limitado o reducción de movimiento se conserva el SVG SSR, la
navegación por teclado y el panel textual. Sin JavaScript existe una lista
completa de los cuatro proyectos.

## Límite de información

La escena no corresponde a topología, direcciones, puertos, hostnames ni
telemetría reales. Los detalles de Calify & Fit están identificados como
arquitectura objetivo, sin registros de salud o nutrición sincronizados.
Las métricas solo se publicarán después de disponer de evidencia verificable.

## Pruebas

- Quality: `npm ci`, checks estáticos, `astro build`, escaneo de secretos.
- Visual Preview: Chromium ES/EN desktop y ES móvil.
- Chromium E2E: navegación entre nodos, teclado, cambio ES/EN,
  `prefers-reduced-motion` y contenido sin JavaScript.
- Por validar aparte: animación WebGL con GPU y presupuesto Lighthouse.

La rama es de revisión. La fusión y cualquier despliegue requieren aprobación.
