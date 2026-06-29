# RKS Web Project — Handoff Document
**Vytvorené:** 20. jún 2026
**Pre:** Pokračovanie projektu v novom vlákne
**Stav:** MVP rozpracované, štrukturálne rozhodnutia hotové, implementácia začala

---

## TL;DR (60 sekúnd)

Dana Tarko buduje **nový B2B web pre RKS, spol. s r.o.** (slovenská technologická firma od 1991 s dvomi vetvami biznisu — Rádiokomunikácie a nová Energetika).

**Vybraný stack:** Astro v6 + Tailwind v4 + Astrowind template, deploy na Vercel.
**Cena:** ~15€/rok (vs ~165€/rok WordPress).
**Stav:** Template stiahnutý, beží lokálne, materiály organizované, brief v7 finalizovaný, Claude Code dostal prvý prompt s mapou projektu.

**Pondelok 23.6.2026:** Prezentácia otcovi (nie musí byť hotový web, stačí dizajn + plán + náklady).

**Ďalší krok:** Pošli Claude Code prompt na inventory materiálov + plán implementácie.

---

## 1. O DANE A RKS

### Dana Tarko
- Background: Big 4 audit + Finance Business Partner
- Buduje energetickú vetvu RKS (rodinná firma)
- Technicky zdatná: Claude Code denne, Charlie Mac mini infraštruktúra, Codex
- Active HYROX athlete (Single Woman Pro)
- SVJ chairperson Praha 3
- Komunikuje analyticky, priamo, blunt, no-BS

### RKS, spol. s r.o.
- **IČO:** 30841275 · **DIČ:** 2020328398 · **IČ DPH:** SK2020328398
- **Adresa:** Vajnorská 6A, 900 28 Ivanka pri Dunaji
- **Fakturačná:** Rajecká 36, 821 07 Bratislava
- **GPS:** 48.191582, 17.249392
- **Tel:** +421 903 717 634
- **E-mail:** rks@rksba.sk
- **IBAN:** SK17 1100 0000 0026 2802 1295 (Tatra banka)
- **OR:** Bratislava III
- **Prevádzkové hodiny:** Po-Pi 08:00 - 16:30

### Dve vetvy biznisu

**Rádiokomunikácie** (core od 1991):
- Rádiové siete, varovné systémy (VAR-VYR podľa vyhlášky 388/2006)
- Evakuačný rozhlas (STN EN 54, 60849)
- Mototrbo (predaj, servis, prenájom Motorola)
- Elektroinštalácie, projektovanie elektrických zariadení
- Klienti: záchranné zložky, samosprávy, priemysel

**Energetika** (nová od 2026):
- Energy Management (EMS)
- Fotovoltika (FVE)
- Batériové úložiská (BESS)
- EV nabíjačky
- Smart building
- Klienti: B2B firmy, hotely, komerčné budovy, výroba

### Technologickí partneri (NIE menu kategórie!)
- **Schneider Electric** (EcoStruxure ekosystém)
- **Loxone** (smart building automation)
- **Motorola Solutions** (MOTOTRBO)

**Dôležité:** Partneri sa nespomínajú v názvoch sekcií (princíp partner ≠ kategória).

### Komunikačný štýl Dany (rešpektovať!)
- ❌ Žiadne filler frázy, žiadne emoji
- ❌ Žiadne korporátne AI jazyk
- ❌ Žiadne dlhé bloky textu
- ✅ Krátke paragrafy, bullet points
- ✅ Tabuľky pre porovnania
- ✅ Slovenčina
- ✅ Vysvetľovať skratky (SEO, GEO=Generative Engine Optimization, FVE, BESS, EMS, ...)
- ✅ Diagnose first, sell later
- ✅ Vždy 2-3 options pred významnou akciou
- ✅ Po editoch: state changes / untouched / needs attention

---

## 2. AKTUÁLNY STATUS PROJEKTU

### Hotové ✅
- Brief evolúcia v1 → v7 (FINAL)
- Astrowind template stiahnutý do `~/workspace/rksba-web/`
- `npm install` (658 packages)
- `npm run dev` beží na `http://localhost:4321`
- `_materials/` folder štruktúra vytvorená a populovaná
- Claude Code v projekte (`cd ~/workspace/rksba-web && claude`)
- Claude Code dal mapu projektu (homepage varianty, navigation, config, blog, komponenty)

### Rozhodnuté štrukturálne ✅
- Platforma: **Astro statický web** (vs WordPress, Webflow, Framer)
- Template: **Astrowind** (Astro v6 + Tailwind v4)
- Hosting: **Vercel** (free)
- CMS: **markdown súbory** + Claude Code (Dana sama edituje)
- Menu: **4 položky** (Variant A)
- Rádio dropdown: 6 zlúčených služieb + 3 obsahové
- Energetika dropdown: 5 služieb + 3 obsahové
- Q&A: na 3 miestach (hlavné menu + v každej vetve)
- Rádio: Newsletter **"Potvrďte príjem"** (NIE Blog)
- Energetika: **Blog** (NIE Newsletter)
- Bez Partneri sekcie (vyhodené z homepage)
- Bez referencií, bez zamestnancov
- Prípadové štúdie v oboch vetvách

### Otvorené 🔄
- Inventory materiálov (čaká na Claude Code)
- Hex farba z loga (extrahovať z `_materials/01-logo/`)
- Plán implementácie v 5-7 fázach (čaká na Claude Code)
- Customizácia hero, navigation, footer
- Customizácia farieb a fontov
- Vytvorenie content (Pozdrav riaditeľa, Q&A otázky)
- Deploy na Vercel
- Doména `rksba.sk` (po deploy)
- Google Business Profile
- Schema markup setup

### Časový plán
- **Pondelok 23.6.2026:** Prezentácia otcovi (dizajn + plán + náklady)
- **Týždeň 24-30.6:** MVP launch (8 stránok)
- **Júl 2026:** Postupné rozšírenie (podstránky služieb)
- **August 2026:** Landing pages pre kampane

---

## 3. KĽÚČOVÉ ROZHODNUTIA S ODÔVODNENIAMI

### 3.1 Platforma: Astro statický web

**Zvažované alternatívy:**
| Platforma | Cena/rok | Dôvod nepoužitia |
|---|---|---|
| WordPress + Elementor + Hostinger | ~165€ | Drahé, údržba pluginov, security, slabší SEO |
| Webflow | ~180€ | Drahé, vendor lock-in |
| Framer | ~200€ | Krásny ale drahý, viac na portfolio než B2B |
| 10Web | ~150€ | Komplikovaný |
| **Astro (Astrowind)** | **~15€** | **Najlacnejší, najrýchlejší, najlepšie SEO** |

**Prečo Astro vyhralo:**
1. **Page Speed:** 100/100 (vs WordPress 60-80) — kritické pre SEO 2026
2. **GEO výhoda:** AI modely preferujú rýchle, štruktúrované stránky
3. **Cena:** ~15€/rok (doména) + 0€ hosting (Vercel) vs ~165€/rok WordPress
4. **Údržba:** nulová (statický HTML) vs WordPress (pluginy, security)
5. **Dana má Claude Code denne** — vie pracovať s kódom
6. **Lean startup approach** (memory)
7. **Bezpečnosť:** nič na hacknutie (statický HTML)

**Trade-offs:**
- ❌ Nemá page builder UI ako WordPress Elementor (úprava obsahu cez kód)
- ✅ Ale Dana všetko upravuje cez Claude Code stejne (memory)

### 3.2 YouTube WordPress návod — prečo nešli touto cestou

Dana videla video "Build a WordPress Website with Claude in 2026":
- Workflow: Claude Design → MCP "Nova Mira" plugin → WordPress + Elementor + Astra theme + XPro + WP Forms
- Hosting: Hostinger ~12€/mes
- Plus: UI editor (Elementor), overený workflow
- Mínus: ~165€/rok, údržba pluginov, slabší Page Speed

**Honest comparison ukázala:** Variant A (Astro) lacnejší a kvalitnejší pre lean B2B firmu.

### 3.3 Claude Design (Beta) — prečo nešli touto cestou

Dana skúšala Claude Design Beta:
- Stav (jún 2026): Beta, výsledky pre B2B premium feel sú **ďaleko od ideálu**
- AI design tools v 2026 dobre vedia: startup landing, SaaS, portfolio
- AI design tools nevedia tak dobre: B2B premium s "weight of history" (RKS 30 rokov)

**Riešenie:** Profesionálny B2B template (Astrowind) + Claude Code customizácia = rýchlejšie a kvalitnejšie ako iterovať s AI design tools.

### 3.4 Brand identity — minimalistický prístup pre MVP

**Nepotrebujeme pre MVP:**
- Logo manuál, brand voice document, photography guidelines
- Typography hierarchy manual, brand archetype workshop

**Potrebujeme pre MVP:**
- Logo (Dana má) ✅
- Primárna farba (extrahovať z loga, fallback #0C447C) 
- Font (Inter — zadarmo, B2B štandard, slovenčina friendly)

Plnohodnotná brand identity dorobí po launch (6-12 mesiacov).

### 3.5 Menu štruktúra — evolúcia v1 → v7

**v1-v3:** Naivný návrh (Rádio, Energetika, Projekty, Blog, Q&A, Kontakt)
**v4:** Pridaná sekcia 14 (Vstupné materiály) pre AI design tools
**v5:** Astrowind + 2 oddelené blogy + bez Partneri sekcie
**v6:** Overenie reálnej rksba.sk štruktúry → mega-menu so súčasnou organizáciou (17 položiek)
**v7 (FINAL):** Kompaktizované na Variant A (9 a 8 položiek) pre MVP

**Kľúčové insight z dolaďovania:**

1. **Súčasná rksba.sk má 5 top-level menu items:** Úvod, Služby ▼, Systémové riešenia ▼, Produkty-katalóg, Aktuality, Kontakt
2. **"Služby"** = jednotlivé operating services + návrhy/projektovanie (8 položiek)
3. **"Systémové riešenia"** = komplexné riešenia na kľúč (3 položky)
4. **"Produkty-katalóg"** = mototrbo.sk subdoména
5. **"Aktuality"** = blog (pôvodne)

**Dôvody pre 4 položky v hlavnom menu nového webu:**
- B2B premium feel (Schneider, Siemens majú podobne)
- Cleaner navigation pre mobil
- Dva svety (Rádio + Energetika) majú každý svoj dropdown

**Dôvody pre kompaktizáciu na Variant A (z 17 na 9 položiek v dropdown):**
- 17 položiek je vizuálne preplnené
- Dana chcela "všetko viditeľné" v dropdown bez scrollu
- Detail služieb dostupný cez hub stránku `/radiokomunikacie`
- MVP focus: top služby v menu, zvyšok v hub

### 3.6 Obsahová stratégia — asymetria pre 2 vetvy

**Rádio: Newsletter "Potvrďte príjem"** (nie Blog)
- Klient (záchranné zložky, samosprávy, priemysel) je **tradičný**
- Email newsletter je jeho kanál (nie Google search)
- "Potvrďte príjem" = rádiokomunikačná fráza pre acknowledgement → **brilantný brand name**
- 1x mesačne (pozdrav riaditeľa, novinky, regulačné zmeny)

**Energetika: Blog** (nie Newsletter)
- Klient (CFO, hoteliéri) **aktívne hľadá** témy na Google
- Blog = SEO content + lead generation
- 1-2x mesačne odborné články (ROI, FVE, BESS, EMS)

**Prípadové štúdie v oboch:**
- Anonymizované case studies (problém + riešenie + výsledok)
- Bez nutnosti uvádzať konkrétne firmy
- Pre energetiku môžu byť **modelové scenáre** (kým nemajú reálne projekty)

### 3.7 Q&A na 3 miestach

- **Hlavné menu** `/q-a` — centralizovaná autorita pre AI/SEO/GEO
- **V Rádio dropdown** `/radiokomunikacie/q-a` — rádio špecifické
- **V Energetika dropdown** `/energetika/q-a` — energetika špecifické
- **Plus FAQ embedded** v každej service stránke (3-5 otázok)

Toto je **trojnásobná GEO výhoda** — AI modely uprednostňujú stránky s jasnými otázkami a odpoveďami.

### 3.8 Sekcia 6 homepage: "Náš proces" (NIE Partneri)

Pôvodne plánovaná sekcia "Partneri a technológie" (Schneider, Loxone, Motorola) bola **vyhodená**.

**Náhrada:** Sekcia **"Náš proces"** (5 krokov):
1. Úvodný hovor (30 minút)
2. Analýza spotreby / potrieb
3. Návrh + business case
4. Realizácia
5. Servis a podpora

**Prečo to funguje:**
- B2B zlato — ukazuje profesionalitu
- Reflektuje filozofiu "diagnose first, sell later"
- Nepotrebuje externé materiály (žiadne partner logá)

---

## 4. SITEMAP — FINAL pre MVP (v7, Variant A)

### Hlavné menu (4 položky)
```
Rádiokomunikácie ▼   Energetika ▼   Q&A   Kontakt
```

### Rádiokomunikácie ▼ (6 služieb + 3 obsahové = 9 položiek)
```
├── Rádiové siete           (Návrh + Realizácia + Servis sietí)
├── Varovné systémy          (Autonómne + Evakuačný rozhlas)
├── Mototrbo                 (predaj + Digitálny systém + mototrbo.sk)
├── Audit a digitalizácia    ← NOVÉ
├── Servis a prenájom        (Servis + Prenájom rádiostaníc)
├── Elektroinštalácie        (Projekty + Elektroinštalačné práce)
├── ─────
├── "Potvrďte príjem" (Newsletter)
├── Q&A (Rádio)
└── Prípadové štúdie
```

### Energetika ▼ (5 služieb + 3 obsahové = 8 položiek)
```
├── Energy Management (EMS)
├── Fotovoltika (FVE)
├── Batérie (BESS)
├── EV nabíjačky
├── Smart building
├── ─────
├── Blog
├── Q&A (Energetika)
└── Prípadové štúdie
```

### URL štruktúra (kompletná)
```
/
├── /radiokomunikacie (hub stránka)
│   ├── /radiokomunikacie/radiove-siete
│   ├── /radiokomunikacie/varovne-systemy
│   ├── /radiokomunikacie/mototrbo
│   ├── /radiokomunikacie/audit-digitalizacia
│   ├── /radiokomunikacie/servis-prenajom
│   ├── /radiokomunikacie/elektroinstalacie
│   ├── /radiokomunikacie/newsletter
│   ├── /radiokomunikacie/q-a
│   └── /radiokomunikacie/pripadove-studie
├── /energetika (hub stránka)
│   ├── /energetika/energy-management
│   ├── /energetika/fotovoltika
│   ├── /energetika/baterie-bess
│   ├── /energetika/ev-nabijacky
│   ├── /energetika/smart-building
│   ├── /energetika/blog
│   ├── /energetika/q-a
│   └── /energetika/pripadove-studie
├── /q-a (hlavná)
├── /o-nas
├── /kontakt
└── /kampane (landing pages mimo menu)
    ├── /kampane/fve-pre-hotely
    ├── /kampane/fve-pre-vyrobu
    ├── /kampane/ems-pre-budovy
    ├── /kampane/bess-peak-shaving
    └── ...
```

### Pre MVP launch (8 stránok)
1. Homepage
2. /radiokomunikacie (hub)
3. /energetika (hub)
4. /q-a (8-10 otázok)
5. /o-nas
6. /kontakt
7. /radiokomunikacie/newsletter (s úvodným článkom)
8. /energetika/blog (s pozdravom riaditeľa)

### Wireframe homepage (7 sekcií)
1. Hero (energetika headline + CTA)
2. Trust bar (3 partner logá Schneider · Loxone · Motorola)
3. Energetika sekcia (5-6 kariet)
4. Rádiokomunikácie sekcia (3 karty)
5. Prečo RKS (4 bloky)
6. Náš proces (5 krokov) ← NIE Partneri
7. Finálny CTA + Kontakt

---

## 5. MATERIÁLY A OBSAH

### Lokácia
- **Pôvodné:** OneDrive folder `RKS Stránka` (149.9 MB, 75 položiek)
- **Pre projekt:** `~/workspace/rksba-web/_materials/` (Astro ignoruje folders s `_`)

### Štruktúra `_materials/`
```
_materials/
├── 01-logo/              ← logo RKS (SVG/PNG variants)
├── 02-images/            ← technologické obrázky, hero shots
├── 03-stara-stranka/     ← 16 PDFov zo súčasnej rksba.sk
├── 04-blog-pozdravy/     ← pozdravy riaditeľa, články pre blog
├── 05-landing-pages/     ← návrhy landing pages
└── 06-partneri/          ← IGNORE (Dana nedáva)
```

### 16 PDFov zo súčasnej rksba.sk (mám obsah)
- Rádiové siete (kompletný popis)
- Autonómne systémy varovania (7-krokový proces)
- Návrh a projektovanie autonómnych systémov
- Návrh a projektovanie rádiových sietí
- Evakuačný rozhlas (STN EN 60849, 54)
- Prenájom rádiostaníc (vrátane cenníka)
- Servis a oprava rádiostaníc
- Elektroinštalačné práce
- Projektovanie elektrických zariadení
- Mototrbo katalóg
- Kontakt
- GDPR (ochrana osobných údajov)
- Mapa stránky
- Aktuality (blog)
- Rádiové komunikácie a systémy (rádio hub)
- Služby zákazníkom (services hub)

**Použiteľné 1:1:** Kontakty, GDPR, technické fakty (vyhlášky 388/2006, 42/1994, 261/2002; normy STN EN 54-1, 60849, 50173)
**Parafrázovať:** Service popisy (originál príliš dlhý)
**Nepoužívať:** Dizajn, layout, menu štruktúru (robíme nový moderný)

### Pozdrav riaditeľa
Dana má pripravený text. Bude **launch článok** v Energetika blogu (nie v Rádio Newsletteri).

---

## 6. TECHNICKÝ STACK A SETUP

### Lokálny stroj
- **Mac mini M4** (Dana)
- **macOS** s zsh shell
- **Path:** `~/workspace/rksba-web/`

### Stack
- **Astro v6.4.2** (upgrade dostupný na 6.4.8 — neskôr)
- **Tailwind CSS v4**
- **Node.js + npm** (658 packages nainštalované)
- **Vite** dev server

### Spustené procesy
- **Terminal 1:** `npm run dev` (port 4321) — NECHÁVAŤ BEŽAŤ
- **Terminal 2:** `claude` (Claude Code v projekte)
- **Terminal 3:** voľný pre kópie, mkdir, atď.

### Astrowind project štruktúra (z Claude Code prvého promptu)
- `src/pages/index.astro` — hlavná homepage (prerábajme)
- `src/pages/homes/*.astro` — homepage varianty (startup, mobile-app, personal — väčšinu zmazať)
- `src/pages/landing/*.astro` — 6 landing page šablón (pre kampane)
- `src/navigation.ts` — menu + footer config (kľúčový súbor!)
- `src/config.yaml` — site config (názov, SEO defaults, blog cesty)
- `src/components/CustomStyles.astro` — farby, fonty (CSS variables)
- `src/assets/styles/tailwind.css` — Tailwind mapping
- `src/components/widgets/` — Hero, Hero2, Features, FAQ, Pricing, Contact, atď.
- `src/data/post/*.md(x)` — blog články (markdown)
- `src/content.config.ts` — blog Zod schema
- `src/layouts/` — page layouts

### Brand identity
- **Primárna farba:** #0C447C (predbežné, treba potvrdiť z loga)
- **Sekundárna:** biela #FFFFFF
- **Akcent:** #E6F1FB (svetlomodrá)
- **Text primary:** #1A1A1A
- **Text secondary:** #4A4A4A
- **Border:** #E5E5E5
- **Font:** Inter (Medium 500 headings, Regular 400 body)
- **Layout:** flat design, generous whitespace, sentence case, žiadne emojis, light mode only

### Brief lokácia
- **V projekte:** `~/workspace/rksba-web/_brief.md`
- **V chate outputs:** `/mnt/user-data/outputs/rksba_design_brief_v7.md`

---

## 7. OTVORENÉ ÚLOHY (priorita)

### Fáza 1 — Inventory (TERAZ)
- [ ] Claude Code spraví inventory `_materials/`
- [ ] Extrakcia hex farby z loga
- [ ] Kategorizácia obrázkov
- [ ] Identifikácia použiteľných textov zo starej stránky
- [ ] Plán implementácie v 5-7 fázach

### Fáza 2 — Branding (15-30 min)
- [ ] Update `src/config.yaml` (site name, URL, SEO defaults)
- [ ] Update `src/components/CustomStyles.astro` (RKS farby)
- [ ] Update logo v `src/assets/`
- [ ] Update favicon

### Fáza 3 — Navigation + Footer (30 min)
- [ ] Update `src/navigation.ts` s 4-položkovým menu
- [ ] Dropdowny pre Rádiokomunikácie + Energetika
- [ ] Footer s NAP (Name, Address, Phone), 4 stĺpce

### Fáza 4 — Homepage (60-90 min)
- [ ] Prepísať `src/pages/index.astro` podľa wireframe v7
- [ ] 7 sekcií (Hero, Trust, Energetika, Rádio, Prečo, Proces, CTA)
- [ ] Použiť existujúce Astrowind widgety (Hero, Features, Steps, atď.)

### Fáza 5 — Hub stránky (60 min)
- [ ] Vytvor `/radiokomunikacie` hub (grid 6 služieb)
- [ ] Vytvor `/energetika` hub (grid 5 služieb)
- [ ] Vytvor `/o-nas` (bez tímu, len misia + história + certifikácie)
- [ ] Vytvor `/kontakt` (NAP, mapa, formulár)

### Fáza 6 — Blog/Newsletter/Q&A (60 min)
- [ ] Setup 2 content collections (`blog-radio/`, `blog-energetika/`)
- [ ] Pridať pozdrav riaditeľa ako prvý článok do Energetika blogu
- [ ] Vytvor `/q-a` s 8-10 otázkami (rozdelenie na vetvy)
- [ ] Vytvor `/radiokomunikacie/newsletter` (Potvrďte príjem) s 1 článkom

### Fáza 7 — Deploy (15 min)
- [ ] Push na GitHub
- [ ] Vercel auto-deploy
- [ ] Domain check
- [ ] Schema markup validation
- [ ] Page Speed Insights test (cieľ >90)

### Fáza 8 — Po launch
- [ ] Doména `rksba.sk` pripojiť (keď otec schváli)
- [ ] Google Business Profile
- [ ] Postupne pridávať podstránky služieb
- [ ] Postupne pridávať landing pages pre kampane
- [ ] Spustiť LinkedIn Sales Navigator outreach

---

## 8. QUICK PROMPTS PRE CLAUDE CODE

### Prompt 1: Inventory + plán (NEXT — Dana ešte neposlala)
```
Brief je aktualizovaný na v7 (FINAL pre MVP). Prečítaj _brief.md.

KLÚČOVÉ:
- Menu má 4 položky: Rádiokomunikácie ▼ | Energetika ▼ | Q&A | Kontakt
- Rádio dropdown: 6 zlúčených služieb + 3 obsahové
- Energetika dropdown: 5 služieb + 3 obsahové
- MVP = 8 stránok

Materiály mám v _materials/ folder (06-partneri/ IGNORE).

Daj mi:
1. Inventory materiálov (logo hex farba, obrázky kategorizácia, 
   pôvodná stránka texty, blog články)
2. Plán implementácie v 5-7 fázach
3. Časový odhad pre MVP

Nerob ešte žiadne úpravy projektu. Najprv inventory a plán.
```

### Prompt 2: Fáza 2 (po schválení plánu)
```
Implementuj Fázu 2 — Branding. Konkrétne:
1. Update src/config.yaml — site name, URL, SEO defaults
2. Update src/components/CustomStyles.astro — RKS farby:
   - primary: #0C447C (alebo extrahovaný hex z loga)
   - accent: #E6F1FB
   - default font: Inter
3. Skopíruj logo z _materials/01-logo/ do src/assets/
4. Update favicon

Po dokončení mi popíš čo si zmenil v ktorom súbore.
```

### Prompt 3: Fáza 3 (Navigation)
```
Implementuj Fázu 3 — Navigation + Footer.

Update src/navigation.ts podľa _brief.md sekcie 3:

HLAVNÉ MENU (4 položky):
- Rádiokomunikácie ▼ (dropdown s 6 službami + 3 obsahové)
- Energetika ▼ (dropdown s 5 službami + 3 obsahové)
- Q&A
- Kontakt

FOOTER 4 stĺpce:
1. RKS info (adresa, IČO, OR)
2. Rádiokomunikácie linky
3. Energetika linky
4. Kontakt + CTA

CTA tlačidlo v hlavičke: "Dohodnúť konzultáciu"

Po dokončení mi popíš zmeny a daj screenshot URL na overenie.
```

### Prompt 4: Fáza 4 (Homepage)
```
Implementuj Fázu 4 — Homepage podľa _brief.md sekcie 4 (wireframe).

7 sekcií v poradí:
1. Hero — EYEBROW + H1 + subheadline + CTA tlačidlo
2. Trust bar — 3 partner logá (Schneider, Loxone, Motorola)
3. Energetika — 5-6 kariet s ikonami
4. Rádiokomunikácie — 3 karty
5. Prečo RKS — 4 bloky
6. Náš proces — 5 krokov (1-2-3-4-5)
7. Finálny CTA + kontakt

Použi existujúce Astrowind widgety:
- Hero alebo Hero2
- Brands (pre trust bar)
- Features alebo Features2 (pre karty)
- Steps (pre proces)
- CallToAction (pre finálny CTA)

Použi texty z briefe sekcie 4 (wireframe homepage).

Po dokončení mi pošli screenshot URL.
```

---

## 9. OPERATING INSTRUCTIONS PRE NOVÉHO CLAUDE

### Dana's komunikačné preferencie
- **Krátko, akčne**, žiadne filler
- **Bullet points** a **tabuľky** prevažujú nad prose
- **Vysvetľovať skratky** pri prvom použití
- **Slovenčina**
- **Žiadne emojis** (alebo veľmi šetrene)
- **Po editoch:** state changes / what untouched / what needs attention
- **Pred významnou akciou:** 2-3 options
- **Diagnose first, sell later**

### Vyhnúť sa
- Filler frázam ("Skvelé!", "Perfektné!", "Som tu pre teba")
- Korporátnemu AI jazyku
- Dlhým neprerušovaným blokom textu
- Refusal-style frázam
- Sycophantic agreement

### Dana ocení
- Konkrétne čísla a fakty
- Tabuľky pre porovnania
- Honest assessment (aj keď je negative)
- Challenge ak nemá pravdu
- Konkrétny next step na konci každej odpovede

### Sales philosophy (rešpektovať pri navrhovaní obsahu)
- Partner, nie predajca
- Diagnose first, sell later
- Cieľ každej komunikácie = ďalší krok (nie predaj)
- Discovery otázky pred riešeniami
- Spoločnosti kupujú use-cases a ROI, nie technológiu

### Pipeline fázy
1. Market mapping
2. First contact
3. Discovery
4. Quick Scan
5. Pilot proposal
6. Pilot
7. Full implementation

### Cieľové ICP (Ideal Customer Profile)
- Manufactura, hotely, kancelárie, retail
- 1+ GWh/rok spotreba
- 100-1,000+ zamestnancov
- SK/CZ trh

### Memory context (z užívateľa)
- Dana má Sales Navigator setup (bundle trial)
- 90-day sprint #2 (cieľ ~18.9.2026)
- KPI: 1 LinkedIn post / 3 Sales Nav contacts / 1 discovery action denne
- Charlie Mac mini infraštruktúra beží
- BESS course (Univerzita AKU-BAT) ingested do KB

---

## 10. DÔLEŽITÉ POZNÁMKY

### Brief verzie
- **Aktuálna FINAL:** `rksba_design_brief_v7.md`
- Predošlé verzie (v1-v6) sú v outputs ako referencia
- Brief v7 je v projekte ako `_brief.md`

### Backup brief lokácia
- `/mnt/user-data/outputs/rksba_design_brief_v7.md`

### Vyhnúť sa návratu k diskusiám
**Tieto rozhodnutia sú FINAL — nevracaj sa k nim:**
- Statický web (NIE WordPress, NIE Webflow)
- Astrowind template
- 4-položkové menu
- Variant A (kompaktné dropdowny)
- Žiadne partneri sekcie
- Žiadne tímové stránky
- Rádio = Newsletter, Energetika = Blog
- Q&A na 3 miestach

### Otvorené otázky (treba upresniť pri pokračovaní)
- Hex farba z loga (čaká na CC inventory)
- Tagline / slogan firmy
- Pozdrav riaditeľa text (Dana má pripravený, treba načítať)
- Schema markup detaily
- Schneider partnership level (ak vôbec spomenúť)

### Stará rksba.sk
- Stále funguje (nie urgentný launch)
- Nový web je upgrade, nie záchrana
- 30+ rokov tradícia = zachovať dôveru

### Sub-doména stratégia
- `rksba.sk` = hlavný nový web
- `mototrbo.sk` = už existuje (Motorola katalóg) — buď zachovať alebo redirect
- `app.rksba.sk` = budúce nástroje (Energy Quick Scan kalkulačka)

---

## ZÁVER

**Stav:** Strukturálne rozhodnutia hotové, implementácia začala, brief v7 finalizovaný.

**Najbližší krok pre Danu:**
1. Stiahnuť `rksba_design_brief_v7.md` z chatu do projektu (ako `_brief.md`)
2. Poslať Claude Code Prompt 1 (Inventory + plán)
3. Schváliť plán
4. Postupne implementovať Fázy 2-7

**Cieľ:** Pondelok 23.6.2026 prezentácia otcovi (dizajn + plán + náklady).

**Pre nového Claude v novom vlákne:** Tento dokument má všetko čo treba. Začínaj odpovedať na Dananu otázku konkrétne — nediskutuj o rozhodnutiach ktoré sú už urobené.
