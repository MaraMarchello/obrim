import { dictFor, fill } from './i18n';
import type { PageFacts } from './pageFacts';
import type { Category, Check, CheckStatus, FetchResult, Lang, PsiResult } from './types';

interface Ctx {
  lang: Lang;
  fetch: FetchResult;
  facts: PageFacts;
  psi?: PsiResult;
}

type Builder = (ctx: Ctx) => Check | null;

/**
 * Convierte los hechos en checks con texto para el cliente.
 * Cada check: categoría, peso (impacto en la puntuación) y estado.
 */
export function runChecks(ctx: Ctx): Check[] {
  return BUILDERS.map((b) => b(ctx)).filter((c): c is Check => c !== null);
}

function make(ctx: Ctx, id: string, category: Category, weight: number, status: CheckStatus, value?: string | number): Check {
  const text = dictFor(ctx.lang).checks[id];
  const template = text[status] ?? text.fail ?? text.warn ?? text.pass;
  return { id, category, weight, status, title: text.title, detail: fill(template, value) };
}

const BUILDERS: Builder[] = [
  // Visibilidad
  (c) => make(c, 'https', 'visibility', 8, c.fetch.redirectedToHttps ? 'pass' : 'fail'),
  (c) => {
    const len = c.facts.title.length;
    const status: CheckStatus = len === 0 ? 'fail' : len < 15 || len > 70 ? 'warn' : 'pass';
    return make(c, 'title', 'visibility', 5, status, c.facts.title.slice(0, 90));
  },
  (c) => {
    const len = c.facts.description.length;
    const status: CheckStatus = len === 0 ? 'fail' : len < 70 || len > 170 ? 'warn' : 'pass';
    return make(c, 'description', 'visibility', 4, status, len);
  },
  (c) => {
    const n = c.facts.h1s.length;
    const status: CheckStatus = n === 0 ? 'fail' : n > 1 ? 'warn' : 'pass';
    return make(c, 'h1', 'visibility', 3, status, n === 1 ? c.facts.h1s[0].slice(0, 80) : n);
  },
  (c) => make(c, 'canonical', 'visibility', 1, c.facts.hasCanonical ? 'pass' : 'fail'),
  (c) => make(c, 'og', 'visibility', 3, c.facts.hasOg ? 'pass' : 'fail'),
  (c) => make(c, 'schema', 'visibility', 4, c.facts.schemaTypes.length ? 'pass' : 'fail', c.facts.schemaTypes.join(', ')),
  (c) => make(c, 'noindex', 'visibility', 10, c.facts.noindex ? 'fail' : 'pass'),
  (c) => make(c, 'favicon', 'visibility', 1, c.facts.hasFavicon ? 'pass' : 'warn'),

  // Móvil y velocidad
  (c) => make(c, 'viewport', 'mobile', 10, c.facts.hasViewport ? 'pass' : 'fail'),
  (c) => {
    const ms = c.fetch.ttfbMs;
    return make(c, 'ttfb', 'mobile', 3, ms < 800 ? 'pass' : ms < 1800 ? 'warn' : 'fail', ms);
  },
  (c) => {
    const ms = c.fetch.totalMs;
    return make(c, 'total', 'mobile', 3, ms < 1500 ? 'pass' : ms < 3000 ? 'warn' : 'fail', ms);
  },
  (c) => {
    const kb = Math.round(c.fetch.bytes / 1024);
    return make(c, 'size', 'mobile', 2, kb < 300 ? 'pass' : 'warn', kb);
  },
  (c) => make(c, 'scripts', 'mobile', 2, c.facts.externalScripts <= 12 ? 'pass' : 'warn', c.facts.externalScripts),
  (c) => make(c, 'imgAlt', 'mobile', 2, c.facts.imagesWithoutAlt === 0 ? 'pass' : 'warn', c.facts.imagesWithoutAlt),
  (c) => make(c, 'legacyTech', 'mobile', 2, c.facts.legacyTech.length ? 'warn' : 'pass', c.facts.legacyTech.join(', ')),
  (c) => {
    if (!c.psi) return null;
    const s = c.psi.performanceScore;
    if (s === null) return make(c, 'psi', 'mobile', 0, 'info');
    return make(c, 'psi', 'mobile', 6, s >= 80 ? 'pass' : s >= 50 ? 'warn' : 'fail', s);
  },

  // Conversión
  (c) => {
    const f = c.facts;
    if (f.bookingNative && !f.bookingExternal.length) return make(c, 'booking', 'conversion', 12, 'pass');
    if (f.bookingExternal.length) return make(c, 'booking', 'conversion', 12, 'warn', f.bookingExternal.join(', '));
    return make(c, 'booking', 'conversion', 12, 'fail');
  },
  (c) => make(c, 'phone', 'conversion', 5, c.facts.telLinks ? 'pass' : 'fail'),
  (c) => make(c, 'whatsapp', 'conversion', 6, c.facts.whatsappLinks ? 'pass' : 'fail'),
  (c) => make(c, 'form', 'conversion', 1, c.facts.forms ? 'pass' : 'warn'),
  (c) => make(c, 'maps', 'conversion', 3, c.facts.maps ? 'pass' : 'warn'),
  (c) => make(c, 'hours', 'conversion', 3, c.facts.hoursMentioned ? 'pass' : 'warn'),

  // Idiomas
  (c) => make(c, 'htmlLang', 'languages', 2, c.facts.htmlLang ? 'pass' : 'fail', c.facts.htmlLang),
  (c) => {
    const langs = [...new Set([...c.facts.hreflangs, ...c.facts.langSwitcherLangs])];
    const detected = langs.length ? langs : c.facts.htmlLang ? [c.facts.htmlLang.split('-')[0].toLowerCase()] : [];
    const status: CheckStatus = detected.length >= 2 ? 'pass' : detected.length === 1 ? 'warn' : 'fail';
    return make(c, 'languages', 'languages', 6, status, detected.map((l) => l.toUpperCase()).join(', '));
  },
  (c) => make(c, 'catalan', 'languages', 5, c.facts.looksCatalan ? 'pass' : 'fail'),

  // Legal
  (c) => make(c, 'privacy', 'legal', 4, c.facts.privacyLink ? 'pass' : 'fail'),
  (c) => make(c, 'legalNotice', 'legal', 4, c.facts.legalNoticeLink ? 'pass' : 'fail'),
  (c) => make(c, 'cookies', 'legal', 2, c.facts.cookiesMention ? 'pass' : 'warn'),
  (c) => make(c, 'complaints', 'legal', 0, c.facts.complaintsMention ? 'pass' : 'info'),

  // Confianza
  (c) => {
    const y = c.facts.copyrightYear;
    if (y === null) return null;
    const current = new Date().getFullYear();
    return make(c, 'copyright', 'trust', 2, y >= current - 1 ? 'pass' : 'warn', y);
  },
  (c) => make(c, 'social', 'trust', 2, c.facts.socialNetworks.length ? 'pass' : 'warn', c.facts.socialNetworks.join(', ')),
  (c) => make(c, 'mixedContent', 'trust', 2, c.facts.httpResources ? 'warn' : 'pass', c.facts.httpResources),
];
