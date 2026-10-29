/**
 * Dossier editorial. Fuente: CV 2026-10-29 y versión conservadora
 * 2026-10-27. Los hitos privados se resumen sin métricas ni topología real.
 * "En desarrollo" no equivale a funciones desplegadas.
 */
export type DossierLang = 'es' | 'en';
export interface DossierProject {
  id: string;
  number: string;
  year: string;
  kicker: string;
  title: string;
  summary: string;
  context: string;
  contribution: string;
  decisions: readonly string[];
  technologies: readonly string[];
  proof: string;
  link?: { url: string; label: string };
  emphasis?: boolean;
}

export interface DossierContent {
  lang: string;
  title: string;
  description: string;
  nav: { work: string; principles: string; experience: string; contact: string; toggle: string; intro: string };
  eyebrow: string;
  heroLines: readonly [string, string, string];
  heroCopy: string;
  heroRole: string;
  heroLink: string;
  heroSecondary: string;
  heroAside: string;
  sheet: { pre: string; title: string; foot: string; labels: readonly [string,string,string]; captions: readonly [string,string,string] };
  indexLabel: string;
  workTitle: string;
  workDescription: string;
  projectAction: string;
  caseDisclaimer: string;
  projectLabels: { context: string; decisions: string; stack: string; status: string };
  projects: readonly DossierProject[];
  principles: { number: string; label: string; title: string; description: string; rows: readonly { title: string; body: string }[] };
  experience: { number: string; title: string; description: string; rows: readonly { period: string; role: string; organization: string; text: string }[] };
  footer: { title: string; body: string; contact: string; github: string; studio: string; signature: string; top: string };
}

export const dossier: Record<DossierLang,DossierContent> = {
  es: {
    lang:'es-CL',
    title:'César Bugueño — Ingeniería de Software · DevSecOps · Platform Engineering',
    description:'Portafolio de ingeniería: desarrollo Full Stack, seguridad de aplicaciones, recuperación de sistemas e infraestructura reproducible.',
    nav:{work:'Trabajo',principles:'Enfoque',experience:'Trayectoria',contact:'Contacto',toggle:'English',intro:'Navegación principal'},
    eyebrow:'INGENIERO DE SOFTWARE  /  CHILE  /  EST. 2018',
    heroLines:['CONSTRUYO.','RECUPERO.','PROTEJO.'],
    heroCopy:'Del código al servidor. Desarrollo plataformas, recupero sistemas heredados y diseño controles de seguridad que se sostienen en producción.',
    heroRole:'FULL STACK / DEVSECOPS / PLATFORM ENGINEERING',
    heroLink:'Explorar trabajo',heroSecondary:'Mi enfoque',heroAside:'INGENIERÍA, NO DECORACIÓN.',
    sheet:{
      pre:'ARCHIVO 001  /  COMO TRABAJO',
      title:'Un sistema es más que su interfaz.',
      foot:'ESQUEMA CONCEPTUAL  —  NO CORRESPONDE A UNA RED REAL',
      labels:['01 / PRODUCTO','02 / CONFIANZA','03 / OPERACIÓN'],
      captions:['APIs · experiencia · datos','Identidad · privacidad · pruebas','Linux · contenedores · CI/CD'],
    },
    indexLabel:'ÍNDICE / TRABAJO SELECCIONADO',
    workTitle:'El trabajo habla.',
    workDescription:'Proyectos y responsabilidades documentados. El valor está en los problemas resueltos y en las decisiones técnicas, no en un número de tecnologías.',
    projectAction:'Ver decisiones de ingeniería',
    caseDisclaimer:'Las descripciones de sistemas institucionales son deliberadamente generales; no exponen configuraciones, personas ni infraestructura interna.',
    projectLabels:{context:'Contexto',decisions:'Decisiones',stack:'Herramientas',status:'Evidencia / estado'},
    projects:[
      {
        id:'recovery',number:'01',year:'2026',kicker:'SECTOR PÚBLICO / INCIDENT RESPONSE',
        title:'Recuperar lo que otros dejaron atrás.',
        summary:'Recuperación y modernización de plataformas heredadas, remediación de credenciales expuestas y revisión de vulnerabilidades críticas.',
        context:'Sistemas institucionales sin traspaso técnico completo, con necesidades de continuidad, trazabilidad y control de cambios.',
        contribution:'Auditoría técnica, recuperación de código, corrección de exposición de secretos y preparación de despliegues bajo control institucional.',
        decisions:['Priorizar inventario y revisión de exposición antes de cambiar funcionalidad.','Separar secretos del frontend y limitar los permisos por servicio.','Documentar y verificar cambios de infraestructura antes del despliegue.'],
        technologies:['Laravel','PHP','Node.js','Docker','Linux','GitHub Actions'],
        proof:'Experiencia profesional consignada en el CV. No se publican registros de incidentes ni resultados internos.',
        emphasis:true,
      },
      {
        id:'privacy',number:'02',year:'2026',kicker:'APLICACIÓN / PRIVACIDAD',
        title:'Seguridad integrada al código.',
        summary:'Componentes Laravel para tokenización de datos personales y gestión auditable de derechos de los titulares.',
        context:'Los datos personales requieren minimización, trazabilidad y autorizaciones explícitas entre aplicaciones y servicios externos.',
        contribution:'Diseño de módulos reutilizables para flujos de privacidad y gestión de solicitudes, sin presentar el uso del paquete como garantía de cumplimiento legal.',
        decisions:['Separar identificación y autorización en los flujos de datos.','Mantener auditabilidad sin almacenar valores sensibles en los registros.','Diseñar pruebas y controles fall-closed donde corresponde.'],
        technologies:['PHP','Laravel','Criptografía','ARCOP','Pruebas automatizadas'],
        proof:'Repositorio de código público verificable para laravel-anonimizacion. El cumplimiento depende de cada implementación.',
        link:{url:'https://github.com/buguenocesar92/laravel-anonimizacion',label:'Explorar repositorio'},
      },
      {
        id:'platform',number:'03',year:'2026',kicker:'PLATFORM ENGINEERING / DEVSECOPS',
        title:'La infraestructura también es código.',
        summary:'Infraestructura reproducible en VPS: hardening Linux, acceso administrativo por VPN, secretos cifrados y contenedores aislados.',
        context:'Entornos que deben ser auditables y reconstruibles sin depender de configuraciones manuales imposibles de reproducir.',
        contribution:'Diseño de roles de Ansible, endurecimiento del acceso y documentación de controles y procedimientos de recuperación.',
        decisions:['Automatizar cambios con configuración declarativa e idempotente.','Reducir exposición y privilegios de servicios.','Separar credenciales del control de versiones y verificar restauraciones.'],
        technologies:['Ansible','WireGuard','Docker rootless','SOPS + age','Cloudflare'],
        proof:'Experiencia y trabajo en evolución según el CV. Repositorio de infraestructura privado: no se publica.',
      },
      {
        id:'scaffold',number:'04',year:'2026',kicker:'DEVELOPER EXPERIENCE / TOOLING',
        title:'Ingeniería que se puede repetir.',
        summary:'Hefesto Scaffold: generador de sistemas Laravel con manifiestos, paneles administrativos y controles de calidad incorporados.',
        context:'Crear proyectos de manera consistente evita repetir errores de arranque, permisos, pruebas y despliegue.',
        contribution:'Diseño de un generador y propuesta de una arquitectura CLI más guiada para adaptar la solución a cada necesidad.',
        decisions:['Privilegiar generación determinista basada en manifiestos.','Mantener pruebas, seguridad y documentación como requisitos del proyecto.','Separar componentes disponibles de integraciones todavía en desarrollo.'],
        technologies:['Laravel','Filament','PHP','FrankenPHP','React','CI/CD'],
        proof:'Hefesto Scaffold en evolución. No se publican promesas de provisionamiento ni métricas sin prueba.',
      },
      {
        id:'kraftdo',number:'05',year:'2024–2026',kicker:'PRODUCT ENGINEERING / SaaS',
        title:'Del objeto físico al producto digital.',
        summary:'KraftDo: experiencias mediante NFC/QR con un ecosistema SaaS, administración, APIs y automatizaciones.',
        context:'Construcción de una plataforma de negocio que une productos tangibles con perfiles y servicios digitales.',
        contribution:'Desarrollo Full Stack, integraciones, control de acceso y servicios de procesamiento documental.',
        decisions:['Separar operaciones comerciales, identidad y recursos de usuario.','Diseñar flujos verificables para eventos y servicios externos.','Proteger contenido y datos bajo controles de acceso por usuario.'],
        technologies:['Laravel','Filament','NFC / QR','Python','Cloudflare'],
        proof:'Proyecto propio descrito en el CV. No se presentan métricas de usuarios, ventas o disponibilidad.',
      },
    ],
    principles:{
      number:'02 / FORMA DE TRABAJAR',label:'DETRÁS DEL CÓDIGO',
      title:'Arquitectura es decidir qué no arriesgar.',
      description:'Un sistema serio exige decisiones explícitas sobre seguridad, mantenibilidad y operación. Las herramientas cambian; ese criterio permanece.',
      rows:[
        {title:'Entender antes de intervenir.',body:'Inventariar dependencias, exposición y comportamiento antes de modernizar o remediar.'},
        {title:'Automatizar lo repetible.',body:'Manifiestos, pipelines y playbooks para minimizar cambios manuales y facilitar la recuperación.'},
        {title:'Diseñar para operar.',body:'Permisos, registros, respaldos y procedimientos forman parte del producto desde el inicio.'},
      ],
    },
    experience:{
      number:'03 / EXPERIENCIA',title:'Del backend a la plataforma.',
      description:'Trayectoria profesional en sistemas de negocio, portales públicos, productos propios y operación de infraestructura.',
      rows:[
        {period:'2026 — HOY',role:'Software Engineering & DevSecOps',organization:'Ilustre Municipalidad de Graneros',text:'Desarrollo de sistemas, recuperación de plataformas y seguridad defensiva.'},
        {period:'2026 — HOY',role:'Fundador / Ingeniería',organization:'Hefesto Studio · En desarrollo',text:'Herramientas, arquitectura reproducible y soluciones de software.'},
        {period:'2024 — 2026',role:'Fundador / Full Stack',organization:'KraftDo',text:'SaaS y experiencias NFC/QR.'},
        {period:'2023 — 2024',role:'Backend Developer',organization:'Babel',text:'Servicios públicos e integraciones Laravel.'},
        {period:'2020 — 2023',role:'Backend Developer',organization:'Europa Press',text:'Plataformas editoriales, APIs y servicios AWS.'},
        {period:'2018 — 2019',role:'Backend Developer',organization:'Gux',text:'Modernización de sistemas heredados y despliegues AWS.'},
      ],
    },
    footer:{title:'¿Construimos algo que resista?',body:'Para colaborar en ingeniería de plataformas, desarrollo y seguridad de aplicaciones.',contact:'Conversar sobre un proyecto',github:'Código en GitHub',studio:'Hefesto Studio',signature:'Ingeniería con criterio. Sin humo.',top:'Volver arriba'},
  },
  en: {
    lang:'en-US',
    title:'César Bugueño — Software Engineering · DevSecOps · Platform Engineering',
    description:'Engineering portfolio: Full Stack development, application security, system recovery and reproducible infrastructure.',
    nav:{work:'Selected work',principles:'Approach',experience:'Experience',contact:'Contact',toggle:'Español',intro:'Main navigation'},
    eyebrow:'SOFTWARE ENGINEER / CHILE / EST. 2018',
    heroLines:['BUILD.','RECOVER.','SECURE.'],
    heroCopy:'From source code to production infrastructure. I build platforms, recover legacy systems and design security controls that hold up beyond the diagram.',
    heroRole:'FULL STACK / DEVSECOPS / PLATFORM ENGINEERING',
    heroLink:'Explore work',heroSecondary:'My approach',heroAside:'ENGINEERING, NOT DECORATION.',
    sheet:{
      pre:'FILE 001 / HOW I THINK',
      title:'A system is more than its interface.',
      foot:'CONCEPTUAL SCHEMATIC — NOT AN ACTUAL NETWORK',
      labels:['01 / PRODUCT','02 / TRUST','03 / OPERATIONS'],
      captions:['APIs · experience · data','Identity · privacy · tests','Linux · containers · CI/CD'],
    },
    indexLabel:'INDEX / SELECTED WORK',
    workTitle:'Let the work speak.',
    workDescription:'Documented projects and responsibilities. The value lies in problems solved and engineering decisions, not in the number of frameworks.',
    projectAction:'Read engineering decisions',
    caseDisclaimer:'Institutional systems are described at a high level to avoid disclosing internal configurations, people or infrastructure.',
    projectLabels:{context:'Context',decisions:'Decisions',stack:'Tools',status:'Evidence / status'},
    projects:[
      {
        id:'recovery',number:'01',year:'2026',kicker:'PUBLIC SECTOR / INCIDENT RESPONSE',
        title:'Recover what others left behind.',
        summary:'Recovery and modernization of legacy platforms, exposed-secret remediation and critical vulnerability reviews.',
        context:'Institutional systems with incomplete technical handover and requirements for continuity and auditability.',
        contribution:'Technical review, source recovery, secret remediation and controlled deployment preparation.',
        decisions:['Inventory dependencies and exposure before changing behavior.','Move secrets out of browser bundles and limit service permissions.','Document and verify infrastructure changes before deployment.'],
        technologies:['Laravel','PHP','Node.js','Docker','Linux','GitHub Actions'],
        proof:'Professional experience documented in the CV. No incident logs or internal outcomes are published.',
        emphasis:true,
      },
      {
        id:'privacy',number:'02',year:'2026',kicker:'APPLICATION / PRIVACY',
        title:'Security inside the codebase.',
        summary:'Laravel components for personal-data tokenization and auditable data-subject request handling.',
        context:'Personal data demands minimization, traceability and explicit authorization across services.',
        contribution:'Reusable components for privacy flows and requests; adopting a package alone does not guarantee legal compliance.',
        decisions:['Separate identification from authorization.','Keep audit trails without storing sensitive values.','Design explicit fail-closed behavior and tests.'],
        technologies:['PHP','Laravel','Cryptography','ARCOP','Testing'],
        proof:'Public source repository for laravel-anonimizacion. Compliance depends on each implementation.',
        link:{url:'https://github.com/buguenocesar92/laravel-anonimizacion',label:'Explore source'},
      },
      {
        id:'platform',number:'03',year:'2026',kicker:'PLATFORM ENGINEERING / DEVSECOPS',
        title:'Infrastructure is also code.',
        summary:'Reproducible VPS infrastructure: Linux hardening, VPN access, encrypted secrets and isolated containers.',
        context:'Infrastructure needs to be auditable and rebuildable without relying on undocumented manual changes.',
        contribution:'Ansible roles, administrative access hardening and documented recovery procedures.',
        decisions:['Automate with declarative and idempotent configuration.','Reduce service privileges and exposure.','Keep credentials outside version control and verify recovery.'],
        technologies:['Ansible','WireGuard','Docker rootless','SOPS + age','Cloudflare'],
        proof:'Professional work in progress according to the CV. The infrastructure repository remains private.',
      },
      {
        id:'scaffold',number:'04',year:'2026',kicker:'DEVELOPER EXPERIENCE / TOOLING',
        title:'Engineering worth repeating.',
        summary:'Hefesto Scaffold generates Laravel systems from manifests with administrative panels and embedded quality gates.',
        context:'Consistent project creation avoids repeatedly introducing errors in initial configuration, permissions and delivery.',
        contribution:'Deterministic generation and a guided CLI architecture proposal.',
        decisions:['Prefer deterministic, manifest-driven generation.','Make tests and security part of the initial foundation.','Distinguish existing capabilities from future integrations.'],
        technologies:['Laravel','Filament','PHP','FrankenPHP','React','CI/CD'],
        proof:'Hefesto Scaffold remains in development. No unverified provisioning benchmarks are claimed.',
      },
      {
        id:'kraftdo',number:'05',year:'2024–2026',kicker:'PRODUCT ENGINEERING / SaaS',
        title:'From physical objects to digital products.',
        summary:'KraftDo connects NFC/QR experiences to a SaaS product ecosystem with administration and integrations.',
        context:'Building a product that ties physical items to digital profiles and services.',
        contribution:'Full Stack development, integrations, access control and document-processing services.',
        decisions:['Separate commercial operations, identity and user assets.','Use verifiable flows for external events and services.','Protect user content with scoped authorization.'],
        technologies:['Laravel','Filament','NFC / QR','Python','Cloudflare'],
        proof:'Personal project described in the CV. No sales, user or uptime metrics are claimed.',
      },
    ],
    principles:{
      number:'02 / APPROACH',label:'BEYOND THE CODE',
      title:'Architecture means deciding what not to risk.',
      description:'Serious systems need explicit decisions about security, maintainability and operations. Tools change; judgment remains.',
      rows:[
        {title:'Understand before changing.',body:'Inventory dependencies, exposure and behavior before modernizing or remediating.'},
        {title:'Automate what repeats.',body:'Manifests, pipelines and playbooks reduce manual changes and simplify recovery.'},
        {title:'Design for operations.',body:'Permissions, logging, backups and runbooks belong to the product.'},
      ],
    },
    experience:{
      number:'03 / EXPERIENCE',title:'From backend to platform engineering.',
      description:'Professional work spanning business systems, government portals, original products and infrastructure.',
      rows:[
        {period:'2026 — NOW',role:'Software Engineering & DevSecOps',organization:'Municipality of Graneros',text:'Application development, platform recovery and defensive security.'},
        {period:'2026 — NOW',role:'Founder / Engineering',organization:'Hefesto Studio · In development',text:'Tooling, reproducible architecture and software solutions.'},
        {period:'2024 — 2026',role:'Founder / Full Stack',organization:'KraftDo',text:'SaaS and NFC/QR experiences.'},
        {period:'2023 — 2024',role:'Backend Developer',organization:'Babel',text:'Public-facing services and Laravel integrations.'},
        {period:'2020 — 2023',role:'Backend Developer',organization:'Europa Press',text:'Editorial platforms, APIs and AWS services.'},
        {period:'2018 — 2019',role:'Backend Developer',organization:'Gux',text:'Legacy modernization and AWS deployments.'},
      ],
    },
    footer:{title:'Building something that needs to last?',body:'Available for conversations about platform engineering, software delivery and application security.',contact:'Discuss a project',github:'Explore GitHub',studio:'Hefesto Studio',signature:'Engineering without smoke and mirrors.',top:'Back to top'},
  },
};
