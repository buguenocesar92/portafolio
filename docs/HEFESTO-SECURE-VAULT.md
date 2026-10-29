# Hefesto Secure Vault

Hero conceptual de sistemas distribuidos: **no** es un mapa de hosts, puertos,
redes o servicios reales.

## Elementos

- Monolito central: módulos y contenedores aislados (patrón Docker rootless).
- Órbita interior ámbar: aislamiento y políticas.
- Órbita intermedia esmeralda: malla privada / identidad (referencia Tailscale).
- Órbita exterior acero: borde y túnel (referencia Cloudflare).
- Cuatro satélites: Hefesto Scaffold, Calify & Fit, KraftDo, Security Engineering.
- Flujos de datos: partículas que atraviesan curvas entre cada satélite y el núcleo.
- Puntero y scroll: parallax sutil e impulso de velocidad limitado.
- Selección: raycast sobre los satélites y controles HTML equivalentes.
- Transición: GSAP importado dinámicamente para enfocar cámara al nodo.
- Panel HTML: arquitectura, tecnologías, contexto y estado de verificación.

## Comportamiento de accesibilidad

La información está en HTML semántico con controles aria-pressed. La experiencia
es operable completamente desde el teclado sin necesitar enfocar el canvas.
El SVG SSR se mantiene visible sin JS o WebGL; en dispositivos modestos la
escena 3D nunca se solicita. El canvas tiene aria-hidden y tabIndex -1.
Media query reduced motion y botón de pausa respetados. Render se suspende
fuera del viewport y en pestaña oculta.

## Veracidad, privacidad y límites

Calify & Fit se describe como arquitectura objetivo, no producto ni nutrición
sincronizada. No se publica ninguna dieta, registro de salud o dato personal.
Métricas de uptime, costo, usuarios o throughput no se inventan.
Un motor de diseño no demuestra que una barrera esté configurada en producción.

## Pruebas

```bash
npm ci
node scripts/check-vault.mjs
npm run check:motion
npm run build
```

Las comprobaciones estáticas y build se ejecutan en la Action de Quality.
El workflow de Visual Preview genera PNG ES/EN desktop y ES mobile; el
render GPU y mediciones Lighthouse necesitan validación adicional.
