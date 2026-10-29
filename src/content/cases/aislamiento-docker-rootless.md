---
slug: aislamiento-docker-rootless
lang: es
category: Architecture
criticality: high
title: "Islas Docker Rootless: aislamiento multi-tenant sin privilegios"
summary: "Por qué cada sistema vive en su propio UID POSIX con un dockerd rootless, y qué superficie de ataque elimina."
stack: [Docker Rootless, SOPS, Linux, Tailscale]
publishedAt: 2026-10-28
---

> Borrador: reemplaza este texto con el caso real antes de publicar métricas.

## Contexto

Varios sistemas institucionales conviven en la misma estación. El riesgo principal es que la compromisión de uno escale al host o a los demás.

## Decisión

- Un **UID POSIX sin privilegios** por sistema.
- Un `dockerd` **rootless** propio por isla.
- Un **único puerto interno** expuesto al borde.
- Secretos cifrados con **SOPS**.

## Resultado

Un RCE dentro de un contenedor queda contenido en un usuario sin privilegios, sin acceso al socket de Docker del host ni a otras islas.
