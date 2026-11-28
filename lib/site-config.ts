export function getPublicSiteUrl(): URL | undefined {
  const configuredUrl = process.env.SITE_URL;

  if (!configuredUrl) {
    return undefined;
  }

  let siteUrl: URL;

  try {
    siteUrl = new URL(configuredUrl);
  } catch {
    throw new Error('SITE_URL must be an absolute HTTP or HTTPS URL.');
  }

  if (
    !['http:', 'https:'].includes(siteUrl.protocol) ||
    siteUrl.username ||
    siteUrl.password ||
    siteUrl.pathname !== '/' ||
    siteUrl.search ||
    siteUrl.hash
  ) {
    throw new Error('SITE_URL must contain only an HTTP or HTTPS site origin.');
  }

  return siteUrl;
}
