export type LegalKey = 'notice' | 'privacy' | 'cookies';

/** slug de URL → clave del diccionario */
export const LEGAL_SLUGS: Record<string, LegalKey> = {
  'avis-legal': 'notice',
  privacitat: 'privacy',
  cookies: 'cookies',
};

export function legalStaticPaths() {
  return Object.entries(LEGAL_SLUGS).map(([page, key]) => ({ params: { page }, props: { key } }));
}
