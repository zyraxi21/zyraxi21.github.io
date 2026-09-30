import assert from 'node:assert/strict';
import test from 'node:test';
import { matchesCategory } from '../src/js/categories.js';

test('category filtering distinguishes complete names, including names containing commas', () => {
  assert.equal(matchesCategory(['JavaScript'], 'Java'), false);
  assert.equal(matchesCategory(['Java', 'C, C++'], 'C, C++'), true);
  assert.equal(matchesCategory(['Java', 'C, C++'], 'C'), false);
  assert.equal(matchesCategory([' 展示 '], '展示'), true);
  assert.equal(matchesCategory(['JavaScript'], 'javascript'), true);
  assert.equal(matchesCategory([], ''), true);
  assert.equal(matchesCategory(['all'], 'all'), true);
});
