/** Localized organisation/contact copy for English. Generic UI strings live in src/i18n/en.ts. */
export interface OrgConfig {
  organisationName: string;
  siteDescription: string;
  footerText: string;
  contact: { email: string; instagram: string };
}

const site: OrgConfig = {
  organisationName: 'Tenzor',
  siteDescription:
    'Tenzor student list at the Faculty of Mathematics and Physics. Programme, finances, documents and notices.',
  footerText: 'Tenzor — student list, Faculty of Mathematics and Physics',
  contact: {
    email: 'tenzorfmf@proton.me',
    instagram: '@tenzor_fmf',
  },
};

export default site;
