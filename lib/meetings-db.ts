
import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { clampPageNumber } from './meeting-pagination.ts';
import type {
  Hymn,
  MeetingType,
  SacramentMeeting,
  SpeakerItem,
  WardBusinessItem,
} from './types';

const sampleMeetings: SacramentMeeting[] = [
    {
        id: 1,
        date: '2026-11-08',
        meetingType: 'regular',
        presiding: 'Bishop John Smith',
        conducting: 'Brother James Mwangi',
        announcements: [
            'Ward temple visit on November 15',
            'Youth activity on Saturday'
        ],
        openingHymn: {
            number: 2,
            title: 'The Spirit of God'
        },
        openingPrayer: 'Sister Mary Wanjiku',
        wardBusiness: [
            { description: 'Sustaining of new Primary teachers' }
        ],
        stakeBusiness: false,
        sacramentHymn: {
            number: 169,
            title: 'As Now We Take the Sacrament'
        },
        speakers: [
            {
                name: 'Brother Peter Kamau',
                topic: 'Faith in Jesus Christ',
                type: 'speaker'
            },
            {
                name: 'Sister Grace Njeri',
                topic: 'The Power of Prayer',
                type: 'speaker'
            }
        ],
        closingHymn: {
            number: 31,
            title: 'O God, Our Help in Ages Past'
        },
        closingPrayer: 'Brother David Kimani'
    },
    {
        id: 2,
        date: '2026-11-01',
        meetingType: 'testimony',
        presiding: 'Bishop John Smith',
        conducting: 'Brother Peter Kamau',
        announcements: ['Ward choir practice on Wednesday'],
        openingHymn: {
            number: 6,
            title: 'Redeemer of Israel'
        },
        openingPrayer: 'Sister Anne Wambui',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: {
            number: 181,
            title: 'Jesus of Nazareth, Savior and King'
        },
        speakers: [],
        closingHymn: {
            number: 85,
            title: 'How Firm a Foundation'
        },
        closingPrayer: 'Brother James Mwangi'
    },
    {
        id: 3,
        date: '2026-10-25',
        meetingType: 'regular',
        presiding: 'Bishop John Smith',
        conducting: 'Brother David Kimani',
        announcements: ['Primary presentation preparation'],
        openingHymn: {
            number: 19,
            title: 'We Thank Thee, O God, for a Prophet'
        },
        openingPrayer: 'Brother Joseph Maina',
        wardBusiness: [
            { description: 'Sustaining of new ward missionaries' }
        ],
        stakeBusiness: true,
        sacramentHymn: {
            number: 185,
            title: 'Reverently and Meekly Now'
        },
        speakers: [
            {
                name: 'Sister Mary Wanjiku',
                topic: 'Service and Love',
                type: 'speaker'
            },
            {
                name: 'Ward Choir',
                topic: 'I Am a Child of God',
                type: 'musical-number'
            }
        ],
        closingHymn: {
            number: 98,
            title: 'I Need Thee Every Hour'
        },
        closingPrayer: 'Sister Grace Njeri'
    },
    {
        id: 4,
        date: '2026-10-18',
        meetingType: 'stake',
        presiding: 'Stake President Mwangi',
        conducting: 'Brother Daniel Kariuki',
        announcements: ['Stake leadership training next Sunday'],
        openingHymn: {
            number: 27,
            title: 'Praise to the Man'
        },
        openingPrayer: 'Brother John Kamau',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: {
            number: 188,
            title: 'Thy Will, O Lord, Be Done'
        },
        speakers: [
            {
                name: 'Stake President Mwangi',
                topic: 'Strengthening Families',
                type: 'speaker'
            }
        ],
        closingHymn: {
            number: 134,
            title: 'I Believe in Christ'
        },
        closingPrayer: 'Sister Jane Njeri'
    },
    {
        id: 5,
        date: '2026-10-11',
        meetingType: 'general',
        presiding: 'Elder James Mwangi',
        conducting: 'Brother Peter Kamau',
        announcements: ['General conference follow-up discussion'],
        openingHymn: {
            number: 1,
            title: 'The Morning Breaks'
        },
        openingPrayer: 'Sister Anne Wambui',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: {
            number: 193,
            title: 'I Stand All Amazed'
        },
        speakers: [
            {
                name: 'Elder James Mwangi',
                topic: 'Following Jesus Christ',
                type: 'speaker'
            }
        ],
        closingHymn: {
            number: 96,
            title: 'Dearest Children, God Is Near You'
        },
        closingPrayer: 'Brother David Kimani'
    }
];

type MeetingDetails = Omit<
  SacramentMeeting,
  'id' | 'date' | 'meetingType' | 'presiding' | 'conducting'
>;

let databaseInitialization: Promise<void> | undefined;
let initializedConnectionString: string | undefined;

function getConnectionString(): string {
  const connectionString =
    process.env.DATABASE_URL || process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error(
      'Set DATABASE_URL or POSTGRES_URL to connect to the meetings database.',
    );
  }

  return connectionString;
}

async function initializeDatabase(
  sql: NeonQueryFunction<false, false>,
): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS meetings (
      id INTEGER PRIMARY KEY,
      date DATE NOT NULL,
      meeting_type TEXT NOT NULL,
      presiding TEXT NOT NULL,
      conducting TEXT NOT NULL,
      details JSONB NOT NULL
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS meetings_date_idx
    ON meetings (date DESC, id)
  `;

  await Promise.all(
    sampleMeetings.map((meeting) => {
      const {
        id,
        date,
        meetingType,
        presiding,
        conducting,
        ...details
      } = meeting;

      return sql`
        INSERT INTO meetings (
          id, date, meeting_type, presiding, conducting, details
        )
        VALUES (
          ${id},
          ${date}::date,
          ${meetingType},
          ${presiding},
          ${conducting},
          ${JSON.stringify(details)}::jsonb
        )
        ON CONFLICT (id) DO NOTHING
      `;
    }),
  );
}

async function getDatabase() {
  const connectionString = getConnectionString();
  const sql = neon(connectionString);

  if (
    !databaseInitialization ||
    initializedConnectionString !== connectionString
  ) {
    initializedConnectionString = connectionString;
    databaseInitialization = initializeDatabase(sql).catch((error: unknown) => {
      databaseInitialization = undefined;
      initializedConnectionString = undefined;
      throw error;
    });
  }

  await databaseInitialization;
  return sql;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isMeetingType(value: unknown): value is MeetingType {
  return (
    value === 'testimony' ||
    value === 'regular' ||
    value === 'stake' ||
    value === 'general'
  );
}

function isHymn(value: unknown): value is Hymn {
  return (
    isRecord(value) &&
    typeof value.number === 'number' &&
    Number.isSafeInteger(value.number) &&
    typeof value.title === 'string'
  );
}

function isSpeakerItem(value: unknown): value is SpeakerItem {
  return (
    isRecord(value) &&
    typeof value.name === 'string' &&
    typeof value.topic === 'string' &&
    (value.type === 'speaker' || value.type === 'musical-number')
  );
}

function isWardBusinessItem(value: unknown): value is WardBusinessItem {
  return isRecord(value) && typeof value.description === 'string';
}

function isMeetingDetails(value: unknown): value is MeetingDetails {
  return (
    isRecord(value) &&
    (value.announcements === undefined ||
      (Array.isArray(value.announcements) &&
        value.announcements.every(
          (announcement) => typeof announcement === 'string',
        ))) &&
    isHymn(value.openingHymn) &&
    typeof value.openingPrayer === 'string' &&
    Array.isArray(value.wardBusiness) &&
    value.wardBusiness.every(isWardBusinessItem) &&
    typeof value.stakeBusiness === 'boolean' &&
    isHymn(value.sacramentHymn) &&
    Array.isArray(value.speakers) &&
    value.speakers.every(isSpeakerItem) &&
    isHymn(value.closingHymn) &&
    typeof value.closingPrayer === 'string'
  );
}

function mapMeeting(row: Record<string, unknown>): SacramentMeeting {
  const { id, date, meeting_type, presiding, conducting, details } = row;

  if (
    typeof id !== 'number' ||
    !Number.isSafeInteger(id) ||
    typeof date !== 'string' ||
    !isMeetingType(meeting_type) ||
    typeof presiding !== 'string' ||
    typeof conducting !== 'string' ||
    !isMeetingDetails(details)
  ) {
    throw new Error('The meetings table contains a malformed record.');
  }

  return {
    id,
    date,
    meetingType: meeting_type,
    presiding,
    conducting,
    ...details,
  };
}

export async function getMeetings(
  date?: string | null,
): Promise<SacramentMeeting[]> {
  const sql = await getDatabase();
  const rows: Record<string, unknown>[] =
    date == null
      ? await sql`
          SELECT id, date::text AS date, meeting_type, presiding, conducting, details
          FROM meetings
          ORDER BY date DESC, id
        `
      : await sql`
          SELECT id, date::text AS date, meeting_type, presiding, conducting, details
          FROM meetings
          WHERE date = ${date}::date
          ORDER BY date DESC, id
        `;

  return rows.map(mapMeeting);
}

export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | null> {
  const sql = await getDatabase();
  const rows: Record<string, unknown>[] = await sql`
    SELECT id, date::text AS date, meeting_type, presiding, conducting, details
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  return rows[0] ? mapMeeting(rows[0]) : null;
}

export async function getMeetingsPage(
  searchTerm: string,
  page: number,
  pageSize: number,
): Promise<{ meetings: SacramentMeeting[]; total: number }> {
  const sql = await getDatabase();
  const normalizedSearch = searchTerm.trim();
  const searchPattern = `%${normalizedSearch}%`;
  let countRows: Record<string, unknown>[];

  if (normalizedSearch) {
    countRows = await sql`
      SELECT COUNT(*)::int AS total
      FROM meetings
      WHERE date::text ILIKE ${searchPattern}
        OR meeting_type ILIKE ${searchPattern}
        OR presiding ILIKE ${searchPattern}
        OR conducting ILIKE ${searchPattern}
        OR EXISTS (
          SELECT 1
          FROM jsonb_array_elements(details -> 'speakers') AS speaker_item
          WHERE speaker_item ->> 'name' ILIKE ${searchPattern}
        )
    `;
  } else {
    countRows = await sql`SELECT COUNT(*)::int AS total FROM meetings`;
  }

  const totalValue = countRows[0]?.total;
  if (typeof totalValue !== 'number') {
    throw new Error('The meeting count query did not return a valid total.');
  }
  const total = totalValue;
  const totalPages = Math.ceil(total / pageSize);
  const safePage = clampPageNumber(page, totalPages);
  const offset = (safePage - 1) * pageSize;
  let rows: Record<string, unknown>[];

  if (normalizedSearch) {
    rows = await sql`
      SELECT id, date::text AS date, meeting_type, presiding, conducting, details
      FROM meetings
      WHERE date::text ILIKE ${searchPattern}
        OR meeting_type ILIKE ${searchPattern}
        OR presiding ILIKE ${searchPattern}
        OR conducting ILIKE ${searchPattern}
        OR EXISTS (
          SELECT 1
          FROM jsonb_array_elements(details -> 'speakers') AS speaker_item
          WHERE speaker_item ->> 'name' ILIKE ${searchPattern}
        )
      ORDER BY date DESC, id
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;
  } else {
    rows = await sql`
      SELECT id, date::text AS date, meeting_type, presiding, conducting, details
      FROM meetings
      ORDER BY date DESC, id
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;
  }

  return { meetings: rows.map(mapMeeting), total };
}
