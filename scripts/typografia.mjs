// Post-build typografia: doplní nezalomiteľné medzery do textových uzlov
// všetkých .html v dist/ okrem dist/pagefind/. Nemení obsah textov, len medzery.
// Preskakuje tagy, atribúty a obsah <script>, <style>, <pre>, <code>, <textarea>.
// Čistý Node, bez závislostí.

import fs from 'node:fs';
import path from 'node:path';

const NBSP = ' ';
const RAW_TAGS = new Set(['script', 'style', 'pre', 'code', 'textarea']);

// Aplikuje pravidlá na jeden textový uzol. Opakuje, kým sa niečo mení
// (napr. reťazce ako „a v roku" potrebujú dve nbsp za sebou).
function typografia(text) {
  let prev;
  do {
    prev = text;
    // 1. Jednopísmenové predložky a spojky: a i o s u v z k (aj veľké).
    text = text.replace(/(^|[^\p{L}])([aiosuvzkAIOSUVZK]) /gu, `$1$2${NBSP}`);
    // 2. Dvojpísmenové predložky/spojky (aj s veľkým začiatočným písmenom).
    text = text.replace(/(^|[^\p{L}])(za|zo|do|od|po|na|vo|ku|so|či|Za|Zo|Do|Od|Po|Na|Vo|Ku|So|Či) /gu, `$1$2${NBSP}`);
    // 3. Oddeľovač tisícov: číslica + medzera + tri číslice (nie ďalšia číslica).
    text = text.replace(/(\d) (\d{3})(?!\d)/g, `$1${NBSP}$2`);
    // 4. Číslo a percento.
    text = text.replace(/(\d) %/g, `$1${NBSP}%`);
    // 5. Číslo a jednotka (dlhšie jednotky prvé).
    text = text.replace(/(\d) (MWh|GWh|kWh|MW|kW|EUR|eur|m³)(?=$|[^\p{L}])/gu, `$1${NBSP}$2`);
    // 6. Dátumy: číslica s bodkou + medzera + číslica.
    text = text.replace(/(\d\.) (\d)/g, `$1${NBSP}$2`);
  } while (text !== prev);
  return text;
}

// Prejde HTML, transformuje iba textové uzly mimo raw elementov.
function processHtml(html) {
  let out = '';
  let i = 0;
  let skipUntil = null;

  while (i < html.length) {
    // Komentár <!-- ... -->
    if (html.startsWith('<!--', i)) {
      const end = html.indexOf('-->', i + 4);
      const stop = end === -1 ? html.length : end + 3;
      out += html.slice(i, stop);
      i = stop;
      continue;
    }
    // Tag <...>
    if (html[i] === '<') {
      const end = html.indexOf('>', i);
      const stop = end === -1 ? html.length : end + 1;
      const tag = html.slice(i, stop);
      out += tag;
      i = stop;
      const m = /^<\s*(\/?)\s*([a-zA-Z0-9]+)/.exec(tag);
      if (m) {
        const closing = m[1] === '/';
        const name = m[2].toLowerCase();
        if (!skipUntil && !closing && RAW_TAGS.has(name) && !/\/\s*>$/.test(tag)) {
          skipUntil = name;
        } else if (skipUntil && closing && name === skipUntil) {
          skipUntil = null;
        }
      }
      continue;
    }
    // Textový uzol až po ďalší '<'
    const next = html.indexOf('<', i);
    const stop = next === -1 ? html.length : next;
    let text = html.slice(i, stop);
    if (!skipUntil) text = typografia(text);
    out += text;
    i = stop;
  }
  return out;
}

function collectHtml(dir, skipDir, acc) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (path.resolve(full) === path.resolve(skipDir)) continue;
      collectHtml(full, skipDir, acc);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      acc.push(full);
    }
  }
  return acc;
}

const distDir = path.resolve('dist');
const pagefindDir = path.join(distDir, 'pagefind');

if (!fs.existsSync(distDir)) {
  console.error('typografia: dist/ neexistuje, spustite najprv build.');
  process.exit(1);
}

const files = collectHtml(distDir, pagefindDir, []);
let changed = 0;
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const out = processHtml(html);
  if (out !== html) {
    fs.writeFileSync(file, out, 'utf8');
    changed++;
  }
}

console.log(`typografia: spracovaných ${files.length} HTML súborov (upravených ${changed}).`);
