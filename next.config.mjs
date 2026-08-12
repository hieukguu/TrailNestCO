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
      { protocol: "https", hostname: "ketlmtn.com" },
      { protocol: "https", hostname: "outdoormaster.com" },
      { protocol: "https", hostname: "sunjoyshop.com" },
    ],
  },
};

export default nextConfig;
