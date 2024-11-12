import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import IconTimer from './icons/Timericon';
import IconBag from './icons/Bagicon';
import IconBxDollarCircle from './icons/Icondollar';
import IconBxArrowBack from './icons/Arrowbackicon';
import IconStar from './icons/Staricon';
import IconStarPushed from './icons/Stariconpushed';

const Category = ({ selectedFilters, selectedFavorites, setSelectedFavorites }) => {
    const { id } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [categoryName, setCategoryName] = useState("Category");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryRecipes = async () => {
            setLoading(true);
            setError(null);

            try {
                const filters = selectedFilters && selectedFilters.length > 0 ? selectedFilters.join(',') : '';
                const response = await fetch(`/api/${id}/recipes?filters=${filters}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error("No recipes found for this category.");
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setCategoryName(data.categoryName);
                setRecipes(data.recipes);
            } catch (error) {
                console.error("Fetch error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryRecipes();
    }, [id, selectedFilters]);

    // Function to format time
    const formatTime = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return `${hours * 60 + minutes} mins`;
    };

    // Function to toggle favorites
    const toggleFavorite = (recipe) => {
        if (selectedFavorites.some((fav) => fav.id === recipe.id)) {
            // Remove from favorites
            setSelectedFavorites(selectedFavorites.filter((fav) => fav.id !== recipe.id));
        } else {
            // Add to favorites, including categoryId
            setSelectedFavorites([...selectedFavorites, { ...recipe, categoryId: id }]);
        }
    };

    return (
        <div className='w-full min-h-screen bg-[#201a17]'>
            <div className="max-w-[1200px] mx-auto flex flex-col items-center">
                <Link to="/" className="text-blue-300 hover:underline mb-4 mt-14">
                    <div className="flex space-x-2"><IconBxArrowBack /><p>Back to All Categories</p></div>
                </Link>
                <div className="my-6">
                    <h2 className="text-2xl text-gray-100 font-bold mb-4">{categoryName} Recipes</h2>
                </div>
                {loading && <p className="text-white">Loading recipes...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid gap-6 lg:gap-10 xl:gap-12 grid-cols-1 md:grid-cols-2 mb-8">
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="relative bg-white shadow w-[400px] lg:w-[500px] xl:w-[600px] rounded-xl overflow-hidden">
                            <div className='absolute top-1 right-1 cursor-pointer' onClick={() => toggleFavorite(recipe)}>
                                {selectedFavorites.some((fav) => fav.id === recipe.id) ? <IconStarPushed /> : <IconStar />}
                            </div>
                            <Link to={`/${id}/${recipe.id}`}>
                                <img src={recipe.image} alt={recipe.name} className="w-full h-60 lg:h-96 object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                                    <div className='flex flex-col items-center space-y-6'>
                                        <h4 className="text-lg font-semibold">{recipe.name}</h4>
                                        <div className='flex space-x-6 items-center'>
                                            <p className="flex items-center space-x-1">
                                                <IconTimer />
                                                <span>{formatTime(recipe.time)}</span>
                                            </p>
                                            <p className="flex items-center space-x-1">
                                                <IconBag />
                                                <span>{recipe.difficulty}</span>
                                            </p>
                                            <p className="flex items-center space-x-1">
                                                <IconBxDollarCircle />
                                                <span>{recipe.price}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;
