#!/usr/bin/env node
/**
 * Cross-file content validation. Zod (src/content.config.ts) validates each
 * file in isolation; this catches the things it cannot see across files.
 *
 * Runs before `astro build`. A non-zero exit fails the build — that is the
 * entire editing guardrail, since there is no CMS.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { walk, parseFrontmatter, isSectionPage, pagePath as pagePathOf, postPath as postPathOf, routeSegments } from './content-fs.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const LOCALES = ['sl', 'en'];

const errors = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);

/* ---------- gather ---------- */

function readDoc(file) {
  const raw = readFileSync(file, 'utf8');
  const rel = relative(ROOT, file);
  try {
    const { data, body } = parseFrontmatter(raw);
    return { file, rel, data, body };
  } catch (e) {
    err(rel, e.message);
    return null;
  }
}

const pageFiles = walk(join(ROOT, 'src/content/pages'));
const postFiles = walk(join(ROOT, 'src/content/posts'));
const pages = pageFiles.map(readDoc).filter(Boolean);
const posts = postFiles.map(readDoc).filter(Boolean);

/* ---------- per-file cross checks ---------- */

function dirLocale(rel) {
  const m = rel.match(/src\/content\/(?:pages|posts)\/([a-z]{2})\//);
  return m ? m[1] : null;
}

for (const doc of [...pages, ...posts]) {
  const { rel, data } = doc;
  const loc = dirLocale(rel);

  if (loc && data.lang !== loc) {
    err(rel, `lang "${data.lang}" disagrees with directory "/${loc}/"`);
  }
  if (loc && !LOCALES.includes(loc)) {
    err(rel, `unknown locale directory "${loc}"`);
  }

  if (data.draft === true) {
    if (data.nav?.include) err(rel, 'draft:true must not appear in nav (nav.include:false)');
    if (data.search?.include) err(rel, 'draft:true must not be indexed (search.include:false)');
  }

  // attachment / hero file existence
  const atts = Array.isArray(data.attachments) ? data.attachments : [];
  for (const a of atts) {
    if (!a?.path) continue;
    const target = join(ROOT, 'public', a.path.replace(/^\//, ''));
    if (!existsSync(target)) err(rel, `attachment path not found: ${a.path}`);
  }
  if (data.hero?.src) {
    const src = data.hero.src;
    const asAsset = join(ROOT, 'src/assets/media/images', src);
    const asPublic = join(ROOT, 'public', src.replace(/^\//, ''));
    if (!existsSync(asAsset) && !existsSync(asPublic)) {
      err(rel, `hero.src not found: ${src}`);
    }
    if (!data.hero.alt || String(data.hero.alt).trim() === '') {
      err(rel, 'hero.alt must be non-empty');
    }
  }
}

/* ---------- markdown body image alt ---------- */
const IMG_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;
for (const doc of [...pages, ...posts]) {
  let m;
  while ((m = IMG_RE.exec(doc.body))) {
    if (m[1].trim() === '') err(doc.rel, `Markdown image with empty alt text: ${m[2]}`);
  }
}

/* ---------- duplicate translationKey within locale+collection ---------- */
function checkDupKeys(docs, label) {
  const seen = new Map();
  for (const d of docs) {
    const k = `${d.data.lang}::${d.data.translationKey}`;
    if (seen.has(k)) err(d.rel, `duplicate translationKey "${d.data.translationKey}" in ${label}/${d.data.lang} (also ${seen.get(k)})`);
    else seen.set(k, d.rel);
  }
}
checkDupKeys(pages, 'pages');
checkDupKeys(posts, 'posts');

/* ---------- translation pairs must share post kind ---------- */
{
  const byKey = new Map();
  for (const d of posts) {
    const arr = byKey.get(d.data.translationKey) ?? [];
    arr.push(d);
    byKey.set(d.data.translationKey, arr);
  }
  for (const [key, arr] of byKey) {
    const kinds = new Set(arr.map((d) => d.data.kind));
    if (kinds.size > 1) {
      err(arr.map((d) => d.rel).join(' & '), `translation pair "${key}" has mismatched kind: ${[...kinds].join(', ')}`);
    }
  }
}

/* ---------- route + alias collisions ---------- */
const sectionsByLocale = new Map();
for (const loc of LOCALES) {
  sectionsByLocale.set(
    loc,
    pages.filter((p) => p.data.lang === loc && isSectionPage(p.data)),
  );
}

const pagePath = (d) =>
  pagePathOf(d, sectionsByLocale.get(d.data.lang) ?? [], (parentKey) =>
    err(d.rel, `nav.parent "${parentKey}" has no matching section page in locale ${d.data.lang}`),
  );
const postPath = postPathOf;

const routes = new Map();
const claim = (path, rel) => {
  if (routes.has(path)) err(rel, `route collision at ${path} (also ${routes.get(path)})`);
  else routes.set(path, rel);
};
for (const loc of LOCALES) {
  if (pages.some((p) => p.data.lang === loc && p.data.translationKey === 'home')) {
    claim(`/${loc}/`, `(home ${loc})`);
    claim(`/${loc}/${routeSegments[loc].search}/`, `(search ${loc})`);
  }
}
for (const d of pages) {
  if (d.data.slug === '/') continue;
  claim(pagePath(d), d.rel);
}
for (const d of posts) claim(postPath(d), d.rel);

/* aliases: unique, well-formed, and each will be emitted as a redirect stub */
const aliasSeen = new Map();
for (const d of [...pages, ...posts]) {
  const aliases = Array.isArray(d.data.aliases) ? d.data.aliases : [];
  for (const a of aliases) {
    if (typeof a !== 'string' || !a.startsWith('/')) {
      err(d.rel, `alias must be a site-absolute path: ${JSON.stringify(a)}`);
      continue;
    }
    if (aliasSeen.has(a)) err(d.rel, `alias collision "${a}" (also ${aliasSeen.get(a)})`);
    else aliasSeen.set(a, d.rel);
    if (routes.has(a)) err(d.rel, `alias "${a}" collides with a real route`);
  }
}

/* ---------- report ---------- */
if (errors.length) {
  console.error(`\ncontent validation FAILED — ${errors.length} error(s):`);
  for (const e of errors) console.error('  ✗ ' + e);
  process.exit(1);
}
console.log(
  `content validation OK — ${pages.length} pages, ${posts.length} posts, ${routes.size} routes, ${aliasSeen.size} aliases`,
);
