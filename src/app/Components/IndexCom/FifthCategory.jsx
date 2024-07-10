"use client";
import React, { useMemo } from 'react';
import useFetchData from '../Shared/useFetchData';
import CategoryPosts from './CategoryPosts';

const FifthCategory = () => {
  const { structureData, allPostsData, loading, error } = useFetchData();

  const fifthCategory = useMemo(() => {
    return structureData ? parseInt(structureData.structure.fifth_category) : null;
  }, [structureData]);

  const filteredPosts = useMemo(() => {
    if (!allPostsData || !fifthCategory) return [];
    return allPostsData.data.flatMap(category => 
      category.posts.filter(post => post.category_id === fifthCategory)
    );
  }, [allPostsData, fifthCategory]);

  const categoryName = filteredPosts.length > 0 ? filteredPosts[0].category_name : '';

  return (
    <CategoryPosts 
      loading={loading} 
      error={error} 
      posts={filteredPosts} 
      categoryName={categoryName} 
    />
  );
};

export default FifthCategory;
