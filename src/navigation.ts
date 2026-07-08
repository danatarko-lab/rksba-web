import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Rádiokomunikácie',
      href: getPermalink('/radiokomunikacie'),
      links: [
        {
          text: 'Služby',
          links: [
            { text: 'Základné informácie', href: getPermalink('/radiokomunikacie/sluzby/zakladne-informacie') },
            { text: 'Servis rádiostaníc', href: getPermalink('/radiokomunikacie/sluzby/servis-radiostanic') },
            { text: 'Prenájom rádiostaníc', href: getPermalink('/radiokomunikacie/sluzby/prenajom-radiostanic') },
            { text: 'Návrh rádiových sietí', href: getPermalink('/radiokomunikacie/sluzby/navrh-radiovych-sieti') },
            { text: 'Návrh autonómnych systémov', href: getPermalink('/radiokomunikacie/sluzby/navrh-autonomnych-systemov') },
            {
              text: 'Projekty elektrických zariadení',
              href: getPermalink('/radiokomunikacie/sluzby/projekty-elektrickych-zariadeni'),
            },
            { text: 'Elektroinštalačné práce', href: getPermalink('/radiokomunikacie/sluzby/elektroinstalacne-prace') },
            { text: 'Digitálny systém MOTOTRBO', href: getPermalink('/radiokomunikacie/sluzby/digitalny-system-mototrbo') },
            { text: 'Audit sietí', href: getPermalink('/radiokomunikacie/sluzby/audit-sieti') },
            { text: 'Digitalizácia sietí', href: getPermalink('/radiokomunikacie/sluzby/digitalizacia-sieti') },
          ],
        },
        {
          text: 'Systémové riešenia',
          links: [
            { text: 'Rádiové siete', href: getPermalink('/radiokomunikacie/systemove-riesenia/radiove-siete') },
            {
              text: 'Autonómne systémy varovania',
              href: getPermalink('/radiokomunikacie/systemove-riesenia/autonomne-systemy-varovania'),
            },
            { text: 'Evakuačný rozhlas a ozvučenie', href: getPermalink('/radiokomunikacie/systemove-riesenia/evakuacny-rozhlas') },
          ],
        },
        {
          text: 'Produkty',
          links: [{ text: 'Mototrbo', href: getPermalink('/radiokomunikacie/produkty/mototrbo') }],
        },
        {
          text: 'Aktuality',
          links: [
            { text: '„Potvrďte príjem" (Newsletter)', href: getPermalink('/radiokomunikacie/newsletter') },
            { text: 'Q&A (Rádio)', href: getPermalink('/radiokomunikacie/q-a') },
            { text: 'RKS Chatbot', href: 'https://rks-radio-expert.vercel.app/' },
            { text: 'Prípadové štúdie', href: 'https://mototrbo.sk/pripadove-studie' },
          ],
        },
      ],
    },
    {
      text: 'Produkty',
      links: [
        { text: 'Rádiostanice Mototrbo (DMR)', href: 'https://mototrbo.sk' },
        { text: 'Rádiostanice CALTTA', href: getPermalink('/produkty/radiostanice-caltta') },
        {
          text: 'Rádiostanice Motorola EVX',
          href: getPermalink('/katalog-produktov/kategoria/prenosne-radiostanice-digitalne-evx'),
        },
        {
          text: 'Rádiostanice Motorola analógové',
          href: getPermalink('/katalog-produktov/kategoria/radiostanice'),
        },
        {
          text: 'Varovacie a vyrozumievacie systémy',
          href: getPermalink('/katalog-produktov/kategoria/varovacie-a-vyrozumievacie-systemy'),
        },
        {
          text: 'Evakuačné systémy',
          href: getPermalink('/katalog-produktov/kategoria/evakuacne-systemy'),
        },
      ],
    },
    {
      text: 'Energetika',
      href: getPermalink('/energetika'),
      links: [
        { text: 'Základné informácie', href: getPermalink('/energetika') },
        { text: 'Energy Management (EMS)', href: getPermalink('/energetika/energy-management') },
        { text: 'Fotovoltika (FVE)', href: getPermalink('/energetika/fotovoltika') },
        { text: 'Batérie (BESS)', href: getPermalink('/energetika/baterie-bess') },
        { text: 'Nabíjanie elektromobilov', href: getPermalink('/energetika/ev-nabijacky') },
        { text: 'Inteligentné budovy', href: getPermalink('/energetika/smart-building') },
        // — obsah —
        { text: 'Energy Memo', href: getPermalink('/energetika/blog') },
        { text: 'Q&A (Energetika)', href: getPermalink('/energetika/q-a') },
        { text: 'Slovník pojmov', href: getPermalink('/energetika/slovnik') },
      ],
    },
    { text: 'Aktuality', href: getPermalink('/aktuality') },
    { text: 'Kontakt', href: getPermalink('/kontakt') },
  ],
  // TODO: po dodaní Calendly URL nahradiť href Calendly odkazom
  actions: [{ text: 'Dohodnúť nezáväznú konzultáciu', href: getPermalink('/kontakt'), variant: 'primary' }],
};

export const footerData = {
  address: [
    'Sídlo: Rajecká 36, 821 07 Bratislava',
    'Prevádzka: Vajnorská 6A, 900 28 Ivanka pri Dunaji',
    'IČO: 30841275 · DIČ: 2020328398',
    'IČ DPH: SK2020328398',
    'OR: Mestský súd Bratislava III',
    'IBAN: SK17 1100 0000 0026 2802 1295',
  ],
  links: [
    {
      title: 'Rádiokomunikácie',
      links: [
        { text: 'Rádiové siete', href: getPermalink('/radiokomunikacie/systemove-riesenia/radiove-siete') },
        {
          text: 'Autonómne systémy varovania',
          href: getPermalink('/radiokomunikacie/systemove-riesenia/autonomne-systemy-varovania'),
        },
        { text: 'Evakuačný rozhlas', href: getPermalink('/radiokomunikacie/systemove-riesenia/evakuacny-rozhlas') },
        { text: 'Mototrbo', href: getPermalink('/radiokomunikacie/produkty/mototrbo') },
        { text: 'Servis rádiostaníc', href: getPermalink('/radiokomunikacie/sluzby/servis-radiostanic') },
        { text: '„Potvrďte príjem"', href: getPermalink('/radiokomunikacie/newsletter') },
        { text: 'Prípadové štúdie', href: 'https://mototrbo.sk/pripadove-studie' },
      ],
    },
    {
      title: 'Produkty',
      links: [
        { text: 'Rádiostanice Mototrbo (DMR)', href: 'https://mototrbo.sk' },
        { text: 'Rádiostanice CALTTA', href: getPermalink('/produkty/radiostanice-caltta') },
        {
          text: 'Rádiostanice Motorola EVX',
          href: getPermalink('/katalog-produktov/kategoria/prenosne-radiostanice-digitalne-evx'),
        },
        {
          text: 'Rádiostanice Motorola analógové',
          href: getPermalink('/katalog-produktov/kategoria/radiostanice'),
        },
        {
          text: 'Varovacie a vyrozumievacie systémy',
          href: getPermalink('/katalog-produktov/kategoria/varovacie-a-vyrozumievacie-systemy'),
        },
        { text: 'Evakuačné systémy', href: getPermalink('/katalog-produktov/kategoria/evakuacne-systemy') },
      ],
    },
    {
      title: 'Energetika',
      links: [
        { text: 'Energy Management', href: getPermalink('/energetika/energy-management') },
        { text: 'Fotovoltika', href: getPermalink('/energetika/fotovoltika') },
        { text: 'Batérie BESS', href: getPermalink('/energetika/baterie-bess') },
        { text: 'Nabíjanie elektromobilov', href: getPermalink('/energetika/ev-nabijacky') },
        { text: 'Inteligentné budovy', href: getPermalink('/energetika/smart-building') },
        { text: 'Energy Memo', href: getPermalink('/energetika/blog') },
        { text: 'Slovník pojmov', href: getPermalink('/energetika/slovnik') },
      ],
    },
    {
      title: 'Kontakt',
      links: [
        { text: '+421 903 717 634', href: 'tel:+421903717634' },
        { text: 'rks@rksba.sk', href: 'mailto:rks@rksba.sk' },
        { text: 'Po–Pi: 08:00 – 16:30', href: getPermalink('/kontakt') },
        { text: 'Dohodnúť nezáväznú konzultáciu', href: getPermalink('/kontakt'), class: 'btn-primary text-sm mt-2 inline-flex' },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [],
  footNote: `© RKS 2026 · <a class="hover:underline" href="${getPermalink('/q-a')}">Q&A</a> · <a class="hover:underline" href="${getPermalink('/ochrana-osobnych-udajov')}">Ochrana osobných údajov</a> · <a class="hover:underline" href="${getPermalink('/mapa-stranky')}">Mapa stránky</a>`,
};
