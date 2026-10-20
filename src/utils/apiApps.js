export const INTEGRATION_LABELS = {
  'hosted-api': 'Hosted household API',
  'self-hosted-api': 'Self-hosted household API',
  'web-api': 'PolicyEngine web API',
  'open-source-model': 'Runs the open-source model',
};

const NAME_COLLATOR = new Intl.Collator('en', { sensitivity: 'base', numeric: true });

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const LOGO_PATTERN = /^\/api-apps\/[a-z0-9-]+\.(?:png|svg|webp)$/;
const MAX_DESCRIPTION_LENGTH = 200;

export function compareApiAppsByName(a, b) {
  return NAME_COLLATOR.compare(a.name, b.name) || NAME_COLLATOR.compare(a.id, b.id);
}

export function sortApiApps(apps) {
  return [...apps].sort(compareApiAppsByName);
}

// Splits apps into those serving the page's country and the rest, each in
// name order, so the country pages list local apps first.
export function partitionApiAppsByCountry(apps, countryId) {
  const sorted = sortApiApps(apps);
  return {
    local: sorted.filter((app) => app.countries.includes(countryId)),
    other: sorted.filter((app) => !app.countries.includes(countryId)),
  };
}

export function getApiAppsPreview(apps, countryId, limit) {
  const { local, other } = partitionApiAppsByCountry(apps, countryId);
  return [...local, ...other].slice(0, Math.max(0, limit));
}

export function getAppMonogram(name) {
  const words = name.match(/[\p{L}\p{N}]+/gu) ?? [];
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

// Returns every reason an entry cannot be listed; an empty list means the
// entry is complete. Logo files are checked separately because this module
// also runs in the browser.
export function getApiAppProblems(app, supportedCountryIds) {
  const problems = [];

  if (!ID_PATTERN.test(app.id ?? '')) problems.push('id must be kebab-case');
  if (!app.name?.trim()) problems.push('name is required');
  if (!app.organization?.trim()) problems.push('organization is required');
  if (!isHttpsUrl(app.url)) problems.push('url must be an https URL');

  const description = app.description ?? '';
  if (!description.trim()) problems.push('description is required');
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    problems.push(`description must be at most ${MAX_DESCRIPTION_LENGTH} characters`);
  }
  if (description && !description.endsWith('.')) problems.push('description must end with a period');

  if (!Array.isArray(app.countries) || app.countries.length === 0) {
    problems.push('countries must list at least one country');
  } else {
    for (const countryId of app.countries) {
      if (!supportedCountryIds.includes(countryId)) problems.push(`unsupported country: ${countryId}`);
    }
    if (new Set(app.countries).size !== app.countries.length) problems.push('countries repeat');
  }

  if (!(app.integration in INTEGRATION_LABELS)) problems.push(`unknown integration: ${app.integration}`);

  if (app.logo !== null && !LOGO_PATTERN.test(app.logo ?? '')) {
    problems.push('logo must be null or a /api-apps/<name>.<png|svg|webp> path');
  }

  if (!Array.isArray(app.evidence) || app.evidence.length === 0) {
    problems.push('evidence must cite at least one public page');
  } else {
    for (const item of app.evidence) {
      if (!item.label?.trim()) problems.push('evidence label is required');
      if (!isHttpsUrl(item.url)) problems.push(`evidence url must be https: ${item.url}`);
    }
  }

  return problems;
}
