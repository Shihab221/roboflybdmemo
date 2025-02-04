// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Add the correct domain
      },
    ],
    domains: ['encrypted-tbn0.gstatic.com'],
  },
};

module.exports = nextConfig;
