"use client";
import React from 'react';
import { Carousel } from '@material-tailwind/react';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../Shared/Loader';
import useFetchData from '../Shared/useFetchData';

const MainCategory = () => {
  const { structureData, allPostsData, loading, error } = useFetchData();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>An error occurred while fetching the data</div>;
  }

  const mainCategory = parseInt(structureData.structure.main_category);
  const mainCategoryPosts = allPostsData.data.flatMap(category => 
    category.posts.filter(post => post.category_id === mainCategory)
  );

  return (
    <div>
      <Carousel transition={{ duration: 1 }} className='rounded-xl'>
        {mainCategoryPosts.map(post => (
          <Link href={`post/${post?.id}`} key={post?.id}>
            <div className='relative' style={{ height: '410px', width: '100%' }}>
              <div className='object-cover rounded-md h-full w-full relative'>
                <Image
                  src={`https://admin.desh365.top/public/storage/post-image/${post.image}`}
                  alt={post?.title || 'Default Alt Text'}
                  layout='fill'
                  objectFit='cover'
                  priority={true}
                />
              </div>
              <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 rounded-md'></div>
              <div className='absolute inset-20 flex items-center mt-0 justify-center'>
                <h2 className='text-white md:text-xl text-sm font-bold'>{post.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default MainCategory;
