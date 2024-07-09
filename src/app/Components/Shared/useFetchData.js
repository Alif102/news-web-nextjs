import { useState, useEffect } from 'react';
import axios from 'axios';

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const cacheDuration = 2 * 60 * 1000;

const useFetchData = () => {
  const [structureData, setStructureData] = useState(null);
  const [allPostsData, setAllPostsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const structureCache = JSON.parse(localStorage.getItem('structureData'));
        const postsCache = JSON.parse(localStorage.getItem('allPostsData'));

        const now = new Date().getTime();

        let fetchedStructureData;
        let fetchedAllPostsData;

        if (
          structureCache &&
          postsCache &&
          now - structureCache.timestamp < cacheDuration &&
          now - postsCache.timestamp < cacheDuration
        ) {
          fetchedStructureData = structureCache.data;
          fetchedAllPostsData = postsCache.data;
        } else {
          [fetchedStructureData, fetchedAllPostsData] = await Promise.all([
            fetcher('https://admin.desh365.top/api/structure'),
            fetcher('https://admin.desh365.top/api/all-post')
          ]);

          localStorage.setItem('structureData', JSON.stringify({
            data: fetchedStructureData,
            timestamp: now,
          }));
          localStorage.setItem('allPostsData', JSON.stringify({
            data: fetchedAllPostsData,
            timestamp: now,
          }));
        }

        setStructureData(fetchedStructureData);
        setAllPostsData(fetchedAllPostsData);
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

export default useFetchData;
