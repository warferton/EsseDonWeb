/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    images: {
    domains: [
      'pngmind.com',
      'pngimg.com',
      'rskrf.ru',
      'i.imgur.com'
    ],
  },
}
 
module.exports = nextConfig