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
from urllib.parse import unquote

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

# ---------------------------------------------------------------- MOTOTRBO (migracia z mototrbo.sk)
# Nove vetvy zijú v tych istych JSONoch, ale:
#  - nesmu sa objavit v bocnom paneli ani na uvodnej stranke archivu (Step 3),
#  - vsetky ich stranky su noindex a mimo sitemap.
MOTO_CAT_IDS  = {c['id'] for c in cats if c.get('zdroj') == 'mototrbo'}
MOTO_ROOT_IDS = {c['id'] for c in cats if c.get('zdroj') == 'mototrbo' and c['parent'] == 0}
MOTO_PROD_IDS = {p['id'] for p in products if p.get('zdroj') == 'mototrbo'}
# korene mototrbo stromu, ktore su radiove (dnes jediny: "Rádiostanice")
MOTO_RADIO_ROOT_IDS = {c['id'] for c in cats
                       if c['id'] in MOTO_ROOT_IDS and c['name'] == 'Rádiostanice'}
def is_moto_cat(cid):  return cid in MOTO_CAT_IDS
def is_moto_prod(pid): return pid in MOTO_PROD_IDS
NOINDEX = {'index': False, 'follow': False}

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
# Poradie radiostanicnych podkategorii: Prenosne -> Vozidlove -> Prevadzace
# (Richi #2). Ostatne podkategorie ostavaju abecedne.
RADIO_SUBCAT_ORDER = {'prenosné rádiostanice': 0, 'vozidlové rádiostanice': 1, 'prevádzače': 2}
def _cat_sort_key(c):
    n = c['name'].strip().lower()
    return (RADIO_SUBCAT_ORDER.get(n, 99), n)
for k in children:
    children[k].sort(key=_cat_sort_key)

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
_roots = [c for c in cats if c['parent'] == 0 and subtree.get(c['id'], 0) > 0
          and c['id'] not in MOTO_ROOT_IDS]
UMBRELLA = max(_roots, key=lambda c: subtree[c['id']]) if _roots else None

def esc(s):
    return htmlmod.escape(str(s), quote=True)

# ---------------------------------------------------------------- cistenie po Joomle / K2
# Joomla content plugins ostali v popisoch ako text, napr. {gall}page21{/gall}.
# Odstranime parove {tag}...{/tag} aj osamotene {tag} / {/tag} a potom prazdne
# odstavce, ktore po nich zostanu.
_JOOMLA_PAIR = re.compile(r'\{([a-zA-Z][\w-]*)\b[^{}]*\}.*?\{/\1\}', re.S)
_JOOMLA_SOLO = re.compile(r'\{/?[a-zA-Z][\w-]*\b[^{}]*\}')
_EMPTY_P = re.compile(r'<p>(?:\s|&nbsp;|<br\s*/?>)*</p>', re.I)
# Extractor z mototrbo.sk uz {gall}...{/gall} odstranil, ale nazov galerie ostal
# v texte ako holy token ("page17"). Mazeme len samostatne stojace tokeny.
_K2_PAGE = re.compile(r'(?<![\w-])page\d+(?![\w-])', re.I)
_SAFE_HREF = re.compile(r'^(https?:|mailto:|tel:|ftp:|#)', re.I)
_TAG_SPLIT = re.compile(r'(<[^>]*>)')

def _map_text(h, fn):
    """Aplikuje fn len na textove uzly, obsah znaciek (href, src, ...) nechava tak."""
    parts = _TAG_SPLIT.split(h)
    return ''.join(p if i % 2 else fn(p) for i, p in enumerate(parts))

def strip_joomla(h):
    out = _JOOMLA_PAIR.sub('', h)
    out = _JOOMLA_SOLO.sub('', out)
    out = _map_text(out, lambda t: _K2_PAGE.sub('', t))
    return out

# ---------------------------------------------------------------- rozbite odkazy z K2
# V popisoch ostali odkazy stareho webu: relativne ("index.php?option=com_k2...",
# "images/files/Compare_table.pdf") aj root-relativne na sekcie, ktore na rksba.sk
# neexistuju ("/prenosne-radiostanice/..."). Relativna cesta sa navyse rozvinie voci
# URL kategorie/produktu, takze z nej vznikne uplne nahodna mrtva adresa.
# Odkaz nechavame len ak je absolutny, alebo ak root-relativna cesta naozaj existuje
# (nasa stranka v src/pages, subor v public/ alebo stranka katalogu).
def _static_routes():
    out, dynamic = set(), set()
    base = os.path.join(ROOT, 'src', 'pages')
    for dirpath, _dirs, files in os.walk(base):
        for f in files:
            if not f.endswith(('.astro', '.md', '.mdx', '.html')):
                continue
            rel = os.path.relpath(os.path.join(dirpath, f), base)
            route = '/' + re.sub(r'\.(astro|md|mdx|html)$', '', rel)
            if '[' in route:
                # dynamicka routa: povolime cely jej podstrom (/blog/... a pod.)
                dynamic.add(route.split('[')[0].rstrip('/') or '/')
            else:
                out.add(re.sub(r'/index$', '', route) or '/')
    return out, dynamic

STATIC_ROUTES, DYNAMIC_PREFIXES = _static_routes()
PUBLIC_DIR = os.path.join(ROOT, 'public')
dead_links = []   # [(kde, href)] do zaverecneho reportu

def _href_alive(u):
    if _SAFE_HREF.match(u):
        return True
    if not u.startswith('/'):
        return False
    path = htmlmod.unescape(u).split('?')[0].split('#')[0].rstrip('/') or '/'
    if path in STATIC_ROUTES or path.startswith(ARCHIVE_BASE + '/') or path == ARCHIVE_BASE:
        return True
    if any(path == d or path.startswith(d + '/') for d in DYNAMIC_PREFIXES if d != '/'):
        return True
    return os.path.isfile(os.path.join(PUBLIC_DIR, unquote(path.lstrip('/'))))

def kill_dead_links(h, kde=''):
    """Mrtvy <a> nahradi jeho vlastnym textom, mrtvy <img> zahodi cely."""
    def _a(m):
        if _href_alive(m.group(1)):
            return m.group(0)
        dead_links.append((kde, m.group(1)))
        return m.group(2)
    out = re.sub(r'<a\b[^>]*\bhref="([^"]*)"[^>]*>(.*?)</a>', _a, h, flags=re.S | re.I)
    # <a> bez href (kotvy po K2) uz nic nerobi, rozbalime ho tiez
    out = re.sub(r'<a\b(?![^>]*\bhref=)[^>]*>(.*?)</a>', r'\1', out, flags=re.S | re.I)

    def _img(m):
        if _href_alive(m.group(1)):
            return m.group(0)
        dead_links.append((kde, m.group(1)))
        return ''
    return re.sub(r'<img\b[^>]*\bsrc="([^"]*)"[^>]*/?>', _img, out, flags=re.I)

# ---------------------------------------------------------------- nadpisy v popisoch
# K2 popisy zacinaju vlastnym <h1>, takze na stranke boli dva H1 (nas nazov kategorie
# + nadpis z popisu). Ak nadpis len opakuje nazov stranky, zahodime ho cely; inak ho
# degradujeme na <h2>. Kazdy dalsi <h1> v tele degradujeme tiez.
_LEAD_HEADING = re.compile(r'^\s*<(h[12])\b[^>]*>(.*?)</\1>\s*', re.S | re.I)

def _plain(h):
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', htmlmod.unescape(h))).strip().lower()

def fix_headings(h, title):
    m = _LEAD_HEADING.match(h)
    if m and _plain(m.group(2)) == _plain(title):
        h = h[m.end():]
    return re.sub(r'<(/?)h1\b', r'<\1h2', h, flags=re.I)

def clean(h, kde='', title=None):
    """Kompletne vycistenie popisu po migracii (Joomla tagy, K2 galerie, mrtve odkazy)."""
    if not h:
        return h
    out = strip_joomla(h)
    out = kill_dead_links(out, kde)
    if title is not None:
        out = fix_headings(out, title)
    # az na konci: chyta aj odstavce, ktore ostali prazdne po vyhodenom obrazku/odkaze
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
    return clean(CAT_POPIS_FIX.get(c['id'], c.get('popis_html', '') or ''),
                 kde='kategoria %d %s' % (c['id'], c['name']), title=c['name'])

# ---------------------------------------------------------------- slugify + kolizie
def slugify(s):
    s = unicodedata.normalize('NFKD', str(s))
    s = ''.join(ch for ch in s if not unicodedata.combining(ch))
    s = s.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s or 'kat'

# ---------------------------------------------------------------- slug prioritizacia
# MOTOTRBO je hlavny katalog a ma prednost na cistu (kanonicku) adresu.
# Export z mototrbo.sk mal v aliase zapecene "-mototrbo" (a raz "-mototrbo-2"),
# lebo part numbers koliduju so starym archivom. Ten sufix tu odstranujeme a
# kolizna ARCHIVNA polozka dostane "-archiv". Zvysne kolizie riesi ako predtym
# pripona -<id>. Mapa zodpoveda _materials/mototrbo/rename-plan.csv.
MOTO_SLUG_FIX = {
    20552: 'pmln6853',   # alias je pmln6852-mototrbo, ale ide o PMLN6853
    20560: 'hkvn4407',   # alias je hkvn4405-mototrbo, ale ide o HKVN4407
}
_MOTO_SUFFIX_RE = re.compile(r'-mototrbo(-\d+)?$')

def moto_base(o, kind):
    """Cisty slug pre MOTOTRBO polozku (bez migracnych sufixov)."""
    if o['id'] in MOTO_SLUG_FIX:
        return MOTO_SLUG_FIX[o['id']]
    base = slugify(o['alias'])
    stripped = _MOTO_SUFFIX_RE.sub('', base)
    return stripped or base

def assign_slugs(items, kind, label_key):
    """MOTOTRBO prve (rezervuje si cisty slug), archiv az potom s -archiv."""
    slug = {}
    seen = {}
    collisions = []
    moto = [o for o in items if o.get('zdroj') == 'mototrbo']
    rest = [o for o in items if o.get('zdroj') != 'mototrbo']
    moto_ids = {o['id'] for o in moto}

    for o in sorted(moto, key=lambda o: o['id']):
        base = moto_base(o, kind)
        s = base
        if s in seen:
            s = '%s-%d' % (base, o['id'])
            collisions.append((o['id'], o[label_key], base, s))
        seen[s] = o['id']
        slug[o['id']] = s

    for o in sorted(rest, key=lambda o: o['id']):
        base = slugify(o['alias'])
        s = base
        if s in seen:
            if seen[s] in moto_ids:
                # cistu adresu drzi MOTOTRBO -> archiv ide na -archiv
                s = '%s-archiv' % base
                if s in seen:
                    s = '%s-archiv-%d' % (base, o['id'])
            else:
                # kolizia archiv vs archiv: povodne spravanie, pripona -<id>
                s = '%s-%d' % (base, o['id'])
            collisions.append((o['id'], o[label_key], base, s))
        seen[s] = o['id']
        slug[o['id']] = s

    return slug, seen, collisions

cat_slug, _seen_cat, cat_collisions = assign_slugs(cats, 'cat', 'name')
prod_slug, _seen_prod, prod_collisions = assign_slugs(products, 'prod', 'title')

# Archivne produktove duplikaty: rovnaky Motorola part number je aj v MOTOTRBO.
# MOTOTRBO verzia je jedina stranka na cistej adrese, archivny dvojnik sa do nej
# zlucuje - vlastnu stranku nedostane a vsetky odkazy nan vedu na MOTOTRBO.
# (Archivne KATEGORIE sa nezlucuju, obsahuju genuine archivne produkty.)
MERGED_PROD = {}
for _p in products:
    if _p.get('zdroj') == 'mototrbo':
        continue
    _base = slugify(_p['alias'])
    _holder = _seen_prod.get(_base)
    if _holder is not None and _holder != _p['id'] and _holder in MOTO_PROD_IDS:
        MERGED_PROD[_p['id']] = _base

def cat_url(cid):
    return CAT_BASE + '/' + cat_slug[cid]

def prod_url(pid):
    # zluceny archivny duplikat ukazuje na MOTOTRBO verziu
    return ARCHIVE_BASE + '/' + MERGED_PROD.get(pid, prod_slug[pid])

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
    # MOTOTRBO strom je oddeleny: na mototrbo strankach sa zobrazi len on,
    # na povodnom archive sa nezobrazi vobec (do hlavneho stromu ide az v Step 3).
    moto = is_moto_cat(current_id)
    roots = [c for c in cats if c['parent'] == 0 and subtree.get(c['id'], 0) > 0
             and (c['id'] in MOTO_ROOT_IDS) == moto]
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
        # MOTOTRBO strom visi na vlastnom koreni (parent 0), nie pod umbrellou —
        # bez tejto vetvy padal cely mototrbo katalog do systemoveho CTA.
        if parent == 0:
            return cur in MOTO_RADIO_ROOT_IDS
        if UMBRELLA is not None and parent == UMBRELLA['id']:
            return cur == RADIO_ROOT
        cur = parent
    return False

# texty CTA podla vetvy a typu stranky
CTA_RADIO_PRODUCT = ('Servis a príslušenstvo aj po ukončení výroby',
    'Tento produkt už výrobca nedodáva, my ho stále servisujeme. Servis, batérie, príslušenstvo a opravy '
    'robíme aj pre modely, ktorých výroba bola ukončená.')
CTA_RADIO_CATEGORY = ('Servis a príslušenstvo aj po ukončení výroby',
    'Produkty z tejto kategórie už výrobca nedodáva, my ich stále servisujeme. Servis, batérie, príslušenstvo '
    'a opravy robíme aj pre modely, ktorých výroba bola ukončená.')
CTA_SYSTEMS = ('Dodávka, inštalácia a servis',
    'Evakuačné a varovacie systémy navrhujeme, dodávame, inštalujeme a servisujeme. Radi pripravíme '
    'riešenie pre váš objekt.')
CTA_GENERAL = ('Poradíme s výberom aj servisom',
    'Potrebujete poradiť s výberom, náhradou alebo servisom rádiostaníc a systémov? Ozvite sa a '
    'pripravíme riešenie na mieru.')
# MOTOTRBO je ziva ponuka (661 z 773 produktov sa stale predava), takze tu sa neda
# pouzit archivne CTA "uz sa nedodava" — to ostava len pre polozky "Ukončený predaj".
CTA_MOTO_CATEGORY = ('Poradíme s výberom aj servisom',
    'Vyberáte rádiostanice Motorola MOTOTRBO alebo príslušenstvo k nim? Poradíme s výberom, '
    'dodávkou, programovaním aj servisom.')
CTA_MOTO_PRODUCT = ('Poradíme s výberom aj servisom',
    'Potrebujete poradiť s týmto produktom, kompatibilným príslušenstvom alebo servisom? '
    'Ozvite sa a pripravíme riešenie na mieru.')

# spolocny mobilny prepinac sidebar (vyraznejsi: podfarbenie + viditelna sipka)
MOBILE_SUMMARY = (
    '<summary class="rks-cats-toggle cursor-pointer font-semibold lg:hidden '
    'flex items-center justify-between gap-2 rounded-lg bg-panel-soft px-4 py-3">'
    '<span>Kategórie produktov</span>'
    '<span class="rks-cats-arrow" aria-hidden="true"></span>'
    '</summary>'
)

# Bocne panely su <details class="rks-cats">: na mobile zbaliteľne, na desktope
# rozbalene. Rozbalenie sa NEDA spravit cez CSS — Chrome skryva obsah zatvoreneho
# <details> cez content-visibility: hidden na pseudoelemente ::details-content, nie
# cez display:none na dietati, takze ani ".rks-cats > .rks-tree-wrap { display: block
# !important }" ho neodkryje (dieta ma display:block, ale samotny <details> ma vysku 0).
# Jedina spolahliva paka je atribut open:
#   - do HTML ho zapiseme natvrdo, takze desktop je spravny aj bez JS a bez preblesku,
#   - tento skript ho na uzkom okne zhodi a pri zmene sirky drzi stav v synchronizacii.
# data-rks-auto oznacuje stav, ktory nastavil skript/HTML; ked panel prepne pouzivatel,
# priznak zmizne a na mobile mu ho uz nezatvarame.
PANEL_SYNC_SCRIPT = '''  <script is:inline>
    (function () {
      var mq = window.matchMedia('(min-width: 1024px)');
      function sync() {
        document.querySelectorAll('details.rks-cats').forEach(function (d) {
          if (mq.matches) {
            d.open = true;
            d.dataset.rksAuto = '1';
          } else if (d.dataset.rksAuto === '1') {
            d.open = false;
            d.dataset.rksAuto = '';
          }
        });
      }
      sync();
      if (mq.addEventListener) mq.addEventListener('change', sync);
      else if (mq.addListener) mq.addListener(sync);
      document.addEventListener('astro:page-load', sync);
    })();
  </script>'''

# mobilny prepinac filtra (na desktope je panel vzdy otvoreny, viď PANEL_SYNC_SCRIPT)
FILTER_SUMMARY = (
    '<summary class="rks-cats-toggle cursor-pointer font-semibold lg:hidden '
    'flex items-center justify-between gap-2 rounded-lg bg-panel-soft px-4 py-3">'
    '<span>Filtrovať produkty</span>'
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

# CSS bocneho filtra (zvisly accordion fasiet); dopĺňa SIDEBAR_CSS na gridovych strankach
FILTER_CSS = '''
    .rks-facet > summary { list-style: none; }
    .rks-facet > summary::-webkit-details-marker { display: none; }
    .rks-facet-arrow::before { content: ""; display: inline-block; color: rgba(229, 236, 246, 0.66); border-left: 5px solid currentColor; border-top: 4px solid transparent; border-bottom: 4px solid transparent; transition: transform .15s ease; }
    .rks-facet[open] > summary .rks-facet-arrow::before { transform: rotate(90deg); }
    .rks-facet-vals { max-height: 15rem; overflow-y: auto; }
    .rks-filter input[type="number"]::-webkit-outer-spin-button,
    .rks-filter input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
    .rks-filter input[type="number"] { -moz-appearance: textfield; }'''

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
        <details class="rks-cats rounded-xl border border-hairline p-4 lg:border-0 lg:p-0" data-rks-auto="1" open>
          %(MOBILE_SUMMARY)s
          <div class="rks-tree-wrap mt-3 lg:mt-0" set:html={sidebar} />
        </details>
      </aside>
%(PANEL_SYNC_SCRIPT)s

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
const filters = %(FILTERS)s;
const freq = %(FREQ)s;
const hasFilter = filters.length > 0 || freq !== null;
---

<Layout metadata={metadata}>
  <section class="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
    <div class="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
      <aside class="mb-8 lg:mb-0 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">
        <details class="rks-cats rounded-xl border border-hairline p-4 lg:border-0 lg:p-0" data-rks-auto="1" open>
          %(MOBILE_SUMMARY)s
          <div class="rks-tree-wrap mt-3 lg:mt-0" set:html={sidebar} />
        </details>

        {hasFilter && (
          <details class="rks-cats rks-filter mt-4 lg:mt-8 rounded-xl border border-hairline p-4 lg:border-0 lg:p-0" data-rks-filter data-rks-auto="1" open>
            %(FILTER_SUMMARY)s
            <div class="rks-panel-body mt-3 lg:mt-0 lg:border-t lg:border-hairline lg:pt-4">
              <div class="flex items-baseline justify-between gap-3">
                <h2 class="text-sm font-semibold tracking-tight">Filtrovať</h2>
                <button type="button" class="text-xs text-link hover:underline" data-rks-reset>Zrušiť filtre</button>
              </div>
              <p class="text-xs text-muted mt-1" data-rks-summary></p>

              {freq && (
                <div class="mt-4 pt-3 border-t border-hairline">
                  <label class="block text-sm font-medium mb-2" for="rks-freq">Zadaj frekvenciu (MHz)</label>
                  <div class="flex items-center gap-2">
                    <input
                      id="rks-freq"
                      type="number"
                      step="any"
                      inputmode="decimal"
                      placeholder={freq.placeholder}
                      class="w-full min-w-0 rounded-lg border border-hairline bg-page px-3 py-2 text-sm"
                      data-rks-freq
                    />
                    <button
                      type="button"
                      class="shrink-0 rounded-lg border border-hairline px-3 py-2 text-xs text-muted hover:text-link"
                      aria-label="Zrušiť frekvenciu"
                      data-rks-freq-clear
                    >
                      ✕
                    </button>
                  </div>
                  <p class="text-xs text-muted mt-1">
                    Rozsah v katalógu: {freq.label}. Zobrazia sa len produkty, ktorých rozsah zadanú frekvenciu obsahuje.
                  </p>
                </div>
              )}

              {filters.map((f, i) => (
                <details class="rks-facet border-t border-hairline" open={i === 0}>
                  <summary class="cursor-pointer select-none flex items-center justify-between gap-2 py-2 text-sm font-medium">
                    <span>{f.nazov}</span>
                    <span class="rks-facet-arrow" aria-hidden="true"></span>
                  </summary>
                  <div class="rks-facet-vals pb-3 pr-1 space-y-1">
                    {f.hodnoty.map((v) => (
                      <label class="flex items-center gap-2 text-sm cursor-pointer" data-rks-opt={f.key + '|~|' + v.hodnota}>
                        <input type="checkbox" class="accent-primary" data-rks-f={f.key} value={v.hodnota} />
                        <span class="flex-1">{v.hodnota}</span>
                        <span class="text-muted text-xs tabular-nums" data-rks-cnt>{v.pocet}</span>
                      </label>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </details>
        )}
      </aside>
%(PANEL_SYNC_SCRIPT)s

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

        {products.length > 0 && (
          <>
            {productsHeading && <h2 class="text-2xl font-semibold tracking-tight mt-2 mb-4">{productsHeading}</h2>}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4" data-rks-grid>
              {products.map((c) => (
                <a href={c.url} data-facets={c.facets} data-freq={c.freq} class="rks-card group block rounded-xl border border-hairline bg-panel overflow-hidden hover:shadow-md transition">
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
            {hasFilter && (
              <p class="hidden text-muted mt-6" data-rks-empty>Zvolenému filtru nezodpovedá žiadny produkt.</p>
            )}
          </>
        )}

        {subcats.length > 0 && (
          <>
            {subcatsHeading && <h2 class="text-2xl font-semibold tracking-tight mt-10 mb-4">{subcatsHeading}</h2>}
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

        <div class="mt-14 rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
          <h2 class="text-xl md:text-2xl font-semibold mb-3">{ctaHeading}</h2>
          <p class="text-muted mb-6 max-w-xl mx-auto">{ctaText}</p>
          <a href="/lp/konzultacia.html?utm_source=web&amp;utm_campaign=web" class="btn-primary inline-flex">Dohodnúť nezáväznú konzultáciu</a>
        </div>
      </div>
    </div>
  </section>

  <script type="application/ld+json" set:html={JSON.stringify(jsonld)} />

  {hasFilter && (
    <script is:inline>
      function rksInitFilter() {
        var root = document.querySelector('[data-rks-filter]');
        var grid = document.querySelector('[data-rks-grid]');
        if (!root || !grid) return;
        var cards = Array.prototype.slice.call(grid.querySelectorAll('.rks-card'));
        var boxes = Array.prototype.slice.call(root.querySelectorAll('input[data-rks-f]'));
        var summary = root.querySelector('[data-rks-summary]');
        var empty = document.querySelector('[data-rks-empty]');
        var freqInput = root.querySelector('[data-rks-freq]');
        var parsed = cards.map(function (c) {
          try { return JSON.parse(c.getAttribute('data-facets') || '{}'); } catch (e) { return {}; }
        });
        // [[min, max], ...] v MHz; prazdne pole = produkt nema frekvencny rozsah
        var ranges = cards.map(function (c) {
          try { return JSON.parse(c.getAttribute('data-freq') || '[]'); } catch (e) { return []; }
        });
        function selection() {
          var m = {};
          boxes.forEach(function (b) {
            if (b.checked) { (m[b.getAttribute('data-rks-f')] = m[b.getAttribute('data-rks-f')] || []).push(b.value); }
          });
          return m;
        }
        function freqValue() {
          if (!freqInput) return null;
          var raw = (freqInput.value || '').trim().replace(',', '.');
          if (!raw) return null;
          var n = parseFloat(raw);
          return isNaN(n) ? null : n;
        }
        function matches(i, m, mhz) {
          if (mhz !== null) {
            // produkt bez rozsahu sa pri aktivnom frekvencnom filtri skryva
            var rr = ranges[i], hit = false;
            for (var j = 0; j < rr.length; j++) {
              if (mhz >= rr[j][0] && mhz <= rr[j][1]) { hit = true; break; }
            }
            if (!hit) return false;
          }
          var f = parsed[i];
          for (var k in m) {
            var have = f[k] || [];
            var ok = m[k].some(function (v) { return have.indexOf(v) !== -1; });
            if (!ok) return false;
          }
          return true;
        }
        function plural(n) {
          return n === 1 ? 'produkt' : (n >= 2 && n <= 4 ? 'produkty' : 'produktov');
        }
        function apply() {
          var m = selection(), mhz = freqValue(), shown = 0;
          cards.forEach(function (c, i) {
            var ok = matches(i, m, mhz);
            c.style.display = ok ? '' : 'none';
            if (ok) shown++;
          });
          // prepocitaj pocty: kolko by ostalo, keby sa pridala prave tato hodnota
          root.querySelectorAll('label[data-rks-opt]').forEach(function (lab) {
            var parts = lab.getAttribute('data-rks-opt').split('|~|');
            var k = parts[0], v = parts[1];
            var m2 = {}; for (var kk in m) m2[kk] = m[kk].slice();
            m2[k] = [v];
            var n = 0;
            for (var i = 0; i < cards.length; i++) { if (matches(i, m2, mhz)) n++; }
            lab.querySelector('[data-rks-cnt]').textContent = n;
            var box = lab.querySelector('input');
            lab.style.display = (n === 0 && !box.checked) ? 'none' : '';
          });
          // skupinu bez pouzitelnej hodnoty netreba zobrazovat
          root.querySelectorAll('.rks-facet').forEach(function (d) {
            var vis = Array.prototype.slice.call(d.querySelectorAll('label[data-rks-opt]')).some(function (l) {
              return l.style.display !== 'none';
            });
            d.style.display = vis ? '' : 'none';
          });
          if (summary) {
            summary.textContent = shown === cards.length
              ? cards.length + ' ' + plural(cards.length)
              : shown + ' z ' + cards.length + ' ' + plural(cards.length);
          }
          if (empty) empty.classList.toggle('hidden', shown !== 0);
        }
        boxes.forEach(function (b) { b.addEventListener('change', apply); });
        if (freqInput) freqInput.addEventListener('input', apply);
        var freqClear = root.querySelector('[data-rks-freq-clear]');
        if (freqClear) freqClear.addEventListener('click', function () {
          if (freqInput) freqInput.value = '';
          apply();
        });
        var reset = root.querySelector('[data-rks-reset]');
        if (reset) reset.addEventListener('click', function () {
          boxes.forEach(function (b) { b.checked = false; });
          if (freqInput) freqInput.value = '';
          apply();
        });
        apply();
      }
      document.addEventListener('astro:page-load', rksInitFilter);
      rksInitFilter();
    </script>
  )}

  <style is:global>
    @media (min-width: 1024px) {
      .rks-cats > summary { display: none; }
      .rks-cats > .rks-tree-wrap,
      .rks-cats > .rks-panel-body { display: block !important; }
    }%(SIDEBAR_CSS)s%(FILTER_CSS)s
  </style>
</Layout>
'''

# ---------------------------------------------------------------- generuj produkty
n_prod = 0
for src in ([] if INDEX_ONLY else sorted(products, key=lambda p: p['id'])):
    if src['id'] in MERGED_PROD:
        continue  # duplikat zluceny do MOTOTRBO verzie na cistej adrese
    slides = slides_for(src)
    pobj = {
        'title': src['title'],
        'slides': slides,
        'popis_html': clean(src['popis_html'],
                            kde='produkt %d %s' % (src['id'], src['title']), title=src['title']),
        'parametre': src['parametre'],
        'dokumenty': [{'subor': d['subor'], 'titul': d['titul']} for d in src.get('attachments', []) if doc_exists(d['subor'])],
    }
    desc = first_sentence(src['popis_text']) or src['title']
    meta = {'title': '%s, katalóg produktov | RKS' % src['title'], 'description': desc}
    cid = src['category']['id']
    if is_moto_prod(src['id']):
        # ukoncene modely aj v mototrbo vetve dostanu servisne CTA, zvysok neutralne
        cta = CTA_RADIO_PRODUCT if src['title'].lower().startswith('ukončený') else CTA_MOTO_PRODUCT
    elif is_radio_branch(cid):
        cta = CTA_RADIO_PRODUCT
    else:
        cta = CTA_SYSTEMS
    bc = breadcrumb_items(cid, leaf=(src['title'], None))
    # Product JSON-LD sa uz negeneruje. Google vyzaduje pri type Product jedno
    # z offers / review / aggregateRating; ceny ani hodnotenia nezverejnujeme,
    # takze schema nemohla nikdy vyprodukovat rich result a Search Console ju
    # hlasil ako zavaznu chybu. Ked sa ceny zverejnia, vrat ju sem spolu s offers.
    jsonld = [breadcrumb_jsonld(bc)]
    if is_moto_prod(src['id']):
        meta['robots'] = NOINDEX
    sidebar = build_sidebar(cid)
    content = PRODUCT_TEMPLATE % {
        'P': js(pobj), 'SIDEBAR': js(sidebar), 'BREADCRUMB': js(bc),
        'CTA_HEADING': js(cta[0]), 'CTA_TEXT': js(cta[1]),
        'META': js(meta), 'JSONLD': js(jsonld),
        'MOBILE_SUMMARY': MOBILE_SUMMARY, 'PANEL_SYNC_SCRIPT': PANEL_SYNC_SCRIPT,
        'SIDEBAR_CSS': SIDEBAR_CSS,
    }
    open(os.path.join(OUTDIR, prod_slug[src['id']] + '.astro'), 'w', encoding='utf-8').write(content)
    n_prod += 1

# ---------------------------------------------------------------- karty
def facet_key(nazov):
    return slugify(nazov) or 'f'

# Viac hodnot v jednom parametri je oddelenych ciarkou a medzerou ("DP4400, DP4400e").
# Delit na holej ciarke sa neda: rozbilo by to desatinne cisla ("1,5", "3,5 mm jack",
# "0,5 – 2 W"), z ktorych potom vznikali fasetove hodnoty "1" a "5".
_FACET_SPLIT = re.compile(r',\s+')

def split_facet(hodnota):
    return [v.strip() for v in _FACET_SPLIT.split(str(hodnota or '')) if v.strip()]

def card_facets(p):
    """Mapa {kluc_fasety: [hodnoty]} pre klientsky filter."""
    out = {}
    for f in p.get('parametre_fasety', []):
        vals = split_facet(f.get('hodnota'))
        if vals:
            out.setdefault(facet_key(f['nazov']), []).extend(vals)
    return out

# ---------------------------------------------------------------- frekvencny rozsah
# "Frekvenčný rozsah" nie je v parametre_fasety (kazdy produkt ma vlastnu hodnotu,
# ako zaskrtavacia faseta by bol nepouzitelny), takze ho citame z parametre a robime
# z neho ciselny filter. Zapis je v datach nekonzistentny:
#   "400-450 MHz", "136 - 174 MHz", "159 – 174 MHz" (en dash), "146 - 150,8 MHz"
#   (desatinna ciarka), "150 – 158 MHz, 157 - 166 MHz, ..." (viac rozsahov),
#   "440-490" (bez jednotky). Nerozsahove hodnoty ("GPS/GLONASS") davaju prazdny zoznam.
FREQ_PARAM_KEY = 'frekvencny-rozsah'
_FREQ_RANGE = re.compile(r'(\d+(?:[.,]\d+)?)\s*[-–—]\s*(\d+(?:[.,]\d+)?)')

def freq_ranges(p):
    """Zoznam [min, max] v MHz z parametra 'Frekvenčný rozsah'; [] ak sa neda naparsovat."""
    out = []
    for f in p.get('parametre', []):
        if facet_key(f.get('nazov', '')) != FREQ_PARAM_KEY:
            continue
        raw = str(f.get('hodnota', '')).replace('\xa0', ' ')
        for lo, hi in _FREQ_RANGE.findall(raw):
            a = float(lo.replace(',', '.'))
            b = float(hi.replace(',', '.'))
            if a > b:
                a, b = b, a
            out.append([a, b])
    return out

def fmt_mhz(v):
    return ('%.2f' % v).rstrip('0').rstrip('.').replace('.', ',')

def freq_filter_for(prods):
    """Konfiguracia frekvencneho filtra, alebo None ak kategoria nema co filtrovat."""
    rs = [r for r in (freq_ranges(p) for p in prods) if r]
    if len(rs) < 2:
        return None
    lo = min(x[0] for r in rs for x in r)
    hi = max(x[1] for r in rs for x in r)
    # priklad do placeholderu: stred najcastejsieho rozsahu (realna frekvencia z katalogu)
    common = {}
    for r in rs:
        for x in r:
            k = (x[0], x[1])
            common[k] = common.get(k, 0) + 1
    top = max(common.items(), key=lambda kv: (kv[1], -(kv[0][1] - kv[0][0])))[0]
    return {
        'min': lo,
        'max': hi,
        'label': '%s – %s MHz' % (fmt_mhz(lo), fmt_mhz(hi)),
        'placeholder': 'napr. %s' % fmt_mhz(round((top[0] + top[1]) / 2)),
    }

def product_cards(prods):
    prods = sorted(prods, key=lambda p: p['title'].lower())
    out = []
    for p in prods:
        card = {
            'url': prod_url(p['id']),
            'img': '/images/katalog-produktov/%d/main.webp' % p['id'],
            'title': p['title'],
            'desc': first_sentence(p['popis_text']),
        }
        f = card_facets(p)
        if f:
            card['facets'] = json.dumps(f, ensure_ascii=False)
        fr = freq_ranges(p)
        if fr:
            card['freq'] = json.dumps(fr, ensure_ascii=False)
        if p.get('nedodavane'):
            card['nedodavane'] = True
        out.append(card)
    return out

def facets_for(prods):
    """Fasety pre kategoriu: len tie, ktore ma aspon 1 zobrazeny produkt.
       Hodnoty s nulovym poctom sa nezobrazuju (poziadavka)."""
    agg = {}
    order = []
    for p in prods:
        for f in p.get('parametre_fasety', []):
            k = facet_key(f['nazov'])
            if k not in agg:
                agg[k] = {'key': k, 'nazov': f['nazov'], 'vals': {}}
                order.append(k)
            for v in split_facet(f.get('hodnota')):
                agg[k]['vals'][v] = agg[k]['vals'].get(v, 0) + 1
    out = []
    for k in order:
        a = agg[k]
        vals = [{'hodnota': v, 'pocet': n} for v, n in a['vals'].items() if n > 0]
        if len(vals) < 2:      # jedna hodnota nefiltruje nic
            continue
        vals.sort(key=lambda x: (-x['pocet'], x['hodnota']))
        out.append({'key': k, 'nazov': a['nazov'], 'hodnoty': vals})
    out.sort(key=lambda f: (-sum(v['pocet'] for v in f['hodnoty']), f['nazov']))
    return out

def count_label(cid):
    """MOTOTRBO vetva je ziva ponuka, nie archiv — tam sa o archive nehovori."""
    fmt = 'Produktov: %d' if is_moto_cat(cid) else 'Produktov v archíve: %d'
    return fmt % subtree.get(cid, 0)

def subcat_cards(cid):
    kids = [ch for ch in children.get(cid, []) if subtree.get(ch['id'], 0) > 0]
    kids.sort(key=_cat_sort_key)
    return [{
        'url': cat_url(ch['id']),
        'img': rep_img(ch['id']),
        'title': ch['name'],
        'desc': count_label(ch['id']),
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
# Horna kategoria "Radiostanice" nema vlastne priame produkty, len 3 podkategorie
# (Prenosne/Vozidlove/Prevadzace). Aby na nej boli rovno stanice s obrazkami (Richi #5),
# nazbierame priame produkty tychto podkategorii = samotne radiostanice a prevadzace.
RADIO_TOP_ID = next((cid for cid, s in cat_slug.items() if s == 'radiostanice'), None)
n_cat = 0
for c in ([] if INDEX_ONLY else sorted(cats, key=lambda c: c['id'])):
    if subtree.get(c['id'], 0) <= 0:
        continue
    if UMBRELLA is not None and c['id'] == UMBRELLA['id']:
        continue  # umbrella (Produkty) reprezentuje uvodna stranka archivu
    subcats = subcat_cards(c['id'])
    shown_products = direct_products(c['id'])
    if c['id'] == RADIO_TOP_ID and not shown_products:
        shown_products = []
        for ch in children.get(c['id'], []):
            shown_products = shown_products + direct_products(ch['id'])
    prod_cards = product_cards(shown_products)
    # Jedina podkategoria je len zbytocny medzikrok: preskocime ju a ukazeme
    # rovno produkty z celeho podstromu.
    if len(subcats) == 1 and not prod_cards:
        subcats = []
        shown_products = subtree_products(c['id'])
        prod_cards = product_cards(shown_products)
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
    if is_moto_cat(c['id']):
        cta = CTA_MOTO_CATEGORY
    elif is_radio_branch(c['id']):
        cta = CTA_RADIO_CATEGORY
    else:
        cta = CTA_SYSTEMS
    jsonld = breadcrumb_jsonld(breadcrumb_items(c['id']))
    # MOTOTRBO: noindex + fasetovy a frekvencny filter nad zobrazenymi produktmi
    if is_moto_cat(c['id']):
        meta['robots'] = NOINDEX
        cat_filters = facets_for(shown_products)
        cat_freq = freq_filter_for(shown_products)
    else:
        cat_filters = []
        cat_freq = None
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
        'FILTERS': js(cat_filters),
        'FREQ': js(cat_freq),
        'MOBILE_SUMMARY': MOBILE_SUMMARY,
        'PANEL_SYNC_SCRIPT': PANEL_SYNC_SCRIPT,
        'FILTER_SUMMARY': FILTER_SUMMARY,
        'SIDEBAR_CSS': SIDEBAR_CSS,
        'FILTER_CSS': FILTER_CSS,
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
    'FILTERS': js([]),
    'FREQ': js(None),
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
    'PANEL_SYNC_SCRIPT': PANEL_SYNC_SCRIPT,
    'FILTER_SUMMARY': FILTER_SUMMARY,
    'SIDEBAR_CSS': SIDEBAR_CSS,
    'FILTER_CSS': FILTER_CSS,
}
open(os.path.join(OUTDIR, 'index.astro'), 'w', encoding='utf-8').write(index_content)

# ---------------------------------------------------------------- mototrbo: noindex zoznam
# Cesty vsetkych MOTOTRBO stranok -> astro.config.ts ich vyhodi zo sitemap.xml.
# (Stranky samotne maju robots noindex; do sitemap nepatria, inak to Search Console
#  hlasi ako "Submitted URL marked noindex".)
_moto_paths = sorted(
    [prod_url(p['id']) for p in products if p.get('zdroj') == 'mototrbo'] +
    [cat_url(c['id'])  for c in cats     if c.get('zdroj') == 'mototrbo' and subtree.get(c['id'], 0) > 0]
)
_noidx = os.path.join(ROOT, 'src', 'data', 'mototrbo-noindex.json')
os.makedirs(os.path.dirname(_noidx), exist_ok=True)
# format ladeny s prettierom (2 medzery + koncovy newline), nech `npm run check` prejde
with open(_noidx, 'w', encoding='utf-8') as _f:
    json.dump(_moto_paths, _f, ensure_ascii=False, indent=2)
    _f.write('\n')
print('MOTOTRBO noindex ciest:', len(_moto_paths), '->', os.path.relpath(_noidx, ROOT))

# ---------------------------------------------------------------- report
print('Produktovych stranok:', n_prod)
print('Kategoriovych stranok:', n_cat)
print('Index: 1')
_dl = {}
for kde, u in dead_links:
    _dl.setdefault(re.sub(r'\?.*', '?…', u.split('/')[0] or '/' + (u.split('/')[1:2] or [''])[0]), []).append(kde)
print('Odstranenych mrtvych odkazov/obrazkov z K2:', len(dead_links))
for k, v in sorted(_dl.items(), key=lambda kv: -len(kv[1])):
    print('  %-42s %dx (napr. %s)' % (k[:42], len(v), v[0][:44]))
print('Kolizie produktovych aliasov:', len(prod_collisions))
for pid, title, base, slug in prod_collisions:
    print('  id %d "%s": %s -> %s' % (pid, title, base, slug))
print('Kolizie kategoriovych aliasov:', len(cat_collisions))
for cid, name, base, slug in cat_collisions:
    print('  id %d "%s": %s -> %s' % (cid, name, base, slug))
