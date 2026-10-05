/**
 * Generación de fechas y franjas horarias para las demos.
 * La "ocupación" es pseudoaleatoria pero determinista por fecha, para que la demo
 * parezca real y se comporte igual en cada visita.
 */

export interface OpeningHours {
  /** "13:00" */
  start: string;
  /** "23:00" */
  end: string;
  /** 0 = domingo … 6 = sábado */
  closedDays: number[];
  /** Franjas partidas (p. ej. comida y cena). Si se indica, sustituye a start/end. */
  ranges?: { start: string; end: string }[];
}

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function upcomingDates(days: number, hours: OpeningHours, from = new Date()): Date[] {
  const out: Date[] = [];
  const cursor = new Date(from);
  cursor.setHours(0, 0, 0, 0);
  while (out.length < days) {
    if (!hours.closedDays.includes(cursor.getDay())) out.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

function minutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function hhmm(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface Slot {
  time: string;
  available: boolean;
}

/**
 * Franjas entre apertura y cierre. `occupancy` (0–1) controla la proporción de huecos ocupados.
 * `seed` permite que la ocupación varíe por servicio/profesional.
 */
export function slotsForDate(
  date: Date,
  hours: OpeningHours,
  stepMinutes: number,
  occupancy = 0.35,
  seed = '',
): Slot[] {
  const iso = toISODate(date);
  const now = new Date();
  const isToday = toISODate(now) === iso;
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const ranges = hours.ranges ?? [{ start: hours.start, end: hours.end }];
  const slots: Slot[] = [];
  for (const range of ranges) {
    const start = minutes(range.start);
    const end = minutes(range.end);
    for (let t = start; t + stepMinutes <= end; t += stepMinutes) {
      const h = hash(`${iso}|${t}|${seed}`);
      const busy = (h % 1000) / 1000 < occupancy;
      const past = isToday && t <= nowMin + 30;
      slots.push({ time: hhmm(t), available: !busy && !past });
    }
  }
  return slots;
}

export function referenceCode(prefix: string): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `${prefix}-${code}`;
}

export function formatDateLong(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
}

export function formatDateShort(date: Date, locale: string): { weekday: string; day: string; month: string } {
  return {
    weekday: new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date).replace('.', ''),
    day: new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date),
    month: new Intl.DateTimeFormat(locale, { month: 'short' }).format(date).replace('.', ''),
  };
}

const STORAGE_KEY = 'obrim-demo-records';

export function persistRecord(record: Record<string, unknown>): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as unknown[];
    existing.push({ ...record, createdAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(-50)));
  } catch {
    /* demo: ignorar errores de almacenamiento */
  }
}
