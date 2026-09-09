import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/config';
import { newsSegment, searchSegment } from './i18n';

export type PageEntry = CollectionEntry<'pages'>;
export type PostEntry = CollectionEntry<'posts'>;

/**
 * Public path for a page. `sections` is the full list of section pages
 * (top-level main-navigation pages) for the same locale, used to resolve nav.parent.
 * All paths carry a trailing slash to match `trailingSlash: 'always'`.
 */
export function pagePath(entry: PageEntry, sections: PageEntry[]): string {
  const { lang, slug, nav } = entry.data;

  if (slug === '/') return `/${lang}/`;

  if (nav.parent) {
    const parent = sections.find(
      (s) => s.data.translationKey === nav.parent && s.data.lang === lang,
    );
    if (parent) return `/${lang}/${parent.data.slug}/${slug}/`;
  }
  // standalone page with no parent section
  return `/${lang}/${slug}/`;
}

/** Public path for a post. */
export function postPath(entry: PostEntry): string {
  const { lang, slug } = entry.data;
  return `/${lang}/${newsSegment(lang)}/${slug}/`;
}

/** Public path for the search page of a locale. */
export function searchPath(locale: Locale): string {
  return `/${locale}/${searchSegment(locale)}/`;
}

/** Public path for the home page of a locale. */
export function homePath(locale: Locale): string {
  return `/${locale}/`;
}

/** The `[...slug]` param for a full public path: strips the `/{lang}/` prefix and trailing slash. */
export function stripLang(path: string, locale: Locale): string {
  return path.replace(new RegExp(`^/${locale}/`), '').replace(/\/$/, '');
}
