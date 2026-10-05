import { useMemo, useState } from 'preact/hooks';
import {
  formatDateLong,
  formatDateShort,
  persistRecord,
  referenceCode,
  slotsForDate,
  toISODate,
  upcomingDates,
  type OpeningHours,
} from '../booking/slots';

export interface BookingService {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
}

export interface BookingStaff {
  id: string;
  name: string;
  role: string;
}

export interface BookingLabels {
  stepService: string;
  stepStaff: string;
  stepWhen: string;
  stepDetails: string;
  anyStaff: string;
  guests: string;
  guestSingular: string;
  guestPlural: string;
  name: string;
  phone: string;
  notes: string;
  notesPlaceholder: string;
  back: string;
  next: string;
  confirm: string;
  cardGuarantee: string;
  reminder: string;
  noSlots: string;
  minutesShort: string;
  successTitle: string;
  successBody: string;
  whatsappPreview: string;
  newBooking: string;
  demoNote: string;
  errorName: string;
  errorPhone: string;
  /** Sólo modo "experience": sufijo del precio ("per persona") */
  perPerson?: string;
  /** Sólo modo "experience": etiqueta del total */
  total?: string;
  /** Sólo si se pasan `visitLanguages`: etiqueta del selector */
  visitLanguage?: string;
}

export interface VisitLanguage {
  id: string;
  label: string;
}

export interface BookingWidgetProps {
  /**
   * table: mesa (comensales + hora) · appointment: servicio + profesional + hora ·
   * experience: actividad con precio por persona (actividad + personas + hora), p. ej. visita a un celler
   */
  mode: 'table' | 'appointment' | 'experience';
  brand: string;
  locale: string;
  labels: BookingLabels;
  hours: OpeningHours;
  slotMinutes: number;
  services?: BookingService[];
  staff?: BookingStaff[];
  maxGuests?: number;
  /** Importe a partir del cual se pide garantía con tarjeta (sólo demo) */
  guaranteeFrom?: number;
  /** Idiomas en los que se ofrece la actividad (modo experience) */
  visitLanguages?: VisitLanguage[];
}

const REF_PREFIX: Record<BookingWidgetProps['mode'], string> = { table: 'R', appointment: 'C', experience: 'V' };

type Step = 'service' | 'staff' | 'when' | 'details' | 'done';

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
}

export default function BookingWidget(props: BookingWidgetProps) {
  const { mode, labels, hours, slotMinutes, locale, brand } = props;
  const services = props.services ?? [];
  const staff = props.staff ?? [];
  const money = (value: number) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', minimumFractionDigits: value % 1 === 0 ? 0 : 2 }).format(value);
  const visitLanguages = props.visitLanguages ?? [];
  const hasGuests = mode !== 'appointment';
  const steps: Step[] = useMemo(() => {
    const list: Step[] = [];
    if (mode !== 'table' && services.length) list.push('service');
    if (mode === 'appointment' && staff.length) list.push('staff');
    list.push('when', 'details');
    return list;
  }, [mode, services.length, staff.length]);

  const [stepIndex, setStepIndex] = useState(0);
  const [serviceId, setServiceId] = useState(services[0]?.id ?? '');
  const [staffId, setStaffId] = useState('any');
  const [guests, setGuests] = useState(2);
  const [visitLang, setVisitLang] = useState(visitLanguages[0]?.id ?? '');
  const dates = useMemo(() => upcomingDates(14, hours), [hours]);
  const [dateISO, setDateISO] = useState(() => toISODate(dates[0] ?? new Date()));
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [reference, setReference] = useState('');

  const step: Step = reference ? 'done' : steps[stepIndex];
  const selectedDate = dates.find((d) => toISODate(d) === dateISO) ?? dates[0];
  const service = services.find((s) => s.id === serviceId);
  const selectedStaff = staff.find((s) => s.id === staffId);
  const slots = useMemo(
    () => slotsForDate(selectedDate, hours, slotMinutes, mode === 'table' ? 0.4 : 0.3, `${serviceId}|${staffId}`),
    [selectedDate, hours, slotMinutes, mode, serviceId, staffId],
  );
  const totalPrice = service ? service.price * (mode === 'experience' ? guests : 1) : 0;
  const needsGuarantee =
    mode === 'table' ? guests >= 6 : props.guaranteeFrom !== undefined && !!service && totalPrice >= props.guaranteeFrom;

  const canContinue =
    step === 'when' ? !!time : step === 'service' ? !!serviceId : true;

  function next() {
    if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1);
  }
  function back() {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  }

  function confirm(e: Event) {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (name.trim().length < 2) nextErrors.name = labels.errorName;
    if (!/^[+\d][\d\s]{7,}$/.test(phone.trim())) nextErrors.phone = labels.errorPhone;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const ref = referenceCode(REF_PREFIX[mode]);
    persistRecord({ type: mode, ref, brand, date: dateISO, time, guests, serviceId, staffId, visitLang, name, phone, notes });
    setReference(ref);
  }

  function reset() {
    setReference('');
    setStepIndex(0);
    setTime('');
    setName('');
    setPhone('');
    setNotes('');
    setErrors({});
  }

  const dateLong = formatDateLong(selectedDate, locale);
  const guestsText = `${guests} ${guests === 1 ? labels.guestSingular : labels.guestPlural}`;
  const detailText =
    mode === 'table' ? guestsText : mode === 'experience' ? `${service?.name ?? ''} · ${guestsText}` : service?.name;
  const summaryParts = [
    detailText,
    selectedStaff && staffId !== 'any' ? selectedStaff.name : undefined,
    dateLong,
    time,
    mode === 'experience' && visitLang ? visitLanguages.find((l) => l.id === visitLang)?.label : undefined,
  ].filter(Boolean);

  return (
    <div class="card overflow-hidden">
      {step !== 'done' && (
        <ol class="flex items-center gap-2 border-b border-line px-5 py-3 text-xs text-muted" aria-label="Steps">
          {steps.map((s, i) => (
            <li key={s} class={`flex items-center gap-2 ${i === stepIndex ? 'text-ink' : ''}`}>
              <span
                class={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold ${
                  i <= stepIndex ? 'bg-accent text-white' : 'bg-ink/10 text-muted'
                }`}
              >
                {i + 1}
              </span>
              <span class="hidden sm:inline">
                {s === 'service'
                  ? labels.stepService
                  : s === 'staff'
                    ? labels.stepStaff
                    : s === 'when'
                      ? labels.stepWhen
                      : labels.stepDetails}
              </span>
              {i < steps.length - 1 && <span aria-hidden="true" class="mx-1 h-px w-4 bg-line" />}
            </li>
          ))}
        </ol>
      )}

      <div class="p-5 sm:p-6">
        {step === 'service' && (
          <div class="grid gap-2">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setServiceId(s.id)}
                aria-pressed={serviceId === s.id}
                class={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                  serviceId === s.id ? 'border-accent bg-accent-soft/50' : 'border-line hover:border-ink/40'
                }`}
              >
                <span>
                  <span class="block font-medium">{s.name}</span>
                  <span class="text-sm text-muted">
                    {s.durationMinutes} {labels.minutesShort}
                  </span>
                </span>
                <span class="text-right">
                  <span class="block font-semibold">{money(s.price)}</span>
                  {mode === 'experience' && labels.perPerson && <span class="text-xs text-muted">{labels.perPerson}</span>}
                </span>
              </button>
            ))}
          </div>
        )}

        {step === 'staff' && (
          <div class="grid gap-2 sm:grid-cols-2">
            {[{ id: 'any', name: labels.anyStaff, role: '' }, ...staff].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStaffId(s.id)}
                aria-pressed={staffId === s.id}
                class={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                  staffId === s.id ? 'border-accent bg-accent-soft/50' : 'border-line hover:border-ink/40'
                }`}
              >
                <span
                  aria-hidden="true"
                  class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/10 font-display text-base"
                >
                  {s.id === 'any' ? '•' : s.name.charAt(0)}
                </span>
                <span>
                  <span class="block font-medium">{s.name}</span>
                  {s.role && <span class="text-sm text-muted">{s.role}</span>}
                </span>
              </button>
            ))}
          </div>
        )}

        {step === 'when' && (
          <div class="grid gap-5">
            {hasGuests && (
              <div>
                <span class="label">{labels.guests}</span>
                <div class="flex flex-wrap gap-2">
                  {Array.from({ length: props.maxGuests ?? 8 }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setGuests(n)}
                      aria-pressed={guests === n}
                      class={`h-10 w-10 rounded-full border text-sm font-medium ${
                        guests === n ? 'border-accent bg-accent text-white' : 'border-line hover:border-ink/40'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <span class="label">{labels.stepWhen}</span>
              <div class="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2">
                {dates.map((d) => {
                  const iso = toISODate(d);
                  const f = formatDateShort(d, locale);
                  const active = iso === dateISO;
                  return (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => {
                        setDateISO(iso);
                        setTime('');
                      }}
                      aria-pressed={active}
                      class={`flex min-w-[4.25rem] snap-start flex-col items-center rounded-xl border px-2 py-2 text-xs ${
                        active ? 'border-accent bg-accent text-white' : 'border-line hover:border-ink/40'
                      }`}
                    >
                      <span class="uppercase opacity-80">{f.weekday}</span>
                      <span class="text-lg font-semibold leading-tight">{f.day}</span>
                      <span class="opacity-80">{f.month}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div class="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {slots.map((s) => (
                  <button
                    key={s.time}
                    type="button"
                    disabled={!s.available}
                    onClick={() => setTime(s.time)}
                    aria-pressed={time === s.time}
                    class={`rounded-lg border py-2 text-sm tabular-nums ${
                      time === s.time
                        ? 'border-accent bg-accent text-white'
                        : s.available
                          ? 'border-line hover:border-ink/40'
                          : 'cursor-not-allowed border-transparent bg-ink/5 text-muted/50 line-through'
                    }`}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
              {slots.every((s) => !s.available) && <p class="mt-3 text-sm text-muted">{labels.noSlots}</p>}
            </div>
          </div>
        )}

        {step === 'details' && (
          <form class="grid gap-4" onSubmit={confirm} noValidate>
            <p class="flex flex-wrap items-baseline justify-between gap-2 rounded-xl bg-paper px-4 py-3 text-sm">
              <strong class="font-semibold">{summaryParts.join(' · ')}</strong>
              {mode === 'experience' && service && (
                <span class="text-muted">
                  {labels.total ? `${labels.total}: ` : ''}
                  <strong class="font-semibold text-ink">{money(totalPrice)}</strong>
                </span>
              )}
            </p>
            {visitLanguages.length > 0 && (
              <div>
                <span class="label">{labels.visitLanguage}</span>
                <div class="flex flex-wrap gap-2">
                  {visitLanguages.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setVisitLang(l.id)}
                      aria-pressed={visitLang === l.id}
                      class={`rounded-full border px-3 py-1.5 text-sm ${
                        visitLang === l.id ? 'border-accent bg-accent text-white' : 'border-line hover:border-ink/40'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="label" for="bk-name">
                  {labels.name}
                </label>
                <input
                  id="bk-name"
                  class="field"
                  value={name}
                  onInput={(e) => setName((e.target as HTMLInputElement).value)}
                  autocomplete="name"
                  required
                />
                {errors.name && <p class="mt-1 text-xs text-accent">{errors.name}</p>}
              </div>
              <div>
                <label class="label" for="bk-phone">
                  {labels.phone}
                </label>
                <input
                  id="bk-phone"
                  class="field"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
                  autocomplete="tel"
                  placeholder="+34 6__ ___ ___"
                  required
                />
                {errors.phone && <p class="mt-1 text-xs text-accent">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <label class="label" for="bk-notes">
                {labels.notes}
              </label>
              <textarea
                id="bk-notes"
                class="field min-h-20"
                value={notes}
                onInput={(e) => setNotes((e.target as HTMLTextAreaElement).value)}
                placeholder={labels.notesPlaceholder}
              />
            </div>
            {needsGuarantee && (
              <p class="flex items-start gap-2 rounded-xl border border-line px-4 py-3 text-sm text-muted">
                <span aria-hidden="true" class="mt-0.5 inline-block h-4 w-6 rounded-sm border border-ink/30" />
                <span>{labels.cardGuarantee}</span>
              </p>
            )}
            <p class="text-xs text-muted">{labels.reminder}</p>
            <div class="flex items-center justify-between gap-3 pt-1">
              <button type="button" class="btn-ghost" onClick={back}>
                {labels.back}
              </button>
              <button type="submit" class="btn-primary">
                {labels.confirm}
              </button>
            </div>
          </form>
        )}

        {step === 'done' && (
          <div class="grid gap-5">
            <div>
              <p class="eyebrow">{reference}</p>
              <h3 class="mt-1 font-display text-2xl">{labels.successTitle}</h3>
              <p class="mt-2 text-muted">{fill(labels.successBody, { brand })}</p>
            </div>
            <div class="max-w-sm rounded-2xl rounded-tl-sm bg-[#e7ffdb] px-4 py-3 text-sm text-ink">
              <p class="whitespace-pre-line">
                {fill(labels.whatsappPreview, {
                  name: name.split(' ')[0],
                  brand,
                  date: dateLong,
                  time,
                  detail: summaryParts[0] ?? '',
                  ref: reference,
                })}
              </p>
              <p class="mt-1 text-right text-[10px] text-muted">
                {new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(new Date())}
              </p>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-xs text-muted">{labels.demoNote}</p>
              <button type="button" class="btn-secondary" onClick={reset}>
                {labels.newBooking}
              </button>
            </div>
          </div>
        )}

        {step !== 'details' && step !== 'done' && (
          <div class="mt-5 flex items-center justify-between gap-3">
            <button type="button" class="btn-ghost" onClick={back} disabled={stepIndex === 0}>
              {labels.back}
            </button>
            <button type="button" class="btn-primary" onClick={next} disabled={!canContinue}>
              {labels.next}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
