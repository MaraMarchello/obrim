#!/usr/bin/env tsx
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PdfRenderer } from './PdfRenderer';
import { runAudit } from './runAudit';
import type { Lang } from './types';

interface CliArgs {
  url: string;
  lang: Lang;
  business?: string;
  out?: string;
  psi: boolean;
  json: boolean;
}

const USAGE = `Uso: npm run audit -- <url> [lang=ca|es|en] [name="Nombre del negocio"] [out=ruta.pdf] [psi] [save-json]

  lang       idioma del informe (por defecto: ca)
  name       nombre del negocio para la portada (por defecto: se deduce del <title>)
  out        ruta del PDF (por defecto: reports/<dominio>-<fecha>.pdf)
  psi        añade la puntuación de Google PageSpeed (tarda 20–60 s; PSI_API_KEY opcional)
  save-json  guarda también el informe en JSON junto al PDF

  También se aceptan --lang es, --name "...", --out ..., --psi, --save-json.
  Ojo: Windows PowerShell 5 se traga el «--», así que allí usa la forma key=value.`;

const LANGS: Lang[] = ['ca', 'es', 'en'];

/**
 * Acepta tres formas: `--key value`, `--key=value` y `key=value`.
 * Si npm ha absorbido un flag (`--lang es` → npm_config_lang), lo recuperamos del entorno.
 */
function parseArgs(argv: string[], env: NodeJS.ProcessEnv): CliArgs | null {
  const kv = new Map<string, string>();
  const positional: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-h' || a === '--help') return null;
    const m = a.match(/^(?:--)?([a-z-]+)=(.*)$/i) ?? a.match(/^--([a-z-]+)$/i);
    if (!m) {
      positional.push(a);
      continue;
    }
    const key = m[1].toLowerCase();
    if (m[2] !== undefined) kv.set(key, m[2]);
    else if (['psi', 'save-json'].includes(key)) kv.set(key, 'true');
    else kv.set(key, argv[++i] ?? '');
  }
  // npm convierte `--name X` en npm_config_name=true y deja X como posicional; ese "true" no nos sirve.
  const fromEnv = (key: string, flag: boolean) => {
    const v = env[`npm_config_${key.replace('-', '_')}`];
    return v === undefined || (!flag && v === 'true') ? undefined : v;
  };
  const pick = (key: string, flag = false) => kv.get(key) ?? fromEnv(key, flag);
  const bare = positional.find((p) => ['psi', 'save-json'].includes(p.toLowerCase()));
  if (bare) kv.set(bare.toLowerCase(), 'true');

  const url = positional.find((p) => !['psi', 'save-json'].includes(p.toLowerCase()) && !LANGS.includes(p as Lang)) ?? '';
  const lang = (pick('lang') ?? positional.find((p) => LANGS.includes(p as Lang)) ?? 'ca') as Lang;
  if (!url || !LANGS.includes(lang)) return null;
  return {
    url,
    lang,
    business: pick('name') || undefined,
    out: pick('out') || undefined,
    psi: pick('psi', true) === 'true',
    json: pick('save-json', true) === 'true',
  };
}

function defaultOutPath(finalUrl: string): string {
  const host = (() => {
    try {
      return new URL(finalUrl).hostname.replace(/^www\./, '');
    } catch {
      return 'site';
    }
  })();
  const date = new Date().toISOString().slice(0, 10);
  return path.join('reports', `${host}-${date}.pdf`);
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2), process.env);
  if (!args) {
    console.log(USAGE);
    process.exit(1);
  }

  const report = await runAudit({ url: args.url, lang: args.lang, business: args.business, psi: args.psi, log: (m) => console.log(m) });

  const outPath = args.out ?? defaultOutPath(report.finalUrl);
  await mkdir(path.dirname(outPath), { recursive: true });
  await new PdfRenderer(report).writeTo(outPath);
  console.log(`✓ PDF: ${outPath}`);

  if (args.json) {
    const jsonPath = outPath.replace(/\.pdf$/i, '.json');
    await writeFile(jsonPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`✓ JSON: ${jsonPath}`);
  }

  console.log(`Puntuación: ${report.score}/100`);
  for (const r of report.recommendations) console.log(`  • ${r.title}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
