# Unresolved content — needs Tenzor's review

Everything below is either **preserved verbatim from the legacy site including its
defects** (per the binding rule: Slovenian migrates verbatim, no silent fixes),
**newly written** where no source existed, or **placeholder data** carried over
from the legacy site. Nothing here is a bug in the build — it is content that a
human at Tenzor must confirm or correct.

---

## 1. Preserved typos and errors (verbatim from legacy `docs/tenzorfmf.github.io-main/`)

| Text (as shipped) | Where | Correct form (do NOT change without Tenzor's OK) |
|---|---|---|
| `predtsvaitve` | home.md body | predstavitve |
| `Študencka` (soba) | student-room.md title/label/slug `studencka-soba`, breadcrumb | Študentska |
| `orgarnizira` | past-events.md summary, archive-post bodies inherit context | organizira |
| `Tenzorji` (self-reference) | members.md — Lara Pustinek Miočić bio | (list is "Tenzor"; bio says "liste Tenzorji") |
| `Stiske študentov, od stanovanjske do so mi znane` | members.md — Maj Požar bio (garbled clause) | left verbatim |
| `vkjučimo` | members.md — Maj Požar bio | vključimo |
| `Ljubjani` | members.md — Staša Korpič bio | Ljubljani |
| lowercase `tenzor` / `vektor` | home.md, several summaries | proper noun casing left as written |

Legacy nav was also inconsistent (8 items on `pretekli_dogodki.html`, 11 elsewhere)
and contained a malformed attribute `<a href="studencka_soba.html".html">`. The new
single source-of-truth nav (5 domains) replaces all of it.

---

## 2. Newly written text (no source existed) — needs sign-off

### 2.1 The five section intros
Written for this migration; **Program, Dogodki and Za študente were later expanded
at the maintainer's request** (see §6) and now carry multi-sentence body prose:

- **Program** — now a full platform statement (three načela + a 5-item bullet list).
  Entirely our wording; needs Tenzor's sign-off on the claims it makes.
- **Finance** — "Celotne finance Tenzorja in študentske organizacije, objavljene
  zaradi transparentnosti." + a two-sentence note above the embedded spreadsheet.
- **Dogodki** — "Tenzor med letom pripravlja druženja, predavanja in tradicionalne
  dogodke …" (points at the three sub-pages).
- **Za študente** — "Na enem mestu zbrani praktični viri za študij na FMF …"
- **O Tenzorju** — "Tenzor je študentska lista na Fakulteti za matematiko in fiziko, ki nadaljuje delo nekdanje liste Vektor. Kandidiramo na volitvah v Študentski svet FMF in v ŠOUL."

### 2.2 Home "Explore" section descriptors (terse nav labels)
Program → "Načela in pobude"; Finance → "Načrti, poraba, revizije";
Dogodki → "Prihajajoči in pretekli"; Za študente → "Soba, učbeniki, povezave";
O Tenzorju → "Kdo smo, kontakt".

### 2.3 The dossier post metadata
- Title **"Zakaj ne podpiramo trenutnega stanja"** — the legacy `<h1>` was "Ker ne
  želimo"; the blueprint's "Important now" headline was English placeholder
  ("Why we didn't back the status quo"). This SL title is our wording.
- Summary/deck sentence is our wording (mirrors the blueprint deck).
- The 7-point dossier body itself and the "Viri" list are **verbatim** from `index.html`.

### 2.4 contacts.md body line and programme.md body line
One short sentence each, written to avoid echoing the frontmatter summary.

### 2.5 site.sl.yml organisation text
`organisationName`, `institutionName`, `siteDescription`, `footerText` were
composed for this build (footer mirrors the blueprint's English footer).

### 2.6 UI strings (src/i18n/sl.ts)
Generic interface labels ("Razišči", "Najnovejše", "Pomembno zdaj", filter chip
labels, empty/loading/error states, etc.) are our translations of the blueprint's
English chrome.

---

## 3. Flyer / poster alt text — DERIVED FROM FILENAMES, needs sign-off

All 14 legacy `<img>` tags had alt text `"Image 1"` … `"Image 14"` (an AA
failure). New Slovenian alt text was derived from the source folder names:

| Post | alt text (as shipped) | source folder |
|---|---|---|
| letak-program-sz-1 / -2 | „Letak kampanje „Program ŠZ“, stran 1/2.“ | `letaki/program šz/` |
| letak-sovz-program-1 / -2 | „Letak kampanje „ŠOVZ program“, stran 1/2.“ | `letaki/ŠOVZ program/` |
| letak-interesi-studentov-1 / -2 | „Letak kampanje „Kaj pa so interesi študentov in študentk“, stran 1/2.“ | `letaki/KAJ PA SO INTERESI ŠTUDENTOV IN ŠTUDENTK/` |
| letak-kaj-je-sz-sovz-1 / -2 | „Letak kampanje „Kaj je ŠZ / ŠOVZ“, stran 1/2.“ | `letaki/kaj je šz_šovz/` |
| letak-program-sz-b-1 / -2 | „Letak kampanje „Program ŠZ (drugi komplet)“, stran 1/2.“ | `letaki/program šz-1/` |
| letak-zakaj-volitve-1 / -2 | „Letak kampanje „Zakaj volitve“, stran 1/2.“ | `letaki/zakaj volitve/` |
| plakat-fmf-boat-party-zakaj | „Plakat „FMF Boat Party — zakaj“.“ | `plakati/FMF BOAT PARTY ZAKAJ /` |
| plakat-zastonj-biljard | „Plakat „Zastonj biljard“.“ | `plakati/ZASTONJ BILJARD/` |

The titles/summaries of these 14 archive posts are likewise derived, not from source text.

---

## 4. Approximate dates — needs correction

The archive posts require `publishedAt`. The legacy site carried **no dates** for
the flyers/posters. Provisional values:

- 12 election-campaign flyers → **2024-11-01** (FMF student elections season)
- 2 event posters (Boat Party, Free billiards) → **2024-05-01**

These drive the "Latest" ordering and the search year filter. Replace with real
dates where known.

The dossier post is dated **2024-06-01** (citation #1 is "Radio Študent, junij 2024";
matches the runbook filename `2024-06-01--…`).

---

## 5. Placeholder data carried over verbatim

- **useful-links.md roommate table** still holds the legacy placeholder row:
  `| Ime1 | 100E | contact@example.com | Lj. center |`. Real listings or removal
  needed.

- **FOUR FABRICATED EVENT POSTS** (`src/content/posts/sl/`, `kind: event`), created
  at the maintainer's request as demo content for the new Events section. **None of
  these is a real Tenzor write-up** — dates, venues, numbers and prose are invented,
  though the event *names* are real FMF traditions. Replace with genuine reports or
  delete before launch:
  - `2025-05-16--mafijski-piknik-2025.md` (event dated 14 May 2025, Mostec)
  - `2025-03-15--dan-stevila-pi-2025.md` (14 Mar 2025, FMF)
  - `2024-10-04--sprejem-brucev-2024.md` (3 Oct 2024, FMF)
  - `2024-11-10--pohod-smarna-gora-2024.md` (9 Nov 2024, Šmarna gora)

  They are indexed by search (`type: event`) and appear on the home "Latest" list
  and on `/sl/dogodki/pretekli-dogodki/`.

---

## 6. Structural notes

- **"Koristne povezave" was reworked and split** at the maintainer's request. The
  legacy single page (h2→h4 nesting, empty sub-headings) is now two sibling pages
  under **Za študente**: `useful-links.md` (Splošno, študijski programi, stanovanja
  in cimri, štipendije) and `study-notes.md` → **Zapiski** (`/sl/za-studente/zapiski/`,
  per-programme material behind `<details>` disclosures). Typos in the sentences
  that were rewritten (`koriste`, `predusm`, `ozroma`, `Obrjava`) were corrected in
  the process; link URLs and their labels are unchanged.

- **`sou.pdf`** is labelled "Program" in the legacy nav, but its filename suggests
  it is a ŠOU document. It is attached to `programme.md` (now titled **"Program
  izpred dveh let"**, `/sl/program/program-2023-24/`) as "Program (PDF)". Confirm
  which document this actually is, and whether "izpred dveh let" is the right frame
  (the label hard-codes "two years ago" and will drift).

- **Finance de-nested** (maintainer request): the `finance.md` child page was
  deleted and its Google-Sheet embed + intro moved onto the **Finance section page
  itself** (`section-finance.md`, still `pageType: section`). Finance is now the
  only section with no sub-list. `/finance.html` and `/sl/finance/finance/` redirect
  to `/sl/finance/`.

- **Events restructured** (maintainer request): `section-events` now has three
  children instead of one — `events-upcoming.md` → "Prihajajoči dogodki"
  (`pageType: events`, `eventsScope: upcoming`, currently empty → empty-state),
  `events-past.md` → "Pretekli dogodki" (`eventsScope: past`, lists `kind: event`
  posts newest-first), and `campaign-archive.md` → "Arhiv kampanj" (the old
  flyer/poster `pageType: archive`, formerly "Pretekli dogodki"). `/pretekli_dogodki.html`
  now points at the new "Pretekli dogodki" page. The `/program/program/` redundancy
  is resolved by the reslug above.
- **Names**: members are shown Title Case (per the blueprint member block); the
  legacy source had them UPPERCASE. No spelling changed.
- **members.md** `## Sodelujoči` heading kept with nothing under it (verbatim).
- **Zero English content**: the `/en/` tree is plumbing only.
