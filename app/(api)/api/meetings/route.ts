import { getMeetingsResponse } from '@/lib/meetings-api';

export async function GET(request: Request): Promise<Response> {
  const dateParams = new URL(request.url).searchParams.getAll('date');

  if (dateParams.length > 1) {
    return Response.json(
      { error: 'Provide the date parameter only once.' },
      { status: 400 },
    );
  }

  return await getMeetingsResponse(dateParams[0] ?? null);
}
