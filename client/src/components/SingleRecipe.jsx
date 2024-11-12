import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import IconTimer from './icons/Timericon';
import IconBag from './icons/Bagicon';
import IconBxDollarCircle from './icons/Icondollar';
import IconBxArrowBack from './icons/Arrowbackicon';
import IconStar from './icons/Staricon';
import IconStarPushed from './icons/Stariconpushed';

const Recipe = ({ selectedFavorites, setSelectedFavorites }) => {
    const { id, recipeid } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/${id}/${recipeid}`);
                if (!response.ok) throw new Error('Failed to fetch recipe');
                const data = await response.json();
                setRecipe(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id && recipeid) {
            fetchRecipe();
        } else {
            setError("Invalid recipe or category ID.");
            setLoading(false);
        }
    }, [id, recipeid]);

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

    if (loading) return <p>Loading recipe...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        recipe && (
            <div className="w-full min-h-screen bg-[#201a17] flex flex-col items-center">
                <div className="max-w-[1200px] mx-auto p-4 mt-14">
                    <Link to={`/${id}`} className="text-blue-300 hover:underline">
                        <div className="flex space-x-2">
                            <IconBxArrowBack />
                            <p>Back to {recipe.categoryName}</p>
                        </div>
                    </Link>

                    <h2 className="text-3xl font-bold text-gray-100 mb-4">{recipe.name}</h2>
                    <p className="text-sm text-gray-100 mb-4">{recipe.categoryName}</p>

                    {/* Wrap image and star icon in a relative container */}
                    <div className="relative mb-6">
                        <div className='absolute top-1 right-1 cursor-pointer' onClick={() => toggleFavorite(recipe)}>
                            {selectedFavorites.some((fav) => fav.id === recipe.id) ? <IconStarPushed /> : <IconStar />}
                        </div>
                        <img src={recipe.image} alt={recipe.name} className="w-[500px] md:w-[700px] h-60 md:h-96 object-cover rounded-md" />
                    </div>

                    <div className="flex justify-center space-x-6 mb-6 text-gray-100">
                        <div className="flex items-center space-x-1">
                            <IconTimer />
                            <span>{formatTime(recipe.time)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <IconBag />
                            <span>{recipe.difficulty}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <IconBxDollarCircle />
                            <span>{recipe.price}</span>
                        </div>
                    </div>

                    <p className="text-gray-100 text-lg mb-4">{recipe.description}</p>

                    <h3 className="text-2xl font-semibold text-gray-100 mt-8 mb-4">Preparation Instructions</h3>
                    <p className="text-gray-100">{recipe.prep}</p>
                </div>
            </div>
        )
    );
};

export default Recipe;
