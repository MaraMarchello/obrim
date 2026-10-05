import type { FetchResult } from './types';

const MOBILE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1 ObrimAudit/0.1';

export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `http://${trimmed}`;
}

/**
 * Descarga la página como lo haría un móvil, midiendo TTFB y tiempo total.
 * Se parte de http:// para comprobar si el sitio redirige a https.
 */
export async function fetchPage(url: string, timeoutMs = 20000): Promise<FetchResult> {
  const requestedUrl = normalizeUrl(url);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = performance.now();
  try {
    const response = await fetch(requestedUrl, {
      headers: { 'user-agent': MOBILE_UA, accept: 'text/html,application/xhtml+xml', 'accept-language': 'ca,es;q=0.9,en;q=0.8' },
      redirect: 'follow',
      signal: controller.signal,
    });
    const ttfbMs = Math.round(performance.now() - started);
    const html = await response.text();
    const totalMs = Math.round(performance.now() - started);
    const headers: Record<string, string> = {};
    response.headers.forEach((v, k) => (headers[k] = v));
    return {
      requestedUrl,
      finalUrl: response.url || requestedUrl,
      status: response.status,
      redirectedToHttps: (response.url || requestedUrl).startsWith('https://'),
      ttfbMs,
      totalMs,
      bytes: Buffer.byteLength(html, 'utf8'),
      html,
      headers,
    };
  } catch (err) {
    return {
      requestedUrl,
      finalUrl: requestedUrl,
      status: 0,
      redirectedToHttps: false,
      ttfbMs: 0,
      totalMs: Math.round(performance.now() - started),
      bytes: 0,
      html: '',
      headers: {},
      error: err instanceof Error ? err.message : String(err),
    };
  } finally {
    clearTimeout(timer);
  }
}
