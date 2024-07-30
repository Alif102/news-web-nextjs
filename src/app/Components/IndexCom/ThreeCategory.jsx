"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

// Custom hook for data fetching
const useFetchData = () => {
  const [data, setData] = useState({ structure: null, posts: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [structureResponse, postsResponse] = await Promise.all([
          axios.get('https://admin.desh365.top/api/structure'),
          axios.get('https://admin.desh365.top/api/all-post')
        ]);
        setData({
          structure: structureResponse.data,
          posts: postsResponse.data.data
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

// Component to display a category
const ThreeCategories = ({ categoryNumber }) => {
  const { data, loading, error } = useFetchData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  const { structure, posts } = data;
  const categoryId = structure?.structure[`three_category_${categoryNumber}`];
  
  const matchedPosts = posts?.flatMap(category =>
    category.posts.filter(post => post.category_id === parseInt(categoryId))
  ) || [];

  if (matchedPosts.length === 0) return null;

  const post = matchedPosts[0];

  return (
    <div className='w-full'>
      <h2 className='md:text-xl mb-2 text-sm font-bold'>
        {post.category_name}
      </h2>
      <Link href={`post/${post.id}`}>
        <div className='relative' style={{ height: '280px' }}>
          <Image
            src={`https://admin.desh365.top/public/storage/post-image/${post.image}`}
            alt={post.title || 'Default Alt Text'}
            layout='fill'
            objectFit='cover'
            className='rounded-md'
            priority
          />
          <h2 className='md:text-md mt-2 text-sm font-bold'>
            {post.title}
          </h2>
        </div>
      </Link>
    </div>
  );
};

// Component to display three categories in a grid
const ThreeCategory = () => (
  <div className='grid md:grid-cols-3 grid-cols-1 px-3 md:px-0 gap-4 mt-10'>
    <ThreeCategories categoryNumber={1} />
    <ThreeCategories categoryNumber={2} />
    <ThreeCategories categoryNumber={3} />
  </div>
);

export default ThreeCategory;
