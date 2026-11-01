import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { API_APPS } from './apiApps';
import { getApiAppProblems, getSvgLogoProblems } from '@/utils/apiApps';
import { SUPPORTED_COUNTRY_IDS } from '@/utils/countryDocs';

const PUBLIC_DIR = fileURLToPath(new URL('../../public', import.meta.url));
const LOGO_FILES = readdirSync(`${PUBLIC_DIR}/api-apps`).filter((file) => file !== '.DS_Store');

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

  it('keeps no logo file that no entry uses', () => {
    const logos = API_APPS.map((app) => app.logo);
    expect(LOGO_FILES.filter((file) => !logos.includes(`/api-apps/${file}`))).toEqual([]);
  });

  it('keeps every SVG logo to plain shapes', () => {
    for (const file of LOGO_FILES.filter((name) => name.endsWith('.svg'))) {
      const svg = readFileSync(`${PUBLIC_DIR}/api-apps/${file}`, 'utf8');
      expect(getSvgLogoProblems(svg), file).toEqual([]);
    }
  });
});
