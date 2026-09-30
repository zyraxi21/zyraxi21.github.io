import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchProjects, resolveProjectSources } from '../scripts/fetch-projects.mjs';

function repository(name, updated = '2026-09-01T00:00:00Z') {
  return {
    full_name: `example/${name}`,
    name,
    html_url: `https://github.com/example/${name}`,
    owner: { login: 'example' },
    updated_at: updated,
  };
}

test('fetches beyond 100 repositories, deduplicates sources, and sorts the final list', async () => {
  const requests = [];
  const projects = await fetchProjects({
    username: 'example',
    organizations: ['group', 'group'],
    fetchImpl: async (url, options) => {
      requests.push(url.href);
      assert.ok(options.signal instanceof AbortSignal);
      if (url.pathname.includes('/orgs/'))
        return Response.json([repository('newest', '2026-10-01T00:00:00Z')]);
      return Response.json(
        url.searchParams.get('page') === '1'
          ? Array.from({ length: 100 }, (_, index) => repository(`repo-${index}`))
          : [repository('newest', '2026-10-01T00:00:00Z')],
      );
    },
  });
  assert.equal(projects.length, 101);
  assert.equal(projects[0].name, 'newest');
  assert.equal(requests.length, 3);
  assert.equal(requests.filter((url) => url.includes('/orgs/')).length, 1);
});

test('rejects failed or malformed API responses', async () => {
  await assert.rejects(
    fetchProjects({
      username: 'example',
      fetchImpl: async () => new Response('', { status: 403 }),
    }),
    /403/,
  );
  await assert.rejects(
    fetchProjects({
      username: 'example',
      fetchImpl: async () => Response.json({ message: 'unexpected' }),
    }),
    /Invalid GitHub repository list/,
  );
  await assert.rejects(
    fetchProjects({ username: 'example', fetchImpl: async () => Response.json([{}]) }),
    /incomplete repository/,
  );
});

test('empty environment overrides disable configured sources without making requests', async () => {
  const sources = resolveProjectSources(
    { github_username: 'example', github_orgs: ['group'] },
    { GITHUB_USERNAME: '', GITHUB_ORG: '' },
  );
  const projects = await fetchProjects({
    ...sources,
    fetchImpl: () => assert.fail('Unexpected network request'),
  });
  assert.deepEqual(projects, []);
});

test('supports repository owner fallback and multiple organization overrides', () => {
  assert.deepEqual(
    resolveProjectSources({ repository: 'owner/site' }, { GITHUB_ORGS: 'one, two' }),
    { username: 'owner', organizations: ['one', 'two'] },
  );
});
