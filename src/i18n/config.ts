/**
 * Locale configuration and locale-varying route segments.
 *
 * This is the single place that knows how URLs differ between languages.
 * To re-instantiate the site for another faculty, edit this file and
 * `src/data/*.ts` — never the components.
 */

export const locales = ['sl', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'sl';

/**
 * Locale-varying URL segments. Pages and posts declare language-independent
 * `translationKey`s; these segments decide the public path shape per locale.
 */
export const routeSegments: Record<Locale, { news: string; search: string }> = {
  sl: { news: 'novice', search: 'iskanje' },
  en: { news: 'news', search: 'search' },
};

/** Human-readable language names, shown in the language toggle. */
export const localeNames: Record<Locale, string> = {
  sl: 'Slovenščina',
  en: 'English',
};

/** Short labels for the language toggle chips. */
export const localeShort: Record<Locale, string> = {
  sl: 'SL',
  en: 'EN',
};

/** BCP 47 tags for `Intl` formatters and the `<html lang>` attribute. */
export const bcp47: Record<Locale, string> = {
  sl: 'sl-SI',
  en: 'en-GB',
};

/** Open Graph locale tags (`og:locale`), which use an underscore, not a hyphen. */
export const ogLocale: Record<Locale, string> = {
  sl: 'sl_SI',
  en: 'en_GB',
};
