module.exports = {
  images: {
    domains: ['admin.desh365.top' , 'http://api.aladhan.com' , 'https://news-nextjs-phi.vercel.app' ,  'https://newsportalnextjs.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.desh365.top',
        port: '',
        pathname: '/public/storage/post-image/**',
      },
    ],
  },
};