/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'customboxesmarket.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'customboxesmarket.com',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['msedge-tts', 'ws', 'bufferutil', 'utf-8-validate', '@whiskeysockets/baileys'],
  },
};

export default nextConfig;
