import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getMeetingResponse,
  getMeetingsResponse,
} from '../lib/meetings-api.ts';

const sampleMeetings = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  date: [
    '2026-11-08',
    '2026-11-01',
    '2026-10-25',
    '2026-10-18',
    '2026-10-11',
  ][index],
}));

async function findMeetings(date) {
  return sampleMeetings.filter(
    (meeting) => date == null || meeting.date === date,
  );
}

async function findMeetingById(id) {
  return sampleMeetings.find((meeting) => meeting.id === id) ?? null;
}

test('lists all sample meetings in descending date order', async () => {
  const response = await getMeetingsResponse(null, findMeetings);
  const meetings = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(
    meetings.map((meeting) => meeting.id),
    [1, 2, 3, 4, 5],
  );
});

test('filters meetings by a valid date', async () => {
  const response = await getMeetingsResponse('2026-11-01', findMeetings);
  const meetings = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(
    meetings.map((meeting) => meeting.id),
    [2],
  );
});

test('returns an empty list for a valid date with no meeting', async () => {
  const response = await getMeetingsResponse('2026-11-15', findMeetings);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), []);
});

test('rejects malformed or impossible meeting dates', async () => {
  for (const date of ['yesterday', '2026-02-29', '']) {
    const response = await getMeetingsResponse(date, findMeetings);

    assert.equal(response.status, 400);
    assert.match((await response.json()).error, /valid calendar date/);
  }
});

test('returns a meeting for a valid positive integer ID', async () => {
  const response = await getMeetingResponse('1', findMeetingById);
  const meeting = await response.json();

  assert.equal(response.status, 200);
  assert.equal(meeting.id, 1);
});

test('rejects malformed and unsafe meeting IDs', async () => {
  for (const id of ['0', '-1', '1.5', 'not-an-id', '999999999999999999999']) {
    const response = await getMeetingResponse(id, findMeetingById);

    assert.equal(response.status, 400);
    assert.match((await response.json()).error, /positive integer/);
  }
});

test('returns 404 for a well-formed ID with no meeting', async () => {
  const response = await getMeetingResponse('999', findMeetingById);

  assert.equal(response.status, 404);
  assert.match((await response.json()).error, /was not found/);
});
