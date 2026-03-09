/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/us/api',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
