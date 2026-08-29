import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dataDir = join(root, '_data');
const outputPath = join(dataDir, 'projects.json');

async function fetchRepositoryList(url) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'zyraxi-site-builder',
  };
  const token = process.env.GITHUB_TOKEN || process.env.JEKYLL_GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API request failed (${response.status}): ${url}`);
  }
  return response.json();
}

const [userRepos, orgRepos] = await Promise.all([
  fetchRepositoryList('https://api.github.com/users/zyraxi21/repos?per_page=100&sort=updated'),
  fetchRepositoryList(
    'https://api.github.com/orgs/Friends-of-zyraxi/repos?per_page=100&sort=updated'
  ),
]);

const byFullName = new Map();
[...userRepos, ...orgRepos].forEach((repo) => {
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
});

const projects = Array.from(byFullName.values()).sort(
  (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
);

mkdirSync(dataDir, { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(projects, null, 2)}\n`, 'utf8');
console.log(`Fetched ${projects.length} projects -> ${outputPath}`);
