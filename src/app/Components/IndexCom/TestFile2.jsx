"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Adjust if you're using Next.js for navigation
import Image from 'next/image'; // Adjust for Next.js Image component

const TestFile2 = () => {
  const [posts, setPosts] = useState([]);
  const [structure, setStructure] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [postsResponse, structureResponse] = await Promise.all([
          axios.get('https://admin.desh365.top/api/all-post'),
          axios.get('https://admin.desh365.top/api/structure')
        ]);

        const moreCategories = structureResponse.data.structure.fifth_more_category.split(',').map(categoryId => parseInt(categoryId.trim(), 10));

        // Filter posts based on more_three_category
        const filteredPosts = postsResponse.data.data.flatMap(category => {
          return category.posts.filter(post => moreCategories.includes(post.category_id));
        });

        setPosts(filteredPosts);
        setStructure(structureResponse.data.structure);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means fetch once when component mounts

  // Function to group posts by category_name
  const groupPostsByCategory = () => {
    const groupedPosts = {};
    posts.forEach(post => {
      if (!groupedPosts[post.category_name]) {
        groupedPosts[post.category_name] = [];
      }
      groupedPosts[post.category_name].push(post);
    });
    return groupedPosts;
  };

  const groupedPosts = groupPostsByCategory();

  return (
    <div className="container mx-auto px-4 py-8">
      {Object.keys(groupedPosts).map(categoryName => (
        <div key={categoryName} className="grid grid-cols-8 gap-4 mb-8">
          <div className="col-span-4">
            {groupedPosts[categoryName].length > 0 && (
              <Link href={`/post/${groupedPosts[categoryName][0]?.id}`} key={groupedPosts[categoryName][0]?.id}>
                <div className="relative h-72">
                  <Image
                    src={`https://admin.desh365.top/public/storage/post-image/${groupedPosts[categoryName][0]?.image}`}
                    alt={groupedPosts[categoryName][0]?.title || 'Default Alt Text'}
                    layout="fill"
                    objectFit="cover"
                    priority={true}
                    className="rounded-lg"
                  />
                </div>
              </Link>
            )}
            <h2 className="text-xl mt-2 font-bold">{groupedPosts[categoryName][0]?.title}</h2>
          </div>
          <div className="col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groupedPosts[categoryName].slice(1).map(post => (
                <Link href={`/details/${post?.id}`} key={post.id}>
                  <div className="flex items-center space-x-4 py-4 cursor-pointer">
                    <div className="w-24 h-24 relative">
                      <Image
                        src={`https://admin.desh365.top/public/storage/post-image/${post.image}`}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <h2 className="text-sm hover:underline">{post.title}</h2>
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

export default TestFile2;
