"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../Shared/Loader';

const CategoryPosts = ({ loading, error, posts, categoryName }) => {
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>An error occurred while fetching the data</div>;
  }

  return (
    <div>
      <h2 className='md:text-xl my-3 ml-3 md:ml-0 text-sm font-bold'>{categoryName}</h2>
      <div className='grid lg:grid-cols-8 gap-2'>
        <div className='lg:col-span-3 col-span-1 flex items-center'>
          {posts.length > 0 && (
            <Link href={`/post/${posts[0]?.id}`} key={posts[0]?.id}>
              <div key={posts[0]?.id}>
                <div >
                                  <img className=' rounded-lg w-[97%] mx-auto' src={`https://admin.desh365.top/public/storage/post-image/${posts[0]?.image}`} alt="Default Alt Text"  />

                 
                </div>
                <h2 className='md:text-xl ml-3 md:ml-0 mt-2 text-sm font-bold'>{posts[0]?.title}</h2>
              </div>
            </Link>
          )}
        </div>

        <div className='lg:col-span-5 col-span-1'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 md:px-2 lg:px-0 py-4">
            {posts.slice(1).map(post => {
              const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post.image}`;
              return (
                <Link href={`post/${post?.id}`} key={post.id}>
                  <div className="flex gap-2 items-center space-y-2" key={post?.id}>
                    <img className="w-24 h-24 rounded-md transition-all duration-300 hover:scale-110" src={imageUrl} alt={post.title} />
                    <h2 className='text-sm hover:underline'>{post.title}</h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPosts;
