import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { API_APPS } from './apiApps';
import { getApiAppProblems } from '@/utils/apiApps';
import { SUPPORTED_COUNTRY_IDS } from '@/utils/countryDocs';

const PUBLIC_DIR = fileURLToPath(new URL('../../public', import.meta.url));

describe('API_APPS', () => {
  it.each(API_APPS.map((app) => [app.id, app]))('%s is a complete, listable entry', (_, app) => {
    expect(getApiAppProblems(app, SUPPORTED_COUNTRY_IDS)).toEqual([]);
  });

  it('uses each id and name once', () => {
    expect(new Set(API_APPS.map((app) => app.id)).size).toBe(API_APPS.length);
    expect(new Set(API_APPS.map((app) => app.name.toLowerCase())).size).toBe(API_APPS.length);
  });

  it('points every logo at a file in public/', () => {
    for (const app of API_APPS.filter((entry) => entry.logo)) {
      expect(existsSync(`${PUBLIC_DIR}${app.logo}`), app.logo).toBe(true);
    }
  });
});
