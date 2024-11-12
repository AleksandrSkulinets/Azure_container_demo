import React, { useEffect, useState } from 'react';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/admin/getallcategories');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch categories');
                }
                const data = await response.json();
                if (data.success && Array.isArray(data.categories)) {
                    setCategories(data.categories);
                } else {
                    console.error("Unexpected response format:", data);
                    setCategories([]);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategories([]);
            }
        };

        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        if (newCategoryName.trim() === "") return;

        try {
            const response = await fetch('http://localhost:5000/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCategoryName })
            });

            if (response.ok) {
                const newCategory = await response.json();
                setCategories(prevCategories => [...prevCategories, newCategory]);
                setNewCategoryName("");
            } else {
                console.error("Failed to add category:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/admin/categories/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setCategories(categories.filter(category => category.cat_id !== id)); // Use cat_id here
            } else {
                console.error("Failed to delete category:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const handleEditCategory = (id, name) => {
        setEditCategoryId(id);
        setEditCategoryName(name);
    };

    const handleUpdateCategory = async () => {
        if (editCategoryName.trim() === "") return;

        try {
            const response = await fetch(`http://localhost:5000/admin/categories/${editCategoryId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editCategoryName })
            });

            if (response.ok) {
                setCategories(categories.map(category =>
                    category.cat_id === editCategoryId ? { ...category, name: editCategoryName } : category
                ));
                setEditCategoryId(null);
                setEditCategoryName("");
            } else {
                console.error("Failed to update category:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center p-8">
            <h2 className="text-2xl font-bold text-gray-800 mt-16">Manage Categories</h2>
            <div className="mt-4">
                <input 
                    type="text" 
                    value={newCategoryName} 
                    onChange={(e) => setNewCategoryName(e.target.value)} 
                    placeholder="New category name" 
                    className="p-2 border rounded mr-2"
                />
                <button onClick={handleAddCategory} className="p-2 bg-blue-500 text-white rounded">Add Category</button>
            </div>

            <table className="mt-8 w-full bg-white rounded shadow">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Category Name</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.cat_id} className="border-b">
                            <td className="p-2">
                                {editCategoryId === category.cat_id ? (
                                    <input 
                                        type="text" 
                                        value={editCategoryName} 
                                        onChange={(e) => setEditCategoryName(e.target.value)} 
                                        className="p-1 border rounded"
                                    />
                                ) : (
                                    category.name
                                )}
                            </td>
                            <td className="p-2">
                                {editCategoryId === category.cat_id ? (
                                    <>
                                        <button onClick={handleUpdateCategory} className="text-green-500">Save</button>
                                        <button onClick={() => setEditCategoryId(null)} className="text-red-500 ml-2">Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditCategory(category.cat_id, category.name)} className="text-blue-500">Edit</button>
                                        <button onClick={() => handleDeleteCategory(category.cat_id)} className="text-red-500 ml-2">Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCategories;
