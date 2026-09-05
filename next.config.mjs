/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: import.meta.dirname,
  async rewrites() {
    return [
      { source: "/data/:path*", destination: "/api/data/:path*" },
    ];
  },
};

export default nextConfig;
