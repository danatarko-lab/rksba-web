#!/usr/bin/env node
/**
 * Vlozi obrazky do migrovanych MOTOTRBO stranok (Batch 2b).
 *
 * Predpoklad: obrazky su uz v public/images/mototrbo/ (spusti najprv
 * scripts/kopiruj-mototrbo-obrazky.mjs).
 *
 * Spustenie:  node scripts/vloz-mototrbo-obrazky.mjs
 *
 * Pre kazdu stranku ma zoznam vlozeni { after, imgs, alt }:
 *  - "after" je presny retazec v subore (nadpis sekcie alebo otvarajuci
 *    <div class="prose ...">), za ktory sa obrazok vlozi.
 *  - Vlozi sa len obrazok, ktoreho subor realne existuje v public/images/mototrbo/.
 *  - Ak uz je obrazok v subore, preskoci sa (idempotentne).
 *
 * Po behu spusti: npx prettier --write, npm run build, npm run check.
 * Ziadne dlhe pomlcky v tomto subore.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const PAGES = join(root, 'src/pages/bezpecnostne-systemy-radiove-siete');
const IMGDIR = join(root, 'public/images/mototrbo');
const PROSE = '<div class="prose prose-lg max-w-none">';

function img(file, alt) {
  return `\n      <img src="/images/mototrbo/${file}" alt="${alt}" loading="lazy" decoding="async" class="rounded-lg border border-hairline my-4" />`;
}
function grid(files, alt) {
  const items = files
    .map(
      (f) =>
        `        <img src="/images/mototrbo/${f}" alt="${alt}" loading="lazy" decoding="async" class="rounded-lg border border-hairline" />`
    )
    .join('\n');
  return `\n      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 my-4 not-prose">\n${items}\n      </div>`;
}

// mapa: subor -> [{ after, imgs:[file], alt }]
const MAP = {
  'mototrbo-priame-spojenie.astro': [
    { after: PROSE, imgs: ['Direct_mode_Simple_Connection_2.jpg'], alt: 'MOTOTRBO Priame spojenie' },
  ],
  'mototrbo-konvencny-system.astro': [
    {
      after: PROSE,
      imgs: ['Conventional_Systems_Single_site_2.jpg'],
      alt: 'MOTOTRBO Konvenčný systém, jedna lokalita',
    },
  ],
  'mototrbo-ip-site-connect.astro': [
    { after: PROSE, imgs: ['Conventional_Systems_IP_Site_Connect_2.jpg'], alt: 'MOTOTRBO IP Site Connect' },
    {
      after: '<h2>Scenáre použitia</h2>',
      imgs: ['Mototrbo_IP_Site_Connect_lokality.jpg'],
      alt: 'Lokality prepojené cez IP Site Connect',
    },
  ],
  'mototrbo-connect-plus.astro': [
    { after: PROSE, imgs: ['Mototrbo_Connect_Plus_1_th.jpg'], alt: 'MOTOTRBO Connect Plus' },
    {
      after: '<h2>Architektúra systému</h2>',
      imgs: ['Mototrbo_Connect_Plus_architecture_2.jpg'],
      alt: 'Architektúra systému Connect Plus',
    },
    {
      after: '<h3>Podpora až 250 lokalít</h3>',
      imgs: ['Mototrbo_Connect_Plus_USA_2.jpg'],
      alt: 'Connect Plus v prevádzke',
    },
  ],
  'mototrbo-linked-capacity-plus.astro': [
    { after: PROSE, imgs: ['Mototrbo_Linked_Capacity_Plus_1_th.jpg'], alt: 'MOTOTRBO Linked Capacity Plus' },
    { after: '<h2>Vlastnosti</h2>', imgs: ['Mototrbo_Linked_Capacity_Plus_1.jpg'], alt: 'Schéma Linked Capacity Plus' },
  ],
  'mototrbo-capacity-max.astro': [
    { after: PROSE, imgs: ['Mototrbo_Capacity_Max_5_th.jpg'], alt: 'MOTOTRBO Capacity Max' },
    {
      after: '<h2>Centrálna správa pre kompletné ovládanie</h2>',
      imgs: ['Mototrbo_Capacity_Max_6.jpg'],
      alt: 'Centrálna správa Capacity Max',
    },
    { after: '<h2>Vysoké zabezpečenie</h2>', imgs: ['Mototrbo_Capacity_Max_7.jpg'], alt: 'Zabezpečenie Capacity Max' },
    {
      after: '<h2>Zvýšená kapacita a ľahká škálovateľnosť</h2>',
      imgs: ['Mototrbo_Capacity_Max_1.jpg'],
      alt: 'Škálovateľnosť Capacity Max',
    },
  ],
  'mototrbo-ion.astro': [
    { after: PROSE, imgs: ['ION-logo.jpg'], alt: 'MOTOTRBO ION logo' },
    { after: '<h2>Platforma Android</h2>', imgs: ['ION-2radios.jpg'], alt: 'MOTOTRBO ION' },
    { after: '<h2>Komplexné multimediálne možnosti</h2>', imgs: ['ION-skeleton.png'], alt: 'MOTOTRBO ION konštrukcia' },
  ],
  'mototrbo-dmr-technologia.astro': [
    { after: PROSE, imgs: ['Mototrbo_Family.jpg'], alt: 'Rodina rádiostaníc MOTOTRBO' },
    {
      after: '<h2>Čistejšia hlasová komunikácia pri väčšom pokrytí</h2>',
      imgs: ['Mototrbo_kvalita_zvuku_2.jpg'],
      alt: 'Kvalita zvuku MOTOTRBO',
    },
    { after: '<h2>Riešenie preťaženého spektra</h2>', imgs: ['Mototrbo_TDMA_2.jpg'], alt: 'Technológia TDMA' },
    { after: '<h2>Lokalizačné služby (GPS)</h2>', imgs: ['Mototrbo_GPS_1.jpg'], alt: 'GPS lokalizácia MOTOTRBO' },
    { after: '<h2>Služby textových správ</h2>', imgs: ['Mototrbo_SMS.jpg'], alt: 'Textové správy MOTOTRBO' },
    {
      after: '<h2>Rozšíriteľnosť</h2>',
      imgs: ['Mototrbo_system_porovnanie_2.jpg'],
      alt: 'Porovnanie systémov MOTOTRBO',
    },
  ],
  'wave-ptx.astro': [
    { after: PROSE, imgs: ['Wave_phones.jpg'], alt: 'WAVE PTX na smartfónoch' },
    { after: '<h2>Skupinové volanie</h2>', imgs: ['Mototrbo_Anywhere_05.jpg'], alt: 'Skupinové volanie WAVE' },
    { after: '<h2>Priorita hovorov</h2>', imgs: ['Mototrbo_Anywhere_06.jpg'], alt: 'Priorita hovorov WAVE' },
    {
      after: '<h2>WAVE 3000 Server</h2>',
      imgs: ['Wave_CPS.jpg', 'Wave_CP.jpg', 'Wave_LCP.jpg'],
      alt: 'WAVE v systémoch MOTOTRBO',
    },
  ],
  'mototrbo-rdac.astro': [
    { after: PROSE, imgs: ['RDAC3.jpg'], alt: 'MOTOTRBO RDAC' },
    { after: '<h2>1. Diagnostika</h2>', imgs: ['RDAC.jpg'], alt: 'RDAC rozhranie' },
  ],
  'radio-management-otap.astro': [{ after: PROSE, imgs: ['OTAP_1.jpg'], alt: 'MOTOTRBO OTAP' }],
  'smartptt.astro': [{ after: PROSE, imgs: ['SmartPTT_Dispatcher_b.jpg'], alt: 'SmartPTT dispečerská konzola' }],
  'rozsirena-zaruka.astro': [
    { after: '<h2>Čo záruka pokrýva</h2>', imgs: ['Service_11.jpg'], alt: 'Servis rádiostaníc MOTOTRBO' },
  ],
  'vyhody-akumulatorov-nabijaciek.astro': [
    {
      after: '<h2>Konštrukcia akumulátora</h2>',
      imgs: ['Battery_pack_1_SK.jpg'],
      alt: 'Konštrukcia akumulátora Motorola',
    },
    {
      after: '<h3>Ploché vodiče namiesto drôtov</h3>',
      imgs: ['Battery_pack_2_SK.jpg'],
      alt: 'Ploché vodiče v akumulátore',
    },
    { after: '<h3>Lepiace podložky namiesto lepidla</h3>', imgs: ['Battery_pack_3_SK.jpg'], alt: 'Lepiace podložky' },
    { after: '<h3>Medzičlánková izolácia</h3>', imgs: ['Battery_pack_4_SK.jpg'], alt: 'Medzičlánková izolácia' },
    { after: '<h2>Technológia IMPRES</h2>', imgs: ['IMPRESS_sk.jpg'], alt: 'Technológia IMPRES' },
    { after: '<h2>Výber správneho akumulátora</h2>', imgs: ['Battery.jpg'], alt: 'Akumulátor Motorola' },
    { after: '<h2>Výber správnej nabíjačky</h2>', imgs: ['Chargers.jpg'], alt: 'Nabíjačky Motorola' },
  ],
  'vyhody-impres.astro': [
    { after: PROSE, imgs: ['IMPRES_Battery_Fleet_01.jpg'], alt: 'IMPRES akumulátory' },
    { after: '<h2>Výhody</h2>', imgs: ['IMPRES_Battery_Fleet_03.jpg'], alt: 'Výhody IMPRES' },
    { after: '<h2>Ako to funguje</h2>', imgs: ['IMPRES_Battery_Fleet_04.jpg'], alt: 'Ako funguje IMPRES' },
    {
      after: '<h2>IMPRES Battery Fleet Management</h2>',
      imgs: [
        'IMPRES_Battery_Fleet_06.jpg',
        'IMPRES_Battery_Fleet_07.jpg',
        'IMPRES_Battery_Fleet_08.jpg',
        'IMPRES_Battery_Fleet_09.jpg',
        'IMPRES_Battery_Fleet_10.jpg',
      ],
      alt: 'IMPRES Fleet Management',
    },
    {
      after: '<h3>Monitorovanie v reálnom čase</h3>',
      imgs: ['IMPRES_Battery_Fleet_11.jpg'],
      alt: 'Monitorovanie akumulátorov',
    },
    {
      after: '<h3>Bezdrôtový manažment (Over The Air)</h3>',
      imgs: ['IMPRES_Battery_Fleet_OTA.jpg'],
      alt: 'OTA manažment akumulátorov',
    },
  ],
  'vyhody-bezdrotoveho-prislusenstva.astro': [
    { after: '<h2>Pohodlie</h2>', imgs: ['Wireless_01.jpg'], alt: 'Bezdrôtové príslušenstvo' },
    {
      after: '<h2>Bezpečnosť a spoľahlivosť</h2>',
      imgs: ['Wireless_02.jpg'],
      alt: 'Bezpečnosť bezdrôtového príslušenstva',
    },
    { after: '<h2>Nenápadné a skryté nosenie</h2>', imgs: ['Wireless_03.jpg'], alt: 'Skryté nosenie' },
    { after: '<h2>Ochrana sluchu v extrémnych podmienkach</h2>', imgs: ['Wireless_04.jpg'], alt: 'Ochrana sluchu XBT' },
    {
      after: '<h2>Voľba príslušenstva</h2>',
      imgs: [
        'Wireless_05.jpg',
        'Wireless_06.jpg',
        'Wireless_07.jpg',
        'Wireless_08.jpg',
        'Wireless_09.jpg',
        'Wireless_10.jpg',
      ],
      alt: 'Bezdrôtové príslušenstvo OCW',
    },
    { after: '<h2>Hlasom ovládaná komunikácia (VOX)</h2>', imgs: ['Wireless_11.jpg'], alt: 'VOX komunikácia' },
  ],
  'vyhody-repromikrofonov.astro': [
    { after: '<h2>Popis repromikrofónu</h2>', imgs: ['RSM_01.jpg'], alt: 'Repromikrofón Motorola' },
    { after: '<h2>Exkluzívne technológie Motorola</h2>', imgs: ['RSM_02.jpg'], alt: 'Repromikrofón s IMPRES' },
  ],
  'vyhody-sluchadiel.astro': [
    { after: '<h2>Popis slúchadla</h2>', imgs: ['Sluchadlo_01.jpg'], alt: 'Slúchadlo Motorola' },
    {
      after: '<h3>Jednošnúrové slúchadlá</h3>',
      imgs: ['Sluchadlo_02.jpg', 'Sluchadlo_03.jpg'],
      alt: 'Jednošnúrové slúchadlo',
    },
    {
      after: '<h3>Dvojšnúrové slúchadlá</h3>',
      imgs: ['Sluchadlo_04.jpg', 'Sluchadlo_05.jpg'],
      alt: 'Dvojšnúrové slúchadlo',
    },
    {
      after: '<h3>Trojšnúrové slúchadlá</h3>',
      imgs: ['Sluchadlo_06.jpg', 'Sluchadlo_07.jpg'],
      alt: 'Trojšnúrové slúchadlo',
    },
    { after: '<h2>Portfólio slúchadiel</h2>', imgs: ['Sluchadlo_08.jpg'], alt: 'Portfólio slúchadiel' },
    { after: '<h3>Mag One</h3>', imgs: ['Sluchadlo_09.jpg'], alt: 'Mag One slúchadlo' },
    { after: '<h2>Schvaľovanie a legislatíva</h2>', imgs: ['Sluchadlo_10.jpg'], alt: 'Vyhlásenie o zhode' },
  ],
  'vyhody-nahlavnych-suprav.astro': [
    { after: '<h2>Popis náhlavnej súpravy</h2>', imgs: ['Headset_00.jpg'], alt: 'Náhlavná súprava Motorola' },
    {
      after: '<h2>Ultraľahké a ľahké súpravy</h2>',
      imgs: ['Headset_01.jpg', 'Headset_02.jpg', 'Headset_03.jpg'],
      alt: 'Ľahké náhlavné súpravy',
    },
    { after: '<h2>Stredne ťažké a masívne súpravy</h2>', imgs: ['Headset_04.jpg'], alt: 'Masívna náhlavná súprava' },
    { after: '<h3>Mag One</h3>', imgs: ['Headset_07.jpg'], alt: 'Mag One náhlavná súprava' },
    {
      after: '<h3>Exkluzívne IMPRES súpravy</h3>',
      imgs: ['Headset_06.jpg', 'Headset_09.jpg'],
      alt: 'IMPRES náhlavná súprava',
    },
    { after: '<h2>Schvaľovanie a legislatíva</h2>', imgs: ['DoC.jpg'], alt: 'Vyhlásenie o zhode' },
  ],
  'vyhody-audioprislusenstva-impres.astro': [
    {
      after: '<h3>Priemyselné repromikrofóny s potlačením hluku</h3>',
      imgs: ['IMPRES_Audio_04.jpg'],
      alt: 'Priemyselný repromikrofón',
    },
    { after: '<h3>Súpravy pre skryté nosenie</h3>', imgs: ['IMPRES_Audio_06.jpg'], alt: 'Súprava pre skryté nosenie' },
    {
      after: '<h3>Náhlavná súprava s kostným vedením</h3>',
      imgs: ['IMPRES_Audio_07.jpg', 'IMPRES_Audio_08.jpg'],
      alt: 'Náhlavná súprava s kostným vedením',
    },
  ],
  'vyhody-prislusenstva-na-nosenie.astro': [
    {
      after: PROSE,
      imgs: [
        'Carry_01_Clip.jpg',
        'Carry_02_Nylon_Carry_Case.jpg',
        'Carry_03_Leather_carry.jpg',
        'Carry_04_Strap.jpg',
        'Carry_05_Aqua.jpg',
        'Carry_06_Chest_pack.jpg',
      ],
      alt: 'Príslušenstvo na nosenie',
    },
    { after: '<h2>Opaskové spony</h2>', imgs: ['Carry_07.jpg'], alt: 'ATEX opasková spona' },
    { after: '<h2>Kožené púzdra</h2>', imgs: ['Carry_09.jpg'], alt: 'Kožené púzdro' },
    { after: '<h2>Špecializované príslušenstvo</h2>', imgs: ['Carry_11.jpg'], alt: 'Špecializované puzdro' },
  ],
  'vyhody-prislusenstva-pre-vozidlo.astro': [
    {
      after: PROSE,
      imgs: [
        'Vehicle_01.jpg',
        'Vehicle_02.jpg',
        'Vehicle_03.jpg',
        'Vehicle_04.jpg',
        'Vehicle_05.jpg',
        'Vehicle_06.jpg',
        'Vehicle_07.jpg',
        'Vehicle_08.jpg',
      ],
      alt: 'Príslušenstvo pre vozidlá',
    },
    { after: '<h2>IMPRES audio príslušenstvo</h2>', imgs: ['Vehicle_09.jpg'], alt: 'IMPRES audio do vozidla' },
    { after: '<h2>Externé reproduktory</h2>', imgs: ['Vehicle_10.jpg'], alt: 'Externý reproduktor' },
    { after: '<h2>PTT riešenia</h2>', imgs: ['Vehicle_11.jpg'], alt: 'PTT riešenie do vozidla' },
    { after: '<h2>Oddelená montáž</h2>', imgs: ['Vehicle_12.jpg'], alt: 'Oddelená montáž' },
    { after: '<h2>Napájacia kabeláž</h2>', imgs: ['Vehicle_13.jpg'], alt: 'Napájacia kabeláž' },
    { after: '<h2>Vozidlové antény</h2>', imgs: ['Vehicle_14.jpg'], alt: 'Vozidlová anténa' },
    {
      after: '<h2>Bezdrôtové Bluetooth príslušenstvo (OCW)</h2>',
      imgs: ['Vehicle_15.jpg'],
      alt: 'Bluetooth OCW do vozidla',
    },
    { after: '<h2>Pevné inštalácie (základňové použitie)</h2>', imgs: ['Vehicle_16.jpg'], alt: 'Pevná inštalácia' },
  ],
  'vyhody-specialneho-prislusenstva.astro': [
    {
      after: '<h2>Diskrétna súprava pre kritické operácie</h2>',
      imgs: ['special_2.jpg'],
      alt: 'Diskrétna súprava pre kritické operácie',
    },
    {
      after: '<h2>IMPRES náhlavná súprava s kostným vedením</h2>',
      imgs: ['special_3.jpg'],
      alt: 'Náhlavná súprava s kostným vedením',
    },
    { after: '<h2>Windporting IMPRES repromikrofón</h2>', imgs: ['special_4.jpg'], alt: 'Windporting repromikrofón' },
    {
      after: '<h2>IMPRES INC repromikrofón do extrémne hlučných prevádzok</h2>',
      imgs: ['special_5.jpg'],
      alt: 'IMPRES INC repromikrofón',
    },
  ],
  'vyhody-audioprislusenstva-pre-vozidlo.astro': [
    { after: '<h2>Mikrofón na slnečnú clonu</h2>', imgs: ['IMPRES_Audio_09.jpg'], alt: 'Mikrofón na slnečnú clonu' },
    {
      after: '<h2>PTT riešenia</h2>',
      imgs: ['IMPRES_Audio_13.jpg', 'IMPRES_Audio_14.jpg'],
      alt: 'PTT spínače do vozidla',
    },
    {
      after: '<h2>IMPRES ručný mikrofón</h2>',
      imgs: ['IMPRES_Audio_10.jpg', 'IMPRES_Audio_11.jpg'],
      alt: 'IMPRES ručný mikrofón',
    },
    { after: '<h2>IMPRES telefónne slúchadlo</h2>', imgs: ['IMPRES_Audio_12.jpg'], alt: 'IMPRES telefónne slúchadlo' },
  ],
};

let totalIns = 0;
const warnings = [];
for (const [file, inserts] of Object.entries(MAP)) {
  const path = join(PAGES, file);
  if (!existsSync(path)) {
    warnings.push(`CHYBA: stranka neexistuje: ${file}`);
    continue;
  }
  let src = readFileSync(path, 'utf8');
  let count = 0;
  // vlozky spracuj od konca, aby sa neposuvali indexy
  const prepared = inserts.map((ins) => {
    const imgs = ins.imgs.filter((f) => existsSync(join(IMGDIR, f)));
    const missing = ins.imgs.filter((f) => !existsSync(join(IMGDIR, f)));
    for (const m of missing) warnings.push(`  chyba obrazok ${m} (${file})`);
    return { ...ins, imgs };
  });
  for (const ins of prepared) {
    if (!ins.imgs.length) continue;
    // uz vlozene?
    if (ins.imgs.every((f) => src.includes(`/images/mototrbo/${f}`))) continue;
    const idx = src.indexOf(ins.after);
    if (idx < 0) {
      warnings.push(`  kotva nenajdena: "${ins.after}" (${file})`);
      continue;
    }
    const html = ins.imgs.length > 1 ? grid(ins.imgs, ins.alt) : img(ins.imgs[0], ins.alt);
    const at = idx + ins.after.length;
    src = src.slice(0, at) + html + src.slice(at);
    count++;
  }
  if (count) {
    writeFileSync(path, src, 'utf8');
    totalIns += count;
    console.log(`${file}: vlozenych ${count}`);
  }
}
console.log(`\nSpolu vlozenych blokov: ${totalIns}`);
if (warnings.length) {
  console.log('\nUpozornenia:');
  for (const w of warnings) console.log(w);
}
console.log('\nHotovo. Potom spusti: npx prettier --write "src/pages/**/*.astro" && npm run build && npm run check');
