// Public files are served through policyengine.org's zone proxy in production,
// so their URLs need the zone asset prefix. vercel.json maps each prefixed
// folder back to the file in public/.
const ZONE_ASSET_PREFIX = process.env.NEXT_PUBLIC_ZONE_ASSET_PREFIX ?? '';

export function zoneAssetPath(path) {
  return `${ZONE_ASSET_PREFIX}${path}`;
}
