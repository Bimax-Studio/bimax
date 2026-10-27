/**
 * Dati territoriali per le PMI delle città e zone coperte da BIMAX.
 */
export const TERRITORI = [
  {
    slug: 'verona',
    name: 'Verona Centro, ZAI & Comprensorio Urbano',
    shortName: 'Verona',
    badge: '📍 Sede & Hub Principale',
    tagline: 'Sviluppo web e strategie digitali concrete per le PMI e i professionisti di Verona.',
    description:
      'Nel cuore economico di Verona, dal centro storico alle aree industriali della ZAI e delle tangenziali, le piccole e medie imprese necessitano di strumenti digitali solidi e senza fronzoli. Non siamo solo sviluppatori: siamo partner strategici che impiegano la tecnologia per rendere la tua attività più visibile sul territorio, semplificare il contatto con i clienti e supportare la crescita commerciale.',
    sectors: [
      'Manifattura & Meccanica di Precisione',
      'Studi Professionali & Consulenza',
      'Artigianato Evoluto & Impiantistica',
      'Commercio & Servizi B2B',
    ],
    challenges:
      'Molte PMI veronesi hanno siti datati, lenti da smartphone o realizzati con template generici che non trasmettono la reale qualità aziendale. Mancano spesso tracciamenti per capire chi chiama e chi scrive, e la presenza su Google Maps è frammentata.',
    solution:
      'Realizziamo piattaforme snelle, progettate attorno agli obiettivi reali dell’impresa, connesse ai canali di contatto e ottimizzate per migliorare la visibilità locale senza promesse irrealistiche.',
    relatedProjectSlug: 'officine-meccaniche-scaligere',
    accent: '#FFD027',
  },
  {
    slug: 'lago-di-garda',
    name: 'Lago di Garda (Peschiera, Lazise, Bardolino, Desenzano)',
    shortName: 'Lago di Garda',
    badge: '🌊 Turismo & Accoglienza PMI',
    tagline: 'Piattaforme rapide e visibilità multicanale per le imprese ricettive e i servizi del Garda.',
    description:
      'Il bacino del Garda vive di una clientela dinamica, internazionale e costantemente connessa da smartphone. Per hotel boutique, noleggi, ristoranti, cantine ed esperienze sul lago, un sito che impiega più di due secondi a caricarsi significa prenotazioni perse a favore dei portali terzi.',
    sectors: [
      'Ospitalità, Relais & Boutique Hotel',
      'Noleggi Nautici & Tour Esperienziali',
      'Ristorazione Tipica & Wine Bar',
      'Studi Tecnici & Architettura del Paesaggio',
    ],
    challenges:
      'Troppa dipendenza dalle commissioni delle OTA (Booking, TripAdvisor) e siti con gallerie pesanti che bloccano la navigazione da cellulare proprio quando il turista cerca dove cenare o cosa fare.',
    solution:
      'Sviluppiamo piattaforme veloci da mobile, multilingua pulite, collegate direttamente a WhatsApp per richieste immediate e ottimizzate su Google Maps per intercettare chi cerca servizi sul lago.',
    relatedProjectSlug: 'studio-architettura-garda',
    accent: '#00C9A7',
  },
  {
    slug: 'valpolicella',
    name: 'Valpolicella (San Pietro in Cariano, Negrar, Marano)',
    shortName: 'Valpolicella',
    badge: '🍷 Cantine, Accoglienza & Territorio',
    tagline: 'Identità digitale solida e richieste dirette per cantine, agriturismi e PMI della Valpolicella.',
    description:
      'Dalle colline dei grandi vini ai laboratori artigianali e di lavorazione del marmo, la Valpolicella unisce tradizione e apertura internazionale. Aiutiamo le PMI del territorio a raccontarsi con autenticità e a trasformare l’interesse dei visitatori in prenotazioni di degustazioni, ordini e collaborazioni commerciali.',
    sectors: [
      'Cantine Vitivinicole & Wine Hospitality',
      'Agriturismi & Ristorazione di Territorio',
      'Lavorazione Marmo & Materiali Lapidei',
      'Servizi Tecnici & Consulenza Agronomica',
    ],
    challenges:
      'Spesso le cantine e le attività locali hanno siti vetrina statici, difficili da aggiornare in autonomia e senza un flusso semplice per prenotare una visita in cantina o inviare un messaggio WhatsApp.',
    solution:
      'Costruiamo siti leggeri con pannelli di gestione intuitivi per eventi e schede prodotto, integrando il tracciamento delle richieste e curando la presenza su Maps per chi transita nelle vallate.',
    relatedProjectSlug: 'relais-valpolicella',
    accent: '#FF8080',
  },
  {
    slug: 'villafranca',
    name: 'Villafranca di Verona & Pianura Scaligera',
    shortName: 'Villafranca',
    badge: '🏭 Logistica, Commercio & Impianti',
    tagline: 'Supporto tecnico e strategico per le attività commerciali e le imprese del polo di Villafranca.',
    description:
      'Snodo strategico tra la città di Verona, l’aeroporto Catullo e la pianura, Villafranca ospita un tessuto vitale di PMI commerciali, aziende di impiantistica, officine e distributori. La tecnologia deve essere uno strumento rapido che porta contatti concreti da clienti della zona.',
    sectors: [
      'Impiantistica Termoidraulica & Elettrica',
      'Officine Meccaniche & Automotive',
      'Distributori Commerciali & Forniture B2B',
      'Attività al Dettaglio & Servizi alla Persona',
    ],
    challenges:
      'Attività con un ottimo passaparola fisico ma una presenza online trascurata: schede Maps non rivendicate o orari errati, con clienti della zona che finiscono per rivolgersi ad altre ditte trovate su Google.',
    solution:
      'Riorganizziamo la presenza online: sito snello con pulsanti per chiamare o scrivere su WhatsApp con un tocco, scheda Google Business Profile allineata e tracciamento reale di telefonate e preventivi.',
    relatedProjectSlug: 'termoimpianti-verona',
    accent: '#845EC2',
  },
  {
    slug: 'san-bonifacio',
    name: 'San Bonifacio, Soave & Est Veronese',
    shortName: 'San Bonifacio',
    badge: '⚙️ Distretto Produttivo & Soave',
    tagline: 'Siti web snelli e visibilità territoriale per il distretto produttivo e vitivinicolo dell’est veronese.',
    description:
      'Il polo di San Bonifacio e delle vallate dell’est scaligero è caratterizzato da una densa operosità industriale, commerciale e vitivinicola (comprensorio del Soave). Supportiamo le imprese locali con piattaforme web costruite su misura per valorizzare il loro lavoro e generare contatti qualificati.',
    sectors: [
      'Carpenteria & Lavorazioni Industriali',
      'Cantine del Soave & Turismo Enogastronomico',
      'Logistica & Trasporti',
      'Studi Professionali & Consulenza Fiscale/Legale',
    ],
    challenges:
      'Siti aziendali vecchi di anni che non funzionano da mobile e non comunicano la solidità degli impianti e dei servizi, perdendo occasioni di contatto con buyer e partner industriali.',
    solution:
      'Piattaforme moderne con codice pulito, pagine dedicate ai servizi principali, geolocalizzazione chiara e tracciamenti precisi per capire da dove arrivano i clienti.',
    relatedProjectSlug: 'officine-meccaniche-scaligere',
    accent: '#2C73D2',
  },
  {
    slug: 'bussolengo',
    name: 'Bussolengo & Valdadige',
    shortName: 'Bussolengo',
    badge: '🌿 Garden, Servizi & Raccordo Lago',
    tagline: 'Strumenti digitali per le PMI commerciali, florovivaistiche e di servizi tra Verona e il Garda.',
    description:
      'Collocato strategicamente lungo la direttrice tra Verona e il lago, Bussolengo è un centro vivace per grandi garden center, attività florovivaistiche, concessionari e artigiani. Le persone cercano spesso informazioni pratiche rapide: orari, disponibilità e contatti diretti.',
    sectors: [
      'Garden Center & Florovivaismo',
      'Concessionari & Riparazioni Auto/Moto',
      'Artigiani, Fabbri & Falegnami',
      'Servizi Sanitari & Polispecialistici Privati',
    ],
    challenges:
      'Informazioni sparse su vecchi profili social non gestiti, orari di apertura non aggiornati su Google Maps e siti lenti che non rispondono subito all’esigenza immediata dell’utente.',
    solution:
      'Strutture web veloci e schematiche, studiate per chi naviga da smartphone in auto o da casa, con click-to-call, WhatsApp diretto e posizionamento geolocalizzato accurato.',
    relatedProjectSlug: 'termoimpianti-verona',
    accent: '#FFD027',
  },
];

export function getTerritorio(slug) {
  return TERRITORI.find((t) => t.slug === slug);
}
