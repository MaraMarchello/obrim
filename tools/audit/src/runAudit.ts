import { runChecks } from './checks';
import { fetchPage } from './fetchPage';
import { dictFor } from './i18n';
import { extractFacts } from './pageFacts';
import { runPageSpeed } from './psi';
import { categoryScores, overallScore, topRecommendations } from './score';
import type { AuditReport, Lang } from './types';

export interface AuditOptions {
  url: string;
  lang: Lang;
  business?: string;
  psi?: boolean;
  log?: (msg: string) => void;
}

/** Orquesta descarga → hechos → checks → puntuación. No escribe nada en disco. */
export async function runAudit(opts: AuditOptions): Promise<AuditReport> {
  const log = opts.log ?? (() => {});
  log(`→ ${opts.url}`);
  const fetched = await fetchPage(opts.url);
  if (fetched.error) log(`✗ ${fetched.error}`);
  else log(`✓ HTTP ${fetched.status} · ${fetched.ttfbMs} ms TTFB · ${Math.round(fetched.bytes / 1024)} KB`);

  const psi = opts.psi && !fetched.error ? await runPageSpeed(fetched.finalUrl) : undefined;
  if (psi) log(psi.error ? `PSI: ${psi.error}` : `✓ PageSpeed móvil: ${psi.performanceScore}`);

  const facts = extractFacts(fetched.html, fetched.finalUrl);
  const checks = fetched.error
    ? [
        {
          id: 'reachable',
          category: 'visibility' as const,
          status: 'fail' as const,
          weight: 100,
          title: dictFor(opts.lang).checks.reachable.title,
          detail: (dictFor(opts.lang).checks.reachable.fail ?? '{value}').replace('{value}', fetched.error),
        },
      ]
    : runChecks({ lang: opts.lang, fetch: fetched, facts, psi });

  const { html: _html, ...fetchMeta } = fetched;
  return {
    business: opts.business ?? guessBusinessName(facts.title, fetched.finalUrl),
    url: fetched.requestedUrl,
    finalUrl: fetched.finalUrl,
    lang: opts.lang,
    generatedAt: new Date().toISOString(),
    score: overallScore(checks),
    categories: categoryScores(checks),
    checks,
    recommendations: topRecommendations(checks),
    fetch: fetchMeta,
    psi,
  };
}

function guessBusinessName(title: string, url: string): string {
  const fromTitle = title.split(/[|–—·-]/)[0].trim();
  if (fromTitle.length >= 3 && fromTitle.length <= 50) return fromTitle;
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
