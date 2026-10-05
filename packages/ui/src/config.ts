/**
 * Datos de contacto y enlaces de la marca.
 * TODO: sustituir los valores de ejemplo (teléfono, email, Instagram) por los reales antes de publicar.
 */
export const CONTACT = {
  brand: 'Obrim',
  domain: 'https://obrim.cat',
  /** Número en formato internacional sin "+" ni espacios — se usa en enlaces wa.me */
  whatsappNumber: '34600000000',
  phoneDisplay: '+34 600 000 000',
  email: 'hola@obrim.cat',
  instagram: 'obrim.cat',
  github: 'https://github.com/MaraMarchello',
  founder: {
    name: 'Marat Nurmukhametov',
    city: 'Pacs del Penedès',
  },
  /** Zona de actuación: se usa en textos legales y datos estructurados */
  area: {
    comarca: 'Alt Penedès',
    capital: 'Vilafranca del Penedès',
    base: 'Pacs del Penedès',
    postalCode: '08796',
    towns: ['Vilafranca del Penedès', 'Pacs del Penedès', 'Sant Sadurní d’Anoia', 'Santa Margarida i els Monjos', 'Gelida', 'Sant Martí Sarroca'],
  },
  demos: {
    restaurant: import.meta.env?.PUBLIC_DEMO_RESTAURANT_URL ?? 'https://restaurant.obrim.cat',
    salon: import.meta.env?.PUBLIC_DEMO_SALON_URL ?? 'https://salo.obrim.cat',
    celler: import.meta.env?.PUBLIC_DEMO_CELLER_URL ?? 'https://celler.obrim.cat',
  },
} as const;

export function whatsappLink(text: string, number: string = CONTACT.whatsappNumber): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
