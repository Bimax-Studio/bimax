import { createReader } from '@keystatic/core/reader';

import keystaticConfig from '../../keystatic.config.js';

/**
 * Production deployments can read content straight from GitHub, which means
 * the site works on ephemeral/serverless hosts without shipping the repo.
 * Locally (and on a self-hosted box with the repo present) we read from disk.
 *
 * GITHUB_PAT is a fine-grained personal access token with read access to the
 * content repository. It is optional: without it the reader falls back to
 * local files.
 */
const githubRepo = process.env.KEYSTATIC_GITHUB_REPO;
const githubToken = process.env.GITHUB_PAT;
const useGitHubReader = Boolean(githubRepo && githubToken);

const isDev = process.env.NODE_ENV === 'development';
const CACHE_TTL = isDev ? 0 : 30_000;

let readerPromise;

function getReader() {
  if (!readerPromise) {
    readerPromise = useGitHubReader
      ? import('@keystatic/core/reader/github').then(
          ({ createGitHubReader }) =>
            createGitHubReader(keystaticConfig, {
              repo: githubRepo,
              token: githubToken,
            }),
        )
      : Promise.resolve(createReader(process.cwd(), keystaticConfig));
  }

  return readerPromise;
}

const cache = new Map();

async function cached(key, load) {
  if (CACHE_TTL === 0) return load();

  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.value;

  const value = await load();
  cache.set(key, { value, expires: Date.now() + CACHE_TTL });
  return value;
}

/**
 * Keystatic image fields store a path relative to the content file
 * (e.g. `../../public/images/projects/cover.svg`). Our assets live in
 * `public/`, so we only need the filename to build a public URL.
 */
export function imageUrl(value, folder = 'projects') {
  if (!value) return null;
  if (/^(https?:)?\/\//.test(value) || value.startsWith('/')) return value;
  const filename = value.split('/').pop();
  return filename ? `/images/${folder}/${filename}` : null;
}

export function formatDate(value, options = {}) {
  if (!value) return '';
  const date = new Date(`${value}T12:00:00Z`);

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
    ...options,
  }).format(date);
}

function normalizeProject({ slug, entry }) {
  return {
    slug,
    ...entry,
    coverUrl: imageUrl(entry.cover),
    year: entry.publishedAt ? entry.publishedAt.slice(0, 4) : '',
  };
}

function normalizeService({ slug, entry }) {
  return {
    slug,
    ...entry,
    number: entry.kicker?.split('—')[0]?.trim() || '',
  };
}

export async function getProjects() {
  return cached('projects', async () => {
    const reader = await getReader();
    const entries = await reader.collections.projects.all();
    return entries
      .map(normalizeProject)
      .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
  });
}

export async function getProject(slug) {
  return cached(`project:${slug}`, async () => {
    const reader = await getReader();
    const entry = await reader.collections.projects.read(slug);
    if (!entry) return null;
    return normalizeProject({ slug, entry });
  });
}

export async function getServices() {
  return cached('services', async () => {
    const reader = await getReader();
    const entries = await reader.collections.services.all();
    return entries
      .map(normalizeService)
      .sort((a, b) => a.kicker.localeCompare(b.kicker));
  });
}

export async function readEntryContent(entry) {
  if (!entry || typeof entry.content !== 'function') return '';
  return entry.content();
}
