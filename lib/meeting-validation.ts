import { z } from 'zod';
import { isValidMeetingDate } from './meeting-dates.ts';
import type { MeetingType, SacramentMeeting, SpeakerItem } from './types';

const meetingTypes: [MeetingType, ...MeetingType[]] = [
  'testimony',
  'regular',
  'stake',
  'general',
];

const hymnNumberSchema = z
  .string()
  .regex(/^[1-9]\d*$/, 'Enter a positive whole number.')
  .transform(Number)
  .refine(Number.isSafeInteger, 'Enter a safe whole number.');

const speakerLinesSchema = z
  .string()
  .optional()
  .default('')
  .superRefine((value, context) => {
    value.split(/\r?\n/).forEach((line, index) => {
      if (!line.trim()) {
        return;
      }

      const [name, topic, type, ...extra] = line.split('|').map((part) => part.trim());
      if (
        extra.length > 0 ||
        !name ||
        (type === 'speaker' && !topic) ||
        (type !== 'speaker' && type !== 'musical-number')
      ) {
        context.addIssue({
          code: 'custom',
          message: `Line ${index + 1} must be "Name | Topic | speaker" or "Name | Topic | musical-number".`,
        });
      }
    });
  });

function splitLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSpeakerLines(value: string): SpeakerItem[] {
  return splitLines(value).map((line) => {
    const [name, topic, type] = line.split('|').map((part) => part.trim());

    return {
      name,
      topic,
      type: type === 'speaker' ? 'speaker' : 'musical-number',
    };
  });
}

export const meetingFormSchema = z
  .object({
    date: z
      .string()
      .refine(isValidMeetingDate, 'Enter a valid calendar date.'),
    meetingType: z.enum(meetingTypes),
    presiding: z.string().trim().min(1, 'Enter who is presiding.'),
    conducting: z.string().trim().min(1, 'Enter who is conducting.'),
    announcements: z.string().optional().default(''),
    openingHymnNumber: hymnNumberSchema,
    openingHymnTitle: z.string().trim().min(1, 'Enter the opening hymn title.'),
    openingPrayer: z.string().trim().min(1, 'Enter who will offer the opening prayer.'),
    wardBusiness: z.string().optional().default(''),
    stakeBusiness: z.enum(['true', 'false']).transform((value) => value === 'true'),
    sacramentHymnNumber: hymnNumberSchema,
    sacramentHymnTitle: z.string().trim().min(1, 'Enter the sacrament hymn title.'),
    speakers: speakerLinesSchema,
    closingHymnNumber: hymnNumberSchema,
    closingHymnTitle: z.string().trim().min(1, 'Enter the closing hymn title.'),
    closingPrayer: z.string().trim().min(1, 'Enter who will offer the closing prayer.'),
  })
  .transform((fields): Omit<SacramentMeeting, 'id'> => ({
    date: fields.date,
    meetingType: fields.meetingType,
    presiding: fields.presiding,
    conducting: fields.conducting,
    announcements: splitLines(fields.announcements),
    openingHymn: {
      number: fields.openingHymnNumber,
      title: fields.openingHymnTitle,
    },
    openingPrayer: fields.openingPrayer,
    wardBusiness: splitLines(fields.wardBusiness).map((description) => ({
      description,
    })),
    stakeBusiness: fields.stakeBusiness,
    sacramentHymn: {
      number: fields.sacramentHymnNumber,
      title: fields.sacramentHymnTitle,
    },
    speakers: parseSpeakerLines(fields.speakers),
    closingHymn: {
      number: fields.closingHymnNumber,
      title: fields.closingHymnTitle,
    },
    closingPrayer: fields.closingPrayer,
  }));

export function getMeetingFormData(formData: FormData): Record<string, unknown> {
  return {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: formData.get('announcements'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: formData.get('wardBusiness'),
    stakeBusiness: formData.get('stakeBusiness'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    speakers: formData.get('speakers'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
  };
}

export function getFieldErrors(
  issues: readonly z.core.$ZodIssue[],
): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};

  for (const issue of issues) {
    const field = issue.path[0];
    if (typeof field !== 'string') {
      continue;
    }

    (fieldErrors[field] ??= []).push(issue.message);
  }

  return fieldErrors;
}
