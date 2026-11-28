import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getFieldErrors,
  meetingFormSchema,
} from '../lib/meeting-validation.ts';

const validMeetingForm = {
  date: '2026-11-29',
  meetingType: 'regular',
  presiding: 'Bishop John Smith',
  conducting: 'Brother James Mwangi',
  announcements: 'Ward temple visit\nYouth activity',
  openingHymnNumber: '2',
  openingHymnTitle: 'The Spirit of God',
  openingPrayer: 'Sister Mary Wanjiku',
  wardBusiness: 'Sustaining new Primary teachers',
  stakeBusiness: 'false',
  sacramentHymnNumber: '169',
  sacramentHymnTitle: 'As Now We Take the Sacrament',
  speakers: 'Brother Peter Kamau | Faith in Jesus Christ | speaker',
  closingHymnNumber: '31',
  closingHymnTitle: 'O God, Our Help in Ages Past',
  closingPrayer: 'Brother David Kimani',
};

test('validates and transforms meeting form data for the existing database shape', () => {
  const parsed = meetingFormSchema.safeParse(validMeetingForm);

  assert.equal(parsed.success, true);
  if (!parsed.success) {
    return;
  }

  assert.deepEqual(parsed.data.announcements, [
    'Ward temple visit',
    'Youth activity',
  ]);
  assert.deepEqual(parsed.data.wardBusiness, [
    { description: 'Sustaining new Primary teachers' },
  ]);
  assert.equal(parsed.data.stakeBusiness, false);
  assert.deepEqual(parsed.data.speakers, [
    {
      name: 'Brother Peter Kamau',
      topic: 'Faith in Jesus Christ',
      type: 'speaker',
    },
  ]);
});

test('allows musical numbers with no topic, as in the existing meeting data model', () => {
  const parsed = meetingFormSchema.safeParse({
    ...validMeetingForm,
    speakers: 'Ward Choir |  | musical-number',
  });

  assert.equal(parsed.success, true);
  if (!parsed.success) {
    return;
  }

  assert.deepEqual(parsed.data.speakers, [
    { name: 'Ward Choir', topic: '', type: 'musical-number' },
  ]);
});

test('rejects invalid dates, hymn numbers, and malformed speakers without losing field errors', () => {
  const parsed = meetingFormSchema.safeParse({
    ...validMeetingForm,
    date: '2026-02-29',
    openingHymnNumber: '0',
    speakers: 'Name without the required columns',
  });

  assert.equal(parsed.success, false);
  if (parsed.success) {
    return;
  }

  const fieldErrors = getFieldErrors(parsed.error.issues);
  assert.ok(fieldErrors.date?.length);
  assert.ok(fieldErrors.openingHymnNumber?.length);
  assert.ok(fieldErrors.speakers?.length);
});
