const WARD_TIME_ZONE = 'Africa/Nairobi';

export function getMostRecentSundayDate(now: Date): string {
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
