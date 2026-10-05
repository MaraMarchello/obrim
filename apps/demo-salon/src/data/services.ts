import type { Lang } from '@obrim/ui/i18n';
import type { BookingService, BookingStaff } from '@obrim/ui/components/BookingWidget';

type Text = Record<Lang, string>;

interface RawService {
  id: string;
  group: 'cabell' | 'color' | 'estetica';
  name: Text;
  durationMinutes: number;
  price: number;
}

export const SERVICE_GROUPS: { id: RawService['group']; name: Text }[] = [
  { id: 'cabell', name: { ca: 'Cabell', es: 'Cabello', en: 'Hair' } },
  { id: 'color', name: { ca: 'Color', es: 'Color', en: 'Colour' } },
  { id: 'estetica', name: { ca: 'Estètica', es: 'Estética', en: 'Beauty' } },
];

const SERVICES: RawService[] = [
  { id: 'tall-dona', group: 'cabell', name: { ca: 'Tall i pentinat', es: 'Corte y peinado', en: 'Cut & style' }, durationMinutes: 45, price: 38 },
  { id: 'tall-home', group: 'cabell', name: { ca: 'Tall masculí', es: 'Corte masculino', en: 'Men’s cut' }, durationMinutes: 30, price: 22 },
  { id: 'barba', group: 'cabell', name: { ca: 'Arreglar la barba', es: 'Arreglo de barba', en: 'Beard trim' }, durationMinutes: 20, price: 14 },
  { id: 'color', group: 'color', name: { ca: 'Color arrel', es: 'Color raíz', en: 'Root colour' }, durationMinutes: 90, price: 65 },
  { id: 'metxes', group: 'color', name: { ca: 'Metxes balayage', es: 'Mechas balayage', en: 'Balayage highlights' }, durationMinutes: 150, price: 120 },
  { id: 'tractament', group: 'cabell', name: { ca: 'Tractament hidratant', es: 'Tratamiento hidratante', en: 'Hydrating treatment' }, durationMinutes: 30, price: 30 },
  { id: 'manicura', group: 'estetica', name: { ca: 'Manicura semipermanent', es: 'Manicura semipermanente', en: 'Gel manicure' }, durationMinutes: 45, price: 28 },
  { id: 'celles', group: 'estetica', name: { ca: 'Disseny de celles', es: 'Diseño de cejas', en: 'Brow shaping' }, durationMinutes: 20, price: 12 },
];

interface RawStaff {
  id: string;
  name: string;
  role: Text;
}

const STAFF: RawStaff[] = [
  { id: 'aran', name: 'Aran', role: { ca: 'Fundadora · colorista', es: 'Fundadora · colorista', en: 'Founder · colourist' } },
  { id: 'julia', name: 'Júlia', role: { ca: 'Estilista', es: 'Estilista', en: 'Stylist' } },
  { id: 'marc', name: 'Marc', role: { ca: 'Barber', es: 'Barbero', en: 'Barber' } },
  { id: 'noa', name: 'Noa', role: { ca: 'Estètica', es: 'Estética', en: 'Beauty' } },
];

export function servicesFor(lang: Lang): BookingService[] {
  return SERVICES.map((s) => ({ id: s.id, name: s.name[lang], durationMinutes: s.durationMinutes, price: s.price }));
}

export function servicesGrouped(lang: Lang): { group: string; services: BookingService[] }[] {
  return SERVICE_GROUPS.map((g) => ({
    group: g.name[lang],
    services: SERVICES.filter((s) => s.group === g.id).map((s) => ({
      id: s.id,
      name: s.name[lang],
      durationMinutes: s.durationMinutes,
      price: s.price,
    })),
  }));
}

export function staffFor(lang: Lang): BookingStaff[] {
  return STAFF.map((s) => ({ id: s.id, name: s.name, role: s.role[lang] }));
}
