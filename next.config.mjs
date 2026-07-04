/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Hostinger shared hosting (no Node server needed)
  output: "export",
  trailingSlash: true,
  images: {
    // next/image optimization requires a server — serve remote images as-is
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
