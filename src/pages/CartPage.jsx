import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const cartItems = [
    { id: '1', title: 'Portrait of Serenity', artist: 'Jane Doe', price: 199.99, quantity: 1, imageUrl: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Abstract Vision', artist: 'John Smith', price: 250.00, quantity: 1, imageUrl: 'https://via.placeholder.com/150' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-700 text-lg">Your cart is empty.</p>
          <Link to="/" className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Start Browsing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
                <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-md mr-4" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm">By {item.artist}</p>
                  <p className="text-blue-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Qty: {item.quantity}</span>
                  <button className="text-red-500 hover:text-red-700 transition-colors duration-200">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Subtotal:</span>
              <span className="text-gray-900 font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700">Shipping:</span>
              <span className="text-gray-900 font-semibold">Free</span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
              <span className="text-xl font-bold text-gray-800">Total:</span>
              <span className="text-xl font-bold text-blue-600">${subtotal.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="mt-6 w-full block text-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 transform hover:scale-105">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;