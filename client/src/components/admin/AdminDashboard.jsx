import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 mt-16">Admin Dashboard</h1>
            <div className="mt-8 space-y-4">
                <Link to="/admin/categories" className="text-blue-500 hover:underline">
                    Manage Categories
                </Link>
                <Link to="/admin/recipes" className="text-blue-500 hover:underline">
                    Manage Recipes
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
