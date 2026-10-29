# Rediseño visual: editorial forge

Referencia visual: sitio público de Hefesto Studio, revisado el 29-10-2026.
**No** es un traslado del sitio corporativo ni una copia de su figura de marca.
El portafolio mantiene una identidad personal propia.

## Diferencia con la Fase 2 anterior

Antes: fondo oscuro uniforme, tarjetas genéricas y Three.js oculto tras el
hero. Ahora: lenguaje editorial claro, tipografía protagonista en dos columnas,
escultura procedural en el primer viewport, productos con composiciones
diferentes y arquitectura en un bloque oscuro de alto contraste.

## Escultura y fallback

- `ForgeVisual` entrega un SVG elaborado en SSR para todos los usuarios.
- En WebGL compatible se importa `forgeScene.ts` de forma dinámica.
- Sin red de assets, sin modelos descargados ni información real de la red.
- `prefers-reduced-motion`, ahorro de datos y dispositivos modestos muestran
  el SVG. El botón de movimiento deshabilita las escenas y GSAP.
- Se detiene render al ocultarse la pestaña o salir del viewport. Se liberan
  geometrías, materiales y contexto al desmontar.

## Evidencia y revisión

PR de diseño en modo draft. No fusionar antes de revisar el artefacto
`portfolio-editorial-preview` de la Action de capturas, en desktop ES/EN y
móvil ES. La captura no sustituye una revisión humana ni una auditoría WCAG.
Lighthouse y Astro check quedan pendientes de verificación adicional.

No existen credenciales nuevas, datos médicos, métricas ni promesas no medidas.
