import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconMenuLeftAlt from './icons/Menuicon';
import IconCloseSharp from "./icons/Closeicon";
import IconBurger from "./icons/Burgericon";
import IconSettingsSharp from "./icons/Filtersicon";
import IconStar from "./icons/Staricon";
import Filters from './Filters'; // Import the Filters component

const Header = ({ setShowFilters, toggleFilter, selectedFilters }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showFilters, setShowFiltersState] = useState(false); // Local state to manage Filters visibility

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleFiltersClick = () => {
        setShowFiltersState(true); // Show the Filters component
    };

    const handleCloseFilters = () => {
        setShowFiltersState(false); // Close the Filters component
    };

    return (
        <header className="fixed top-0 left-0 flex w-full h-[50px] bg-gray-800 border-gray-500 border-b z-20">
            {/* Hamburger Button */}
            <div className="relative w-6 h-6 m-2 cursor-pointer text-gray-300 z-50" onClick={toggleMenu}>
                {isOpen ? <IconCloseSharp /> : <IconMenuLeftAlt />}
            </div>

            {/* Slide-in Menu */}
            <div onMouseLeave={toggleMenu}
                className={`fixed top-0 left-0 h-full bg-gray-800 text-white md:w-1/4 w-1/2 transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"} z-40`}
            >
                <div className="flex flex-col justify-center items-center h-full space-y-6">
                    <h2 className="text-3xl">Menu</h2>
                    <ul className="space-y-8">
                        <li className="cursor-pointer hover:text-gray-400 text-2xl">
                            <Link to="/" onClick={toggleMenu}>
                                <div className="flex items-center space-x-2"><IconBurger /> <span>Categories</span></div>
                            </Link>
                        </li>
                        <li className="cursor-pointer hover:text-gray-400 text-2xl">
                            <div onClick={handleFiltersClick}>
                                <div className="flex items-center space-x-2"><IconSettingsSharp /> <span>Filters</span></div>
                            </div>
                        </li>
                        <li className="cursor-pointer hover:text-gray-400 text-2xl">
                            <Link to="/favorites" onClick={toggleMenu}>
                                <div className="flex items-center space-x-2"><IconStar /> <span>Favorites</span></div>
                            </Link>
                        </li>
                    </ul>

                    {/* Render Filters component if showFilters is true */}
                    {showFilters && (
                        <div className="w-full h-full overflow-y-auto">
                            <Filters 
                                toggleFilter={toggleFilter} 
                                selectedFilters={selectedFilters} 
                                onClose={handleCloseFilters} // Pass the close handler to Filters
                            />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
