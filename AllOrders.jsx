import React, { useEffect, useState } from 'react';
import HeaderOwner from './partials/HeaderOwner';

function AllOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders(); // Fetch orders from backend
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/owners/all-orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.orders || []); // Update state with fetched orders
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Handle error state or retry logic here
    }
  };

  const toggleOrderDetails = (orderId) => {
    const detailsRow = document.getElementById(`details-${orderId}`);
    if (detailsRow) {
      detailsRow.classList.toggle('hidden');
    }
  };

  return (
    <>
      <HeaderOwner />
      <div className="font-sans bg-gray-100">
        <div className="w-full max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-10 text-center text-indigo-600">All Orders</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-6 bg-indigo-600 text-white text-left text-sm font-semibold">Order ID</th>
                  <th className="py-3 px-6 bg-indigo-600 text-white text-left text-sm font-semibold">Customer</th>
                  <th className="py-3 px-6 bg-indigo-600 text-white text-left text-sm font-semibold">Email</th>
                  <th className="py-3 px-6 bg-indigo-600 text-white text-left text-sm font-semibold">Total Amount</th>
                  <th className="py-3 px-6 bg-indigo-600 text-white text-left text-sm font-semibold">Order Date</th>
                  <th className="py-3 px-6 bg-indigo-600 text-white text-left text-sm font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 text-sm">{order._id}</td>
                      <td className="py-4 px-6 text-sm">{order.user.fullname}</td>
                      <td className="py-4 px-6 text-sm">{order.user.email}</td>
                      <td className="py-4 px-6 text-sm">₹ {order.totalAmount.toFixed(2)}</td>
                      <td className="py-4 px-6 text-sm">{new Date(order.createdAt).toLocaleString()}</td>
                      <td className="py-4 px-6 text-sm">
                        <button
                          onClick={() => toggleOrderDetails(order._id)}
                          className="text-indigo-500 hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                    <tr id={`details-${order._id}`} className="hidden">
                      <td colSpan="6" className="py-4 px-6">
                        <div className="p-6 bg-gray-100 rounded-lg">
                          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
                          <ul className="list-disc list-inside space-y-2">
                            {order.products.map((product) => (
                              <li key={product._id}>
                                {product.name} x {product.quantity} - ₹ {product.total.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                          <h3 className="text-xl font-semibold mt-4 mb-2">Billing Details</h3>
                          <p>{order.billingDetails.firstName} {order.billingDetails.lastName}</p>
                          <p>{order.billingDetails.address}, {order.billingDetails.city}, {order.billingDetails.state}, {order.billingDetails.zip}</p>
                          <p>Phone: {order.billingDetails.phone}</p>
                          <h3 className="text-xl font-semibold mt-4 mb-2">Shipping Details</h3>
                          <p>{order.shippingDetails.shippingFirstName} {order.shippingDetails.shippingLastName}</p>
                          <p>{order.shippingDetails.shippingAddress}, {order.shippingDetails.shippingCity}, {order.shippingDetails.shippingState}, {order.shippingDetails.shippingZip}</p>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllOrders;
