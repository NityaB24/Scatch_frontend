import React, { useState, useEffect } from 'react';
import HeaderOwner from './partials/HeaderOwner';

function OwnerDashboard() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts(); // Fetch all products initially
  }, []);

  const fetchProducts = async () => {
    try {
      let url = '/api/owners/all-products';
      if (searchQuery) {
        url = `/api/owners/search?query=${encodeURIComponent(searchQuery)}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.products || []); // Update state with fetched products
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle error state or retry logic here
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderProductImage = (base64String) => {
    return `data:image/png;base64,${base64String}`;
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 300); // Debounce time set to 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <>
      <HeaderOwner />
      <div className="w-full min-h-screen flex flex-col lg:flex-row px-4 lg:px-20 py-20">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-1/4 flex flex-col mb-10 lg:mb-0">
          <div className="flex flex-col mb-10">
            <a className="block w-fit mb-2" href="/owners/all-products">All Products</a>
            <a className="block w-fit mb-2" href="/owners/create-product">Create New Product</a>
            <a className="block w-fit mb-2" href="/owners/all-orders">My Orders</a>
          </div>
          <div className="flex flex-col w-full">
            <form className="w-full">
              <input
                type="text"
                name="query"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="border p-2 rounded w-full lg:w-3/4 mb-4"
              />
            </form>
          </div>
        </div>
        {/* Main Content Area */}
        <div className="w-full lg:w-3/4 flex flex-wrap gap-5 overflow-auto">
          {products.map((product) => (
            <div key={product._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
              <div className="w-full h-52 flex items-center justify-center object-cover" style={{ backgroundColor: product.bgcolor }}>
                <img className="h-48" src={renderProductImage(product.image)} alt={product.name} />
              </div>
              <div className="flex justify-between items-center px-4 py-4" style={{ backgroundColor: product.panelcolor }}>
                <div style={{ color: product.textcolor }}>
                  <h3>{product.name}</h3>
                  <h4>₹ {product.price}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <a className="w-7 h-7 flex items-center justify-center rounded-full bg-white" href={`/owners/edit-product/${product._id}`}>
                    <i className="ri-edit-line"></i>
                  </a>
                  <form action={`/api/owners/delete-product/${product._id}`} method="post" onSubmit={(e) => confirm('Are you sure you want to delete this product?') || e.preventDefault()}>
                    <button type="submit" className="w-7 h-7 flex items-center justify-center rounded-full bg-white">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OwnerDashboard;
