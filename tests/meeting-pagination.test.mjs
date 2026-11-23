import assert from 'node:assert/strict';
import test from 'node:test';
import {
  clampPageNumber,
  MEETINGS_PER_PAGE,
  parsePageNumber,
} from '../lib/meeting-pagination.ts';

test('uses five meetings per page', () => {
  assert.equal(MEETINGS_PER_PAGE, 5);
});

test('defaults malformed or unsafe page numbers to the first page', () => {
  for (const rawPage of [
    undefined,
    ['2'],
    '',
    '0',
    '-1',
    '1.5',
    '999999999999999999999',
  ]) {
    assert.equal(parsePageNumber(rawPage), 1);
  }

  assert.equal(parsePageNumber('3'), 3);
});

test('clamps pages to the available range, including empty results', () => {
  assert.equal(clampPageNumber(3, 2), 2);
  assert.equal(clampPageNumber(0, 2), 1);
  assert.equal(clampPageNumber(5, 0), 1);
});
