"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const NavTest = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://admin.desh365.top/api/structure');
        const data = response.data.data;
        setCategories(data);
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
        <h1>category</h1>
      {categories.map((categoryGroup, index) => (
        <div key={index}>
          {categoryGroup.posts.map((post) => (
            <div key={post.id}>
             <Link href={`/category/${post.category_id}`}>
             <h2>{post.category_name}</h2>
             </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NavTest;
