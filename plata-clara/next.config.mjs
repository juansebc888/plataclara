/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Sized for the low-end Android screens this site targets.
    deviceSizes: [360, 414, 640, 828, 1080, 1200],
    imageSizes: [64, 96, 128, 256],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
