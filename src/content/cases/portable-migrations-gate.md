---
slug: portable-migrations-gate
lang: en
category: Quality Gates
criticality: medium
title: "Portable migrations: one test, two database engines"
summary: "How MigracionesPortablesTest validates the same schema on MariaDB 11 and PostgreSQL 17 at once."
stack: [Pest 4, PHPStan, MariaDB 11, PostgreSQL 17]
publishedAt: 2026-10-27
---

> Draft: replace this text with the real case before publishing metrics.

## Problem

Migrations that pass on one engine can silently break on another.

## Approach

`MigracionesPortablesTest` runs the same migrations against **MariaDB 11** and **PostgreSQL 17** simultaneously, next to PHPStan level 8 and Pest 4 as mandatory gates.

## Outcome

Engine-specific SQL is caught in CI instead of in production.
