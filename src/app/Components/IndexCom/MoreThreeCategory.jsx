"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '../Shared/Loader';

// Custom hook for data fetching
const useFetchData = () => {
  const [structureData, setStructureData] = useState(null);
  const [allPostsData, setAllPostsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        // Fetch structure data
        const fetchedStructureData = await axios.get('https://admin.desh365.top/api/structure').then(res => res.data);
        setStructureData(fetchedStructureData);

        // Fetch all posts data
        const fetchedAllPostsData = await axios.get('https://admin.desh365.top/api/all-post').then(res => res.data);
        setAllPostsData(fetchedAllPostsData);
        
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { structureData, allPostsData, loading, error };
};

const MoreThreeCategory = () => {
  const { structureData, allPostsData, loading, error } = useFetchData();

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }

  const moreCategories = structureData.structure.more_three_category.split(',').map(categoryId => parseInt(categoryId.trim(), 10));
  const allPosts = allPostsData.data;

  // Create a map to store the first post for each category
  const firstPostsMap = new Map();
  allPosts.forEach(category => {
    const firstPost = category.posts.find(post => moreCategories.includes(post.category_id));
    if (firstPost && !firstPostsMap.has(firstPost.category_id)) {
      firstPostsMap.set(firstPost.category_id, firstPost);
    }
  });

  // Create an array for posts based on the order of moreCategories
  const firstPosts = moreCategories.map(categoryId => firstPostsMap.get(categoryId)).filter(Boolean);
 

  return (
    <div className="grid grid-cols-1 px-3 md:px-0 md:grid-cols-3 gap-4">
      {firstPosts.map((post, index) => (
  <Link href={`post/${post?.id}`} key={`post-${post?.id}-${index}`}>
    <div className='relative overflow-hidden shadow-lg'>
      <h2 className='md:text-xl mb-3 text-sm font-bold'>
        {post?.category_name}
      </h2>
      <div className='relative w-full h-64'>
        <Image className='rounded-lg'
          src={`https://admin.desh365.top/public/storage/post-image/${post.image}`}
          alt={post?.title || 'Default Alt Text'}
          layout='fill'
          objectFit='cover'
          priority={true}
        />
      </div>
      <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 rounded-md'></div>
      <div className='absolute bottom-0 left-0 p-4'>
        <h2 className='text-white md:text-md text-sm font-bold'>
          {post.title}
        </h2>
      </div>
    </div>
  </Link>
))}
    </div>
  );
};

export default MoreThreeCategory;
