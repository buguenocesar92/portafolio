# Handoff Maestro del Ecosistema — Hefesto Studio, Portafolio & Calify Fit

> **Propósito de este documento**: Proveer a cualquier modelo de IA o ingeniero futuro el **100 % del contexto técnico, de infraestructura, DNS, CI/CD y de integración Headless** del ecosistema de César Bugueño (`hefesto-studio.cl`, `cesarbugueno.dev` y `calify-fit`), de modo que pueda retomar cualquier tarea sin pérdida de contexto.

---

## 1. Infraestructura en Cloudflare (DNS & Pages)

### 1.1 Cuenta principal de Cloudflare
- **Cuenta**: `buguenocesar92@gmail.com`
- **Account ID**: `95ed109343d1a28c31a107067cb41ddb`
- **Nameservers autoritativos asignados**:
  - `elijah.ns.cloudflare.com`
  - `kenia.ns.cloudflare.com`

### 1.2 Zonas DNS activas en Cloudflare

| Dominio raíz | Zone ID | Estado | Uso principal |
| :--- | :--- | :--- | :--- |
| `hefesto-studio.cl` | `2bccd11ebddcf87e430e4f28b26fda88` | Active | Sitio corporativo de Hefesto Studio, subdominio `calify.hefesto-studio.cl`, panel/API en `panel.hefesto-studio.cl` |
| `cesarbugueno.dev` | `3e243fb4f1f9560a90df7a59fb0a534d` | Active | Portafolio profesional de César Bugueño y subdominio `calify.cesarbugueno.dev` |

### 1.3 Proyectos en Cloudflare Pages (Conectados a GitHub `buguenocesar92`)

Los 3 sitios principales están configurados como proyectos de **Cloudflare Pages** con integración nativa a GitHub (`buguenocesar92`) y despliegue continuo:

| # | Proyecto Cloudflare Pages | Repositorio GitHub | Ruta local en `xeon` | Dominios personalizados vinculados |
| :-: | :--- | :--- | :--- | :--- |
| **1** | `hefesto-studio` | `buguenocesar92/hefesto-studio-docker` | `/home/cesar/Dev/personal/hefesto-studio-docker` | `https://hefesto-studio.cl`<br>`https://www.hefesto-studio.cl` |
| **2** | `cesarbugueno-dev` | `buguenocesar92/portafolio` | `/home/cesar/Dev/personal/portafolio` | `https://cesarbugueno.dev`<br>`https://www.cesarbugueno.dev` |
| **3** | `calify-fit` | `buguenocesar92/calify-fit` | `/home/cesar/Dev/personal/calify-fit` | `https://calify.hefesto-studio.cl`<br>`https://calify.cesarbugueno.dev` |

> **Variables de entorno clave en Cloudflare Pages (`hefesto-studio`)**:
> - `NODE_VERSION=24` (obligatorio para Astro 7).
> - `HEFESTO_API_URL=https://panel.hefesto-studio.cl/api/v1` (opcional hasta activar el backend en producción; si no está o falla, usa el fallback local versionado).
> - `HEFESTO_API_TOKEN=<Bearer Token de servidor>` (secreto de lectura para build-time SSG).

---

## 2. Arquitectura Astro 7 + React 19 de `hefesto-studio-docker`

El repositorio `/home/cesar/Dev/personal/hefesto-studio-docker` fue migrado a **Astro 7 (`output: 'static'`) + islas interactivas en React 19**, manteniendo intacta la estética editorial de Hefesto Studio, su sistema bilingüe (`ES`/`EN`), selectores auditados por Playwright y sumando generación dinámica conectada a **Hefesto Scaffolding (Laravel 13 + Filament 5)**.

### 2.1 Cliente Headless (`src/lib/hefesto-scaffolding.ts`)
- En **build-time (SSG)**, cada vez que Cloudflare Pages o GitHub Actions compila el sitio, `src/lib/hefesto-scaffolding.ts` consulta la API REST de Hefesto Scaffolding usando:
  - `HEFESTO_API_URL` (o `FILAMENT_API_URL`), ej.: `https://panel.hefesto-studio.cl/api/v1`
  - `HEFESTO_API_TOKEN` (o `FILAMENT_API_TOKEN`), enviado en cabecera `Authorization: Bearer <token>` y `X-Hefesto-Client: astro-ssg/2.0`.
- **Resiliencia / Fallback local garantizado**: Si la API no está configurada o responde con error/timeout (>10 s), el cliente hace fallback transparente a los catálogos locales versionados en el repositorio (`content/products.json`, `content/ecosystem.json`, `content/kraftdo.json`, `modules/plantillas/dist/catalog.json`, y `src/data/legal/*.html`), fusionando registros remotos por `slug`/`id` sobre la base local para nunca romper un build ni perder páginas existentes.

### 2.2 Rutas dinámicas generadas en cada despliegue (`getStaticPaths()`)

| Ruta generada | Archivo fuente en Astro | Componente React 19 / origen de datos | Descripción |
| :--- | :--- | :--- | :--- |
| `/proyectos/[slug]/` | `src/pages/proyectos/[slug].astro` | `getProducts()` (`content/products.json` + API `/api/v1/products`) | Fichas de los 6 productos propios (`hefesto-scaffolding`, `aura`, `nexo`, `pulso`, `atlas`, `ordenia`) más cualquier producto nuevo publicado en Filament. |
| `/proyectos/kraftdo/` | `src/pages/proyectos/kraftdo/index.astro` | `getKraftdoCase()` (`content/kraftdo.json` + API `/api/v1/cases/kraftdo`) | Caso de estudio insignia de Kraftdo (primer cliente y primer proyecto a medida). |
| `/soluciones/[id]/` | `src/pages/soluciones/[id].astro` | `SolutionConfigurator.tsx` (React 19) + `getEcosystemSolutions()` (`/api/v1/ecosystem`) | 10 soluciones del ecosistema (Aula Viva, Turno Claro, etc.) + configurador interactivo React 19 con deep-link a `#cotizar`. |
| `/rubros/[id]/` | `src/pages/rubros/[id].astro` | `RubroExplorer.tsx` (React 19) + `getRubrosCatalog()` (`/api/v1/templates`) | Catálogo completo de **48 rubros/plantillas** (`modules/plantillas/dist/catalog.json` + nuevos packs desde Filament) con buscador y filtro en vivo en React 19. |
| `/casos/[slug]/` | `src/pages/casos/[slug].astro` | `getDynamicCases()` (`/api/v1/cases`) | Páginas estáticas automáticas para nuevos casos de estudio o proyectos a medida creados en Hefesto Scaffolding. |
| `/legal/[slug]/` | `src/pages/legal/[slug]/index.html.ts` | `getLegalDocuments()` (`src/data/legal/*.html` + `/api/v1/legal`) | Los 6 documentos legales verificados (`aviso-legal`, `privacidad`, `cookies`, `terminos`, `accesibilidad`, `proteccion-datos`) más anexos legales adicionales desde CMS. |

---

## 3. Flujo de Actualización Automática al Publicar en Hefesto Scaffolding

Dado que el sitio se sirve como estático ultra-rápido en el Edge de Cloudflare Pages, cada vez que un administrador crea, actualiza o elimina un **Producto, Solución, Caso de Estudio, Plantilla de Rubro o Documento Legal** en **Hefesto Scaffolding (Laravel 13 / Filament 5)**, el backend dispara una reconstrucción automática del sitio Astro:

### Opción A (Recomendada): Deploy Hook nativo de Cloudflare Pages
1. En el dashboard de Cloudflare → **Workers & Pages** → **`hefesto-studio`** → **Settings** → **Builds & deployments** → **Deploy hooks**, crear un hook llamado `hefesto-scaffolding-cms` sobre la rama de producción (`main`).
2. Cloudflare entrega una URL única del tipo:
   ```text
   https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/<HOOK_ID>
   ```
3. Configurar esa URL en el `.env` de Hefesto Scaffolding (`CLOUDFLARE_PAGES_DEPLOY_HOOK_URL`).
4. Cuando un modelo Eloquent con el trait `RebuildsAstroPages` se guarda o elimina en Filament, Laravel ejecuta un `POST` a ese Deploy Hook (con *debounce* en caché Redis para agrupar múltiples ediciones seguidas en un único build).

### Opción B (Alternativa / Complementaria): GitHub `repository_dispatch`
1. El workflow `.github/workflows/deploy.yml` de `hefesto-studio-docker` ya escucha el evento `repository_dispatch`:
   ```yaml
   repository_dispatch:
     types: [hefesto-scaffolding-updated, cms-updated]
   ```
2. Si se configura `GITHUB_DISPATCH_TOKEN` (PAT con scope `repo` o `contents:write`) y `GITHUB_DISPATCH_REPO=buguenocesar92/hefesto-studio-docker` en el `.env` de Laravel, el servicio `CloudflarePagesRebuilder` puede disparar también (o en su lugar) el webhook hacia `POST https://api.github.com/repos/buguenocesar92/hefesto-studio-docker/dispatches`.

---

## 4. Kit Completo PHP para Laravel 13 / Filament 5 (Hefesto Scaffolding)

A continuación se incluye el código listo para copiar e integrar directamente en el proyecto **Hefesto Scaffolding (Laravel 13 + Filament 5)**.

### 4.1 Variables de entorno y configuración (`config/services.php` y `.env`)

Añadir en `.env` de Hefesto Scaffolding:
```dotenv
# Token que Astro envía en Authorization: Bearer <token> durante el build
HEFESTO_SCAFFOLDING_API_TOKEN="hefesto_live_token_reemplazar_por_secreto_seguro"

# Opción A (Recomendada): Deploy Hook de Cloudflare Pages (proyecto hefesto-studio)
CLOUDFLARE_PAGES_DEPLOY_HOOK_URL="https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/TU_HOOK_ID"

# Opción B (Opcional): GitHub repository_dispatch
GITHUB_DISPATCH_REPO="buguenocesar92/hefesto-studio-docker"
GITHUB_DISPATCH_TOKEN=""

# Segundos de enfriamiento (debounce) para evitar múltiples builds si se editan 10 registros seguidos
ASTRO_REBUILD_COOLDOWN_SECONDS=60
```

Añadir en `config/services.php`:
```php
'hefesto_astro' => [
    'api_token' => env('HEFESTO_SCAFFOLDING_API_TOKEN'),
    'cf_deploy_hook' => env('CLOUDFLARE_PAGES_DEPLOY_HOOK_URL'),
    'github_repo' => env('GITHUB_DISPATCH_REPO', 'buguenocesar92/hefesto-studio-docker'),
    'github_token' => env('GITHUB_DISPATCH_TOKEN'),
    'cooldown_seconds' => (int) env('ASTRO_REBUILD_COOLDOWN_SECONDS', 60),
],
```

---

### 4.2 Servicio `App\Services\CloudflarePagesRebuilder`

Archivo: `app/Services/CloudflarePagesRebuilder.php`

```php
<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

final class CloudflarePagesRebuilder
{
    private const CACHE_LOCK_KEY = 'hefesto:astro_pages_rebuild:cooldown';

    /**
     * Dispara la reconstrucción de hefesto-studio en Cloudflare Pages (y opcionalmente GitHub)
     * aplicando un debounce en Redis/Cache para no disparar 10 builds si se editan 10 registros seguidos.
     */
    public function trigger(string $reason = 'cms-updated', array $context = [], bool $force = false): bool
    {
        $cooldown = (int) config('services.hefesto_astro.cooldown_seconds', 60);

        if (! $force && $cooldown > 0) {
            $acquired = Cache::add(self::CACHE_LOCK_KEY, [
                'reason' => $reason,
                'triggered_at' => now()->toIso8601String(),
                'context' => $context,
            ], now()->addSeconds($cooldown));

            if (! $acquired) {
                Log::info('[CloudflarePagesRebuilder] Rebuild omitido por debounce activo.', [
                    'reason' => $reason,
                    'context' => $context,
                ]);

                return false;
            }
        }

        $dispatched = false;

        // Opción A (Recomendada): Deploy Hook directo de Cloudflare Pages
        $cfHookUrl = (string) config('services.hefesto_astro.cf_deploy_hook', '');
        if ($cfHookUrl !== '') {
            try {
                $response = Http::timeout(10)
                    ->acceptJson()
                    ->post($cfHookUrl);

                if ($response->successful()) {
                    $dispatched = true;
                    Log::info('[CloudflarePagesRebuilder] Cloudflare Pages Deploy Hook disparado con éxito.', [
                        'reason' => $reason,
                        'context' => $context,
                    ]);
                } else {
                    Log::warning('[CloudflarePagesRebuilder] Respuesta no exitosa de Cloudflare Deploy Hook.', [
                        'status' => $response->status(),
                        'body' => $response->body(),
                    ]);
                }
            } catch (Throwable $e) {
                Log::error('[CloudflarePagesRebuilder] Error al invocar Cloudflare Deploy Hook: ' . $e->getMessage());
            }
        }

        // Opción B (Respaldo/Complemento): GitHub repository_dispatch
        $ghToken = (string) config('services.hefesto_astro.github_token', '');
        $ghRepo = (string) config('services.hefesto_astro.github_repo', 'buguenocesar92/hefesto-studio-docker');

        if (! $dispatched && $ghToken !== '' && $ghRepo !== '') {
            try {
                $response = Http::timeout(10)
                    ->withToken($ghToken)
                    ->withHeaders([
                        'Accept' => 'application/vnd.github+json',
                        'X-GitHub-Api-Version' => '2022-11-28',
                    ])
                    ->post("https://api.github.com/repos/{$ghRepo}/dispatches", [
                        'event_type' => 'hefesto-scaffolding-updated',
                        'client_payload' => [
                            'reason' => $reason,
                            'triggered_at' => now()->toIso8601String(),
                            'context' => $context,
                        ],
                    ]);

                if ($response->successful()) {
                    $dispatched = true;
                    Log::info('[CloudflarePagesRebuilder] GitHub repository_dispatch enviado con éxito.', [
                        'repo' => $ghRepo,
                        'reason' => $reason,
                    ]);
                }
            } catch (Throwable $e) {
                Log::error('[CloudflarePagesRebuilder] Error al enviar repository_dispatch a GitHub: ' . $e->getMessage());
            }
        }

        return $dispatched;
    }
}
```

---

### 4.3 Trait `App\Models\Concerns\RebuildsAstroPages`

Colocar este trait en los modelos Eloquent gestionados desde Filament 5:
- `App\Models\Product`
- `App\Models\EcosystemSolution`
- `App\Models\CaseStudy`
- `App\Models\TemplatePack`
- `App\Models\LegalDocument`

Archivo: `app/Models/Concerns/RebuildsAstroPages.php`

```php
<?php

declare(strict_types=1);

namespace App\Models\Concerns;

use App\Services\CloudflarePagesRebuilder;
use Illuminate\Database\Eloquent\Model;

trait RebuildsAstroPages
{
    public static function bootRebuildsAstroPages(): void
    {
        static::saved(function (Model $model): void {
            if (! self::shouldTriggerAstroRebuild($model)) {
                return;
            }

            dispatch(function () use ($model): void {
                app(CloudflarePagesRebuilder::class)->trigger(
                    reason: class_basename($model) . ':saved',
                    context: [
                        'model' => class_basename($model),
                        'id' => $model->getKey(),
                        'slug' => $model->getAttribute('slug') ?? $model->getAttribute('id'),
                    ]
                );
            })->afterResponse();
        });

        static::deleted(function (Model $model): void {
            dispatch(function () use ($model): void {
                app(CloudflarePagesRebuilder::class)->trigger(
                    reason: class_basename($model) . ':deleted',
                    context: [
                        'model' => class_basename($model),
                        'id' => $model->getKey(),
                    ]
                );
            })->afterResponse();
        });
    }

    protected static function shouldTriggerAstroRebuild(Model $model): bool
    {
        // Si el modelo tiene columna `is_published` o `status`, evitamos disparar builds por borradores no publicados
        if ( array_key_exists('is_published', $model->getAttributes()) ) {
            return (bool) $model->getAttribute('is_published') || $model->wasChanged('is_published');
        }

        if ( array_key_exists('status', $model->getAttributes()) ) {
            $status = (string) $model->getAttribute('status');
            return $status !== 'draft' || $model->wasChanged('status');
        }

        return true;
    }
}
```

---

### 4.4 Controlador API `App\Http\Controllers\Api\V1\ScaffoldingCmsController`

Este controlador sirve exactamente la estructura JSON que `src/lib/hefesto-scaffolding.ts` espera en `/api/v1/products`, `/api/v1/ecosystem`, `/api/v1/cases`, `/api/v1/cases/kraftdo`, `/api/v1/templates` y `/api/v1/legal`.

Archivo: `app/Http/Controllers/Api/V1/ScaffoldingCmsController.php`

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\CaseStudy;
use App\Models\EcosystemSolution;
use App\Models\LegalDocument;
use App\Models\Product;
use App\Models\TemplatePack;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class ScaffoldingCmsController extends Controller
{
    public function verifyToken(Request $request): void
    {
        $expected = (string) config('services.hefesto_astro.api_token', '');
        if ($expected !== '' && ! hash_equals($expected, (string) $request->bearerToken())) {
            abort(401, 'Unauthorized Hefesto Scaffolding Client');
        }
    }

    /**
     * GET /api/v1/products
     */
    public function products(Request $request): JsonResponse
    {
        $this->verifyToken($request);

        $items = Product::query()
            ->where('is_published', true)
            ->orderBy('num')
            ->get()
            ->map(fn (Product $p): array => [
                'slug' => $p->slug,
                'name' => $p->name,
                'num' => $p->num ?? '00',
                'tag' => [$p->tag_es, $p->tag_en],
                'headline' => [$p->headline_es, $p->headline_en],
                'intro' => [$p->intro_es, $p->intro_en],
                'audience' => [$p->audience_es, $p->audience_en],
                'features' => $p->features ?? [],
                'flow' => $p->flow ?? [],
                'limits' => [$p->limits_es, $p->limits_en],
                'stack' => $p->stack ?? [],
                'live' => $p->live_url,
                'quote' => $p->quote_slug ?? $p->slug,
                'faq' => $p->faq ?? [],
            ]);

        return response()->json(['data' => $items]);
    }

    /**
     * GET /api/v1/ecosystem
     */
    public function ecosystem(Request $request): JsonResponse
    {
        $this->verifyToken($request);

        $items = EcosystemSolution::query()
            ->where('status', '!=', 'draft')
            ->orderBy('sort_order')
            ->get()
            ->map(fn (EcosystemSolution $s): array => [
                'id' => $s->slug,
                'name' => $s->name,
                'category' => $s->category,
                'kind_es' => $s->kind_es,
                'kind_en' => $s->kind_en,
                'title_es' => $s->title_es,
                'title_en' => $s->title_en,
                'body_es' => $s->body_es,
                'body_en' => $s->body_en,
                'url' => $s->url,
                'status' => $s->status,
                'verified_on' => optional($s->verified_on)->format('Y-m-d') ?? now()->toDateString(),
            ]);

        return response()->json(['data' => $items]);
    }

    /**
     * GET /api/v1/cases
     */
    public function cases(Request $request): JsonResponse
    {
        $this->verifyToken($request);

        $items = CaseStudy::query()
            ->where('status', '!=', 'draft')
            ->orderByDesc('published_at')
            ->get()
            ->map(fn (CaseStudy $c): array => [
                'slug' => $c->slug,
                'name' => $c->name,
                'type' => $c->type ?? 'custom_project',
                'status' => $c->status ?? 'published',
                'summary_es' => $c->summary_es,
                'summary_en' => $c->summary_en,
                'stack' => $c->stack ?? [],
                'url' => $c->url,
            ]);

        return response()->json(['data' => $items]);
    }

    /**
     * GET /api/v1/cases/kraftdo
     */
    public function kraftdoCase(Request $request): JsonResponse
    {
        $this->verifyToken($request);

        $kraftdo = CaseStudy::query()->where('slug', 'kraftdo')->first();
        if (! $kraftdo) {
            return response()->json(['data' => null], 404);
        }

        return response()->json([
            'data' => [
                'id' => 'kraftdo',
                'client' => $kraftdo->name,
                'stack' => $kraftdo->stack ?? [],
                'features' => $kraftdo->features ?? [],
                'integrations' => $kraftdo->integrations ?? [],
            ],
        ]);
    }

    /**
     * GET /api/v1/templates
     */
    public function templates(Request $request): JsonResponse
    {
        $this->verifyToken($request);

        $items = TemplatePack::query()
            ->where('status', 'ready')
            ->orderBy('id')
            ->get()
            ->map(fn (TemplatePack $t): array => [
                'id' => $t->slug,
                'version' => $t->version ?? '1.0.0',
                'name' => $t->name,
                'category' => $t->category,
                'origin' => $t->origin ?? 'scaffolding',
                'status' => $t->status,
                'featured' => (bool) $t->featured,
                'layout' => $t->layout,
                'minimum_plan' => $t->minimum_plan ?? 'starter',
                'tags' => $t->tags ?? [],
                'brand' => $t->brand ?? [
                    'name' => $t->name,
                    'headline' => $t->headline ?? '',
                    'primary' => '#c5a059',
                    'secondary' => '#141413',
                    'logo' => null,
                ],
                'cta' => $t->cta ?? 'Solicitar demo',
                'categories' => $t->categories ?? [],
                'pages' => $t->pages ?? ['Inicio', 'Catálogo', 'Contacto'],
                'modules' => $t->modules ?? [],
                'systems' => $t->systems ?? [],
            ]);

        return response()->json(['data' => $items]);
    }

    /**
     * GET /api/v1/legal
     */
    public function legal(Request $request): JsonResponse
    {
        $this->verifyToken($request);

        $items = LegalDocument::query()
            ->where('is_published', true)
            ->get()
            ->map(fn (LegalDocument $doc): array => [
                'slug' => $doc->slug,
                'title' => $doc->title,
                'html' => $doc->body_html,
                'updated_at' => optional($doc->updated_at)->format('Y-m-d') ?? now()->toDateString(),
            ]);

        return response()->json(['data' => $items]);
    }
}
```

### 4.5 Registro de rutas en `routes/api.php` (Laravel 13)

```php
use App\Http\Controllers\Api\V1\ScaffoldingCmsController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/products', [ScaffoldingCmsController::class, 'products']);
    Route::get('/ecosystem', [ScaffoldingCmsController::class, 'ecosystem']);
    Route::get('/cases', [ScaffoldingCmsController::class, 'cases']);
    Route::get('/cases/kraftdo', [ScaffoldingCmsController::class, 'kraftdoCase']);
    Route::get('/templates', [ScaffoldingCmsController::class, 'templates']);
    Route::get('/legal', [ScaffoldingCmsController::class, 'legal']);
});
```

---

## 5. Notas Operativas Críticas del Entorno Local (`xeon`)

### 5.1 Versión de Node.js para Astro 7
- El binario global de Node en `xeon` es `v22.23.2`.
- **Astro 7 exige `Node >= 22.23.4` (o Node 24)**.
- **En local (`xeon`)**: Ejecutar siempre los comandos de build/test de `hefesto-studio-docker` anteponiendo Node 24:
  ```bash
  npx -y node@24 ./node_modules/.bin/astro build
  ```
- **En Cloudflare Pages**: Ya está definida la variable de entorno `NODE_VERSION=24` en el proyecto `hefesto-studio` (tanto en `production` como en `preview`).

### 5.2 Reglas de GitFlow Multi-Agente (`AI_GITFLOW_RULES.md`) y `strix-guard`
- `hefesto-studio-docker` cuenta con hooks activos de `strix-guard` (`core.hooksPath = /home/cesar/.local/share/strix-guard/hooks`) y el protocolo `AI_GITFLOW_RULES.md`.
- **Prohibido hacer commits directos en `main`, `master` o `develop`** desde el árbol de trabajo principal sin aislamiento.
- Para cualquier cambio futuro en `hefesto-studio-docker`, crear siempre un `git worktree` aislado en `/tmp/ai-worktrees/<id>` con rama `feature/<agente>-<tarea>`, o usar `HUMAN_OVERRIDE=1` únicamente cuando el usuario autorice explícitamente actualizar la rama de producción para despliegue en Cloudflare Pages.
- **Conventional Commits obligatorios**: `feat:`, `fix:`, `chore:`, `security:`, `docs:`.
