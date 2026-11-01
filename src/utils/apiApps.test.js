import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  compareApiAppsByName,
  getApiAppProblems,
  getApiAppsPreview,
  getAppMonogram,
  partitionApiAppsByCountry,
  sortApiApps,
  usesPolicyEngineApi,
} from './apiApps';

const COUNTRY_IDS = ['us', 'uk'];

const countriesArb = fc.subarray(COUNTRY_IDS, { minLength: 1 });

const integrationArb = fc.constantFrom(
  'hosted-api',
  'self-hosted-api',
  'web-api',
  'open-source-model',
  null,
);

const appsArb = fc
  .array(
    fc.record({
      name: fc.string({ minLength: 1, maxLength: 12 }),
      countries: countriesArb,
      integration: integrationArb,
    }),
    { maxLength: 25 },
  )
  .map((records) => records.map((record, index) => ({ id: `app-${index}`, ...record })));

const ids = (apps) => apps.map((app) => app.id);

function isSortedByName(apps) {
  return apps.every((app, index) => index === 0 || compareApiAppsByName(apps[index - 1], app) <= 0);
}

describe('partitionApiAppsByCountry', () => {
  it('splits the apps into two disjoint lists that together hold every app once', () => {
    fc.assert(
      fc.property(appsArb, fc.constantFrom(...COUNTRY_IDS), (apps, countryId) => {
        const { local, other } = partitionApiAppsByCountry(apps, countryId);
        expect([...ids(local), ...ids(other)].sort()).toEqual(ids(apps).sort());
      }),
    );
  });

  it('puts an app in the local list exactly when it serves the country', () => {
    fc.assert(
      fc.property(appsArb, fc.constantFrom(...COUNTRY_IDS), (apps, countryId) => {
        const { local, other } = partitionApiAppsByCountry(apps, countryId);
        expect(local.every((app) => app.countries.includes(countryId))).toBe(true);
        expect(other.some((app) => app.countries.includes(countryId))).toBe(false);
      }),
    );
  });

  it('orders each list by name whatever order the data file uses', () => {
    const appsWithPermutationArb = appsArb.chain((apps) =>
      fc.tuple(
        fc.constant(apps),
        fc.shuffledSubarray(apps, { minLength: apps.length, maxLength: apps.length }),
      ),
    );
    fc.assert(
      fc.property(appsWithPermutationArb, fc.constantFrom(...COUNTRY_IDS), ([apps, shuffled], countryId) => {
        const fromData = partitionApiAppsByCountry(apps, countryId);
        const fromShuffled = partitionApiAppsByCountry(shuffled, countryId);
        expect(isSortedByName(fromData.local)).toBe(true);
        expect(isSortedByName(fromData.other)).toBe(true);
        expect(ids(fromShuffled.local)).toEqual(ids(fromData.local));
        expect(ids(fromShuffled.other)).toEqual(ids(fromData.other));
      }),
    );
  });

  it('does not reorder the input array', () => {
    fc.assert(
      fc.property(appsArb, (apps) => {
        const before = ids(apps);
        sortApiApps(apps);
        partitionApiAppsByCountry(apps, 'us');
        expect(ids(apps)).toEqual(before);
      }),
    );
  });
});

describe('getApiAppsPreview', () => {
  it('returns the first API apps of the local-then-other order, up to the limit', () => {
    fc.assert(
      fc.property(appsArb, fc.constantFrom(...COUNTRY_IDS), fc.integer({ min: -2, max: 30 }), (apps, countryId, limit) => {
        const apiApps = apps.filter(usesPolicyEngineApi);
        const preview = getApiAppsPreview(apps, countryId, limit);
        const { local, other } = partitionApiAppsByCountry(apiApps, countryId);
        expect(preview).toHaveLength(Math.min(Math.max(0, limit), apiApps.length));
        expect(ids(preview)).toEqual(ids([...local, ...other]).slice(0, preview.length));
      }),
    );
  });

  it('never previews an app that does not call an API', () => {
    fc.assert(
      fc.property(appsArb, fc.constantFrom(...COUNTRY_IDS), (apps, countryId) => {
        expect(getApiAppsPreview(apps, countryId, 30).every(usesPolicyEngineApi)).toBe(true);
      }),
    );
  });
});

describe('getAppMonogram', () => {
  it('returns at most two uppercase initials for ASCII names', () => {
    fc.assert(
      fc.property(fc.stringMatching(/^[a-zA-Z0-9 .'?-]{0,40}$/), (name) => {
        expect(getAppMonogram(name)).toMatch(/^[A-Z0-9]{0,2}$/);
      }),
    );
  });

  it('takes one initial from each of the first two words', () => {
    expect(getAppMonogram('Benefit Navigator')).toBe('BN');
    expect(getAppMonogram('MyFriendBen')).toBe('M');
    expect(getAppMonogram("What's It To Me?")).toBe('WI');
    expect(getAppMonogram('LedgerGov.UK')).toBe('L');
  });
});

describe('getApiAppProblems', () => {
  const validApp = {
    id: 'example-app',
    name: 'Example app',
    organization: 'Example organization',
    url: 'https://example.org/',
    description: 'Screens households for benefits.',
    countries: ['us'],
    integration: 'hosted-api',
    logo: null,
    evidence: [{ label: 'How it uses PolicyEngine', url: 'https://example.org/about' }],
  };

  it('accepts a complete entry', () => {
    expect(getApiAppProblems(validApp, COUNTRY_IDS)).toEqual([]);
  });

  it('accepts an entry whose integration its maker has not settled', () => {
    expect(getApiAppProblems({ ...validApp, integration: null }, COUNTRY_IDS)).toEqual([]);
  });

  it.each([
    ['an http product URL', { url: 'http://example.org/' }],
    ['no public evidence', { evidence: [] }],
    ['an http evidence URL', { evidence: [{ label: 'About', url: 'http://example.org/' }] }],
    ['an unsupported country', { countries: ['ca'] }],
    ['no countries', { countries: [] }],
    ['an unknown integration', { integration: 'carrier-pigeon' }],
    ['a missing integration', { integration: undefined }],
    ['a description without a final period', { description: 'Screens households' }],
    ['a logo outside the api-apps folder', { logo: '/assets/logo.png' }],
    ['an id that is not kebab-case', { id: 'Example_App' }],
  ])('rejects %s', (_, change) => {
    expect(getApiAppProblems({ ...validApp, ...change }, COUNTRY_IDS)).not.toEqual([]);
  });
});
