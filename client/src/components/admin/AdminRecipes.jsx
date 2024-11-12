import React, { useEffect, useState } from 'react';

const AdminRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('http://localhost:5000/admin/recipes');
            const data = await response.json();
            setRecipes(data);
        };

        fetchRecipes();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mt-16">Manage Recipes</h2>
            <div className="mt-8 space-y-4">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="w-[300px] p-4 border-b flex justify-between">
                        <span>{recipe.name}</span>
                        <button className="text-red-500">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminRecipes;
