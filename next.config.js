import('next').NextConfig

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        //destination: 'http://localhost/akagami/Github/projet-react/inge-web-projet-booty-byte-er/backend/:path*'
        destination: 'http://localhost/inge-web-projet-booty-byte-er/backend/:path*'
        //destination: 'http://localhost/projet/inge-web-projet-booty-byte-er/backend/:path*'
      }
    ]
  }
}

module.exports = nextConfig