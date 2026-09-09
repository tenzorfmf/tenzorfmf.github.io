// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://tenzor-fmf.org',
  trailingSlash: 'always',
  redirects: {
    '/': '/sl/',
  },
  build: {
    format: 'directory',
  },
  markdown: {
    // Slovenian content migrates verbatim — do not auto-substitute quotes/dashes.
    smartypants: false,
  },
  integrations: [mdx()],
  // Static output is the default in Astro 5.
  vite: {
    build: {
      rollupOptions: {
        // Pagefind is generated into dist/ after the build; never bundle it.
        external: [/^\/pagefind\//],
      },
    },
  },
});
