"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data);

const AllPost = () => {
  const { data, error } = useSWR('https://admin.desh365.top/api/all-post', fetcher, {
    refreshInterval: 300000, // Refresh data every 5 minutes
    dedupingInterval: 60000, // Cache the data for 1 minute
  });

  const [visiblePosts, setVisiblePosts] = useState([]);
  const [index, setIndex] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && data.status) {
      setVisiblePosts(data.data.slice(0, index));
    }
  }, [data, index]);

  const loadMorePosts = () => {
    setLoading(true);
    setIndex(prevIndex => prevIndex + 10);
  };

  useEffect(() => {
    if (data && data.status) {
      setVisiblePosts(data.data.slice(0, index));
      setLoading(false);
    }
  }, [data, index]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
      loadMorePosts();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className='lg:w-[100%] w-[90%] mx-auto h-[410px] shadow-lg overflow-x-scroll'>
      <div className='flex flex-col gap-2'>
        {visiblePosts.map(category => (
          <div key={category.category_id}>
            <div>
              {category.posts.map(post => {
                const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post.image}`;
                return (
                  <div key={post.id}>
                    <Link href={`/post/${post?.id}`} key={post?.id}>
                      <div className='flex gap-2 items-center hover:underline'>
                        <Image 
                          className='w-20 rounded-md transition-all duration-300 hover:scale-110'
                          src={imageUrl}
                          alt={post.title}
                          width={80}
                          height={80}
                          quality={50}
                          loading='lazy'
                        />
                        <h2 className='text-[14px]'>{post.title}</h2>
                      </div>
                      <div className='border border-b'></div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {loading && <div className='text-center py-4'>Loading more posts...</div>}
    </div>
  );
};

export default AllPost;
