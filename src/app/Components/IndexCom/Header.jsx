import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://admin.desh365.top/api/structure');
                const data = response.data;
                if (data.status) {
                    setCategories(data.structure.category_menu);
                }
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };

        fetchCategories();
    }, []);

    const formatUrl = (url) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `https://${url}`;
    };

    return (
        <div>
            <ul className='flex gap-4'>
                {categories.map((category, index) => (
                    <li key={index}>
                        {category.key === 'category' ? (
                            <Link href={`/category/${category.id}`}>
                                <p>{category.name}</p>
                            </Link>
                        ) : category.key === 'page' ? (
                            <Link href={`/page/${category.id}`}>
                                <p>{category.name}</p>
                            </Link>
                        ) : category.key === 'customlink' ? (
                            <a href={formatUrl(category.id)} target="_blank" rel="noopener noreferrer">
                                <p>{category.name}</p>
                            </a>
                        ) : null}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Header;
