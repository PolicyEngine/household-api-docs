import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

export default function nextConfig(phase) {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const zoneAssetPrefix =
    process.env.NEXT_PUBLIC_ZONE_ASSET_PREFIX ??
    (isDev ? '' : '/_zones/household-api-docs');

  /** @type {import('next').NextConfig} */
  return {
    output: 'export',
    assetPrefix: zoneAssetPrefix || undefined,
    env: {
      NEXT_PUBLIC_ZONE_ASSET_PREFIX: zoneAssetPrefix,
    },
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
  };
}
