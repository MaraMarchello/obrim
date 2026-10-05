import type { Lang } from '@obrim/ui/i18n';
import { ca, type Dictionary } from './ca';
import { es } from './es';
import { en } from './en';

const dictionaries: Record<Lang, Dictionary> = { ca, es, en };

export function useDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export type { Dictionary };
