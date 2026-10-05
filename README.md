# Obrim

Webs amb reserves, comandes i cites per a negocis de l'Alt Penedès (Vilafranca, Pacs i comarca).

Monorepo con el one-pager de Obrim, tres demos comerciales ambientadas en la comarca y la herramienta de auditoría que genera el PDF que se envía a clientes potenciales.

Zona objetivo: Alt Penedès (116.098 hab., 27 municipios; Idescat 2025). Primer foco: Vilafranca del Penedès (42.561 hab., 598 establecimientos comerciales) y Pacs del Penedès. Vertical prioritaria: cellers y enoturismo (74 bodegas en la Ruta del Vi, 369.170 visitantes en 2024).

## Estructura

| Carpeta | Qué es | Puerto dev |
|---|---|---|
| `apps/obrim` | One-pager obrim.cat (ca/es/en) | 4321 |
| `apps/demo-restaurant` | Demo «Can Roure» (Vilafranca): carta, pedidos para llevar, reserva de mesa | 4322 |
| `apps/demo-salon` | Demo «Estudi Aran» (Vilafranca): servicios, equipo, cita previa | 4323 |
| `apps/demo-celler` | Demo «Celler Mas Albareda» (Pacs): visitas y catas con precio por persona, idioma de la visita, tienda de vinos | 4324 |
| `packages/ui` | Tokens Tailwind, i18n, SEO, widgets Preact (`BookingWidget` modos table/appointment/experience, `OrderWidget`) | — |
| `tools/audit` | CLI de auditoría web → PDF | — |

Stack: Astro 5 (estático) · Preact islands · Tailwind 4 · TypeScript · pdfkit + cheerio.

## Comandos

```bash
npm install

npm run dev:obrim        # http://localhost:4321
npm run dev:restaurant   # http://localhost:4322
npm run dev:salon        # http://localhost:4323
npm run dev:celler       # http://localhost:4324

npm run build            # compila las cuatro apps en apps/*/dist
npm run check            # astro check en las cuatro apps
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
| demo-celler | `apps/demo-celler` | celler.obrim.cat |

Build command `npm run build`, output `dist` (Vercel detecta Astro). Install command desde la raíz del repo: `npm install` (workspaces). Variables en el proyecto obrim: `PUBLIC_DEMO_RESTAURANT_URL`, `PUBLIC_DEMO_SALON_URL`, `PUBLIC_DEMO_CELLER_URL`.

Las demos llevan `noindex` y `robots.txt` con `Disallow: /`.

## Pendiente antes de publicar

- [ ] Número de WhatsApp, email e Instagram reales en `packages/ui/src/config.ts` (ahora son placeholders).
- [ ] NIF / datos fiscales en los textos legales (`apps/obrim/src/i18n/*.ts`, sección `legal`).
- [ ] Foto del fundador en `apps/obrim/public/marat.jpg` y quitar el avatar «M» en `About.astro`.
- [ ] Revisión del catalán por un hablante nativo.
- [ ] Fotos reales (o de banco) para las demos (viñas y celler para la demo-celler).
- [ ] Confirmar que «Celler Mas Albareda», «Can Roure» y «Estudi Aran» no coinciden con negocios reales de la comarca.
- [ ] Registrar `obrim.cat` y configurar DNS.
