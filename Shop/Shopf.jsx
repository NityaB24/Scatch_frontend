import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

const Shopf = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortby, setSortby] = useState('popular');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Fetch products and categories from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/shop?sortby=${sortby}&category=${selectedCategory}`);
                if (response.status === 200) {
                    const { products, categories, selectedCategory } = response.data;
                    setProducts(products);
                    setCategories(categories);
                    setSelectedCategory(selectedCategory);
                } else {
                    console.error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [sortby, selectedCategory]);

    // Filter products based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, products]);

    // Handle adding product to cart
    const handleAddToCart = async (productId) => {
        try {
            const response = await fetch(`/api/add-to-cart/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                // Handle success
                const flashMessage = document.createElement('div');
                flashMessage.classList.add('flash-message', 'slide-in');
                flashMessage.textContent = 'Product added to cart';
                document.body.appendChild(flashMessage);
                
                flashMessage.offsetHeight; // Trigger reflow
                
                setTimeout(() => {
                    flashMessage.classList.add('slide-out');
                    setTimeout(() => {
                        flashMessage.remove();
                    }, 500);
                }, 3000);
            } else {
                console.error('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const renderProductImage = (base64String) => {
        return `data:image/png;base64,${base64String}`;
    };

    // Render loading state if categories or products are not yet loaded
    if (!categories.length || !products.length) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="mt-7 px-4 md:px-8 lg:px-20 py-4 md:py-8">
                {/* Top panel - categories, sorting, search */}
                <div className="flex flex-col md:flex-row md:justify-between items-start mb-4 md:mb-8">
                    {/* Sort by dropdown */}
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <h3>Sort by</h3>
                        <select
                            className="border-[1px] px-2 py-1"
                            value={sortby}
                            onChange={(e) => setSortby(e.target.value)}
                        >
                            <option value="popular">Popular</option>
                            <option value="newest">Newest</option>
                            <option value="low-to-high">Low to High</option>
                            <option value="high-to-low">High to Low</option>
                        </select>
                    </div>
    
                    {/* Search input */}
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Search products..."
                        className="border-zinc-700 border-[1px] px-2 py-1 mb-4 md:mb-0 rounded-md"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
    
                    {/* Categories dropdown */}
                    <select
                        className="border-[1px] px-2 py-1 mb-4 md:mb-0"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
    
                {/* Bottom panel - products */}
                <div className="flex flex-wrap gap-4 md:gap-8" id="product-container">
                    {/* Render products */}
                    {filteredProducts.map((product, index) => (
                        <div
                            key={index}
                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border border-gray-200 rounded-lg overflow-hidden product-item transition-transform duration-300 ease-in-out transform hover:scale-105 hover:border-zinc-800"
                            data-name={product.name.toLowerCase()}
                        >
                            <a href={`/product/${product._id}`} className="block">
                                {/* Product image */}
                                <div
                                    className="h-52 flex items-center justify-center"
                                    style={{ backgroundColor: product.bgcolor }}
                                >
                                    <img
                                        className="h-[10rem] object-cover"
                                        src={renderProductImage(product.image)} alt={product.name}
                                    />
                                </div>
    
                                {/* Product details */}
                                <div
                                    className="flex justify-between items-center px-4 py-3"
                                    style={{ backgroundColor: product.panelcolor }}
                                >
                                    <h3 className="text-lg font-semibold mb-1" style={{ color: product.textcolor }}>
                                        {product.name}
                                    </h3>
                                    <p className="text-sm" style={{ color: product.textcolor }}>
                                        ₹ {product.price}
                                    </p>
                                </div>
                            </a>
    
                            {/* Add to cart button */}
                            <button
                                className="w-full py-2 transition-colors duration-300 ease-in-out rounded-b-lg add-to-cart"
                                style={{ backgroundColor: product.panelcolor, color: product.textcolor }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = product.bgcolor)}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = product.panelcolor)}
                                onClick={() => handleAddToCart(product._id)}
                            >
                                <i className="ri-add-line"></i> Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Shopf;
