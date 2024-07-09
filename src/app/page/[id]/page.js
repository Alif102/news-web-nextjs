"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

const CategoryPage = ({ params }) => {
    const { id } = params;
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchPageData = async () => {
                try {
                    const response = await axios.get(`https://admin.desh365.top/api/page/${id}`);
                    const data = response.data;
                    if (data.status) {
                        setPageData(data.data);
                    }
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching the data:', error);
                    setLoading(false);
                }
            };

            fetchPageData();
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!pageData) {
        return <p>No data found.</p>;
    }

    return (
        <div className='mt-32'>
            <h1>{pageData.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: pageData.page_body }} />
        </div>
    );
};

export default CategoryPage;
