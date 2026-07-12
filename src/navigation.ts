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
            { text: 'Návrh autonómnych systémov', href: getPermalink('/radiokomunikacie/sluzby/navrh-autonomnych-systemov') },
            { text: 'Audit rádiových sietí', href: getPermalink('/radiokomunikacie/sluzby/audit-sieti') },
            { text: 'Digitalizácia sietí', href: getPermalink('/radiokomunikacie/sluzby/digitalizacia-sieti') },
            { text: 'Servis rádiostaníc', href: getPermalink('/radiokomunikacie/sluzby/servis-radiostanic') },
            { text: 'Prenájom rádiostaníc', href: getPermalink('/radiokomunikacie/sluzby/prenajom-radiostanic') },
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
          ],
        },
        {
          text: 'Produkty',
          links: [
            { text: 'Rádiostanice MOTOTRBO (DMR)', href: 'https://mototrbo.sk' },
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
          text: 'Aktuality',
          links: [
            { text: 'Newsletter „Potvrďte príjem“', href: getPermalink('/radiokomunikacie/newsletter') },
            { text: 'Q&A Rádiokomunikácie', href: getPermalink('/radiokomunikacie/q-a') },
            { text: 'RKS Chatbot', href: 'https://rks-radio-expert.vercel.app/' },
            { text: 'Prípadové štúdie', href: 'https://mototrbo.sk/pripadove-studie' },
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
      variant: 'primary',
    },
  ],
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
      title: 'Bezpečnostné systémy',
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
      title: 'Rádiové siete',
      links: [
        { text: 'Rádiové siete', href: getPermalink('/radiokomunikacie/systemove-riesenia/radiove-siete') },
        { text: 'Návrh rádiových sietí', href: getPermalink('/radiokomunikacie/sluzby/navrh-radiovych-sieti') },
        { text: 'Návrh autonómnych systémov', href: getPermalink('/radiokomunikacie/sluzby/navrh-autonomnych-systemov') },
        { text: 'Audit rádiových sietí', href: getPermalink('/radiokomunikacie/sluzby/audit-sieti') },
        { text: 'Digitalizácia sietí', href: getPermalink('/radiokomunikacie/sluzby/digitalizacia-sieti') },
        { text: 'Servis rádiostaníc', href: getPermalink('/radiokomunikacie/sluzby/servis-radiostanic') },
        { text: 'Prenájom rádiostaníc', href: getPermalink('/radiokomunikacie/sluzby/prenajom-radiostanic') },
      ],
    },
    {
      title: 'Služby',
      links: [
        {
          text: 'Projekty elektrických zariadení',
          href: getPermalink('/radiokomunikacie/sluzby/projekty-elektrickych-zariadeni'),
        },
        { text: 'Elektroinštalačné práce', href: getPermalink('/radiokomunikacie/sluzby/elektroinstalacne-prace') },
        { text: 'Servis rádiostaníc', href: getPermalink('/radiokomunikacie/sluzby/servis-radiostanic') },
        { text: 'Prenájom rádiostaníc', href: getPermalink('/radiokomunikacie/sluzby/prenajom-radiostanic') },
      ],
    },
    {
      title: 'Produkty',
      links: [
        { text: 'Rádiostanice MOTOTRBO (DMR)', href: 'https://mototrbo.sk' },
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
      title: 'Aktuality',
      links: [
        { text: 'Všetky aktuality', href: getPermalink('/aktuality') },
        { text: 'Newsletter „Potvrďte príjem“', href: getPermalink('/radiokomunikacie/newsletter') },
        { text: 'Q&A Rádiokomunikácie', href: getPermalink('/radiokomunikacie/q-a') },
        { text: 'RKS Chatbot', href: 'https://rks-radio-expert.vercel.app/' },
        { text: 'Prípadové štúdie', href: 'https://mototrbo.sk/pripadove-studie' },
        { text: 'Prihlásiť sa na odber', href: getPermalink('/newsletter-odber') },
      ],
    },
    {
      title: 'Firma',
      links: [
        { text: 'Certifikáty', href: getPermalink('/certifikaty') },
        { text: 'Referencie', href: getPermalink('/referencie') },
      ],
    },
    {
      title: 'Kontakt',
      links: [
        { text: '+421 903 277 654', href: 'tel:+421903277654' },
        { text: 'rks@rksba.sk', href: 'mailto:rks@rksba.sk' },
        { text: 'Po az Pi: 08:00 do 16:30', href: getPermalink('/kontakt') },
        { text: 'Dohodnúť nezáväznú konzultáciu', href: getPermalink('/kontakt'), class: 'btn-primary text-sm mt-2 inline-flex' },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [],
  footNote: `© RKS 2026 · <a class="hover:underline" href="${getPermalink('/q-a')}">Q&A</a> · <a class="hover:underline" href="${getPermalink('/ochrana-osobnych-udajov')}">Ochrana osobných údajov</a> · <a class="hover:underline" href="${getPermalink('/mapa-stranky')}">Mapa stránky</a>`,
};
