import { evaluate } from '@mdx-js/mdx';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';

const cache = new Map();

/**
 * Compile a Keystatic MDX field into static HTML for SSR.
 *
 * Keystatic has already parsed and validated this content (authors cannot use
 * imports or raw HTML), and it comes from the content repository, so it is
 * trusted input. Compilation is cached in memory by source string.
 *
 * @param {string} source
 * @returns {Promise<string>}
 */
export async function renderMdx(source) {
  if (!source || !source.trim()) return '';

  const cached = cache.get(source);
  if (cached) return cached;

  try {
    const { default: MDXContent } = await evaluate(source, {
      ...runtime,
      remarkPlugins: [remarkGfm],
    });

    const html = renderToStaticMarkup(createElement(MDXContent));
    cache.set(source, html);
    return html;
  } catch (error) {
    console.error('[mdx] Failed to render content:', error);
    return '<p>This case study is temporarily unavailable.</p>';
  }
}
