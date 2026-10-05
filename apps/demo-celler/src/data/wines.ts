import type { MenuCategory, MenuItem } from '@obrim/ui/components/OrderWidget';
import type { Lang } from '@obrim/ui/i18n';

interface WineDef {
  id: string;
  category: 'blancs' | 'negres' | 'caves' | 'packs';
  price: number;
  name: string;
  description: Record<Lang, string>;
}

/** Catálogo de la tienda. Todos los vinos llevan sulfitos (SO2). */
const WINES: WineDef[] = [
  { id: 'xarello', category: 'blancs', price: 11.5, name: 'Xarel·lo del Serral 2024', description: { ca: 'Xarel·lo 100 %. Fresc, fonoll i poma verda. DO Penedès ecològic.', es: 'Xarel·lo 100 %. Fresco, hinojo y manzana verde. DO Penedès ecológico.', en: '100% xarel·lo. Fresh, fennel and green apple. Organic DO Penedès.' } },
  { id: 'macabeu', category: 'blancs', price: 13, name: 'Macabeu Vinyes Velles 2023', description: { ca: 'Vinyes de 60 anys, criança de 6 mesos sobre mares. Fruita blanca i avellana.', es: 'Viñas de 60 años, crianza de 6 meses sobre lías. Fruta blanca y avellana.', en: '60-year-old vines, 6 months on lees. White fruit and hazelnut.' } },
  { id: 'ull-de-llebre', category: 'negres', price: 12, name: 'Ull de Llebre 2023', description: { ca: 'Vi negre jove, cirera i herbes de la vinya. Per a cada dia.', es: 'Tinto joven, cereza y hierbas del viñedo. Para cada día.', en: 'Young red, cherry and vineyard herbs. An everyday wine.' } },
  { id: 'sumoll', category: 'negres', price: 19, name: 'Sumoll de la Riera 2022', description: { ca: 'Varietat recuperada del Penedès. Lleuger, àcid, de muntanya. 12 mesos en bóta usada.', es: 'Variedad recuperada del Penedès. Ligero, ácido, de montaña. 12 meses en barrica usada.', en: 'A recovered Penedès variety. Light, bright, mountain-style. 12 months in used oak.' } },
  { id: 'brut-nature', category: 'caves', price: 14.5, name: 'Brut Nature Reserva', description: { ca: 'Xarel·lo, macabeu i parellada. 24 mesos de criança. Sense sucre afegit.', es: 'Xarel·lo, macabeo y parellada. 24 meses de crianza. Sin azúcar añadido.', en: 'Xarel·lo, macabeu and parellada. 24 months ageing. No added sugar.' } },
  { id: 'gran-reserva', category: 'caves', price: 24, name: 'Gran Reserva 2019', description: { ca: '48 mesos en rima. Brioix, fruita seca i bombolla fina.', es: '48 meses en rima. Brioche, fruta seca y burbuja fina.', en: '48 months on lees. Brioche, dried fruit and a fine bead.' } },
  { id: 'pack-descoberta', category: 'packs', price: 58, name: 'Pack descoberta (6 ampolles)', description: { ca: 'Una ampolla de cada vi del celler, amb fitxes de tast. Ideal per regalar.', es: 'Una botella de cada vino de la bodega, con fichas de cata. Ideal para regalar.', en: 'One bottle of every estate wine, with tasting notes. A great gift.' } },
];

const CATEGORY_NAMES: Record<WineDef['category'], Record<Lang, string>> = {
  blancs: { ca: 'Blancs', es: 'Blancos', en: 'Whites' },
  negres: { ca: 'Negres', es: 'Tintos', en: 'Reds' },
  caves: { ca: 'Caves', es: 'Cavas', en: 'Cavas' },
  packs: { ca: 'Packs i regals', es: 'Packs y regalos', en: 'Packs and gifts' },
};

export function shopFor(lang: Lang): { categories: MenuCategory[]; items: MenuItem[]; allergenNames: Record<string, string> } {
  const categories = (Object.keys(CATEGORY_NAMES) as WineDef['category'][]).map((id) => ({ id, name: CATEGORY_NAMES[id][lang] }));
  const items: MenuItem[] = WINES.map((w) => ({
    id: w.id,
    category: w.category,
    name: w.name,
    description: w.description[lang],
    price: w.price,
    allergens: ['SO2'],
  }));
  const allergenNames = { SO2: { ca: 'Sulfits', es: 'Sulfitos', en: 'Sulphites' }[lang] };
  return { categories, items, allergenNames };
}
