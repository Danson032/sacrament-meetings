import { getMeetingResponse } from '@/lib/meetings-api';

interface MeetingRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  { params }: MeetingRouteContext,
): Promise<Response> {
  const { id } = await params;

  return getMeetingResponse(id);
}
