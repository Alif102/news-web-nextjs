"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import { ImFacebook2 } from "react-icons/im";
const Footer = () => {

    const [footerMenu, setFooterMenu] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://admin.desh365.top/api/structure');
          const { footer_menu } = response.data.structure;
          const filteredMenu = footer_menu.filter(item => item.key === 'page');
          setFooterMenu(filteredMenu);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);



    const [structureData, setStructureData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://admin.desh365.top/api/structure'); // Replace with your actual API URL
          setStructureData(response.data.structure);
        } catch (error) {
          console.error('Error fetching structure data:', error);
        }
      };
  
      fetchData();
    }, []);

    const handlePhoneClick = () => {
        if (structureData && structureData.phone) {
          window.location.href = `tel:${structureData.phone}`;
        }
      };

    const formatUrl = (url) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
          return url;
        }
        return `https://${url}`;
      };
      
      
      return (
    <div className="relative isolate overflow-hidden py-12 bg-base-100 shadow-xl mt-16 mb-1">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight  sm:text-2xl">Subscribe our newsletter to get an update</h2>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Enter your email"/>
              <button type="submit" className="flex-none rounded-md text-white bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Subscribe</button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              
              <dt className=" font-semibold mb-3 text-xl ">Quick Links</dt>
            
              <div>
      {footerMenu.map((item) => (
        <Link href={`/page/${item.id}`} key={item.id}>{item.name}</Link>
      ))}
    </div>
    

            
            </div>
            <div className="flex flex-col items-start">
              
              <dt className=" font-semibold text-xl mb-3 ">Industries</dt>

              <div >
      {structureData && (
        <div className=' space-y-4'>
          <p   onClick={handlePhoneClick} className='flex underline cursor-pointer gap-2 items-center'><FaPhoneSquareAlt size={22} /> {structureData.phone}</p>
          <p className='flex gap-2 items-center'><MdEmail size={22} /> {structureData.email}</p>
          <p className='flex gap-2 items-center'>
            <ImLocation2 size={22} /> {structureData.address}
          </p>
          {structureData.fb_link && (
            <p className='flex gap-2 items-center'>
              <a href={formatUrl(structureData.fb_link)} target="_blank" rel="noopener noreferrer">
                <ImFacebook2 color='#5e80bf' size={22}/>
              </a>
            </p>
          )}
        </div>
      )}
    </div>
              
            </div>
          </dl>
        </div>
      </div>
     
    </div>
  );
}

export default Footer;
