import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortby, setSortby] = useState('popular');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/shop', {
                    params: {
                        category: selectedCategory,
                        sortby: sortby,
                    },
                });
                setProducts(response.data.products);
                setCategories(response.data.categories);
            } catch (err) {
                setError('Error fetching products');
                console.error(err);
            }
        };

        fetchProducts();
    }, [selectedCategory, sortby]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortby(event.target.value);
    };

    const renderProductImage = (base64String) => {
        return `data:image/png;base64,${base64String}`;
    };

    return (
        <div>
            <h1>Shop</h1>
            {error && <p>{error}</p>}
            <div>
                <label htmlFor="category">Category: </label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <label htmlFor="sortby">Sort by: </label>
                <select id="sortby" value={sortby} onChange={handleSortChange}>
                    <option value="popular">Popular</option>
                    <option value="newest">Newest</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                </select>
            </div>

            <div className="product-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        {product.image ? (
                            <img src={renderProductImage(product.image)} alt={product.name} />
                        ) : (
                            <div className="placeholder-image">No Image Available</div>
                        )}
                        <h2>{product.name}</h2>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
