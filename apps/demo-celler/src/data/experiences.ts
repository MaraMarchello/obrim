import type { BookingService, VisitLanguage } from '@obrim/ui/components/BookingWidget';
import type { Lang } from '@obrim/ui/i18n';

interface ExperienceDef {
  id: string;
  durationMinutes: number;
  /** Precio por persona */
  price: number;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  highlights: Record<Lang, string[]>;
}

/** Actividades enoturísticas de la demo. Precios orientativos del Penedès (2025). */
export const EXPERIENCES: ExperienceDef[] = [
  {
    id: 'visita-tast',
    durationMinutes: 60,
    price: 18,
    name: { ca: 'Visita al celler i tast de 3 vins', es: 'Visita a la bodega y cata de 3 vinos', en: 'Winery tour and 3-wine tasting' },
    description: {
      ca: 'Recorregut per la sala de bótes i la cava, i tast de tres vins de la casa amb un petit maridatge de formatge del Penedès.',
      es: 'Recorrido por la sala de barricas y la cava, y cata de tres vinos de la casa con un pequeño maridaje de queso del Penedès.',
      en: 'Tour of the barrel room and the cava cellar, then a tasting of three estate wines with a small Penedès cheese pairing.',
    },
    highlights: { ca: ['3 vins', 'Formatge local', 'ca · es · en'], es: ['3 vinos', 'Queso local', 'ca · es · en'], en: ['3 wines', 'Local cheese', 'ca · es · en'] },
  },
  {
    id: 'vinyes-tast',
    durationMinutes: 120,
    price: 32,
    name: { ca: 'Passeig per les vinyes i tast de 5 vins', es: 'Paseo por los viñedos y cata de 5 vinos', en: 'Vineyard walk and 5-wine tasting' },
    description: {
      ca: 'Caminada suau entre les vinyes de xarel·lo i macabeu, explicació de la viticultura ecològica i tast de cinc vins amb embotits de la comarca.',
      es: 'Paseo suave entre los viñedos de xarel·lo y macabeo, explicación de la viticultura ecológica y cata de cinco vinos con embutidos de la comarca.',
      en: 'Gentle walk through the xarel·lo and macabeu vineyards, an introduction to organic viticulture and a tasting of five wines with local charcuterie.',
    },
    highlights: { ca: ['5 vins', 'Vinyes ecològiques', 'Embotits'], es: ['5 vinos', 'Viñedos ecológicos', 'Embutidos'], en: ['5 wines', 'Organic vineyards', 'Charcuterie'] },
  },
  {
    id: 'esmorzar',
    durationMinutes: 150,
    price: 45,
    name: { ca: 'Esmorzar de pagès entre vinyes', es: 'Desayuno de payés entre viñedos', en: 'Farmhouse breakfast among the vines' },
    description: {
      ca: 'Esmorzar de forquilla a la vinya del Serral (pa amb tomàquet, truita, embotits, coca) amb els nostres vins i caves. Caps de setmana i festius.',
      es: 'Desayuno de tenedor en la viña del Serral (pan con tomate, tortilla, embutidos, coca) con nuestros vinos y cavas. Fines de semana y festivos.',
      en: 'Hearty breakfast in the Serral vineyard (tomato bread, omelette, charcuterie, coca) with our wines and cavas. Weekends and holidays.',
    },
    highlights: { ca: ['Esmorzar complet', 'Vins i caves', 'Cap de setmana'], es: ['Desayuno completo', 'Vinos y cavas', 'Fin de semana'], en: ['Full breakfast', 'Wines and cavas', 'Weekends'] },
  },
  {
    id: 'privat',
    durationMinutes: 90,
    price: 60,
    name: { ca: 'Tast privat amb l’enòloga', es: 'Cata privada con la enóloga', en: 'Private tasting with the winemaker' },
    description: {
      ca: 'Sessió privada per al vostre grup amb la Mireia, enòloga de la casa: sis vins, dues anyades del mateix vi i la història del celler.',
      es: 'Sesión privada para vuestro grupo con Mireia, enóloga de la casa: seis vinos, dos añadas del mismo vino y la historia de la bodega.',
      en: 'Private session for your group with Mireia, our winemaker: six wines, two vintages of the same wine and the story of the estate.',
    },
    highlights: { ca: ['6 vins', 'Verticals', 'Grup privat'], es: ['6 vinos', 'Verticales', 'Grupo privado'], en: ['6 wines', 'Vertical tasting', 'Private group'] },
  },
];

export interface Experience extends BookingService {
  description: string;
  highlights: string[];
}

export function experiencesFor(lang: Lang): Experience[] {
  return EXPERIENCES.map((e) => ({
    id: e.id,
    name: e.name[lang],
    durationMinutes: e.durationMinutes,
    price: e.price,
    description: e.description[lang],
    highlights: e.highlights[lang],
  }));
}

export function visitLanguagesFor(lang: Lang): VisitLanguage[] {
  const labels: Record<Lang, Record<string, string>> = {
    ca: { ca: 'Català', es: 'Castellà', en: 'Anglès' },
    es: { ca: 'Catalán', es: 'Castellano', en: 'Inglés' },
    en: { ca: 'Catalan', es: 'Spanish', en: 'English' },
  };
  // El idioma de la página va primero
  const order = [lang, ...(['ca', 'es', 'en'] as Lang[]).filter((l) => l !== lang)];
  return order.map((id) => ({ id, label: labels[lang][id] }));
}
