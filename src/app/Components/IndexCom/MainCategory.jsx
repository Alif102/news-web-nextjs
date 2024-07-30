"use client";
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Carousel } from '@material-tailwind/react';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../Shared/Loader';

// Cache duration of 2 minutes
const cacheDuration = 6 * 60 * 1000;

const fetchDataWithCache = async (url, cacheKey) => {
  const now = new Date().getTime();
  const cachedData = JSON.parse(localStorage.getItem(cacheKey));

  if (cachedData && now - cachedData.timestamp < cacheDuration) {
    return cachedData.data;
  } else {
    const response = await axios.get(url);
    const result = response.data;
    localStorage.setItem(cacheKey, JSON.stringify({ data: result, timestamp: now }));
    return result;
  }
};

const MainCategory = () => {
  const [structureData, setStructureData] = useState(null);
  const [allPostsData, setAllPostsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const [structureResponse, allPostsResponse] = await Promise.all([
          fetchDataWithCache('https://admin.desh365.top/api/structure', 'structureData'),
          fetchDataWithCache('https://admin.desh365.top/api/all-post', 'allPostsData'),
        ]);

        setStructureData(structureResponse);
        setAllPostsData(allPostsResponse);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const mainCategoryPosts = useMemo(() => {
    if (!structureData || !allPostsData) return [];

    const mainCategory = parseInt(structureData.structure.main_category);
    return allPostsData.data.flatMap(category =>
      category.posts.filter(post => post.category_id === mainCategory)
    );
  }, [structureData, allPostsData]);

  if (loading) return <Loader />;
  if (error) return <div>Please Reload Again</div>;

  return (
    <div>
      <Carousel transition={{ duration: 1 }} className="rounded-xl">
        {mainCategoryPosts.map(post => (
          <Link href={`/post/${post.id}`} key={post.id}>
            <div className="relative" style={{ height: '410px', width: '100%' }}>
              <Image
                src={`https://admin.desh365.top/public/storage/post-image/${post.image}`}
                alt={post.title || 'Default Alt Text'}
                layout="fill"
                objectFit="cover"
                priority
                className="object-cover rounded-md h-full w-full relative"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 rounded-md"></div>
              <div className="absolute inset-20 flex items-center justify-center mt-0">
                <h2 className="text-white md:text-xl text-sm font-bold">{post.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default MainCategory;