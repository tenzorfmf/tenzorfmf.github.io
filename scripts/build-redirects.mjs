#!/usr/bin/env node
/**
 * Generate legacy redirect stubs into dist/.
 *
 * Astro's `redirects` config mangles paths ending in `.html`, so instead we
 * emit, for every `aliases` entry in content frontmatter, a static stub with a
 * meta-refresh, <link rel="canonical">, and <meta name="robots" content="noindex">.
 *
 * Runs AFTER pagefind so the stubs never enter the search index.
 * Postbuild order: astro build -> pagefind -> build-redirects.
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { walk, parseFrontmatter, isSectionPage, pagePath as pagePathOf, postPath } from './content-fs.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');
const SITE = 'https://tenzor-fmf.org';

if (!existsSync(DIST)) {
  console.error('build-redirects: dist/ not found — run `astro build` first');
  process.exit(1);
}

function readDoc(file) {
  try {
    return { data: parseFrontmatter(readFileSync(file, 'utf8')).data };
  } catch {
    return null;
  }
}

const pages = walk(join(ROOT, 'src/content/pages')).map(readDoc).filter(Boolean);
const posts = walk(join(ROOT, 'src/content/posts')).map(readDoc).filter(Boolean);
const sections = pages.filter((p) => isSectionPage(p.data));
const pagePath = (d) => pagePathOf(d, sections);

const stub = (target) => `<!doctype html>
<html lang="sl">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${target}">
<link rel="canonical" href="${SITE}${target}">
<title>Preusmerjanje …</title>
</head>
<body>
<p>Ta stran se je preselila. Preusmerjanje na <a href="${target}">${target}</a> …</p>
</body>
</html>
`;

let written = 0;
for (const d of [...pages, ...posts]) {
  const aliases = Array.isArray(d.data.aliases) ? d.data.aliases : [];
  if (aliases.length === 0) continue;
  const target = d.data.slug === '/' && d.data.translationKey === 'home' ? `/${d.data.lang}/` : (d.data.kind ? postPath(d) : pagePath(d));
  for (const alias of aliases) {
    if (alias === target) continue; // don't shadow the real page with a stub
    // "/koristne_povezave.html" -> dist/koristne_povezave.html
    // "/sl/program/program/"    -> dist/sl/program/program/index.html
    const rel = alias.replace(/^\//, '');
    const outFile = join(DIST, rel.endsWith('/') || rel === '' ? `${rel}index.html` : rel);
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, stub(target));
    written++;
    console.log(`  redirect  ${alias}  ->  ${target}`);
  }
}
console.log(`build-redirects: wrote ${written} stub(s)`);
