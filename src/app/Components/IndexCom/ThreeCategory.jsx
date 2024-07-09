"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useFetchData from '../Shared/useFetchData';

const ThreeCategories = ({ categoryNumber }) => {
  const { structureData, allPostsData, loading, error } = useFetchData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts</div>;
  }

  const allPosts = allPostsData.data;
  const categoryKey = `three_category_${categoryNumber}`;
  const categoryId = structureData.structure[categoryKey];

  // Filter posts where the category_id matches
  const matchedPosts = allPosts.flatMap(category => 
    category.posts.filter(post => post.category_id === parseInt(categoryId))
  );

  return (
    <div>
      {matchedPosts.length > 0 && (
        <div className='w-full'>
          <h2 className='md:text-xl mb-2 text-sm font-bold'>
            {matchedPosts[0]?.category_name}
          </h2>
          <Link href={`post/${matchedPosts[0]?.id}`} key={matchedPosts[0]?.id}>
            <div className='' key={matchedPosts[0]?.id}>
              <div className='relative' style={{ height: '280px' }}>
                <Image
                  src={`https://admin.desh365.top/public/storage/post-image/${matchedPosts[0]?.image}`}
                  alt={matchedPosts[0]?.title || 'Default Alt Text'}
                  layout='fill'
                  objectFit='cover'
                  className='rounded-md'
                  priority={true}
                />
              </div>
              <h2 className='md:text-md mt-2 text-sm font-bold'>
                {matchedPosts[0]?.title}
              </h2>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

const ThreeCategory = () => {
  return (
    <div className='grid grid-cols-3 gap-4 mt-10'>
      <ThreeCategories categoryNumber={1} />
      <ThreeCategories categoryNumber={2} />
      <ThreeCategories categoryNumber={3} />
    </div>
  );
};

export default ThreeCategory;
