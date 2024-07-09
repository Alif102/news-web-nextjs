"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

const AllPost = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Check if data is cached in localStorage
    const cachedData = localStorage.getItem('allPostData');
    if (cachedData) {
      setData(JSON.parse(cachedData));
    } else {
      // Axios GET request
      axios.get('https://admin.desh365.top/api/all-post')
        .then(response => {
          const responseData = response.data;
          if (responseData.status) {
            setData(responseData.data);
            // Cache the data in localStorage
            localStorage.setItem('allPostData', JSON.stringify(responseData.data));
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, []);

  return (
    <div className='lg:w-[100%] w-[60%] mx-auto h-[410px] shadow-lg overflow-x-scroll'>
      <div className='flex flex-col gap-2'>
        {data.map(category => (
          <div key={category.category_id}>
            <div>
              {category.posts.map(post => {
                const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post.image}`;
                return (
                  <div key={post.id}>
                    <Link href={`post/${post?.id}`} key={post?.id}>
                    <div className='flex gap-2 items-center hover:underline'>
                      <img className='w-20 rounded-md transition-all duration-300 hover:scale-110' src={imageUrl} alt={post.title} />
                      <h2 className='text-[14px]'>{post.title}</h2>
                    </div>
                    <div className='border border-b'></div>
                  </Link>
                    {/* <div className='border border-b'></div> */}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPost;
