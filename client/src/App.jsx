import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Filters from './components/Filters';
import Category from './components/Category';
import Recipe from './components/SingleRecipe';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminCategories from './components/admin/AdminCategories';
import AdminRecipes from './components/admin/AdminRecipes';
import AdminLogin from './components/admin/AdminLogin';
import AdminHeader from './components/admin/AdminHeader';
import Favorites from './components/Favorites';

const App = () => {
    const [selectedFilters, setSelectedFilters] = useState(() => {
        const storedFilters = localStorage.getItem('selectedFilters');
        return storedFilters ? JSON.parse(storedFilters) : [];
    });
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [selectedFavorites, setSelectedFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('selectedFavorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });
    const [showFilters, setShowFilters] = useState(false); // Define showFilters state

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
    }, [selectedFilters]);

    useEffect(() => {
        localStorage.setItem('selectedFavorites', JSON.stringify(selectedFavorites));
    }, [selectedFavorites]);

    const toggleFilter = (updatedFilters) => {
        setSelectedFilters(updatedFilters);
    };

    const handleAdminLogin = () => {
        setIsAdminAuthenticated(true);
        navigate('/admin');
    };

    const handleAdminLogout = () => {
        setIsAdminAuthenticated(false);
        navigate('/admin-login');
    };

    return (
        <div>
            {!isAdminAuthenticated ? (
                <Header 
                    setShowFilters={setShowFilters} // Pass down the function to show filters
                    toggleFilter={toggleFilter} 
                    selectedFilters={selectedFilters} 
                />
            ) : (
                <AdminHeader />
            )}

            {/* Render Filters component when showFilters is true */}
            {showFilters && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded">
                        <Filters toggleFilter={toggleFilter} selectedFilters={selectedFilters} />
                        <button onClick={() => setShowFilters(false)} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Close</button>
                    </div>
                </div>
            )}

            <Routes>
                <Route path="/" element={<Main selectedFilters={selectedFilters} />} />
                <Route path="/filters" element={<Filters toggleFilter={toggleFilter} selectedFilters={selectedFilters} />} />
                <Route path="/:id" element={<Category selectedFilters={selectedFilters} selectedFavorites={selectedFavorites} setSelectedFavorites={setSelectedFavorites} />} />
                <Route path="/:id/:recipeid" element={<Recipe selectedFavorites={selectedFavorites} setSelectedFavorites={setSelectedFavorites} />} />
                <Route path="/favorites" element={<Favorites selectedFavorites={selectedFavorites} setSelectedFavorites={setSelectedFavorites} />} />
                <Route path="/admin-login" element={<AdminLogin onLogin={handleAdminLogin} />} />
                <Route path="/admin" element={isAdminAuthenticated ? <AdminDashboard onLogout={handleAdminLogout} /> : <Navigate to="/admin-login" />} />
                <Route path="/admin/categories" element={isAdminAuthenticated ? <AdminCategories /> : <Navigate to="/admin-login" />} />
                <Route path="/admin/recipes" element={isAdminAuthenticated ? <AdminRecipes /> : <Navigate to="/admin-login" />} />
            </Routes>
        </div>
    );
};

export default App;
