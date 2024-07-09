import React from 'react';

const Prayer = ({ prayer  }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <ul className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        {Object.keys(prayer).map((time) => (
            
            
          <li key={time} className="border-b last:border-b-0 py-2 flex justify-between">

            <span className="font-medium">{time}</span>
            <span>{prayer[time]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prayer;
