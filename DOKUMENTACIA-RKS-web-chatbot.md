# RKS — Prevádzková a technická dokumentácia (web + chatbot)

**Toto je JEDINÝ platný zdroj pravdy o webe rksba.sk a chatbote ai.rksba.sk.**
Posledná aktualizácia: **18. 8. 2026**. Autor priebehu: Dana Tarko (+ Claude).

Nahrádza a robí neplatnými: `RKS_Handover_web_chatbot.docx` (4. 8.), `HANDOVER-rks-2026-07-11.md`, `rksba_web_handoff.md` (20. 6.). Tie sú už len archív.

## Ako túto dokumentáciu udržiavať (dôležité)

- Toto je jeden živý dokument. Nevytvárame nové datované snapshoty — pri každej väčšej zmene infraštruktúry alebo stavu sa upravuje **tento súbor na mieste**, aktualizuje sa dátum vyššie a pribudne riadok do changelogu nižšie.
- Žije priamo v repozitári (`DOKUMENTACIA-RKS-web-chatbot.md` v koreni), takže sa verzuje spolu s kódom a nikdy sa nestratí. (Priečinok `_materials/` je mimo gitu — preto sa staré verzie strácali; tento dokument tam zámerne nie je.)
- Keď ho treba niekomu poslať (Vlado, Richi), vygeneruje sa z neho `.docx` alebo `.pdf`. Jeden zdroj, viac výstupov, vždy zhodné.
- Dve roviny: prevádzková (čo web robí, kde čo je, kto má prístup, koho volať) a technická. Netechnickému čitateľovi stačia sekcie 1, 2, 8 a 9.

## Changelog

- **18. 8. 2026** — konsolidácia do jedného mastra v repe. Doplnené: MOTOTRBO migrácia katalógu (773 produktov, noindex), prestavaný katalóg, tlačidlo „Späť hore", doplnené redirecty zo Search Console, publikované Energy Memo články, upresnené „over" body (Hostcreators vs. Websupport). Kánonický host rksba.sk (www -> 301). Zapísané Cloudflare Custom rules; pravidlo „cp" pustené pre overené roboty (Googlebot).
- **4. 8. 2026** — pôvodná verzia po spustení naostro (prehodenie DNS, SSL, indexovanie, doména chatbota, oprava vyhľadávania).

---

## 1. Zhrnutie — čo je naživo

Nový web je naostro na **https://rksba.sk** (aj www.rksba.sk), chatbot na **https://ai.rksba.sk**.

| Systém             | Adresa                       | Stav                                            |
| ------------------ | ---------------------------- | ----------------------------------------------- |
| Web                | https://rksba.sk (+ www)     | naživo, SSL, indexovateľný Googlom              |
| Chatbot            | https://ai.rksba.sk          | naživo, SSL, vrátane formulára                  |
| Starý web (Joomla) | 193.163.77.149 (mimo domény) | vypnutý z domény, server zatiaľ beží (rollback) |

Produkčný testovací origin webu: **https://rksba-web-6ht.pages.dev**. POZOR: stará adresa `rksba-web.pages.dev` je mŕtvy/starý projekt, nepoužívať.

---

## 2. Prehľad systémov (kto kde beží)

| Vrstva                        | Poskytovateľ                | Detail                                                                                                        |
| ----------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Doména rksba.sk (registrácia) | Websupport                  | Tu sa vlastní doména a nastavujú nameservery. Hlavná páka nad celou doménou.                                  |
| DNS                           | Cloudflare                  | Účet „Cloudflare@rksba.sk" (ID 92d988b80ad7036bfadbd34a980b0683). Nameservery bruce/teresa.ns.cloudflare.com. |
| Web (hosting)                 | Cloudflare Pages            | Projekt rksba-web, nasadzuje sa z GitHubu.                                                                    |
| Web (kód)                     | GitHub                      | danatarko-lab/rksba-web, vetva main.                                                                          |
| Chatbot (hosting)             | Vercel                      | Tím dana-tarko, projekt rks-radio-expert.                                                                     |
| Chatbot (kód)                 | GitHub                      | danatarko-lab/rks-radio-expert (privátny).                                                                    |
| E-mail (pošta)                | Websupport                  | MX mailin1.rksba.sk, mailin2.rksba.sk.                                                                        |
| Newsletter                    | Ecomail                     | Subdoména news.rksba.sk.                                                                                      |
| Transakčné e-maily            | Resend                      | Subdoména mail.rksba.sk.                                                                                      |
| Starý katalóg                 | mototrbo.sk, rks-katalog.eu | Riešené samostatne, redirect mapy hotové.                                                                     |

**Ujasnenie k „Hostcreators":** Hostcreators bol hosting starej Joomla/K2 databázy pre mototrbo.sk (DB `d50696_mototrbo`), z ktorej sa ťahal katalóg. S dnešnou poštou ani novým webom nesúvisí. Firemná pošta rksba.sk beží na Websupporte (MX mailin1/2).

---

## 3. Web rksba.sk

### 3.1 Stack a repo (technicky)

- Astro v6.4.2 (šablóna AstroWind) + Tailwind CSS v4 + TypeScript. Statický web (žiadna databáza, žiadne PHP, žiadne pluginy). Tmavá téma „Digital Blue".
- Node.js >= 22.12.0 (na Cloudflare cez premennú NODE_VERSION=22.12.0).
- Repo: GitHub danatarko-lab/rksba-web, vetva main.
- Hosting: Cloudflare Pages, projekt rksba-web (účet 92d988...). Testovacia adresa: https://rksba-web-6ht.pages.dev.

### 3.2 Ako web aktualizovať (prevádzka)

1. Zmena obsahu/kódu cez Claude Code v priečinku ~/workspace/rksba-web.
2. Commit a push na main (GitHub).
3. Cloudflare Pages automaticky zbuilduje a nasadí (cca 3 minúty). Netreba nič klikať.
4. Overiť naživo na https://rksba.sk (prípadne najprv na ...pages.dev).

Web sa dá aktualizovať 24/7 a nezávisí od toho, kto má prístup do Cloudflare, lebo sa nasadzuje z GitHubu.

POZOR na edge cache: po úprave existujúcej stránky Cloudflare drží staré HTML. Riešenie: Cloudflare dashboard -> doména rksba.sk -> Caching -> Configuration -> Purge Everything, potom na stránke Cmd+Shift+R. Nové stránky sa objavia hneď, len úpravy existujúcich treba prepláchnuť.

### 3.3 Build a deploy (technicky)

- Build command: `npm run build` = `astro build && pagefind --site dist && node scripts/slovnik-tooltipy.mjs && node scripts/typografia.mjs`
  - pagefind --site dist = vygeneruje index vyhľadávania.
  - slovnik-tooltipy.mjs = tooltipy zo slovníka pri builde.
  - typografia.mjs = typografické úpravy (napr. nezlomiteľné medzery v dátumoch).
- Output directory: dist. Framework preset: Astro. Production branch: main.

### 3.4 Domény, DNS a SSL

- rksba.sk = hlavná (kanonická) doména, www.rksba.sk = alias. Obe pridané ako Custom domains v Pages projekte, SSL sa vydáva automaticky.
- Apex (@) je CNAME @ -> rksba-web-6ht.pages.dev (nahradil starý A @ 193.163.77.149).
- POZOR: E-mailu (MX) sme sa NEDOTKLI, pošta beží ďalej. Pri akýchkoľvek zmenách DNS nechať MX záznamy mailin1/mailin2 na pokoji.
- POZOR: Nikdy neklikať „Begin DNS transfer" v Cloudflare, presunulo by to celú zónu vrátane pošty.
- HOTOVÉ (18. 8.): kánonický host = rksba.sk (non-www). www.rksba.sk sa 301-uje na rksba.sk cez Cloudflare Redirect Rule (šablóna „WWW to root", Request `https://www.rksba.sk/*` -> Target `https://rksba.sk/${1}`, 301, preserve query string). DNS/MX sa nedotýka.

### 3.5 Vyhľadávanie na webe (Pagefind)

- Vyhľadávanie beží na Pagefind. Statický index sa vytvorí pri builde (dist/pagefind/), beží celé v prehliadači cez Web Worker.
- Komponent: src/components/widgets/Search.astro.
- Ak by sa search pokazil, prvá vec na kontrolu je Cloudflare WAF a Bot Fight Mode (viď sekcia 6). Historicky ho rozbilo staré WAF pravidlo blokujúce cesty s /index/.

### 3.6 Presmerovania (staré URL -> nové)

- Živý súbor `public/_redirects` (301 presmerovania Cloudflare Pages) je COMMITNUTÝ artefakt. Generuje ho `scripts/redirects-generuj.mjs` zo zdrojov v `_materials/redirect/`: `mapa-rksba.csv` (staré indexované rksba.sk URL), `mapa-slovnik.csv` (staré seoglossary -> /slovnik/), `mapa-rks-katalog.csv` (rks-katalog.eu, 538 adries).
- POZOR (dôležité): generátor NIE JE súčasťou `npm run build`, spúšťa sa RUČNE. Po úprave ktorejkoľvek CSV mapy treba spustiť `node scripts/redirects-generuj.mjs`, inak sa zmena do webu nedostane. Ručné pravidlá mimo bloku `# === BEGIN/END ===` regeneráciu prežijú.
- Poradie: prvá zhoda vyhráva; konkrétne pravidlá idú pred zastupné (`*`).
- Cloudflare normalizuje trailing slash, takže typický reťazec je 301 -> 308 -> 200 (dva skoky). Platí pre celý web, nie je to chyba.

### 3.7 Indexovanie / SEO

- src/config.yaml -> metadata.robots -> index: true, follow: true (zapnuté pri launchi 4. 8.).
- public/robots.txt crawling neblokuje (Disallow je prázdny).
- Kanonická doména: https://rksba.sk (non-www). Sitemap: https://rksba.sk/sitemap-index.xml (noindex stránky sú z nej filtrované cez astro.config.ts).
- Zámerne noindex (mimo indexu aj sitemap): /decapcms/, 6x /lp/\*, /rozcestnik/, /presuhlas/, /ponuka/, /pripadove-studie/, plus celý MOTOTRBO katalóg (cca 796 ciest, viď 3.9). Zoznam noindex ciest katalógu: src/data/mototrbo-noindex.json.
- Structured data: katalóg generuje BreadcrumbList JSON-LD; Product JSON-LD sa zámerne negeneruje (Google pri type Product vyžaduje cenu/ponuku, ktorú nezverejňujeme). Potvrdiť v Search Console po preindexovaní (#122).

### 3.8 Cookies / súkromie

- Web je cookieless (analytika bez sledovacích cookies, Cloudflare Web Analytics). Preto nie je cookie lišta.
- Stránka zásad: /pouzivanie-suborov-cookies. Cookie lišta pribudne až keď/ak sa zapne Google Analytics alebo Meta Pixel.

### 3.9 Katalóg produktov

- Generátor: `_materials/katalog-podklady/gen_all_pages.py` (priečinok je mimo gitu, force-trackované sú len gen_all_pages.py + products.json + categories.json). Regenerácia katalógu = spustiť skript, stránky sa prepíšu. Produkuje cca 1219 produktových + 122 kategóriových .astro súborov.
- **Pôvodný archív (446 produktov)** je živý a indexovaný, ostáva nedotknutý.
- **Nová MOTOTRBO migrácia z mototrbo.sk:** prenesených 773 produktov + kategórie, s fasetovým filtrom (ako na mototrbo.sk: Počet kanálov, Krytie, Bluetooth atď.) plus frekvenčný filter pri anténach. Filter je v ľavom stĺpci. VŠETKO je zatiaľ noindex a neprelinkované (mimo menu aj sitemap) = na webe reálne neviditeľné, kým sa nespustí Step 3.
- Čaká revízia (#129): best-sellery vs. všetko; ktoré Novinky a články z mototrbo.sk preniesť.
- Step 3 (po revízii, #130/#50): premenovať slugy typu `prenosne-radiostanice-mototrbo-2` (vznikli z kolízie s archívom), postaviť redirect mapu mototrbo.sk -> nový web, prelinkovať do menu, prepnúť noindex na index. Slug rename je previazaný na rozhodnutie, či nový katalóg NAHRADÍ archív, alebo budú koexistovať.

### 3.10 Drobnosti UI

- Tlačidlo „Späť hore" (BackToTop.astro v Layout.astro) je na všetkých stránkach cez zdieľaný layout (1443 z 1450). Objaví sa po zascrollovaní, na mobile sa vyhýba lište menu.

---

## 4. Chatbot ai.rksba.sk

### 4.1 Stack a repo (technicky)

- Next.js (Node), model Claude Sonnet, slovenčina, vyhľadávanie na internete, znalostná báza 347 Q&A.
- Repo: GitHub danatarko-lab/rks-radio-expert (privátny).
- Hosting: Vercel, tím dana-tarko, projekt rks-radio-expert.

### 4.2 Deploy chatbota (technicky) — POZOR, iné ako web

- Chatbot sa NEnasadzuje automaticky z gitu. Push na main sám nič nenasadí.
- Nasadzuje sa RUČNE príkazom `npx vercel --prod` z priečinka repa.
- Odporúčanie: vo Vercel -> Settings -> Git prepojiť repo, aby sa nasadzoval sám (jednorazové nastavenie). Zatiaľ neurobené.

### 4.3 Doména a povolené originy

- ai.rksba.sk = CNAME ai -> 1b3189fb6cd7b3d6.vercel-dns-017.com v Cloudflare DNS, Proxy VYPNUTÁ (DNS only, sivý obláčik). Bez toho by Vercel nevydal SSL.
- Allowlist originov je natvrdo v kóde api/lead.js (konštanta ALLOWED_ORIGINS): ai.rksba.sk, rksba.sk, www.rksba.sk, rks-radio-expert.vercel.app, localhost. Endpoint api/chat.js origin nekontroluje.
- Ak sa chatbot presunie alebo pribudne doména, treba origin doplniť do api/lead.js a manuálne nasadiť.

### 4.4 Dáta / znalostná báza

- Prompt číta data/katalog.json + data/qa.json (cez lib/prompt.js). Zdrojový súbor Q&A: RKS_QA_master (xlsx).
- Na upratanie: v repe je neplatný .vercel-token, zmazať (zbytočný credential v gite). Opraviť názov firmy „R K S" v RKS_QA_master.xlsx (#70).

---

## 5. Prístupy — kto kam má prístup

| Služba                        | Účet / vlastník                   | Kto má prístup                    | Poznámka                                           |
| ----------------------------- | --------------------------------- | --------------------------------- | -------------------------------------------------- |
| Doména (Websupport)           | RKS (over)                        |                                   | Hlavná páka. Odtiaľ sa dajú prepnúť nameservery.   |
| Cloudflare (DNS + Pages)      | „Cloudflare@rksba.sk" (92d988...) | Dana, Richi; Marek Sarvaš (admin) | Marek má stále admin, plán na odstrihnutie nižšie. |
| GitHub rksba-web              | danatarko-lab                     | Dana                              | Web sa deployuje odtiaľto.                         |
| GitHub rks-radio-expert       | danatarko-lab                     | Dana                              | Chatbot (privátny repo).                           |
| Vercel                        | tím dana-tarko                    | Dana                              | Chatbot hosting.                                   |
| E-mail / hosting (Websupport) | RKS (over)                        |                                   | MX mailin1/2.                                      |
| Ecomail / Resend              | RKS                               | Dana                              | Newsletter / transakčné maily.                     |

### 5.1 Odstrihnutie Mareka Sarvaša (plán)

- Marek (WebGen) mal stále admin prístup do Cloudflare účtu; kedysi odobral Dane prístup a zmenil heslo (vyriešené, prístup obnovený).
- Rozhodnutie: web spustiť, Sarvaša odstrihnúť až po cca 2 týždňoch stabilnej prevádzky, potom zdokumentovať prístupy.
- Cesta k nezávislosti: keďže doménu vlastníte na Websupporte, viete na Websupporte prepnúť nameservery na vlastný firemný Cloudflare účet a DNS presunúť mimo Marekovho dosahu (bez jeho súčinnosti; MX prekopírovať, aby pošta neutrpela).

---

## 6. Bezpečnosť

- Statický web = minimálny povrch na útok (žiadna DB/PHP/admin/pluginy). DDoS a SSL rieši Cloudflare automaticky.
- Bot Fight Mode: VYPNUTÝ (dusil worker vyhľadávania; pre statický web zbytočný).
- Cloudflare Custom rules (Security -> WAF -> Custom rules), bežia v poradí:
  1. **BAN** (Block): `ip.src.country in {AL BG PL RO RU UA} or ip.src.continent in {AF ...}`. Blokuje rizikové krajiny/kontinenty. 4. 8. bola podmienka /index/ zúžená na /index.php, aby neblokovala Pagefind /pagefind/index/.
  2. **bot** (Skip): púšťa vybrané roboty (napr. AdsBot z Google ASN 15169/19527).
  3. **sk** (Skip): púšťa návštevu zo Slovenska.
  4. **cp** (Managed Challenge): dá výzvu každému, kto NIE je zo SK.
- HOTOVÉ (18. 8.): Googlebot indexoval z Google IP mimo SK, spadol do pravidla „cp" a dostal Managed Challenge -> 403 v Search Console. Fix: do výrazu „cp" pridané `and not cf.client.bot`, takže overené roboty vyhľadávačov (Google, Bing) sa už nechallengujú; geo-ochrana pre bežných návštevníkov ostáva. Výsledný výraz: `(not ip.src.country in {"SK"}) and not cf.client.bot` (#121, #25).
- OTVORENÉ: subdoména katalog.rksba.sk vracia 404, vyriešiť smerovanie alebo zrušiť.

---

## 7. Riešené problémy (log)

| Dátum  | Problém                                     | Príčina                                                              | Riešenie                                                                                                                                   |
| ------ | ------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 4. 8.  | Dashboard „Not found" po vytvorení projektu | dočasný glitch Cloudflare                                            | obnoviť cez zoznam Workers & Pages                                                                                                         |
| 4. 8.  | noindex ostal aj po zmene                   | Cloudflare edge cache                                                | Purge Everything                                                                                                                           |
| 4. 8.  | Chatbot „Origin not allowed" (formulár)     | ai.rksba.sk chýbalo v ALLOWED_ORIGINS                                | doplniť do api/lead.js + npx vercel --prod                                                                                                 |
| 4. 8.  | Vyhľadávanie vracia 0 výsledkov             | WAF blokoval /pagefind/index/ + Bot Fight Mode                       | /index/ -> /index.php, vypnúť Bot Fight Mode, Purge                                                                                        |
| 15. 8. | Prázdny ľavý panel katalógu na desktope     | nový Chrome skrýva obsah zatvoreného <details> cez ::details-content | atribút open v HTML + JS ho zhodí na mobile (commit 7b160a1)                                                                               |
| 15. 8. | 404/403 v Search Console                    | staré URL + nesúlad prefixu; /index.php 404                          | overené, že redirect mapa je nasadená; doplnených 6 pravidiel (commit c5fec2e). Väčšina 404 je migračný šum, vyčistí sa pri preindexovaní. |

---

## 8. Prevádzková príručka (pre netechnických, napr. Vlado)

Čo web robí: prezentuje dve vetvy RKS (Bezpečnostné systémy a rádiové siete + Energetika), má vyhľadávanie, katalóg produktov, newsletter „Potvrďte príjem", blog Energetiky (Energy Memo) a AI chatbota (ai.rksba.sk).

Chcem zmenu na webe alebo v chatbotovi: napíš Dane (alebo cez Claude Code). Zmena sa nasadí zvyčajne do pár minút (web) alebo po manuálnom nasadení (chatbot).

Čo NErobiť:

- Neklikať v Cloudflare „Begin DNS transfer".
- Nemazať/nemeniť MX (poštové) záznamy, rozbila by sa firemná pošta.
- Nevypínať/nemazať WAF pravidlo „BAN" ako celok (chráni web), meniť len po konzultácii.

Koho volať:

- Web, obsah, chatbot, nasadenia: Dana.
- DNS / Cloudflare (spolusprávca): Richi.
- Doména a e-mail/hosting: Websupport (podpora).
- Starý web / prechodné veci: Marek Sarvaš (do odstrihnutia).

Rollback (keby nový web zlyhal): vrátiť v Cloudflare apex na A @ 193.163.77.149 (starý server zatiaľ beží).

---

## 9. Otvorené úlohy / roadmap (k 15. 8. 2026)

**Hneď po launchi**

- Search Console: sledovať indexáciu, potvrdiť vyčistenie 404/403 po preindexovaní (#23).
- Lead systém naostro: Resend doména + prepnutie odosielacích adries (#6).
- Ecomail: účet, doména news.rksba.sk, zoznamy, import kontaktov (#56).
- Pred odoslaním e-mailu #002 prepnúť tlačidlo na rksba.sk/presuhlas (#74).
- Overiť s Richim, že vyplnenia formulára chatbota (vrátane súhlasu) tečú do Ecomailu (#75).
- Archív starého webu na bak.rksba.sk + upratanie po launchi (#10).

**Pre Richiho / Cloudflare**

- HOTOVÉ (18. 8.): pravidlo „cp" pustené pre overené roboty (`and not cf.client.bot`), Googlebot sa už nechallenguje (#121, #25).
- HOTOVÉ (18. 8.): kánonický host = rksba.sk, www -> 301 (Redirect Rule).
- Subdoména katalog.rksba.sk 404, vyriešiť alebo zrušiť.

**MOTOTRBO / katalóg**

- Revízia: best-sellery vs. všetko + ktoré články/novinky (#129).
- Step 3: slugy, redirect mapa mototrbo.sk, prelinkovanie, prepnutie na index (#130, #50).

**Chatbot / infra hygiena**

- Vercel -> Git integrácia pre chatbota (aby push nasadzoval sám).
- Zmazať neplatný .vercel-token z repa chatbota.
- Opraviť názov firmy „R K S" v RKS_QA_master.xlsx (#70).
- Hard gate pred chatbotom pred kampaňami (#64).
- Chatbot: len metrické jednotky, žiadne jardy/míle (#126).
- Aktualizovať AGENTS.md sekciu Deployment (uvádza rksba.sk ako starý web, už neplatí).

**Obsah / rozvoj**

- Automatizované odosielanie newsletterov (#13).
- Prípadové štúdie Motorola, nová podstránka (#113).
- Prelinkovanie stránok, knowledge graph (#35); konsolidácia roztrúseného obsahu (#21).
- EPS/UPS: rozpísať skratky, opraviť „elektronická" -> „elektrická" (#127).
- Evakuačný rozhlas: zväčšiť schému + rozšíriť popis (#128).
- Prepísať 2 staré články do série Potvrďte príjem (#29).
- EN verzia webu 3 az 5 stránok (#109).
- Keystatic: formuláre na správu obsahu pre Richiho (#37).

**Rozhodnutia (čakajú)**

- Zverejniť cenník prenájmu rádiostaníc? (#27) / ceny v katalógu? (#28)
- Archív produktov -> presmerovať na analógové VX kategórie? (#108)
- VX-2000DS/PS/PF pod VM-3000 nechať alebo presunúť? (#115)
- Zapnúť Google Analytics? (#93)

**Po cca 2 týždňoch stabilnej prevádzky**

- Zdokumentovať všetky prístupy a odstrihnúť Mareka Sarvaša (viď 5.1).

---

## 10. Kontakt / firemné údaje

R K S, spol s r.o. · IČO 30841275 · DIČ 2020328398 · IČ DPH SK2020328398
Sídlo: Vajnorská 6A, 900 28 Ivanka pri Dunaji · Fakturačná: Rajecká 36, 821 07 Bratislava
Tel: +421 903 717 634 · +421 2 4564 8204 · E-mail: info@rksba.sk / rks@rksba.sk
Prevádzka: Po-Pi 08:00-16:30
