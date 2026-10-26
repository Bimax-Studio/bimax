import { fileURLToPath } from 'node:url';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// When building for GitHub Pages or running a static build
const isGitHubPages =
  process.env.GITHUB_PAGES === 'true' ||
  process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  site: isGitHubPages
    ? 'https://macs-massimopiazza.github.io'
    : (process.env.SITE_URL || 'https://bimax.studio'),
  base: isGitHubPages ? '/bimax' : '/',

  // GitHub Pages requires static HTML output
  output: 'static',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },

  build: {
    // Inline small assets; keep the rest fingerprinted.
    inlineStylesheets: 'auto',
  },
});
