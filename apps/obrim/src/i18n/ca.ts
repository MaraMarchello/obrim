/**
 * Textos en català (idioma per defecte).
 * TODO: revisió per part d'una persona nativa abans de publicar.
 */
export const ca = {
  meta: {
    title: 'Obrim — Webs amb reserves, comandes i cites per a negocis de barri · Barcelona',
    description:
      'Web ràpida en català, castellà i anglès amb reserves, comandes o cites en línia. Sense comissions per reserva. En marxa en 10 dies. Des de 49 €/mes, tot inclòs.',
  },
  nav: {
    pains: 'Per què',
    demos: 'Demos',
    how: 'Com funciona',
    pricing: 'Preus',
    about: 'Qui soc',
    faq: 'Preguntes',
    cta: 'Auditoria gratuïta',
  },
  hero: {
    eyebrow: 'Webs per a negocis de barri · Barcelona',
    title: 'Obrim el teu negoci a internet. Les 24 hores.',
    subtitle:
      'Una web ràpida en català, castellà i anglès, amb reserves, comandes o cites en línia. Sense comissions per reserva. En marxa en 10 dies.',
    ctaPrimary: 'Vull l’auditoria gratuïta',
    ctaSecondary: 'Veure les demos',
    proofs: ['Des de 49 €/mes, tot inclòs', 'El domini i el codi són teus', 'Suport per WhatsApp'],
  },
  pains: {
    eyebrow: 'Per què ara',
    title: 'La teva clientela ja és a internet. El teu negoci, encara no.',
    items: [
      {
        figure: '2–5 €',
        unit: 'per comensal',
        title: 'Comissions que podrien ser teves',
        body: 'Les plataformes de reserves cobren per cada client que t’envien. Amb 100 reserves setmanals, són més de 10.000 € l’any. Amb una web pròpia, la reserva és directa i la clientela és teva.',
      },
      {
        figure: '36 %',
        unit: 'dels petits negocis té web',
        title: 'La majoria no apareix quan et busquen',
        body: 'A Catalunya, només el 36 % de les empreses de menys de 10 persones té pàgina web (Idescat, 2025). Qui busca «on sopar a Gràcia» o «perruqueria a prop» troba la competència.',
        source: 'Idescat, Enquesta TIC empreses 2025',
      },
      {
        figure: '46 %',
        unit: 'dels bars rep clients en anglès',
        title: 'Turistes que no entenen la carta',
        body: 'Barcelona rep 16 milions de turistes l’any. Prop de la meitat dels bars rep clientela en anglès, però només el 40 % pot atendre-la. Una web en tres idiomes treballa per tu.',
        source: 'Ajuntament de Barcelona, Enquesta restauració 2024',
      },
    ],
  },
  demos: {
    eyebrow: 'Prova-ho des del mòbil',
    title: 'Dues demos reals. Reserva, demana, agafa cita.',
    body: 'No són maquetes: tot funciona. Obre-les al mòbil i fes una reserva com ho faria un client teu.',
    open: 'Obrir la demo',
    restaurant: {
      name: 'Can Roure',
      kind: 'Restaurant · Gràcia',
      features: ['Carta en 3 idiomes amb al·lèrgens', 'Reserva de taula amb recordatori', 'Comanda per emportar amb Bizum'],
    },
    salon: {
      name: 'Estudi Aran',
      kind: 'Perruqueria i estètica · Poblenou',
      features: ['Cita en línia per servei i professional', 'Recordatori per WhatsApp', 'Garantia amb targeta contra absències'],
    },
  },
  how: {
    eyebrow: 'Com funciona',
    title: 'De la primera trucada a la web en marxa: 10 dies.',
    steps: [
      {
        title: 'Auditoria i maqueta gratuïtes',
        body: 'En 48 h reps un PDF amb l’estat de la teva presència a internet i una maqueta de com quedaria la teva web.',
      },
      {
        title: 'Una reunió de 60 minuts',
        body: 'Al teu local. Parlem del negoci, faig les fotos, recollim textos i accessos. No et demanaré res més.',
      },
      {
        title: 'Construïm i revises',
        body: 'Redactem els textos en tres idiomes, muntem reserves o comandes i et passem l’enllaç per revisar-ho.',
      },
      {
        title: 'En marxa i formació',
        body: 'Publiquem, connectem Google i WhatsApp, i t’ensenyo en 30 minuts a canviar la carta o els horaris des del mòbil.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Preus clars',
    title: 'Un pagament inicial i una quota que ho inclou tot.',
    body: 'La quota cobreix allotjament, domini, certificat, còpies de seguretat, actualitzacions i canvis. Sense permanència.',
    setup: 'Posada en marxa',
    monthly: '/mes',
    from: 'des de',
    popular: 'El més triat',
    plans: [
      {
        name: 'Presència',
        setup: '490 €',
        monthly: '49 €',
        for: 'Per fer-te trobar',
        features: ['Pàgina única en ca · es · en', 'Fitxa de Google Business optimitzada', 'Botó de WhatsApp i mapa', 'Avís legal, privacitat i cookies'],
      },
      {
        name: 'Negoci',
        setup: '1.200 €',
        monthly: '89 €',
        for: 'Per explicar-te bé',
        features: ['Fins a 8 pàgines en 3 idiomes', 'Formularis i captació de contactes', 'SEO local de base', '2 h de canvis al mes'],
      },
      {
        name: 'Reserves · Comandes · Cites',
        setup: '1.900 €',
        setupFrom: true,
        monthly: '129 €',
        for: 'Per vendre les 24 hores',
        popular: true,
        features: [
          'Tot el pla Negoci',
          'Reserves, comandes o cites en línia',
          'Pagaments amb Bizum i targeta',
          'Recordatoris per WhatsApp',
          'Panell per gestionar-ho des del mòbil',
        ],
      },
      {
        name: 'Botiga',
        setup: '2.500 €',
        setupFrom: true,
        monthly: '149 €',
        for: 'Per vendre productes',
        features: ['Catàleg i carret', 'Pagaments i enviaments', 'Facturació compatible amb Verifactu', 'Suport prioritari'],
      },
    ],
    custom: {
      title: 'Empreses de 10 a 49 persones',
      body: 'Integracions amb el vostre CRM o ERP, accessibilitat WCAG 2.1 AA (obligatòria per a pimes des del 2025) i acord de nivell de servei. Pressupost a mida des de 4.000 €.',
      cta: 'Demanar pressupost',
    },
    grants: 'Preparem la documentació per als ajuts de digitalització (CCAM, Kit Digital) quan s’obren les convocatòries.',
  },
  audit: {
    eyebrow: 'Sense compromís',
    title: 'Auditoria gratuïta i maqueta de la teva web en 48 h',
    body: 'Omple el formulari i t’escriuré per WhatsApp amb un PDF de l’estat actual i una proposta visual. Si no t’interessa, no passa res.',
    fields: {
      business: 'Nom del negoci',
      type: 'Tipus de negoci',
      types: ['Restaurant, bar o cafeteria', 'Perruqueria o estètica', 'Clínica o consulta', 'Botiga', 'Taller o serveis', 'Altres'],
      area: 'Barri o municipi',
      phone: 'El teu WhatsApp',
      website: 'Web actual (si en tens)',
      optional: 'opcional',
    },
    submit: 'Enviar per WhatsApp',
    note: 'S’obrirà WhatsApp amb el missatge preparat. No guardem cap dada fins que no parlem.',
    messageTemplate:
      'Hola! Vull l’auditoria gratuïta d’Obrim.\nNegoci: {business}\nTipus: {type}\nZona: {area}\nWeb actual: {website}',
  },
  about: {
    eyebrow: 'Qui hi ha darrere',
    title: 'Hola, soc en Marat.',
    body: [
      'Soc desenvolupador de programari, especialitzat en sistemes de backend (Java, Spring) i interfícies web (React, TypeScript). Visc a Barcelona.',
      'Vaig començar Obrim després de veure massa negocis bons amb webs que no s’obren al mòbil, no es poden reservar i no parlen l’idioma de qui entra per la porta. Les eines modernes permeten fer-ho bé, ràpid i a un preu que un negoci de barri pot pagar.',
      'Treballo sol, amb col·laboradors per a la revisió lingüística en català. Em trobaràs al local, no en una oficina.',
    ],
    github: 'Codi i projectes a GitHub',
    facts: ['Barcelona', 'Backend · Java i Spring', 'Frontend · React i TypeScript'],
  },
  faq: {
    eyebrow: 'Preguntes habituals',
    title: 'El que em pregunten abans de començar',
    items: [
      {
        q: 'De qui és la web, el domini i les dades?',
        a: 'Teus. El domini es registra al teu nom, el codi és teu i les dades de reserves i clients són teves i exportables. Si un dia marxes, t’ho emportes tot.',
      },
      {
        q: 'Què passa si deixo de pagar la quota?',
        a: 'La web continua sent teva. El que deixa de funcionar és l’allotjament, les còpies de seguretat, les actualitzacions i el suport. Et donem els fitxers i les instruccions per portar-la a un altre lloc.',
      },
      {
        q: 'Puc canviar jo la carta, els preus o els horaris?',
        a: 'Sí, des del mòbil, en un panell senzill. T’ho ensenyo en 30 minuts quan publiquem la web. I si prefereixes que ho faci jo, entra dins de les hores de canvis de la quota.',
      },
      {
        q: 'Compleix la normativa?',
        a: 'Sí: informació essencial en català (Codi de consum), avís legal, política de privacitat i cookies segons RGPD i LSSI, fulls oficials de reclamació disponibles a la web, i carta amb al·lèrgens si ets restaurant.',
      },
      {
        q: 'Treballeu amb el Kit Digital o els ajuts de la Generalitat?',
        a: 'El Kit Digital està tancat ara mateix i el CCAM cobreix fins al 50 % de la digitalització de comerços i serveis (màxim 5.000 €) quan s’obre la convocatòria. Et preparo la documentació perquè puguis demanar-los sense que la web s’hagi d’esperar.',
      },
      {
        q: 'Per què no faig servir Wix o una plataforma de reserves i prou?',
        a: 'Pots. Però Wix no exporta la web (si deixes de pagar, desapareix), no gestiona el català ni la normativa espanyola, i ningú vindrà al local a configurar-ho. I les plataformes de reserves es queden la comissió i la relació amb el client. Pots mantenir-les per captar gent nova i portar la clientela habitual al teu canal.',
      },
    ],
  },
  footer: {
    tagline: 'Webs amb reserves, comandes i cites per a negocis de barri.',
    contact: 'Contacte',
    legal: 'Legal',
    legalLinks: { notice: 'Avís legal', privacy: 'Privacitat', cookies: 'Cookies' },
    made: 'Fet a Barcelona',
  },
  whatsapp: {
    label: 'Escriu-nos per WhatsApp',
    message: 'Hola! M’interessa una web per al meu negoci.',
  },
  legal: {
    notice: {
      title: 'Avís legal',
      body: [
        'Titular del lloc web: {founder}. Domicili: Barcelona. NIF: [PENDENT]. Correu electrònic: {email}.',
        'Aquest lloc web té caràcter informatiu i comercial. L’ús del lloc implica l’acceptació d’aquestes condicions.',
        'Els continguts (textos, imatges, codi) són propietat del titular o de tercers que n’han autoritzat l’ús i estan protegits per la legislació de propietat intel·lectual.',
        'El titular no es fa responsable dels continguts de llocs web de tercers enllaçats des d’aquest lloc.',
        'Normativa aplicable: Llei 34/2002 de serveis de la societat de la informació i de comerç electrònic (LSSI-CE) i Codi de consum de Catalunya.',
      ],
    },
    privacy: {
      title: 'Política de privacitat',
      body: [
        'Responsable del tractament: {founder}, Barcelona, {email}.',
        'Dades que tractem: les que ens facilites voluntàriament per WhatsApp, correu electrònic o formularis (nom del negoci, telèfon, web actual). El formulari d’aquest lloc no emmagatzema dades: obre WhatsApp amb un missatge que tu decideixes enviar.',
        'Finalitat: respondre la teva sol·licitud, preparar l’auditoria i, si ho acordem, prestar el servei contractat. Base jurídica: consentiment i execució de mesures precontractuals (art. 6.1.a i b RGPD).',
        'Conservació: mentre duri la relació i, després, els terminis legals aplicables.',
        'Destinataris: no cedim dades a tercers, excepte proveïdors necessaris per prestar el servei (allotjament, missatgeria) amb contracte d’encarregat de tractament, i obligacions legals.',
        'Drets: pots accedir, rectificar, suprimir, oposar-te, limitar i portar les teves dades escrivint a {email}. També pots reclamar davant l’Autoritat Catalana de Protecció de Dades o l’AEPD.',
      ],
    },
    cookies: {
      title: 'Política de cookies',
      body: [
        'Aquest lloc web no utilitza cookies d’anàlisi, publicitat ni seguiment. Només pot utilitzar emmagatzematge tècnic imprescindible per al funcionament del lloc (per exemple, recordar l’idioma).',
        'Les demos enllaçades des d’aquest lloc guarden al teu navegador (localStorage) les reserves de prova que fas, només perquè les puguis veure. No s’envien a cap servidor.',
        'Si en el futur incorporem eines d’anàlisi, actualitzarem aquesta política i et demanarem el consentiment previ.',
      ],
    },
    back: 'Tornar a l’inici',
    updated: 'Darrera actualització',
  },
};

export type Dictionary = typeof ca;
