import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [totalMRP, setTotalMRP] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCheckoutData = async () => {
            try {
                const response = await axios.get('/api/checkout');
                if (response.status === 200) {
                    const { products, totalMRP, totalDiscount } = response.data;
                    setProducts(products);
                    setTotalMRP(totalMRP);
                    setTotalDiscount(totalDiscount);
                } else {
                    console.error('Failed to fetch checkout data');
                }
            } catch (error) {
                console.error('Error fetching checkout data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCheckoutData();
    }, []);

    // Calculate total amount on client-side to verify server-side calculations
    useEffect(() => {
        if (products.length > 0) {
            let computedTotalMRP = 0;
            let computedTotalDiscount = 0;

            products.forEach(product => {
                const price = product.price || 0;
                const discount = product.discount || 0;
                const quantity = product.quantity || 1;

                computedTotalMRP += price * quantity;
                computedTotalDiscount += discount * quantity;
            });

            setTotalMRP(computedTotalMRP);
            setTotalDiscount(computedTotalDiscount);
        }
    }, [products]);

    if (isLoading) {
        return <div>Loading...</div>; // Adjust this to your loading indicator or message
    }

    const totalAmount = totalMRP - totalDiscount;

    return (
        <div className="w-full max-w-5xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <form action="/api/place-order" method="POST">
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    <div className="flex-1 space-y-4">
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <input type="text" name="firstName" placeholder="First Name" className="border p-2 rounded-lg" required />
                                <input type="text" name="lastName" placeholder="Last Name" className="border p-2 rounded-lg" required />
                                <input type="email" name="email" placeholder="Email" className="border p-2 rounded-lg" required />
                                <input type="tel" name="phone" placeholder="Phone Number" className="border p-2 rounded-lg" required />
                                <input type="text" name="address" placeholder="Address" className="border p-2 rounded-lg" required />
                                <input type="text" name="city" placeholder="City" className="border p-2 rounded-lg" required />
                                <input type="text" name="state" placeholder="State" className="border p-2 rounded-lg" required />
                                <input type="text" name="zip" placeholder="Zip Code" className="border p-2 rounded-lg" required />
                            </div>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <input type="text" name="shippingFirstName" placeholder="First Name" className="border p-2 rounded-lg" required />
                                <input type="text" name="shippingLastName" placeholder="Last Name" className="border p-2 rounded-lg" required />
                                <input type="text" name="shippingAddress" placeholder="Address" className="border p-2 rounded-lg" required />
                                <input type="text" name="shippingCity" placeholder="City" className="border p-2 rounded-lg" required />
                                <input type="text" name="shippingState" placeholder="State" className="border p-2 rounded-lg" required />
                                <input type="text" name="shippingZip" placeholder="Zip Code" className="border p-2 rounded-lg" required />
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3 bg-gray-50 p-4 rounded-lg shadow-lg mt-8 lg:mt-0">
                        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-2">
                            {products.map((product, index) => {
                                const productTotal = (product.price - (product.discount || 0)) * (product.quantity || 1);
                                return (
                                    <div key={index} className="flex justify-between">
                                        <span>{product.name} x {product.quantity || 1}</span>
                                        <span>₹ {productTotal.toFixed(2)}</span>
                                    </div>
                                );
                            })}
                            <div className="border-t mt-4 pt-4">
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total Amount</span>
                                    <span>₹ {totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold mb-4 mt-8">Payment Information</h2>
                        <div className="space-y-4">
                            <input type="text" name="cardName" placeholder="Name on Card" className="border p-2 rounded-lg w-full" required />
                            <input type="text" name="cardNumber" placeholder="Card Number" className="border p-2 rounded-lg w-full" required />
                            <div className="flex space-x-4">
                                <input type="text" name="expiryDate" placeholder="MM/YY" className="border p-2 rounded-lg w-1/2" required />
                                <input type="text" name="cvv" placeholder="CVV" className="border p-2 rounded-lg w-1/2" required />
                            </div>
                        </div>
                        <button type="submit" className="w-full mt-6 py-3 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-600">
                            Place Order
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;