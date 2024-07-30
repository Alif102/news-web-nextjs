"use client"

import Link from 'next/link';
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios'; 

const CACHE_KEY = 'allPostData';
const CACHE_EXPIRY_KEY = 'allPostDataExpiry';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const AllPost = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

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
    // Limit to first 6 items
    const limitedData = data.slice(0, visibleCount);

    return limitedData.map(category => (
      <div key={category.category_id}>
        <div>
          {category.posts.map(post => {
            const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post.image}`;
            return (
              <div key={post.id}>
                <Link href={`Pages/post/${post?.id}`} key={post?.id}>
                  <div className='flex gap-2 items-center hover:underline'>
                    <img className='w-20 rounded-md transition-all duration-300 hover:scale-110' src={imageUrl} alt={post.title} />
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
  }, [data, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 6); // Load 6 more items
  };

  return (
    <div className='w-[100%] h-[410px] shadow-lg overflow-x-scroll'>
      <div className='flex flex-col gap-2'>
        {loading ? (
          <p className='text-center mt-8'>Loading...</p>
        ) : (
          <>
            {memoizedData}
            {data.length > visibleCount && (
              <button onClick={handleLoadMore} className='mt-4 p-2 bg-blue-500 text-white rounded'>
                Load More
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllPost;
