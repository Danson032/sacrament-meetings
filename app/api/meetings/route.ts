import { getMeetings } from '@/lib/meetings-db';

export function GET(request: Request): Response {
  const date = new URL(request.url).searchParams.get('date');
  const meetings = date === null ? getMeetings() : getMeetings(date);

  return Response.json(meetings);
}
