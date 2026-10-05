export type Lang = 'ca' | 'es' | 'en';

export type CheckStatus = 'pass' | 'warn' | 'fail' | 'info';

export type Category = 'visibility' | 'mobile' | 'conversion' | 'languages' | 'legal' | 'trust';

export interface Check {
  id: string;
  category: Category;
  status: CheckStatus;
  /** Peso en la puntuación; 0 para los informativos */
  weight: number;
  title: string;
  detail: string;
}

export interface FetchResult {
  requestedUrl: string;
  finalUrl: string;
  status: number;
  redirectedToHttps: boolean;
  ttfbMs: number;
  totalMs: number;
  bytes: number;
  html: string;
  headers: Record<string, string>;
  error?: string;
}

export interface PsiResult {
  performanceScore: number | null;
  lcp?: string;
  cls?: string;
  tbt?: string;
  error?: string;
}

export interface CategoryScore {
  category: Category;
  score: number;
  checks: Check[];
}

export interface AuditReport {
  business: string;
  url: string;
  finalUrl: string;
  lang: Lang;
  generatedAt: string;
  score: number;
  categories: CategoryScore[];
  checks: Check[];
  recommendations: Check[];
  fetch: Omit<FetchResult, 'html'>;
  psi?: PsiResult;
}
