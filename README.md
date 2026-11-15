# Sacrament Meeting Planner

A Next.js application for browsing, reviewing, and printing sample sacrament
meeting programs for Meru Ward. This is currently a read-only demonstration:
meeting records are defined in source code and are not saved to a database.

## Features

- Browse meeting programs and dates on the all-meetings page.
- Review leaders, announcements, ward and stake business, hymns, prayers,
  speakers, and musical numbers on a meeting detail page.
- Open the current Sunday's program, calculated in the `Africa/Nairobi`
  timezone, or see an empty state when no matching program exists.
- Print a meeting program using a print-specific layout.
- Use keyboard-accessible navigation, skip-to-content link, responsive layouts,
  and clear empty, loading, not-found, and error states.
- Read-only JSON endpoints for listing meetings and retrieving an individual
  meeting, with validation for dates and IDs.

There are no create, edit, or delete screens, user accounts, or persistent
storage. The included records are demonstration data and must not be treated as
an authoritative ward schedule.

## Technology

- Next.js 16 App Router and React 19
- TypeScript with strict type checking
- Tailwind CSS 4 (imported in the global stylesheet) and project-specific CSS
- Geist loaded with `next/font`
- Node.js built-in test runner (no additional test framework)

The home, meeting list, and known sample-meeting detail pages are prerendered.
The current-meeting page is rendered per request because it depends on the
ward-local current date.

## Project structure

```text
app/
  api/meetings/             Read-only meeting API routes
  meetings/                 Meeting list, current meeting, and detail pages
  error.tsx                 Route error boundary
  globals.css               Shared responsive and print styles
  layout.tsx                Root layout and global metadata
  not-found.tsx             Application-wide not-found page
  robots.ts                 Robots policy
  sitemap.ts                Sitemap for a configured public site URL
components/                 Shared header, navigation, cards, and program UI
lib/
  meeting-dates.ts          Ward timezone, date validation, and formatting
  meetings-api.ts           API response validation and status codes
  meetings-db.ts            In-source demonstration meeting records
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

No database, API key, or external service is required to run the application.

## Installation and development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

All environment variables are optional. Set `SITE_URL` to the absolute public
site origin (for example, `https://ward.example.org`) to enable absolute
canonical URLs and populate `sitemap.xml`. It must be an HTTP or HTTPS origin
without a path, query, credentials, or fragment. Without it, the application
still runs normally; canonical URLs and sitemap entries are omitted.

```text
SITE_URL=https://ward.example.org
```

Do not commit `.env` files. Environment files are ignored by Git.

## Checks and tests

```bash
npm run lint
npx tsc --noEmit
npm test
```

The tests cover ward-local Sunday calculations, date validation and formatting,
meeting filtering, API response codes for malformed IDs, unknown IDs, and
invalid dates, and validation of the optional public site URL.

## Production build and deployment

Build and run the production server locally:

```bash
npm run build
npm run start
```

The project uses the standard Next.js Node.js server output and can be deployed
to Vercel using the repository's existing Next.js integration. Configure
`SITE_URL` in the deployment environment if canonical URLs and the sitemap are
desired. No database configuration is currently used.

## API

| Method and path | Behavior |
| --- | --- |
| `GET /api/meetings` | Return all sample records, newest first. |
| `GET /api/meetings?date=YYYY-MM-DD` | Return records for a valid date, or an empty array when none match. Invalid dates return `400`. |
| `GET /api/meetings/:id` | Return one record. Invalid or unsafe IDs return `400`; unknown positive IDs return `404`. |

These endpoints are public, read-only, and backed by the same in-source sample
records as the pages. The robots policy discourages indexing `/api/`, but that
is not an access-control mechanism.

## Limitations and future work

- Replace the demonstration records with approved meeting information and a
  persistent data store.
- Add meeting creation, editing, deletion, and server-side validation.
- Add authentication and authorization before exposing real or personal
  meeting information or write operations.
- Consider calendar, search/filter, reusable templates, and dedicated PDF
  export after the required workflows are agreed.
- Add integration/browser tests and accessibility/performance measurements as
  the application grows.
