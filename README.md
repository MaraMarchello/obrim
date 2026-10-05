# Obrim

Webs amb reserves, comandes i cites per a negocis de barri (Barcelona).

Monorepo con el one-pager de Obrim, dos demos comerciales y la herramienta de auditoría que genera el PDF que se envía a clientes potenciales.

## Estructura

| Carpeta | Qué es | Puerto dev |
|---|---|---|
| `apps/obrim` | One-pager obrim.cat (ca/es/en) | 4321 |
| `apps/demo-restaurant` | Demo «Can Roure»: carta, pedidos para llevar, reserva de mesa | 4322 |
| `apps/demo-salon` | Demo «Estudi Aran»: servicios, equipo, cita previa | 4323 |
| `packages/ui` | Tokens Tailwind, i18n, SEO, widgets Preact (`BookingWidget`, `OrderWidget`) | — |
| `tools/audit` | CLI de auditoría web → PDF | — |

Stack: Astro 5 (estático) · Preact islands · Tailwind 4 · TypeScript · pdfkit + cheerio.

## Comandos

```bash
npm install

npm run dev:obrim        # http://localhost:4321
npm run dev:restaurant   # http://localhost:4322
npm run dev:salon        # http://localhost:4323

npm run build            # compila las tres apps en apps/*/dist
npm run check            # astro check en las tres apps
```

Para que los enlaces a las demos del one-pager apunten a local, copia `apps/obrim/.env.example` a `apps/obrim/.env`.

## Auditoría web → PDF

Analiza la home de un negocio (HTTPS, móvil, velocidad, reservas/pedidos online, WhatsApp, idiomas, textos legales…), calcula una puntuación 0–100 y genera un informe PDF de 1–3 páginas con la marca Obrim.

```bash
npm run audit -- https://ejemplo.cat lang=ca name="Nom del negoci"
npm run audit -- https://ejemplo.cat lang=es psi save-json
```

| Opción | Descripción |
|---|---|
| `lang=ca\|es\|en` | idioma del informe (por defecto `ca`) |
| `name="…"` | nombre del negocio en la portada (si no, se deduce del `<title>`) |
| `out=ruta.pdf` | ruta del PDF (por defecto `reports/<dominio>-<fecha>.pdf`) |
| `psi` | añade Google PageSpeed móvil (20–60 s; `PSI_API_KEY` opcional para más cuota) |
| `save-json` | guarda también el informe en JSON |

También acepta `--lang es --name "…"`, pero **Windows PowerShell 5 se traga el `--`** y npm absorbe los flags; en PowerShell usa la forma `clave=valor` o ejecuta directamente `npx tsx tools/audit/src/cli.ts <url> --lang es`.

Código: `tools/audit/src/` — `fetchPage` (descarga como móvil, TTFB) → `pageFacts` (hechos del HTML con cheerio) → `checks` (interpretación con pesos) → `score` → `PdfRenderer`. Textos en `i18n.ts`.

## Despliegue (Vercel, un proyecto por app)

| Proyecto | Root Directory | Dominio previsto |
|---|---|---|
| obrim | `apps/obrim` | obrim.cat |
| demo-restaurant | `apps/demo-restaurant` | restaurant.obrim.cat |
| demo-salon | `apps/demo-salon` | salo.obrim.cat |

Build command `npm run build`, output `dist` (Vercel detecta Astro). Install command desde la raíz del repo: `npm install` (workspaces). Variables en el proyecto obrim: `PUBLIC_DEMO_RESTAURANT_URL`, `PUBLIC_DEMO_SALON_URL`.

Las demos llevan `noindex` y `robots.txt` con `Disallow: /`.

## Pendiente antes de publicar

- [ ] Número de WhatsApp, email e Instagram reales en `packages/ui/src/config.ts` (ahora son placeholders).
- [ ] NIF / datos fiscales en los textos legales (`apps/obrim/src/i18n/*.ts`, sección `legal`).
- [ ] Foto del fundador en `apps/obrim/public/marat.jpg` y quitar el avatar «M» en `About.astro`.
- [ ] Revisión del catalán por un hablante nativo.
- [ ] Fotos reales (o de banco) para las demos.
- [ ] Registrar `obrim.cat` y configurar DNS.
