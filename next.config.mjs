import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

export default function nextConfig(phase) {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  /** @type {import('next').NextConfig} */
  return {
    output: 'export',
    assetPrefix: isDev ? undefined : '/_zones/household-api-docs',
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
  };
}
