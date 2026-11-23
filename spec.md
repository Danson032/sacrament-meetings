# Sacrament Meeting Planner — Project Specification

## 1. Purpose and current status

The Sacrament Meeting Planner is a Next.js web application for browsing,
reviewing, and printing sacrament meeting programs for Meru Ward. The current
application is a **read-only demonstration**, not a complete meeting-management
system. It uses five sample records seeded into Neon PostgreSQL and accepts no
user writes.

This specification distinguishes implemented behavior from partial capabilities
and future product requirements. It reflects the code in this repository as of
2026-11-19.

## 2. Intended users and problem

The product is intended to help ward or branch leaders, clerks, coordinators,
and other authorized participants prepare or review meeting programs. Those
roles and the exact planning workflow are not implemented or confirmed.

Preparing a program can involve coordinating leaders, announcements, hymns,
prayers, speakers, and other agenda items. This application currently provides
a place to view sample program details and print them; it does not yet support
the preparation or coordination work of creating and maintaining those
programs.

## 3. Implemented features

### User-facing routes

- **`/` — Home:** Describes the current read-only planner and links to all
  meetings and the current-meeting view.
- **`/meetings` — All meetings:** Lists sample meetings in descending date
  order, five per page. Search matches date, meeting type, presiding and
  conducting leaders, and speaker names; the search is retained across pages.
  Each card shows the date, meeting type, leaders, opening hymn, and a link to
  the detail page. Empty results and invalid page numbers are handled.
- **`/meetings/[id]` — Meeting detail:** Displays the meeting date and type,
  leaders, announcements, ward and stake business, hymns, prayers, speakers,
  and musical numbers. Invalid and unknown IDs use a not-found page.
- **`/meetings/current` — Current meeting:** Calculates the most recent Sunday
  in the `Africa/Nairobi` timezone and redirects to a record with that exact
  date. If none exists, it explains that no program is available and links to
  all meetings.

The sample records currently cover 2026-10-11 through 2026-11-08. No record
exists for 2026-11-15, so the current-meeting route shows its empty state.

### Printing and shared interface

- A browser print button opens the native print dialog. Print styles hide
  navigation and controls and format the program for printing. This is not a
  server-generated PDF export.
- Shared header, navigation, footer, meeting cards, and meeting details are
  implemented as reusable components.
- The site includes a keyboard skip link, visible focus styles, semantic
  headings and meeting-card definition lists, responsive layouts, and loading,
  empty, error, and not-found states.

### Read-only API

- **`GET /api/meetings`** returns all sample records, newest first.
- **`GET /api/meetings?date=YYYY-MM-DD`** filters by an actual calendar date.
  Malformed or impossible dates return `400`; a valid date with no records
  returns `200` with an empty array.
- **`GET /api/meetings/:id`** returns a record for a positive safe integer ID.
  Malformed or unsafe IDs return `400`; an unknown but well-formed ID returns
  `404`.
- Other HTTP methods are not implemented and receive the framework's
  unsupported-method response.

These endpoints expose the same public sample data used by the pages. They do
not create, update, or delete records.

## 4. Partially implemented capabilities

- **Meeting planning:** Programs can be reviewed and printed, but no form or
  workflow exists to prepare, save, change, or remove a program.
- **Current meeting selection:** The route applies a ward-local Sunday date
  calculation and exact-date lookup against the database-seeded sample records.
- **Data integrity:** API query values and route IDs are validated. Table
  creation and sample seeding are idempotent; schema migrations and
  persistence-layer validation are not implemented.
- **Loading state:** A route-level loading fallback is provided for navigation
  while asynchronous database-backed meeting routes render.
- **SEO configuration:** Page metadata is present. `SITE_URL` enables canonical
  URLs where defined and absolute sitemap links. Without that setting, no
  deployment-specific host is invented and the sitemap has no entries.

## 5. Not implemented

- Meeting creation, editing, deletion, or other write operations.
- Database backups, migrations, or recovery procedures.
- User accounts, authentication, authorization, and role-based permissions.
- Calendar views or advanced filters beyond meeting text search.
- Sharing, notifications, approval workflows, or participant invitations.
- A generated PDF or document export; printing uses the browser.
- Localization beyond the current English interface and Kenya locale date
  presentation.
- Formal product, accessibility, browser-compatibility, or performance targets.

## 6. Functional requirements

### Current implementation requirements

1. Serve the home, meeting list, current meeting, and individual meeting pages.
2. Display the program fields present in the `SacramentMeeting` data type.
3. Use a consistent descending meeting-date order on the list and API.
4. Determine the current Sunday using the `Africa/Nairobi` timezone.
5. Provide clear empty and not-found feedback when a matching program is
   unavailable.
6. Allow a user to open the browser print dialog for a meeting program.
7. Expose read-only meeting list and detail APIs with appropriate validation
   and HTTP status codes.

### Future product requirements

These are not current capabilities or commitments. They require product
decisions and implementation:

1. Confirm user roles and the meeting-preparation and review workflow.
2. Define editable program fields, required values, validation, and agenda
   ordering rules.
3. Add authorized create, read, update, and delete operations.
4. Define database schema migrations, backup, and recovery procedures.
5. Add authentication and server-side authorization before storing real
   participant information or allowing writes.
6. Confirm whether calendar, advanced filters, sharing, notifications, or export
   features are needed.

## 7. Non-functional requirements

### Implemented safeguards and design choices

- Responsive CSS adapts page widths, meeting grids, header, and leaders to
  desktop and narrower viewports.
- Interactive elements have visible keyboard focus; navigation is labeled;
  the main content has a skip link; meeting-card fields use definition-list
  semantics.
- Reduced-motion preferences are considered for loading animation and
  transitions.
- Program printing has separate print styles.
- API date and ID inputs are validated before lookup. General response headers
  disable content sniffing and framing and constrain referrer and browser
  feature behavior.
- The homepage illustration is served locally; image configuration does not
  allow arbitrary remote hosts.
- Page titles and descriptions are provided. The current-meeting utility route
  is marked no-index. `/api/` is disallowed in robots instructions; this is a
  crawler directive, not access control.

### Goals requiring continued verification

- Validate contrast, keyboard behavior, screen-reader use, and layouts with
  assistive technology and real mobile/tablet/desktop browsers.
- Measure Lighthouse and Core Web Vitals against an agreed target. No new
  Lighthouse score is claimed by this specification.
- Establish error monitoring, availability, recovery, and performance budgets
  if the application becomes a production service.
- Protect real meeting and personal information with an appropriate data
  classification, access controls, retention policy, and server-side
  authorization before introducing persistence.

## 8. Architecture and technologies

### Application architecture

- Next.js App Router with server-rendered pages and route handlers.
- React Server Components are used by default. Client Components are limited
  to pathname-aware navigation, browser printing, and the error boundary.
- Public routes are organized under `app/(public)/`; API route handlers are
  organized under `app/(api)/` without changing their public paths.
- Meeting pages and API handlers use asynchronous operations in the
  server-side `lib/meetings-db.ts`; API responses use shared validation helpers
  in `lib/meetings-api.ts`.
- The Neon data layer reads `DATABASE_URL`, falling back to `POSTGRES_URL`,
  creates the `meetings` table and date index if missing, and inserts the five
  original sample records with conflict-safe seeding. Nested meeting fields
  are stored in JSONB. Credentials are only read in server code.
- `lib/meeting-dates.ts` contains ward-timezone Sunday calculation, strict
  ISO-calendar-date validation, and timezone-stable formatting.
- Shared UI lives under `components/`; global responsive and print styles live
  in `app/globals.css`.
- The five records remain as idempotent seed data; reads are served from Neon.
  The application exposes no meeting writes.

### Technology

- Next.js 16.4.6
- React and React DOM 19.3.0
- Neon PostgreSQL via `@neondatabase/serverless`
- TypeScript 5 with strict type checking
- Tailwind CSS 4.3.3 imported by the global stylesheet, alongside custom CSS
- Geist via `next/font`
- ESLint 9 with Next.js Core Web Vitals and TypeScript configurations
- Node.js built-in test runner with native TypeScript type stripping; no
  separate test framework is installed

### Repository structure

```text
app/
  (api)/api/meetings/        Read-only JSON route handlers
  (public)/                  Home, list, current, detail, loading, and not-found UI
  error.tsx                 Shared route error boundary
  globals.css               Global, responsive, and print styles
  layout.tsx                Root layout and metadata
  not-found.tsx             Application-wide not-found page
  robots.ts                 Robots instructions
  sitemap.ts                Sitemap based on SITE_URL
components/                 Shared site and meeting UI
lib/                        Date, Neon data, pagination, API, and site helpers
public/                     Static images and starter assets
tests/                      Date and API helper tests
```

## 9. Data and security constraints

- The five sample records are seeded by `lib/meetings-db.ts`; meeting reads are
  served from Neon. No user changes are accepted.
- Current names and program details are included as sample records. Confirm
  that any real names or details are approved for public display before using
  this project with actual ward data.
- The pages and API have no authentication. Do not treat robots rules or
  obscurity of numeric IDs as privacy controls.
- Database credentials are configured only through server-side
  `DATABASE_URL` or `POSTGRES_URL` variables.
- `.env*`, build output, and dependency folders are Git-ignored.
- `SITE_URL` is an optional absolute public HTTP or HTTPS origin. It is used
  only for metadata and sitemap generation and is not a secret.

### Future database and access controls

Before using this project with real meeting information, confirm privacy and
access requirements. Add schema migrations, backup and recovery procedures,
and integration tests as needed. Keep credentials in server-side environment
variables and perform authentication, authorization, and input validation at
the server trust boundary before adding write operations.

## 10. Verification

The repository provides these checks:

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

Automated tests cover ward-local Sunday boundaries, year changes, date
validation and formatting, page parsing and clamping, API responses for invalid
IDs, unknown IDs, and invalid dates, and optional site URL validation.
Browser-based accessibility and Lighthouse audits are not currently automated.

## 11. Expected future improvements

1. Agree on the user roles, workflows, privacy needs, and success criteria.
2. Replace or supplement demonstration records with approved meeting data.
3. Implement validated meeting management and enforce authorization on the
   server.
4. Add integration and browser tests for complete user workflows.
5. Measure and improve accessibility and performance against explicit targets.
6. Add advanced search, calendar, reusable templates, sharing, or export only
   if confirmed as requirements.
