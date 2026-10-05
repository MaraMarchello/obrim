export const LOCALES = ['ca', 'es', 'en'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = 'ca';

export const LANG_NAMES: Record<Lang, string> = {
  ca: 'Català',
  es: 'Español',
  en: 'English',
};

export const HTML_LANG: Record<Lang, string> = {
  ca: 'ca-ES',
  es: 'es-ES',
  en: 'en',
};

export function isLang(value: string | undefined): value is Lang {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return isLang(first) ? first : DEFAULT_LANG;
}

/** Elimina el prefijo de idioma de una ruta: /es/legal → /legal */
export function stripLang(pathname: string): string {
  const parts = pathname.split('/');
  if (isLang(parts[1])) {
    const rest = '/' + parts.slice(2).join('/');
    return rest === '/' ? '/' : rest.replace(/\/$/, '');
  }
  return pathname === '/' ? '/' : pathname.replace(/\/$/, '');
}

/** Añade el prefijo de idioma (el idioma por defecto no lleva prefijo). */
export function localizePath(path: string, lang: Lang): string {
  const clean = stripLang(path.startsWith('/') ? path : `/${path}`);
  if (lang === DEFAULT_LANG) return clean;
  return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
}

export function formatPrice(value: number, lang: Lang): string {
  return new Intl.NumberFormat(HTML_LANG[lang], {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}
