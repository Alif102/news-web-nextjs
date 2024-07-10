"use client";
import React, { useMemo } from 'react';
import useFetchData from '../Shared/useFetchData';
import CategoryPosts from './CategoryPosts';

const FourthCategory = () => {
  const { structureData, allPostsData, loading, error } = useFetchData();

  const fourthCategory = useMemo(() => {
    return structureData ? parseInt(structureData.structure.fourth_category) : null;
  }, [structureData]);

  const filteredPosts = useMemo(() => {
    if (!allPostsData || !fourthCategory) return [];
    return allPostsData.data.flatMap(category => 
      category.posts.filter(post => post.category_id === fourthCategory)
    );
  }, [allPostsData, fourthCategory]);

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

export default FourthCategory;
