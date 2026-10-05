import { useEffect, useMemo, useState } from 'preact/hooks';
import { persistRecord, referenceCode, slotsForDate, type OpeningHours } from '../booking/slots';

export interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  allergens: string[];
  /** true si se puede pedir para llevar; false = sólo en sala */
  takeaway?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
}

export interface OrderLabels {
  add: string;
  cart: string;
  emptyCart: string;
  items: string;
  total: string;
  checkout: string;
  pickupTime: string;
  name: string;
  phone: string;
  payment: string;
  payBizum: string;
  payCard: string;
  payOnPickup: string;
  placeOrder: string;
  close: string;
  successTitle: string;
  successBody: string;
  whatsappPreview: string;
  newOrder: string;
  allergensTitle: string;
  demoNote: string;
  dineInOnly: string;
  errorName: string;
  errorPhone: string;
}

export interface OrderWidgetProps {
  brand: string;
  locale: string;
  labels: OrderLabels;
  categories: MenuCategory[];
  items: MenuItem[];
  allergenNames: Record<string, string>;
  hours: OpeningHours;
  /** Separación de franjas de recogida en minutos */
  pickupStepMinutes?: number;
}

type CartLine = { id: string; qty: number };

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
}

const CART_KEY = 'obrim-demo-cart';

export default function OrderWidget(props: OrderWidgetProps) {
  const { labels, categories, items, locale, brand } = props;
  const money = (v: number) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(v);

  const [activeCat, setActiveCat] = useState(categories[0]?.id ?? '');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [pickup, setPickup] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState<'bizum' | 'card' | 'pickup'>('bizum');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [reference, setReference] = useState('');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]') as CartLine[];
      if (Array.isArray(saved)) setCart(saved.filter((l) => items.some((i) => i.id === l.id)));
    } catch {
      /* ignore */
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  const pickupSlots = useMemo(
    () => slotsForDate(new Date(), props.hours, props.pickupStepMinutes ?? 15, 0.15, 'pickup').filter((s) => s.available),
    [props.hours, props.pickupStepMinutes],
  );

  const lines = cart
    .map((l) => ({ ...l, item: items.find((i) => i.id === l.id)! }))
    .filter((l) => l.item);
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + l.qty * l.item.price, 0);

  function add(id: string) {
    setCart((c) => {
      const existing = c.find((l) => l.id === id);
      if (existing) return c.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...c, { id, qty: 1 }];
    });
  }
  function remove(id: string) {
    setCart((c) => c.map((l) => (l.id === id ? { ...l, qty: l.qty - 1 } : l)).filter((l) => l.qty > 0));
  }

  function placeOrder(e: Event) {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (name.trim().length < 2) nextErrors.name = labels.errorName;
    if (!/^[+\d][\d\s]{7,}$/.test(phone.trim())) nextErrors.phone = labels.errorPhone;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const ref = referenceCode('P');
    persistRecord({ type: 'order', ref, brand, pickup, name, phone, payment, total, lines: cart });
    setReference(ref);
    setCart([]);
  }

  function resetAll() {
    setReference('');
    setCheckout(false);
    setOpen(false);
    setName('');
    setPhone('');
    setPickup('');
  }

  const visible = items.filter((i) => i.category === activeCat);
  const usedAllergens = Array.from(new Set(items.flatMap((i) => i.allergens)));

  return (
    <div>
      <div class="-mx-5 mb-6 flex snap-x gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="tablist">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={c.id === activeCat}
            onClick={() => setActiveCat(c.id)}
            class={`snap-start whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium ${
              c.id === activeCat ? 'border-accent bg-accent text-white' : 'border-line bg-surface hover:border-ink/40'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <ul class="grid gap-3 sm:grid-cols-2">
        {visible.map((item) => {
          const inCart = cart.find((l) => l.id === item.id)?.qty ?? 0;
          return (
            <li key={item.id} class="card flex flex-col justify-between gap-3 p-4">
              <div>
                <div class="flex items-start justify-between gap-3">
                  <h3 class="font-medium">{item.name}</h3>
                  <span class="shrink-0 font-semibold tabular-nums">{money(item.price)}</span>
                </div>
                <p class="mt-1 text-sm text-muted">{item.description}</p>
                {item.allergens.length > 0 && (
                  <p class="mt-2 flex flex-wrap gap-1">
                    {item.allergens.map((a) => (
                      <span key={a} class="pill" title={props.allergenNames[a] ?? a}>
                        {a}
                      </span>
                    ))}
                  </p>
                )}
              </div>
              {item.takeaway === false ? (
                <p class="text-xs text-muted">{labels.dineInOnly}</p>
              ) : inCart === 0 ? (
                <button type="button" class="btn-secondary self-start !py-2" onClick={() => add(item.id)}>
                  {labels.add}
                </button>
              ) : (
                <div class="inline-flex items-center gap-3 self-start rounded-full border border-line">
                  <button type="button" class="h-9 w-9 rounded-full hover:bg-ink/5" onClick={() => remove(item.id)} aria-label="−">
                    −
                  </button>
                  <span class="min-w-4 text-center text-sm font-semibold tabular-nums">{inCart}</span>
                  <button type="button" class="h-9 w-9 rounded-full hover:bg-ink/5" onClick={() => add(item.id)} aria-label="+">
                    +
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <details class="mt-6 text-sm text-muted">
        <summary class="cursor-pointer font-medium text-ink">{labels.allergensTitle}</summary>
        <p class="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {usedAllergens.map((a) => (
            <span key={a}>
              <span class="pill mr-1">{a}</span>
              {props.allergenNames[a] ?? a}
            </span>
          ))}
        </p>
      </details>

      {count > 0 && !open && !reference && (
        <div class="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 p-3 backdrop-blur sm:inset-x-auto sm:bottom-6 sm:left-1/2 sm:w-[28rem] sm:-translate-x-1/2 sm:rounded-full sm:border sm:p-2 sm:pl-5">
          <button type="button" class="flex w-full items-center justify-between gap-4" onClick={() => setOpen(true)}>
            <span class="text-sm">
              <strong class="font-semibold">{count}</strong> {labels.items} · <strong class="font-semibold">{money(total)}</strong>
            </span>
            <span class="btn-primary !py-2.5">{labels.cart}</span>
          </button>
        </div>
      )}

      {(open || reference) && (
        <div class="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-6" onClick={() => !reference && setOpen(false)}>
          <div
            class="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-surface p-5 sm:rounded-3xl sm:p-6"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {reference ? (
              <div class="grid gap-5">
                <div>
                  <p class="eyebrow">{reference}</p>
                  <h3 class="mt-1 font-display text-2xl">{labels.successTitle}</h3>
                  <p class="mt-2 text-muted">{fill(labels.successBody, { brand, time: pickup })}</p>
                </div>
                <div class="max-w-sm rounded-2xl rounded-tl-sm bg-[#e7ffdb] px-4 py-3 text-sm">
                  <p class="whitespace-pre-line">
                    {fill(labels.whatsappPreview, { name: name.split(' ')[0], brand, time: pickup, ref: reference, total: money(total) })}
                  </p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-xs text-muted">{labels.demoNote}</p>
                  <button type="button" class="btn-secondary" onClick={resetAll}>
                    {labels.newOrder}
                  </button>
                </div>
              </div>
            ) : !checkout ? (
              <div>
                <div class="flex items-center justify-between">
                  <h3 class="font-display text-2xl">{labels.cart}</h3>
                  <button type="button" class="btn-ghost !px-3" onClick={() => setOpen(false)}>
                    {labels.close}
                  </button>
                </div>
                {lines.length === 0 ? (
                  <p class="mt-4 text-muted">{labels.emptyCart}</p>
                ) : (
                  <ul class="mt-4 divide-y divide-line">
                    {lines.map((l) => (
                      <li key={l.id} class="flex items-center justify-between gap-3 py-3">
                        <span>
                          <span class="block font-medium">{l.item.name}</span>
                          <span class="text-sm text-muted">{money(l.item.price)}</span>
                        </span>
                        <span class="inline-flex items-center gap-2 rounded-full border border-line">
                          <button type="button" class="h-8 w-8 rounded-full hover:bg-ink/5" onClick={() => remove(l.id)} aria-label="−">
                            −
                          </button>
                          <span class="min-w-4 text-center text-sm font-semibold tabular-nums">{l.qty}</span>
                          <button type="button" class="h-8 w-8 rounded-full hover:bg-ink/5" onClick={() => add(l.id)} aria-label="+">
                            +
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <div class="mt-4 flex items-center justify-between border-t border-line pt-4">
                  <span class="text-muted">{labels.total}</span>
                  <span class="text-lg font-semibold">{money(total)}</span>
                </div>
                <button
                  type="button"
                  class="btn-primary mt-4 w-full"
                  disabled={lines.length === 0}
                  onClick={() => {
                    setPickup(pickupSlots[0]?.time ?? '');
                    setCheckout(true);
                  }}
                >
                  {labels.checkout}
                </button>
              </div>
            ) : (
              <form class="grid gap-4" onSubmit={placeOrder} noValidate>
                <div class="flex items-center justify-between">
                  <h3 class="font-display text-2xl">{labels.checkout}</h3>
                  <button type="button" class="btn-ghost !px-3" onClick={() => setCheckout(false)}>
                    {labels.close}
                  </button>
                </div>
                <div>
                  <label class="label" for="ord-pickup">
                    {labels.pickupTime}
                  </label>
                  <select id="ord-pickup" class="field" value={pickup} onChange={(e) => setPickup((e.target as HTMLSelectElement).value)}>
                    {pickupSlots.map((s) => (
                      <option key={s.time} value={s.time}>
                        {s.time}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label class="label" for="ord-name">
                      {labels.name}
                    </label>
                    <input id="ord-name" class="field" value={name} onInput={(e) => setName((e.target as HTMLInputElement).value)} autocomplete="name" />
                    {errors.name && <p class="mt-1 text-xs text-accent">{errors.name}</p>}
                  </div>
                  <div>
                    <label class="label" for="ord-phone">
                      {labels.phone}
                    </label>
                    <input
                      id="ord-phone"
                      class="field"
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
                      autocomplete="tel"
                      placeholder="+34 6__ ___ ___"
                    />
                    {errors.phone && <p class="mt-1 text-xs text-accent">{errors.phone}</p>}
                  </div>
                </div>
                <fieldset>
                  <legend class="label">{labels.payment}</legend>
                  <div class="grid gap-2 sm:grid-cols-3">
                    {(
                      [
                        ['bizum', labels.payBizum],
                        ['card', labels.payCard],
                        ['pickup', labels.payOnPickup],
                      ] as const
                    ).map(([value, text]) => (
                      <label
                        key={value}
                        class={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm ${
                          payment === value ? 'border-accent bg-accent-soft/50' : 'border-line'
                        }`}
                      >
                        <input type="radio" name="payment" value={value} checked={payment === value} onChange={() => setPayment(value)} class="accent-accent" />
                        {text}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div class="flex items-center justify-between border-t border-line pt-4">
                  <span class="text-muted">{labels.total}</span>
                  <span class="text-lg font-semibold">{money(total)}</span>
                </div>
                <button type="submit" class="btn-primary w-full">
                  {labels.placeOrder}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
