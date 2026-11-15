import { isValidMeetingDate } from './meeting-dates.ts';
import { getMeetingById, getMeetings } from './meetings-db.ts';

export function getMeetingsResponse(date: string | null): Response {
  if (date !== null && !isValidMeetingDate(date)) {
    return Response.json(
      { error: 'Date must be a valid calendar date in YYYY-MM-DD format.' },
      { status: 400 },
    );
  }

  return Response.json(getMeetings(date));
}

export function getMeetingResponse(rawId: string): Response {
  if (!/^[1-9]\d*$/.test(rawId)) {
    return Response.json(
      { error: 'Meeting ID must be a positive integer.' },
      { status: 400 },
    );
  }

  const id = Number(rawId);

  if (!Number.isSafeInteger(id)) {
    return Response.json(
      { error: 'Meeting ID must be a positive integer.' },
      { status: 400 },
    );
  }

  const meeting = getMeetingById(id);

  if (!meeting) {
    return Response.json(
      { error: `Meeting with ID ${id} was not found.` },
      { status: 404 },
    );
  }

  return Response.json(meeting);
}
