import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderShop from '../partials/Header';
import Footer from '../partials/Footer';

const CartPage = () => {
    const [products, setProducts] = useState([]);
    const [totalMRP, setTotalMRP] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('/api/cart');
                const { products: fetchedProducts, totalMRP: fetchedTotalMRP, totalDiscount: fetchedTotalDiscount } = response.data;

                const productsWithDefaultQuantity = fetchedProducts.map(product => ({
                    ...product,
                    quantity: product.quantity || 1
                }));

                setProducts(productsWithDefaultQuantity);
                setTotalMRP(fetchedTotalMRP);
                setTotalDiscount(fetchedTotalDiscount);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    const removeFromCart = async (productId) => {
        try {
            const response = await axios.delete(`/api/remove-from-cart/${productId}`);

            if (response.status === 200) {
                const updatedProducts = products.filter(product => product._id !== productId);
                setProducts(updatedProducts);
                console.log('Product removed from cart');
            } else {
                console.error('Failed to remove product from cart');
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            const response = await axios.put(`/api/update-cart/${productId}`, { quantity });
    
            if (response.status === 200) {
                // Update the products state with the updated quantity
                const updatedProducts = products.map(product =>
                    product._id === productId ? { ...product, quantity } : product
                );
                setProducts(updatedProducts);
    
                console.log('Product quantity updated');
            } else {
                console.error('Failed to update product quantity');
            }
        } catch (error) {
            console.error('Error updating product quantity:', error);
        }
    };
    

    const placeOrder = () => {
        window.location.href = '/checkout';
    };

    const renderProductImage = (base64String) => {
        return `data:image/png;base64,${base64String}`;
    };

    return (
        <div className="font-helvetica_now_display bg-gray-100">
            <HeaderShop />
            <div className="w-full max-w-5xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    <div className="flex-1 space-y-4">
                        {products.map(product => (
                            <div key={product._id} className="flex items-center bg-white shadow-md rounded-lg p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 border-2">
                                <div className="w-1/4">
                                    <img className="h-32 w-full object-cover-fit rounded-md" src={renderProductImage(product.image)} alt={product.name} />
                                </div>
                                <div className="w-3/4 pl-4">
                                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                    <div className="text-gray-600 mb-2 flex items-center">
                                        <span className="mr-2">Qty:</span>
                                        <select
                                            className="border rounded p-1"
                                            value={product.quantity}
                                            onChange={(e) => updateQuantity(product._id, parseInt(e.target.value, 10))}
                                        >
                                            {[...Array(10).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className="text-gray-600 mb-2">Price: ₹ {product.price}</p>
                                    {product.discount > 0 && (
                                        <p className="text-red-500 mb-2">Discount: ₹ {product.discount}</p>
                                    )}
                                    <p className="text-green-500 font-semibold">
                                        Total Price: ₹ {((product.price || 0) - (product.discount || 0)) * (product.quantity || 1)}
                                    </p>
                                </div>
                                <div className="ml-auto">
                                    <button className="text-red-500 hover:text-red-700 remove-from-cart" onClick={() => removeFromCart(product._id)}>
                                        <i className="ri-close-line text-2xl"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full lg:w-1/3 bg-gray-50 p-4 rounded-lg shadow-lg mt-8 lg:mt-0">
                        <h2 className="text-2xl font-semibold mb-4">Cart Details</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Total MRP</span>
                                <span>₹ {totalMRP}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount on MRP</span>
                                <span className="text-red-500">- ₹ {totalDiscount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Coupon Discount</span>
                                <span className="text-blue-500 cursor-pointer">Apply Coupon</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Platform Fee</span>
                                <span>FREE</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping Fee</span>
                                <span className="line-through">₹ 100</span><span>FREE</span>
                            </div>
                        </div>
                        <div className="border-t mt-4 pt-4">
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total Amount</span>
                                <span>₹ {(totalMRP - totalDiscount)}</span>
                            </div>
                        </div>
                        <button id="place-order" className="w-full mt-6 py-3 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-600" onClick={placeOrder}>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;
