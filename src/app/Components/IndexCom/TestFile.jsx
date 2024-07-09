"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
// i dont want use swr, i want use useState, useEffcet and usememo for data caching
const TestFile = () => {
  const [posts, setPosts] = useState([]);
  const [structure, setStructure] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [postsResponse, structureResponse] = await Promise.all([
          axios.get('https://admin.desh365.top/api/all-post'),
          axios.get('https://admin.desh365.top/api/structure')
        ]);

        const moreCategories = structureResponse.data.structure.more_three_category.split(',').map(categoryId => parseInt(categoryId.trim(), 10));

        // Filter posts based on more_three_category and get the first post from each category
        const firstPosts = postsResponse.data.data.map(category => {
          const firstPost = category.posts.find(post => moreCategories.includes(post.category_id));
          return firstPost;
        }).filter(Boolean); // Remove any undefined (if no matching post found)

        setPosts(firstPosts);
        setStructure(structureResponse.data.structure);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means fetch once when component mounts

  return (
    <div>
      <h1>First Post from Each Category</h1>
      <div className="post-list">
        {posts.map(post => (
          <Link href={`post/${post?.id}`} key={post?.id}>
          <div className='relative rounded-md overflow-hidden shadow-lg'>
          <h2 className=' md:text-xl mb-3 text-sm font-bold'>
                {post?.category_name}
              </h2>
            <div className='relative w-full h-64'>
              <Image
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
    </div>
  );
};

export default TestFile;
