// Novinky MOTOTRBO prenesene z mototrbo.sk (Joomla, kategoria Novinky).
// Zoradene od najnovsej po najstarsiu, datumy su povodne (stlpec created).
// Telo clanku zije vo vlastnej .astro stranke, tu je len to, co potrebuje vypis.

export type Novinka = {
  title: string;
  excerpt: string;
  date: string; // format "d. m. yyyy"
  href: string;
  image?: string; // nahlad z tela clanku; ak chyba, vypis pouzije neutralny fallback
};

export const novinky: Novinka[] = [
  {
    title: 'Rádiostanica Mototrbo ION',
    excerpt:
      'Zostaňte pripojení v rôznych sieťach pomocou rôznych zariadení. Prepojte dôležité obchodné dáta a pracovné toky. Aby vaši ľudia mohli optimálne pracovať, funkcie ktoré potrebujú sú vždy k…',
    date: '25. 2. 2021',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/mototrbo-ion',
    image: '/images/novinky/ION-logo.jpg',
  },
  {
    title: 'Mototrbo firmvér R2.9',
    excerpt:
      'Spoločnosť Motorola oznámila vydanie novej verzie softvéru pre digitálne rádiostanice Mototrbo ktorý rozširuje vlastnosti rádiostaníc o nové funkcie: Certifikovaný prístup k Wi-Fi zvyšuje…',
    date: '11. 2. 2019',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/mototrbo-firmver-r2-9',
  },
  {
    title: 'ATEX 6-miestna nabíjačka',
    excerpt:
      'Nová 6-miestna IMPRES nabíjačka PMPN4289 ponúka menšiu a ľahšiu platformu s integrovanými funkciami pre programovanie a správu akumulátorov pre všetky súčasné a budúce série rádiostaníc MOTOTRBO a…',
    date: '7. 2. 2019',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/atex-nabijacka',
  },
  {
    title: 'Mototrbo SL2600 rádiostanica',
    excerpt:
      'Spoločnosť Motorola Solutions oznámila uvedenie nového modelu rádiostanice SL2600 . Nová rádiostanica môže byť používaná v analógovom alebo digitálnom režime a je vybavená inovatívnym displejom,…',
    date: '28. 9. 2017',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/mototrbo-sl2600-radiostanica',
    image: '/images/novinky/SL1600_in_hand_1.jpg',
  },
  {
    title: 'Mototrbo DP3661 rádiostanica',
    excerpt: 'Spoločnosť Motorola Solutions rozšírila rad kompaktných, odolných rádiostaníc o model DP3661e .',
    date: '22. 5. 2017',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/mototrbo-dp3661-radiostanica',
  },
  {
    title: 'Mototrbo firmvér R2.6',
    excerpt:
      'Spoločnosť Motorola oznámila vydanie novej verzie softvéru pre digitálne rádiostanice Mototrbo ktorý rozširuje vlastnosti rádiostaníc o nové funkcie: Capacity Max - MOTOTRBO Capacity Max je DMR…',
    date: '16. 8. 2016',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/mototrbo-firmver-r2-6',
  },
  {
    title: 'Mototrbo SLR8000 prevádzač',
    excerpt: 'Spoločnosť Motorola Solutions predstavila nový prevádzač SLR8000 ktorý nahrádza model MTR3000.',
    date: '13. 7. 2016',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/mototrbo-slr8000-prevadzac',
    image: '/images/novinky/SLR8000_01.jpg',
  },
  {
    title: 'Nová generácia rádiostaníc',
    excerpt:
      'Spoločnosť Motorola na základe svojich celosvetových rozsiahlych skúseností, poznatkov zákazníkov a vlastných technologických inovácii vytvorila novú generáciu rádiostaníc Mototrbo. S novými…',
    date: '8. 4. 2016',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/nova-generacia-radiostanic',
  },
  {
    title: 'Systém Capacity Max',
    excerpt:
      'Motorola oznámila že v prvej polovici roka 2016 uvedie na trh nový trunkový (zväzkový) systém, Capacity Max ktorý spĺňa štandard DMR Tier III.',
    date: '16. 12. 2015',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/system-capacity-max',
  },
  {
    title: 'Mototrbo firmvér R2.5',
    excerpt:
      'Spoločnosť Motorola oznámila vydanie novej verzie softvéru pre digitálne rádiostanice Mototrbo ktorý rozširuje vlastnosti rádiostaníc o nové funkcie: Single input noise cancelling Najvyspelejšia…',
    date: '14. 12. 2015',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/mototrbo-firmver-r2-5',
    image: '/images/novinky/Czech.jpg',
  },
  {
    title: 'Mototrbo firmvér R2.4',
    excerpt:
      'Spoločnosť Motorola oznámila vydanie novej verzie softvéru pre digitálne rádiostanice Mototrbo ktorý rozširuje vlastnosti rádiostaníc o nové funkcie: Audioprofily Užívateľsky nastaviteľné…',
    date: '21. 1. 2015',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/firmver-r2-4',
  },
  {
    title: 'Ručný ovládací panel',
    excerpt:
      'Ručný ovládací panel určený pre vozidlové rádiostanice Mototrbo s farebným displejom ( DM4600 a DM4601 ) umožňuje maximálne flexibilnú inštaláciu rádiostanice vo vozidle a celkovú kontrolu nad jej…',
    date: '11. 12. 2014',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/rucny-ovladaci-panel',
    image: '/images/novinky/PMLN7131.jpg',
  },
  {
    title: 'XBT náhlavná súprava',
    excerpt:
      'Pri práci v prostredí s vysokou hladinou hluku užívatelia potrebujú chrániť svoj sluch chráničmi sluchu, ale súčasne musia byť schopní komunikovať s ostatnými. Tieto nároky spĺňajú XBT bezdrôtové…',
    date: '18. 10. 2014',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/xbt-nahlavna-suprava',
  },
  {
    title: 'Ukončenie predaja analóg. rádiostaníc',
    excerpt:
      'V súlade s rozvojom platformy MOTOTRBO a celkovým prechodom rádiových sietí na digitálnu prevádzku, spoločnosť Motorola informovala že dňom 16.2.2015 končí s predajom konvenčných analógových…',
    date: '13. 10. 2014',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/ukoncenie-predaja-analogovych-radiostanic',
    image: '/images/novinky/Migration_CM140_DM1400.jpg',
  },
  {
    title: 'Bezdrôtový repromikrofón',
    excerpt:
      'Motorola ponúka nové bezdrôtové komunikačné riešenie s veľkým dosahom ( Long Range Wireless Solution - MDRLN6551 ) pre vozidlové rádiostanice. Je určené hlavne pre pracovníkov, ktorí sa pohybujú v…',
    date: '12. 10. 2014',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/bezdrotovy-repromikrofon',
    image: '/images/novinky/RLN6551_The_Long_Range.jpg',
  },
  {
    title: 'Mototrbo SL1600 rádiostanica',
    excerpt:
      'Spoločnosť Motorola Solutions oznámila uvedenie nového modelu rádiostanice SL1600 . Nová rádiostanica môže byť používaná v analógovom alebo digitálnom režime a je vybavená inovatívnym displejom,…',
    date: '28. 9. 2014',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/mototrbo-sl1600-radiostanica',
    image: '/images/novinky/SL1600_in_hand_1.jpg',
  },
  {
    title: 'Používanie IMPRES nabíjačky',
    excerpt:
      'Článok popisuje správne používanie IMPRES nabíjačky. Akonáhle je IMPRES akumulátor správne vložený do nabíjačky, po jeho detekcii začne indikátor dobíjania svietiť. Nasledujúca tabuľka ukazuje,…',
    date: '26. 9. 2014',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/pouzivanie-impres-nabijacky',
    image: '/images/novinky/IMPRES_Battery_Charging_LED_Explantions.jpg',
  },
  {
    title: 'Kompaktná cestovná nabíjačka',
    excerpt: 'Spoločnosť Motorola na trh uviedla novú cestovnú nabíjačku do auta NNTN8525 .',
    date: '14. 5. 2014',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/kompaktna-cestovna-nabijacka',
  },
  {
    title: 'Mobilná aplikácia Wave',
    excerpt:
      'Integrácia chytrých telefónov (smartfónov) a rádiostaníc je možná vďaka riešeniu Wave3000. Pôvodný názov bol Mototrbo Anywhere .',
    date: '2. 4. 2014',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/mobilna-aplikacia-wave',
  },
  {
    title: 'Nové digitálne rádiostanice',
    excerpt:
      'Spoločnosť Motorola uviedla na trh nový rad digitálných prenosných rádiostaníc MOTOTRBO DP1400 , a vozidlových rádiostaníc DM1400 , DM1600 a DM2600 .',
    date: '16. 9. 2013',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/nove-digitalne-radiostanice',
  },
  {
    title: 'Mototrbo DP3441 rádiostanica',
    excerpt: 'Spoločnosť Motorola uviedla na trh nový rad digitálných odolných rádiostaníc MOTOTRBO DP3441 .',
    date: '10. 7. 2013',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/mototrbo-dp3441-radiostanica',
  },
  {
    title: 'Starostlivosť o akumulátory',
    excerpt:
      'Nasledujúce tipy vám pomôžu udržať vysoký výkon a dlhú životnosť akumulátorov Motorola. 1. Nový akumulátor pred jeho prvým použitím nabite, najlepšie cez noc. Tento proces sa označuje ako…',
    date: '7. 6. 2013',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/starostlivost-o-akumulatory',
  },
  {
    title: 'Nové ATEX rádiostanice',
    excerpt:
      'Spoločnosť Motorola uviedla na trh nový rad digitálných rádiostaníc MOTOTRBO DP4401Ex a DP4801Ex určených do výbušného prostredia.',
    date: '26. 11. 2012',
    href: '/bezpecnostne-systemy-radiove-siete/novinky/nove-atex-radiostanice',
  },
];
