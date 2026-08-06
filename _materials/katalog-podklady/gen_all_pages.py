#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""FAZA 2b: vygeneruje kompletny produktovy archiv.
- 446 produktovych stranok (sidebar strom + galeria posuvnik + parametre + dokumenty
  + servisny CTA + Product JSON-LD + BreadcrumbList JSON-LD)
- kategoriove stranky pre kazdu kategoriu s aspon 1 produktom v podstrome
  (sidebar so zvyraznenou kategoriou, popis, grid kariet produktov z celeho podstromu,
   breadcrumb, BreadcrumbList JSON-LD)
- uvodna index stranka archivu (CollectionPage JSON-LD)
Cita products.json + categories.json, zapisuje .astro subory.
"""
import os, re, json, html as htmlmod, unicodedata, sys

INDEX_ONLY = '--index-only' in sys.argv

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(BASE, '..', '..'))
OUTDIR = os.path.join(ROOT, 'src', 'pages', 'katalog-produktov')
CATDIR = os.path.join(OUTDIR, 'kategoria')
os.makedirs(OUTDIR, exist_ok=True)
os.makedirs(CATDIR, exist_ok=True)

products = json.load(open(os.path.join(BASE, 'products.json'), encoding='utf-8'))
cats = json.load(open(os.path.join(BASE, 'categories.json'), encoding='utf-8'))
P = {p['id']: p for p in products}

# Kanonicka domena. Schema.org BreadcrumbList vyzaduje v itemListElement.item
# ABSOLUTNU URL — s relativnou cestou Search Console hlasi "Neplatna webova
# adresa v poli id".
SITE_URL = 'https://rksba.sk'

ARCHIVE_BASE = '/katalog-produktov'
CAT_BASE = ARCHIVE_BASE + '/kategoria'
IMG_BASE = '/images/katalog-produktov'
DOC_BASE = '/dokumenty/katalog'

# skopirovane PDF (len na tie renderujeme odkazy, aby neboli rozbite linky); macOS NFD -> NFC
DOC_DIR = os.path.join(ROOT, 'public', 'dokumenty', 'katalog')
DOC_FILES = {unicodedata.normalize('NFC', f) for f in os.listdir(DOC_DIR)} if os.path.isdir(DOC_DIR) else set()
def doc_exists(subor):
    return unicodedata.normalize('NFC', subor) in DOC_FILES

# ---------------------------------------------------------------- kategorie
cat_by_id = {c['id']: c for c in cats}
children = {}
for c in cats:
    children.setdefault(c['parent'], []).append(c)
for k in children:
    children[k].sort(key=lambda c: c['name'].lower())

direct = {}
for p in products:
    direct[p['category']['id']] = direct.get(p['category']['id'], 0) + 1

subtree = {}
def calc(cid):
    if cid in subtree:
        return subtree[cid]
    tot = direct.get(cid, 0)
    for ch in children.get(cid, []):
        tot += calc(ch['id'])
    subtree[cid] = tot
    return tot
for c in cats:
    calc(c['id'])

# umbrella root (Produkty) = koren s najvacsim podstromom; jeho deti su top kategorie
_roots = [c for c in cats if c['parent'] == 0 and subtree.get(c['id'], 0) > 0]
UMBRELLA = max(_roots, key=lambda c: subtree[c['id']]) if _roots else None

def esc(s):
    return htmlmod.escape(str(s), quote=True)

# ---------------------------------------------------------------- cistenie po Joomle
# Joomla content plugins ostali v popisoch ako text, napr. {gall}page21{/gall}.
# Odstranime parove {tag}...{/tag} aj osamotene {tag} / {/tag} a potom prazdne
# odstavce, ktore po nich zostanu.
_JOOMLA_PAIR = re.compile(r'\{([a-zA-Z][\w-]*)\b[^{}]*\}.*?\{/\1\}', re.S)
_JOOMLA_SOLO = re.compile(r'\{/?[a-zA-Z][\w-]*\b[^{}]*\}')
_EMPTY_P = re.compile(r'<p>(?:\s|&nbsp;|<br\s*/?>)*</p>', re.I)

def strip_joomla(h):
    if not h:
        return h
    out = _JOOMLA_PAIR.sub('', h)
    out = _JOOMLA_SOLO.sub('', out)
    out = _EMPTY_P.sub('', out)
    return re.sub(r'[ \t]{2,}', ' ', out).strip()

# ---------------------------------------------------------------- opravy po migracii
# Kategorie, kde sa tovar uz nedodava. Vykresli sa vyrazna poznamka nad popisom.
DISCONTINUED_CATS = {
    129,  # Evakuacny rozhlasovy system SX-2000
    8,    # Lodne radiostanice
}
DISCONTINUED_NOTE = 'Už sa nedodáva'
DISCONTINUED_DETAIL = ('Produkty z tejto kategórie sú v archíve. Servis, náhradné diely '
                       'a náhradné riešenie vieme zabezpečiť, ozvite sa nám.')

# Popisy, ktore migracia z Joomly rozsypala a nedaju sa opravit strojovo.
# Kluc je id kategorie, hodnota nahradi cely popis_html.
CAT_POPIS_FIX = {
    # id 9 (Komercne radiostanice, slug prenosne-komercne-radiostanice):
    # porovnavacia tabulka CP040-CP180 prisla o <table> a kazda cela skoncila
    # vo vlastnom <p>, takze sa renderovala ako ~30 jednoslovnych odstavcov.
    9: (
        '<p>Produkty už nie sú v predaji, aktuálnu ponuku nájdete na '
        '<a href="https://www.mototrbo.sk" rel="noopener">www.mototrbo.sk</a>.</p>'
        '<p>Rádiostanice rady CP patria do kategórie Motorola Commercial, ktorá sa vyznačuje '
        'jednoduchou a spoľahlivou konštrukciou a základnými funkciami. Vzhľadom sa podobajú na '
        'profesionálne rádiostanice, ale vyznačujú sa nižšou mechanickou odolnosťou, majú menšie '
        'možnosti konfigurácie. Na druhej strane sú výrazne lacnejšie, nakoľko sú určené pre '
        'občasné použitie v nie príliš náročných podmienkach.</p>'
        '<p>Taktiež rozsah príslušenstva je menší ako pri profesionálnych rádiostaniciach.</p>'
        '<p>Prístroje sa dodávajú v dvoch verziách, jedna verzia je určená pre frekvenčné pásmo '
        'VHF a druhá verzia pre UHF.</p>'
        '<p>Základné rozdiely medzi jednotlivými modelmi:</p>'
        '<div class="overflow-x-auto">'
        '<table>'
        '<thead><tr><th>Funkcie</th><th>CP040</th><th>CP140</th><th>CP160</th><th>CP180</th></tr></thead>'
        '<tbody>'
        '<tr><td>Počet kanálov</td><td>4</td><td>16</td><td>32</td><td>64</td></tr>'
        '<tr><td>Programovateľné tlačidlá</td><td>2</td><td>2</td><td>4</td><td>4</td></tr>'
        '<tr><td>Funkcia rýchleho prístupu</td><td>4</td><td>4</td><td>8</td><td>8</td></tr>'
        '<tr><td>Možnosť doplnkovej dosky</td><td>Nie</td><td>Áno</td><td>Áno</td><td>Áno</td></tr>'
        '<tr><td>Klávesnica</td><td>Nie</td><td>Nie</td><td>2 tl.</td><td>14 tl.</td></tr>'
        '<tr><td>Displej</td><td>Nie</td><td>Nie</td><td>LCD, 8 zn.</td><td>LCD, 8 zn.</td></tr>'
        '</tbody>'
        '</table>'
        '</div>'
    ),
}

def cat_popis(c):
    return strip_joomla(CAT_POPIS_FIX.get(c['id'], c.get('popis_html', '') or ''))

# ---------------------------------------------------------------- slugify + kolizie
def slugify(s):
    s = unicodedata.normalize('NFKD', str(s))
    s = ''.join(ch for ch in s if not unicodedata.combining(ch))
    s = s.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s or 'kat'

# kategoriove slugy (deterministicky podla id), kolizie -> pripona -<id>
cat_slug = {}
_seen_cat = {}
cat_collisions = []
for c in sorted(cats, key=lambda c: c['id']):
    base = slugify(c['alias'])
    slug = base
    if slug in _seen_cat:
        slug = '%s-%d' % (base, c['id'])
        cat_collisions.append((c['id'], c['name'], base, slug))
    _seen_cat[slug] = c['id']
    cat_slug[c['id']] = slug

# produktove slugy, kolizie -> pripona -<id>
prod_slug = {}
_seen_prod = {}
prod_collisions = []
for p in sorted(products, key=lambda p: p['id']):
    base = slugify(p['alias'])
    slug = base
    if slug in _seen_prod:
        slug = '%s-%d' % (base, p['id'])
        prod_collisions.append((p['id'], p['title'], base, slug))
    _seen_prod[slug] = p['id']
    prod_slug[p['id']] = slug

def cat_url(cid):
    return CAT_BASE + '/' + cat_slug[cid]

def prod_url(pid):
    return ARCHIVE_BASE + '/' + prod_slug[pid]

# ---------------------------------------------------------------- sidebar
def ancestors(cid):
    ids = []; cur = cid; seen = set()
    while cur in cat_by_id and cur not in seen:
        seen.add(cur); ids.append(cur); cur = cat_by_id[cur]['parent']
    return set(ids)

def render_node(c, current_id, open_ids):
    # Nazov je cisty link (klik VZDY naviguje), rozbalovanie riesi samostatna
    # sipka v <summary>. Vnoreny <ul> je surodenec <details> a zobrazuje sa cez
    # CSS (details[open] ~ .rks-children) => funguje bez JS.
    kids = [ch for ch in children.get(c['id'], []) if subtree.get(ch['id'], 0) > 0]
    link = esc(cat_url(c['id']))
    cnt = subtree.get(c['id'], 0)
    cls = 'text-primary font-semibold' if c['id'] == current_id else 'text-default hover:text-link'
    name = esc(c['name'])
    label = '<a href="%s" class="rks-link %s">%s<span class="text-muted text-xs ml-2">%d</span></a>' % (link, cls, name, cnt)
    if kids:
        openattr = ' open' if c['id'] in open_ids else ''
        inner = ''.join(render_node(k, current_id, open_ids) for k in kids)
        return ('<li class="rks-li">'
                '%s'
                '<details class="rks-disc"%s><summary class="rks-arrow" aria-label="Rozbaliť"></summary></details>'
                '<ul class="rks-children pl-3 mt-1 space-y-1 border-l border-hairline">%s</ul>'
                '</li>') % (label, openattr, inner)
    return '<li class="rks-leaf">%s</li>' % label

def build_sidebar(current_id):
    open_ids = ancestors(current_id)
    roots = [c for c in cats if c['parent'] == 0 and subtree.get(c['id'], 0) > 0]
    top = []
    for c in roots:
        if UMBRELLA is not None and c['id'] == UMBRELLA['id']:
            top += [ch for ch in children.get(c['id'], []) if subtree.get(ch['id'], 0) > 0]
        else:
            top.append(c)
    top.sort(key=lambda c: c['name'].lower())
    items = ''.join(render_node(c, current_id, open_ids) for c in top)
    return '<nav class="rks-tree text-sm" aria-label="Kategórie produktov"><ul class="space-y-1">%s</ul></nav>' % items

# ---------------------------------------------------------------- pomocne
def first_sentence(t):
    t = (t or '').strip()
    if not t:
        return ''
    m = re.match(r'(.+?[.!?])(\s|$)', t)
    return (m.group(1) if m else t).strip()

def js(o):
    return json.dumps(o, ensure_ascii=False, indent=2)

def cat_chain(cid):
    """Zoznam kategorii od top (pod umbrellou) po cid vratane, v poradi zhora nadol."""
    chain = []
    cur = cid; seen = set()
    while cur in cat_by_id and cur not in seen:
        seen.add(cur)
        if UMBRELLA is not None and cur == UMBRELLA['id']:
            break
        chain.append(cat_by_id[cur])
        cur = cat_by_id[cur]['parent']
    chain.reverse()
    return chain

def breadcrumb_items(cid, leaf=None):
    """Vizualny + JSON-LD breadcrumb. leaf = (nazov, url|None) pre produkt."""
    items = [
        {'name': 'Produkty', 'url': '/produkty'},
        {'name': 'Katalóg produktov', 'url': ARCHIVE_BASE},
    ]
    for c in cat_chain(cid):
        items.append({'name': c['name'], 'url': cat_url(c['id'])})
    if leaf is not None:
        items.append({'name': leaf[0], 'url': leaf[1]})
    return items

def breadcrumb_jsonld(items):
    return {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        'itemListElement': [
            {'@type': 'ListItem', 'position': i + 1, 'name': it['name'],
             **({'item': SITE_URL + it['url']} if it.get('url') else {})}
            for i, it in enumerate(items)
        ],
    }

def subtree_ids(cid):
    out = [cid]
    for ch in children.get(cid, []):
        out += subtree_ids(ch['id'])
    return out

def slides_for(p):
    base = '/images/katalog-produktov/%d' % p['id']
    gal = ['%s/g%d.webp' % (base, i + 1) for i in range(len(p.get('galeria', [])))]
    return ['%s/main.webp' % base] + gal

def rep_img(cid):
    """Reprezentativny obrazok kategorie = main.webp prveho produktu v podstrome."""
    ids = set(subtree_ids(cid))
    rep = next((p for p in sorted(products, key=lambda p: p['id']) if p['category']['id'] in ids), None)
    return '/images/katalog-produktov/%d/main.webp' % rep['id'] if rep else ''

# ---------------------------------------------------------------- vetva stromu + CTA
RADIO_ROOT = next((c['id'] for c in cats if c['name'] == 'Rádiostanice' and c['parent'] == (UMBRELLA['id'] if UMBRELLA else 0)), None)

def is_radio_branch(cid):
    """True ak kategoria patri do podstromu 'Rádiostanice' (top kategoria pod umbrellou)."""
    cur = cid; seen = set()
    while cur in cat_by_id and cur not in seen:
        seen.add(cur)
        parent = cat_by_id[cur]['parent']
        if UMBRELLA is not None and parent == UMBRELLA['id']:
            return cur == RADIO_ROOT
        cur = parent
    return False

# texty CTA podla vetvy a typu stranky
CTA_RADIO_PRODUCT = ('Servis a príslušenstvo aj pre ukončené modely',
    'Tento produkt už výrobca nedodáva, my ho stále servisujeme. Batérie, príslušenstvo a opravy '
    'riešime aj pre ukončené modely.')
CTA_RADIO_CATEGORY = ('Servis a príslušenstvo aj pre ukončené modely',
    'Produkty z tejto kategórie už výrobca nedodáva, my ich stále servisujeme. Batérie, príslušenstvo '
    'a opravy riešime aj pre ukončené modely.')
CTA_SYSTEMS = ('Dodávka, inštalácia a servis',
    'Evakuačné a varovacie systémy navrhujeme, dodávame, inštalujeme a servisujeme. Radi pripravíme '
    'riešenie pre váš objekt.')
CTA_GENERAL = ('Poradíme s výberom aj servisom',
    'Potrebujete poradiť s výberom, náhradou alebo servisom rádiostaníc a systémov? Ozvite sa a '
    'pripravíme riešenie na mieru.')

# spolocny mobilny prepinac sidebar (vyraznejsi: podfarbenie + viditelna sipka)
MOBILE_SUMMARY = (
    '<summary class="rks-cats-toggle cursor-pointer font-semibold lg:hidden '
    'flex items-center justify-between gap-2 rounded-lg bg-panel-soft px-4 py-3">'
    '<span>Kategórie produktov</span>'
    '<span class="rks-cats-arrow" aria-hidden="true"></span>'
    '</summary>'
)

# spolocne CSS pre strom kategorii + mobilny prepinac (funguje bez JS)
SIDEBAR_CSS = '''
    .rks-tree .rks-li { display: grid; grid-template-columns: 1fr auto; align-items: center; column-gap: 0.5rem; padding-top: 0.25rem; padding-bottom: 0.25rem; }
    .rks-tree .rks-leaf { padding-top: 0.25rem; padding-bottom: 0.25rem; }
    .rks-tree .rks-li > .rks-link { min-width: 0; }
    .rks-tree .rks-children { grid-column: 1 / -1; display: none; }
    .rks-tree .rks-disc[open] ~ .rks-children { display: block; }
    .rks-tree .rks-disc { display: inline-flex; }
    .rks-tree summary.rks-arrow { list-style: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; width: 1.75rem; height: 1.75rem; color: rgba(229, 236, 246, 0.66); }
    .rks-tree summary.rks-arrow::-webkit-details-marker { display: none; }
    .rks-tree summary.rks-arrow::before { content: ""; border-left: 5px solid currentColor; border-top: 4px solid transparent; border-bottom: 4px solid transparent; transition: transform .15s ease; }
    .rks-tree .rks-disc[open] > summary.rks-arrow::before { transform: rotate(90deg); }
    .rks-cats-arrow::before { content: ""; display: inline-block; color: rgba(229, 236, 246, 0.66); border-left: 5px solid currentColor; border-top: 4px solid transparent; border-bottom: 4px solid transparent; transition: transform .15s ease; }
    .rks-cats[open] > .rks-cats-toggle .rks-cats-arrow::before { transform: rotate(90deg); }'''

# ---------------------------------------------------------------- sablona: produkt
PRODUCT_TEMPLATE = '''---
import Layout from '~/layouts/PageLayout.astro';

const p = %(P)s;
const sidebar = %(SIDEBAR)s;
const breadcrumb = %(BREADCRUMB)s;
const ctaHeading = %(CTA_HEADING)s;
const ctaText = %(CTA_TEXT)s;
const metadata = %(META)s;
const jsonld = %(JSONLD)s;
---

<Layout metadata={metadata}>
  <section class="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
    <div class="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
      <aside class="mb-8 lg:mb-0 lg:sticky lg:top-24 lg:self-start">
        <details class="rks-cats rounded-xl border border-hairline p-4 lg:border-0 lg:p-0">
          %(MOBILE_SUMMARY)s
          <div class="rks-tree-wrap mt-3 lg:mt-0" set:html={sidebar} />
        </details>
      </aside>

      <div class="min-w-0">
        <nav class="text-sm text-muted mb-2" aria-label="Omrvinky">
          {breadcrumb.map((b, i) => (
            <>
              {i > 0 && <span class="px-1">/</span>}
              {b.url ? <a class="hover:underline" href={b.url}>{b.name}</a> : <span>{b.name}</span>}
            </>
          ))}
        </nav>
        <h1 class="text-3xl md:text-4xl font-bold tracking-tight mb-6">{p.title}</h1>

        <div class="rks-gallery relative max-w-md mb-8" data-rks-gallery>
          <div class="rks-track flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-xl border border-hairline bg-white" data-track>
            {p.slides.map((src, i) => (
              <div class="rks-slide shrink-0 basis-full snap-center p-4">
                <img src={src} alt={`${p.title}, obrázok ${i + 1}`} class="w-full h-auto mx-auto" loading={i === 0 ? 'eager' : 'lazy'} />
              </div>
            ))}
          </div>
          {p.slides.length > 1 && (
            <>
              <button type="button" data-prev aria-label="Predchádzajúci obrázok" class="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 inline-flex items-center justify-center rounded-full text-[#101010] bg-white/90 border border-hairline shadow-sm hover:bg-white">‹</button>
              <button type="button" data-next aria-label="Ďalší obrázok" class="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 inline-flex items-center justify-center rounded-full text-[#101010] bg-white/90 border border-hairline shadow-sm hover:bg-white">›</button>
              <div class="mt-2 text-center text-sm text-muted" data-counter>1 / {p.slides.length}</div>
            </>
          )}
        </div>

        <div class="prose prose-lg max-w-none" set:html={p.popis_html} />

        {p.parametre.length > 0 && (
          <>
            <h2 class="text-2xl font-semibold tracking-tight mt-10 mb-4">Parametre</h2>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-sm">
                <tbody>
                  {p.parametre.map((r) => (
                    <tr class="border-b border-hairline align-top">
                      <th class="py-2 pr-4 font-medium whitespace-nowrap">{r.nazov}</th>
                      <td class="py-2 text-muted">{r.hodnota}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {p.dokumenty.length > 0 && (
          <>
            <h2 class="text-2xl font-semibold tracking-tight mt-10 mb-4">Dokumenty</h2>
            <ul class="space-y-1">
              {p.dokumenty.map((d) => (
                <li>
                  <a
                    href={`/dokumenty/katalog/${encodeURIComponent(d.subor)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary hover:underline"
                  >
                    {d.titul}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        <div class="mt-14 rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
          <h2 class="text-xl md:text-2xl font-semibold mb-3">{ctaHeading}</h2>
          <p class="text-muted mb-6 max-w-xl mx-auto">{ctaText}</p>
          <a href="/lp/konzultacia.html?utm_source=web&amp;utm_campaign=web" class="btn-primary inline-flex">Dohodnúť nezáväznú konzultáciu</a>
        </div>
      </div>
    </div>
  </section>

  <script type="application/ld+json" set:html={JSON.stringify(jsonld)} />

  <style is:global>
    @media (min-width: 1024px) {
      .rks-cats > summary { display: none; }
      .rks-cats > .rks-tree-wrap { display: block !important; }
    }
    .rks-track::-webkit-scrollbar { display: none; }
    .rks-track { scrollbar-width: none; }%(SIDEBAR_CSS)s
  </style>

  <script is:inline>
    function rksInitGalleries() {
      document.querySelectorAll('[data-rks-gallery]').forEach(function (g) {
        if (g.dataset.rksInit) return;
        g.dataset.rksInit = '1';
        var track = g.querySelector('[data-track]');
        var counter = g.querySelector('[data-counter]');
        var prev = g.querySelector('[data-prev]');
        var next = g.querySelector('[data-next]');
        var total = track ? track.children.length : 0;
        if (!track || total <= 1) return;
        function upd() {
          var i = Math.round(track.scrollLeft / track.clientWidth) + 1;
          if (counter) counter.textContent = i + ' / ' + total;
        }
        if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' }); });
        if (next) next.addEventListener('click', function () { track.scrollBy({ left: track.clientWidth, behavior: 'smooth' }); });
        track.addEventListener('scroll', upd, { passive: true });
        upd();
      });
    }
    document.addEventListener('astro:page-load', rksInitGalleries);
    rksInitGalleries();
  </script>
</Layout>
'''

# ---------------------------------------------------------------- sablona: kategoria / index (spolocna s gridom)
GRID_TEMPLATE = '''---
import Layout from '~/layouts/PageLayout.astro';

const sidebar = %(SIDEBAR)s;
const breadcrumb = %(BREADCRUMB)s;
const heading = %(HEADING)s;
const popisHtml = %(POPIS)s;
const intro = %(INTRO)s;
const subcats = %(SUBCATS)s;
const subcatsHeading = %(SUBHEAD)s;
const products = %(PRODUCTS)s;
const productsHeading = %(PRODHEAD)s;
const notice = %(NOTICE)s;
const noticeDetail = %(NOTICE_DETAIL)s;
const ctaHeading = %(CTA_HEADING)s;
const ctaText = %(CTA_TEXT)s;
const metadata = %(META)s;
const jsonld = %(JSONLD)s;
---

<Layout metadata={metadata}>
  <section class="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
    <div class="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
      <aside class="mb-8 lg:mb-0 lg:sticky lg:top-24 lg:self-start">
        <details class="rks-cats rounded-xl border border-hairline p-4 lg:border-0 lg:p-0">
          %(MOBILE_SUMMARY)s
          <div class="rks-tree-wrap mt-3 lg:mt-0" set:html={sidebar} />
        </details>
      </aside>

      <div class="min-w-0">
        <nav class="text-sm text-muted mb-2" aria-label="Omrvinky">
          {breadcrumb.map((b, i) => (
            <>
              {i > 0 && <span class="px-1">/</span>}
              {b.url ? <a class="hover:underline" href={b.url}>{b.name}</a> : <span>{b.name}</span>}
            </>
          ))}
        </nav>
        <h1 class="text-3xl md:text-4xl font-bold tracking-tight mb-6">{heading}</h1>

        {notice && (
          <div class="mb-8 rounded-xl border border-l-4 border-hairline border-l-secondary bg-panel p-5">
            <p class="text-lg font-semibold tracking-tight">{notice}</p>
            {noticeDetail && <p class="text-base text-muted mt-1">{noticeDetail}</p>}
          </div>
        )}

        {intro.map((par) => (
          <p class="text-lg text-muted mb-4 max-w-2xl" set:html={par} />
        ))}

        {popisHtml && <div class="prose prose-lg max-w-none mb-8" set:html={popisHtml} />}

        {subcats.length > 0 && (
          <>
            {subcatsHeading && <h2 class="text-2xl font-semibold tracking-tight mt-4 mb-4">{subcatsHeading}</h2>}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcats.map((c) => (
                <a href={c.url} class="group block rounded-xl border border-hairline bg-panel overflow-hidden hover:shadow-md transition">
                  <div class="aspect-square bg-white p-4 flex items-center justify-center">
                    <img src={c.img} alt={c.title} class="max-h-full w-auto object-contain" loading="lazy" />
                  </div>
                  <div class="p-4 border-t border-hairline">
                    <h3 class="font-semibold group-hover:text-link">{c.title}</h3>
                    {c.desc && <p class="text-sm text-muted mt-1">{c.desc}</p>}
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {products.length > 0 && (
          <>
            {productsHeading && <h2 class="text-2xl font-semibold tracking-tight mt-10 mb-4">{productsHeading}</h2>}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {products.map((c) => (
                <a href={c.url} class="group block rounded-xl border border-hairline bg-panel overflow-hidden hover:shadow-md transition">
                  <div class="aspect-square bg-white p-4 flex items-center justify-center">
                    <img src={c.img} alt={c.title} class="max-h-full w-auto object-contain" loading="lazy" />
                  </div>
                  <div class="p-4 border-t border-hairline">
                    <h3 class="font-semibold group-hover:text-link">{c.title}</h3>
                    {c.desc && <p class="text-sm text-muted mt-1">{c.desc}</p>}
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        <div class="mt-14 rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
          <h2 class="text-xl md:text-2xl font-semibold mb-3">{ctaHeading}</h2>
          <p class="text-muted mb-6 max-w-xl mx-auto">{ctaText}</p>
          <a href="/lp/konzultacia.html?utm_source=web&amp;utm_campaign=web" class="btn-primary inline-flex">Dohodnúť nezáväznú konzultáciu</a>
        </div>
      </div>
    </div>
  </section>

  <script type="application/ld+json" set:html={JSON.stringify(jsonld)} />

  <style is:global>
    @media (min-width: 1024px) {
      .rks-cats > summary { display: none; }
      .rks-cats > .rks-tree-wrap { display: block !important; }
    }%(SIDEBAR_CSS)s
  </style>
</Layout>
'''

# ---------------------------------------------------------------- generuj produkty
n_prod = 0
for src in ([] if INDEX_ONLY else sorted(products, key=lambda p: p['id'])):
    slides = slides_for(src)
    pobj = {
        'title': src['title'],
        'slides': slides,
        'popis_html': strip_joomla(src['popis_html']),
        'parametre': src['parametre'],
        'dokumenty': [{'subor': d['subor'], 'titul': d['titul']} for d in src.get('attachments', []) if doc_exists(d['subor'])],
    }
    desc = first_sentence(src['popis_text']) or src['title']
    meta = {'title': '%s, katalóg produktov | RKS' % src['title'], 'description': desc}
    cid = src['category']['id']
    cta = CTA_RADIO_PRODUCT if is_radio_branch(cid) else CTA_SYSTEMS
    bc = breadcrumb_items(cid, leaf=(src['title'], None))
    # Product JSON-LD sa uz negeneruje. Google vyzaduje pri type Product jedno
    # z offers / review / aggregateRating; ceny ani hodnotenia nezverejnujeme,
    # takze schema nemohla nikdy vyprodukovat rich result a Search Console ju
    # hlasil ako zavaznu chybu. Ked sa ceny zverejnia, vrat ju sem spolu s offers.
    jsonld = [breadcrumb_jsonld(bc)]
    sidebar = build_sidebar(cid)
    content = PRODUCT_TEMPLATE % {
        'P': js(pobj), 'SIDEBAR': js(sidebar), 'BREADCRUMB': js(bc),
        'CTA_HEADING': js(cta[0]), 'CTA_TEXT': js(cta[1]),
        'META': js(meta), 'JSONLD': js(jsonld),
        'MOBILE_SUMMARY': MOBILE_SUMMARY, 'SIDEBAR_CSS': SIDEBAR_CSS,
    }
    open(os.path.join(OUTDIR, prod_slug[src['id']] + '.astro'), 'w', encoding='utf-8').write(content)
    n_prod += 1

# ---------------------------------------------------------------- karty
def product_cards(prods):
    prods = sorted(prods, key=lambda p: p['title'].lower())
    return [{
        'url': prod_url(p['id']),
        'img': '/images/katalog-produktov/%d/main.webp' % p['id'],
        'title': p['title'],
        'desc': first_sentence(p['popis_text']),
    } for p in prods]

def subcat_cards(cid):
    kids = [ch for ch in children.get(cid, []) if subtree.get(ch['id'], 0) > 0]
    kids.sort(key=lambda c: c['name'].lower())
    return [{
        'url': cat_url(ch['id']),
        'img': rep_img(ch['id']),
        'title': ch['name'],
        'desc': 'Produktov v archíve: %d' % subtree.get(ch['id'], 0),
    } for ch in kids]

def direct_products(cid):
    return [p for p in products if p['category']['id'] == cid]

def subtree_products(cid):
    """Vsetky produkty v podstrome kategorie, aj z vnorenych podkategorii."""
    out = list(direct_products(cid))
    for ch in children.get(cid, []):
        out.extend(subtree_products(ch['id']))
    return out

# ---------------------------------------------------------------- generuj kategorie
n_cat = 0
for c in ([] if INDEX_ONLY else sorted(cats, key=lambda c: c['id'])):
    if subtree.get(c['id'], 0) <= 0:
        continue
    if UMBRELLA is not None and c['id'] == UMBRELLA['id']:
        continue  # umbrella (Produkty) reprezentuje uvodna stranka archivu
    subcats = subcat_cards(c['id'])
    prod_cards = product_cards(direct_products(c['id']))
    # Jedina podkategoria je len zbytocny medzikrok: preskocime ju a ukazeme
    # rovno produkty z celeho podstromu.
    if len(subcats) == 1 and not prod_cards:
        subcats = []
        prod_cards = product_cards(subtree_products(c['id']))
    if subcats:
        # ma podkategorie: hore podkategorie, potom LEN priame produkty (s nadpisom)
        prod_head = 'Produkty' if prod_cards else ''
    else:
        # koncova kategoria: len produkty (priame == cely podstrom), bez nadpisu
        prod_head = ''
    bc = breadcrumb_items(c['id'])
    bc[-1]['url'] = None  # aktualna kategoria bez linku
    meta = {
        'title': '%s, katalóg produktov | RKS' % c['name'],
        'description': first_sentence(re.sub('<[^>]+>', ' ', cat_popis(c))) or
                       ('Katalóg produktov v kategórii %s. Parametre, dokumentácia a servisné informácie.' % c['name']),
    }
    cta = CTA_RADIO_CATEGORY if is_radio_branch(c['id']) else CTA_SYSTEMS
    jsonld = breadcrumb_jsonld(breadcrumb_items(c['id']))
    content = GRID_TEMPLATE % {
        'SIDEBAR': js(build_sidebar(c['id'])),
        'BREADCRUMB': js(bc),
        'HEADING': js(c['name']),
        'POPIS': js(cat_popis(c)),
        'NOTICE': js(DISCONTINUED_NOTE if c['id'] in DISCONTINUED_CATS else ''),
        'NOTICE_DETAIL': js(DISCONTINUED_DETAIL if c['id'] in DISCONTINUED_CATS else ''),
        'INTRO': js([]),
        'SUBCATS': js(subcats),
        'SUBHEAD': js('Podkategórie' if subcats else ''),
        'PRODUCTS': js(prod_cards),
        'PRODHEAD': js(prod_head),
        'CTA_HEADING': js(cta[0]),
        'CTA_TEXT': js(cta[1]),
        'META': js(meta),
        'JSONLD': js(jsonld),
        'MOBILE_SUMMARY': MOBILE_SUMMARY,
        'SIDEBAR_CSS': SIDEBAR_CSS,
    }
    open(os.path.join(CATDIR, cat_slug[c['id']] + '.astro'), 'w', encoding='utf-8').write(content)
    n_cat += 1

# ---------------------------------------------------------------- generuj index
top_cats = []
if UMBRELLA is not None:
    top_cats = [ch for ch in children.get(UMBRELLA['id'], []) if subtree.get(ch['id'], 0) > 0]
# fixne poradie hlavnych kategorii, zvysok abecedne za nimi
TOP_ORDER = ['Rádiostanice', 'Evakuačné systémy', 'Varovacie a vyrozumievacie systémy']
def _top_key(c):
    n = c['name']
    return (TOP_ORDER.index(n), '') if n in TOP_ORDER else (len(TOP_ORDER), n.lower())
top_cats.sort(key=_top_key)

top_cards = []
for c in top_cats:
    # reprezentativny obrazok: hlavny obrazok prveho produktu v podstrome
    ids = set(subtree_ids(c['id']))
    rep = next((p for p in sorted(products, key=lambda p: p['id']) if p['category']['id'] in ids), None)
    img = '/images/katalog-produktov/%d/main.webp' % rep['id'] if rep else ''
    top_cards.append({
        'url': cat_url(c['id']),
        'img': img,
        'title': c['name'],
        'desc': 'Produktov v archíve: %d' % subtree.get(c['id'], 0),
    })

intro = [
    'Katalóg produktov RKS: rádiostanice (vysielačky), evakuačné systémy a varovacie systémy. Pri rádiostaniciach '
    'nájdete aj ukončené modely, ktoré stále servisujeme a dodávame k nim príslušenstvo.',
    'Aktuálny katalóg Motorola MOTOTRBO nájdete na '
    '<a class="text-primary hover:underline" href="https://mototrbo.sk">mototrbo.sk</a>.',
]
index_meta = {
    'title': 'Katalóg produktov | RKS',
    'description': 'Katalóg produktov RKS: rádiostanice, evakuačné systémy a varovacie systémy. '
                   'Pri rádiostaniciach nájdete aj ukončené modely, ktoré stále servisujeme.',
}
index_ld = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    'name': 'Katalóg produktov', 'url': SITE_URL + ARCHIVE_BASE,
    'description': index_meta['description'],
}
index_content = GRID_TEMPLATE % {
    'SIDEBAR': js(build_sidebar(0)),
    'BREADCRUMB': js([
        {'name': 'Produkty', 'url': '/produkty'},
        {'name': 'Katalóg produktov', 'url': None},
    ]),
    'HEADING': js('Katalóg produktov'),
    'POPIS': js(''),
    'INTRO': js(intro),
    'SUBCATS': js(top_cards),
    'SUBHEAD': js(''),
    'PRODUCTS': js([]),
    'PRODHEAD': js(''),
    'NOTICE': js(''),
    'NOTICE_DETAIL': js(''),
    'CTA_HEADING': js(CTA_GENERAL[0]),
    'CTA_TEXT': js(CTA_GENERAL[1]),
    'META': js(index_meta),
    'JSONLD': js(index_ld),
    'MOBILE_SUMMARY': MOBILE_SUMMARY,
    'SIDEBAR_CSS': SIDEBAR_CSS,
}
open(os.path.join(OUTDIR, 'index.astro'), 'w', encoding='utf-8').write(index_content)

# ---------------------------------------------------------------- report
print('Produktovych stranok:', n_prod)
print('Kategoriovych stranok:', n_cat)
print('Index: 1')
print('Kolizie produktovych aliasov:', len(prod_collisions))
for pid, title, base, slug in prod_collisions:
    print('  id %d "%s": %s -> %s' % (pid, title, base, slug))
print('Kolizie kategoriovych aliasov:', len(cat_collisions))
for cid, name, base, slug in cat_collisions:
    print('  id %d "%s": %s -> %s' % (cid, name, base, slug))
