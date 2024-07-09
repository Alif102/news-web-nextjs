// src/app/ClientLayout.js
'use client'; // Ensure this is a client component

import { useEffect } from 'react';

export default function ClientLayout({ children }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://jsc.mgid.com/site/556728.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <>{children}</>;
}
