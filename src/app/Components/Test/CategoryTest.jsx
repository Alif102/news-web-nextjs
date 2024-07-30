"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Ensure you're using Next.js for Link component
import Image from 'next/image'; // Ensure you're using Next.js for Image component

const SecondCategory = () => {
  const [matchedPosts, setSecondCategoryPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the structure data
        const structureResponse = await axios.get('https://admin.desh365.top/api/structure');
        const secondCategory = parseInt(structureResponse.data.structure.second_category);

        // Fetch the allpost data
        const allPostsResponse = await axios.get('https://admin.desh365.top/api/all-post');
        const allPosts = allPostsResponse.data.data;

        // Filter posts based on the second category
        const filteredPosts = allPosts.flatMap(category => 
          category.posts.filter(post => post.category_id === secondCategory)
        );

        // Set the filtered posts to state
        setSecondCategoryPosts(filteredPosts);
      } catch (error) {
        setError('An error occurred while fetching the data');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='grid lg:grid-cols-8 gap-2'>
      <div className='lg:col-span-4 col-span-1 flex items-center'>
        {matchedPosts.length > 0 && (
          <Link href={`/post/${matchedPosts[0]?.id}`} key={matchedPosts[0]?.id}>
            <div key={matchedPosts[0]?.id}>
              <div className='relative' style={{ height: '380px', width: '100%' }}>
                <Image
                  className='rounded-xl'
                  src={`https://admin.desh365.top/public/storage/post-image/${matchedPosts[0]?.image}`}
                  alt={matchedPosts[0]?.title || 'Default Alt Text'}
                  layout='fill'
                  objectFit='cover'
                  priority={true}
                />
              </div>
              <h2 className='md:text-xl mt-2 text-sm font-bold'>
                {matchedPosts[0]?.title}
              </h2>
            </div>
          </Link>
        )}
      </div>

      <div className='lg:col-span-4 col-span-1'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 md:px-2 lg:px-0 py-4">
          {matchedPosts.slice(1).map(post => {
            const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post.image}`;
            return (
              <Link href={`post/${post?.id}`} key={post.id}>
                <div className="flex gap-2 items-center space-y-2" key={post?.id}>
                  <Image className=" rounded-md transition-all duration-300 hover:scale-110" width={100} height={100} src={imageUrl} alt={post.title} />
                  <h2 className='text-sm hover:underline'>{post.title}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SecondCategory;
