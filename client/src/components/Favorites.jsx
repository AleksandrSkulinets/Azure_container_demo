import React from 'react';
import { Link } from 'react-router-dom';
import IconTimer from './icons/Timericon';
import IconBag from './icons/Bagicon';
import IconBxDollarCircle from './icons/Icondollar';
import IconBxArrowBack from './icons/Arrowbackicon';
import IconStar from './icons/Staricon';
import IconStarPushed from './icons/Stariconpushed';

const Favorites = ({ selectedFavorites, setSelectedFavorites }) => {
    // Function to format time
    const formatTime = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return `${hours * 60 + minutes} mins`;
    };

    // Function to remove from favorites
    const toggleFavorite = (recipe) => {
        setSelectedFavorites(selectedFavorites.filter((fav) => fav.id !== recipe.id));
    };

    return (
        <div className='w-full min-h-screen bg-[#201a17]'>
            <div className="max-w-[1200px] mx-auto flex flex-col items-center">
                <Link to="/" className="text-blue-300 hover:underline mb-4 mt-14">
                    <div className="flex space-x-2"><IconBxArrowBack /><p>Back to All Categories</p></div>
                </Link>
                <div className="my-6">
                    <h2 className="text-2xl text-gray-100 font-bold mb-4">Favorite Recipes</h2>
                </div>
                {selectedFavorites.length === 0 && <p className="text-white">No favorite recipes yet!</p>}
                <div className="grid gap-6 lg:gap-10 xl:gap-12 grid-cols-1 md:grid-cols-2 mb-8">
                    {selectedFavorites.map(recipe => (
                        <div key={recipe.id} className="relative bg-white shadow w-[400px] lg:w-[500px] xl:w-[600px] rounded-xl overflow-hidden">
                            <Link to={`/${recipe.categoryId}/${recipe.id}`}>
                                <img src={recipe.image} alt={recipe.name} className="w-full h-60 lg:h-96 object-cover" />
                            </Link>
                            <div className='absolute top-1 right-1 cursor-pointer' onClick={(e) => {
                                e.stopPropagation(); // Prevent the click from triggering the Link component
                                toggleFavorite(recipe); // Remove from favorites
                            }}>
                                {/* Show filled star if recipe is a favorite */}
                                {selectedFavorites.some((fav) => fav.id === recipe.id) ? <IconStarPushed /> : <IconStar />}
                            </div>
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Favorites;
