"use client"
import React, { useEffect, useState } from 'react';

const CurrencyRates = () => {
  const [exchangeRates, setExchangeRates] = useState(null);

  async function fetchExchangeRates() {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  }

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  return (
    <div className=' '>
      <div className="px-5 rounded-lg shadow-md ">
      <h2 className="text-[13px]  border-b border-black font-bold mb-4">Currency Exchange Rates</h2>
      {exchangeRates ? (
        <ul className="space-y-2">
          <li className='flex py-1 justify-between border-b last:border-b-0'><h1 className='text-[14px] font-bold'>BDT to USD</h1> {exchangeRates.BDT.toFixed(2)}</li>
          <li className='flex py-1 justify-between border-b last:border-b-0'><h1 className='text-[14px] font-bold'>BDT to INR</h1> {exchangeRates.INR.toFixed(2)}</li>
          <li className='flex py-1 justify-between border-b last:border-b-0'><h1 className='text-[14px] font-bold'>BDT to AED</h1> {exchangeRates.AED.toFixed(2)}</li>
          <li className='flex py-1 justify-between border-b last:border-b-0'><h1 className='text-[14px] font-bold'>BDT to AFN</h1> {exchangeRates.AFN.toFixed(2)}</li>
          <li className='flex py-1 justify-between border-b last:border-b-0'><h1 className='text-[14px] font-bold'>BDT to AUD</h1> {exchangeRates.AUD.toFixed(2)}</li>
          <li className='flex py-1 justify-between border-b last:border-b-0'><h1 className='text-[14px] font-bold'>BDT to CAD</h1> {exchangeRates.CAD.toFixed(2)}</li>
          <li className='flex py-1 justify-between border-b last:border-b-0'><h1 className='text-[14px] font-bold'>BDT to BRL</h1> {exchangeRates.BRL.toFixed(2)}</li>
          {/* Add more currencies as needed */}
        </ul>
      ) : (
        <p>Loading exchange rates...</p>
      )}
    </div>
    </div>
  );
};

export default CurrencyRates;
