import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderOwner from './partials/HeaderOwner';

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetchProduct(); // Fetch product from backend
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/owners/edit-product/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setProduct(data.product); // Update state with fetched product
    } catch (error) {
      console.error('Error fetching product:', error);
      // Handle error state or retry logic here
    }
  };

  return (
    <>
      <HeaderOwner />
      <div className="min-h-screen flex flex-col px-4 lg:px-20 py-20">
        <div className="flex flex-col lg:flex-row flex-grow">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/4 flex flex-col mb-10 lg:mb-0">
            <div className="flex flex-col">
              <a className="block w-fit mb-2" href="/owners/all-products">All Products</a>
              <a className="block w-fit mb-2" href="/owners/create-product">Create New Product</a>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="w-full lg:w-3/4 bg-white p-8 shadow">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form autoComplete="off" action={`/api/products/edit-product/${id}`} method="post" encType="multipart/form-data">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Product Image</label>
                  <input name="image" type="file" className="py-2 px-4 rounded w-full" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <input name="name" type="text" placeholder="Product Name" defaultValue={product.name} className="border p-2 rounded w-full" />
                  <input name="price" type="text" placeholder="Product Price" defaultValue={product.price} className="border p-2 rounded w-full" />
                  <input name="discount" type="text" placeholder="Discount Price" defaultValue={product.discount} className="border p-2 rounded w-full" />
                  <input name="category" type="text" placeholder="Category Name" defaultValue={product.category} className="border p-2 rounded w-full" />
                  <input name="description" type="text" placeholder="Description" defaultValue={product.description} className="border p-2 rounded w-full" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Panel Details</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <input name="bgcolor" type="text" placeholder="Background Color" defaultValue={product.bgcolor} className="border p-2 rounded w-full" />
                  <input name="panelcolor" type="text" placeholder="Panel Color" defaultValue={product.panelcolor} className="border p-2 rounded w-full" />
                  <input name="textcolor" type="text" placeholder="Text Color" defaultValue={product.textcolor} className="border p-2 rounded w-full" />
                </div>
              </div>
              <input className="px-5 py-2 rounded mt-3 bg-blue-500 text-white w-full lg:w-auto" type="submit" value="Update Product" />
            </form>
          </main>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
