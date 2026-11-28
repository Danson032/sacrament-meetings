# Sacrament Meeting Planner

A Next.js application for browsing, managing, reviewing, and printing sample
sacrament meeting programs for Meru Ward. It is backed by Neon PostgreSQL and
seeded with five sample meeting records.

## Features

- Browse meeting programs and dates on the all-meetings page.
- Search by meeting date, type, presiding or conducting leader, and speaker;
  browse results five meetings per page.
- Review leaders, announcements, ward and stake business, hymns, prayers,
  speakers, and musical numbers on a meeting detail page.
- Create, edit, and delete meeting programs with server-side validation.
- Open the current Sunday's program, calculated in the `Africa/Nairobi`
  timezone, or see an empty state when no matching program exists.
- Print a meeting program using a print-specific layout.
- Use keyboard-accessible navigation, skip-to-content link, responsive layouts,
  and clear empty, loading, not-found, and error states.
- Read-only JSON endpoints for listing meetings and retrieving an individual
  meeting, with validation for dates and IDs.

The included records are demonstration data and must not be treated as an
authoritative ward schedule. Management actions do not have authentication;
add authentication and authorization before using them with real ward data.

## Technology

- Next.js 16 App Router and React 19
- Neon PostgreSQL via `@neondatabase/serverless`
- TypeScript with strict type checking
- Tailwind CSS 4 (imported in the global stylesheet) and project-specific CSS
- Geist loaded with `next/font`
- Node.js built-in test runner (no additional test framework)

Database-backed meeting pages and APIs are rendered per request. The
current-meeting page also depends on the ward-local current date.

## Project structure

```text
app/
  (api)/api/meetings/        Read-only meeting API routes
  (public)/                  Home, meeting CRUD, current, and detail pages
  (public)/meetings/error.tsx Meeting route error boundary
  globals.css               Shared responsive and print styles
  layout.tsx                Root layout and global metadata
  not-found.tsx             Application-wide not-found page
  robots.ts                 Robots policy
  sitemap.ts                Sitemap for a configured public site URL
components/                 Shared navigation, cards, meeting forms, and program UI
lib/
  actions.ts                Validated meeting Server Actions
  meeting-dates.ts          Ward timezone, date validation, and formatting
  meeting-form-state.ts     Shared form action state
  meeting-validation.ts     Zod meeting form schema and parsing
  meetings-api.ts           API response validation and status codes
  meetings-db.ts            Neon access, schema initialization, and sample seeding
  meeting-pagination.ts     Search-list page size and page validation
  site-config.ts            Optional public site URL validation
  types.ts                  Meeting data types
public/                     Static assets, including the local hero illustration
tests/                      Date and API helper tests
spec.md                     Current implementation and product specification
```

## Requirements

- Node.js 22.6 or newer (the test command uses Node's built-in TypeScript
  stripping support).
- npm.

A Neon PostgreSQL connection is required to run the application. In Vercel,
use the existing Neon integration and provide its connection string through
the server-side environment.

## Installation and development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Set `DATABASE_URL` to the Neon connection string, or use `POSTGRES_URL` as a
fallback. These are server-side variables and must not use a `NEXT_PUBLIC_`
prefix. The application creates the `meetings` table and date index if needed,
then inserts the five sample records with `ON CONFLICT DO NOTHING`, so
initialization and repeated requests do not overwrite existing records. It
also creates an ID sequence for newly created meetings. In Vercel, make sure
the existing Neon connection is exposed as one of these variables.

Set `SITE_URL` to the absolute public site origin (for example,
`https://ward.example.org`) to enable absolute canonical URLs and populate
`sitemap.xml`. It must be an HTTP or HTTPS origin without a path, query,
credentials, or fragment. Without it, canonical URLs and sitemap entries are
omitted.

```text
DATABASE_URL=postgresql://...
SITE_URL=https://ward.example.org
```

Do not commit `.env` files or expose database credentials to client code.

## Checks and tests

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

The tests cover ward-local Sunday calculations, date validation and formatting,
pagination parsing and bounds, API response codes for malformed IDs and dates,
meeting form validation, and validation of the optional public site URL.

## Production build and deployment

Build and run the production server locally:

```bash
npm run build
npm run start
```

The project uses the standard Next.js Node.js server output and can be deployed
to Vercel using the repository's existing Next.js integration. Configure
`DATABASE_URL` (or `POSTGRES_URL`) in the deployment environment for Neon, and
configure `SITE_URL` if canonical URLs and the sitemap are desired. Keep
database variables server-side.

## API

| Method and path | Behavior |
| --- | --- |
| `GET /api/meetings` | Return all sample records, newest first. |
| `GET /api/meetings?date=YYYY-MM-DD` | Return records for a valid date, or an empty array when none match. Invalid dates return `400`. |
| `GET /api/meetings/:id` | Return one record. Invalid or unsafe IDs return `400`; unknown positive IDs return `404`. |

These endpoints are public, read-only, and backed by the same Neon records as
the pages. The robots policy discourages indexing `/api/`, but that is not an
access-control mechanism.

## Limitations and future work

- Add authentication and authorization before exposing real or personal
  meeting information or write operations.
- Consider calendar, search/filter, reusable templates, and dedicated PDF
  export after the required workflows are agreed.
- Add integration/browser tests and accessibility/performance measurements as
  the application grows.
