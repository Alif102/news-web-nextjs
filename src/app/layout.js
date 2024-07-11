import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './Components/Navbar';
// import Ad from './Components/Ad';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'News Portal',
  openGraph: {
    title: 'News Portal',
    description: 'News Portal is a...',
    url: 'https://news-web-nextjs.vercel.app',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3355748505131146" crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>
  <div className="container xl:max-w-[1300px] lg:max-w-4xl md:max-w-2xl mx-auto">
    <div className="fixed right-0 left-0 top-0 z-50  w-full">
      <div className="container lg:max-w-4xl xl:max-w-[1300px] md:max-w-2xl mx-auto">
        <Navbar />
      </div>
    </div>
    <div className="pt-16"> 
      {children}
    </div>
  </div>
</body>
    </html>
  );
}
