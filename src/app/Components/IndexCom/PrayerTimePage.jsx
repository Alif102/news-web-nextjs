import React from 'react';

async function getPrayerTimes() {
  const response = await fetch('http://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=2');
  const data = await response.json();
  return data.data.timings;
}

// Function to convert English numbers to Bengali (assuming they are in standard numbers)
const convertToBengaliNumbers = (englishNumber) => {
  const numberMap = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    ':': ':', // Keep colon as is
  };

  return englishNumber.toString().replace(/[0-9:]/g, (match) => numberMap[match]);
};

const PrayerTimesPage = async () => {
  const prayerTimes = await getPrayerTimes();
  const prayerTimesArray = Object.keys(prayerTimes).slice(0, 7);

  // Define Bengali translations
  const translations = {
    Fajr: 'ফজর',
    Sunrise: 'সূর্যোদয়',
    Dhuhr: 'যোহর',
    Asr: 'আসর',
    Maghrib: 'মাগরিব',
    Isha: 'ইশা',
  };

  // Filter out the 5th element (index 4) from display
  const filteredPrayerTimes = prayerTimesArray.filter((_, index) => index !== 4);

  return (
      <ul className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h1 className="text-[12px] text-center px-3 font-bold mb-6 py-1 border-b border-black">আজকের নামাজের সময়সূচী</h1>

        {filteredPrayerTimes.map((time) => (
          <li key={time} className="border-b last:border-b-0 py-2 flex justify-between">
            <span className="font-medium">{translations[time] || time}</span> {/* Display translated value if available */}
            <span>{convertToBengaliNumbers(prayerTimes[time])}</span> {/* Convert time to Bengali numbers */}
          </li>
        ))}
      </ul>
  );
};

export default PrayerTimesPage;
