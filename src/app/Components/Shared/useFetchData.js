import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const useFetchData = () => {
  const [structureData, setStructureData] = useState(null);
  const [allPostsData, setAllPostsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const cacheDuration = 2 * 60 * 1000;
  const now = new Date().getTime();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        // Fetch structure data
        const fetchedStructureData = await fetcher('https://admin.desh365.top/api/structure');
        
        // Compare new structure data with cached data
        const structureCache = JSON.parse(localStorage.getItem('structureData'));
        if (structureCache && JSON.stringify(structureCache.data) === JSON.stringify(fetchedStructureData)) {
          // Use cached data if it matches
          setStructureData(structureCache.data);
        } else {
          // Update cache and state if data is different 
          localStorage.setItem('structureData', JSON.stringify({
            data: fetchedStructureData,
            timestamp: now,
          }));
          setStructureData(fetchedStructureData);
        }

        // Fetch all posts data
        const fetchedAllPostsData = await fetcher('https://admin.desh365.top/api/all-post');
        setAllPostsData(fetchedAllPostsData);
        
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const memoizedStructureData = useMemo(() => structureData, [structureData]);
  const memoizedAllPostsData = useMemo(() => allPostsData, [allPostsData]);

  return { structureData: memoizedStructureData, allPostsData: memoizedAllPostsData, loading, error };
};

export default useFetchData;

