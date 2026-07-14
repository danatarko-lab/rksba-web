// Post-build slovník tooltipy: v HTML súboroch v dist/ obalí PRVÝ výskyt každého
// pojmu zo slovníka odkazom na jeho stránku /slovnik/<slug> s tooltipom (title).
// Beží PO builde, rovnako ako scripts/typografia.mjs. Čistý Node, bez závislostí.
//
// Pravidlá:
//  - len PRVÝ výskyt pojmu na stránke (per pojem), ostatné sa nechajú
//  - nikdy vnútri nadpisu (h1..h6), odkazu (<a>), <code>, <pre>, <script>, <style>, <textarea>
//  - spracúva iba obsah <main> (nie hlavička, pätička, <head>)
//  - nikdy na stránke /slovnik ani /slovnik/*
//  - skratky (samostatné tokeny bez malých písmen, napr. PTT, VOX, UHF, IP55)
//    sa porovnávajú s ohľadom na veľkosť písmen; ostatné pojmy bez ohľadu
//  - dlhšie pojmy sa hľadajú skôr než kratšie
//  - do title ide len prvá veta definície

import fs from 'node:fs';
import path from 'node:path';

const SKIP_TAGS = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'script', 'style', 'textarea']);
const WORD = /[\p{L}\p{N}]/u;

function firstSentence(def) {
  const m = def.match(/^(.*?[.!?])(\s|$)/);
  return (m ? m[1] : def).trim();
}

function escAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
}

// Zostaví zoznam pojmov s predkompilovanými lepiacimi (sticky) regexmi.
function buildTerms(json) {
  return (
    json
      .map((t) => {
        const needle = String(t.pojem).replace(/_/g, ' ').trim();
        const caseSensitive = !/\s/.test(needle) && !/\p{Ll}/u.test(needle);
        const pattern = needle.split(/\s+/).map(escRegExp).join('\\s+') + '(?![\\p{L}\\p{N}])';
        const flags = 'yu' + (caseSensitive ? '' : 'i');
        return {
          slug: t.slug,
          len: needle.length,
          title: escAttr(firstSentence(String(t.definicia))),
          re: new RegExp(pattern, flags),
        };
      })
      // dlhšie pojmy skôr než kratšie
      .sort((a, b) => b.len - a.len)
  );
}

// Obalí prvé výskyty pojmov v jednom textovom uzle. Vracia [html, pocetNovych].
function linkTextNode(text, terms, used) {
  let out = '';
  let i = 0;
  let added = 0;
  const n = text.length;
  while (i < n) {
    const boundaryBefore = i === 0 || !WORD.test(text[i - 1]);
    let matched = null;
    if (boundaryBefore) {
      for (const term of terms) {
        if (used.has(term.slug)) continue;
        term.re.lastIndex = i;
        const m = term.re.exec(text);
        if (m && m.index === i) {
          matched = { term, str: m[0] };
          break; // terms sú zoradené od najdlhšieho, prvá zhoda je najdlhšia
        }
      }
    }
    if (matched) {
      out += `<a href="/slovnik/${matched.term.slug}" class="pojem" title="${matched.term.title}">${matched.str}</a>`;
      used.add(matched.term.slug);
      added++;
      i += matched.str.length;
    } else {
      out += text[i];
      i++;
    }
  }
  return [out, added];
}

// Prejde HTML, obaľuje iba textové uzly vnútri <main> a mimo SKIP_TAGS.
// Vracia { html, count } kde count je počet obalených výskytov na stránke.
function processHtml(html, terms) {
  let out = '';
  let i = 0;
  let mainDepth = 0;
  let count = 0;
  const skipStack = [];
  const used = new Set();

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
        const selfClosing = /\/\s*>$/.test(tag);
        if (name === 'main') {
          if (closing) mainDepth = Math.max(0, mainDepth - 1);
          else if (!selfClosing) mainDepth++;
        } else if (SKIP_TAGS.has(name) && !selfClosing) {
          if (closing) {
            const idx = skipStack.lastIndexOf(name);
            if (idx !== -1) skipStack.splice(idx, 1);
          } else {
            skipStack.push(name);
          }
        }
      }
      continue;
    }
    // Textový uzol až po ďalší '<'
    const next = html.indexOf('<', i);
    const stop = next === -1 ? html.length : next;
    const text = html.slice(i, stop);
    if (mainDepth > 0 && skipStack.length === 0) {
      const [linked, added] = linkTextNode(text, terms, used);
      out += linked;
      count += added;
    } else {
      out += text;
    }
    i = stop;
  }
  return { html: out, count };
}

function collectHtml(dir, skipDirs, acc) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (skipDirs.some((d) => path.resolve(full) === path.resolve(d))) continue;
      collectHtml(full, skipDirs, acc);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      acc.push(full);
    }
  }
  return acc;
}

const distDir = path.resolve('dist');
if (!fs.existsSync(distDir)) {
  console.error('slovnik-tooltipy: dist/ neexistuje, spustite najprv build.');
  process.exit(1);
}

const json = JSON.parse(fs.readFileSync(path.resolve('_materials/slovnik/slovnik.json'), 'utf8'));
const terms = buildTerms(json);

// Preskočíme pagefind, a celý strom /slovnik (stránka slovníka aj heslá).
const skipDirs = [path.join(distDir, 'pagefind'), path.join(distDir, 'slovnik')];
const files = collectHtml(distDir, skipDirs, []);

let totalTerms = 0; // súčet obalených výskytov
let pagesWithHit = 0;
const pagesWithout = [];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const { html: out, count } = processHtml(html, terms);
  const rel = '/' + path.relative(distDir, file).replace(/\\/g, '/');
  // Za "stránku" bez pojmu berieme len tie, ktoré majú <main> (reálny obsah).
  const hasMain = /<main[\s>]/i.test(html);
  if (count > 0) {
    fs.writeFileSync(file, out, 'utf8');
    totalTerms += count;
    pagesWithHit++;
  } else if (hasMain) {
    pagesWithout.push(rel);
  }
}

console.log(`slovnik-tooltipy: obalených ${totalTerms} výskytov pojmov na ${pagesWithHit} stránkach.`);
console.log(`slovnik-tooltipy: stránok bez jediného pojmu: ${pagesWithout.length}`);
for (const p of pagesWithout.sort()) {
  console.log(`  - ${p}`);
}
