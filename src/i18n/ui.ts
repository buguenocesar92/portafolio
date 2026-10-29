export type Lang = 'es' | 'en';

export interface BlueprintLayer {
  id: string;
  tag: string;
  title: string;
  summary: string;
  details: string[];
  metrics: { k: string; v: string }[];
  accent: 'emerald' | 'amber';
}

export const ui = {
  es: {
    htmlLang: 'es-CL',
    title: 'César Bugueño | Platform Engineer, Arquitecto Full-Stack y DevSecOps',
    description:
      'Factorías de software deterministas, islas Docker Rootless y respuesta táctica a incidentes. Portafolio de ingeniería de César Bugueño.',
    status: 'SYSTEM STATUS: OPERATIONAL | CI/CD: DUAL-XEON RUNNER ONLINE | ISOLATION: DOCKER ROOTLESS',
    cvLabel: 'CV',
    h1: 'Senior Platform Engineer, Full-Stack Architect & DevSecOps Specialist.',
    subtitle:
      'Diseño factorías de software deterministas, infraestructuras aisladas en islas Docker Rootless y sistemas de respuesta táctica ante incidentes (RCE/Forensics). Transformo arquitecturas institucionales frágiles en ecosistemas auditables, seguros y de alto rendimiento.',
    ctaPrimary: 'Explorar Arquitectura Hefesto',
    ctaSecondary: 'Leer Post-Mortems & Casos',
    blueprintTitle: 'Live Infrastructure & Telemetry Blueprint',
    blueprintHint: 'Selecciona una capa para ver su detalle.',
    showcaseTitle: 'Vitrina de Ingeniería Propia',
    casesTitle: 'Engineering Case Studies & Post-Mortems',
    casesEmpty: 'Aún no hay casos publicados.',
    readMore: 'Leer caso',
    minRead: 'min de lectura',
    back: '← Volver a casos',
    criticality: 'Criticidad',
    altLangLabel: 'EN',
    altLangHref: '/en/',
    homeHref: '/',
    footer: 'Construido con Astro, React y Tailwind. Desplegado en GitHub Pages.',
  },
  en: {
    htmlLang: 'en-US',
    title: 'César Bugueño | Platform Engineer, Full-Stack Architect & DevSecOps',
    description:
      'Deterministic software factories, Docker Rootless islands and tactical incident response. Engineering portfolio of César Bugueño.',
    status: 'SYSTEM STATUS: OPERATIONAL | CI/CD: DUAL-XEON RUNNER ONLINE | ISOLATION: DOCKER ROOTLESS',
    cvLabel: 'CV',
    h1: 'Senior Platform Engineer, Full-Stack Architect & DevSecOps Specialist.',
    subtitle:
      'I design deterministic software factories, Docker Rootless isolated infrastructure and tactical incident-response systems (RCE/Forensics). I turn fragile institutional architectures into auditable, secure, high-performance ecosystems.',
    ctaPrimary: 'Explore Hefesto Architecture',
    ctaSecondary: 'Read Post-Mortems & Cases',
    blueprintTitle: 'Live Infrastructure & Telemetry Blueprint',
    blueprintHint: 'Select a layer to inspect it.',
    showcaseTitle: 'Proprietary Engineering Showcase',
    casesTitle: 'Engineering Case Studies & Post-Mortems',
    casesEmpty: 'No cases published yet.',
    readMore: 'Read case',
    minRead: 'min read',
    back: '← Back to cases',
    criticality: 'Criticality',
    altLangLabel: 'ES',
    altLangHref: '/',
    homeHref: '/en/',
    footer: 'Built with Astro, React and Tailwind. Deployed on GitHub Pages.',
  },
} as const;

export const blueprint: Record<Lang, BlueprintLayer[]> = {
  es: [
    {
      id: 'compute',
      tag: 'LAYER_01 // COMPUTE & CI/CD',
      title: 'Compute & CI/CD Node',
      summary:
        'Estación Dual-Xeon (Ubuntu Linux) conectada vía malla cifrada (Tailscale), con runners dedicados de GitHub Actions y daemons 24/7 de vigilancia CVE e ingesta Open-Source.',
      details: [
        'Runners self-hosted de GitHub Actions dedicados',
        'Malla cifrada Tailscale entre nodos',
        'Daemons 24/7: vigilancia de CVEs e ingesta Open-Source',
      ],
      metrics: [
        { k: 'OS', v: 'Ubuntu Linux' },
        { k: 'CPU', v: 'Dual-Xeon' },
        { k: 'MESH', v: 'Tailscale' },
      ],
      accent: 'emerald',
    },
    {
      id: 'isolation',
      tag: 'LAYER_02 // PRODUCTION ISOLATION',
      title: 'Islas Docker Rootless',
      summary:
        'Despliegue multi-tenant donde cada sistema vive en un UID POSIX sin privilegios con su propio dockerd rootless, un único puerto interno expuesto al borde y secretos gestionados con SOPS.',
      details: [
        'Un UID POSIX sin privilegios por sistema',
        'dockerd rootless propio por isla',
        'Un único puerto interno expuesto al borde',
        'Secretos cifrados con SOPS',
      ],
      metrics: [
        { k: 'RUNTIME', v: 'dockerd rootless' },
        { k: 'EXPOSED', v: '1 puerto / isla' },
        { k: 'SECRETS', v: 'SOPS' },
      ],
      accent: 'emerald',
    },
    {
      id: 'gates',
      tag: 'LAYER_03 // QUALITY & SECURITY GATES',
      title: 'Quality & Security Gates',
      summary:
        'PHPStan Nivel 8 innegociable, Pest 4, MigracionesPortablesTest (validación cruzada simultánea en MariaDB 11 y PostgreSQL 17), CSP con nonce dinámico en FrankenPHP y Playwright E2E (WCAG 2.2 AA).',
      details: [
        'PHPStan nivel 8 como gate obligatorio',
        'Pest 4 + MigracionesPortablesTest en MariaDB 11 y PostgreSQL 17',
        'CSP con nonce dinámico en FrankenPHP',
        'Playwright E2E con auditoría WCAG 2.2 AA',
      ],
      metrics: [
        { k: 'PHPSTAN', v: 'level 8' },
        { k: 'DB MATRIX', v: 'MariaDB 11 + PG 17' },
        { k: 'A11Y', v: 'WCAG 2.2 AA' },
      ],
      accent: 'amber',
    },
    {
      id: 'resilience',
      tag: 'LAYER_04 // HYBRID 3-2-1 RESILIENCY',
      title: 'Hybrid 3-2-1 Resiliency',
      summary:
        'Snapshots automatizados de bases de datos hacia NAS local, más sincronización cifrada en Cloudflare R2.',
      details: [
        'Snapshots automatizados de bases de datos',
        'Copia local en NAS',
        'Sincronización cifrada hacia Cloudflare R2',
      ],
      metrics: [
        { k: 'LOCAL', v: 'NAS' },
        { k: 'OFFSITE', v: 'Cloudflare R2' },
        { k: 'STRATEGY', v: '3-2-1' },
      ],
      accent: 'amber',
    },
  ],
  en: [
    {
      id: 'compute',
      tag: 'LAYER_01 // COMPUTE & CI/CD',
      title: 'Compute & CI/CD Node',
      summary:
        'Dual-Xeon workstation (Ubuntu Linux) on an encrypted mesh (Tailscale), running dedicated GitHub Actions runners and 24/7 daemons for CVE watch and open-source ingestion.',
      details: [
        'Dedicated self-hosted GitHub Actions runners',
        'Tailscale encrypted mesh between nodes',
        '24/7 daemons: CVE watch and open-source ingestion',
      ],
      metrics: [
        { k: 'OS', v: 'Ubuntu Linux' },
        { k: 'CPU', v: 'Dual-Xeon' },
        { k: 'MESH', v: 'Tailscale' },
      ],
      accent: 'emerald',
    },
    {
      id: 'isolation',
      tag: 'LAYER_02 // PRODUCTION ISOLATION',
      title: 'Docker Rootless Islands',
      summary:
        'Multi-tenant deployment where each system runs under an unprivileged POSIX UID with its own rootless dockerd, a single internal port exposed to the edge, and secrets managed with SOPS.',
      details: [
        'One unprivileged POSIX UID per system',
        'Dedicated rootless dockerd per island',
        'A single internal port exposed to the edge',
        'Secrets encrypted with SOPS',
      ],
      metrics: [
        { k: 'RUNTIME', v: 'rootless dockerd' },
        { k: 'EXPOSED', v: '1 port / island' },
        { k: 'SECRETS', v: 'SOPS' },
      ],
      accent: 'emerald',
    },
    {
      id: 'gates',
      tag: 'LAYER_03 // QUALITY & SECURITY GATES',
      title: 'Quality & Security Gates',
      summary:
        'Non-negotiable PHPStan level 8, Pest 4, MigracionesPortablesTest (simultaneous cross-validation on MariaDB 11 and PostgreSQL 17), dynamic-nonce CSP on FrankenPHP and Playwright E2E (WCAG 2.2 AA).',
      details: [
        'PHPStan level 8 as a mandatory gate',
        'Pest 4 + MigracionesPortablesTest on MariaDB 11 and PostgreSQL 17',
        'Dynamic-nonce CSP on FrankenPHP',
        'Playwright E2E with WCAG 2.2 AA audit',
      ],
      metrics: [
        { k: 'PHPSTAN', v: 'level 8' },
        { k: 'DB MATRIX', v: 'MariaDB 11 + PG 17' },
        { k: 'A11Y', v: 'WCAG 2.2 AA' },
      ],
      accent: 'amber',
    },
    {
      id: 'resilience',
      tag: 'LAYER_04 // HYBRID 3-2-1 RESILIENCY',
      title: 'Hybrid 3-2-1 Resiliency',
      summary:
        'Automated database snapshots to a local NAS, plus encrypted sync to Cloudflare R2.',
      details: [
        'Automated database snapshots',
        'Local copy on NAS',
        'Encrypted sync to Cloudflare R2',
      ],
      metrics: [
        { k: 'LOCAL', v: 'NAS' },
        { k: 'OFFSITE', v: 'Cloudflare R2' },
        { k: 'STRATEGY', v: '3-2-1' },
      ],
      accent: 'amber',
    },
  ],
};

export const showcase = {
  es: [
    {
      slug: 'scaffold',
      tag: 'bin/scaffold',
      title: 'Hefesto Scaffold',
      body: 'Generador determinista para Laravel 13 + Filament 5 + FrankenPHP/Octane. Generación por manifiesto (scaffold.json), compilación automática de manuales PDF vía Playwright (build-manual.mjs) y seguridad por defecto.',
      chips: ['Laravel 13', 'Filament 5', 'FrankenPHP/Octane', 'scaffold.json', 'Playwright'],
      accent: 'amber',
      wide: true,
    },
    {
      slug: 'laravel-shared',
      tag: 'hefesto/laravel-shared',
      title: 'Suite de Cumplimiento Legal & Criptografía',
      body: 'Privacidad por diseño (Ley 21.719 / GDPR), módulo ARCOP, cifrado de atributos sensibles (EncryptedSeguro) y Row-Level Security (RLS) en PostgreSQL.',
      chips: ['Ley 21.719', 'GDPR', 'ARCOP', 'EncryptedSeguro', 'PostgreSQL RLS'],
      accent: 'emerald',
      wide: false,
    },
    {
      slug: 'secops',
      tag: 'network_discovery',
      title: 'SecOps & Threat Intelligence Daemons',
      body: 'Bots autónomos en Python/FastAPI para auditoría forense de red (network_discovery vía SNMP/SSH para cazar Shadow IT), alerta temprana de CVEs y recolección automatizada de repositorios hacia Google Sheets.',
      chips: ['Python', 'FastAPI', 'SNMP/SSH', 'CVE alerts', 'Google Sheets'],
      accent: 'emerald',
      wide: false,
    },
  ],
  en: [
    {
      slug: 'scaffold',
      tag: 'bin/scaffold',
      title: 'Hefesto Scaffold',
      body: 'Deterministic generator for Laravel 13 + Filament 5 + FrankenPHP/Octane. Manifest-driven generation (scaffold.json), automatic PDF manual builds via Playwright (build-manual.mjs) and secure-by-default output.',
      chips: ['Laravel 13', 'Filament 5', 'FrankenPHP/Octane', 'scaffold.json', 'Playwright'],
      accent: 'amber',
      wide: true,
    },
    {
      slug: 'laravel-shared',
      tag: 'hefesto/laravel-shared',
      title: 'Legal Compliance & Cryptography Suite',
      body: 'Privacy by design (Law 21.719 / GDPR), ARCOP module, sensitive-attribute encryption (EncryptedSeguro) and PostgreSQL Row-Level Security (RLS).',
      chips: ['Law 21.719', 'GDPR', 'ARCOP', 'EncryptedSeguro', 'PostgreSQL RLS'],
      accent: 'emerald',
      wide: false,
    },
    {
      slug: 'secops',
      tag: 'network_discovery',
      title: 'SecOps & Threat Intelligence Daemons',
      body: 'Autonomous Python/FastAPI bots for network forensics (network_discovery over SNMP/SSH to hunt Shadow IT), CVE early warning and automated repository harvesting into Google Sheets.',
      chips: ['Python', 'FastAPI', 'SNMP/SSH', 'CVE alerts', 'Google Sheets'],
      accent: 'emerald',
      wide: false,
    },
  ],
} as const;
