/**
 * Shared filesystem/routing helpers for the content build scripts
 * (validate-content.mjs, build-redirects.mjs). Keep in sync with the live
 * routing logic in src/utils/routes.ts and src/utils/content.ts.
 */
import { readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

/** Every .md/.mdx file under `dir`, recursively. */
export function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true })
    .map((name) => join(dir, name))
    .filter((p) => statSync(p).isFile() && (p.endsWith('.md') || p.endsWith('.mdx')));
}

/** Parse a content file's frontmatter block. Throws if missing/malformed. */
export function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error('missing or malformed frontmatter block');
  return { data: parse(m[1]) ?? {}, body: m[2] ?? '' };
}

export const routeSegments = {
  sl: { news: 'novice', search: 'iskanje' },
  en: { news: 'news', search: 'search' },
};

export function isSectionPage(data) {
  const { nav, slug } = data;
  // Raw frontmatter is parsed without Zod defaults, so a missing nav.section
  // must be treated as its schema default ('main'), same as nav.parent's `?? null`.
  return slug !== '/' && nav?.include === true && (nav?.section ?? 'main') === 'main' && nav?.parent == null;
}

/** Public path for a page. `onMissingParent` is called if `nav.parent` names no section. */
export function pagePath(d, sections, onMissingParent) {
  const { lang, slug } = d.data;
  if (slug === '/') return `/${lang}/`;
  const parentKey = d.data.nav?.parent;
  if (parentKey) {
    const parent = sections.find((s) => s.data.lang === lang && s.data.translationKey === parentKey);
    if (parent) return `/${lang}/${parent.data.slug}/${slug}/`;
    onMissingParent?.(parentKey);
  }
  return `/${lang}/${slug}/`;
}

export function postPath(d) {
  return `/${d.data.lang}/${routeSegments[d.data.lang].news}/${d.data.slug}/`;
}
