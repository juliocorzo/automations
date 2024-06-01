'use strict'

const nrExternals = require('@newrelic/next/load-externals')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
  transpilePackages: ["@mui/x-data-grid"],
  webpack: (config) => {
    nrExternals(config)
    return config
  }
}

module.exports = nextConfig
