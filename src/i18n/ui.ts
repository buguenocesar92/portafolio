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
    status: 'SYSTEM BLUEPRINT / REFERENCE ARCHITECTURE',
    heroCommand: './scaffold new "Platform Engineering" --shared=hefesto',
    marqueeLabel: 'Tecnologías y herramientas',
    navLabel: 'Navegación y enlaces',
    cvTodo: 'CV pendiente de publicación',
    hudBuild: 'BUILD',
    hudUtc: 'RELOJ UTC',
    diagramTitle: 'Flujo conceptual de entrega',
    diagramDescription: 'Un pipeline CI/CD construye un artefacto verificado, se ejecuta en una isla aislada y se publica a través de un borde controlado. Diagrama ilustrativo; no muestra una topología real.',
    diagramNodes: { source: 'CI/CD', island: 'ISLA', edge: 'BORDE' },
    schematicLabel: 'ESQUEMA CONCEPTUAL',
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
    status: 'SYSTEM BLUEPRINT / REFERENCE ARCHITECTURE',
    heroCommand: './scaffold new "Platform Engineering" --shared=hefesto',
    marqueeLabel: 'Technologies and tools',
    navLabel: 'Navigation and links',
    cvTodo: 'CV publication pending',
    hudBuild: 'BUILD',
    hudUtc: 'UTC CLOCK',
    diagramTitle: 'Conceptual delivery flow',
    diagramDescription: 'A CI/CD pipeline produces a verified artifact, runs it in an isolated environment and routes it through a controlled edge. Illustrative only, not a real network topology.',
    diagramNodes: { source: 'CI/CD', island: 'ISLAND', edge: 'EDGE' },
    schematicLabel: 'CONCEPTUAL SCHEMATIC',
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


export const editorial = {
  es: {
    brandAccessible: 'Inicio · César Bugueño', brandRole: 'SOFTWARE / PLATFORM', navigation: 'Secciones del portafolio',
    navWork: 'Proyectos', navArchitecture: 'Arquitectura', navCases: 'Casos', switchLanguage: 'Cambiar idioma a inglés',
    studioLink: 'Hefesto Studio', headerInfo: 'Ingeniería desde Chile · Portafolio personal', buildLabel: 'VERSIÓN',
    pauseMotion: 'Pausar movimiento', resumeMotion: 'Reactivar movimiento',
    kicker: 'DISEÑO. INGENIERÍA. OPERACIÓN.',
    headline: { first: 'Ingeniería', second: 'con criterio.', accent: 'Sin atajos.' },
    lead: 'Soy César Bugueño. Diseño y construyo plataformas web, herramientas de automatización y arquitecturas de software que conectan producto, seguridad y operación.',
    ctaWork: 'Explorar mi trabajo', ctaArchitecture: 'Ver arquitectura',
    heroNote: 'Del diseño a la operación · Ingeniería Full Stack',
    artTitle: 'Escultura digital conceptual de forja y arquitectura', artCaption: 'FORMA / SISTEMA / CONCEPTO',
    artHint: 'OBJETO TRIDIMENSIONAL 001', railLabel: 'TECNOLOGÍAS DE TRABAJO',
    workEyebrow: '01 / PROYECTOS PROPIOS', workTitle: 'Más allá del código.', workAccent: 'Sistemas con propósito.',
    workIntro: 'Diseño herramientas con decisiones que se pueden explicar: desde el producto hasta la seguridad y la entrega.',
    featureLabel: 'HEFESTO / PROYECTO PRINCIPAL', featureKind: 'FACTORÍA DE SOFTWARE',
    featureCommand: './scaffold new "Mi Sistema" --shared=hefesto',
    architectureEyebrow: '02 / LA ESTRUCTURA', architectureTitle: 'Lo importante', architectureAccent: 'está debajo.',
    architectureIntro: 'Una arquitectura es una serie de decisiones. Explora las capas de este esquema conceptual y el recorrido desde el código hasta la entrega.',
    architectureFootnote: 'Diagrama ilustrativo: no refleja topología real, métricas de producción ni servicios monitorizados en directo.',
    architectureVisual: 'ARQUITECTURA / CONCEPTUAL',
    casesEyebrow: '03 / DETRÁS DE LAS DECISIONES', casesTitle: 'Los problemas', casesAccent: 'también cuentan.',
    casesIntro: 'Casos, decisiones y aprendizajes documentados. Solo resultados respaldados por evidencia.',
    caseType: 'CASO DOCUMENTADO', casesLink: 'Explorar caso',
    outroEyebrow: '04 / SIGUIENTE CONVERSACIÓN', outroTitle: 'La siguiente idea',
    outroAccent: 'merece estructura.', outroCta: 'Conocer Hefesto Studio',
    footerLine: 'Diseño con intención. Ingeniería con criterio.', backToTop: 'Volver arriba',
  },
  en: {
    brandAccessible: 'Home · César Bugueño', brandRole: 'SOFTWARE / PLATFORM', navigation: 'Portfolio sections',
    navWork: 'Work', navArchitecture: 'Architecture', navCases: 'Case studies', switchLanguage: 'Switch language to Spanish',
    studioLink: 'Hefesto Studio', headerInfo: 'Engineering from Chile · Personal portfolio', buildLabel: 'REVISION',
    pauseMotion: 'Pause motion', resumeMotion: 'Resume motion',
    kicker: 'DESIGN. ENGINEERING. OPERATIONS.',
    headline: { first: 'Engineering', second: 'with intent.', accent: 'No shortcuts.' },
    lead: 'I’m César Bugueño. I design and build web platforms, automation tools and software architectures that connect product thinking, security and operations.',
    ctaWork: 'Explore my work', ctaArchitecture: 'Explore architecture',
    heroNote: 'From design to operations · Full Stack Engineering',
    artTitle: 'Conceptual digital sculpture of forge and architecture', artCaption: 'FORM / SYSTEM / CONCEPT',
    artHint: 'THREE-DIMENSIONAL OBJECT 001', railLabel: 'WORKING TECHNOLOGIES',
    workEyebrow: '01 / INDEPENDENT WORK', workTitle: 'Beyond code.', workAccent: 'Systems with purpose.',
    workIntro: 'Building tools through explainable decisions: from product design to security and delivery.',
    featureLabel: 'HEFESTO / FEATURED WORK', featureKind: 'SOFTWARE FACTORY',
    featureCommand: './scaffold new "My System" --shared=hefesto',
    architectureEyebrow: '02 / THE STRUCTURE', architectureTitle: 'What matters', architectureAccent: 'lies beneath.',
    architectureIntro: 'Architecture is a series of decisions. Explore the layers of this conceptual diagram and the journey from code to delivery.',
    architectureFootnote: 'Illustrative diagram, not a real topology, production metric or live monitored status.',
    architectureVisual: 'ARCHITECTURE / CONCEPTUAL',
    casesEyebrow: '03 / BEHIND THE DECISIONS', casesTitle: 'Every problem', casesAccent: 'has a story.',
    casesIntro: 'Documented cases, decisions and lessons. Only outcomes supported by evidence.',
    caseType: 'DOCUMENTED CASE', casesLink: 'Explore case',
    outroEyebrow: '04 / WHAT COMES NEXT', outroTitle: 'The next big idea',
    outroAccent: 'needs structure.', outroCta: 'Explore Hefesto Studio',
    footerLine: 'Design with purpose. Engineering with judgment.', backToTop: 'Back to top',
  },
} satisfies Record<Lang, Record<string, unknown>>;
