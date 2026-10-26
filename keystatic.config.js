import { collection, config, fields } from '@keystatic/core';

/**
 * BIMAX content model.
 *
 * Storage strategy:
 * - development (and any environment without a repo configured) → local filesystem.
 *   Keystatic writes straight into `src/content/**`, so edits show up instantly.
 * - production with KEYSTATIC_GITHUB_REPO set → GitHub.
 *   The admin UI commits Markdown/MDX files to the repository. No database.
 *
 * Required env vars for GitHub mode:
 *   KEYSTATIC_GITHUB_REPO="owner/repo"            (server-side reader)
 *   PUBLIC_KEYSTATIC_GITHUB_REPO="owner/repo"     (browser CMS, not a secret)
 *   KEYSTATIC_GITHUB_CLIENT_ID="..."
 *   KEYSTATIC_GITHUB_CLIENT_SECRET="..."
 *   KEYSTATIC_SECRET="..."
 *   PUBLIC_KEYSTATIC_GITHUB_APP_SLUG="..."
 *
 * Optional, for rendering production content straight from GitHub:
 *   GITHUB_PAT="github_pat_..."
 */
// This file is bundled for the browser too, so it must use Vite's
// `import.meta.env` instead of `process.env` (which is not defined there).
const isDev = import.meta.env?.DEV;
const githubRepo = import.meta.env?.PUBLIC_KEYSTATIC_GITHUB_REPO;

const storage =
  !isDev && githubRepo
    ? { kind: 'github', repo: githubRepo }
    : { kind: 'local' };

export default config({
  storage,
  ui: {
    brand: { name: 'BIMAX' },
    navigation: {
      Content: ['projects', 'services'],
    },
  },
  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'client', 'publishedAt'],
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            validation: { length: { min: 1, max: 90 } },
          },
          slug: {
            label: 'Slug',
            description: 'Used in the URL: /projects/{slug}',
          },
        }),
        client: fields.text({
          label: 'Client',
          validation: { isRequired: true },
        }),
        summary: fields.text({
          label: 'Summary',
          description: 'One or two sentences. Shown on cards and in metadata.',
          multiline: true,
          validation: { length: { max: 240 } },
        }),
        cover: fields.image({
          label: 'Cover image',
          description: 'Wide image, 4:3 or 16:9 works best.',
          directory: 'public/images/projects',
          publicPath: '/images/projects/',
        }),
        accent: fields.select({
          label: 'Accent',
          description: 'Tints the card and the project page.',
          options: [
            { label: 'Solar (orange)', value: 'solar' },
            { label: 'Acid (green)', value: 'acid' },
            { label: 'Mono (ink)', value: 'ink' },
          ],
          defaultValue: 'solar',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'New tag',
        }),
        publishedAt: fields.date({
          label: 'Published',
          defaultValue: { kind: 'today' },
        }),
        featured: fields.checkbox({
          label: 'Feature on homepage',
          defaultValue: false,
        }),
        content: fields.mdx({
          label: 'Case study',
          extension: 'mdx',
          options: {
            bold: true,
            italic: true,
            strikethrough: true,
            code: true,
            heading: [2, 3, 4],
            blockquote: true,
            orderedList: true,
            unorderedList: true,
            table: true,
            link: true,
            image: {
              directory: 'public/images/projects',
              publicPath: '/images/projects/',
            },
            divider: true,
            codeBlock: true,
          },
        }),
      },
    }),

    services: collection({
      label: 'Services',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'kicker'],
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            validation: { length: { min: 1, max: 70 } },
          },
          slug: {
            label: 'Slug',
            description: 'Used in the URL: /services#{slug}',
          },
        }),
        kicker: fields.text({
          label: 'Kicker',
          description: 'Short mono label, e.g. “01 — Identity”.',
          validation: { length: { max: 40 } },
        }),
        summary: fields.text({
          label: 'Summary',
          multiline: true,
          validation: { length: { max: 220 } },
        }),
        icon: fields.select({
          label: 'Icon',
          options: [
            { label: 'Compass (strategy)', value: 'compass' },
            { label: 'Layers (brand)', value: 'layers' },
            { label: 'Grid (digital)', value: 'grid' },
            { label: 'Aperture (motion)', value: 'aperture' },
            { label: 'Cube (space)', value: 'cube' },
          ],
          defaultValue: 'layers',
        }),
        accent: fields.select({
          label: 'Accent',
          options: [
            { label: 'Solar (orange)', value: 'solar' },
            { label: 'Acid (green)', value: 'acid' },
            { label: 'Mono (ink)', value: 'ink' },
          ],
          defaultValue: 'solar',
        }),
        features: fields.array(fields.text({ label: 'Feature' }), {
          label: 'What is included',
          itemLabel: (props) => props.value || 'New feature',
        }),
        content: fields.mdx({
          label: 'Detail',
          extension: 'mdx',
          options: {
            bold: true,
            italic: true,
            heading: [2, 3],
            blockquote: true,
            orderedList: true,
            unorderedList: true,
            link: true,
            divider: true,
          },
        }),
      },
    }),
  },
});
