import { getCollection } from 'astro:content';
import type { Locale } from '../i18n/config';
import { locales } from '../i18n/config';
import { type PageEntry, type PostEntry, pagePath, postPath } from './routes';

const isDev = import.meta.env.DEV;

/** Drafts are excluded from every build artefact (routes, nav, search). */
function published<T extends { data: { draft: boolean } }>(entries: T[]): T[] {
  return isDev ? entries : entries.filter((e) => !e.data.draft);
}

export async function allPages(): Promise<PageEntry[]> {
  return published(await getCollection('pages'));
}

export async function allPosts(): Promise<PostEntry[]> {
  return published(await getCollection('posts'));
}

export async function pagesForLocale(locale: Locale): Promise<PageEntry[]> {
  return (await allPages()).filter((p) => p.data.lang === locale);
}

export async function postsForLocale(locale: Locale): Promise<PostEntry[]> {
  return (await allPosts()).filter((p) => p.data.lang === locale);
}

/** A top-level main-navigation page is a section and can own child pages. */
export function isSectionPage(entry: PageEntry): boolean {
  const { nav, slug } = entry.data;
  return slug !== '/' && nav.include && nav.section === 'main' && nav.parent === null;
}

export async function sectionsForLocale(locale: Locale): Promise<PageEntry[]> {
  return (await pagesForLocale(locale))
    .filter(isSectionPage)
    .sort((a, b) => a.data.nav.order - b.data.nav.order);
}

export interface NavNode {
  entry: PageEntry;
  href: string;
  label: string;
  children: { entry: PageEntry; href: string; label: string }[];
}

/** The 5-domain menu tree: sections in nav order, each with its child pages. */
export async function navTree(locale: Locale): Promise<NavNode[]> {
  const pages = await pagesForLocale(locale);
  const sections = await sectionsForLocale(locale);

  return sections.map((section) => {
    const children = pages
      .filter(
        (p) =>
          p.data.nav.include &&
          p.data.nav.parent === section.data.translationKey,
      )
      .sort((a, b) => a.data.nav.order - b.data.nav.order)
      .map((entry) => ({
        entry,
        href: pagePath(entry, sections),
        label: entry.data.nav.label,
      }));

    return {
      entry: section,
      href: pagePath(section, sections),
      label: section.data.nav.label,
      children,
    };
  });
}

/** Child pages of a section, by the section's translationKey. */
export async function sectionChildren(
  locale: Locale,
  sectionKey: string,
): Promise<PageEntry[]> {
  return (await pagesForLocale(locale))
    .filter((p) => p.data.nav.parent === sectionKey)
    .sort((a, b) => a.data.nav.order - b.data.nav.order);
}

/* ---------------- translation pairing (by translationKey) ---------------- */

export interface TranslationLink {
  locale: Locale;
  href: string | null; // null → no translation exists
}

export async function translationLinks(
  entry: PageEntry | PostEntry,
  collection: 'pages' | 'posts',
): Promise<TranslationLink[]> {
  const key = entry.data.translationKey;
  const links: TranslationLink[] = [];

  if (collection === 'pages') {
    const pages = await allPages();
    const sectionsByLocale = new Map<Locale, PageEntry[]>();
    for (const loc of locales) {
      sectionsByLocale.set(loc, await sectionsForLocale(loc));
    }
    for (const loc of locales) {
      const match = pages.find((p) => p.data.lang === loc && p.data.translationKey === key);
      links.push({
        locale: loc,
        href: match ? pagePath(match, sectionsByLocale.get(loc)!) : null,
      });
    }
  } else {
    const posts = await allPosts();
    for (const loc of locales) {
      const match = posts.find((p) => p.data.lang === loc && p.data.translationKey === key);
      links.push({ locale: loc, href: match ? postPath(match) : null });
    }
  }
  return links;
}

/* ---------------- breadcrumbs ---------------- */

export interface Crumb {
  label: string;
  href: string | null;
}

export async function pageBreadcrumbs(
  entry: PageEntry,
  homeLabel: string,
): Promise<Crumb[]> {
  const locale = entry.data.lang;
  const sections = await sectionsForLocale(locale);
  const crumbs: Crumb[] = [{ label: homeLabel, href: `/${locale}/` }];

  if (isSectionPage(entry)) {
    crumbs.push({ label: entry.data.title, href: null });
    return crumbs;
  }
  if (entry.data.nav.parent) {
    const parent = sections.find((s) => s.data.translationKey === entry.data.nav.parent);
    if (parent) {
      crumbs.push({ label: parent.data.nav.label, href: `/${locale}/${parent.data.slug}/` });
    }
  }
  crumbs.push({ label: entry.data.title, href: null });
  return crumbs;
}

export async function postBreadcrumbs(
  entry: PostEntry,
  homeLabel: string,
  section?: { label: string; href: string },
): Promise<Crumb[]> {
  const locale = entry.data.lang;
  const crumbs: Crumb[] = [{ label: homeLabel, href: `/${locale}/` }];
  if (section) crumbs.push({ label: section.label, href: section.href });
  crumbs.push({ label: entry.data.title, href: null });
  return crumbs;
}
