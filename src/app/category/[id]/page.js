"use client";
import Add from '@/app/Components/IndexCom/Add';
import Add1 from '@/app/Components/IndexCom/Add1';
import AllPost from '@/app/Components/IndexCom/AllPost';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CategoryPage = ({ params }) => {
    const { id } = params;
    const [posts, setPosts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchPosts = async () => {
                setLoading(true);
                try {
                    // Check if data is cached in localStorage
                    const cachedData = localStorage.getItem(`category-post-${id}`);
                    if (cachedData) {
                        const parsedData = JSON.parse(cachedData);
                        setPosts(parsedData.data);
                        if (parsedData.data.length > 0) {
                            setCategoryName(parsedData.data[0].category_name);
                        }
                        setLoading(false);
                    } else {
                        // Fetch data from API
                        const response = await axios.get(`https://admin.desh365.top/api/category-post/${id}`);
                        const data = response.data;
                        if (data.status) {
                            setPosts(data.data);
                            if (data.data.length > 0) {
                                setCategoryName(data.data[0].category_name);
                            }
                            // Cache the data in localStorage
                            localStorage.setItem(`category-post-${id}`, JSON.stringify(data));
                        }
                        setLoading(false);
                    }
                } catch (error) {
                    console.error('Error fetching the posts:', error);
                    setLoading(false);
                }
            };

            fetchPosts();
        }
    }, [id]);

    return (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-7'>
            <div className='lg:col-span-2 hidden lg:block col-span-1'>
                <div className='space-y-5'>
                    <Add1 />
                    <Add1 />
                </div>
            </div>

            <div className='lg:col-span-6 col-span-1'>
                <div>
                    <Add />
                    <div className='bg-gray-300 py-4 px-3'>
                        <h1 className='text-center p-1 font-bold'>
                            শিরোনাম
                        </h1>
                    </div>

                    {loading ? (
                        <div className='text-center py-4'>
                            <span>Loading...</span>
                        </div>
                    ) : (
                        <ul>
                            {posts.map(post => (
                                <li key={post.id}>
                                    <Link href={`/post/${post?.id}`}>
                                    <div className='flex my-4 gap-6'>
                                        <img src={`https://admin.desh365.top/storage/post-image/${post?.image}`} className='w-52 rounded-lg' alt={post?.title} />
                                        <div className='ml-4 space-y-2'>
                                            <h2 className='font-bold text-xl'>{post.title}</h2>
                                            <p>প্রকাশিত: {new Date(post?.created_at).toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' })}</p>
                                            <p dangerouslySetInnerHTML={{ __html: post?.post_body }}></p>
                                        </div>
                                    </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className='lg:col-span-4 col-span-1 space-y-4'>
                <div className='py-4 px-3'>
                    <h1 className='text-center p-1 font-bold bg-gray-300'>
                        সর্বশেষ খবর
                    </h1>
                    <AllPost />
                </div>
                <div className='hidden lg:block'>
                    <Add1 />
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
