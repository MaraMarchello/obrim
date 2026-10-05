import type { PsiResult } from './types';

/**
 * PageSpeed Insights (móvil). Funciona sin clave con cuota limitada;
 * con PSI_API_KEY en el entorno la cuota es mayor.
 */
export async function runPageSpeed(url: string, timeoutMs = 70000): Promise<PsiResult> {
  const params = new URLSearchParams({ url, strategy: 'mobile', category: 'performance' });
  const key = process.env.PSI_API_KEY;
  if (key) params.set('key', key);
  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(endpoint, { signal: controller.signal });
    if (!res.ok) return { performanceScore: null, error: `PSI HTTP ${res.status}` };
    const json = (await res.json()) as {
      lighthouseResult?: {
        categories?: { performance?: { score?: number } };
        audits?: Record<string, { displayValue?: string }>;
      };
    };
    const lh = json.lighthouseResult;
    const score = lh?.categories?.performance?.score;
    return {
      performanceScore: typeof score === 'number' ? Math.round(score * 100) : null,
      lcp: lh?.audits?.['largest-contentful-paint']?.displayValue,
      cls: lh?.audits?.['cumulative-layout-shift']?.displayValue,
      tbt: lh?.audits?.['total-blocking-time']?.displayValue,
    };
  } catch (err) {
    return { performanceScore: null, error: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}
