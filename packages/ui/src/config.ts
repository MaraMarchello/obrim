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
    city: 'Barcelona',
  },
  demos: {
    restaurant: import.meta.env?.PUBLIC_DEMO_RESTAURANT_URL ?? 'https://restaurant.obrim.cat',
    salon: import.meta.env?.PUBLIC_DEMO_SALON_URL ?? 'https://salo.obrim.cat',
  },
} as const;

export function whatsappLink(text: string, number: string = CONTACT.whatsappNumber): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
