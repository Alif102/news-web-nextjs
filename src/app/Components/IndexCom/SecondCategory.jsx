"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../Shared/Loader';
import useFetchData from '../Shared/useFetchData';

const SecondCategory = () => {
  const { structureData, allPostsData, loading, error } = useFetchData();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>An error occurred while fetching the data</div>;
  }

  const secondCategory = parseInt(structureData.structure.second_category);
  const secondCategoryPosts = allPostsData.data.flatMap(category =>
    category.posts.filter(post => post.category_id === secondCategory)
  );

  const categoryName = secondCategoryPosts.length > 0 ? secondCategoryPosts[0].category_name : '';

  return (
    <div>

      <h2 className='md:text-xl my-3 text-sm font-bold'>
        {categoryName}
      </h2>
      <div className='grid lg:grid-cols-8 gap-4'>

        <div className='lg:col-span-3 col-span-1  flex items-center'>

          {secondCategoryPosts.length > 0 && (
            <Link href={`/post/${secondCategoryPosts[0]?.id}`} key={secondCategoryPosts[0]?.id}>
              <div className='relative' style={{ height: '380px', width: '100%' }}>
                <Image
                  className='rounded-xl'
                  src={`https://admin.desh365.top/public/storage/post-image/${secondCategoryPosts[0]?.image}`}
                  alt={secondCategoryPosts[0]?.title || 'Default Alt Text'}
                  layout='fill'
                  objectFit='cover'
                  priority={true}
                />
                <h2 className='md:text-xl mt-2 text-sm font-bold'>{secondCategoryPosts[0]?.title}</h2>
              </div>
            </Link>
          )}
        </div>

        <div className='lg:col-span-5 col-span-1 '>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-8 md:px-2 lg:px-0 py-4">
            {secondCategoryPosts.slice(1).map(post => {
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

export default SecondCategory;
