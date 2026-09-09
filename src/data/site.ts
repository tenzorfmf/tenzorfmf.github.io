/** Shared, locale-independent site/brand configuration. */
export interface SiteConfig {
  brand: { name: string };
  social: { instagram: string };
}

const site: SiteConfig = {
  brand: { name: 'Tenzor' },
  social: { instagram: 'https://www.instagram.com/tenzor_fmf' },
};

export default site;
