# CLAUDE.md

Repository guide for Claude Code. Read this before exploring. It records the current runtime
contracts and the places that must stay synchronized; `README.md` is the Slovenian guide for
content maintainers.

## Project in one minute

- Static Astro 5 site for the Tenzor student list at UL FMF.
- Bilingual: Slovenian (`sl`, default) and English (`en`).
- Content is Markdown frontmatter plus YAML committed to Git. There is no CMS, database,
  authentication, server runtime, API layer, or client framework.
- Production output is `dist/`, hosted on GitHub Pages at `https://tenzor-fmf.org`.
- Node 20+ and npm are the supported toolchain. TypeScript is strict; the project uses ESM.
- Astro components render on the server at build time. The menu and search use small inline
  vanilla TypeScript scripts; there are no hydrated islands.
- Do not edit generated directories: `dist/`, `.astro/`, `node_modules/`, or
  `public/pagefind/`.

## Source-of-truth order

When documentation and behavior disagree, trust sources in this order:

1. `src/content.config.ts` for per-entry field types and required values.
2. `scripts/validate-content.mjs` for cross-file/content-asset constraints.
3. `src/utils/routes.ts`, `src/utils/content.ts`, and `src/pages/` for live routing/query logic.
4. `src/layouts/` and `src/components/` for what is actually rendered.
5. `README.md` and `docs/examples/` for authoring guidance.
6. `docs/migration/`, `docs/pages-scrape/`, `docs/tenzorfmf.github.io-main/`, and
   `docs/claude-design-blueprint-01/` are historical/reference inputs, not live application
   sources. Do not scan them unless the task concerns migration history, legacy copy, or the
   original visual blueprint.

Known documentation drift: the page template does not list the current `events` and `news`
page types. The schema and rendering code are authoritative.

## Commands and definition of done

```bash
npm ci                         # reproducible clean install (npm install is fine while updating deps)
npm run dev                    # Astro dev server: http://localhost:4321
npm run check                  # astro check: TypeScript + Astro/content schema
npm run validate               # raw Markdown/YAML cross-file validation
npm run build                  # validate -> Astro -> Pagefind -> legacy redirect stubs
npm run build:astro            # Astro output only; no Pagefind or redirects
npm run preview                # serve dist/ locally
node scripts/check-links.mjs   # requires dist/ from npm run build
```

There is no unit/e2e test runner. For any code, routing, schema, or content change, the full
local verification is:

```bash
npm run check
npm run build
node scripts/check-links.mjs
```

`npm run build` already invokes `npm run validate` internally. Use `npm run validate` alone for
a fast content-only iteration. Pagefind is generated only by the full build, so search normally
fails under `npm run dev`; test search with `npm run build && npm run preview`.

GitHub Actions mirrors this on all pushes/PRs in `.github/workflows/validate.yml`. A push to
`main` also runs `.github/workflows/deploy-pages.yml` and publishes `dist/`.

## High-value repository map

```text
src/content.config.ts                 Astro collection schemas (Zod)
src/content/pages/{sl,en}/*.md        permanent pages and section/index pages
src/content/posts/{sl,en}/*.md        dated posts; all post kinds share one route family
src/pages/[lang]/index.astro          locale home composition
src/pages/[lang]/[...slug].astro      all non-home pages, posts, and search routes
src/layouts/BaseLayout.astro          head/header/menu/footer + Pagefind metadata shell
src/layouts/PageLayout.astro          rendering switch for every pageType
src/layouts/PostLayout.astro          rendering for every post kind
src/utils/content.ts                  collection queries, nav, translations, breadcrumbs
src/utils/routes.ts                   canonical page/post/search path construction
src/utils/i18n.ts                     UI/org/site-data accessors
src/utils/media.ts                    compile-time image registry
src/i18n/config.ts                    locales and localized route segments
src/i18n/{sl,en}.ts                   generic interface strings
src/data/site.ts                      shared site/brand configuration (typed, not YAML)
src/data/site.{sl,en}.ts              localized organization/contact copy
src/styles/tokens.css                 design tokens
src/styles/global.css                 reset, layout primitives, Markdown `.prose`
src/components/                       scoped Astro UI components
scripts/validate-content.mjs          cross-file validation
scripts/build-redirects.mjs           postbuild HTML redirect-stub generator
scripts/check-links.mjs               built absolute internal-link checker
public/media/documents/               public attachments, mainly PDFs
src/assets/media/images/              optimized post hero images
docs/examples/                        copyable content skeletons (verify against schema)
```

Use `@/*` for imports from `src/*`. Site/organisation config lives in typed `src/data/site*.ts`
modules (not YAML) so it goes through the same TypeScript checking as everything else.

## Routing model

All public paths have trailing slashes (`astro.config.mjs`: `trailingSlash: 'always'`):

| Entry | Path |
|---|---|
| root | `/` meta-refreshes to default locale `/sl/` |
| home page | `/<lang>/` |
| section page | `/<lang>/<section.slug>/` |
| child page with `nav.parent` | `/<lang>/<parent-section.slug>/<page.slug>/` |
| standalone page | `/<lang>/<page.slug>/` |
| any post kind | `/<lang>/<news-segment>/<post.slug>/` |
| search | `/<lang>/<search-segment>/` |

`sl` uses `novice`/`iskanje`; `en` uses `news`/`search`. Page routes come from
`pagePath()`, post routes from `postPath()`. Never assemble localized URLs in components.

Important routing contracts:

- The locale home must have `translationKey: home` and `slug: /`; it is rendered by the locale
  index and skipped by the catch-all.
- `nav.parent` is a section's `translationKey`, not its slug. It affects the URL even when
  `nav.include` is false; `nav.include` controls discovery/menu display, not route existence.
- Every post kind (`news`, `statement`, `event`, `document`, `archive`) lives below the localized
  news segment.
- Translation pairing uses `translationKey`, not filenames or slugs. Matching filenames across
  locale directories are a useful convention, not a runtime requirement. Slugs may differ.
- Missing translations intentionally produce a disabled language control and no `hreflang`, not
  a fallback or broken link.
- `aliases` produce static meta-refresh/noindex HTML files after Pagefind indexing. They are not
  HTTP 301/302 redirects and do not enter search.

## Content collections

Both collections use the file path as Astro's entry id, so frontmatter `slug` is ordinary data.
Only `.md` files are loaded; MDX is not configured.

### Pages

Location: `src/content/pages/<sl|en>/*.md`.

Core fields: `translationKey`, `lang`, `title`, `slug`, `summary`, `pageType`, `draft`,
`updatedAt`, `nav`, `search`, `seo`, `aliases`. See `src/content.config.ts` for exact defaults
and nested shapes.

Current page types and their live rendering:

| `pageType` | Runtime behavior |
|---|---|
| `standard` | Markdown prose, or localized empty state |
| `manifesto` | Markdown prose |
| `programme` | Markdown plus optional attachments; empty state if both absent |
| `links` | Markdown body wrapped by `LinkTree`; should use h2-h4 and nested lists |
| `finance` | embed and/or attachments, then Markdown; schema requires embed or attachment |
| `members` | grouped `people[]`, then Markdown; schema requires at least one person |
| `contact` | localized data-file email/Instagram rows, then Markdown |
| `archive` | Markdown plus campaign post groups |
| `events` | Markdown plus `kind:event` listing selected by required `eventsScope` |
| `news` | Markdown plus every non-archive post, newest first |
| `section` | Markdown, optional embed/attachments, then child-page index |

Page-type traps:

- Although `links[]` exists in the schema and satisfies validation, `PageLayout.astro` currently
  renders only the Markdown body for `pageType: links`; author live links in Markdown.
- `summary` always feeds fallback SEO, but is visibly printed only for `members`, `links`,
  `finance`, `archive`, and `contact`. Other page types use their Markdown body for visible intro.
- A section's children are every same-locale non-section page whose `nav.parent` matches the
  section key, sorted by `nav.order`. The current five included sections are Program, Finance,
  Events, Students, and About; the number five is content-derived, not enforced in code.
- Finance currently lives directly on `section-finance`; there is no finance child page.
- The home page has extra composition in `[lang]/index.astro`: hard-coded descriptors for known
  section keys, newest featured post, five latest non-archive/indexable posts, and quick links
  selected by exact translation keys.
- Members get emphasized candidate styling only when `group` exactly equals `Študentski zbor`
  or `Student Council`.

### Posts

Location: `src/content/posts/<sl|en>/<YYYY-MM-DD>--<stable-key>.md`. The filename date is a
convention; `publishedAt` is authoritative.

Core fields: `translationKey`, `lang`, `title`, `slug`, `summary`, `kind`, `publishedAt`,
`updatedAt`, `category`, `tags`, `authors`, `featured`, `draft`, `hero`, `attachments`,
`sources`, `event`, `search`, `aliases`.

Post contracts and traps:

- `kind: event` requires `event.start` and `event.timezone`. Upcoming/past classification uses
  only `start` compared with build time; a site rebuild is required when an event crosses that
  boundary. Display formatting is currently fixed to `Europe/Ljubljana` even though timezone is
  stored per event.
- `kind: document` requires at least one attachment or authoritative source URL.
- `featured: true` makes a post eligible for the home feature; if several exist, the newest
  `publishedAt` wins. Uniqueness is not validated.
- `category` is free text and appears in metadata. Post back-navigation recognizes only exact
  `dogodki -> section-events`, `finance -> section-finance`, and `program -> section-program`;
  every other value falls back to Events. Change that map in `[...slug].astro` if categories
  become semantic navigation.
- The campaign archive currently selects only `kind: archive` posts with exact category
  `dogodki`, then groups exact tags `letak` and `plakat`. This logic is not locale-neutral.
- `authors` are accepted but not currently rendered. Do not assume a schema field appears in UI;
  confirm in `PostLayout.astro`.

## Draft, search, and SEO behavior

- `allPages()`/`allPosts()` include drafts in Astro dev mode and remove them in production.
- The raw validator still validates drafts and requires `draft: true` entries to set both
  `nav.include: false` and `search.include: false`. Drafts can therefore be previewed locally but
  cannot collide with routes/aliases or refer to missing assets.
- Pagefind indexes the `<main>` emitted by `BaseLayout`. Pages/posts emit hidden filters and title
  metadata there; search itself and 404 opt out.
- Filters are build-derived. Pages expose language, collection, type, and optional `updatedAt`
  year. Posts expose language, collection, type, publication year, category, and tags.
- Search state uses `?q=`, `?type=`, and `?year=`, loads `/pagefind/pagefind.js` at runtime,
  debounces input, and shows at most 30 results.
- A page's robots behavior uses `seo.noindex`; a post is noindexed when `search.include: false`.
  Search pages, redirect stubs, and 404 are always noindex.
- Canonical and social metadata come from `BaseHead.astro`; Open Graph currently has no image.

## Images, files, and embeds

- Put downloadable/static attachments in `public/media/documents/` and reference them with a
  site-absolute path such as `/media/documents/file.pdf`.
- Put post hero art in `src/assets/media/images/{flyers,posters,news}/` and store `hero.src`
  relative to `images/`, e.g. `news/example.webp`. `src/utils/media.ts` registers only
  png/jpg/jpeg/webp/avif and `PosterFigure` resolves through that registry.
- Do not use a `public/...` path for `hero.src`: the raw validator currently accepts it, but the
  rendering path does not and the Astro build will fail. SVG is likewise not in the hero registry.
- Every hero and Markdown image needs meaningful non-empty alt text. The cross-file validator
  checks Markdown image alt text and referenced hero/attachment file existence.
- Images rendered through `ContentImage.astro` use Astro responsive optimization. The brand mark
  is a separate raw SVG imported by `SiteHeader.astro`.
- The only embed provider is `google-sheets`; `SheetEmbed.astro` renders a lazy iframe plus a
  human-viewable fallback link made by stripping the URL query.

## Navigation, UI, and styling conventions

- `src/utils/content.ts` is the query boundary. Reuse its locale-aware functions instead of
  issuing ad hoc `getCollection()` calls in components/pages.
- `navTree()` derives the desktop and overlay top-level navigation from included section pages.
  The overlay utility links are manually composed in `BaseLayout.astro`; the exported
  `utilityPages()` helper is not currently used there.
- `BaseLayout.astro` owns the global frame, skip link, header, focus-trapped mobile menu, footer,
  and Pagefind annotations. Preserve keyboard focus restoration, Escape/Tab behavior,
  `aria-expanded`, disabled translation state, and reduced-motion handling when changing UI.
- Design direction is “Editorial / Journal”: warm paper, dark ink, burgundy accent, Source Serif
  4 + IBM Plex Sans. Shared values belong in `src/styles/tokens.css`; Markdown and site-wide
  primitives belong in `global.css`; component-specific rules stay in scoped `<style>` blocks.
- There is one intentional desktop breakpoint at 900px. Content measure is 680px; wide search/
  index measure is 860px. Preserve readable prose width and mobile-first behavior.
- Prefer semantic HTML and existing components (`DocumentRow`, `SectionIndex`, `AttachmentList`,
  `EmptyState`, etc.) before creating near-duplicates.
- Keep generic interface text in `src/i18n/{sl,en}.ts` with matching keys/types. Keep localized
  organization copy in `src/data/site.{lang}.yml`. Do not put translatable prose in CSS or a
  shared component unless both languages are handled.

## Validation boundaries and duplicated settings

There are two deliberate validation layers:

1. `src/content.config.ts`: individual-file shape, enums, defaults, dates/URLs, safe ASCII slugs,
   and page/post cross-field requirements.
2. `scripts/validate-content.mjs`: directory language, duplicate keys, translation discriminant
   agreement, route/alias collisions, valid parent sections, draft rules, asset existence,
   Markdown image alt text, and non-empty link pages.

Keep them aligned, but put rules needing multiple entries/files only in the script. Also keep the
following duplicated runtime constants synchronized when changing them:

| Concern | Files to update together |
|---|---|
| locales | `src/i18n/config.ts`, `src/content.config.ts`, `scripts/validate-content.mjs`, plus new UI/data/content locale files |
| localized news/search route segments | `src/i18n/config.ts`, `scripts/validate-content.mjs`; news segment also in `scripts/build-redirects.mjs` |
| production origin/domain | `astro.config.mjs`, `scripts/build-redirects.mjs`, `public/CNAME` |
| organization/contact copy | `src/data/site.{lang}.ts`; the shared Instagram URL also lives in `src/data/site.ts` |
| post category back targets | category data and map in `src/pages/[lang]/[...slug].astro` |
| special home/section keys | content `translationKey`s and lookups in `src/pages/[lang]/index.astro` / `BaseLayout.astro` |

## Change recipes

### Add or translate content

1. Start from `docs/examples/page-template.md` or `post-template.md`, then verify fields against
   `src/content.config.ts`.
2. Use a stable ASCII kebab-case `translationKey`; reuse it for the translation. Use localized
   `slug`, title, summary, nav label, SEO, body, and image alt text.
3. Set the parent section by translation key. Keep draft entries out of nav and search.
4. Add images/attachments in the directories above; never point at files under `docs/`.
5. Run `npm run check`, `npm run build`, and the link checker.

### Add/change a page type or frontmatter field

Audit the whole pipeline: schema -> raw validator -> collection/query helpers -> route assembly ->
catch-all data preparation -> `PageLayout`/`PostLayout` rendering -> Pagefind metadata -> examples
and `README.md`. Do not loosen validation merely to make malformed content build.

### Change routes, locales, domain, or organization identity

Use the synchronization table above, rebuild, inspect generated canonical/alternate links and
redirect stubs, then run the internal-link checker. Configuration is not yet fully centralized;
do not assume editing only `src/data/site.ts` is sufficient.

### Change presentation

Begin with the layout/component responsible for the content type. Reuse tokens and existing
primitives, test both locales and mobile/desktop, and preserve Pagefind data attributes and
accessibility behavior. Consult the `.dc.html` blueprint only when the task explicitly requires
comparison to the original design.

## Deployment boundaries

The repository owns building and publishing the static artifact. GitHub Pages enablement, DNS,
remote setup, pushes, and production-domain changes are maintainer/external actions. Do not perform
them unless explicitly requested. Never edit `dist/` as a source change; generated output will be
replaced on the next build.
