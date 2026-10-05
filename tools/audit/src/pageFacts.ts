import * as cheerio from 'cheerio';

/** Hechos extraídos del HTML, sin juicio de valor. Los checks los interpretan. */
export interface PageFacts {
  title: string;
  description: string;
  h1s: string[];
  hasCanonical: boolean;
  hasOg: boolean;
  schemaTypes: string[];
  noindex: boolean;
  hasFavicon: boolean;
  hasViewport: boolean;
  htmlLang: string;
  hreflangs: string[];
  langSwitcherLangs: string[];
  textSample: string;
  looksCatalan: boolean;
  imagesTotal: number;
  imagesWithoutAlt: number;
  externalScripts: number;
  legacyTech: string[];
  bookingNative: boolean;
  bookingExternal: string[];
  telLinks: number;
  whatsappLinks: number;
  forms: number;
  maps: boolean;
  hoursMentioned: boolean;
  privacyLink: boolean;
  legalNoticeLink: boolean;
  cookiesMention: boolean;
  complaintsMention: boolean;
  copyrightYear: number | null;
  socialNetworks: string[];
  httpResources: number;
}

const BOOKING_PLATFORMS: Record<string, RegExp> = {
  TheFork: /thefork|eltenedor|lafourchette/i,
  Glovo: /glovo/i,
  'Uber Eats': /ubereats/i,
  'Just Eat': /just-?eat/i,
  Treatwell: /treatwell/i,
  Booksy: /booksy/i,
  Fresha: /fresha/i,
  CoverManager: /covermanager/i,
  Restoo: /restoo/i,
  Doctoralia: /doctoralia/i,
  Calendly: /calendly/i,
  Timify: /timify/i,
  Bookeo: /bookeo/i,
  // Plataformas de enoturismo habituales en el Penedès
  Winetourism: /winetourism\.com/i,
  'Ruta del Vi': /rutadelvipenedes|rutadelvino/i,
  Civitatis: /civitatis/i,
  GetYourGuide: /getyourguide/i,
  Viator: /viator\.com/i,
  Turitop: /turitop/i,
  Bookinglayer: /bookinglayer/i,
};

const BOOKING_WORDS =
  /\b(reserva|reservar|reserves|reservas|cita|cites|citas|comanda|comandes|pedido|pedidos|book(ing)?|order( online)?|appointment|agenda(r)?|visita|visites|visitas|tast|tastos|cata|catas|tasting|enoturisme|enoturismo|wine tour)\b/i;
const HOURS_WORDS = /\b(horari|horario|opening hours|hours|obert|abierto|open|dilluns|dimarts|lunes|martes|monday|tuesday|\d{1,2}[:.]\d{2}\s*[–-]\s*\d{1,2}[:.]\d{2})\b/i;
const PRIVACY_WORDS = /privaci|privacy|protecci[oó]n? de dades|protecci[oó]n de datos|rgpd|gdpr/i;
const LEGAL_WORDS = /av[ií]s legal|aviso legal|legal notice|nota legal|condicions|condiciones|terms/i;
const COOKIES_WORDS = /cookie|galeta/i;
const COMPLAINTS_WORDS = /full(s)? (oficials? )?de reclamaci|hojas? (oficiales? )?de reclamaci|reclamaci[oó]n|complaint/i;
const CATALAN_HINTS = /\b(amb|som|aquest|aquesta|també|més|però|molt|nostre|nostra|serveis|horari|reserva taula|obert|tancat|dilluns|dimarts|dimecres|dijous|divendres|dissabte|diumenge|benvinguts|benvinguda)\b/gi;

export function extractFacts(html: string, finalUrl: string): PageFacts {
  const $ = cheerio.load(html);
  const lower = html.toLowerCase();
  const text = $('body').text().replace(/\s+/g, ' ').trim();
  const isHttps = finalUrl.startsWith('https://');

  const langSwitcherLangs = detectLangSwitcher($);
  const hreflangs = $('link[rel="alternate"][hreflang]')
    .map((_, el) => ($(el).attr('hreflang') ?? '').toLowerCase())
    .get()
    .filter((l) => l && l !== 'x-default')
    .map((l) => l.split('-')[0]);

  const catalanMatches = text.match(CATALAN_HINTS)?.length ?? 0;
  const htmlLang = ($('html').attr('lang') ?? '').trim();

  return {
    title: $('title').first().text().trim(),
    description: $('meta[name="description"]').attr('content')?.trim() ?? '',
    h1s: $('h1').map((_, el) => $(el).text().replace(/\s+/g, ' ').trim()).get().filter(Boolean),
    hasCanonical: $('link[rel="canonical"]').length > 0,
    hasOg: $('meta[property="og:title"]').length > 0 && $('meta[property="og:image"]').length > 0,
    schemaTypes: extractSchemaTypes($),
    noindex: /noindex/i.test($('meta[name="robots"]').attr('content') ?? ''),
    hasFavicon: $('link[rel~="icon"]').length > 0,
    hasViewport: $('meta[name="viewport"]').length > 0,
    htmlLang,
    hreflangs: unique(hreflangs),
    langSwitcherLangs,
    textSample: text.slice(0, 400),
    looksCatalan: htmlLang.toLowerCase().startsWith('ca') || hreflangs.includes('ca') || langSwitcherLangs.includes('ca') || catalanMatches >= 6,
    imagesTotal: $('img').length,
    imagesWithoutAlt: $('img').filter((_, el) => !($(el).attr('alt') ?? '').trim()).length,
    externalScripts: $('script[src]').length,
    legacyTech: detectLegacyTech($, lower),
    bookingNative: detectNativeBooking($, text),
    bookingExternal: Object.entries(BOOKING_PLATFORMS)
      .filter(([, re]) => re.test(lower))
      .map(([name]) => name),
    telLinks: $('a[href^="tel:"]').length,
    whatsappLinks: $('a[href*="wa.me"], a[href*="whatsapp.com"], a[href^="whatsapp:"]').length,
    forms: $('form').length,
    maps: /maps\.google|google\.[a-z.]+\/maps|goo\.gl\/maps|maps\.app\.goo\.gl|openstreetmap|apple\.com\/maps/i.test(lower),
    hoursMentioned: HOURS_WORDS.test(text),
    privacyLink: $('a').filter((_, el) => PRIVACY_WORDS.test($(el).text() + ' ' + ($(el).attr('href') ?? ''))).length > 0,
    legalNoticeLink: $('a').filter((_, el) => LEGAL_WORDS.test($(el).text() + ' ' + ($(el).attr('href') ?? ''))).length > 0,
    cookiesMention: COOKIES_WORDS.test(lower),
    complaintsMention: COMPLAINTS_WORDS.test(text),
    copyrightYear: detectCopyrightYear(text),
    socialNetworks: detectSocial($),
    httpResources: isHttps ? countHttpResources($) : 0,
  };
}

function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

function extractSchemaTypes($: cheerio.CheerioAPI): string[] {
  const types: string[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).text());
      const list = Array.isArray(data) ? data : data['@graph'] ?? [data];
      for (const item of list) {
        const t = item?.['@type'];
        if (typeof t === 'string') types.push(t);
        else if (Array.isArray(t)) types.push(...t.filter((x) => typeof x === 'string'));
      }
    } catch {
      /* JSON inválido: lo ignoramos */
    }
  });
  return unique(types);
}

function detectLangSwitcher($: cheerio.CheerioAPI): string[] {
  const found = new Set<string>();
  $('a[hreflang], a[lang]').each((_, el) => {
    const l = ($(el).attr('hreflang') ?? $(el).attr('lang') ?? '').toLowerCase().split('-')[0];
    if (l) found.add(l);
  });
  $('a[href]').each((_, el) => {
    const href = ($(el).attr('href') ?? '').toLowerCase();
    const m = href.match(/(?:^|\/)(ca|es|en|fr|de|it)(?:\/|$|\?|#)/) ?? href.match(/[?&]lang=(ca|es|en|fr|de|it)\b/);
    if (m) found.add(m[1]);
  });
  return [...found];
}

function detectLegacyTech($: cheerio.CheerioAPI, lower: string): string[] {
  const tech: string[] = [];
  const generator = ($('meta[name="generator"]').attr('content') ?? '').toLowerCase();
  if (/wix\.com|wixstatic|wixsite/.test(lower) || generator.includes('wix')) tech.push('Wix');
  if (/wp-content|wp-includes/.test(lower) || generator.includes('wordpress')) tech.push('WordPress');
  if (/joomla/.test(generator) || /\/media\/jui\//.test(lower)) tech.push('Joomla');
  if (/squarespace/.test(lower)) tech.push('Squarespace');
  if (/jimdo/.test(lower)) tech.push('Jimdo');
  if (/webnode/.test(lower)) tech.push('Webnode');
  if (/one\.com|1and1|ionos.*site/.test(lower) && /mywebsite|sitebuilder/.test(lower)) tech.push('IONOS MyWebsite');
  const jq = lower.match(/jquery[-.]?(1|2)\.(\d+)/);
  if (jq) tech.push(`jQuery ${jq[1]}.x`);
  if (/<frameset|<frame /.test(lower)) tech.push('frames');
  if (/\.swf\b|shockwave-flash/.test(lower)) tech.push('Flash');
  if (/<table[^>]*(width|cellpadding)/.test(lower) && !$('meta[name="viewport"]').length) tech.push('table layout');
  return tech;
}

function detectNativeBooking($: cheerio.CheerioAPI, text: string): boolean {
  const interactive = $('a[href], button, input[type="submit"], [role="button"]')
    .map((_, el) => $(el).text().replace(/\s+/g, ' ').trim())
    .get()
    .join(' | ');
  const hasBookingCta = BOOKING_WORDS.test(interactive);
  const hasDateInput = $('input[type="date"], input[type="time"], select[name*="hora"], select[name*="time"], [class*="calendar"], [class*="datepicker"], [id*="booking"], [id*="reserva"]').length > 0;
  return hasBookingCta || hasDateInput || BOOKING_WORDS.test(text) && $('form').length > 0;
}

function detectCopyrightYear(text: string): number | null {
  const matches = [...text.matchAll(/(?:©|&copy;|copyright|\(c\))\s*(?:\d{4}\s*[-–]\s*)?(\d{4})/gi)];
  if (!matches.length) return null;
  return Math.max(...matches.map((m) => Number(m[1])));
}

function detectSocial($: cheerio.CheerioAPI): string[] {
  const nets: Record<string, RegExp> = {
    Instagram: /instagram\.com/i,
    Facebook: /facebook\.com/i,
    TikTok: /tiktok\.com/i,
    'Google Business': /g\.page|business\.google|maps\.app\.goo\.gl|google\.[a-z.]+\/maps\/place/i,
    TripAdvisor: /tripadvisor/i,
  };
  const hrefs = $('a[href]').map((_, el) => $(el).attr('href') ?? '').get().join('\n');
  return Object.entries(nets)
    .filter(([, re]) => re.test(hrefs))
    .map(([n]) => n);
}

function countHttpResources($: cheerio.CheerioAPI): number {
  return $('img[src^="http://"], script[src^="http://"], link[href^="http://"], iframe[src^="http://"]').length;
}
