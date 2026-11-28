import assert from 'node:assert/strict';
import test from 'node:test';
import {
  formatMeetingDate,
  getMostRecentSundayDate,
  isValidMeetingDate,
} from '../lib/meeting-dates.ts';

test('finds Sunday using the ward timezone at midnight boundaries', () => {
  assert.equal(
    getMostRecentSundayDate(new Date('2026-11-14T20:59:59.999Z')),
    '2026-11-08',
  );
  assert.equal(
    getMostRecentSundayDate(new Date('2026-11-14T21:00:00.000Z')),
    '2026-11-15',
  );
});

test('finds Sunday across a year boundary in the ward timezone', () => {
  assert.equal(
    getMostRecentSundayDate(new Date('2027-01-02T21:00:00.000Z')),
    '2027-01-03',
  );
});

test('accepts real ISO dates and rejects malformed or impossible dates', () => {
  assert.equal(isValidMeetingDate('2024-02-29'), true);
  assert.equal(isValidMeetingDate('2026-02-29'), false);
  assert.equal(isValidMeetingDate('2026-13-01'), false);
  assert.equal(isValidMeetingDate('11/15/2026'), false);
});

test('formats a date-only value consistently regardless of host timezone', () => {
  assert.equal(
    formatMeetingDate('2026-11-08', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    '8 November 2026',
  );
});

test('rejects invalid dates when formatting', () => {
  assert.throws(() => formatMeetingDate('2026-02-30'), RangeError);
});

test('rejects an invalid current date', () => {
  assert.throws(() => getMostRecentSundayDate(new Date(Number.NaN)), RangeError);
});
