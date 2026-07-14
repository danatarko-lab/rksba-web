#!/usr/bin/env node
/**
 * Generuje public/_redirects pre Cloudflare Pages z CSV map presmerovani.
 *
 * Spustenie:  node scripts/redirects-generuj.mjs
 *
 * Zdroje (stlpce: stara_url, nova_url, typ, poznamka):
 *   _materials/redirect/mapa-slovnik.csv
 *   _materials/redirect/mapa-rks-katalog.csv
 *
 * Pravidla:
 *  - Riadok:  /stara/cesta   /nova/cesta   301
 *  - Junk (nova_url je "410"):  /stara/cesta   404   410
 *  - Cloudflare berie PRVU zhodu, preto konkretne pravidla idu pred zastupne (so *).
 *    Zastupne pravidla su az na konci.
 *  - Blok medzi znackami BEGIN/END sa pri kazdom behu prepise. Rucne pridane
 *    pravidla mimo tohto bloku zostanu zachovane (obsah suboru sa nemaze).
 *
 * Skript zaroven overi:
 *  - kolko pravidiel spolu (Cloudflare limit 2100 statickych, 100 dynamickych so *),
 *  - ci ciel 301 existuje v dist/ (inak by presmerovanie viedlo na 404),
 *  - ci sa nejake pravidlo neopakuje alebo si neprotireci.
 *
 * Ziadne dlhe ani stredne pomlcky v tomto subore ani vo vystupe.
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const MAPS = [
  join(root, '_materials/redirect/mapa-slovnik.csv'),
  join(root, '_materials/redirect/mapa-rks-katalog.csv'),
];
const OUT = join(root, 'public/_redirects');
const DIST = join(root, 'dist');

const BEGIN = '# === BEGIN redirects-generuj.mjs (negeneruj rucne v tomto bloku) ===';
const END = '# === END redirects-generuj.mjs ===';

// Zdrojove cesty, ktore z generovania vynechavame (bezpecnostny filter).
// "/" je na novom rksba.sk skutocna domovska stranka; presmerovat root na katalog
// (pravidlo z mapy pre rks-katalog.eu) by domovsku stranku rozbilo. Ak to naozaj
// chces, odober "/" z tejto mnoziny.
const SKIP_FROM = new Set(['/']);

// Minimalny CSV parser: podporuje uvodzovky a ciarky vnutri poli.
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  const s = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.length && r.some((v) => v.trim() !== ''));
}

function loadMap(file) {
  const rows = parseCSV(readFileSync(file, 'utf8'));
  const header = rows[0].map((h) => h.trim());
  const iFrom = header.indexOf('stara_url');
  const iTo = header.indexOf('nova_url');
  const iTyp = header.indexOf('typ');
  if (iFrom < 0 || iTo < 0) throw new Error(`Chybaju stlpce stara_url/nova_url v ${file}`);
  return rows.slice(1).map((r) => ({
    from: (r[iFrom] || '').trim(),
    to: (r[iTo] || '').trim(),
    typ: (r[iTyp] || '').trim(),
  }));
}

// Rozhodne, ci ciel 301 existuje ako stranka v dist/ (Astro directory format).
function targetExists(to) {
  let n = to.replace(/\/+$/, '');
  if (n === '') return existsSync(join(DIST, 'index.html'));
  const cands = [join(DIST, n, 'index.html'), join(DIST, `${n}.html`), join(DIST, n)];
  return cands.some((p) => existsSync(p));
}

// Nacitaj a poskladaj pravidla
const raw = MAPS.flatMap(loadMap);
const skipped = [];
const rules = [];
for (const r of raw) {
  if (!r.from) continue;
  if (SKIP_FROM.has(r.from)) {
    skipped.push(r);
    continue;
  }
  const wild = r.from.includes('*') || r.to.includes('*');
  if (r.to === '410') {
    rules.push({ from: r.from, to: '404', status: '410', wild, typ: r.typ });
  } else {
    rules.push({ from: r.from, to: r.to, status: '301', wild, typ: r.typ });
  }
}

// Poradie: konkretne pravidla najprv, zastupne (so *) az na koniec.
const concrete = rules.filter((r) => !r.wild);
const wildcard = rules.filter((r) => r.wild);
const ordered = [...concrete, ...wildcard];

// Zapis suboru: zachovaj rucny obsah mimo generovaneho bloku.
const lines = ordered.map((r) => `${r.from} ${r.to} ${r.status}`);
const block = [
  BEGIN,
  '# Generovane skriptom scripts/redirects-generuj.mjs z _materials/redirect/*.csv.',
  '# Rucne pravidla pridavaj MIMO tento blok, tu sa vsetko pri regeneracii prepise.',
  ...lines,
  END,
].join('\n');

let existing = '';
if (existsSync(OUT)) existing = readFileSync(OUT, 'utf8');
let outText;
if (existing.includes(BEGIN) && existing.includes(END)) {
  const before = existing.slice(0, existing.indexOf(BEGIN));
  const after = existing.slice(existing.indexOf(END) + END.length);
  outText = `${before}${block}${after}`;
} else if (existing.trim()) {
  outText = `${existing.replace(/\n*$/, '')}\n\n${block}\n`;
} else {
  outText = `${block}\n`;
}
writeFileSync(OUT, outText, 'utf8');

// ---- Overenie ----
const staticCount = ordered.filter((r) => !r.wild).length;
const dynamicCount = ordered.filter((r) => r.wild).length;

// Chybajuce ciele (len pre 301, junk 410 nema cielovu stranku)
const missing = [];
if (existsSync(DIST)) {
  for (const r of ordered) {
    if (r.status !== '301') continue;
    if (!targetExists(r.to)) missing.push(r);
  }
}

// Duplicity a protirecenia podla zdrojovej cesty
const byFrom = new Map();
for (const r of ordered) {
  if (!byFrom.has(r.from)) byFrom.set(r.from, []);
  byFrom.get(r.from).push(r);
}
const duplicates = [];
const contradictions = [];
for (const [from, list] of byFrom) {
  if (list.length > 1) {
    const targets = new Set(list.map((r) => `${r.to} ${r.status}`));
    if (targets.size > 1) contradictions.push({ from, list });
    else duplicates.push({ from, count: list.length });
  }
}

console.log(`Zapisane: ${OUT}`);
console.log(`Pravidiel spolu: ${ordered.length}  (staticke ${staticCount}, dynamicke so * ${dynamicCount})`);
console.log(
  `Cloudflare limity: 2100 statickych, 100 dynamickych. Rezerva OK: ${staticCount <= 2100 && dynamicCount <= 100}`
);
if (skipped.length) {
  console.log(`\nVynechane zdroje (SKIP_FROM): ${skipped.length}`);
  for (const r of skipped) console.log(`  ${r.from} -> ${r.to}  (typ ${r.typ})`);
}
console.log(`\nChybajuce ciele v dist/ (301 vedie na neexistujucu stranku): ${missing.length}`);
for (const r of missing) console.log(`  ${r.from} -> ${r.to}`);
if (!existsSync(DIST)) console.log('  POZOR: dist/ neexistuje, spusti najprv npm run build.');
console.log(`\nOpakovane zdrojove cesty (duplicity): ${duplicates.length}`);
for (const d of duplicates) console.log(`  ${d.from} (x${d.count})`);
console.log(`Protirecenia (rovnaky zdroj, iny ciel): ${contradictions.length}`);
for (const c of contradictions) {
  console.log(`  ${c.from}:`);
  for (const r of c.list) console.log(`    -> ${r.to} ${r.status}`);
}
