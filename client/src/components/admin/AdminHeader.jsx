import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    return (
        <div className="fixed top-0  bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-5">
                <h2 className="text-2xl font-bold mb-4">Admin Menu</h2>
                <ul>
                    <li className="mb-2">
                        <Link to="/admin" className="hover:text-gray-300">Dashboard</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/admin/categories" className="hover:text-gray-300">Categories</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/admin/recipes" className="hover:text-gray-300">Recipes</Link>
                    </li>
                    {/* Add more links as needed */}
                </ul>
            </aside>

           
           
        </div>
    );
};

export default AdminHeader;
