/**
 * Servicio de casos de estudio.
 *
 * Fuente primaria: API REST del Headless CMS (Filament) en build-time.
 *   FILAMENT_API_URL    -> p.ej. https://cms.ejemplo.cl/api/cases
 *   FILAMENT_API_TOKEN  -> Bearer token (solo servidor, nunca PUBLIC_)
 * Fallback: archivos Markdown locales en src/content/cases/*.md
 *
 * Contrato esperado del CMS: { data: CmsCase[] } o CmsCase[].
 */
import type { MarkdownInstance } from 'astro';

export type Criticality = 'low' | 'medium' | 'high' | 'critical';
export type CaseLang = 'es' | 'en';

export interface CaseStudy {
  slug: string;
  lang: CaseLang;
  category: string;
  criticality: Criticality;
  title: string;
  summary: string;
  stack: string[];
  readingMinutes: number;
  publishedAt: string;
  /** HTML ya renderizado (CMS). */
  html?: string;
  /** Contenido Markdown local (fallback). */
  Content?: MarkdownInstance<Record<string, unknown>>['Content'];
  source: 'cms' | 'local';
}

const CRITICALITIES: Criticality[] = ['low', 'medium', 'high', 'critical'];

function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function asCriticality(v: unknown): Criticality {
  return CRITICALITIES.includes(v as Criticality) ? (v as Criticality) : 'medium';
}

function asLang(v: unknown): CaseLang {
  return v === 'en' ? 'en' : 'es';
}

function normalizeCms(raw: Record<string, unknown>): CaseStudy | null {
  const slug = String(raw.slug ?? '');
  const title = String(raw.title ?? '');
  if (!slug || !title) return null;
  const html = typeof raw.body_html === 'string' ? raw.body_html : '';
  const stack = Array.isArray(raw.stack) ? raw.stack.map(String) : [];
  return {
    slug,
    lang: asLang(raw.lang),
    category: String(raw.category ?? 'General'),
    criticality: asCriticality(raw.criticality),
    title,
    summary: String(raw.summary ?? ''),
    stack,
    readingMinutes:
      typeof raw.reading_minutes === 'number' ? raw.reading_minutes : readingTime(html.replace(/<[^>]+>/g, ' ')),
    publishedAt: String(raw.published_at ?? new Date().toISOString()),
    html,
    source: 'cms',
  };
}

async function fetchFromCms(): Promise<CaseStudy[] | null> {
  const url = import.meta.env.FILAMENT_API_URL;
  const token = import.meta.env.FILAMENT_API_TOKEN;
  if (!url) return null;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as unknown;
    const items = Array.isArray(json) ? json : ((json as { data?: unknown }).data ?? []);
    if (!Array.isArray(items)) throw new Error('Formato inesperado');
    return items
      .map((i) => normalizeCms(i as Record<string, unknown>))
      .filter((c): c is CaseStudy => c !== null);
  } catch (err) {
    console.warn(`[cms] API no disponible, usando fallback local: ${(err as Error).message}`);
    return null;
  }
}

function loadLocal(): CaseStudy[] {
  const files = import.meta.glob<MarkdownInstance<Record<string, any>>>('../content/cases/*.md', {
    eager: true,
  });
  return Object.entries(files).map(([path, mod]) => {
    const fm = mod.frontmatter;
    const slug = String(fm.slug ?? path.split('/').pop()!.replace(/\.md$/, ''));
    return {
      slug,
      lang: asLang(fm.lang),
      category: String(fm.category ?? 'General'),
      criticality: asCriticality(fm.criticality),
      title: String(fm.title),
      summary: String(fm.summary ?? ''),
      stack: Array.isArray(fm.stack) ? fm.stack.map(String) : [],
      readingMinutes: readingTime(mod.rawContent()),
      publishedAt: String(fm.publishedAt ?? '1970-01-01'),
      Content: mod.Content,
      source: 'local' as const,
    };
  });
}

let cache: Promise<CaseStudy[]> | undefined;

/** Devuelve todos los casos (CMS o fallback local), más recientes primero. */
export function getCases(): Promise<CaseStudy[]> {
  cache ??= (async () => {
    const remote = await fetchFromCms();
    const list = remote && remote.length > 0 ? remote : loadLocal();
    return list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  })();
  return cache;
}

export async function getCasesByLang(lang: CaseLang): Promise<CaseStudy[]> {
  return (await getCases()).filter((c) => c.lang === lang);
}
