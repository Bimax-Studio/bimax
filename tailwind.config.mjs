/**
 * Tailwind v4 is configured primarily through CSS (`src/styles/global.css`).
 * This file is loaded with the `@config` directive and exists for two reasons:
 *
 * 1. Tooling (editors, Prettier plugins, design-token exports) can read it.
 * 2. Content sources are explicit, which keeps class detection predictable.
 *
 * Values reference the CSS custom properties declared in `@theme`, so there is
 * a single source of truth for colour.
 */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx}',
    './keystatic.config.js',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--color-paper)',
        canvas: 'var(--color-canvas)',
        ink: 'var(--color-ink)',
        void: 'var(--color-void)',
        solar: 'var(--color-solar)',
        acid: 'var(--color-acid)',
        moss: 'var(--color-moss)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        'accent-soft': 'var(--accent-soft)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      borderRadius: {
        bento: 'var(--radius-bento)',
        blob: 'var(--radius-blob)',
      },
      transitionTimingFunction: {
        organic: 'var(--ease-organic)',
      },
    },
  },
};
