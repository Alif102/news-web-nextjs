"use client"
import { useEffect } from 'react';

const Ad = ({ slot, format, style }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <ins 
      className="adsbygoogle"
      style={style || { display: 'block' }}
      data-ad-client="ca-pub-3355748505131146"
      data-ad-slot={slot}
      data-ad-format={format || 'auto'}
    ></ins>
  );
};

export default Ad;
