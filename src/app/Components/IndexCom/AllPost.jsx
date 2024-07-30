"use client"

import Link from 'next/link';
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios'; 
import Image from 'next/image';

const CACHE_KEY = 'allPostData';
const CACHE_EXPIRY_KEY = 'allPostDataExpiry';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const AllPost = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Check if data is cached and not expired
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);
      
      const currentTime = new Date().getTime();
      if (cachedData && cacheExpiry && currentTime < parseInt(cacheExpiry, 10)) {
        setData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://admin.desh365.top/api/all-post');
        const responseData = response.data;
        
        if (responseData.status) {
          setData(responseData.data);

          // Cache the data and set expiry
          localStorage.setItem(CACHE_KEY, JSON.stringify(responseData.data));
          localStorage.setItem(CACHE_EXPIRY_KEY, (currentTime + CACHE_DURATION).toString());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const memoizedData = useMemo(() => {
    return data.map(category => (
      <div key={category.category_id}>
        <div>
          {category.posts.map(post => {
            const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post.image}`;
            return (
              <div key={post.id}>
                <Link href={`Pages/post/${post?.id}`} key={post?.id}>
                  <div className='flex space-y-2 gap-2 items-center hover:underline'>
                    <Image className=' rounded-md transition-all duration-300 hover:scale-110' width={90} height={45} src={imageUrl} alt={post.title} />
                    <h2 className='text-[14px]'>{post.title}</h2>
                  </div>
                  <div className='border border-b'></div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    ));
  }, [data]);

  return (
    <div className='w-[100%] h-[410px] shadow-lg overflow-x-scroll'>
      <div className='flex flex-col gap-2'>
        {loading ? (
          <p className=' text-center mt-8'>Loading...</p>
        ) : (
          memoizedData
        )}
      </div>
      
    </div>
  );
};

export default AllPost;
