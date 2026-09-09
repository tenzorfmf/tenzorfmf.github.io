# Tenzor website copy audit
Labels used below: **Error** = spelling, grammar, mistranslation, or objectively broken copy; **Improve** = grammatical but awkward or inconsistent; **Verify** = a factual, institutional, naming, or time-sensitive choice that an editor should confirm.


## Site-wide decisions

- **Error / consistency — name of the organisation:** the Slovenian copy alternates among `stranka Tenzor`, `študentska lista Tenzor`, `društvo Tenzor`, and `študentska organizacija`. Use **`študentska lista Tenzor`** for the electoral list. Use **`društvo Tenzor`** only where the legal association is specifically meant and factually correct. Avoid `stranka`, which implies a political party. Mirror this distinction in English with **`the Tenzor student list`** and, only where legally accurate, **`the Tenzor association`**.
- **Error — capitalization:** every occurrence of the proper names must be **`Tenzor`** and **`Vektor`**, never `tenzor` or `vektor`.
- **Improve — Slovenian form of address:** the site mixes informal singular (`odpri`, `te zanima`, `piši`, `če imaš`), formal/plural (`iščite`, `če želite`, `pišite`, `pripravite`) and impersonal language. Choose one house style. For a student-facing site, informal singular is plausible; if chosen, change formal/plural instances rather than alternating within or between adjacent pages.
- **Improve — English house style:** the English copy is broadly British (`programme`, `organised`, `socialise`). Keep that variant and edit new wording accordingly.
- **Verify — relative dates:** replace `izpred dveh let` / `from two years ago` with an absolute academic year or mandate. Relative wording has already become ambiguous and will silently become false.
- **Improve — untranslated URL-safe tags are shown to readers:** `PostLayout.astro` prints raw tag slugs in post metadata, producing labels such as `free-entry`, `month-of-youth`, `student-life`, and `academic-assembly`. Map tags to localized human-readable labels or do not render them.
- **Error — English 404 coverage:** `src/pages/404.astro` is Slovenian-only. An English visitor receives `Stran ne obstaja ali je bila premaknjena` and a Slovenian home link. Localize the 404 page according to the requested/active locale, or provide neutral bilingual copy.

## Shared interface and navigation copy

### `src/i18n/sl.ts` and `src/i18n/en.ts`

- **Improve:** `Pomembno zdaj` / `Important now` is an unnatural homepage eyebrow. Prefer **`Izpostavljeno` / `Featured`** or **`Aktualno` / `Current`**.
- **Error / context:** `Preberi dosje` / `Read the dossier` is used as the CTA for any featured post, including the current job-shadowing notice. Replace it with the generic **`Preberi več` / `Read more`**, or choose a CTA by content type.
- **Improve:** `Povezano in viri` / `Related & sources` is incomplete. Prefer **`Povezane vsebine in viri` / `Related content and sources`**.
- **Improve:** English `This page is in progress` is non-idiomatic for an unfinished web page. Use **`This page is being prepared`** or **`This page is under construction`**.
- **Improve:** English `No upcoming events right now` is overly conversational relative to the rest of the site. Prefer **`There are currently no upcoming events`**.
- **Error — Slovenian number agreement:** `Prikazanih ${shown} od ${total} zadetkov` is wrong for values such as 1 and 2. A robust form without complex pluralization is **`Rezultati: ${shown} od ${total}`**. The same string is duplicated in `SearchApp.astro`; change both or use the shared translation function.
- **Improve / consistency:** `Kontakti` in shared navigation but `Kontakt` on the English page is inconsistent (`Contacts` versus `Contact`). Choose one; singular **`Contact`** is more idiomatic for the page heading.

### Hard-coded visible copy

- **Error — `src/pages/[lang]/[...slug].astro`:** Slovenian back links are composed as `Nazaj na` + a nominative section title, producing forms such as **`Nazaj na Dogodki`**. Avoid case inflection with **`Nazaj v razdelek: Dogodki`**; English `Back to Events` can remain.
- **Improve — `src/pages/[lang]/index.astro`:** homepage descriptor `Kdo smo, kontakt` / `Who we are, contact` is fragmentary. Prefer **`Kdo smo in kako do nas` / `Who we are and how to reach us`**.
- **Improve — `src/pages/[lang]/[...slug].astro`:** `Reklamno gradivo — letaki` conflicts with the more neutral English `Campaign material — flyers` and with `promotional material` elsewhere. Use **`Promocijsko gradivo — letaki`**.
- **Error / localization — `src/layouts/PageLayout.astro`:** the Slovenian contact page displays the hard-coded label `Email`. Use **`E-pošta`** for Slovenian and `Email` for English.

## Core pages — Slovenian

### Home — `/sl/` (`src/content/pages/sl/home.md`)

- **Error:** `Smo študentje iz fakultete za matematiko in fiziko.` → **`Smo študentje Fakultete za matematiko in fiziko.`** (`Fakulteta` is a proper institutional name; `iz fakultete` is also unidiomatic here). Apply the correction to `summary`, `seo.description`, and the body.
- **Error:** `Skupaj smo ustvarili stranko tenzor` → **`Skupaj smo ustanovili študentsko listo Tenzor`**.
- **Improve:** `ki ima svoje korenine že v stranki Vektor` is cumbersome and again uses `stranka`. Prefer **`ki nadaljuje delo nekdanje študentske liste Vektor`**.
- **Error:** the second sentence has no final punctuation. Add a full stop.
- **Error:** `predtsvaitve` → **`predstavitve`**. If these are candidate profiles, the more precise word is **`predstavitve kandidatov`**.
- **Error / structure:** `program, naše predstavitve, ... Zakaj voliti za nas` is not a valid list or sentence. Remove the comma before the ellipsis and replace the placeholder with concrete links/topics.
- **Error / structure:** `Zakaj voliti za nas` is both detached from the sentence and grammatically weaker than **`Zakaj voliti nas?`**. Make it a real heading followed by reasons, or remove it. The old site had a separate “Ker ne želimo” section and sources; do not leave its heading fragment embedded in the introduction.

### Annual programme — `/sl/program/letni-program/` (`annual-programme.md`)

- **Verify — stale date:** `Program za leto 2025/26 ...` is the page's only substantive text. On 31 August 2026, either publish it, change it to **2026/27**, or state the actual expected publication date.
- **Improve:** `je v izdelavi` is mechanical. Prefer **`je v pripravi`** or **`nastaja`**.
- **Improve:** `ga lahko pričakujete kmalu` is vague and becomes stale. Give a date or omit the promise.

### Campaign archive — `/sl/dogodki/arhiv-kampanj/` (`campaign-archive.md`)

- **Improve:** replace `reklamno gradivo` with **`promocijsko gradivo`** in the summary and body.
- **Improve / register:** `Za poročila o dogodkih glej ...` uses informal singular while adjacent pages use formal/plural or impersonal language. A register-neutral version is **`Poročila o dogodkih so v razdelku Pretekli dogodki.`**

### Contacts — `/sl/o-tenzorju/kontakti/` (`contacts.md`)

- **Error:** `Tu se nahajajo informacije kako nas kontaktirati.` needs a comma and better government: **`Tu najdete informacije o tem, kako stopiti v stik z nami.`** Apply it to both `summary` and `seo.description`.
- **Improve:** `nam pišite na e-pošto` → **`pišite nam na e-poštni naslov`** or simply **`pošljite nam e-pošto`**.

### Past events — `/sl/dogodki/pretekli-dogodki/` (`events-past.md`)

- **Improve:** `Reklamno gradivo starejših akcij` → **`Promocijsko gradivo preteklih kampanj`**; this is more neutral and matches the archive's purpose.

### Upcoming events — `/sl/dogodki/prihajajoci-dogodki/` (`events-upcoming.md`)

- No material Slovenian error found beyond the site-wide register decision.

### Newsletter — `/sl/za-studente/obvestilnik/` (`newsletter.md`)

- **Error / terminology:** SEO description `Obvestilnik stranke Tenzor` → **`Obvestilnik študentske liste Tenzor`**.
- **Verify — missing content:** the page body and summary are empty. Add the purpose, subscription method, expected frequency, unsubscribe/privacy information, and an actual signup action; otherwise remove it from navigation.

### Post archive — `/sl/dogodki/arhiv-objav/` (`post-archive.md`)

- No material copy error found.

### Archived programme — `/sl/program/program-2023-24/` (`programme.md`)

- **Error / stale wording:** title, navigation label, summary, SEO title, and body all say `izpred dveh let`. Rename the page to **`Program 2023/24`** (or the correct mandate) everywhere.
- **Improve:** `Arhivski program stranke Tenzor` → **`Arhivski program študentske liste Tenzor`**.
- **Verify:** `iz prejšnjega mandata` and `iz mandata pred dvema letoma` are not equivalent. State the exact academic year/mandate once and use it consistently.

### About Tenzor — `/sl/o-tenzorju/` (`section-about.md`)

- **Verify:** `Kandidiramo na volitvah v Študentski svet FMF in v ŠOUL.` should use the exact official names of the two bodies. If both are meant, spell out the second at first mention: **`... in v Študentski zbor ŠOU v Ljubljani`** (subject to factual confirmation).
- **Improve:** SEO description `Kdo smo, člani in kontakt.` → **`Kdo smo, kdo so naši člani in kako stopiti v stik z nami.`**

### Events section — `/sl/dogodki/` (`section-events.md`)

- **Improve:** replace `kampanjsko gradivo` / `reklamno gradivo` with one consistent term, preferably **`promocijsko gradivo`**, in summary, SEO description, and body.
- **Improve:** `dogodke, ki povežejo študente` is acceptable, but **`dogodke, ki povezujejo študente`** better describes recurring activity.

### Finance — `/sl/finance/` (`section-finance.md`)

- **Improve:** `Celotne finance Tenzorja ...` is not idiomatic. Use **`Celovit pregled financ Tenzorja in študentske organizacije, objavljen zaradi transparentnosti.`** in `summary` and `seo.description`.
- **Improve:** `celotno porabo` → **`vso evidentirano porabo`** or **`celovit pregled porabe`**, depending on what the sheet actually contains.
- **Improve:** `Podatki niso vedno povsem sveži` is colloquial. Prefer **`Podatki niso vedno popolnoma posodobljeni`**.
- **Error / awkward syntax:** `praviloma jih osvežimo za daljše časovno obdobje naenkrat` → **`praviloma jih posodabljamo v večjih časovnih sklopih`**.
- **Improve:** embed title `Tenzor in študentska organizacija — finance javno` → **`Javni pregled financ Tenzorja in študentske organizacije`**.

### Programme section — `/sl/program/` (`section-program.md`)

- **Improve:** `Naš program stoji na treh načelih` → **`Naš program temelji na treh načelih`**.
- **Improve:** `odzivnost na težave, ki jih študenti dejansko imajo` → **`odzivnost na težave, s katerimi se študenti dejansko srečujejo`**.
- **Improve:** final `v dokumentu spodaj` is inaccurate if more than one archive item is later added. Link and name the exact document, preferably **`Program 2023/24`**.

### For students — `/sl/za-studente/` (`section-students.md`)

- **Improve:** the body is a sentence fragment: `Na enem mestu zbrani praktični viri ...`. Use **`Na enem mestu so zbrani praktični viri ...`**.
- **Improve / consistency:** `prijava na obvestila` should match the page name and action, e.g. **`prijava na obvestilnik`**.

### Student room — `/sl/za-studente/studencka-soba/` (`student-room.md`)

- **Error:** `Študencka soba` → **`Študentska soba`** in `title`, `nav.label`, `seo.title`, and `seo.description`.
- **Error / URL:** change the public slug from `studencka-soba` to **`studentska-soba`** and retain the misspelled route plus `/studencka_soba.html` as redirects/aliases so existing links do not break.
- **Verify — missing content:** the page body and summary are empty. Add location, access rules/hours, facilities, responsible contact, and any booking/key procedure, or remove it from navigation until ready.

### Textbook fund — `/sl/za-studente/ucbeniski-sklad/` (`textbook-fund.md`)

- **Improve / agreement ambiguity:** `projekt, ki ga organizira društvo Tenzor z namenom, da bi ... olajšali` has no clear plural subject for `olajšali`. Prefer **`Učbeniški sklad je projekt društva Tenzor, namenjen lažjemu dostopu študentov FMF do učbenikov in drugih študijskih gradiv.`** Apply the same idea to the summary.
- **Improve:** `Deluje po preprostem principu` → **`Deluje po preprostem načelu`**.
- **Improve:** `povečujemo zalogo knjig` → **`širimo zbirko knjig`**.
- **Improve:** `prihodnje generacije študentov` is wordy; **`prihodnje generacije`** is sufficient in context.
- **Improve / orthography:** `kadarkoli` → **`kadar koli`** in careful formal prose.
- **Improve:** `večjo ... knjižno zbirko` → **`obsežnejšo ... knjižno zbirko`**.

### Members — `/sl/o-tenzorju/clani/` (`members.md`)

- **Error / terminology:** title `Člani stranke Tenzor` → **`Člani študentske liste Tenzor`** (or simply `Člani Tenzorja`).
- **Error:** summary and SEO description use lowercase `tenzor`; capitalize **`Tenzor`** and replace `stranke` as above.
- **Verify / translation mismatch:** final heading is `Sodelujoči`, while English says `Candidates`. If the people are candidates, use **`Kandidati`**; if they are broader participants, change the English heading to `Contributors`/`Participants`.
- **Verify — group taxonomy:** two people are grouped under `Študentski zbor`, others under `Člani stranke Tenzor`, while the English file uses `Student Assembly` and `Members of the Tenzor list`. Define the intended grouping and translate it one-to-one.

#### Timen Bobnar

- **Error:** `Kot tutor, s več kot dvema letoma izkušenj` → **`Kot tutor z več kot dvema letoma izkušenj`** (remove the comma; `z`, not `s`).
- **Improve:** `preko organizacije dogodkov` → **`z organizacijo dogodkov`**.
- **Error / pronouns:** `da študentje dobimo priložnost, da naš glas vpliva` → **`da študentje dobimo priložnost s svojim glasom vplivati`**.
- **Improve / avoid ambiguous agreement:** rewrite `razvoj znanj in veščin, ki so ključni za našo prihodnost` as **`razvoj za našo prihodnost ključnih znanj in veščin`** or, more naturally, **`pridobivanje znanj in veščin, ključnih za našo prihodnost`**.
- **Verify:** the first sentence says he is running for `Študentski zbor na Fakulteti`, while the final sentence anticipates membership of `Študentski svet`. Confirm which body is intended.

#### Aleksej Luka Golobič

- **Improve / official naming:** `poslanca v zboru ŠOUL` → the body's exact official name, likely **`poslanca v Študentskem zboru ŠOU v Ljubljani`** (verify).
- **Error:** `ŠOUL bi se lahko koristil kot orodje` → **`ŠOUL bi lahko služil kot orodje`** or **`ŠOUL bi lahko uporabili kot orodje`**.
- **Error:** `za širše študentsko organizirane` → **`za širše študentsko organiziranje`**.
- **Error:** `Več družabnih obštudijskih dejavnost` → **`Več družabnih obštudijskih dejavnosti`**.
- **Improve / register:** if the site adopts formal public-facing prose, `žurke` → **`zabave`**. Retain `žurke` only if the candidate's intentionally informal voice is to be preserved.
- **Improve:** add consistent terminal punctuation to all five list items, or to none; sentence-style bullets with full stops are clearest.

#### Lara Pustinek Miočić

- **Error:** `predstavnica študentske liste Tenzorji` → **`predstavnica študentske liste Tenzor`**.
- **Improve:** `S študentsko organizacijo UL` should use the organisation's full official name at first mention.
- **Improve:** `poleg spektatorske pozicije izkusiti tudi aktivnejšo plat udeleževanja v študentskem političnem odločanju` is bureaucratic and unnatural. Prefer **`iz vloge opazovalke preiti k dejavnejšemu sodelovanju pri odločanju v študentski politiki`**.
- **Improve:** `vzporeden študij` → **`vzporedni študij`**.

#### Maj Požar

- **Error — incomplete construction:** `Stiske študentov, od stanovanjske do so mi znane ...` is missing the second end of `od ... do ...`. Rewrite, for example: **`Različne stiske študentov, zlasti stanovanjska problematika, so mi znane ...`**.
- **Error:** `vkjučimo` → **`vključimo`**.
- **Error / punctuation:** remove the comma before `ter` in `študentov, ter se bolje ...`.
- **Improve:** `prek sodelovanja na volitvah` → **`z udeležbo na volitvah`**.
- **Improve:** `potegujem za mesto na listi Tenzor` is odd if inclusion on the list is already settled. Prefer **`kandidiram na listi Tenzor`**.

#### Staša Korpič

- **Error — agreement:** `Življenjski in študijsko pogoji` → **`Življenjski in študijski pogoji`**.
- **Error:** `Ljubjani` → **`Ljubljani`**.
- **Improve:** `slabih študentskih zaposlitvah` is vague; specify **`slabih delovnih pogojih pri študentskem delu`** if that is the intended meaning.
- **Improve:** `deluje v dobrobit študentov` → **`deluje v dobro študentov`** or **`deluje za dobrobit študentov`**.
- **Error — broken parallelism:** `bodo prostor za ... hkrati pa premor` → **`bodo prostor za ... in hkrati omogočili premor`**.

#### Jakob Sever Klasinc

- **Error / orthography:** `FMFja` → **`FMF-ja`**.
- **Improve:** `imamo ... priložnost organizirati se` → **`imamo ... priložnost, da se organiziramo`**.
- **Error / punctuation:** `ne samo lahko ampak tudi moramo` → **`ne le lahko, temveč tudi moramo`**.
- **Improve:** `zvišati zavest o problemih` → **`ozaveščati o težavah`** or **`povečati ozaveščenost o težavah`**.
- **Error / incomplete thought:** `ter njihovo širše mesto` lacks both a clear verb relation and the domain in which this “place” exists. The English translation supplies `their broader place in society`; add **`ter o njihovem širšem mestu v družbi`** or rewrite the full sentence.
- **Error / punctuation:** remove the comma before `ter` in the last sentence.

### Useful links — `/sl/za-studente/koristne-povezave/` (`useful-links.md`)

- **Improve:** `Splošno o faksu` is colloquial beside otherwise institutional wording. Prefer **`Splošne informacije o FMF`**.
- **Improve:** `FMF Fiziki Discord` → **`Discord študentov fizike na FMF`**.
- **Improve:** `Zapiske, liste z izpitov in rešene naloge` → **`Zapiske, izpitne pole in rešene naloge`** (or `stare izpite`, depending on the material).
- **Improve:** `Facebook skupine za oddajo sob` could mean only landlords posting. **`Facebook skupine za najem in oddajo sob`** is clearer.
- **Improve:** `Cimer na FMF` → **`Poišči cimra ali cimro na FMF`**.
- **Improve / inclusivity:** mail subject `Iščem cimra/o` is awkward. Use **`Iščem sostanovalca ali sostanovalko`**.
- **Error — placeholder content:** remove the sample row `Ime1 | 100E | contact@example.com | Lj. center` before launch. If a demonstrative empty state is needed, label it explicitly rather than presenting it as a real listing.
- **Error — currency typography:** if the row is retained for testing, `100E` → **`100 €`**.
- **Improve:** `Posebni dosežek za Zoisovo štipendijo` → **`Posebni dosežki za Zoisovo štipendijo`** or **`Kako izkazati posebni dosežek za Zoisovo štipendijo`**.

### Study notes — `/sl/za-studente/zapiski/` (`study-notes.md`)

- **Improve:** `listi z izpitov` → **`izpitne pole`** or **`stari izpiti`** in the summary and SEO description.
- **Improve / register:** `Odpri program, ki te zanima` must follow the site-wide register choice. A neutral alternative is **`Izberite želeni program`** (formal) or **`Izberi program, ki te zanima`** (informal singular).
- **Improve:** `Praktična / aplikativna matematika` → **`Praktična oziroma aplikativna matematika`**; avoid spaces around a slash if a slash is retained.
- **Improve:** `FRI Discord za magisterije` → **`Discord FRI za magistrske študente`**.
- **Improve:** mixed-language `Mašini aesthetically pleasing zapiski` → **`Mašini estetski zapiski`**, unless the mixed phrase is the creator's fixed project title.
- **Improve / register:** the closing paragraph uses formal/plural (`ste`, `želeli`, `želite`, `pišite`), while the opening uses informal singular (`te`). Make them consistent.

## Core pages — English

### Home — `/en/` (`src/content/pages/en/home.md`)

- **Improve:** `We are students from the Faculty ...` → **`We are students at the Faculty of Mathematics and Physics.`** Apply to the summary, SEO description, and body.
- **Improve:** `Together we created the Tenzor list` → **`Together, we founded the Tenzor student list`**.
- **Improve:** `which has its roots in the earlier Vektor list` → **`which continues the work of the former Vektor student list`**.
- **Error / structure:** `our programme, our candidates, ... why you should vote for us` is a broken list. Replace the ellipsis with specific linked items.
- **Error / structure:** if `Why you should vote for us` is retained, make it a separate heading with supporting copy; do not leave it as a lowercase fragment after an ellipsis.

### Annual programme — `/en/programme/annual-programme/` (`annual-programme.md`)

- **Verify — stale date:** the only substantive copy is `The 2025/26 programme ...`. Publish it, update the year to 2026/27, or give an actual publication date.
- **Improve:** `will be published soon` becomes stale; use a concrete date or omit it.

### Campaign archive — `/en/events/campaign-archive/` (`campaign-archive.md`)

- **Improve:** `information campaigns` → **`informational campaigns`**.

### Contact — `/en/about-tenzor/contact/` (`contacts.md`)

- **Improve:** `write to us by email` → **`email us`**.
- **Improve:** `remove some material` → **`remove material`** or **`remove particular material`**; `some` can sound dismissive in a takedown request.

### Past events — `/en/events/past-events/` (`events-past.md`)

- **Improve:** `A chronological overview of events held` is repetitive. Prefer **`A reverse-chronological overview of past events.`**

### Upcoming events — `/en/events/upcoming-events/` (`events-upcoming.md`)

- **Improve:** `Announced events being prepared by Tenzor` → **`Confirmed upcoming events organised by Tenzor`** in the summary and SEO description.
- **Improve:** `Below are events that are already confirmed` → **`Confirmed events are listed below.`**

### Newsletter — `/en/for-students/newsletter/` (`newsletter.md`)

- **Verify — missing content:** body and summary are empty. Add purpose, signup method, frequency, unsubscribe/privacy information, and a working action, or remove the page from navigation.

### Post archive — `/en/events/post-archive/` (`post-archive.md`)

- No material copy error found.

### Archived programme — `/en/programme/programme-2023-24/` (`programme.md`)

- **Error / stale wording:** replace `Programme from two years ago` everywhere with **`Programme 2023/24`** (or the correct mandate).
- **Improve:** `from the term two years ago` is not idiomatic and is time-dependent. Use **`from the 2023/24 term`** or **`for the 2023/24 mandate`**, as factually appropriate.
- **Improve:** `This is the programme from the term two years ago` → **`This is Tenzor's programme for 2023/24.`**

### About Tenzor — `/en/about-tenzor/` (`section-about.md`)

- **Improve:** `We run in elections to ...` → **`We contest elections for seats on the FMF Student Council and in [official English name of ŠOU body].`**
- **Verify:** do not leave `ŠOUL` unexplained for English readers; spell out the organisation/body at first mention.

### Events section — `/en/events/` (`section-events.md`)

- **Improve:** SEO `campaign material of the Tenzor list` → **`the Tenzor student list's campaign material`** or simply **`Tenzor campaign material`**.

### Finance — `/en/finance/` (`section-finance.md`)

- **Improve:** `The complete finances of Tenzor ...` → **`A comprehensive overview of Tenzor's and the student organisation's finances, published for transparency.`** Apply to summary and SEO description.
- **Improve:** `the complete spending` → **`all recorded expenditure`** or **`a comprehensive overview of expenditure`**, depending on the data.
- **Error / awkward syntax:** `we generally refresh it for a longer period at once` → **`we generally update it in batches covering longer periods`**.
- **Improve / agreement:** `The data isn't ... we refresh it` is accepted in informal English, but formal British copy usually takes plural agreement: **`The data are not always fully up to date; we generally update them ...`**. Alternatively use singular `dataset`.
- **Improve:** embed title `Tenzor and the student organisation — finances, public` → **`Public overview of Tenzor and student-organisation finances`**.

### Programme section — `/en/programme/` (`section-program.md`)

- **Improve:** `problems students actually have` → **`problems students actually face`**.
- **Improve:** `projects that work are kept and improved` → **`we retain and improve projects that work`**.
- **Improve:** `the mathematics and physics sides of FMF` → **`the mathematics and physics communities at FMF`**.
- **Improve:** `conditions for progressing through a programme` → **`academic-progression requirements`**.
- **Improve:** `A detailed plan ... is collected in` → **`A detailed plan ... is set out in`**.

### For students — `/en/for-students/` (`section-students.md`)

- **Improve:** the body is a fragment: `Practical resources ... gathered in one place`. Use **`This page brings together practical resources for studying at FMF: ...`**.

### Student room — `/en/for-students/student-room/` (`student-room.md`)

- **Verify — missing content:** body and summary are empty. Add location, access/hours, facilities, contact, and booking/key instructions, or remove from navigation.

### Textbook fund — `/en/for-students/textbook-fund/` (`textbook-fund.md`)

- **Improve:** `It works on a simple principle` is understandable but slightly literal; **`The fund works simply:`** is more direct.
- **Improve:** `grow the stock of books` → **`expand the book collection`**.
- **Improve:** `hand them over to the textbook fund` → **`sell or donate them to the textbook fund`**, if both options are actually available; otherwise name the transaction accurately.
- **Improve:** use one spelling for the noun: **`handover`** (not `hand-over`). `Buyback session` is likewise normally closed as one word.
- **Improve:** `a bigger ... book collection` → **`a larger ... book collection`**.

### Members — `/en/about-tenzor/members/` (`members.md`)

- **Verify / translation mismatch:** final heading `Candidates` does not match Slovenian `Sodelujoči`. Make the headings semantically identical.
- **Verify — group terminology:** group labels use `Student Assembly`, but `PageLayout.astro` looks for `Student Council` when deciding which profiles are candidates. Independently of the rendering bug, settle on the correct English name of the body and use it consistently.

#### Timen Bobnar

- **Error — pronoun mismatch:** `students get the chance to have our voice shape` → **`students have the opportunity to make their voices heard in decisions shaping the study environment`**.
- **Improve:** `I understand well the challenges` → **`I have a strong understanding of the challenges`** or **`I understand the challenges well`**.
- **Improve / parallelism:** `push for more opportunities ... and for developing the knowledge and skills` → **`push for more opportunities ... and for the development of knowledge and skills`**.
- **Verify:** `Student Assembly` in the first sentence and `Student Council` in the final sentence may denote different bodies; confirm the intended candidacy.

#### Aleksej Luka Golobič

- **Improve:** `I do sports` → **`I play sport`**, **`I exercise`**, or name the sport.
- **Improve:** `Interdisciplinary lectures, round tables` → **`Interdisciplinary lectures and round-table discussions`**.

#### Lara Pustinek Miočić

- **Improve:** `beyond the spectator's position` → **`rather than remaining an observer`**.
- **Improve:** `the more active side of participating in student political decision-making` → **`to participate more actively in student political decision-making`**.
- **Improve:** `where I'm now in my second year of studying mathematics` → **`where I am now a second-year mathematics student`**.
- **Improve:** `finishing a parallel degree` is not idiomatic. Use **`simultaneously completing a degree at the Faculty of Arts`** or **`completing a second degree in parallel`**.

#### Maj Požar

- **Improve:** `get better involved in deciding` → **`become more involved in deciding`**.
- **Improve:** `through participating in the elections` → **`by participating in elections`**.

#### Staša Korpič

- **Improve:** `living and study conditions` → **`living and academic conditions`**.
- **Improve:** `poor student jobs` is unclear. If the concern is employment quality, use **`poor working conditions in student jobs`**.
- **Improve:** `study obligations` → **`academic workload`** or **`academic commitments`**.

#### Jakob Sever Klasinc

- **Improve:** `their broader place in society` has no clear referent after `the problems students face`. Prefer **`students' broader position in society`**.

### Useful links — `/en/for-students/useful-links/` (`useful-links.md`)

- **Improve:** `Mathematics studies` / `Physics studies` → **`Mathematics programmes` / `Physics programmes`** or **`Studying mathematics` / `Studying physics`**.
- **Improve:** `exam sheets` → **`past exam papers`**.
- **Improve:** `Application for a student dormitory` → the more natural link label **`Apply for student accommodation`**.
- **Improve:** `Central Slovenia region group` → **`Central Slovenia housing group`**.
- **Improve / geographic accuracy:** `coastal region` is narrower than Slovene `primorska regija`. Use **`the Primorska region`** or **`the Slovenian Littoral`**, depending on audience.
- **Improve:** `Flatmate at FMF` → **`Find a flatmate at FMF`**.
- **Error — placeholder content:** remove `Name1 | €100 | contact@example.com | Lj. centre` before launch.
- **Improve / translation:** `Cadre (employer-sponsored) scholarship` is not idiomatic English. Prefer **`Employer-sponsored scholarship`**; optionally retain the Slovenian term in parentheses for findability.
- **Improve:** `Special achievement for the Zois scholarship` → **`Qualifying special achievements for the Zois Scholarship`**.
- **Improve / terminology:** `Matrika magazine` conflicts with the preceding `Publication in a journal`. Use **`Matrika journal`**.
- **Verify:** `Vega Award` may not be the official English name of `Vegovo priznanje`. Use the organizer's official translation, or retain **`Vegovo priznanje (DMFA)`** with a short explanation.

### Study notes — `/en/for-students/notes/` (`study-notes.md`)

- **Improve:** `exam sheets` → **`past exam papers`** in the summary and SEO description.
- **Improve:** `Materials by programme mostly lead to studentski.net` → **`Most programme-specific links point to studentski.net.`**
- **Improve:** `Open the programme you're interested in` → **`Select the programme you are interested in.`**
- **Verify / terminology:** `Colloquium sheets` is a literal regional usage and may puzzle English readers. Prefer **`Midterm papers`**, **`Test papers`**, or retain the original project title, depending on the actual material.
- **Improve:** `professional programme` → **`professional higher-education programme`** if this is the intended official category.
- **Improve:** `FMF material` → **`FMF study materials`**.
- **Improve:** closing `write to us at` → **`email us at`**.

## Posts — Slovenian

### Film night — `/sl/novice/filmski-vecer-splav-meduze/`

- **Improve:** summary `Mesec mladosti je na ALUO prinesel prvi celovečerec ...` anthropomorphizes the event and implies the film itself was newly brought there. Prefer **`V okviru Meseca mladosti so na ALUO predvajali prvi celovečerec slovenskega avantgardnega režiserja Karpa Godine.`**
- **Error / syntax:** `dve učiteljici ... ki iz majhnega srbskega mesta hrepenita po dogodivščinah` → **`dve učiteljici, ki v majhnem srbskem mestu hrepenita po dogodivščinah`**.
- **Improve:** `Projekciji je sledilo vprašanje, ki ga film zastavlja` → **`Po projekciji je ostalo vprašanje, ki ga film zastavlja še danes`** or simply **`Film še danes zastavlja vprašanje ...`**.

### Open-air Rotor Motor — `/sl/novice/open-air-rotor-motor-2026/`

- **Improve:** mixed-language `Brezplačni open-air večer` → **`Brezplačni večer na prostem`**, unless `open-air` is part of the event's official branding.
- **Improve:** `z Entalpija Afterpartyjem` → **`z afterpartyjem Entalpije`** or the event's exact branded title in quotation marks.

### Student representatives — `/sl/novice/postani-studentski-predstavnik/`

- **Error — subject consistency:** `Študentski svet ... je objavil ... Iščejo 67 študentov` → **`Študentski svet ... išče 67 študentov`**.
- **Verify:** confirm whether candidates stand `v Akademskem zboru`, `za Akademski zbor`, or `za predstavnike v Akademskem zboru`, then use the same construction in title, summary, caption, and body.

### Tea corners — `/sl/novice/cajni-koticki-spet-na-fmf/`

- **Improve / clarity:** `na matematiki` is informal and potentially ambiguous. Prefer the exact location, e.g. **`v stavbi Oddelka za matematiko`** if accurate.
- **Improve / register:** body uses formal/plural (`si lahko sami pripravite`, `potrebujete`, `najdete`, `sporočite`) while several nearby pages/posts use informal singular. Apply the site-wide decision.

### Student Music Evening — `/sl/novice/vecer-studentske-glasbe-2026/`

- **Error / collocation:** title `na nov datum` → **`v novem terminu`** or **`je prestavljen`**.
- **Verify — temporal inconsistency:** title and summary announce a rescheduled future event, but the body is written after the event (`so se zvrstili`, `je potekal`, `vstop je bil`). `updatedAt` is 2 June, before the 4 June event. Either keep announcement tense throughout or set a post-event update date and rewrite title/summary as a report.
- **Improve:** `opozicijske liste ŠOU` → **`opozicijske liste v ŠOU`** (unless a different official construction is intended).

### Exam-season update — `/sl/novice/srecno-na-izpitih-2026/`

- **Improve:** `delovala z nekoliko manjšimi kapacitetami` is a calque. Use **`delovala v nekoliko zmanjšanem obsegu`**.
- **Improve:** `pripravo prihodnjih aktivnosti` → **`pripravo prihodnjih dejavnosti`** or **`pripravo novih projektov`**, matching the summary.

### Summer Ikozatlon — `/sl/novice/poletni-ikozatlon-2026/`

- **Verify — timing metadata:** the article is `publishedAt: 2026-06-20`, before the 23 June start, but the summary/body are retrospective (`se je zvrstilo`, `je združil`, `je potekalo`) and `updatedAt` is null. Use future tense for an announcement or add a genuine post-event update date.
- **Error / consistency:** summary says all twenty disciplines are free (`dvajset brezplačnih ... disciplin`), while the body says only most were free (`Večina preizkušenj je bila brezplačna`). Correct one of them.
- **Improve:** `Minecraft parkourja` → **`parkourja v Minecraftu`**.
- **Improve:** `od kart, kvizov in sudokuja` → **`od iger s kartami, kvizov in sudokujev`**.
- **Improve / locative clarity:** `finale ... na minigolf na Bled` → **`finale ... na minigolf na Bledu`**.

### OM FMF: a day in industry — `/sl/novice/om-fmf-dan-v-podjetju/`

- **Improve / meaning:** `enodnevno prostovoljno izkušnjo` may be read as unpaid volunteer work. If this is job shadowing, say **`prostovoljno enodnevno spremljanje dela v podjetju`** or simply **`enodnevno spoznavanje dela v podjetju`**.
- **Improve:** `navezati prvi stik` → **`vzpostaviti prvi stik`**.
- **Improve:** `Kandidate izbirajo do zapolnitve mest` → **`Prijave obravnavajo sproti do zapolnitve mest`**, if that accurately describes the process.
- **Improve / register:** this post uses informal singular (`te zanima`, `piši`) while related informational pages often use formal/plural.

## Posts — English

### Film night — `/en/news/film-night-the-medusa-raft/`

- **Improve:** summary `The Month of Youth brought ... film to ALUO` is slightly promotional and indirect. Prefer **`ALUO screened Slovenian avant-garde director Karpo Godina's first feature as part of the Month of Youth.`**
- **Verify / translation fidelity:** English `what did the avant-garde mean in the Balkans?` is not the same as Slovenian `kakšen smisel je imela avantgarda na Balkanu?` (“what purpose did it serve?”). Choose the intended nuance and align both languages.

### Open-air Rotor Motor — `/en/news/open-air-rotor-motor-2026/`

- No material English error found.

### Student representatives — `/en/news/become-a-student-representative/`

- **Improve:** `representatives in the Academic Assembly` → **`representatives to the Academic Assembly`** or **`student representatives on the Academic Assembly`**, according to the body's official English terminology.
- **Improve:** `standing as a candidate` → **`standing for election`**.

### Student Music Evening — `/en/news/student-music-evening-2026/`

- **Improve:** summary `moved to 4 June at Kader` → **`was rescheduled for 4 June at Kader`**.
- **Verify — temporal inconsistency:** title/summary announce a new future date, while the body reports the concert in past tense and `updatedAt` predates the event. Choose announcement or report framing and align metadata.

### Tea corners — `/en/news/tea-corners-back-at-fmf/`

- No material English error found.

### Exam-season update — `/en/news/good-luck-with-exams-2026/`

- **Improve:** `Once the final deadlines are behind us` does not match the exam-focused title. Prefer **`Once the final exams and other obligations are behind us`**.
- **Improve:** summary `is taking a lighter summer schedule` → **`will operate on a reduced summer schedule`**.

### Summer Icozathlon — `/en/news/summer-icozathlon-2026/`

- **Verify — proper name:** the Slovenian event is `Ikozatlon`; do not translate the brand to `Icozathlon` unless the organiser uses that English form officially.
- **Verify — timing metadata:** publication predates the event, but summary/body use retrospective tense and there is no `updatedAt`. Align tense and metadata.
- **Error / consistency:** English summary says `mostly free`, while the Slovenian summary says all twenty were free; the Slovenian body says most. Establish the fact and align both versions.
- **Improve:** `twenty competitions ... Most events` switches terms. Use one term (`events`, `disciplines`, or `competitions`) consistently and match the event's format.

### OM FMF job shadowing — `/en/news/om-fmf-job-shadowing/`

- **Error / meaning:** `one-day volunteer placement` and `one volunteer day inside a company` imply volunteer labour. If this is job shadowing, use **`a voluntary one-day job-shadowing placement`** and **`spend a day shadowing staff at a company`**.
- **Improve:** `test your interests` → **`explore which field interests you`**.
- **Improve:** `make an initial connection with a potential employer` → **`make first contact with a potential employer`**.
- **Improve:** `Students will be selected until all places are filled` → **`Applications will be considered on a rolling basis until all places are filled`**, if factually accurate.

## Pages reviewed with no additional page-specific copy changes

- Slovenian upcoming-events page, beyond the global register decision.
- Slovenian and English post-archive pages.
- English open-air Rotor Motor post.
- English tea-corners post.

## Suggested editing order

- **First:** homepage; `Študencka` typo and route; member biographies; stale programme/year references; empty public pages.
- **Second:** terminology (`lista`/`stranka`/`društvo`, institutional bodies), Slovenian register, finance copy, and visible UI strings.
- **Third:** English idiom, bilingual alignment, post tense/metadata consistency, useful-links placeholders, and polish.