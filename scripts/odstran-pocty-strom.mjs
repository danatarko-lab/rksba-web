// Odstráni počty produktov (badge <span>) z ľavého stromu kategórií v katalógu.
// Recenzia: holé čísla za názvami kategórií pôsobili zvláštne a na starom webe neboli.
// Prejde všetky .astro v src/pages/katalog-produktov (produkty aj kategórie) a odstráni
// len tie count badge <span>. Netreba regenerovať celý katalóg.
import fs from 'fs';
import path from 'path';

const root = 'src/pages/katalog-produktov';
const RE = /<span class=\\"text-muted text-xs ml-2\\">\d+<\/span>/g;

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.astro')) out.push(p);
  }
  return out;
}

let changedFiles = 0;
let removed = 0;
for (const p of walk(root)) {
  const src = fs.readFileSync(p, 'utf8');
  const m = src.match(RE);
  if (!m) continue;
  fs.writeFileSync(p, src.replace(RE, ''), 'utf8');
  changedFiles += 1;
  removed += m.length;
}
console.log(`Upravených súborov: ${changedFiles}, odstránených počtov: ${removed}`);
