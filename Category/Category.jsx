import React, { useState, useEffect } from 'react';
import './Category.css'; // Import CSS for styles (assuming you've separated styles into Category.css)

const Category = () => {
    const [categories, setCategories] = useState([]);

    // Fetch categories from backend API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/shop/categories');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    if (!categories || categories.length === 0) {
        return <div>No categories available</div>;
    }

    return (
        <div>
            <div className="container">
                <h1 className="text-3xl header-title mb-8 text-center">Categories</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {categories.map(category => (
                        <div key={category} className="category-card p-6 rounded-lg text-center">
                            <h2 className="text-2xl mb-2">{category}</h2>
                            <p className="text-lg mb-4">Explore our collection</p>
                            <div className="mt-6">
                                <a href={`/shop?category=${category}`} className="shop-now-btn py-2 px-6 rounded-full text-lg transition duration-300">Shop Now</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Category;
