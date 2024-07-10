"use client";
import React, { useMemo } from 'react';
import useFetchData from '../Shared/useFetchData';
import CategoryPosts from './CategoryPosts';

const SecondCategory = () => {
  const { structureData, allPostsData, loading, error } = useFetchData();

  const secondCategory = useMemo(() => {
    return structureData ? parseInt(structureData.structure.second_category) : null;
  }, [structureData]);

  const secondCategoryPosts = useMemo(() => {
    if (!allPostsData || !secondCategory) return [];
    return allPostsData.data.flatMap(category =>
      category.posts.filter(post => post.category_id === secondCategory)
    );
  }, [allPostsData, secondCategory]);

  const categoryName = secondCategoryPosts.length > 0 ? secondCategoryPosts[0].category_name : '';

  return (
    <CategoryPosts 
      loading={loading} 
      error={error} 
      posts={secondCategoryPosts} 
      categoryName={categoryName} 
    />
  );
};

export default SecondCategory;
