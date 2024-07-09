"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const NewsTabs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://admin.desh365.top/api/all-post');
        // Extract posts from nested data structure
        const allPosts = response.data.data.flatMap(category => category.posts);
        setPosts(allPosts);
        setLoading(false); // Data fetched, set loading to false
      } catch (error) {
        console.error('Error fetching the posts:', error);
        setLoading(false); // Even if error occurs, set loading to false
      }
    };

    fetchPosts();
  }, []);

  const renderPosts = (postList) => (
    <div className='flex flex-col space-y-4 gap-3 py-4'>
      {postList.map((post) => (
        <Link href={`/post/${post?.id}`} key={post?.id} className='flex items-center gap-2 hover:underline'>
          <img className='w-20 rounded-md ' src={`https://admin.desh365.top/public/storage/post-image/${post?.image}`} alt={post?.title} />
          <h2 className='text-[14px]'>{post?.title}</h2>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="shadow-lg w-full mt-4 py-6 h-[500px]">
      <div className="flex justify-evenly">
        <button
          className={`px-3 py-2 ${activeTab === 1 ? 'shadow-lg border border-black bg-gray-200 text-black' : 'shadow-xl bg-gray-200'}`}
          onClick={() => setActiveTab(1)}
        >
          সর্বশেষ
        </button>
        <button
          className={`px-3 py-2 ${activeTab === 2 ? 'shadow-lg border border-black bg-gray-200 text-black' : 'shadow-xl bg-gray-200'}`}
          onClick={() => setActiveTab(2)}
        >
          সর্বোচ্চ পঠিত
        </button>
      </div>
      <div className="mt-4 h-96 overflow-y-scroll">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader">Loading......</div> {/* You can replace this with your loader component */}
          </div>
        ) : (
          // Render posts when data is fetched
          <div className="p-4">{activeTab === 1 ? renderPosts(posts) : renderPosts(posts.slice().reverse())}</div>
        )}
      </div>
      <div className='border border-black w-full bg-gray-200 h-8'>
        <h1 className='text-center p-1 font-bold'>আজকের সব খবর</h1>
      </div>
    </div>
  );
};

export default NewsTabs;
