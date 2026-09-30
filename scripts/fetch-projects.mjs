import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { randomUUID } from 'node:crypto';
import { parse } from 'yaml';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function resolveProjectSources(config, environment = process.env) {
  const username =
    environment.GITHUB_USERNAME ?? config.github_username ?? config.repository?.split('/')[0] ?? '';
  const organizations =
    environment.GITHUB_ORGS ?? environment.GITHUB_ORG ?? config.github_orgs ?? [];
  return {
    username: String(username).trim(),
    organizations: (Array.isArray(organizations) ? organizations : String(organizations).split(','))
      .map((name) => String(name).trim())
      .filter(Boolean),
  };
}

async function fetchRepositoryList(kind, name, { token, fetchImpl }) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'Yummy-Modern-Site-Builder',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const repositories = [];
  for (let page = 1; ; page += 1) {
    const url = new URL(`https://api.github.com/${kind}/${encodeURIComponent(name)}/repos`);
    url.search = new URLSearchParams({ per_page: '100', sort: 'updated', page: String(page) });
    const response = await fetchImpl(url, { headers, signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(`GitHub API request failed (${response.status}): ${url}`);
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error(`Invalid GitHub repository list: ${url}`);
    repositories.push(...batch);
    if (batch.length < 100) return repositories;
  }
}

export async function fetchProjects({
  username = '',
  organizations = [],
  token = '',
  fetchImpl = fetch,
} = {}) {
  const sources = [...new Set(organizations)].map((name) => ['orgs', name]);
  if (username) sources.unshift(['users', username]);
  const repositories = (
    await Promise.all(
      sources.map(([kind, name]) => fetchRepositoryList(kind, name, { token, fetchImpl })),
    )
  ).flat();
  const byFullName = new Map();
  for (const repo of repositories) {
    if (!repo.full_name || !repo.name || !repo.html_url || !repo.owner?.login) {
      throw new Error('GitHub returned an incomplete repository record');
    }
    byFullName.set(repo.full_name, {
      name: repo.name,
      link: repo.html_url,
      description: repo.description || '',
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      updated_at: repo.updated_at || '',
      fork: Boolean(repo.fork),
      owner: repo.owner.login,
    });
  }
  return [...byFullName.values()].sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

async function main() {
  const config = parse(readFileSync(join(root, '_config.yml'), 'utf8'));
  const sources = resolveProjectSources(config);
  if (!sources.username && !sources.organizations.length) {
    console.log('No GitHub source configured; existing project data left unchanged.');
    return;
  }
  const projects = await fetchProjects({
    ...sources,
    token: process.env.GITHUB_TOKEN || process.env.JEKYLL_GITHUB_TOKEN || '',
  });
  const dataDir = join(root, '_data');
  const outputPath = join(dataDir, 'projects.json');
  mkdirSync(dataDir, { recursive: true });
  const temporaryPath = join(dataDir, `.projects-${randomUUID()}.tmp`);
  try {
    writeFileSync(temporaryPath, `${JSON.stringify(projects, null, 2)}\n`, 'utf8');
    renameSync(temporaryPath, outputPath);
  } finally {
    rmSync(temporaryPath, { force: true });
  }
  console.log(`Fetched ${projects.length} projects -> ${outputPath}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await main();
}
