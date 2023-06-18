/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
    MAPA_KEY:process.env.MAPA_KEY
  }
}

module.exports = nextConfig
