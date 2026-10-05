import type { Dictionary } from './ca';

export const es: Dictionary = {
  meta: {
    title: 'Obrim — Webs con reservas, pedidos y citas para negocios del Alt Penedès · Vilafranca',
    description:
      'Webs para restaurantes, bodegas, peluquerías y comercios de Vilafranca del Penedès y el Alt Penedès. Catalán, castellano e inglés, reservas online sin comisiones, en marcha en 10 días. Desde 49 €/mes.',
  },
  nav: {
    pains: 'Por qué',
    demos: 'Demos',
    how: 'Cómo funciona',
    pricing: 'Precios',
    about: 'Quién soy',
    faq: 'Preguntas',
    cta: 'Auditoría gratuita',
  },
  hero: {
    eyebrow: 'Webs para negocios del Alt Penedès · Vilafranca, Pacs y comarca',
    title: 'Abrimos tu negocio en internet. Las 24 horas.',
    subtitle:
      'Una web rápida en catalán, castellano e inglés, con reservas, pedidos, citas o visitas a la bodega online. Sin comisiones por reserva. En marcha en 10 días, y voy yo a tu local.',
    ctaPrimary: 'Quiero la auditoría gratuita',
    ctaSecondary: 'Ver las demos',
    proofs: ['Desde 49 €/mes, todo incluido', 'El dominio y el código son tuyos', 'Soporte por WhatsApp, desde el Penedès'],
  },
  pains: {
    eyebrow: 'Por qué ahora',
    title: 'Tu clientela ya está en internet. Tu negocio, todavía no.',
    items: [
      {
        figure: '2–5 €',
        unit: 'por comensal',
        title: 'Comisiones que podrían ser tuyas',
        body: 'Las plataformas de reservas cobran por cada cliente que te envían. Con 100 reservas semanales son más de 10.000 € al año. Con web propia, la reserva es directa y la clientela es tuya.',
      },
      {
        figure: '36 %',
        unit: 'de los pequeños negocios tiene web',
        title: 'La mayoría no aparece cuando te buscan',
        body: 'En Cataluña, solo el 36 % de las empresas de menos de 10 personas tiene página web (Idescat, 2025). Quien busca «dónde comer en Vilafranca» o «bodega para visitar en el Penedès» encuentra a la competencia, o una plataforma que cobra comisión.',
        source: 'Idescat, Encuesta TIC empresas 2025',
      },
      {
        figure: '369.000',
        unit: 'visitantes a las bodegas del Penedès al año',
        title: 'Vienen de fuera y reservan desde el móvil',
        body: 'El Penedès es la tercera ruta del vino más visitada de España, con un 21 % más de visitantes en 2024. Buscan en inglés, quieren reservar la visita online y, si no pueden, se van a la bodega de al lado.',
        source: 'ACEVIN, Informe de visitantes a bodegas 2024 · Penedès Turisme',
      },
    ],
  },
  demos: {
    eyebrow: 'Pruébalo desde el móvil',
    title: 'Tres demos reales. Reserva, pide, coge cita, visita una bodega.',
    body: 'No son maquetas: todo funciona. Ábrelas en el móvil y haz una reserva como lo haría un cliente tuyo.',
    open: 'Abrir la demo',
    restaurant: {
      name: 'Can Roure',
      kind: 'Restaurante · Vilafranca del Penedès',
      features: ['Carta en 3 idiomas con alérgenos', 'Reserva de mesa con recordatorio', 'Pedido para llevar con Bizum'],
    },
    salon: {
      name: 'Estudi Aran',
      kind: 'Peluquería y estética · Vilafranca del Penedès',
      features: ['Cita online por servicio y profesional', 'Recordatorio por WhatsApp', 'Garantía con tarjeta contra ausencias'],
    },
    celler: {
      name: 'Celler Mas Albareda',
      kind: 'Bodega y enoturismo · Pacs del Penedès',
      features: ['Visitas y catas con precio por persona', 'Idioma de la visita y grupos', 'Tienda de vinos con recogida en la bodega'],
    },
  },
  how: {
    eyebrow: 'Cómo funciona',
    title: 'De la primera llamada a la web en marcha: 10 días.',
    steps: [
      {
        title: 'Auditoría y maqueta gratuitas',
        body: 'En 48 h recibes un PDF con el estado de tu presencia en internet y una maqueta de cómo quedaría tu web.',
      },
      {
        title: 'Una reunión de 60 minutos',
        body: 'En tu local, en cualquier pueblo de la comarca. Hablamos del negocio, hago las fotos, recogemos textos y accesos. No te pediré nada más.',
      },
      {
        title: 'Construimos y revisas',
        body: 'Redactamos los textos en tres idiomas, montamos reservas o pedidos y te pasamos el enlace para revisarlo.',
      },
      {
        title: 'En marcha y formación',
        body: 'Publicamos, conectamos Google y WhatsApp, y te enseño en 30 minutos a cambiar la carta o los horarios desde el móvil.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Precios claros',
    title: 'Un pago inicial y una cuota que lo incluye todo.',
    body: 'La cuota cubre alojamiento, dominio, certificado, copias de seguridad, actualizaciones y cambios. Sin permanencia.',
    setup: 'Puesta en marcha',
    monthly: '/mes',
    from: 'desde',
    popular: 'El más elegido',
    plans: [
      {
        name: 'Presencia',
        setup: '490 €',
        monthly: '49 €',
        for: 'Para que te encuentren',
        features: ['Página única en ca · es · en', 'Ficha de Google Business optimizada', 'Botón de WhatsApp y mapa', 'Aviso legal, privacidad y cookies'],
      },
      {
        name: 'Negocio',
        setup: '1.200 €',
        monthly: '89 €',
        for: 'Para explicarte bien',
        features: ['Hasta 8 páginas en 3 idiomas', 'Formularios y captación de contactos', 'SEO local de base', '2 h de cambios al mes'],
      },
      {
        name: 'Reservas · Pedidos · Citas',
        setup: '1.900 €',
        setupFrom: true,
        monthly: '129 €',
        for: 'Para vender las 24 horas',
        popular: true,
        features: [
          'Todo el plan Negocio',
          'Reservas, pedidos o citas online',
          'Pagos con Bizum y tarjeta',
          'Recordatorios por WhatsApp',
          'Panel para gestionarlo desde el móvil',
        ],
      },
      {
        name: 'Tienda',
        setup: '2.500 €',
        setupFrom: true,
        monthly: '149 €',
        for: 'Para vender productos',
        features: ['Catálogo y carrito', 'Pagos y envíos', 'Facturación compatible con Verifactu', 'Soporte prioritario'],
      },
    ],
    celler: {
      eyebrow: 'Para bodegas y enoturismo',
      name: 'Celler',
      setup: '2.900 €',
      setupFrom: true,
      monthly: '169 €',
      for: 'Para llenar las visitas y vender vino sin intermediarios',
      features: [
        'Visitas y catas con reserva online: precio por persona, grupos, idioma de la visita',
        'Tienda de vinos con recogida en la bodega o envío, Bizum y tarjeta',
        'Catalán, castellano e inglés (francés opcional)',
        'Calendario de vendimias, eventos y vales regalo',
        'Ficha de Google y datos estructurados para que las visitas salgan en los resultados',
        'Facturación compatible con Verifactu',
      ],
      cta: 'Ver la demo de la bodega',
    },
    custom: {
      title: 'Empresas de 10 a 49 personas',
      body: 'Integraciones con vuestro CRM o ERP, accesibilidad WCAG 2.1 AA (obligatoria para pymes desde 2025) y acuerdo de nivel de servicio. Presupuesto a medida desde 4.000 €.',
      cta: 'Pedir presupuesto',
    },
    grants: 'Preparamos la documentación para las ayudas de digitalización (CCAM, Kit Digital) cuando se abren las convocatorias.',
  },
  audit: {
    eyebrow: 'Sin compromiso',
    title: 'Auditoría gratuita y maqueta de tu web en 48 h',
    body: 'Rellena el formulario y te escribiré por WhatsApp con un PDF del estado actual y una propuesta visual. Si no te interesa, no pasa nada.',
    fields: {
      business: 'Nombre del negocio',
      type: 'Tipo de negocio',
      types: ['Restaurante, bar o cafetería', 'Bodega o enoturismo', 'Peluquería o estética', 'Clínica o consulta', 'Tienda o agrotienda', 'Taller o servicios', 'Alojamiento rural', 'Otros'],
      area: 'Municipio (Vilafranca, Pacs, Sant Sadurní…)',
      phone: 'Tu WhatsApp',
      website: 'Web actual (si tienes)',
      optional: 'opcional',
    },
    submit: 'Enviar por WhatsApp',
    note: 'Se abrirá WhatsApp con el mensaje preparado. No guardamos ningún dato hasta que hablemos.',
    messageTemplate:
      '¡Hola! Quiero la auditoría gratuita de Obrim.\nNegocio: {business}\nTipo: {type}\nZona: {area}\nWeb actual: {website}',
  },
  about: {
    eyebrow: 'Quién hay detrás',
    title: 'Hola, soy Marat.',
    body: [
      'Soy desarrollador de software, especializado en sistemas de backend (Java, Spring) e interfaces web (React, TypeScript). Vivo en Pacs del Penedès, a cinco minutos de Vilafranca.',
      'Empecé Obrim después de ver demasiados negocios buenos de la comarca con webs que no se abren en el móvil, en las que no se puede reservar y que no hablan el idioma de quien entra por la puerta. Las herramientas modernas permiten hacerlo bien, rápido y a un precio que un negocio de pueblo puede pagar.',
      'Trabajo solo, con colaboradores para la revisión lingüística en catalán. Me encontrarás en tu local, en Vilafranca, Sant Sadurní o cualquier pueblo del Alt Penedès, no en una oficina.',
    ],
    github: 'Código y proyectos en GitHub',
    facts: ['Pacs del Penedès', 'Backend · Java y Spring', 'Frontend · React y TypeScript'],
  },
  faq: {
    eyebrow: 'Preguntas habituales',
    title: 'Lo que me preguntan antes de empezar',
    items: [
      {
        q: '¿De quién es la web, el dominio y los datos?',
        a: 'Tuyos. El dominio se registra a tu nombre, el código es tuyo y los datos de reservas y clientes son tuyos y exportables. Si un día te vas, te lo llevas todo.',
      },
      {
        q: '¿Qué pasa si dejo de pagar la cuota?',
        a: 'La web sigue siendo tuya. Lo que deja de funcionar es el alojamiento, las copias de seguridad, las actualizaciones y el soporte. Te damos los archivos y las instrucciones para llevarla a otro sitio.',
      },
      {
        q: '¿Puedo cambiar yo la carta, los precios o los horarios?',
        a: 'Sí, desde el móvil, en un panel sencillo. Te lo enseño en 30 minutos cuando publicamos la web. Y si prefieres que lo haga yo, entra dentro de las horas de cambios de la cuota.',
      },
      {
        q: '¿Cumple la normativa?',
        a: 'Sí: información esencial en catalán (Código de consumo), aviso legal, política de privacidad y cookies según RGPD y LSSI, hojas oficiales de reclamación disponibles en la web, y carta con alérgenos si eres restaurante.',
      },
      {
        q: '¿Trabajáis con el Kit Digital o las ayudas de la Generalitat?',
        a: 'El Kit Digital está cerrado ahora mismo y el CCAM cubre hasta el 50 % de la digitalización de comercios y servicios (máximo 5.000 €) cuando se abre la convocatoria. Te preparo la documentación para que puedas pedirlos sin que la web tenga que esperar.',
      },
      {
        q: '¿Vienes a mi pueblo?',
        a: 'Sí. Trabajo en todo el Alt Penedès: Vilafranca, Pacs, Sant Sadurní, els Monjos, Gelida, Sant Martí Sarroca y el resto de pueblos de la comarca. La primera reunión y la formación final se hacen siempre en tu local.',
      },
      {
        q: 'Tengo una bodega. ¿Qué me puedes hacer?',
        a: 'Reserva de visitas y catas con precio por persona, grupos e idioma de la visita; tienda de vinos con recogida o envío; calendario de eventos; y la ficha de Google para que las visitas salgan directamente en los resultados. Mira la demo del Celler Mas Albareda: todo lo que ves funciona.',
      },
      {
        q: '¿Por qué no uso Wix o una plataforma de reservas y ya está?',
        a: 'Puedes. Pero Wix no exporta la web (si dejas de pagar, desaparece), no gestiona el catalán ni la normativa española, y nadie vendrá al local a configurarlo. Y las plataformas de reservas se quedan la comisión y la relación con el cliente. Puedes mantenerlas para captar gente nueva y llevar la clientela habitual a tu canal.',
      },
    ],
  },
  footer: {
    tagline: 'Webs con reservas, pedidos y citas para negocios del Alt Penedès.',
    contact: 'Contacto',
    legal: 'Legal',
    legalLinks: { notice: 'Aviso legal', privacy: 'Privacidad', cookies: 'Cookies' },
    made: 'Hecho en Pacs del Penedès',
  },
  whatsapp: {
    label: 'Escríbenos por WhatsApp',
    message: '¡Hola! Me interesa una web para mi negocio.',
  },
  legal: {
    notice: {
      title: 'Aviso legal',
      body: [
        'Titular del sitio web: {founder}. Domicilio: Pacs del Penedès (Barcelona). NIF: [PENDIENTE]. Correo electrónico: {email}.',
        'Este sitio web tiene carácter informativo y comercial. El uso del sitio implica la aceptación de estas condiciones.',
        'Los contenidos (textos, imágenes, código) son propiedad del titular o de terceros que han autorizado su uso y están protegidos por la legislación de propiedad intelectual.',
        'El titular no se hace responsable de los contenidos de sitios web de terceros enlazados desde este sitio.',
        'Normativa aplicable: Ley 34/2002 de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE) y Código de consumo de Cataluña.',
      ],
    },
    privacy: {
      title: 'Política de privacidad',
      body: [
        'Responsable del tratamiento: {founder}, Pacs del Penedès, {email}.',
        'Datos que tratamos: los que nos facilitas voluntariamente por WhatsApp, correo electrónico o formularios (nombre del negocio, teléfono, web actual). El formulario de este sitio no almacena datos: abre WhatsApp con un mensaje que tú decides enviar.',
        'Finalidad: responder a tu solicitud, preparar la auditoría y, si lo acordamos, prestar el servicio contratado. Base jurídica: consentimiento y ejecución de medidas precontractuales (art. 6.1.a y b RGPD).',
        'Conservación: mientras dure la relación y, después, los plazos legales aplicables.',
        'Destinatarios: no cedemos datos a terceros, salvo proveedores necesarios para prestar el servicio (alojamiento, mensajería) con contrato de encargado del tratamiento, y obligaciones legales.',
        'Derechos: puedes acceder, rectificar, suprimir, oponerte, limitar y portar tus datos escribiendo a {email}. También puedes reclamar ante la Autoritat Catalana de Protecció de Dades o la AEPD.',
      ],
    },
    cookies: {
      title: 'Política de cookies',
      body: [
        'Este sitio web no utiliza cookies de análisis, publicidad ni seguimiento. Solo puede utilizar almacenamiento técnico imprescindible para el funcionamiento del sitio (por ejemplo, recordar el idioma).',
        'Las demos enlazadas desde este sitio guardan en tu navegador (localStorage) las reservas de prueba que haces, solo para que puedas verlas. No se envían a ningún servidor.',
        'Si en el futuro incorporamos herramientas de análisis, actualizaremos esta política y te pediremos el consentimiento previo.',
      ],
    },
    back: 'Volver al inicio',
    updated: 'Última actualización',
  },
};
