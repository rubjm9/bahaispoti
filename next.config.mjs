/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'canciones.bahai.es', pathname: '/**' },
      { protocol: 'http', hostname: 'canciones.bahai.es', pathname: '/**' },
      { protocol: 'https', hostname: 'spotify-clone-oguz3.web.app', pathname: '/**' },
    ],
  },
};

export default nextConfig;
