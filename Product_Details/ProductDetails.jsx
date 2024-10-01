import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../partials/Header';
import './ProductDetails.css';
import Footer from '../partials/Footer';
const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [flashMessage, setFlashMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/product/${productId}`);
                setProduct(response.data.product);
            } catch (err) {
                setError('Error fetching product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const addToCart = async (productId) => {
        try {
            const response = await fetch(`/api/add-to-cart/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // Add any other headers as needed
                },
                // body: JSON.stringify({ productId }), // Include if you need to send JSON data
            });

            if (response.ok) {
                // Handle success (e.g., show flash message)
                const flashMessage = document.createElement('div');
                flashMessage.classList.add('flash-message', 'slide-in');
                flashMessage.textContent = 'Product added to cart';
                document.body.appendChild(flashMessage);
                
                // Trigger reflow to enable CSS transition
                flashMessage.offsetHeight; // This line is crucial for triggering the CSS transition
                
                // Automatically remove flash message after 5 seconds
                setTimeout(() => {
                    flashMessage.classList.add('slide-out');
                    setTimeout(() => {
                        flashMessage.remove();
                    }, 500); // Duration should match CSS transition duration
                }, 3000);
            } else {
                // Handle error
                console.error('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    if (!product) {
        return <div>Loading...</div>; // Add a loading indicator while fetching data
    }

    return (
        <>
        <Header/>
            <div className="container mx-auto py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Product Image Section */}
                    <div className="lg:w-1/2 flex justify-center items-center">
                        <div className="w-full h-[300px] lg:w-[460px] lg:h-[460px] bg-gray-100 flex justify-center items-center overflow-hidden rounded-lg shadow-lg">
                            <img src={`data:image/jpeg;base64,${product.image.toString('base64')}`} alt={product.name} className="object-cover" />
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="lg:w-1/2 flex flex-col justify-center">
                        <div className="bg-white p-8 rounded-lg border-2 shadow-lg">
                            <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
                            <p className="text-2xl text-gray-800 mb-4">₹ {product.price}</p>
                            <h3 className='font-semibold'>Description:</h3>
                            <p className="text-lg text-gray-700 mb-6">{product.description}</p>

                            {/* Add to Cart Button */}
                            {/* <button className="px-6 py-3 bg-blue-500 text-white rounded-full mr-4 hover:bg-blue-600 add-to-cart" onClick={() => addToCart(product._id)}>Add to Cart</button> */}

                            <button className="CartBtn " onClick={() => addToCart(product._id)}>
                                <span className="IconContainer "> 
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                                </span>
                                <p className="text">Add to Cart</p>
                                </button>

                            {/* Flash Message Placeholder */}
                            {/* {flashMessage && (
                                <div className={`flash-message slide-in`}>
                                    {flashMessage}
                                </div>
                            )} */}

                            {/* Shipping and Return Details */}
                            <div className="mt-8 space-y-4 text-gray-600">
                                <div className="flex items-center">
                                    <i className="ri-truck-line text-xl mr-2"></i>
                                    Free shipping on orders over ₹130
                                </div>
                                <div className="flex items-center">
                                    <i className="ri-refresh-line text-xl mr-2"></i>
                                    Free return for 30 days
                                </div>
                                <div className="flex items-center">
                                    <i className="ri-bike-line text-xl mr-2"></i>
                                    Bicycles are partially assembled with transport insurance
                                </div>
                                <div className="flex items-center">
                                    <i className="ri-timer-line text-xl mr-2"></i>
                                    Fast delivery
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <Footer/>
        </>
    );
};

export default ProductDetails;
