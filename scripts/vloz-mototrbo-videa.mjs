// Prekopíruje MOTOTRBO videá z _materials do public/videos/mototrbo/ a vloží
// <video> prehrávač do príslušných článkov. Idempotentné (dá sa spustiť viackrát).
// Poistka: súbory nad 24 MB PRESKOČÍ (Cloudflare Pages má limit 25 MB/súbor) a nahlási ich.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC = path.join(ROOT, '_materials/mototrbo/videos');
const DEST = path.join(ROOT, 'public/videos/mototrbo');
const ART = path.join(ROOT, 'src/pages/bezpecnostne-systemy-radiove-siete');
const LIMIT = 24 * 1024 * 1024;

// článok -> zoznam video súborov
const MAP = {
  'radio-management-otap.astro': ['MOTOTRBO_Radio_Management_and_OTAP.mp4', 'MOTOTRBO_Radio_Management_Software.mp4'],
  'vyhody-audioprislusenstva-impres.astro': ['MOTOTRBO_IMPRES_Audio.mp4'],
  'vyhody-repromikrofonov.astro': ['MOTOTRBO_Windporting.mp4', 'MOTOTRBO_INC_Remote_Speaker_Microphone1.mp4'],
  'vyhody-specialneho-prislusenstva.astro': [
    'MOTOTRBO_Completely_Discreet_Wireless_Kit.mp4',
    'MOTOTRBO_INC_Remote_Speaker_Microphone2.mp4',
  ],
  'vyhody-nahlavnych-suprav.astro': ['MOTOTRBO_XBT_Wireless_Headset.mp4'],
  'vyhody-bezdrotoveho-prislusenstva.astro': ['MOTOTRBO_Long_Range_Wireless_Mobile_Solution.mp4'],
};

const ANCHOR = '<div class="prose prose-lg max-w-none">';

fs.mkdirSync(DEST, { recursive: true });

// 1. Kopírovanie (s poistkou na veľkosť)
const copied = new Set();
const tooBig = [];
const missing = [];
for (const files of Object.values(MAP)) {
  for (const f of files) {
    if (copied.has(f) || tooBig.includes(f) || missing.includes(f)) continue;
    const src = path.join(SRC, f);
    if (!fs.existsSync(src)) {
      missing.push(f);
      continue;
    }
    const mb = fs.statSync(src).size / (1024 * 1024);
    if (fs.statSync(src).size > LIMIT) {
      tooBig.push(`${f} (${mb.toFixed(1)} MB)`);
      continue;
    }
    fs.copyFileSync(src, path.join(DEST, f));
    copied.add(f);
  }
}
console.log(`Skopírovaných videí: ${copied.size}`);
if (tooBig.length) console.log('PRESKOČENÉ (nad 24 MB, treba skomprimovať):\n  - ' + tooBig.join('\n  - '));
if (missing.length) console.log('NENÁJDENÉ v _materials:\n  - ' + missing.join('\n  - '));

// 2. Vloženie prehrávača do článkov (len pre úspešne skopírované videá)
function caption(f) {
  return f
    .replace(/^MOTOTRBO_/, '')
    .replace(/\.mp4$/i, '')
    .replace(/_/g, ' ');
}
function videoTag(f) {
  return (
    `        <video controls preload="metadata" class="w-full rounded-lg border border-hairline bg-black" title="${caption(f)}">\n` +
    `          <source src="/videos/mototrbo/${f}" type="video/mp4" />\n` +
    `        </video>`
  );
}

let inserted = 0;
for (const [article, files] of Object.entries(MAP)) {
  const usable = files.filter((f) => copied.has(f));
  if (!usable.length) continue;
  const p = path.join(ART, article);
  if (!fs.existsSync(p)) {
    console.log(`POZOR: článok neexistuje: ${article}`);
    continue;
  }
  let html = fs.readFileSync(p, 'utf8');
  const newFiles = usable.filter((f) => !html.includes(`/videos/mototrbo/${f}`));
  if (!newFiles.length) continue; // už vložené
  const i = html.indexOf(ANCHOR);
  if (i === -1) {
    console.log(`POZOR: kotva nenájdená v ${article}`);
    continue;
  }
  const block =
    `\n      <div class="not-prose my-6 grid gap-4 sm:grid-cols-2">\n` +
    newFiles.map(videoTag).join('\n') +
    `\n      </div>`;
  const at = i + ANCHOR.length;
  html = html.slice(0, at) + block + html.slice(at);
  fs.writeFileSync(p, html, 'utf8');
  inserted += newFiles.length;
  console.log(`${article}: vložené ${newFiles.length} video(í)`);
}
console.log(`\nSpolu vložených videí: ${inserted}`);
console.log('Potom spusti: npx prettier --write "src/pages/bezpecnostne-systemy-radiove-siete/*.astro" && npm run build && npm run check');
