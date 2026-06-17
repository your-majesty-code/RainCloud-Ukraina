/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The static-HTML prototype lives in /archive and must never be compiled.
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
