import React from 'react';

const PrayerTime = ({ data }) => {
  return (
    <div className="mb-8">
      <ul className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">{data.city}</h2>
        {Object.keys(data.timings).map((time) => (
          <li key={time} className="border-b last:border-b-0 py-2 flex justify-between">
            <span className="font-medium">{time}</span>
            <span>{data.timings[time]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrayerTime;
