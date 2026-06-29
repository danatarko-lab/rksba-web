# RKS — finálny design brief v4
**Aktualizované:** jún 2026 (pridaná sekcia 14 — Vstupné materiály)
**Autor:** Dana Tarko + Claude
**Účel:** Jeden vstupný prompt pre Claude Design (alebo iný AI design tool)

---

## CHANGELOG v4 (čo je nové)

**Pridané:**
- ✅ Sekcia 14 — **Vstupné materiály a ich použitie** (kompletný návod pre Claude Design ako naložiť s uploaded súbormi)
- ✅ Sekcia 15 — **Pracovný flow pre Danu** (čo nahrať, v akom poradí, do akej sekcie Claude Design)

**Zmeny v v3 oproti v2** (zostávajú v platnosti):

**Vyhodené z webu:**
- ❌ Stránka "Projekty" / "Referencie" — vyhodené z menu aj z homepage
- ❌ "Tím" / zamestnanci v O nás — sekcia nahradená misiou a partnermi
- ❌ Sekcia "Vybrané projekty" na homepage — nahradená "Partneri a technológie"

**Pridané/posilnené:**
- ✅ Newsletter kategória v Blogu (pozdrav riaditeľa = launch článok)
- ✅ Landing pages stratégia rozšírená (8 LP na výber, nie 4)
- ✅ Brand identity sekcia (čo treba pre MVP, čo nie)
- ✅ Homepage sekcia 6 nahradená "Partneri a technológie"

**Nezmenené (zostáva z v2):**
- 2 vetvy biznisu (energetika 70 %, rádio 30 %)
- SEO + GEO requirements
- Schema markup, kontaktné údaje, GPS
- Vizuálny štýl (farby, typography, B2B feel)
- Cieľová skupina, tone of voice

---

## 1. O FIRME (40 sekúnd kontextu)

**RKS, spol. s r.o.** — slovenská technologická firma od 1991. Vajnorská 6A, Ivanka pri Dunaji.

**Dve obchodné vetvy:**
1. **Rádiokomunikácie** (core od 1991) — siete, varovné systémy, evakuačný rozhlas, Motorola.
2. **Energetika** (nová vetva, 2026) — EMS, FVE, BESS, EV, smart building.

**Partneri:** Schneider Electric, Loxone, Motorola Solutions.

**Web má prezentovať obe vetvy** s dôrazom na energetiku (70 %) — to je rastúce smerovanie.

---

## 2. KOMU WEB HOVORÍ

**Primárna cieľová skupina:**
- CFO, CEO a majitelia rastúcich firiem (energetika)
- Facility manažéri komerčných budov
- General manažéri hotelov a reštaurácií
- Riaditelia záchranných zložiek a samospráv (rádio)

**Tone of voice:** profesionálne, dátovo, B2B, konkrétne čísla, slovenčina.

---

## 3. SITEMAP — UPRAVENÝ

### Hlavné menu (5 položiek, bez Projekty)

```
Rádiokomunikácie · Energetika · Blog · Q&A · Kontakt
```

### Stránková štruktúra

```
/ (Homepage)
│
├── /radiokomunikacie (overview hub)
│   ├── /radiokomunikacie/radiove-siete
│   ├── /radiokomunikacie/varovne-systemy
│   ├── /radiokomunikacie/evakuacny-rozhlas
│   ├── /radiokomunikacie/predaj-motorola
│   ├── /radiokomunikacie/prenajom
│   ├── /radiokomunikacie/servis
│   └── /radiokomunikacie/elektroinstalacie
│
├── /energetika (overview hub)
│   ├── /energetika/energy-management
│   ├── /energetika/fotovoltika
│   ├── /energetika/baterie-bess
│   ├── /energetika/ev-nabijacky
│   ├── /energetika/smart-building-loxone
│   └── /energetika/elektroenergetika-schneider
│
├── /blog
│   ├── /blog/newsletter (kategória)
│   │   └── /blog/pozdrav-riaditela (launch článok)
│   ├── /blog/energetika (kategória)
│   ├── /blog/radio (kategória)
│   └── /blog/[slug] (jednotlivé články)
│
├── /q-a (FAQ pre GEO)
│
├── /o-nas
│
├── /kontakt
│
└── /kampane (landing pages mimo menu, viacero)
    ├── /kampane/fve-pre-hotely
    ├── /kampane/fve-pre-vyrobu
    ├── /kampane/ems-pre-budovy
    ├── /kampane/bess-peak-shaving
    ├── /kampane/loxone-restauracie
    ├── /kampane/loxone-hotely
    ├── /kampane/ev-nabijacky-firmy
    └── /kampane/smart-building-administrativa
```

**MVP launch (1. fáza):** Homepage + 2 hub stránky + Blog (pozdrav riaditeľa) + Q&A + O nás + Kontakt = **7 stránok**. Landing pages dorobíme postupne podľa kampaní.

---

## 4. HOMEPAGE — UPRAVENÝ WIREFRAME

### Sekcia 1: Hero
```
[Logo RKS]                    [Menu]    [CTA: Konzultácia]
─────────────────────────────────────────────────────────
EYEBROW: Slovenská technologická firma od 1991

H1: Energetické riešenia pre firmy a komerčné budovy

Subheadline: Projektujeme, realizujeme a spravujeme 
fotovoltiku, batériové úložiská, EMS a smart building. 
Na Slovensku s 30-ročnou projektovou praxou.

[Tlačidlo: Dohodnúť konzultáciu]
```

### Sekcia 2: Trust bar (partneri)
```
"NAŠI TECHNOLOGICKÍ PARTNERI"
Schneider Electric · Loxone · Motorola Solutions
```

### Sekcia 3: Energetika (70 % plochy homepage)
```
H2: Energetika pre komerčné prevádzky
Subtitle: Znížte spotrebu o 10 až 30 %. Získajte prehľad, kontrolu, ROI.

[2x3 grid kariet]:
- Energy Management System
- Fotovoltika (FVE)
- Batériové úložiská (BESS)
- Smart building (Loxone)
- Elektroenergetika (Schneider)
- EV nabíjačky
```

### Sekcia 4: Rádiokomunikácie (30 % plochy)
```
H2: Rádiokomunikácie a varovné systémy
Subtitle: Od 1991 — pre záchranné zložky, priemysel a samosprávy.

[3 karty]:
- Rádiové siete (Motorola MOTOTRBO)
- Varovné systémy (VAR-VYR podľa 388/2006)
- Servis a prenájom rádiostaníc
```

### Sekcia 5: Prečo RKS
```
H2: Prečo firmy vyberajú RKS
[4 bloky s ikonami]:
- 30+ rokov skúseností (od 1991)
- Silní technologickí partneri
- Projekt + realizácia + servis pod jednou strechou
- Certifikovaní technici (ÚREK, EPS, PSN)
```

### Sekcia 6: Partneri a technológie (NOVÉ — nahrádza Projekty)
```
H2: Partneri a technológie, s ktorými pracujeme
[3 stĺpce, každý s logom + krátkym textom]:

SCHNEIDER ELECTRIC
- EcoStruxure ekosystém
- Microgrid, Panel Server, PowerLogic
- BESS Boost Pro 215, EV Charging Expert

LOXONE
- Smart building automation
- Autorizovaný Loxone Partner SK
- Hospitality, kancelárie, retail

MOTOROLA SOLUTIONS
- MOTOTRBO digitálne rádiá
- Profesionálna komunikácia
- Predaj, servis, prenájom
```

### Sekcia 7: Finálny CTA
```
H2: Chcete vedieť, kde vaša prevádzka stráca energiu?
Text: Dohodnite si úvodný 30-minútový hovor. 
[Tlačidlo: Dohodnúť úvodný hovor]
```

### Footer
```
[Stĺpec 1] RKS, spol. s r.o.
Vajnorská 6A, 900 28 Ivanka pri Dunaji
IČO: 30841275 · DIČ: 2020328398
OR Bratislava III

[Stĺpec 2] Menu
Rádiokomunikácie · Energetika · Blog · Q&A · O nás · Kontakt

[Stĺpec 3] Kontakt
+421 903 717 634
rks@rksba.sk
Po-Pi: 08:00 - 16:30

[Bottom] © RKS 2026 · Ochrana osobných údajov · Mapa stránky
```

---

## 5. BLOG — NOVÁ ŠTRUKTÚRA S NEWSLETTER

### URL štruktúra
```
/blog                       (hlavná blog stránka, zoznam článkov)
/blog/newsletter            (kategória: pozdrav riaditeľa, vízia, strategické)
/blog/energetika            (kategória: odborné články FVE, BESS, EMS)
/blog/radio                 (kategória: rádio, varovné systémy, legislatíva)
/blog/[slug]                (jednotlivý článok)
```

### Layout blog stránky

**Hlavná stránka /blog:**
- H1: Aktuality a odborné články
- Filter podľa kategórie (Newsletter / Energetika / Rádio)
- Grid článkov (3 stĺpce na desktope, 1 na mobile)
- Každá karta: foto + kategória + nadpis + dátum + krátky úryvok

**Detail článku /blog/[slug]:**
- H1 (nadpis)
- Meta: autor (riaditeľ / Dana / iný), dátum, kategória, čas čítania
- Hero foto
- Body text s H2/H3 hierarchiou
- Súvisiace články dole
- CTA na konzultáciu

### Launch obsah pre Blog

**Newsletter kategória:**
1. **Pozdrav riaditeľa** (launch článok, "Vízia firmy 2026") — Dana má text
2. Plánované ďalšie pozdravy/strategické články

**Energetika kategória** (postupne):
- Čo je Energy Management System a ako pomáha firmám
- Peak shaving pre firmy — kedy má BESS zmysel
- FVE pre hotely — návratnosť a riziká

**Rádio kategória** (postupne):
- Autonómne systémy varovania podľa 388/2006
- Analógové vs. digitálne vysielačky

### Newsletter SEO + GEO benefity
- Každý článok = nový indexovateľný obsah pre Google
- Riaditeľské články = autorita značky (E-E-A-T faktor)
- AI modely (ChatGPT, Perplexity) preferujú citovať blogy s expertným obsahom

---

## 6. O NÁS — BEZ TÍMU

**Štruktúra stránky:**

```
H1: O RKS

Sekcia 1: História a súčasnosť
- RKS bola založená v roku 1991
- 30+ rokov v elektrotechnike a komunikáciách
- Pôvodné zameranie: rádiové siete a varovné systémy
- Nové smerovanie: energetika a smart building

Sekcia 2: Naše dve silné oblasti
- Rádiokomunikácie (od 1991)
- Energetika (od 2026)

Sekcia 3: Technologickí partneri
- Schneider Electric (energetika)
- Loxone (smart building)
- Motorola Solutions (rádio)

Sekcia 4: Certifikácie a oprávnenia
- Oprávnenie Úradu pre reguláciu elektronických komunikácií (ÚREK)
- Oprávnenie pre projektovanie EPS (ESSER, ARITECH)
- Oprávnenie pre PSN (PARADOX Canada)
- STN EN 54-1, 54-16, 54-24, STN EN 50173-1/2

Sekcia 5: Misia
- Spoľahlivá komunikácia ako základ bezpečnosti
- Energetická efektívnosť ako základ konkurencieschopnosti
```

**Bez:** fotky tímu, mená zamestnancov, životopisy.

---

## 7. LANDING PAGES — POSILNENÁ STRATÉGIA

Landing pages slúžia pre **kampane v LinkedIn, Meta Ads, e-mail outreach**. Budeš ich mať **viacero** podľa segmentov a technológií.

### Univerzálna štruktúra landing page

```
[Logo RKS]                              [CTA: Konzultácia]
─────────────────────────────────────────────────────────
HERO:
- Headline (problém + cieľ)
- Subheadline (pre koho je to)
- Primary CTA

PROBLÉM (3-4 bullets):
- Čo cieľová skupina rieši

RIEŠENIE:
- Krátky popis ako RKS pomáha
- Konkrétne technológie (Schneider / Loxone)

3 BENEFITY:
- Úspora nákladov (konkrétne čísla)
- Rýchla návratnosť
- Bez starostí (turnkey)

AKO TO PREBIEHA (5 krokov):
1. Úvodný hovor (30 min)
2. Analýza spotreby / potrieb
3. Návrh + business case
4. Realizácia
5. Servis

FAQ (3-5 otázok)

TRUST BLOK:
- Partneri (Schneider, Loxone, Motorola)
- 30+ rokov skúseností

FORMULÁR:
- Meno
- Firma
- Email
- Telefón
- Čo riešite (krátky text)
- GDPR súhlas

FOOTER (minimum)
```

### Plánované landing pages (8 na štart, dorábajú sa postupne)

**Energetika — podľa segmentu:**
1. `/kampane/fve-pre-hotely` — hotely a wellness rezorty
2. `/kampane/fve-pre-vyrobu` — výrobné podniky
3. `/kampane/ems-pre-budovy` — administratívne budovy
4. `/kampane/ev-nabijacky-firmy` — firmy s flotilou
5. `/kampane/smart-building-administrativa` — kancelárske budovy

**Energetika — podľa technológie:**
6. `/kampane/bess-peak-shaving` — priemysel s vysokými odbermi
7. `/kampane/loxone-restauracie` — gastronomický segment
8. `/kampane/loxone-hotely` — hotelový segment

### Landing page = jeden cieľ
Každá LP má **jeden konkrétny cieľ** a **jedno CTA**. Žiadne ďalšie distrakcie (minimum menu, minimum footer linky).

---

## 8. BRAND IDENTITY — ČO POTREBUJEŠ PRE MVP

### Krátka odpoveď: NIE potrebuješ plnohodnotnú brand identity

**Čo nepotrebuješ pre MVP web:**
- ❌ Logo manuál (variácie, clearspace rules, atď.)
- ❌ Brand voice document
- ❌ Photography style guide
- ❌ Brand values document
- ❌ Brand archetype workshop
- ❌ Typography hierarchy manual

Toto je projekt na 2-4 týždne a 2-5 000 €. **Spravíš to neskôr**, keď biznis behá a vieš pre koho ten brand vlastne je.

### Čo potrebuješ pre MVP web — 3 veci

**1. Logo**
- ✅ Máš (v Drive folder Logo)
- Použiteľné formáty: SVG (preferované), PNG s priehľadným pozadím
- Variácie: horizontálne, vertikálne, samotná značka (favicon)

**2. Primárna farba**
- Návrh: tmavomodrá #0C447C (predpoklad z loga, potvrdiť)
- Akcent: svetlomodrá #E6F1FB pre background sekcií
- Text: tmavošedá #1A1A1A (primary), šedá #4A4A4A (secondary)

**Akcia pre Danu:** Pošli mi logo ako obrázok do chatu, vyextrahujem exact hex farbu.

**3. Font**
- **Default odporúčanie: Inter** (zadarmo, B2B štandard, výborný pre slovenčinu s diakritikou)
- Hierarchia: Inter Medium (500) pre nadpisy, Inter Regular (400) pre body text
- Alternatíva: ak má logo špecifický font, môžeme ho použiť pre nadpisy

### Tone of voice (pracovne, bez document)
- Profesionálne, dátovo orientované
- Konkrétne čísla namiesto fráz
- 30+ rokov skúseností = autorita
- Sentence case (nie ALL CAPS)
- Žiadne emojis
- Slovenčina (primárne)

### Imagery (kvôli MVP)
**Použiteľné pre MVP:**
- Oficiálne fotky od partnerov (Schneider Electric, Loxone, Motorola)
- Vlastné fotky technológií / inštalácií (ak máš)
- Premium stock fotky (Unsplash) ako placeholder

**Nepoužívať:**
- Generické stock fotky biznismenov v oblekoch
- AI-generated fotky ľudí (vyzerajú falošne)
- Nízkokvalitné fotky z mobilov

---

## 9. SEO + GEO OPTIMALIZÁCIA

### SEO základ
- **Title tag:** max 60 znakov, obsahuje keyword
- **Meta description:** max 155 znakov, obsahuje CTA
- **H1:** iba 1x na stránke, jasný keyword
- **H2-H3:** hierarchické nadpisy
- **Alt texty:** všetky obrázky
- **URL slug:** krátky, slovenský, bez diakritiky
- **Interné prelinkovanie:** medzi riešeniami a segmentmi

### GEO (Generative Engine Optimization)
Optimalizácia pre AI modely (ChatGPT, Claude, Perplexity, Gemini), ktoré citujú zdroje pri odpovedaní.

**Princípy:**
- FAQ sekcie na každej stránke služieb (3-5 otázok)
- Jasné definície začínajúce „X je..."
- Konkrétne čísla a fakty
- Štruktúrovaný obsah s podnadpismi
- Schema markup (Organization, LocalBusiness, FAQPage, Service)
- Otázky vo formáte ako ich kladie AI

### Lokálne SEO (Bratislavský kraj)
- Google Business Profile (založiť ak nie je)
- Adresa a telefón konzistentne v pätičke
- Lokálne keywords: "energy management Bratislava", "FVE pre firmy Slovensko"
- Schema LocalBusiness s GPS súradnicami

### Schema markup (custom code v `<head>`)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "RKS, spol. s r.o.",
  "url": "https://www.rksba.sk",
  "telephone": "+421903717634",
  "email": "rks@rksba.sk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Vajnorská 6A",
    "addressLocality": "Ivanka pri Dunaji",
    "postalCode": "900 28",
    "addressCountry": "SK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.1915,
    "longitude": 17.2493
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "16:30"
  },
  "foundingDate": "1991",
  "sameAs": ["https://www.linkedin.com/company/rks"]
}
</script>
```

---

## 10. VIZUÁLNY ŠTÝL

### Farby (predbežné, potvrdiť po logu)
- **Primárna:** modrá #0C447C
- **Sekundárna:** biela #FFFFFF
- **Akcent:** svetlomodrá #E6F1FB
- **Text:** tmavošedá #1A1A1A (primary), šedá #4A4A4A (secondary)
- **Border:** veľmi svetlá šedá #E5E5E5

### Typography
- **Headings:** Inter, weight 500 (medium)
- **Body:** Inter, weight 400 (regular)
- **Sentence case**, žiadne mid-sentence bolding

### Layout principles
- Generous whitespace
- Flat design (žiadne gradienty, tiene, glow)
- Border radius: 8px štandard, 12px pre väčšie karty
- Borders: 0.5px solid svetlošedá
- Žiadne emojis v dizajne ani v copy
- Light mode only pre MVP

### B2B feel
- Nie startup, nie korporát, áno premium
- Biele/svetlé pozadia
- Kvalitné fotky technológií a partnerských materiálov
- Dátové grafy a čísla
- Jasná typografia

---

## 11. POVINNÉ PRVKY PRE KAŽDÚ STRÁNKU

- Header — logo, menu, primárne CTA
- Footer — kontakt, NAP, firemné údaje, ochrana osobných údajov
- Cookie banner (GDPR) — minimal, decline-by-default
- Mobilná verzia — full responsive (1280px / 768px / 375px)
- Performance — Page Speed Insights >90
- Accessibility — WCAG AA, alt texty, semantic HTML, focus states

---

## 12. ČO PRESNE ZADAŤ DO AI DESIGN TOOLU

**Krátky prompt pre štart** (skopíruj a uprav):

```
Vytvor B2B webstránku pre slovenskú technologickú firmu RKS, spol. s r.o.
(30+ rokov skúseností od 1991).

ŠTRUKTÚRA: 5 hlavných stránok v menu:
- Rádiokomunikácie
- Energetika
- Blog (s newsletter kategóriou)
- Q&A
- Kontakt
+ Homepage + O nás + 8 landing pages mimo menu.

HOMEPAGE rozloženie:
1. Hero (energetika headline)
2. Trust bar (Schneider Electric, Loxone, Motorola)
3. Energetika sekcia (6 kariet)
4. Rádiokomunikácie sekcia (3 karty)
5. Prečo RKS (4 bloky)
6. Partneri a technológie (3 stĺpce)
7. Finálny CTA + kontakt

NEDÁVAJ: referencie projektov, fotky zamestnancov, mená tímu.
DÁVAJ: partnerské logá, technológie, certifikácie, fakty.

ŠTÝL: profesionálny B2B (nie startup), biele pozadie, modrá #0C447C 
ako primárna farba, Inter font, generous whitespace, flat design,
žiadne emojis, sentence case.

CIEĽOVÁ SKUPINA: CFO/CEO firiem, hoteloví manažéri, facility manažéri.
JAZYK: slovenčina.
SEO: každá stránka s title tag, meta description, FAQ sekciou.
SCHEMA: LocalBusiness markup s adresou Vajnorská 6A, Ivanka pri Dunaji.

Blog má 3 kategórie: Newsletter (pozdrav riaditeľa), Energetika, Rádio.
Landing pages sú mimo menu, štruktúra: hero + problém + riešenie + 
3 benefity + ako to prebieha + FAQ + trust + formulár.
```

---

## 13. AKČNÉ POLOŽKY PRE DANU PRED ZADANÍM

**Potrebuješ pred zadaním do Claude Design:**

1. **Logo ako obrázok** — pošli mi do chatu, vyextrahujem exact hex farbu primárnej modrej
2. **Tagline/slogan firmy** — máš nejaký? (ak nie, vymyslíme jeden)
3. **Text "Pozdrav riaditeľa"** — máš text alebo ho ešte chystáš?
4. **3-5 obrázkov technológií** — buď vlastné, alebo si stiahneme z Schneider/Loxone partnerských materiálov

**Aktualizovať treba v separátnom súbore rksba_content_v1.md:**
- Vyhodiť sekciu o tíme a zamestnancoch
- Pridať placeholder pre "Pozdrav riaditeľa" článok
- Aktualizovať O nás bez tímu
- Aktualizovať homepage sekciu (Vybrané projekty → Partneri a technológie)

---

## 14. VSTUPNÉ MATERIÁLY A ICH POUŽITIE

Spolu s týmto briefom dostaneš sadu materiálov. Tu sú **inštrukcie ako každú kategóriu použiť**.

### 14.1 LOGO

**Formát:** SVG (preferované) alebo PNG s priehľadným pozadím.

**Použitie:**
- Hlavička (header) každej stránky — ľavá strana, výška 36-44px
- Footer každej stránky — menšie, výška 28-32px, alebo monochromatická verzia
- Favicon (browser tab icon) — extrahuj značku bez textu, formát 32×32px a 16×16px
- Open Graph image (social sharing preview) — kombinuj s tagline, formát 1200×630px

**Pravidlá:**
- Vždy zachovaj clearspace (minimálne výška "K" zo slova RKS okolo loga)
- Nikdy nemeň pomer strán, neotáčaj, nedeformuj
- Na tmavé pozadie použi verziu s bielou výplňou (ak ju logo má)
- **Extrahuj primárnu farbu** z loga a použi ju ako základ celého design systému

### 14.2 OBRÁZKY (foto materiály)

**Očakávané kategórie:**
- Fotky technológií (panely, batérie, smart home interfaces, rádio veže)
- Generované obrázky (od Dany — bude potrebné validovať brand consistency)
- Partnerské materiály (Schneider Electric, Loxone, Motorola)

**Použitie podľa typu:**

| Typ obrázku | Použiť kde |
|---|---|
| Hero shot (široký formát, action) | Hero sekcia homepage, hero landing pages |
| Technologický detail (FVE, BESS, EV) | Karty energetiky, sekcia "Energetika pre komerčné prevádzky" |
| Smart building interface | Karta Loxone, landing page Loxone |
| Rádio veža / Motorola produkty | Karty rádiokomunikácií, sekcia rádio |
| Partner logo (Schneider, Loxone, Motorola) | Trust bar pod hero, sekcia "Partneri a technológie" |
| Abstract/atmospheric | Background sekcií, dividers |

**Pravidlá:**
- **Žiadne ľudské tváre** (zamestnanci ani stock fotky biznismenov)
- **Žiadne AI-generated fotky ľudí** (vyzerajú falošne)
- Konzistentný štýl — ak sú niektoré dark, ostatné by mali tiež byť dark
- Kompresia: WebP formát, max 200KB pre hero obrázok, max 80KB pre kartu
- Alt text: popisuj čo je na obrázku, používaj keywords ("Inštalácia fotovoltickej elektrárne na streche výrobnej haly")

### 14.3 POZDRAV RIADITEĽA (text)

**Formát:** Plain text alebo Word document.

**Použitie:**
- Vytvor stránku `/blog/pozdrav-riaditela` ako **launch článok** v Newsletter kategórii
- Layout: hero s nadpisom + foto firmy (alebo abstract) + body text + meta info (autor, dátum, kategória)
- Pridaj na koniec **CTA na konzultáciu** ("Chcete vedieť ako vám RKS pomôže?")
- Pridaj **súvisiace články** dole (zatiaľ placeholders, doplníme neskôr)

**Tone of voice indikátor:**
Pozdrav riaditeľa je **referenčný text pre tone of voice celého webu**. Analyzuj:
- Slovník (formálny/neformálny)
- Dĺžku viet
- Pasívne vs. aktívne vety
- Použitie čísel a faktov

Tento tón uplatni na ďalšie texty.

### 14.4 PDF Z PÔVODNEJ STRÁNKY rksba.sk

**Formát:** Set PDF (16 PDFov zo súčasnej webstránky).

**Obsah PDFiek:**
- Rádiové siete (kompletná dokumentácia)
- Autonómne systémy varovania (VAR-VYR)
- Evakuačný rozhlas
- Predaj a prenájom Motorola
- Servis a opravy rádiostaníc
- Elektroinštalácie
- Projektovanie elektrických zariadení
- Mototrbo katalóg
- Kontakt, GDPR
- Mapa stránky

**Použitie:**
- **Použiteľné 1:1:** kontakty (adresa, IČO, GPS, telefóny), GDPR text, technické fakty (vyhlášky, normy)
- **Parafrázovať a skrátiť:** odborné texty o službách (originál je príliš dlhý, prepíš stručnejšie)
- **Zachovať:** všetky odkazy na vyhlášky (388/2006), normy (STN EN 54), zákony (351/2011, 42/1994)
- **NEpoužívať:** dizajn pôvodnej stránky, layout, štruktúru menu (robíme nový moderný dizajn)

### 14.5 PARTNERSKÉ MATERIÁLY

**Očakávané materiály:**
- Schneider Electric — EcoStruxure logos, screenshoty produktov (Panel Server, PowerLogic, Microgrid)
- Loxone — Hospitality Compendium, product fotos, smart home screenshoty
- Motorola Solutions — MOTOTRBO product fotos, brand assets

**Použitie:**
- Trust bar pod hero (homepage): logá Schneider · Loxone · Motorola
- Sekcia "Partneri a technológie" (homepage 6): 3 stĺpce s logami + popismi
- Detail stránky (energetika/smart-building, energetika/elektroenergetika): partnerské logo + technológie
- Karty riešení: screenshoty produktov (Panel Server, BESS Boost Pro 215, atď.)

**Pravidlá:**
- Vždy uveď oficiálny názov partnera (Schneider Electric, nie "Schneider")
- Loxone partner status = "Autorizovaný Loxone Partner pre Slovensko"
- Motorola partnership = predaj, servis, prenájom MOTOTRBO

### 14.6 INÉ MATERIÁLY (LinkedIn články, prezentácie)

Ak dostaneš LinkedIn články alebo prezentácie:
- LinkedIn články → vytvor pre každý článok blog post v Energetika alebo Rádio kategórii
- Prezentácie → extrahuj kľúčové slidy ako obsah pre Q&A sekciu

---

## 15. PRACOVNÝ FLOW PRE DANU (CHECKLIST)

### Krok 1: Príprava materiálov (15 minút)

V tvojom OneDrive folder `RKS Stránka` vyber **finálne materiály na nahranie**:

**Povinné minimum:**
- [ ] Logo (SVG alebo PNG)
- [ ] Tento brief (rksba_design_brief_v4.md)
- [ ] 3-5 najlepších obrázkov (rôzne kategórie — hero, energetika, rádio)

**Odporúčané:**
- [ ] Pozdrav riaditeľa (text)
- [ ] Schneider partner logo + 2-3 product fotky
- [ ] Loxone partner logo + 2-3 product fotky
- [ ] Motorola partner logo + 1-2 product fotky
- [ ] 2-3 PDF zo starej stránky (Rádiové siete, VAR-VYR, Kontakt)

**Voliteľné:**
- [ ] LinkedIn články ktoré chceš ako blog obsah
- [ ] Akýkoľvek iný relevantný materiál

### Krok 2: Set up design system v Claude Design (10 minút)

V Claude Design klikni **"Set up design system"**:
- Nahraj logo
- Pridaj primárnu farbu (extrahuj z loga, alebo použi #0C447C ako default)
- Pridaj sekundárnu farbu (biela #FFFFFF)
- Pridaj akcent (svetlomodrá #E6F1FB)
- Vyber font (Inter)
- Pridaj typography hierarchiu (H1 36-48px, H2 24-32px, body 16-18px)

**Toto nastavíš raz a všetky budúce dizajny budú konzistentné.**

### Krok 3: Vytvor nový Product prototype (5 minút)

- Klikni **"Product prototype"**
- Vyber design system ktorý si nastavila
- Nahraj brief (`rksba_design_brief_v4.md`)
- Nahraj všetky materiály z Kroku 1

### Krok 4: Zadaj prvý prompt (1 minúta)

```
Pozri brief ktorý som nahrala (rksba_design_brief_v4.md).
Vytvor homepage podľa sekcie 4 (wireframe homepage).

Použi materiály:
- Logo v hlavičke a footer
- Obrázky podľa sekcie 14.2
- Pozdrav riaditeľa ako prvý blog post (sekcia 14.3)
- Partner logá v trust bar a sekcii 6

Štýl: profesionálny B2B, modrá #0C447C ako primárna, biela ako sekundárna,
Inter font, flat design, žiadne emojis, sentence case.
```

### Krok 5: Iteruj (60-90 minút)

Po prvom výstupe:
- Pozri si výsledok
- Vráť spätnú väzbu Claude Designu konkrétne (napr. "Hero text je veľký, zmenši H1 na 36px")
- Pridaj sekcie postupne (najprv homepage, potom /energetika, potom /radiokomunikacie, atď.)

### Krok 6: Export a ďalšie kroky

Keď je dizajn hotový:
- Exportuj design (formát závisí od Claude Design — obrázky pre prezentáciu otcovi, kód pre developera, alebo handoff pre Webflow)
- **Pred funkčným launchom** ešte potrebuješ:
  - Postaviť reálny web (Webflow, Astro, alebo Claude Code)
  - Implementovať schema markup
  - Nastaviť Google Search Console
  - Nastaviť Google Business Profile
  - Pridať reálny formulár (Formspree, Netlify Forms)
  - Otestovať mobilnú verziu

---

## ZÁVER

Tento dokument je **finálny brief v4 pre Claude Design**. Obsahuje:
- Kompletnú štruktúru webu (sekcie 1-13)
- Inštrukcie pre použitie vstupných materiálov (sekcia 14)
- Pracovný flow pre teba (sekcia 15)

**Tvoj ďalší krok:**
1. Vyber materiály z OneDrive folder `RKS Stránka` (Krok 1 vyššie)
2. Set up design system v Claude Design (Krok 2)
3. Nahraj brief + materiály (Krok 3)
4. Zadaj prvý prompt (Krok 4)
5. Iteruj (Krok 5)
6. Pošli mi screenshot prvého výstupu — pomôžem ti s feedbackom
