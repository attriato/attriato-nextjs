/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  outputFileTracingRoot: import.meta.dirname,
  async rewrites() {
    return [
      { source: "/data/:path*", destination: "/api/data/:path*" },
    ];
  },
  async headers() {
    return [
      {
        // Hashed build assets never change content under the same URL,
        // so browsers and CDNs can cache them forever.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Static images and media assets in public/images
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
