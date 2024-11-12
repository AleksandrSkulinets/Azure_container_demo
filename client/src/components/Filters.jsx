import React, { useEffect, useState } from 'react';

const Filters = ({ toggleFilter, selectedFilters, onClose }) => { // Accept onClose as prop
    const [filterOptions, setFilterOptions] = useState([]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const response = await fetch('/api/filters');
                if (!response.ok) throw new Error('Failed to fetch filters');
                const data = await response.json();
                setFilterOptions(data);
            } catch (error) {
                console.error('Error fetching filters:', error);
            }
        };

        fetchFilters();
    }, []);

    const handleToggleFilter = (filterId) => {
        const updatedFilters = selectedFilters.includes(filterId)
            ? selectedFilters.filter(id => id !== filterId)
            : [...selectedFilters, filterId];

        toggleFilter(updatedFilters);
    };

    return (
        <div className='fixed top-0 left-0 h-full bg-gray-800 text-white w-full flex flex-col items-center justify-center'>
            <div className="mt-12">
                <h2 className="text-xl text-gray-100 font-semibold mb-4" onClick={onClose} >Close Filters</h2>
                
            </div>
            <div className="flex flex-col gap-6 mt-10">
                {filterOptions.map(filter => (
                    <label 
                        key={filter.id} 
                        className="inline-flex items-center cursor-pointer space-x-3"
                    >
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={selectedFilters.includes(filter.id)}
                            onChange={() => handleToggleFilter(filter.id)}
                        />
                        <div className={`relative w-11 h-6 rounded-full transition-all duration-300 
                            ${selectedFilters.includes(filter.id) ? 'bg-green-600' : 'bg-gray-200'}
                            peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800`}
                        >
                            <div className={`absolute top-0.5 start-[2px] h-5 w-5 rounded-full bg-white border border-gray-300 transition-transform
                                ${selectedFilters.includes(filter.id) ? 'translate-x-full rtl:-translate-x-full' : ''}`}
                            ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-300">{filter.name}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Filters;
