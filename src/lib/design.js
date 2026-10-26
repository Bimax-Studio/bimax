/**
 * Client-safe design tokens. Keep in sync with the `:root` declarations in
 * `src/styles/global.css`.
 * Eccentric, Colorful & Human Edition: flat 2D pop, cheerful vectors, friendly stickers.
 */
export const ACCENTS = {
  solar: {
    label: 'Corallo Pop',
    hint: 'Corallo energetico e caloroso',
    hex: '#D63914',
    ink: '#1A1A1A',
    soft: '#FFE8E2',
    contrast: '#FFFFFF',
  },
  acid: {
    label: 'Verde Menta',
    hint: 'Menta fresca e brillante',
    hex: '#00C9A7',
    ink: '#064E3B',
    soft: '#DFF9F4',
    contrast: '#042F2E',
  },
  ink: {
    label: 'Giallo Sole',
    hint: 'Giallo vivace e solare',
    hex: '#FFD027',
    ink: '#1A1A1A',
    soft: '#FFF5CF',
    contrast: '#1A1A1A',
  },
};

export const ACCENT_KEYS = Object.keys(ACCENTS);

/**
 * Resolves a root-relative path against import.meta.env.BASE_URL.
 * Useful for deployments under subpaths (like GitHub Pages /<repo>/).
 */
export function basePath(path = '') {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return clean === '/' ? (base ? `${base}/` : '/') : `${base}${clean}`;
}

export function isAccent(value) {
  return Object.hasOwn(ACCENTS, value);
}

export function accentStyle(accent) {
  const token = ACCENTS[accent] ?? ACCENTS.solar;
  return [
    `--accent:${token.hex}`,
    `--accent-ink:${token.ink}`,
    `--accent-soft:${token.soft}`,
    `--accent-contrast:${token.contrast}`,
  ].join(';');
}

export const SITE = {
  name: 'BIMAX',
  legalName: 'BIMAX — Sviluppo Web Umano a Verona',
  tagline: 'Siti web veloci e pronti a convertire per le imprese di Verona e provincia.',
  description:
    'Sviluppiamo piattaforme snelle, ottimizzate per la ricerca locale su Google e collegate ai tuoi canali pubblicitari per trasformare le visite in chiamate e contatti reali.',
  email: 'info@bimax.studio',
  phone: '+39 045 800 1234',
  phoneRaw: '+390458001234',
  whatsapp: '+39 340 123 4567',
  whatsappRaw: '393401234567',
  whatsappUrl:
    'https://wa.me/393401234567?text=Ciao%20BIMAX%2C%20vorrei%20richiedere%20un%20audit%20gratuito%20del%20nostro%20sito%20web%20%28ho%20visto%20le%20mascotte%21%29.',
  city: 'Verona, Italia',
  province: 'Verona e provincia',
  address: 'Corso Porta Nuova 11, 37122 Verona',
  founded: 2019,
  guarantees: [
    {
      title: 'Prestazioni garantite su smartphone',
      description: 'Il tuo sito si apre in un lampo da cellulare. I tuoi clienti non scappano stufi di aspettare.',
      icon: 'smartphone',
      badgeColor: 'bg-[#FFD027]',
      mascot: 'speedy',
    },
    {
      title: 'Presenza su Google Maps & scheda locale',
      description: 'Fatti trovare quando chi abita a Verona, sul Garda o in provincia cerca esattamente ciò che offri.',
      icon: 'map-pin',
      badgeColor: 'bg-[#00C9A7]',
      mascot: 'scout',
    },
    {
      title: 'Tracciamento reale di contatti e telefonate',
      description: 'Vedi esattamente quante persone cliccano su WhatsApp, chiamano o chiedono preventivo. Zero favole.',
      icon: 'activity',
      badgeColor: 'bg-[#845EC2] text-white',
      mascot: 'whatsapp-buddy',
    },
    {
      title: 'Un unico referente tecnico diretto a Verona',
      description: 'Parli con noi che scriviamo il codice e curiamo i sistemi. Nessun venditore, nessun call center.',
      icon: 'shield-check',
      badgeColor: 'bg-[#D63914] text-white',
      mascot: 'coder',
    },
  ],
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'WhatsApp', href: 'https://wa.me/393401234567' },
    { label: 'Google Maps', href: 'https://maps.google.com' },
  ],
};
