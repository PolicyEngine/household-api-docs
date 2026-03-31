/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: '/_zones/household-api-docs',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
