import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HeaderShop from '../partials/Header';
import Footer from '../partials/Footer';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`/api/order-confirmation/${orderId}`);
                setOrder(response.data.order);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setError('Error fetching order details');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="font-sans bg-gray-100">
            <HeaderShop />
            <div className="w-full max-w-5xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-8 text-center">Order Confirmation</h1>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">Thank you for your purchase!</h2>
                    <p className="text-lg mb-4">Your order has been placed successfully.</p>
                    <div className="divide-y divide-gray-200">
                        {order.products.map((product) => (
                            <div key={product._id} className="py-4 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-lg font-semibold">{product.name}</span>
                                    <span className="text-sm text-gray-600">Quantity: {product.quantity}</span>
                                </div>
                                <div className="text-lg font-semibold text-gray-800">
                                    ₹ {((product.price || 0) - (product.discount || 0)) * (product.quantity || 1).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t mt-4 pt-4">
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total Amount</span>
                            <span className="text-xl text-green-600">₹ {order.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderConfirmation;
