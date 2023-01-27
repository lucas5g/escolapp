/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites(){
    return [
      {
        source: '/turmas',
        destination: '/groups'
      },
      {
        source: '/jogos',
        destination: '/games'
      },
      {
        source: '/equipes',
        destination: '/teams'
      },
      {
        source: '/pontos',
        destination: '/points'
      },
      {
        source: '/locais',
        destination: '/places'
      },
      {
        source: '/modalidades',
        destination: '/modalities'
      },
      {
        source: '/usuarios',
        destination: '/users'
      },
    ]
  }
}

module.exports = nextConfig
