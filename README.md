# Tenzor — spletna stran

Statična, večjezična spletna stran študentske liste **Tenzor** (Fakulteta za
matematiko in fiziko, UL). Zgrajena z [Astro](https://astro.build/); vsebina je
Markdown + YAML v Gitu. **Nič CMS-ja** — dodajanje objave pomeni dodati eno
datoteko, nikoli urejati predloge. Napačno urejena datoteka **ustavi gradnjo**
(to je edini varovalni mehanizem — glej [Validacija](#validacija)).

> This README is in Slovenian because that is the language of the people who
> maintain the content. Contributor notes in English are inline where useful.

---

## Kaj potrebuješ

- Node.js 20+ in npm
- Za urejanje vsebine: račun na GitHubu in osnovno poznavanje Markdowna. Nič več.

## Ukazi

```bash
npm install          # namesti odvisnosti (enkrat)
npm run dev          # razvojni strežnik na http://localhost:4321
npm run check        # tipi + preverjanje sheme vsebine (astro check)
npm run validate     # meddatotečno preverjanje vsebine
npm run build        # produkcijska gradnja: validate -> astro build -> pagefind -> redirecti
npm run preview      # predogled zgrajene strani (dist/)
```

`npm run build` naredi po vrsti:
1. `scripts/validate-content.mjs` — meddatotečna pravila (podvojeni ključi, trki poti, manjkajoče datoteke …)
2. `astro build` — statični HTML v `dist/`; Zod shema (`src/content.config.ts`) preveri vsako datoteko
3. `pagefind` — iskalni indeks v `dist/pagefind/`
4. `scripts/build-redirects.mjs` — preusmeritvene datoteke za stare `.html` naslove

---

## Struktura vsebine

```
src/content/
  pages/sl/…   pages/en/…      # komponirane strani MDX (brez datumov v imenu)
  posts/sl/…   posts/en/…      # objave Markdown ali MDX (ime: YYYY-MM-DD--stabilni-kljuc.md)
src/data/
  site.ts                      # jezikovno neodvisno (znamka, Instagram URL)
  site.sl.ts  site.en.ts       # ime organizacije, opis, noga, kontakt
src/i18n/
  config.ts                    # locales + jezikovno odvisni deli poti (novice/news, iskanje/search)
  sl.ts  en.ts                 # splošni UI nizi
public/media/documents/        # PDF-ji
src/assets/media/images/       # slike (letaki, plakati) — Astro jih optimira
```

### Stran ali objava?

- **Stran** = trajna vsebina, ki je v meniju ali na strani domene (npr. „Finance“,
  „Koristne povezave“, „Člani“). Ime datoteke je stabilno, brez datuma.
- **Objava** = časovno zamejena vsebina (novica, izjava, dogodek, dokument,
  arhivski letak/plakat). Ime datoteke se začne z datumom.

### Poimenovanje datotek

- Strani: `src/content/pages/sl/useful-links.mdx` (ime datoteke je angleško/opisno; javni `slug` v frontmatterju je `koristne-povezave`)
- Objave: `src/content/posts/sl/2024-06-01--zakaj-ne-podpiramo-stanja.md`
- Prevod ima **isto ime datoteke** v drugem jezikovnem imeniku.
- Javni `slug` je v frontmatterju in se **lahko razlikuje** po jeziku; ime
  datoteke je le identifikator v repozitoriju.

---

## Frontmatter — celoten pregled polj

Kopiraj `docs/examples/page-template.mdx` oz. `docs/examples/post-template.md` in uredi.

### Stran (`src/content/pages/<sl|en>/*.mdx`)

| polje | obvezno | opis |
|---|---|---|
| `translationKey` | da | stabilen, jezikovno neodvisen id; SL in EN različica ga **delita** |
| `lang` | da | `sl` ali `en`; mora se ujemati z imenikom |
| `title` | da | naslov (H1) |
| `slug` | da | URL segment; male črke, ASCII, vezaji |
| `summary` | da* | ena poved za SEO in po potrebi komponento `<PageIntro>`; `null` samo za prazne strani |
| `draft` | ne | `true` = izključeno iz poti, menija in iskanja |
| `updatedAt` | ne | ISO datum ali `null` |
| `nav.include` | ne | prikaži v meniju / na strani domene |
| `nav.label` | da (če v navigaciji) | kratka oznaka |
| `nav.section` | ne | `main` \| `utility` |
| `nav.parent` | ne | `translationKey` nadrejene domene ali `null` |
| `nav.order` | ne | vrstni red |
| `search.include` | ne | indeksiraj s Pagefind (privzeto `true`) |
| `search.type` | ne | `page` \| `person` \| `document` \| `archive` |
| `seo.title` / `seo.description` / `seo.noindex` | ne | meta oznake |
| `aliases` | ne | stari `.html` naslovi, ki naj preusmerjajo sem |
| `attachments` / `hero` | ne | strukturirani podatki za `<PageAttachments>` in hero sliko |

\* Domene niso več posebna vrsta strani. Domena je glavna navigacijska stran z
`nav.include: true`, `nav.section: main` in `nav.parent: null`; strani pod njo
uporabijo njen `translationKey` v `nav.parent`. Meni ima **vedno pet vnosov**,
ne glede na to, koliko strani je pod njimi.

Stran sestaviš iz MDX komponent: `<SheetEmbed>`, `<PageAttachments>`,
`<PeopleGroup>`/`<Person>`, `<EventList>`, `<PostArchive>`, `<CampaignArchive>`,
`<SectionChildren>`, `<ContactDetails>`, `<PageIntro>` in po potrebi
`<LinkTree>`. Komponenta določi postavitev in vedenje; frontmatter hrani
identiteto strani, navigacijo, SEO in strukturirane podatke.

Seznam ljudi (npr. kandidatov) piši neposredno v telesu strani z gnezdenimi
komponentami namesto v frontmatterju:

```mdx
<PeopleGroup heading="Skupina" candidate>

<Person id="ime-priimek" name="Ime Priimek" programme="Matematika">

Životopis v Markdownu — odstavki in seznami delujejo normalno.

</Person>

</PeopleGroup>
```

`candidate` na `<PeopleGroup>` je izbiren in poudari imena znotraj skupine.

### Objava (`src/content/posts/<sl|en>/*.md`)

| polje | obvezno | opis |
|---|---|---|
| `translationKey`, `lang`, `title`, `slug`, `summary` | da | kot pri strani (`summary` je pri objavi vedno obvezen) |
| `kind` | da | `news` \| `statement` \| `event` \| `document` \| `archive` |
| `publishedAt` | da | **izvirni** datum objave (ne datum migracije) |
| `updatedAt` | ne | ISO datum ali `null` |
| `category` | da | prosto besedilo; določa cilj „nazaj na domeno“ |
| `tags` | ne | seznam |
| `authors` | ne | seznam |
| `featured` | ne | `true` = ena izpostavljena objava na jezik („Pomembno zdaj“) |
| `hero` | ne | `{ src, alt (obvezno), caption? }` |
| `attachments` | pri `kind: document` potreben ≥1 (ali vir) | `{ label, path (/…), mediaType, language? }` |
| `sources` | ne | `{ label, url, archivedUrl?, accessedAt? }` |
| `event` | pri `kind: event` **obvezen** | `{ start, end?, timezone, venue?, address? }` |
| `search.include` / `search.type` | ne | isto kot pri strani |
| `aliases` | ne | stari naslovi |

---

## Kako dodaš slovensko stran

1. Kopiraj `docs/examples/page-template.mdx` v `src/content/pages/sl/moja-stran.mdx`.
2. Nastavi `translationKey`, `title`, `slug`, `summary`.
3. Če naj bo v meniju: `nav.include: true`, `nav.parent: "<translationKey domene>"`,
   `nav.order`.
4. Napiši telo v Markdownu oziroma MDX. Komponente uvozi na začetku telesa. Vsaka slika `![alt](pot)` mora imeti **neprazen alt**.
5. `npm run build` — če se gradnja izteče brez napake, je stran v redu.

## Kako dodaš angleški prevod

1. Kopiraj slovensko datoteko v `src/content/pages/en/` z **istim imenom** in končnico `.mdx`.
2. Prevedi `title`, `summary`, telo in po potrebi `slug` (`slug` je lahko drugačen).
3. **Obdrži isti `translationKey`.** Nastavi `lang: en`.
4. Gradnja samodejno poveže para in doda `hreflang` ter delujoč jezikovni preklop.

## Kaj se zgodi, če prevod manjka

Preklop jezika prikaže neaktiven gumb (`aria-disabled`), nikoli pokvarjene
povezave. `hreflang` za neobstoječ jezik se ne izpiše. Manjkajoči pari so
zabeleženi v `docs/migration/missing-translations.yml`.

## Kako dodaš sliko ali PDF

- **PDF**: daj datoteko v `public/media/documents/ime.pdf` (ASCII ime brez presledkov).
  V frontmatterju: `attachments: [{ label, path: "/media/documents/ime.pdf", mediaType: "application/pdf" }]`.
- **Slika**: daj jo v `src/assets/media/images/…`. V objavi:
  `hero: { src: "flyers/ime.png", alt: "opis" }`. Astro ustvari optimizirane
  različice; seznami prikažejo pomanjšave, izvirnik se naloži šele ob odprtju.

---

## Kako deluje gradnja

`astro build` prebere obe zbirki vsebine, preveri vsako datoteko z Zod shemo in
izriše statični HTML v `dist/`. Ena „catch-all“ pot
(`src/pages/[lang]/[...slug].astro`) obravnava strani, domene, objave in iskanje;
`src/pages/[lang]/index.astro` je domača stran; `src/pages/index.astro`
preusmeri `/` na `/sl/`. Nato `pagefind` zgradi iskalni indeks, `build-redirects`
pa doda preusmeritvene datoteke za stare `.html` naslove.

## Kako povrneš spremembo (Git)

Vsaka sprememba vsebine je en commit. Če je nekaj narobe:

```bash
git log --oneline           # poišči zadnji dober commit
git revert <hash>           # ustvari nov commit, ki razveljavi tistega
```

Nikoli ni treba „ročno“ popravljati — vrni se na prejšnjo različico datoteke.

## Validacija

Dve plasti; obe morata biti zeleni, sicer gradnja pade:

1. **`src/content.config.ts` (Zod, ena datoteka naenkrat)** — manjkajoča obvezna
   polja, neznan `lang`/`kind`, neveljavni datumi/URL-ji, prazen alt,
   `kind: event` brez `event.start` + `event.timezone`, `kind: document` brez
   priloge ali vira, nevarni `slug`.
2. **`scripts/validate-content.mjs` (med datotekami)** — `lang` proti imeniku,
   podvojen `translationKey` znotraj jezika, neujemanje `kind` v paru prevodov,
   trki poti po dodajanju nadrejene domene, trki in celovitost
   `aliases`, `attachments[].path` / `hero.src` na neobstoječo datoteko, osnutki
   v navigaciji/iskanju.

## Za drugo fakulteto

Stran je zasnovana tako, da se lahko ponovno uporabi drugje **brez urejanja
komponent**:

- `src/data/site.ts` — znamka, Instagram URL
- `src/data/site.sl.ts` / `site.en.ts` — ime organizacije, opis, noga, kontakt
- `src/i18n/config.ts` — jeziki in jezikovno odvisni deli poti (`novice`/`news`,
  `iskanje`/`search`)
- `src/i18n/sl.ts` / `en.ts` — UI nizi
- domena je nastavljena v `astro.config.mjs`, `scripts/build-redirects.mjs` in `public/CNAME`
- `public/CNAME` — domena za GitHub Pages

Vsebina (`src/content/`), logotip (`src/assets/brand/tenzor-mark.svg`) in
`public/favicon.svg` so seveda specifični za Tenzor.

---

## Namestitev (GitHub Pages)

`.github/workflows/validate.yml` teče ob vsakem push/PR (tipi, validacija,
gradnja, preverjanje povezav). `.github/workflows/deploy-pages.yml` ob push na
`main` zgradi in objavi `dist/`. `public/CNAME` nosi `tenzor-fmf.org`.

> Vklop GitHub Pages, dodajanje oddaljenega repozitorija, `git push` in vse
> spremembe DNS so **dejanja vzdrževalca**, ne del te kodne baze.
