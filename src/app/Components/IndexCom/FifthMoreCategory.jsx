'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../Shared/Loader';
import useFetchData from '../Shared/useFetchData';

const FifthMoreCategory = () => {
  const { structureData, allPostsData, loading, error } = useFetchData();
  const [fifthMoreCategory, setFifthMoreCategory] = useState([]);

  useEffect(() => {
    if (structureData) {
      const categories = structureData.structure.fifth_more_category.split(',');
      setFifthMoreCategory(categories);
    }
  }, [structureData]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }

  const allPosts = allPostsData.data;
  const filteredData = allPosts.flatMap(category => 
    category.posts.filter(post => fifthMoreCategory.includes(post.category_id.toString()))
  );

  const categoryData = {};
  filteredData.forEach(post => {
    if (!categoryData[post.category_id]) {
      categoryData[post.category_id] = [];
    }
    categoryData[post.category_id].push(post);
  });

  return (
    <div>
      {Object.keys(categoryData).map(categoryId => (
        <div key={categoryId} className='grid grid-cols-8 gap-2 mb-8'>
          <div className='lg:col-span-3 col-span-1'>
            {categoryData[categoryId].length > 0 && (
              <Link href={`/post/${categoryData[categoryId][0]?.id}`} key={categoryData[categoryId][0]?.id}>
                 <h2 className='md:text-xl my-3 text-sm font-bold'>
                    {categoryData[categoryId][0]?.category_name}
                  </h2>
                <div className='' key={categoryData[categoryId][0]?.id}>
                  <div className='relative' style={{ height: '380px', width: '90%' }}>
                    <Image
                      src={`https://admin.desh365.top/public/storage/post-image/${categoryData[categoryId][0]?.image}`}
                      alt={categoryData[categoryId][0]?.title || 'Default Alt Text'}
                      layout='fill'
                      objectFit='cover'
                      priority={true}
                    />
                  </div>
                  <h2 className='md:text-xl mt-2 text-sm font-bold'>
                    {categoryData[categoryId][0]?.title}
                  </h2>
                 
                </div>
              </Link>
            )}
          </div>
          <div className='lg:col-span-5 col-span-1 mt-9'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {categoryData[categoryId].slice(1).map(post => (
                <Link href={`/post/${post?.id}`} key={post.id}>
                  <div className="flex gap-2 items-center space-y-2" key={post?.id}>
                    <img className="w-24 h-24" src={`https://admin.desh365.top/public/storage/post-image/${post.image}`} alt={post.title} />
                    <h2 className='text-sm hover:underline'>{post.title}</h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FifthMoreCategory;
