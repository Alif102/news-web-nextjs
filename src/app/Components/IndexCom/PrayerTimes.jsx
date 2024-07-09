"use client"
import React, { useState, useEffect } from 'react';

async function getPrayerTimes(city) {
  const response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Bangladesh&method=2`);
  const data = await response.json();
  return { city, timings: data.data.timings };
}

const cities = ['Dhaka', 'Mymensingh', 'Barishal', 'Chattogram', 'Khulna', 'Rajshahi', 'Rangpur', 'Sylhet'];

const PrayerTimesCarousel = () => {
  const [prayerTimesData, setPrayerTimesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(cities.map(city => getPrayerTimes(city)));
      setPrayerTimesData(data);
    };
    fetchData();
  }, []);

  const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  return (
    <div>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>City</th>
            {prayerTimesData.map((cityData, index) => (
              <th key={index}>{cityData.city}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {prayers.map(prayer => (
            <tr key={prayer}>
              <td>{prayer}</td>
              {prayerTimesData.map((cityData, index) => (
                <td key={index}>{cityData.timings[prayer]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimesCarousel;
