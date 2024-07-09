"use client"
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Prayer from './Prayer';

const cities = ['Dhaka', 'Mymensingh', 'Sylhet', 'Rajshahi'];

async function getPrayerTimes(city) {
  const response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Bangladesh&method=2`);
  const data = await response.json();
  return { city, timings: data.data.timings };
}

const PrayerHome = () => {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      const prayerPromises = cities.map(city => getPrayerTimes(city));
      const prayerResults = await Promise.all(prayerPromises);
      setPrayerTimes(prayerResults);
      setLoading(false);
    };
    fetchPrayerTimes();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Slider {...settings}>
        {prayerTimes.map(({ city, timings }) => (
          <div key={city} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Prayer Times for {city}</h2>
            <Prayer prayer={timings} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PrayerHome;
