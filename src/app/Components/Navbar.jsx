"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { BiHomeAlt } from "react-icons/bi";
import axios from 'axios';

const cacheDuration = 8 * 60 * 1000; // 8 minutes in milliseconds

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

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [logo, setLogo] = useState(null);
  const [posts, setPosts] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeRoute, setActiveRoute] = useState('');
  const [isNavbarHidden, setIsNavbarHidden] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await fetchDataWithCache('https://admin.desh365.top/api/structure', 'structureData');
        if (result.status) {
          setCategories(result.structure.category_menu || []);
          setLogo(result.structure.logo || null);
        }
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await fetchDataWithCache('https://admin.desh365.top/api/all-post', 'allPostsData');
        if (result && result.data && Array.isArray(result.data.posts)) {
          const uniquePosts = removeDuplicates(result.data.posts, 'category_id');
          setPosts(uniquePosts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []);

  const removeDuplicates = (array, key) => {
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  };

  const toggleNav = () => {
    setIsNavbarHidden(!isNavbarHidden);
  };

  const handleSetActiveRoute = (route) => {
    setActiveRoute(route);
  };

  const formatUrl = (url) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div>
      <div>
        <nav className="bg-gray-100 flex text-gray-800 items-center justify-between flex-wrap pb-2 px-5">
          <div>
            {logo ? (
              <div>
                <Link href='/'>
                  <img className='h-20 w-36 rounded-md' src={`https://admin.desh365.top/public/storage/logo/${logo}`} alt="Logo" />
                </Link>
              </div>
            ) : (
              <p>Logo ....</p>
            )}
          </div>
          <div className="block lg:hidden">
            <button
              onClick={toggleNav}
              className="flex flex-col px-3 py-2 border rounded border-gray-800 hover:text-white hover:border-white"
            >
              <div className="w-6 h-1 bg-black"></div>
              <div className="w-6 h-1 bg-black my-1"></div>
              <div className="w-6 h-1 bg-black"></div>
            </button>
          </div>
          <div
            className={`w-full lg:w-auto block lg:items-center lg:inline-block ${isNavbarHidden ? 'hidden' : ''}`}
            id="navbar"
          >
            <ul className="flex gap-4">
              <Link href='/'>
                <BiHomeAlt size={22} className='hover:text-purple-500 text-black' />
              </Link>
              {categories.slice(0, 6).map((category, index) => (
                <li key={index}>
                  {category.key === 'category' ? (
                    <Link href={`/category/${category.id}`}>
                      <p className={`hover:text-purple-500 ${activeRoute === `/category/${category.id}` ? 'text-purple-500 font-bold' : ''}`} onClick={() => handleSetActiveRoute(`/category/${category.id}`)}>
                        {category.name}
                      </p>
                    </Link>
                  ) : category.key === 'page' ? (
                    <Link href={`/page/${category.id}`}>
                      <p className={`hover:text-purple-500 ${activeRoute === `/page/${category.id}` ? 'text-purple-500 font-bold' : ''}`} onClick={() => handleSetActiveRoute(`/page/${category.id}`)}>
                        {category.name}
                      </p>
                    </Link>
                  ) : category.key === 'customlink' ? (
                    <a href={formatUrl(category.id)} target="_blank" rel="noopener noreferrer">
                      <p className="hover:text-purple-500">
                        {category.name}
                      </p>
                    </a>
                  ) : null}
                </li>
              ))}
              {categories.length > 5 && (
                <li>
                  <p className="hover:text-purple-500 cursor-pointer">
                    <span onClick={toggleDropdown}>
                      অন্যান্য
                    </span>
                    {dropdownVisible && (
                      <ul className="absolute bg-white shadow-lg rounded right-[310px] mt-6 px-3 py-1 w-48">
                        {categories.slice(6).map((category, index) => (
                          <li key={index}>
                            {category.key === 'category' ? (
                              <Link href={`/category/${category.id}`}>
                                <p className={`hover:text-purple-500 ${activeRoute === `/category/${category.id}` ? 'text-purple-500 font-bold' : ''}`} onClick={() => handleSetActiveRoute(`/category/${category.id}`)}>
                                  {category.name}
                                </p>
                              </Link>
                            ) : category.key === 'page' ? (
                              <Link href={`/page/${category.id}`}>
                                <p className={`hover:text-purple-500 ${activeRoute === `/page/${category.id}` ? 'text-purple-500 font-bold' : ''}`} onClick={() => handleSetActiveRoute(`/page/${category.id}`)}>
                                  {category.name}
                                </p>
                              </Link>
                            ) : category.key === 'customlink' ? (
                              <a href={formatUrl(category.id)} target="_blank" rel="noopener noreferrer">
                                <p className="">
                                  {category.name}
                                </p>
                              </a>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    )}
                  </p>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
