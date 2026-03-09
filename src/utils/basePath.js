/**
 * Base path utilities for household API docs.
 *
 * The app is deployed standalone on Vercel and also embedded at
 * policyengine.org/us/api/ via a Vercel rewrite. We detect the
 * context at runtime so asset URLs and internal links work in both.
 */

const APP_PREFIX = '/us/api';

function getBasePath() {
  if (typeof window !== 'undefined') {
    if (window.location.pathname.startsWith(APP_PREFIX)) {
      return APP_PREFIX;
    }
  }
  return '';
}

/** Prefix a public asset path (e.g. /assets/logos/policyengine/white.svg) */
export function assetUrl(path) {
  const base = getBasePath();
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/** Prefix an internal route path for Link href */
export function linkUrl(path) {
  const base = getBasePath();
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}
