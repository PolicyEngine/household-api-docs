/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const assetPrefix = isDev ? undefined : '/_zones/household-api-docs';

const nextConfig = {
  output: 'export',
  ...(assetPrefix ? { assetPrefix } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
