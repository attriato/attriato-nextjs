/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: import.meta.dirname,
  async rewrites() {
    return [
      { source: "/data/:path*", destination: "/api/data/:path*" },
    ];
  },
  async headers() {
    return [
      {
        source: "/_next/data/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=31536000",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=31536000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
