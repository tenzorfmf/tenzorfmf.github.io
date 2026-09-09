import sl from '../i18n/sl';
import en from '../i18n/en';
import type { UIStrings } from '../i18n/sl';
import { type Locale, routeSegments } from '../i18n/config';
import site from '../data/site';
import orgSl from '../data/site.sl';
import orgEn from '../data/site.en';
import type { OrgConfig } from '../data/site.en';

const UI: Record<Locale, UIStrings> = { sl, en };

export function t(locale: Locale): UIStrings {
  return UI[locale];
}

const ORG: Record<Locale, OrgConfig> = { sl: orgSl, en: orgEn };

export function org(locale: Locale): OrgConfig {
  return ORG[locale];
}

export { site };

export function newsSegment(locale: Locale): string {
  return routeSegments[locale].news;
}

export function searchSegment(locale: Locale): string {
  return routeSegments[locale].search;
}

export function localeHtmlLang(locale: Locale): string {
  return locale === 'sl' ? 'sl-SI' : 'en';
}
