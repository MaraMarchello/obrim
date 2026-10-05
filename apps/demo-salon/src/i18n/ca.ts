import type { BookingLabels } from '@obrim/ui/components/BookingWidget';

export const ca = {
  meta: {
    title: 'Estudi Aran — Perruqueria i estètica al Poblenou · Cita en línia',
    description:
      'Perruqueria i estètica al Poblenou. Agafa cita en línia amb la teva professional, rep el recordatori per WhatsApp i oblida’t de trucar.',
  },
  nav: { services: 'Serveis', team: 'Equip', book: 'Agafar cita', info: 'On som' },
  hero: {
    eyebrow: 'Perruqueria i estètica · Poblenou, Barcelona',
    title: 'La teva cita, quan a tu et va bé.',
    subtitle: 'Tria servei, professional i hora. Ho confirmem a l’instant i t’ho recordem per WhatsApp el dia abans.',
    cta: 'Agafar cita',
    secondary: 'Veure serveis i preus',
    hours: 'Dimarts a dissabte · 10:00–20:00',
  },
  services: {
    eyebrow: 'Serveis i preus',
    title: 'Sense sorpreses: el preu que veus és el que pagues',
    body: 'Si tens dubtes sobre quin servei necessites, escriu-nos per WhatsApp i t’orientem abans de la cita.',
    minutes: 'min',
    book: 'Agafar cita',
  },
  team: {
    eyebrow: 'L’equip',
    title: 'Quatre mans de confiança',
    body: 'Pots triar amb qui vols fer-te la cita o deixar que t’assignem la primera persona disponible.',
  },
  book: {
    eyebrow: 'Cita en línia',
    title: 'Agafa cita en un minut',
    body: 'Si no pots venir, cancel·la o canvia l’hora fins a 24 h abans des del mateix missatge de WhatsApp. Per a serveis de més de 60 €, demanem una targeta de garantia.',
  },
  policy: {
    title: 'Política de cancel·lació',
    items: [
      'Cancel·lació gratuïta fins a 24 h abans de la cita.',
      'Serveis de 60 € o més: garantia amb targeta. No es cobra res si vens. En cas de no presentar-te sense avisar, es cobra el 50 %.',
      'Si arribes més de 15 minuts tard, potser caldrà escurçar o reprogramar el servei.',
    ],
  },
  info: {
    eyebrow: 'On som',
    title: 'Carrer de Pujades, 00 · Poblenou',
    hoursTitle: 'Horari',
    hours: ['Dimarts a divendres · 10:00–20:00', 'Dissabte · 10:00–18:00', 'Diumenge i dilluns tancat'],
    contactTitle: 'Contacte',
    mapLabel: 'Obrir a Google Maps',
    transport: 'Metro L4 Poblenou · Tram T4 Pere IV',
  },
  reviews: {
    eyebrow: 'Opinions',
    items: [
      { text: 'Vaig agafar cita a les 23 h des del sofà i l’endemà tenia el recordatori. Les metxes, perfectes.', author: 'Laia F.', source: 'Google' },
      { text: 'Por fin una peluquería donde no tengo que llamar tres veces para que me cojan el teléfono.', author: 'Andrea S.', source: 'Google' },
      { text: 'Booked online in English, chose Marc, got a reminder. Best beard trim in Poblenou.', author: 'Tom H.', source: 'Google' },
    ],
  },
  footer: {
    legal: ['Avís legal', 'Privacitat', 'Cookies', 'Fulls de reclamació'],
    demo: 'Aquesta és una web de demostració d’Obrim. Estudi Aran no existeix; les cites no s’envien enlloc.',
  },
  whatsapp: { label: 'Escriu-nos per WhatsApp', message: 'Hola Estudi Aran! Voldria fer una consulta.' },
  booking: {
    stepService: 'Servei',
    stepStaff: 'Professional',
    stepWhen: 'Dia i hora',
    stepDetails: 'Les teves dades',
    anyStaff: 'Primera persona disponible',
    guests: 'Persones',
    guestSingular: 'persona',
    guestPlural: 'persones',
    name: 'Nom',
    phone: 'Mòbil',
    notes: 'Comentaris',
    notesPlaceholder: 'Al·lèrgies, llargada del cabell, referència de color…',
    back: 'Enrere',
    next: 'Continuar',
    confirm: 'Confirmar la cita',
    cardGuarantee: 'Servei de 60 € o més: cita garantida amb targeta. No es cobra res si vens; 50 % en cas de no presentar-te sense avisar.',
    reminder: 'Rebràs la confirmació ara i un recordatori per WhatsApp 24 h abans. Pots cancel·lar o canviar l’hora des del mateix missatge.',
    noSlots: 'No queden hores aquest dia. Prova un altre dia o una altra professional.',
    minutesShort: 'min',
    successTitle: 'Cita confirmada!',
    successBody: 'T’esperem a {brand}. Hem enviat la confirmació al teu WhatsApp.',
    whatsappPreview: 'Hola {name}! Cita confirmada a {brand}: {detail}, {date} a les {time}. Ref. {ref}. Per canviar o cancel·lar, respon a aquest missatge.',
    newBooking: 'Nova cita',
    demoNote: 'Demo: no s’ha enviat cap missatge real.',
    errorName: 'Escriu el teu nom.',
    errorPhone: 'Escriu un mòbil vàlid.',
  } satisfies BookingLabels,
};

export type Dictionary = typeof ca;
