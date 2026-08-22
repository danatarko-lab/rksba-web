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
    title: 'Rekordný rok batérií: čo je za virálnym číslom 5 → 267',
    excerpt:
      'Na sieťach koluje graf rastu batérií z 5 na 267. Čo presne porovnáva, čo naozaj rastie (112 GW v 2025, +48 %) a prečo pre firmy rozhoduje, na čom batéria zarába.',
    date: '24. 8. 2026',
    href: '/energetika/blog/rekordny-rok-baterii',
  },
  {
    category: 'Energy Memo',
    title: 'Batérie prišli aj k nám. Kedy sa firme oplatí úložisko?',
    excerpt:
      'V Novákoch spustili najväčšiu batériu na Slovensku (36 MW / 72 MWh). Kde je SK oproti Česku, koľko úložisko stojí a kedy dáva firme ekonomický zmysel.',
    date: '16. 8. 2026',
    href: '/energetika/blog/baterie-kedy-sa-oplati-firme',
  },
  {
    category: 'Energy Memo',
    title: 'Zatmenie Slnka a elektrina: prečo sieť nespadne',
    excerpt:
      'Dnešné zatmenie zníži výrobu solárov v Európe až o 9,7 GW. Prečo sieť nespadne, čo to znamená pre Slovensko a Česko a čo si z toho má odniesť firma.',
    date: '12. 8. 2026',
    href: '/energetika/blog/zatmenie-slnka-a-elektrina',
  },
  {
    category: 'Energy Memo',
    title: 'Európa rozdelila 2,5 miliardy na energetiku. Slovensko nedostalo nič. Prečo?',
    excerpt:
      'EÚ rozdelila 2,5 mld. eur z Modernizačného fondu, Slovensko v kole nebolo. Prečo, ako čerpáme oproti Česku (4 % vs 26 %) a čo si z toho má odniesť firma.',
    date: '10. 8. 2026',
    href: '/energetika/blog/modernizacny-fond-slovensko',
  },
  {
    category: 'Energy Memo',
    title: 'First Electrocontinent Ever. Čo znamená nový plán EÚ pre naše firmy?',
    excerpt:
      'Akčný plán EÚ pre elektrifikáciu chce do roku 2040 zdvihnúť podiel elektriny na konečnej spotrebe z 23 % na 46 %. Čo to znamená pre plánovanie energetických investícií v našich firmách.',
    date: '30. 7. 2026',
    href: '/energetika/blog/first-electrocontinent-plan-eu',
  },
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
    number: '#003',
    category: 'Newsletter',
    series: 'Potvrďte príjem',
    title: 'Viete, čo všetko o vašej firme prezrádza rádiové povolenie?',
    excerpt:
      'Dokument, ktorý väčšina firiem otvorí až vtedy, keď ho potrebuje. Čo prezrádza rádiové povolenie a kde požiadať o obnovu.',
    date: '4. 8. 2026',
    author: 'Vladimír Svatý',
    href: '/bezpecnostne-systemy-radiove-siete/newsletter/co-vsetko-prezradza-radiove-povolenie',
  },
  {
    number: '#002',
    category: 'Newsletter',
    series: 'Potvrďte príjem',
    title: 'História vysielačiek: od prvých rádiových vĺn po digitálne siete',
    excerpt:
      'Od Marconiho a Morseovej abecedy cez vojnové prenosné rádiá a analógovú éru až po digitálny štandard DMR. Prečo vysielačky nezmizli ani v ére smartfónov.',
    date: '16. 7. 2026',
    author: 'Vladimír Svatý',
    href: '/bezpecnostne-systemy-radiove-siete/newsletter/historia-vysielaciek',
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
    href: '/bezpecnostne-systemy-radiove-siete/newsletter/radiova-siet-funguje-v-akom-je-stave',
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
