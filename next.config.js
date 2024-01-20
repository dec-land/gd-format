/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.buymeacoffee.com',
            port: '',
            pathname: '/button-api/**',
          },
        ],
      },
}

module.exports = nextConfig
