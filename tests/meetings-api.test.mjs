import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getMeetingResponse,
  getMeetingsResponse,
} from '../lib/meetings-api.ts';

test('lists all sample meetings in descending date order', async () => {
  const response = getMeetingsResponse(null);
  const meetings = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(
    meetings.map((meeting) => meeting.id),
    [1, 2, 3, 4, 5],
  );
});

test('filters meetings by a valid date', async () => {
  const response = getMeetingsResponse('2026-11-01');
  const meetings = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(
    meetings.map((meeting) => meeting.id),
    [2],
  );
});

test('returns an empty list for a valid date with no meeting', async () => {
  const response = getMeetingsResponse('2026-11-15');

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), []);
});

test('rejects malformed or impossible meeting dates', async () => {
  for (const date of ['yesterday', '2026-02-29', '']) {
    const response = getMeetingsResponse(date);

    assert.equal(response.status, 400);
    assert.match((await response.json()).error, /valid calendar date/);
  }
});

test('returns a meeting for a valid positive integer ID', async () => {
  const response = getMeetingResponse('1');
  const meeting = await response.json();

  assert.equal(response.status, 200);
  assert.equal(meeting.id, 1);
});

test('rejects malformed and unsafe meeting IDs', async () => {
  for (const id of ['0', '-1', '1.5', 'not-an-id', '999999999999999999999']) {
    const response = getMeetingResponse(id);

    assert.equal(response.status, 400);
    assert.match((await response.json()).error, /positive integer/);
  }
});

test('returns 404 for a well-formed ID with no meeting', async () => {
  const response = getMeetingResponse('999');

  assert.equal(response.status, 404);
  assert.match((await response.json()).error, /was not found/);
});
