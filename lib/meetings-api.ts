import { isValidMeetingDate } from './meeting-dates.ts';
import { getMeetingById, getMeetings } from './meetings-db.ts';

export async function getMeetingsResponse(
  date: string | null,
  findMeetings: typeof getMeetings = getMeetings,
): Promise<Response> {
  if (date !== null && !isValidMeetingDate(date)) {
    return Response.json(
      { error: 'Date must be a valid calendar date in YYYY-MM-DD format.' },
      { status: 400 },
    );
  }

  return Response.json(await findMeetings(date));
}

export async function getMeetingResponse(
  rawId: string,
  findMeeting: typeof getMeetingById = getMeetingById,
): Promise<Response> {
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

  const meeting = await findMeeting(id);

  if (!meeting) {
    return Response.json(
      { error: `Meeting with ID ${id} was not found.` },
      { status: 404 },
    );
  }

  return Response.json(meeting);
}
