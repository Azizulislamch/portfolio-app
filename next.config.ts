/** @type {import('next').NextConfig} */
const nextConfig = {
  skipProxyUrlNormalize: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'user-attachments.githubusercontent.com',
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;