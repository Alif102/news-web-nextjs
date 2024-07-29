'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Loader from '../Shared/Loader';
import axios from 'axios';

// Custom hook to fetch data
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
        const fetchedStructureData = await axios.get('https://admin.desh365.top/api/structure');
        setStructureData(fetchedStructureData.data);

        // Fetch all posts data
        const fetchedAllPostsData = await axios.get('https://admin.desh365.top/api/all-post');
        setAllPostsData(fetchedAllPostsData.data);
        
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

const FifthMoreCategory = () => {
  const { structureData, allPostsData, loading, error } = useFetchData();
  const [fifthMoreCategory, setFifthMoreCategory] = useState([]);

  useEffect(() => {
    if (structureData) {
      const categories = structureData.structure.fifth_more_category.split(',').map(id => id.trim());
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

  // Filter all posts based on fifth_more_category
  const filteredData = allPosts.flatMap(category => 
    category.posts.filter(post => fifthMoreCategory.includes(post.category_id.toString()))
  );

  // Group filtered posts by category_id
  const categoryData = {};
  filteredData.forEach(post => {
    if (!categoryData[post.category_id]) {
      categoryData[post.category_id] = [];
    }
    categoryData[post.category_id].push(post);
  });

  console.log(categoryData);

  return (
    <div>
      {fifthMoreCategory.map((categoryId, index) => (
        <div key={`${categoryId}-${index}`} className='grid md:grid-cols-8 grid-cols-1 px-3 md:px-0 gap-2 mb-8'>
          <div className='lg:col-span-3 col-span-1'>
            {categoryData[categoryId]?.length > 0 && (
              <Link href={`/post/${categoryData[categoryId][0]?.id}`} key={categoryData[categoryId][0]?.id}>
                <h2 className='md:text-xl my-3 text-sm font-bold'>
                  {categoryData[categoryId][0]?.category_name}
                </h2>
                <div className='' key={categoryData[categoryId][0]?.id}>
                  <div >
                  <img className=' rounded-lg w-[97%] mx-auto' src={`https://admin.desh365.top/public/storage/post-image/${categoryData[categoryId][0]?.image}`} alt="Default Alt Text"  />

                  
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
              {categoryData[categoryId]?.slice(1).map(post => (
                <Link href={`/post/${post.id}`} key={post.id}>
                  <div className="flex gap-2 items-center space-y-2" key={post.id}>
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
