import type { Category, CategoryScore, Check } from './types';

const CATEGORY_ORDER: Category[] = ['conversion', 'mobile', 'visibility', 'languages', 'legal', 'trust'];

const STATUS_FACTOR: Record<Check['status'], number> = { pass: 1, warn: 0.5, fail: 0, info: 1 };

/** Puntuación 0–100 ponderada: suma de pesos conseguidos / suma de pesos posibles. */
export function overallScore(checks: Check[]): number {
  const weighted = checks.filter((c) => c.weight > 0);
  const max = weighted.reduce((s, c) => s + c.weight, 0);
  if (!max) return 0;
  const got = weighted.reduce((s, c) => s + c.weight * STATUS_FACTOR[c.status], 0);
  return Math.round((got / max) * 100);
}

export function categoryScores(checks: Check[]): CategoryScore[] {
  return CATEGORY_ORDER.map((category) => {
    const own = checks.filter((c) => c.category === category);
    return { category, score: overallScore(own), checks: own };
  }).filter((c) => c.checks.length);
}

/** Top-N de problemas ordenados por impacto (peso × gravedad). */
export function topRecommendations(checks: Check[], limit = 5): Check[] {
  const severity = (c: Check) => (c.status === 'fail' ? 1 : c.status === 'warn' ? 0.5 : 0);
  return checks
    .filter((c) => c.status === 'fail' || c.status === 'warn')
    .sort((a, b) => b.weight * severity(b) - a.weight * severity(a))
    .slice(0, limit);
}

export function tierFor(score: number): 'excellent' | 'good' | 'fair' | 'poor' {
  if (score >= 85) return 'excellent';
  if (score >= 65) return 'good';
  if (score >= 40) return 'fair';
  return 'poor';
}
