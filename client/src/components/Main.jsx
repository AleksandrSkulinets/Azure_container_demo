import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Main = ({ selectedFilters }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryCounts = async () => {
            setLoading(true);
            setError(null);

            let url = '/api/categories/count';
            if (selectedFilters.length > 0) {
                const filters = selectedFilters.join(',');
                url += `?filters=${filters}`;
            }

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch category counts');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching category counts:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryCounts();
    }, [selectedFilters]);

    return (
       <div className="w-full h-screen bg-[#201a17]">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
           

            
            <div className="mt-20 ">
                <h2 className="text-2xl text-gray-100 font-bold mb-4">Categories</h2>
            </div>
            {loading && <p>Loading categories...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mx-4">
                {categories.length > 0 ? (
                    categories.map(category => (
                        <Link
                            key={category.category_id}
                            to={`/${category.category_id}`}
                            className="shadow rounded-lg p-8 md:p-12 "
                            style={{ backgroundColor: category.color || '#FFFFFF' }}  // Set background color
                        >
                            <h4 className="my-4 text-xl text-gray-100 font-semibold">{category.category_name}</h4>
                            <p className="text-sm text-gray-100">Recipes: {category.recipe_count}</p>
                        </Link>
                    ))
                ) : (
                    !loading && <p>No categories found.</p>
                )}
            </div>
        </div>
    </div>
    );
};

export default Main;
