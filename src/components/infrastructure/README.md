# Infraestructura conceptual 3D

`InfrastructureExperience` se monta con `client:visible` y el HTML SSR representa
primero el `InfrastructureBlueprint` accesible. El import dinámico de Three.js
solo se ejecuta si se cumplen los requisitos de WebGL, CPU, memoria, pantalla,
ahorro de datos y preferencia de movimiento.

La representación es abstracta; no existen direcciones ni topologías de producción.
El canvas se oculta a lectores de pantalla; los botones del panel DOM proporcionan
la misma información por teclado. IntersectionObserver y visibilitychange pausan
requestAnimationFrame. La limpieza dispone geometrías/materiales y fuerza la
liberación del contexto WebGL.
