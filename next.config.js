/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
  transpilePackages: ["@mui/x-data-grid"],
}

module.exports = nextConfig
