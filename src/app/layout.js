import { Inter } from 'next/font/google';
import './globals.css';
import Naavbar from './Components/Navbar';
// import Ad from './Components/Ad';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'News Portal',
  openGraph: {
    title: 'News Portal',
    description: 'News Portal is a...',
    url: 'https://news-nextjs-phi.vercel.app',
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
        <div className="container xl:max-w-7xl lg:max-w-6xl md:max-w-4xl mx-auto">
          <Naavbar />
          {/* <Ad slot="2858387384" style={{ display: 'inline-block', width: '336px', height: '280px' }} /> */}
          {children}
        </div>
      </body>
    </html>
  );
}
