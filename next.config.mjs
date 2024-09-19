/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'o41ofmrwqoplby9c.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
