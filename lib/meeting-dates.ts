const WARD_TIME_ZONE = 'Africa/Nairobi';

export function isValidMeetingDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false;
  }

  const parsedDate = new Date(`${date}T00:00:00.000Z`);
  return (
    Number.isFinite(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === date
  );
}

export function formatMeetingDate(
  date: string,
  options: Intl.DateTimeFormatOptions = {},
): string {
  if (!isValidMeetingDate(date)) {
    throw new RangeError(`Invalid meeting date: ${date}`);
  }

  return new Intl.DateTimeFormat('en-KE', {
    ...options,
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00.000Z`));
}

export function getMostRecentSundayDate(now: Date): string {
  if (!Number.isFinite(now.getTime())) {
    throw new RangeError('The current date must be valid.');
  }

  const dateParts = new Intl.DateTimeFormat('en', {
    timeZone: WARD_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);

  const getPart = (type: 'year' | 'month' | 'day'): number => {
    const value = dateParts.find((part) => part.type === type)?.value;

    if (value === undefined) {
      throw new Error(`Unable to determine ${type} in the ward's local date.`);
    }

    return Number(value);
  };

  const sunday = new Date(
    Date.UTC(getPart('year'), getPart('month') - 1, getPart('day')),
  );
  sunday.setUTCDate(sunday.getUTCDate() - sunday.getUTCDay());

  return sunday.toISOString().slice(0, 10);
}
