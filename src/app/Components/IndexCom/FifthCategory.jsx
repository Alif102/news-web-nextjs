"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../Shared/Loader';
import useFetchData from '../Shared/useFetchData';

const FifthCategory = () => {
  const { structureData, allPostsData, loading, error } = useFetchData();

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

  const fifthCategory = parseInt(structureData.structure.fifth_category);
  const allPosts = allPostsData.data;

  // Filter posts based on the fifth category
  const filteredPosts = allPosts.flatMap(category => 
    category.posts.filter(post => post.category_id === fifthCategory)
  );
  const categoryName = filteredPosts.length > 0 ? filteredPosts[0].category_name : '';

  return (
   <div>
    <h2 className='md:text-xl my-2 text-sm font-bold'>
    {categoryName}
  </h2>
     <div className='grid lg:grid-cols-8 gap-4'>
      <div className='lg:col-span-3 col-span-1 flex items-center'>
        {filteredPosts.length > 0 && (
          <Link href={`/post/${filteredPosts[0]?.id}`} key={filteredPosts[0]?.id}>
            <div key={filteredPosts[0]?.id}>
              <div className='relative' style={{ height: '380px', width: '100%' }}>
                <Image
                  className='rounded-xl'
                  src={`https://admin.desh365.top/public/storage/post-image/${filteredPosts[0]?.image}`}
                  alt={filteredPosts[0]?.title || 'Default Alt Text'}
                  layout='fill'
                  objectFit='cover'
                  priority={true}
                />
              </div>
              <h2 className='md:text-xl mt-2 text-sm font-bold'>
                {filteredPosts[0]?.title}
              </h2>
            </div>
          </Link>
        )}
      </div>

      <div className='lg:col-span-5 col-span-1'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 md:px-2 lg:px-0 py-4">
          {filteredPosts.slice(1).map(post => {
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

export default FifthCategory;
