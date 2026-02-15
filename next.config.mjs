/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { hostname: "maps.googleapis.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com" },
    ],
  },
}

export default nextConfig
