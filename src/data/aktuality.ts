// Jednotny zdroj clankov pre listovacie stranky (Energy Memo, Newsletter) aj pre
// domovsku stranku, ktora z toho berie najnovsi clanok z kazdej vetvy biznisu.
// Typograficke pomlcky su nahradene obycajnou interpunkciou, slova su nezmenene.

export type Post = {
  category: string;
  title: string;
  excerpt: string;
  date: string; // format "d. m. yyyy"
  href: string;
  number?: string;
  series?: string;
  author?: string;
};

// Vetva Energetika (Energy Memo)
export const energyMemo: Post[] = [
  {
    category: 'Energy Memo',
    title: 'Budúcnosť firemnej energetiky: 10 trendov z konferencie v Mníchove',
    excerpt:
      'Grid congestion, revenue stacking, co-location, EMS, agentic AI a ďalšie, 10 trendov, ktoré menia ekonomiku firemnej energetiky.',
    date: '30. 6. 2026',
    href: '/energetika/blog/sesfg-mnichov-2026',
  },
  {
    category: 'Energy Memo',
    title: 'Batéria za babku, hodnota inde: čo Intersolar 2026 ukázal o budúcnosti energetiky',
    excerpt:
      'Energy Memo z Intersolaru v Mníchove, batéria zlacnela na približne 133 EUR/kWh, hodnota sa presúva do softvéru, EMS a flexibility. Čo si má odniesť firma v SK a CZ.',
    date: '26. 6. 2026',
    href: '/energetika/blog/intersolar-2026-bateria-za-babku',
  },
  {
    category: 'Energy Memo',
    title: 'SAPI konferencia 2026: 5 trendov, ktoré menia budúcnosť firemnej energetiky',
    excerpt:
      'Päť trendov z konferencie SAPI 2026 a čo znamenajú pre firmy, dáta, EMS, batériové úložiská, flexibilita a vlastná spotreba.',
    date: '1. 6. 2026',
    href: '/energetika/blog/boli-sme-na-sapi-konferencii',
  },
];

// Vetva Bezpecnostne systemy a radiove siete (Newsletter)
export const newsletter: Post[] = [
  {
    number: '#002',
    category: 'Newsletter',
    series: 'Potvrďte príjem',
    title: 'Viete, čo všetko o vašej firme prezrádza rádiové povolenie?',
    excerpt:
      'Dokument, ktorý väčšina firiem otvorí až vtedy, keď ho potrebuje. Čo prezrádza rádiové povolenie a kde požiadať o obnovu.',
    date: '16. 7. 2026',
    author: 'Vladimír Svatý',
    href: '/radiokomunikacie/newsletter/co-vsetko-prezradza-radiove-povolenie',
  },
  {
    number: '#001',
    category: 'Newsletter',
    series: 'Potvrďte príjem',
    title: 'Rádiová sieť funguje. Ale viete, v akom je stave?',
    excerpt:
      'To, že komunikačný systém funguje dnes, ešte neznamená, že poznáte jeho skutočný stav. Pozdrav od riaditeľa.',
    date: '2. 7. 2026',
    author: 'Vladimír Svatý',
    href: '/radiokomunikacie/newsletter/radiova-siet-funguje-v-akom-je-stave',
  },
];

// Datum "d. m. yyyy" na porovnatelne cislo yyyymmdd.
export function parseSkDate(d: string): number {
  const [dd, mm, yyyy] = d.split('.').map((x) => parseInt(x.trim(), 10));
  return yyyy * 10000 + mm * 100 + dd;
}

// Najnovsi clanok zo zoznamu podla datumu.
export function newest(posts: Post[]): Post {
  return [...posts].sort((a, b) => parseSkDate(b.date) - parseSkDate(a.date))[0];
}

// Prva veta textu (po prvu bodku, vykricnik alebo otaznik).
export function firstSentence(text: string): string {
  const m = text.match(/^(.*?[.!?])(\s|$)/);
  return (m ? m[1] : text).trim();
}
