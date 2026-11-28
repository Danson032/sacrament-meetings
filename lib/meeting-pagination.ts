export const MEETINGS_PER_PAGE = 5;

export function parsePageNumber(
  rawPage: string | string[] | undefined,
): number {
  if (typeof rawPage !== 'string' || !/^[1-9]\d*$/.test(rawPage)) {
    return 1;
  }

  const page = Number(rawPage);
  return Number.isSafeInteger(page) ? page : 1;
}

export function clampPageNumber(page: number, totalPages: number): number {
  return Math.min(Math.max(1, page), Math.max(1, totalPages));
}
