import React, { useState } from 'react';
import HeaderOwner from './partials/HeaderOwner';
import './CreateProduct.css';

function CreateProduct({ success = "" }) {
  const [bgcolor, setBgColor] = useState('#FBFBFB');
  const [panelcolor, setPanelColor] = useState('#EBEBEB');
  const [textcolor, setTextColor] = useState('#717171');

  const handleInputChange = (e, setterFunction) => {
    let value = e.target.value.trim(); // Trim any whitespace
    if (!value.startsWith('#')) {
      value = `#${value}`;
    }
    setterFunction(value);
  };

  return (
    <>
      <HeaderOwner />
      {success && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 p-3 rounded-md bg-blue-500">
          <span className="inline-block mt-1 mb-1 text-white">
            {success}
          </span>
        </div>
      )}
      <div className="min-h-screen flex flex-col px-4 lg:px-20 py-20">
        <div className="flex flex-col lg:flex-row flex-grow">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/4 flex flex-col mb-10 lg:mb-0">
            <div className="flex flex-col">
              <a className="block w-fit mb-2" href="/owners/all-products">All Products</a>
              <a className="block w-fit mb-2" href="/owners/create-product">Create New Product</a>
              <a className="block w-fit mb-2" href="/owners/all-orders">My Orders</a>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="w-full lg:w-3/4 bg-white p-8 shadow lg:ml-4">
            <h2 className="text-xl font-bold mb-4">Create New Product</h2>
            <form autoComplete="off" action="/api/products/create" method="post" encType="multipart/form-data">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Product Image</label>
                  <input name="image" type="file" className="py-2 px-4 rounded w-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="name" type="text" placeholder="Product Name" className="border p-2 rounded w-full" />
                  <input name="price" type="text" placeholder="Product Price" className="border p-2 rounded w-full" />
                  <input name="discount" type="text" placeholder="Discount Price" className="border p-2 rounded w-full" />
                  <input name="category" type="text" placeholder="Category Name" className="border p-2 rounded w-full" />
                  <input name="description" type="text" placeholder="Description" className="border p-2 rounded w-full" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Panel Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <input
                      name="bgcolor"
                      type="text"
                      placeholder="Background Color"
                      className="border p-2 rounded w-full"
                      value={bgcolor}
                      onChange={(e) => handleInputChange(e, setBgColor)}
                    />
                    <h4 className="mt-2 font-thin">Background Color</h4>
                  </div>
                  <div className="flex flex-col">
                    <input
                      name="panelcolor"
                      type="text"
                      placeholder="Panel Color"
                      className="border p-2 rounded w-full"
                      value={panelcolor}
                      onChange={(e) => handleInputChange(e, setPanelColor)}
                    />
                    <h4 className="mt-2 font-thin">Panel Color</h4>
                  </div>
                  <div className="flex flex-col">
                    <input
                      name="textcolor"
                      type="text"
                      placeholder="Text Color"
                      className="border p-2 rounded w-full"
                      value={textcolor}
                      onChange={(e) => handleInputChange(e, setTextColor)}
                    />
                    <h4 className="mt-2 font-thin">Text Color</h4>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <button type="submit" className="button">
                  <span className="button_lg">
                    <span className="button_sl"></span>
                    <span className="button_text">Create New Product</span>
                  </span>
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}

export default CreateProduct;
