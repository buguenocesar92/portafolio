export const VAULT_NODE_IDS = ['hefesto', 'calify', 'kraftdo', 'secops'] as const;
export type VaultNodeId = (typeof VAULT_NODE_IDS)[number];
export type VaultLang = 'es' | 'en';

export interface VaultNode {
  id: VaultNodeId;
  title: string;
  category: string;
  summary: string;
  layers: readonly string[];
  tech: readonly string[];
  verification: string;
  detail?: string;
}
export interface VaultCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  center: string;
  inner: string;
  middle: string;
  outer: string;
  guide: string;
  fallback: string;
  pause: string;
  resume: string;
  select: string;
  architecture: string;
  technologies: string;
  evidence: string;
  note: string;
  concept: string;
  technical: string;
  nodeList: readonly VaultNode[];
}

export const VAULT_COPY: Record<VaultLang, VaultCopy> = {
  es: {
    eyebrow: 'HEFESTO / SECURE VAULT',
    title: 'Arquitectura protegida por diseño',
    subtitle: 'Explora un modelo conceptual de aislamiento, red privada y sistemas construidos con propósito.',
    center: 'NÚCLEO / ROOTLESS',
    inner: 'AISLAMIENTO',
    middle: 'MALLA PRIVADA',
    outer: 'BORDE / TÚNEL',
    guide: 'Selecciona un sistema para explorar su diseño',
    fallback: 'Visualización conceptual 2D',
    pause: 'Pausar escena', resume: 'Reanudar escena',
    select: 'Explorar sistema', architecture: 'Arquitectura propuesta',
    technologies: 'Tecnologías', evidence: 'Estado de la información',
    note: 'Representación conceptual. No es un mapa de red ni telemetría en vivo.',
    concept: 'DISEÑO CONCEPTUAL', technical: 'FICHA TÉCNICA',
    nodeList: [
      {
        id: 'hefesto', title: 'Hefesto Scaffold', category: 'FACTORÍA DE SOFTWARE',
        summary: 'Generación determinista de plataformas con Laravel, Filament, seguridad y despliegues reproducibles.',
        layers: ['CLI + manifiestos', 'Laravel / Filament CMS', 'Docker rootless + controles de calidad'],
        tech: ['Laravel 13', 'Filament 5', 'FrankenPHP', 'Docker'],
        verification: 'Componentes y contratos contrastables en el repositorio; no se presentan métricas operacionales.',
      },
      {
        id: 'calify', title: 'Calify & Fit', category: 'PWA / BIENESTAR',
        summary: 'Diseño de una PWA de hábitos, recuperación de bajo impacto y nutrición con contenido gestionado por API.',
        layers: ['Astro + islas React', 'API Laravel y modelos tipados', 'Acceso privado a datos personales'],
        tech: ['Astro', 'React', 'TypeScript', 'Laravel'],
        verification: 'Arquitectura objetivo, sin métricas de usuarios o producción verificadas.',
        detail: 'El módulo nutricional y sus sincronizaciones requieren autorización e integración real. No se muestra información de salud ni una pauta personal.',
      },
      {
        id: 'kraftdo', title: 'KraftDo', category: 'EXPERIENCIAS NFC / QR',
        summary: 'Plataforma de productos y experiencias digitales conectadas mediante NFC, QR y perfiles personalizados.',
        layers: ['Identidad y rutas tokenizadas', 'CMS y recursos multimedia', 'Gestión y pagos mediante proveedores'],
        tech: ['Laravel', 'NFC / QR', 'Cloudflare', 'Flow'],
        verification: 'Proyecto mostrado como caso de ingeniería; sin cifras de ventas, usuarios o disponibilidad.',
      },
      {
        id: 'secops', title: 'Security Engineering', category: 'SECOPS / DEFENSA',
        summary: 'Herramientas para revisar postura de seguridad, controles de acceso, evidencias y automatización operativa.',
        layers: ['Controles de identidad', 'Pruebas y evidencia', 'Aislamiento y trazabilidad'],
        tech: ['PHPStan', 'Pest', 'Tailscale', 'SOPS'],
        verification: 'Patrones de referencia. No revela hosts, hallazgos confidenciales ni topología operativa.',
      },
    ],
  },
  en: {
    eyebrow: 'HEFESTO / SECURE VAULT',
    title: 'Security by architecture',
    subtitle: 'Explore a conceptual model of isolation, private networking and purpose-built systems.',
    center: 'CORE / ROOTLESS',
    inner: 'ISOLATION',
    middle: 'PRIVATE MESH',
    outer: 'EDGE / TUNNEL',
    guide: 'Select a system to inspect its design',
    fallback: 'Conceptual 2D visualization',
    pause: 'Pause scene', resume: 'Resume scene',
    select: 'Explore system', architecture: 'Proposed architecture',
    technologies: 'Technologies', evidence: 'Information status',
    note: 'Conceptual illustration. This is not a network map or live telemetry.',
    concept: 'CONCEPT DESIGN', technical: 'TECHNICAL BRIEF',
    nodeList: [
      {
        id: 'hefesto', title: 'Hefesto Scaffold', category: 'SOFTWARE FACTORY',
        summary: 'Deterministic platform generation using Laravel, Filament, security defaults and repeatable delivery.',
        layers: ['CLI and manifests', 'Laravel / Filament CMS', 'Docker rootless and quality gates'],
        tech: ['Laravel 13', 'Filament 5', 'FrankenPHP', 'Docker'],
        verification: 'Components and contracts can be checked in the repository; no operational metrics are claimed.',
      },
      {
        id: 'calify', title: 'Calify & Fit', category: 'WELLNESS PWA',
        summary: 'A PWA architecture for habits, low-impact recovery and nutrition content served through an API.',
        layers: ['Astro + React islands', 'Laravel API with typed models', 'Private access to personal data'],
        tech: ['Astro', 'React', 'TypeScript', 'Laravel'],
        verification: 'Target architecture; no verified user or production metrics.',
        detail: 'Nutrition synchronization requires authorization and a real integration. No personal health data or meal plan is displayed.',
      },
      {
        id: 'kraftdo', title: 'KraftDo', category: 'NFC / QR EXPERIENCES',
        summary: 'Digital products and experiences connected through NFC, QR and customizable profiles.',
        layers: ['Identity and token routes', 'CMS and multimedia', 'Management and provider payments'],
        tech: ['Laravel', 'NFC / QR', 'Cloudflare', 'Flow'],
        verification: 'Engineering example without sales, user or uptime figures.',
      },
      {
        id: 'secops', title: 'Security Engineering', category: 'SECOPS / DEFENSE',
        summary: 'Tools for reviewing security posture, authorization controls, evidence and operational automation.',
        layers: ['Identity controls', 'Testing and evidence', 'Isolation and auditability'],
        tech: ['PHPStan', 'Pest', 'Tailscale', 'SOPS'],
        verification: 'Reference patterns only. No hosts, confidential findings or production topology.',
      },
    ],
  },
};
