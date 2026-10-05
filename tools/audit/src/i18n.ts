import type { Category, CheckStatus, Lang } from './types';

/** Texto por estado; si falta uno, se usa el más cercano (ver checks.ts). */
interface CheckText {
  title: string;
  pass: string;
  warn?: string;
  fail?: string;
  info?: string;
}

export interface AuditDict {
  report: {
    title: string;
    subtitle: string;
    business: string;
    url: string;
    date: string;
    scoreLabel: string;
    tiers: { excellent: string; good: string; fair: string; poor: string };
    categories: Record<Category, string>;
    findings: string;
    recommendations: string;
    recommendationsIntro: string;
    nextStep: string;
    nextStepBody: string;
    psiTitle: string;
    psiBody: string;
    unreachableTitle: string;
    unreachableBody: string;
    status: Record<CheckStatus, string>;
    footer: string;
    page: string;
  };
  checks: Record<string, CheckText>;
}

const ca: AuditDict = {
  report: {
    title: 'Auditoria de presència web',
    subtitle: 'Com et veuen (o no et veuen) els clients que et busquen des del mòbil',
    business: 'Negoci',
    url: 'Web analitzada',
    date: 'Data',
    scoreLabel: 'Puntuació global',
    tiers: { excellent: 'Molt bé', good: 'Bé, amb marge de millora', fair: 'Fluix: estàs perdent clients', poor: 'Crític: la web no treballa per tu' },
    categories: {
      visibility: 'Visibilitat a Google',
      mobile: 'Mòbil i velocitat',
      conversion: 'Reserves, comandes i contacte',
      languages: 'Idiomes',
      legal: 'Normativa',
      trust: 'Confiança',
    },
    findings: 'Què hem trobat',
    recommendations: 'Què faríem primer',
    recommendationsIntro: 'Les cinc millores amb més impacte per al teu negoci, en ordre.',
    nextStep: 'Següent pas: la maqueta de la teva web, gratis',
    nextStepBody:
      'En 48 h et passem una maqueta de com quedaria la teva web amb reserves o comandes en línia, en català, castellà i anglès. Sense compromís.',
    psiTitle: 'Rendiment al mòbil (Google PageSpeed)',
    psiBody: 'Puntuació de 0 a 100 segons Google. Per sota de 50, la majoria de visitants marxen abans que la pàgina carregui.',
    unreachableTitle: 'No hem pogut carregar la web',
    unreachableBody: 'La pàgina no respon o no existeix. Si un client la busca des del mòbil, veu un error. Això és el primer que cal arreglar.',
    status: { pass: 'Correcte', warn: 'Millorable', fail: 'Problema', info: 'Informació' },
    footer: 'Obrim · Webs amb reserves, comandes i cites per a negocis de barri · obrim.cat',
    page: 'Pàgina',
  },
  checks: {
    reachable: { title: 'La web respon', pass: 'La pàgina carrega correctament.', fail: 'No es pot carregar: {value}.' },
    https: { title: 'Connexió segura (HTTPS)', pass: 'La web redirigeix a https i mostra el cadenat.', fail: 'La web es carrega sense xifrar. Chrome la marca com a «No segura».' },
    title: { title: 'Títol de la pàgina', pass: '«{value}»', warn: 'El títol existeix però és massa curt o massa llarg: «{value}».', fail: 'No hi ha títol. És el text que surt a Google i a la pestanya del navegador.' },
    description: { title: 'Descripció per a Google', pass: 'Hi ha una descripció de {value} caràcters.', warn: 'La descripció té {value} caràcters; l’ideal són entre 70 i 160.', fail: 'No hi ha descripció. Google n’inventa una, sovint poc atractiva.' },
    h1: { title: 'Encapçalament principal', pass: 'Un sol encapçalament principal: «{value}».', warn: 'Hi ha {value} encapçalaments principals; n’hi hauria d’haver un.', fail: 'No hi ha cap encapçalament principal (H1).' },
    canonical: { title: 'URL canònica', pass: 'Definida.', fail: 'No definida. Pot fer que Google vegi la mateixa pàgina duplicada.' },
    og: { title: 'Previsualització en xarxes i WhatsApp', pass: 'Quan algú comparteix la web, surt títol i imatge.', fail: 'Sense etiquetes Open Graph: en compartir l’enllaç per WhatsApp no surt cap previsualització.' },
    schema: { title: 'Dades estructurades per a Google', pass: 'Google entén que ets un negoci local ({value}).', fail: 'Sense dades estructurades. Google no pot mostrar horaris, valoracions o botó de reserva directament als resultats.' },
    noindex: { title: 'Indexable per Google', pass: 'La pàgina es pot indexar.', fail: 'La pàgina diu a Google que NO la indexi. No sortiràs als resultats.' },
    favicon: { title: 'Icona del lloc', pass: 'Definida.', warn: 'Sense icona: a la pestanya i als favorits surt un símbol genèric.' },
    viewport: { title: 'Adaptada al mòbil', pass: 'La pàgina s’adapta a la pantalla del mòbil.', fail: 'Sense configuració mòbil: al telèfon es veu en miniatura i cal fer zoom. Més de la meitat de les visites són des del mòbil.' },
    ttfb: { title: 'Temps de resposta del servidor', pass: '{value} ms.', warn: '{value} ms. Un servidor lent fa que tot sembli més lent.', fail: '{value} ms. El servidor triga massa a respondre.' },
    total: { title: 'Temps de descàrrega de la pàgina', pass: '{value} ms.', warn: '{value} ms.', fail: '{value} ms. Molts visitants marxen abans que carregui.' },
    size: { title: 'Pes de la pàgina', pass: '{value} KB d’HTML.', warn: '{value} KB d’HTML: és pesat per a una connexió mòbil.' },
    scripts: { title: 'Scripts externs', pass: '{value} scripts.', warn: '{value} scripts. Cada script frena la càrrega al mòbil.' },
    imgAlt: { title: 'Imatges amb text alternatiu', pass: 'Totes les imatges tenen descripció.', warn: '{value} imatges sense descripció. Google no sap què mostren i les persones cegues tampoc.' },
    legacyTech: { title: 'Tecnologia', pass: 'No hem detectat tecnologia obsoleta.', warn: 'Detectat: {value}. Sol implicar lentitud, problemes de seguretat o dependència d’un proveïdor.' },
    psi: { title: 'Rendiment al mòbil (Google)', pass: '{value}/100.', warn: '{value}/100. Es pot millorar molt.', fail: '{value}/100. La pàgina és lenta al mòbil.', info: 'No disponible.' },
    booking: {
      title: 'Reservar, demanar o agafar cita en línia',
      pass: 'El client pot reservar o demanar directament a la web.',
      warn: 'Les reserves passen per una plataforma externa ({value}) que cobra comissió i es queda les dades del client.',
      fail: 'No es pot reservar, demanar ni agafar cita des de la web. El client ha de trucar, i a les 23 h ningú contesta.',
    },
    phone: { title: 'Telèfon clicable', pass: 'Es pot trucar amb un toc.', fail: 'El telèfon no és clicable (o no hi és). Al mòbil, cada pas de més és un client menys.' },
    whatsapp: { title: 'Botó de WhatsApp', pass: 'Hi ha enllaç directe a WhatsApp.', fail: 'Sense WhatsApp. És el canal preferit de la majoria de clients a Espanya.' },
    form: { title: 'Formulari de contacte', pass: 'Hi ha formulari.', warn: 'Sense formulari de contacte.' },
    maps: { title: 'Mapa o enllaç a Google Maps', pass: 'El client pot obrir la ubicació al mapa.', warn: 'Sense mapa ni enllaç a Google Maps.' },
    hours: { title: 'Horari visible', pass: 'L’horari és a la pàgina.', warn: 'No hem trobat l’horari. És una de les coses que més es busquen.' },
    htmlLang: { title: 'Idioma declarat', pass: 'Idioma declarat: {value}.', fail: 'La pàgina no declara l’idioma. Google i els traductors automàtics han d’endevinar-lo.' },
    languages: { title: 'Versions en diversos idiomes', pass: 'Disponible en {value}.', warn: 'Només hem detectat un idioma ({value}). Barcelona rep 16 milions de turistes l’any.', fail: 'No s’ha detectat cap selector d’idioma.' },
    catalan: { title: 'Versió en català', pass: 'La web té contingut en català.', fail: 'No hi ha versió en català. El Codi de consum exigeix la informació essencial com a mínim en català, i molta clientela ho valora.' },
    privacy: { title: 'Política de privacitat', pass: 'Enllaçada.', fail: 'No trobada. Obligatòria (RGPD) si hi ha qualsevol formulari o analítica.' },
    legalNotice: { title: 'Avís legal', pass: 'Enllaçat.', fail: 'No trobat. Obligatori per a qualsevol web d’empresa (LSSI).' },
    cookies: { title: 'Informació sobre cookies', pass: 'Hi ha política o avís de cookies.', warn: 'No trobada. Si la web fa servir analítica o mapes incrustats, cal.' },
    complaints: { title: 'Fulls oficials de reclamació', pass: 'S’hi fa referència.', info: 'A Catalunya es poden posar a disposició a la web; és un detall que dona confiança.' },
    copyright: { title: 'Any del peu de pàgina', pass: 'Actualitzat ({value}).', warn: 'El peu diu «{value}». Fa pensar que la web està abandonada.' },
    social: { title: 'Xarxes socials', pass: 'Enllaços a {value}.', warn: 'Sense enllaços a Instagram ni altres xarxes.' },
    mixedContent: { title: 'Recursos insegurs', pass: 'Tots els recursos es carreguen per https.', warn: '{value} recursos es carreguen per http dins d’una pàgina segura; el navegador pot bloquejar-los.' },
  },
};

const es: AuditDict = {
  report: {
    title: 'Auditoría de presencia web',
    subtitle: 'Cómo te ven (o no te ven) los clientes que te buscan desde el móvil',
    business: 'Negocio',
    url: 'Web analizada',
    date: 'Fecha',
    scoreLabel: 'Puntuación global',
    tiers: { excellent: 'Muy bien', good: 'Bien, con margen de mejora', fair: 'Flojo: estás perdiendo clientes', poor: 'Crítico: la web no trabaja para ti' },
    categories: {
      visibility: 'Visibilidad en Google',
      mobile: 'Móvil y velocidad',
      conversion: 'Reservas, pedidos y contacto',
      languages: 'Idiomas',
      legal: 'Normativa',
      trust: 'Confianza',
    },
    findings: 'Qué hemos encontrado',
    recommendations: 'Qué haríamos primero',
    recommendationsIntro: 'Las cinco mejoras con más impacto para tu negocio, en orden.',
    nextStep: 'Siguiente paso: la maqueta de tu web, gratis',
    nextStepBody:
      'En 48 h te pasamos una maqueta de cómo quedaría tu web con reservas o pedidos online, en catalán, castellano e inglés. Sin compromiso.',
    psiTitle: 'Rendimiento en el móvil (Google PageSpeed)',
    psiBody: 'Puntuación de 0 a 100 según Google. Por debajo de 50, la mayoría de visitantes se va antes de que cargue la página.',
    unreachableTitle: 'No hemos podido cargar la web',
    unreachableBody: 'La página no responde o no existe. Si un cliente la busca desde el móvil, ve un error. Es lo primero que hay que arreglar.',
    status: { pass: 'Correcto', warn: 'Mejorable', fail: 'Problema', info: 'Información' },
    footer: 'Obrim · Webs con reservas, pedidos y citas para negocios de barrio · obrim.cat',
    page: 'Página',
  },
  checks: {
    reachable: { title: 'La web responde', pass: 'La página carga correctamente.', fail: 'No se puede cargar: {value}.' },
    https: { title: 'Conexión segura (HTTPS)', pass: 'La web redirige a https y muestra el candado.', fail: 'La web se carga sin cifrar. Chrome la marca como «No segura».' },
    title: { title: 'Título de la página', pass: '«{value}»', warn: 'El título existe pero es demasiado corto o largo: «{value}».', fail: 'No hay título. Es el texto que sale en Google y en la pestaña del navegador.' },
    description: { title: 'Descripción para Google', pass: 'Hay una descripción de {value} caracteres.', warn: 'La descripción tiene {value} caracteres; lo ideal son entre 70 y 160.', fail: 'No hay descripción. Google se inventa una, a menudo poco atractiva.' },
    h1: { title: 'Encabezado principal', pass: 'Un solo encabezado principal: «{value}».', warn: 'Hay {value} encabezados principales; debería haber uno.', fail: 'No hay encabezado principal (H1).' },
    canonical: { title: 'URL canónica', pass: 'Definida.', fail: 'No definida. Puede hacer que Google vea la misma página duplicada.' },
    og: { title: 'Previsualización en redes y WhatsApp', pass: 'Al compartir la web salen título e imagen.', fail: 'Sin etiquetas Open Graph: al compartir el enlace por WhatsApp no sale ninguna previsualización.' },
    schema: { title: 'Datos estructurados para Google', pass: 'Google entiende que eres un negocio local ({value}).', fail: 'Sin datos estructurados. Google no puede mostrar horarios, valoraciones o botón de reserva en los resultados.' },
    noindex: { title: 'Indexable por Google', pass: 'La página se puede indexar.', fail: 'La página le dice a Google que NO la indexe. No saldrás en los resultados.' },
    favicon: { title: 'Icono del sitio', pass: 'Definido.', warn: 'Sin icono: en la pestaña y en favoritos sale un símbolo genérico.' },
    viewport: { title: 'Adaptada al móvil', pass: 'La página se adapta a la pantalla del móvil.', fail: 'Sin configuración móvil: en el teléfono se ve en miniatura y hay que hacer zoom. Más de la mitad de las visitas son desde el móvil.' },
    ttfb: { title: 'Tiempo de respuesta del servidor', pass: '{value} ms.', warn: '{value} ms. Un servidor lento hace que todo parezca más lento.', fail: '{value} ms. El servidor tarda demasiado en responder.' },
    total: { title: 'Tiempo de descarga de la página', pass: '{value} ms.', warn: '{value} ms.', fail: '{value} ms. Muchos visitantes se van antes de que cargue.' },
    size: { title: 'Peso de la página', pass: '{value} KB de HTML.', warn: '{value} KB de HTML: es pesado para una conexión móvil.' },
    scripts: { title: 'Scripts externos', pass: '{value} scripts.', warn: '{value} scripts. Cada script frena la carga en el móvil.' },
    imgAlt: { title: 'Imágenes con texto alternativo', pass: 'Todas las imágenes tienen descripción.', warn: '{value} imágenes sin descripción. Google no sabe qué muestran y las personas ciegas tampoco.' },
    legacyTech: { title: 'Tecnología', pass: 'No hemos detectado tecnología obsoleta.', warn: 'Detectado: {value}. Suele implicar lentitud, problemas de seguridad o dependencia de un proveedor.' },
    psi: { title: 'Rendimiento en el móvil (Google)', pass: '{value}/100.', warn: '{value}/100. Se puede mejorar mucho.', fail: '{value}/100. La página es lenta en el móvil.', info: 'No disponible.' },
    booking: {
      title: 'Reservar, pedir o coger cita online',
      pass: 'El cliente puede reservar o pedir directamente en la web.',
      warn: 'Las reservas pasan por una plataforma externa ({value}) que cobra comisión y se queda los datos del cliente.',
      fail: 'No se puede reservar, pedir ni coger cita desde la web. El cliente tiene que llamar, y a las 23 h nadie contesta.',
    },
    phone: { title: 'Teléfono clicable', pass: 'Se puede llamar con un toque.', fail: 'El teléfono no es clicable (o no está). En el móvil, cada paso de más es un cliente menos.' },
    whatsapp: { title: 'Botón de WhatsApp', pass: 'Hay enlace directo a WhatsApp.', fail: 'Sin WhatsApp. Es el canal preferido de la mayoría de clientes en España.' },
    form: { title: 'Formulario de contacto', pass: 'Hay formulario.', warn: 'Sin formulario de contacto.' },
    maps: { title: 'Mapa o enlace a Google Maps', pass: 'El cliente puede abrir la ubicación en el mapa.', warn: 'Sin mapa ni enlace a Google Maps.' },
    hours: { title: 'Horario visible', pass: 'El horario está en la página.', warn: 'No hemos encontrado el horario. Es una de las cosas que más se buscan.' },
    htmlLang: { title: 'Idioma declarado', pass: 'Idioma declarado: {value}.', fail: 'La página no declara el idioma. Google y los traductores automáticos tienen que adivinarlo.' },
    languages: { title: 'Versiones en varios idiomas', pass: 'Disponible en {value}.', warn: 'Solo hemos detectado un idioma ({value}). Barcelona recibe 16 millones de turistas al año.', fail: 'No se ha detectado ningún selector de idioma.' },
    catalan: { title: 'Versión en catalán', pass: 'La web tiene contenido en catalán.', fail: 'No hay versión en catalán. El Código de consumo exige la información esencial al menos en catalán, y mucha clientela lo valora.' },
    privacy: { title: 'Política de privacidad', pass: 'Enlazada.', fail: 'No encontrada. Obligatoria (RGPD) si hay cualquier formulario o analítica.' },
    legalNotice: { title: 'Aviso legal', pass: 'Enlazado.', fail: 'No encontrado. Obligatorio para cualquier web de empresa (LSSI).' },
    cookies: { title: 'Información sobre cookies', pass: 'Hay política o aviso de cookies.', warn: 'No encontrada. Si la web usa analítica o mapas incrustados, hace falta.' },
    complaints: { title: 'Hojas oficiales de reclamación', pass: 'Se hace referencia.', info: 'En Cataluña se pueden poner a disposición en la web; es un detalle que da confianza.' },
    copyright: { title: 'Año del pie de página', pass: 'Actualizado ({value}).', warn: 'El pie dice «{value}». Hace pensar que la web está abandonada.' },
    social: { title: 'Redes sociales', pass: 'Enlaces a {value}.', warn: 'Sin enlaces a Instagram ni otras redes.' },
    mixedContent: { title: 'Recursos inseguros', pass: 'Todos los recursos se cargan por https.', warn: '{value} recursos se cargan por http dentro de una página segura; el navegador puede bloquearlos.' },
  },
};

const en: AuditDict = {
  report: {
    title: 'Web presence audit',
    subtitle: 'How customers searching on their phone see you (or do not)',
    business: 'Business',
    url: 'Website analysed',
    date: 'Date',
    scoreLabel: 'Overall score',
    tiers: { excellent: 'Very good', good: 'Good, with room to improve', fair: 'Weak: you are losing customers', poor: 'Critical: the website is not working for you' },
    categories: {
      visibility: 'Visibility on Google',
      mobile: 'Mobile and speed',
      conversion: 'Bookings, orders and contact',
      languages: 'Languages',
      legal: 'Compliance',
      trust: 'Trust',
    },
    findings: 'What we found',
    recommendations: 'What we would do first',
    recommendationsIntro: 'The five improvements with the biggest impact on your business, in order.',
    nextStep: 'Next step: a free mockup of your website',
    nextStepBody:
      'Within 48 h we send you a mockup of your website with online bookings or orders, in Catalan, Spanish and English. No strings attached.',
    psiTitle: 'Mobile performance (Google PageSpeed)',
    psiBody: 'Score from 0 to 100 according to Google. Below 50, most visitors leave before the page loads.',
    unreachableTitle: 'We could not load the website',
    unreachableBody: 'The page does not respond or does not exist. A customer searching on their phone sees an error. This is the first thing to fix.',
    status: { pass: 'OK', warn: 'Could be better', fail: 'Problem', info: 'Info' },
    footer: 'Obrim · Websites with bookings, orders and appointments for local businesses · obrim.cat',
    page: 'Page',
  },
  checks: {
    reachable: { title: 'Website responds', pass: 'The page loads correctly.', fail: 'Cannot load: {value}.' },
    https: { title: 'Secure connection (HTTPS)', pass: 'The site redirects to https and shows the padlock.', fail: 'The site loads unencrypted. Chrome flags it as "Not secure".' },
    title: { title: 'Page title', pass: '"{value}"', warn: 'The title exists but is too short or too long: "{value}".', fail: 'No title. This is the text shown on Google and in the browser tab.' },
    description: { title: 'Description for Google', pass: 'There is a {value}-character description.', warn: 'The description is {value} characters; 70–160 is ideal.', fail: 'No description. Google makes one up, often unappealing.' },
    h1: { title: 'Main heading', pass: 'One main heading: "{value}".', warn: 'There are {value} main headings; there should be one.', fail: 'No main heading (H1).' },
    canonical: { title: 'Canonical URL', pass: 'Defined.', fail: 'Not defined. Google may see the same page as duplicated.' },
    og: { title: 'Preview on social media and WhatsApp', pass: 'Sharing the site shows a title and image.', fail: 'No Open Graph tags: sharing the link on WhatsApp shows no preview.' },
    schema: { title: 'Structured data for Google', pass: 'Google understands you are a local business ({value}).', fail: 'No structured data. Google cannot show opening hours, ratings or a booking button in results.' },
    noindex: { title: 'Indexable by Google', pass: 'The page can be indexed.', fail: 'The page tells Google NOT to index it. You will not appear in results.' },
    favicon: { title: 'Site icon', pass: 'Defined.', warn: 'No icon: the tab and bookmarks show a generic symbol.' },
    viewport: { title: 'Mobile friendly', pass: 'The page adapts to the phone screen.', fail: 'No mobile configuration: on a phone it appears tiny and needs zooming. Over half of visits come from phones.' },
    ttfb: { title: 'Server response time', pass: '{value} ms.', warn: '{value} ms. A slow server makes everything feel slower.', fail: '{value} ms. The server takes too long to respond.' },
    total: { title: 'Page download time', pass: '{value} ms.', warn: '{value} ms.', fail: '{value} ms. Many visitors leave before it loads.' },
    size: { title: 'Page weight', pass: '{value} KB of HTML.', warn: '{value} KB of HTML: heavy for a mobile connection.' },
    scripts: { title: 'External scripts', pass: '{value} scripts.', warn: '{value} scripts. Each one slows down loading on mobile.' },
    imgAlt: { title: 'Images with alternative text', pass: 'All images have a description.', warn: '{value} images without description. Google does not know what they show, and neither do blind users.' },
    legacyTech: { title: 'Technology', pass: 'No outdated technology detected.', warn: 'Detected: {value}. Usually means slowness, security issues or vendor lock-in.' },
    psi: { title: 'Mobile performance (Google)', pass: '{value}/100.', warn: '{value}/100. Plenty of room to improve.', fail: '{value}/100. The page is slow on mobile.', info: 'Not available.' },
    booking: {
      title: 'Book, order or get an appointment online',
      pass: 'Customers can book or order directly on the website.',
      warn: 'Bookings go through an external platform ({value}) that charges commission and keeps the customer data.',
      fail: 'No way to book, order or get an appointment from the website. Customers must call, and nobody answers at 11 pm.',
    },
    phone: { title: 'Tappable phone number', pass: 'One tap to call.', fail: 'The phone number is not tappable (or missing). On mobile, every extra step is one fewer customer.' },
    whatsapp: { title: 'WhatsApp button', pass: 'Direct WhatsApp link present.', fail: 'No WhatsApp. It is the preferred channel for most customers in Spain.' },
    form: { title: 'Contact form', pass: 'Form present.', warn: 'No contact form.' },
    maps: { title: 'Map or Google Maps link', pass: 'Customers can open the location on a map.', warn: 'No map or Google Maps link.' },
    hours: { title: 'Opening hours visible', pass: 'Opening hours are on the page.', warn: 'Opening hours not found. One of the most searched-for details.' },
    htmlLang: { title: 'Declared language', pass: 'Declared language: {value}.', fail: 'The page does not declare its language. Google and automatic translators must guess.' },
    languages: { title: 'Versions in several languages', pass: 'Available in {value}.', warn: 'Only one language detected ({value}). Barcelona welcomes 16 million tourists a year.', fail: 'No language switcher detected.' },
    catalan: { title: 'Catalan version', pass: 'The site has Catalan content.', fail: 'No Catalan version. The Consumer Code requires essential information at least in Catalan, and many customers value it.' },
    privacy: { title: 'Privacy policy', pass: 'Linked.', fail: 'Not found. Mandatory (GDPR) with any form or analytics.' },
    legalNotice: { title: 'Legal notice', pass: 'Linked.', fail: 'Not found. Mandatory for any business website (LSSI).' },
    cookies: { title: 'Cookie information', pass: 'Cookie policy or notice present.', warn: 'Not found. Needed if the site uses analytics or embedded maps.' },
    complaints: { title: 'Official complaint forms', pass: 'Referenced.', info: 'In Catalonia they can be made available on the website; a detail that builds trust.' },
    copyright: { title: 'Footer year', pass: 'Up to date ({value}).', warn: 'The footer says "{value}". It suggests the site is abandoned.' },
    social: { title: 'Social media', pass: 'Links to {value}.', warn: 'No links to Instagram or other networks.' },
    mixedContent: { title: 'Insecure resources', pass: 'All resources load over https.', warn: '{value} resources load over http inside a secure page; the browser may block them.' },
  },
};

const DICTS: Record<Lang, AuditDict> = { ca, es, en };

export function dictFor(lang: Lang): AuditDict {
  return DICTS[lang];
}

export function fill(template: string, value: string | number | undefined): string {
  return template.replace('{value}', value === undefined ? '' : String(value));
}
