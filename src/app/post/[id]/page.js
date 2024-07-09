"use client"
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import DetailPage from '@/app/Components/DetailPage';
import Add1 from '@/app/Components/IndexCom/Add1';
import Add from '@/app/Components/IndexCom/Add';
import RelatedData from '@/app/Components/IndexCom/RelatedData';
import NewsTabs from '@/app/Components/IndexCom/NewsTabs';

export default function PostPage({ params }) {
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState(null);
  const id = params.id;

  const fetchData = async (id) => {
    try {
      const cachedData = localStorage.getItem(`post_${id}`);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setPost(parsedData.post);
        setRelated(parsedData.related);
      } else {
        const response = await axios.get(`https://admin.desh365.top/api/post/${id}`);
        const postData = response.data.data;
        const relatedData = response.data.related_post;
        setPost(postData);
        setRelated(relatedData);
        localStorage.setItem(`post_${id}`, JSON.stringify({ post: postData, related: relatedData }));
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const memoizedFetchData = useMemo(() => fetchData, []);

  useEffect(() => {
    memoizedFetchData(id);
  }, [id, memoizedFetchData]);

  return (
    <div>
      <div className='grid lg:grid-cols-12 grid-cols-1 gap-8'>
        <div className='md:col-span-2 col-span-1'>
          <div className='hidden md:block space-y-3'>
            <Add1/>
            <Add1/>
          </div>
        </div>
        <div className='md:col-span-10 col-span-1'>
          <Add/>

          <div className='grid md:grid-cols-12 grid-cols-1 gap-3'>
            <div className='c md:col-span-8 col-span-1'> 
            <div className=' '>
            <div className='md:col-span-4 col-span-1'>
              <DetailPage post={post}/>
            </div>
          </div>
          
            </div>

            <div className=' col-span-4'>
<NewsTabs/>
          </div>

          </div>
          
          <RelatedData related={related} />
        </div>
      </div>
    </div>
  );
}