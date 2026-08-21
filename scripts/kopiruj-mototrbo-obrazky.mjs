#!/usr/bin/env node
/**
 * Skopiruje obrazky pre migrovane MOTOTRBO stranky (Batch 2b) do webu.
 *
 * Spustenie:  node scripts/kopiruj-mototrbo-obrazky.mjs
 *
 * 1. Skopiruje vsetky obrazky z _materials/mototrbo/articles/ (rekurzivne)
 *    do public/images/mototrbo/. Medzery v nazve nahradi podtrznikom.
 * 2. Doplnkovy zoznam gallery obrazkov, ktore v articles/ nemusia byt,
 *    stiahne z mototrbo.sk (ak uz nie su skopirovane).
 *
 * Ziadne dlhe pomlcky v tomto subore.
 */
import { readdirSync, statSync, mkdirSync, copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SRC = join(root, '_materials/mototrbo/articles');
const OUT = join(root, 'public/images/mototrbo');

mkdirSync(OUT, { recursive: true });

// bezpecny nazov suboru: medzery -> podtrznik
const safe = (name) => name.replace(/\s+/g, '_');

// --- 1. Kopirovanie z _materials/mototrbo/articles ---
let copied = 0;
let skippedNoSrc = false;
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) {
      walk(p);
    } else if (/\.(jpe?g|png|gif|webp)$/i.test(entry)) {
      const dest = join(OUT, safe(entry));
      copyFileSync(p, dest);
      copied++;
    }
  }
}
if (existsSync(SRC)) {
  walk(SRC);
} else {
  skippedNoSrc = true;
  console.log(`POZOR: ${SRC} neexistuje, kopirovanie preskocene (spustim len stahovanie gallery).`);
}
console.log(`Skopirovanych obrazkov z articles/: ${copied}`);

// --- 2. Doplnkove gallery obrazky (stiahnut ak chybaju) ---
const BASE = 'https://www.mototrbo.sk/images/';
const gallery = [
  'gallery/page09/Mototrbo_GPS_1.jpg',
  'gallery/page10/Mototrbo_SMS.jpg',
  'gallery/page33/IMPRES_Battery_Fleet_06.jpg',
  'gallery/page33/IMPRES_Battery_Fleet_07.jpg',
  'gallery/page33/IMPRES_Battery_Fleet_08.jpg',
  'gallery/page33/IMPRES_Battery_Fleet_09.jpg',
  'gallery/page33/IMPRES_Battery_Fleet_10.jpg',
  'gallery/page20/Wave_1.jpg',
  'gallery/page20/Wave_2.jpg',
  'gallery/page20/Wave_3.jpg',
  'gallery/page20/Wave_5.jpg',
  'gallery/page20/Wave_6.jpg',
  'gallery/page20/Wave_7.jpg',
];

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36';

let downloaded = 0;
let missing = [];
for (const rel of gallery) {
  const name = safe(basename(rel));
  const dest = join(OUT, name);
  if (existsSync(dest)) continue;
  try {
    const res = await fetch(BASE + rel, { headers: { 'User-Agent': UA } });
    if (!res.ok) {
      missing.push(rel + ' (HTTP ' + res.status + ')');
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(dest, buf);
    downloaded++;
  } catch (e) {
    missing.push(rel + ' (' + e.message + ')');
  }
}
console.log(`Stiahnutych gallery obrazkov: ${downloaded}`);
if (missing.length) {
  console.log('Nepodarilo sa stiahnut (over rucne v prehliadaci):');
  for (const m of missing) console.log('  ' + m);
}
console.log(`\nHotovo. Obrazky su v: ${OUT}`);
