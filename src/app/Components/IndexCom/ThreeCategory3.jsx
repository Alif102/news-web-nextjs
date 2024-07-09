
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const ThreeCategory3 = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPostsResponse = await axios.get('https://admin.desh365.top/api/all-post');
        const structureResponse = await axios.get('https://admin.desh365.top/api/structure');

        const allPosts = allPostsResponse.data.data;
        const threeCategory3 = structureResponse.data.structure.three_category_3;

        // Filter posts where three_category_1 === category_id
        const matchedPosts = allPosts.flatMap(category => 
          category.posts.filter(post => post.category_id === parseInt(threeCategory3))
        );

        setPosts(matchedPosts);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts: {error.message}</p>;

  return (
    <div>
      {posts.length > 0 && (
        <div className='w-full'>
              <h2 className='md:text-xl mb-2 text-sm font-bold'>
                {posts[0]?.category_name}
              </h2>
          <Link href={`Pages/post/${posts[0]?.id}`} key={posts[0]?.id}>
            <div className='' key={posts[0]?.id}>
              <div className='relative' style={{ height: '280px' }}>
                <Image
                  src={`https://admin.desh365.top/public/storage/post-image/${posts[0]?.image}`}
                  alt={posts[0]?.title || 'Default Alt Text'}
                  layout='fill'
                  objectFit='cover'
                  className='rounded-md'
                  priority={true}
                />
              </div>
              <h2 className='md:text-md mt-2 text-sm font-bold'>
                {posts[0]?.title}
              </h2>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ThreeCategory3;
