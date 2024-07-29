import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        // Fetch structure data
        const fetchedStructureData = await fetcher('https://admin.desh365.top/api/structure');
        setStructureData(fetchedStructureData);

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

  return { structureData, allPostsData, loading, error };
};

export default useFetchData;
