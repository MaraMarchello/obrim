import type { Dictionary } from './ca';

export const en: Dictionary = {
  meta: {
    title: 'Obrim — Websites with bookings, orders and appointments for local businesses · Barcelona',
    description:
      'A fast website in Catalan, Spanish and English with online bookings, orders or appointments. No per-booking commissions. Live in 10 days. From €49/month, all inclusive.',
  },
  nav: {
    pains: 'Why',
    demos: 'Demos',
    how: 'How it works',
    pricing: 'Pricing',
    about: 'About',
    faq: 'FAQ',
    cta: 'Free audit',
  },
  hero: {
    eyebrow: 'Websites for local businesses · Barcelona',
    title: 'We open your business online. 24 hours a day.',
    subtitle:
      'A fast website in Catalan, Spanish and English, with online bookings, orders or appointments. No per-booking commissions. Live in 10 days.',
    ctaPrimary: 'Get the free audit',
    ctaSecondary: 'See the demos',
    proofs: ['From €49/month, all inclusive', 'You own the domain and the code', 'Support over WhatsApp'],
  },
  pains: {
    eyebrow: 'Why now',
    title: 'Your customers are already online. Your business is not.',
    items: [
      {
        figure: '€2–5',
        unit: 'per diner',
        title: 'Commissions that could be yours',
        body: 'Booking platforms charge for every customer they send you. With 100 bookings a week that is over €10,000 a year. With your own website the booking is direct and the customer is yours.',
      },
      {
        figure: '36%',
        unit: 'of small businesses have a website',
        title: 'Most do not show up when people search',
        body: 'In Catalonia only 36% of businesses with fewer than 10 people have a website (Idescat, 2025). Whoever searches "dinner in Gràcia" or "hairdresser near me" finds your competitors.',
        source: 'Idescat, ICT in enterprises survey 2025',
      },
      {
        figure: '46%',
        unit: 'of bars get English-speaking customers',
        title: 'Tourists who cannot read the menu',
        body: 'Barcelona welcomes 16 million tourists a year. Nearly half of bars serve English-speaking customers, yet only 40% can do so. A website in three languages works for you.',
        source: 'Barcelona City Council, Restaurant survey 2024',
      },
    ],
  },
  demos: {
    eyebrow: 'Try it on your phone',
    title: 'Two real demos. Book a table, order, get an appointment.',
    body: 'These are not mockups: everything works. Open them on your phone and make a booking as one of your customers would.',
    open: 'Open the demo',
    restaurant: {
      name: 'Can Roure',
      kind: 'Restaurant · Gràcia',
      features: ['Menu in 3 languages with allergens', 'Table booking with reminder', 'Takeaway order with Bizum'],
    },
    salon: {
      name: 'Estudi Aran',
      kind: 'Hair & beauty · Poblenou',
      features: ['Online appointment by service and stylist', 'WhatsApp reminder', 'Card guarantee against no-shows'],
    },
  },
  how: {
    eyebrow: 'How it works',
    title: 'From the first call to a live website: 10 days.',
    steps: [
      {
        title: 'Free audit and mockup',
        body: 'Within 48 hours you receive a PDF on the state of your online presence and a mockup of what your website would look like.',
      },
      {
        title: 'One 60-minute meeting',
        body: 'At your premises. We talk about the business, I take the photos, we collect texts and logins. I will not ask you for anything else.',
      },
      {
        title: 'We build, you review',
        body: 'We write the texts in three languages, set up bookings or orders and send you the link to review.',
      },
      {
        title: 'Go live and training',
        body: 'We publish, connect Google and WhatsApp, and in 30 minutes I show you how to change the menu or opening hours from your phone.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Clear pricing',
    title: 'One setup fee and a monthly plan that covers everything.',
    body: 'The monthly plan covers hosting, domain, SSL, backups, updates and changes. No lock-in.',
    setup: 'Setup',
    monthly: '/month',
    from: 'from',
    popular: 'Most popular',
    plans: [
      {
        name: 'Presence',
        setup: '€490',
        monthly: '€49',
        for: 'To be found',
        features: ['One-page site in ca · es · en', 'Optimised Google Business profile', 'WhatsApp button and map', 'Legal notice, privacy and cookies'],
      },
      {
        name: 'Business',
        setup: '€1,200',
        monthly: '€89',
        for: 'To tell your story well',
        features: ['Up to 8 pages in 3 languages', 'Forms and lead capture', 'Local SEO foundations', '2 h of changes per month'],
      },
      {
        name: 'Bookings · Orders · Appointments',
        setup: '€1,900',
        setupFrom: true,
        monthly: '€129',
        for: 'To sell around the clock',
        popular: true,
        features: [
          'Everything in Business',
          'Online bookings, orders or appointments',
          'Bizum and card payments',
          'WhatsApp reminders',
          'Dashboard to manage it from your phone',
        ],
      },
      {
        name: 'Shop',
        setup: '€2,500',
        setupFrom: true,
        monthly: '€149',
        for: 'To sell products',
        features: ['Catalogue and cart', 'Payments and shipping', 'Verifactu-compatible invoicing', 'Priority support'],
      },
    ],
    custom: {
      title: 'Companies with 10 to 49 people',
      body: 'Integrations with your CRM or ERP, WCAG 2.1 AA accessibility (mandatory for SMEs since 2025) and a service-level agreement. Custom quote from €4,000.',
      cta: 'Request a quote',
    },
    grants: 'We prepare the paperwork for digitalisation grants (CCAM, Kit Digital) whenever a call opens.',
  },
  audit: {
    eyebrow: 'No strings attached',
    title: 'Free audit and a mockup of your website in 48 h',
    body: 'Fill in the form and I will message you on WhatsApp with a PDF of your current situation and a visual proposal. If it is not for you, no problem.',
    fields: {
      business: 'Business name',
      type: 'Type of business',
      types: ['Restaurant, bar or café', 'Hair or beauty salon', 'Clinic or practice', 'Shop', 'Workshop or services', 'Other'],
      area: 'Neighbourhood or town',
      phone: 'Your WhatsApp',
      website: 'Current website (if any)',
      optional: 'optional',
    },
    submit: 'Send via WhatsApp',
    note: 'WhatsApp will open with the message ready. We store nothing until we talk.',
    messageTemplate:
      'Hi! I would like the free Obrim audit.\nBusiness: {business}\nType: {type}\nArea: {area}\nCurrent website: {website}',
  },
  about: {
    eyebrow: 'Who is behind it',
    title: 'Hi, I am Marat.',
    body: [
      'I am a software developer specialised in backend systems (Java, Spring) and web interfaces (React, TypeScript). I live in Barcelona.',
      'I started Obrim after seeing too many good businesses with websites that do not open on a phone, cannot take a booking and do not speak the language of the person walking through the door. Modern tools make it possible to do this well, fast and at a price a local business can afford.',
      'I work alone, with collaborators for Catalan proofreading. You will find me at your premises, not in an office.',
    ],
    github: 'Code and projects on GitHub',
    facts: ['Barcelona', 'Backend · Java & Spring', 'Frontend · React & TypeScript'],
  },
  faq: {
    eyebrow: 'Common questions',
    title: 'What people ask before we start',
    items: [
      {
        q: 'Who owns the website, the domain and the data?',
        a: 'You do. The domain is registered in your name, the code is yours and the booking and customer data are yours and exportable. If you ever leave, you take everything with you.',
      },
      {
        q: 'What happens if I stop paying the monthly plan?',
        a: 'The website is still yours. What stops is hosting, backups, updates and support. We give you the files and instructions to move it elsewhere.',
      },
      {
        q: 'Can I change the menu, prices or opening hours myself?',
        a: 'Yes, from your phone, in a simple dashboard. I show you in 30 minutes when the site goes live. If you would rather I do it, it is covered by the monthly hours of changes.',
      },
      {
        q: 'Is it legally compliant?',
        a: 'Yes: essential information in Catalan (Consumer Code), legal notice, privacy and cookie policies under GDPR and LSSI, official complaint forms available on the website, and a menu with allergens if you run a restaurant.',
      },
      {
        q: 'Do you work with Kit Digital or the Generalitat grants?',
        a: 'Kit Digital is currently closed, and CCAM covers up to 50% of digitalisation for shops and services (max €5,000) when a call is open. I prepare the paperwork so you can apply without the website having to wait.',
      },
      {
        q: 'Why not just use Wix or a booking platform?',
        a: 'You can. But Wix does not export your site (stop paying and it disappears), does not handle Catalan or Spanish regulations, and nobody will come to your premises to set it up. Booking platforms keep the commission and the customer relationship. Keep them to attract new people and bring your regulars to your own channel.',
      },
    ],
  },
  footer: {
    tagline: 'Websites with bookings, orders and appointments for local businesses.',
    contact: 'Contact',
    legal: 'Legal',
    legalLinks: { notice: 'Legal notice', privacy: 'Privacy', cookies: 'Cookies' },
    made: 'Made in Barcelona',
  },
  whatsapp: {
    label: 'Message us on WhatsApp',
    message: 'Hi! I am interested in a website for my business.',
  },
  legal: {
    notice: {
      title: 'Legal notice',
      body: [
        'Website owner: {founder}. Address: Barcelona. Tax ID: [PENDING]. Email: {email}.',
        'This website is informational and commercial in nature. Using the site implies acceptance of these terms.',
        'Contents (texts, images, code) are the property of the owner or of third parties who have authorised their use and are protected by intellectual property law.',
        'The owner is not responsible for the content of third-party websites linked from this site.',
        'Applicable law: Spanish Law 34/2002 on information society services and e-commerce (LSSI-CE) and the Catalan Consumer Code.',
      ],
    },
    privacy: {
      title: 'Privacy policy',
      body: [
        'Data controller: {founder}, Barcelona, {email}.',
        'Data we process: what you voluntarily provide via WhatsApp, email or forms (business name, phone, current website). The form on this site stores nothing: it opens WhatsApp with a message you decide whether to send.',
        'Purpose: to answer your request, prepare the audit and, if agreed, provide the contracted service. Legal basis: consent and pre-contractual measures (art. 6.1.a and b GDPR).',
        'Retention: for the duration of the relationship and thereafter for the legally applicable periods.',
        'Recipients: we do not share data with third parties except providers needed to deliver the service (hosting, messaging) under a data processing agreement, and legal obligations.',
        'Rights: you may access, rectify, erase, object, restrict and port your data by writing to {email}. You may also lodge a complaint with the Catalan Data Protection Authority or the AEPD.',
      ],
    },
    cookies: {
      title: 'Cookie policy',
      body: [
        'This website does not use analytics, advertising or tracking cookies. It may only use technical storage strictly necessary for the site to work (for example, remembering your language).',
        'The demos linked from this site store the test bookings you make in your browser (localStorage), only so you can see them. They are not sent to any server.',
        'If we add analytics tools in the future, we will update this policy and ask for your consent first.',
      ],
    },
    back: 'Back to home',
    updated: 'Last updated',
  },
};
