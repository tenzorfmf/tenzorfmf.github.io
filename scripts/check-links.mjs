#!/usr/bin/env node
/**
 * Internal link checker. Walks dist/, extracts every href/src that points
 * inside the site, and verifies the target file exists. External links
 * (http/https/mailto/tel), in-page anchors and the pagefind runtime are skipped.
 *
 * Exit non-zero on any dangling internal link.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist', import.meta.url));
if (!existsSync(DIST)) {
  console.error('check-links: dist/ not found — run `npm run build` first');
  process.exit(1);
}

const htmlFiles = readdirSync(DIST, { recursive: true })
  .map((name) => join(DIST, name))
  .filter((p) => p.endsWith('.html'));
const ATTR_RE = /(?:href|src)\s*=\s*["']([^"']+)["']/gi;

const problems = [];

function resolveTarget(link) {
  const clean = link.split('#')[0].split('?')[0];
  if (clean === '') return null; // pure anchor
  let rel = clean.replace(/^\//, '');
  if (rel === '') rel = 'index.html';
  const candidates = [
    join(DIST, rel),
    join(DIST, rel, 'index.html'),
    join(DIST, rel.endsWith('/') ? rel + 'index.html' : rel),
  ];
  return candidates.some((c) => existsSync(c));
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  let m;
  while ((m = ATTR_RE.exec(html))) {
    const link = m[1].trim();
    if (
      /^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(link) ||
      link.startsWith('//') ||
      link.startsWith('/pagefind/')
    ) {
      continue;
    }
    if (!link.startsWith('/')) continue; // only check site-absolute links
    if (!resolveTarget(link)) {
      problems.push(`${file.replace(DIST, 'dist')}  ->  ${link}`);
    }
  }
}

if (problems.length) {
  console.error(`check-links FAILED — ${problems.length} dangling internal link(s):`);
  for (const p of problems) console.error('  ✗ ' + p);
  process.exit(1);
}
console.log(`check-links OK — ${htmlFiles.length} html files scanned, no dangling internal links`);
