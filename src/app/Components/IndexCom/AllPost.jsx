"use client";

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

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  const postsData = data.status ? data.data : [];

  return (
    <div className='lg:w-[100%] w-[60%] mx-auto h-[410px] shadow-lg overflow-x-scroll'>
      <div className='flex flex-col gap-2'>
        {postsData.map(category => (
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
    </div>
  );
};

export default AllPost;
