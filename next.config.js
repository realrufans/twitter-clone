/** @type {import('next').NextConfig} */
const defaultTheme = require("tailwindcss/defaultTheme");

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: 'http://localhost:3000',
    NEXTAUTH_URL_INTERNAL: 'http://localhost:3000'
  },
  images: {
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
  },
  theme: {
    screens: {
      'xsm': "375px",
      ...defaultTheme.screens,
    },
  },
};

module.exports = nextConfig;
