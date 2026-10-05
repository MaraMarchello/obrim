import type { Lang } from '@obrim/ui/i18n';
import type { MenuCategory, MenuItem } from '@obrim/ui/components/OrderWidget';

type Text = Record<Lang, string>;

interface RawItem {
  id: string;
  category: 'entrants' | 'principals' | 'postres' | 'begudes';
  name: Text;
  description: Text;
  price: number;
  allergens: string[];
  takeaway?: boolean;
}

const CATEGORIES: { id: RawItem['category']; name: Text }[] = [
  { id: 'entrants', name: { ca: 'Entrants', es: 'Entrantes', en: 'Starters' } },
  { id: 'principals', name: { ca: 'Principals', es: 'Principales', en: 'Mains' } },
  { id: 'postres', name: { ca: 'Postres', es: 'Postres', en: 'Desserts' } },
  { id: 'begudes', name: { ca: 'Begudes', es: 'Bebidas', en: 'Drinks' } },
];

const ITEMS: RawItem[] = [
  {
    id: 'pa-tomaquet',
    category: 'entrants',
    name: { ca: 'Pa amb tomàquet i anxoves de l’Escala', es: 'Pan con tomate y anchoas de l’Escala', en: 'Tomato bread with l’Escala anchovies' },
    description: { ca: 'Pa de pagès torrat, tomàquet de penjar, oli d’arbequina.', es: 'Pan de payés tostado, tomate de colgar, aceite de arbequina.', en: 'Toasted country bread, hanging tomato, arbequina olive oil.' },
    price: 7.5,
    allergens: ['G', 'P'],
  },
  {
    id: 'escalivada',
    category: 'entrants',
    name: { ca: 'Escalivada amb romesco', es: 'Escalivada con romesco', en: 'Roasted vegetables with romesco' },
    description: { ca: 'Albergínia, pebrot i ceba a la brasa. Salsa romesco de la casa.', es: 'Berenjena, pimiento y cebolla a la brasa. Romesco de la casa.', en: 'Grilled aubergine, pepper and onion. House romesco sauce.' },
    price: 9,
    allergens: ['F'],
  },
  {
    id: 'croquetes',
    category: 'entrants',
    name: { ca: 'Croquetes de rostit (6 u.)', es: 'Croquetas de asado (6 u.)', en: 'Roast meat croquettes (6 pcs)' },
    description: { ca: 'Fetes cada matí amb el rostit del dia.', es: 'Hechas cada mañana con el asado del día.', en: 'Made each morning with the roast of the day.' },
    price: 8.5,
    allergens: ['G', 'L', 'O'],
  },
  {
    id: 'esqueixada',
    category: 'entrants',
    name: { ca: 'Esqueixada de bacallà', es: 'Esqueixada de bacalao', en: 'Salt cod salad (esqueixada)' },
    description: { ca: 'Bacallà esqueixat, tomàquet, ceba tendra, olives arbequines.', es: 'Bacalao desmigado, tomate, cebolla tierna, aceitunas arbequinas.', en: 'Shredded salt cod, tomato, spring onion, arbequina olives.' },
    price: 11,
    allergens: ['P'],
  },
  {
    id: 'fricando',
    category: 'principals',
    name: { ca: 'Fricandó amb moixernons', es: 'Fricandó con moixernons', en: 'Veal fricandó with moixernons mushrooms' },
    description: { ca: 'Vedella guisada a foc lent, moixernons del Berguedà.', es: 'Ternera guisada a fuego lento, setas moixernons del Berguedà.', en: 'Slow-braised veal with Berguedà mushrooms.' },
    price: 16.5,
    allergens: ['G', 'SO2'],
  },
  {
    id: 'arros-senyoret',
    category: 'principals',
    name: { ca: 'Arròs del senyoret (mín. 2)', es: 'Arroz del senyoret (mín. 2)', en: 'Senyoret seafood rice (min. 2)' },
    description: { ca: 'Arròs de marisc pelat, brou de peix de roca. Preu per persona.', es: 'Arroz de marisco pelado, caldo de pescado de roca. Precio por persona.', en: 'Peeled seafood rice, rockfish stock. Price per person.' },
    price: 19,
    allergens: ['P', 'M', 'C'],
    takeaway: false,
  },
  {
    id: 'botifarra',
    category: 'principals',
    name: { ca: 'Botifarra amb mongetes del ganxet', es: 'Butifarra con judías del ganxet', en: 'Catalan sausage with ganxet beans' },
    description: { ca: 'Botifarra de Can Puig a la brasa, mongetes saltades amb all.', es: 'Butifarra de Can Puig a la brasa, judías salteadas con ajo.', en: 'Grilled Can Puig sausage, beans sautéed with garlic.' },
    price: 14,
    allergens: ['SO2'],
  },
  {
    id: 'bacalla-llauna',
    category: 'principals',
    name: { ca: 'Bacallà a la llauna', es: 'Bacalao a la llauna', en: 'Salt cod "a la llauna"' },
    description: { ca: 'Al forn amb all, pebre vermell i vi blanc. Amb mongetes.', es: 'Al horno con ajo, pimentón y vino blanco. Con judías.', en: 'Oven-baked with garlic, paprika and white wine. With beans.' },
    price: 17.5,
    allergens: ['P', 'SO2'],
  },
  {
    id: 'crema-catalana',
    category: 'postres',
    name: { ca: 'Crema catalana', es: 'Crema catalana', en: 'Crema catalana' },
    description: { ca: 'Cremada al moment.', es: 'Quemada al momento.', en: 'Caramelised to order.' },
    price: 5.5,
    allergens: ['L', 'O'],
  },
  {
    id: 'mel-mato',
    category: 'postres',
    name: { ca: 'Mel i mató', es: 'Mel i mató', en: 'Fresh cheese with honey (mel i mató)' },
    description: { ca: 'Mató de Montserrat, mel de romaní, nous.', es: 'Mató de Montserrat, miel de romero, nueces.', en: 'Montserrat fresh cheese, rosemary honey, walnuts.' },
    price: 5.5,
    allergens: ['L', 'F'],
  },
  {
    id: 'vermut',
    category: 'begudes',
    name: { ca: 'Vermut de Reus amb sifó', es: 'Vermut de Reus con sifón', en: 'Reus vermouth with soda' },
    description: { ca: 'Oliva i patates incloses.', es: 'Aceituna y patatas incluidas.', en: 'Olive and crisps included.' },
    price: 3.5,
    allergens: ['SO2'],
    takeaway: false,
  },
  {
    id: 'vi-casa',
    category: 'begudes',
    name: { ca: 'Vi de la casa (ampolla)', es: 'Vino de la casa (botella)', en: 'House wine (bottle)' },
    description: { ca: 'Negre del Penedès, celler familiar.', es: 'Tinto del Penedès, bodega familiar.', en: 'Penedès red from a family winery.' },
    price: 14,
    allergens: ['SO2'],
  },
  {
    id: 'aigua',
    category: 'begudes',
    name: { ca: 'Aigua mineral 1 l', es: 'Agua mineral 1 l', en: 'Mineral water 1 l' },
    description: { ca: 'Amb gas o sense.', es: 'Con gas o sin.', en: 'Still or sparkling.' },
    price: 2.5,
    allergens: [],
  },
];

const ALLERGENS: Record<string, Text> = {
  G: { ca: 'Gluten', es: 'Gluten', en: 'Gluten' },
  L: { ca: 'Lactis', es: 'Lácteos', en: 'Dairy' },
  O: { ca: 'Ou', es: 'Huevo', en: 'Egg' },
  P: { ca: 'Peix', es: 'Pescado', en: 'Fish' },
  M: { ca: 'Mol·luscs', es: 'Moluscos', en: 'Molluscs' },
  C: { ca: 'Crustacis', es: 'Crustáceos', en: 'Crustaceans' },
  F: { ca: 'Fruits secs', es: 'Frutos secos', en: 'Nuts' },
  S: { ca: 'Soja', es: 'Soja', en: 'Soy' },
  SO2: { ca: 'Sulfits', es: 'Sulfitos', en: 'Sulphites' },
};

export function menuFor(lang: Lang): { categories: MenuCategory[]; items: MenuItem[]; allergenNames: Record<string, string> } {
  return {
    categories: CATEGORIES.map((c) => ({ id: c.id, name: c.name[lang] })),
    items: ITEMS.map((i) => ({
      id: i.id,
      category: i.category,
      name: i.name[lang],
      description: i.description[lang],
      price: i.price,
      allergens: i.allergens,
      takeaway: i.takeaway,
    })),
    allergenNames: Object.fromEntries(Object.entries(ALLERGENS).map(([k, v]) => [k, v[lang]])),
  };
}
