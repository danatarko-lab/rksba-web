import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Bezpečnostné systémy a rádiové siete',
      links: [
        {
          text: 'Bezpečnostné systémy',
          links: [
            {
              text: 'Autonómne systémy varovania',
              href: getPermalink('/radiokomunikacie/systemove-riesenia/autonomne-systemy-varovania'),
            },
            {
              text: 'Evakuačný rozhlas a ozvučenie',
              href: getPermalink('/radiokomunikacie/systemove-riesenia/evakuacny-rozhlas'),
            },
          ],
        },
        {
          text: 'Rádiové siete',
          links: [
            { text: 'Rádiové siete', href: getPermalink('/radiokomunikacie/systemove-riesenia/radiove-siete') },
            { text: 'Návrh rádiových sietí', href: getPermalink('/radiokomunikacie/sluzby/navrh-radiovych-sieti') },
            { text: 'Audit rádiových sietí', href: getPermalink('/radiokomunikacie/sluzby/audit-sieti') },
            { text: 'Digitalizácia sietí', href: getPermalink('/radiokomunikacie/sluzby/digitalizacia-sieti') },
          ],
        },
        {
          text: 'Služby',
          links: [
            {
              text: 'Projekty elektrických zariadení',
              href: getPermalink('/radiokomunikacie/sluzby/projekty-elektrickych-zariadeni'),
            },
            { text: 'Elektroinštalačné práce', href: getPermalink('/radiokomunikacie/sluzby/elektroinstalacne-prace') },
            { text: 'Servis rádiostaníc', href: getPermalink('/radiokomunikacie/sluzby/servis-radiostanic') },
            { text: 'Prenájom rádiostaníc', href: getPermalink('/radiokomunikacie/sluzby/prenajom-radiostanic') },
            { text: 'Základné informácie', href: getPermalink('/radiokomunikacie/sluzby/zakladne-informacie') },
          ],
        },
        {
          text: 'Produkty',
          links: [
            { text: 'Rádiostanice MOTOROLA (DMR)', href: 'https://mototrbo.sk' },
            { text: 'Rádiostanice CALTTA', href: getPermalink('/produkty/radiostanice-caltta') },
            {
              text: 'Varovacie a vyrozumievacie systémy',
              href: getPermalink('/katalog-produktov/kategoria/varovacie-a-vyrozumievacie-systemy'),
            },
            { text: 'Evakuačné systémy', href: getPermalink('/katalog-produktov/kategoria/evakuacne-systemy') },
            { text: 'Archív produktov', href: getPermalink('/katalog-produktov/kategoria/radiostanice') },
          ],
        },
        {
          text: 'Nástroje a aktuality',
          links: [
            { text: 'RKS Chatbot', href: 'https://rks-radio-expert.vercel.app/' },
            { text: 'Slovník pojmov', href: getPermalink('/slovnik') },
            { text: 'Q&A Rádiokomunikácie', href: getPermalink('/radiokomunikacie/q-a') },
            { text: 'Prípadové štúdie', href: 'https://mototrbo.sk/pripadove-studie' },
            { text: 'Newsletter „Potvrďte príjem“', href: getPermalink('/radiokomunikacie/newsletter') },
            { text: 'Prihlásiť sa na odber', href: getPermalink('/newsletter-odber') },
          ],
        },
      ],
    },
    {
      text: 'Energetika',
      links: [
        {
          text: 'Riešenia',
          links: [
            { text: 'Základné informácie', href: getPermalink('/energetika') },
            { text: 'Energy Management (EMS)', href: getPermalink('/energetika/energy-management') },
            { text: 'Fotovoltika (FVE)', href: getPermalink('/energetika/fotovoltika') },
            { text: 'Batérie (BESS)', href: getPermalink('/energetika/baterie-bess') },
            { text: 'Nabíjanie elektromobilov', href: getPermalink('/energetika/ev-nabijacky') },
            { text: 'Inteligentné budovy', href: getPermalink('/energetika/smart-building') },
          ],
        },
        {
          text: 'Aktuality',
          links: [
            { text: 'Energy Memo', href: getPermalink('/energetika/blog') },
            { text: 'Q&A (Energetika)', href: getPermalink('/energetika/q-a') },
            { text: 'Slovník pojmov', href: getPermalink('/energetika/slovnik') },
            { text: 'Prihlásiť sa na odber', href: getPermalink('/newsletter-odber') },
          ],
        },
      ],
    },
    { text: 'Certifikáty', href: getPermalink('/certifikaty') },
    { text: 'Referencie', href: getPermalink('/referencie') },
    { text: 'Kontakt', href: getPermalink('/kontakt') },
  ],
  // TODO: po dodaní Calendly URL nahradiť href Calendly odkazom
  actions: [
    {
      text: 'Dohodnúť nezáväznú konzultáciu',
      href: '/lp/konzultacia.html?utm_source=web&utm_medium=cta&utm_campaign=web',
      variant: 'primary' as const,
    },
  ],
};

export const footerData = {
  tagline: 'Bezpečnostné systémy, rádiové siete a energetika pre firmy. Od roku 1991.',
  contact: {
    phone: { text: '+421 903 717 634', href: 'tel:+421903717634' },
    email: { text: 'rks@rksba.sk', href: 'mailto:rks@rksba.sk' },
    address: 'Vajnorská 6A, Ivanka pri Dunaji',
    hours: 'Po az Pi: 08:00 do 16:30',
  },
  cta: {
    text: 'Dohodnúť nezáväznú konzultáciu',
    href: '/lp/konzultacia.html?utm_source=web&utm_medium=cta&utm_campaign=web',
  },
  copyright: '© RKS 2026',
  legal:
    'Sídlo: Rajecká 36, 821 07 Bratislava · IČO: 30841275 · DIČ: 2020328398 · IČ DPH: SK2020328398 · Zapísaná v OR: Mestský súd Bratislava III, oddiel Sro, vložka č. 2187/B',
  bottomLinks: [
    { text: 'Ochrana osobných údajov', href: getPermalink('/ochrana-osobnych-udajov') },
    { text: 'Mapa stránky', href: getPermalink('/mapa-stranky') },
  ],
};
