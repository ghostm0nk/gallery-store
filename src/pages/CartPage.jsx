import React from 'react';
import CartItem from '../components/CartItem';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

function CartPage() {
  // Mock cart items for now
  const mockCartItems = [
    {
      id: 'prod1',
      name: 'Abstract Horizon',
      artist: 'Jane Doe',
      price: 49.99,
      quantity: 1,
      thumbnailUrl: 'https://via.placeholder.com/80x60?text=Abstract+Horizon',
    },
    {
      id: 'prod2',
      name: 'City Lights',
      artist: 'John Smith',
      price: 75.00,
      quantity: 2,
      thumbnailUrl: 'https://via.placeholder.com/80x60?text=City+Lights',
    },
  ];

  const subtotal = mockCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Your Shopping Cart</h1>
      {mockCartItems.length === 0 ? (
        <div className="text-center text-xl text-gray-600 p-10 bg-white rounded-lg shadow-md">
          <p className="mb-4">Your cart is empty.</p>
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="lg:flex lg:space-x-8">
          <div className="lg:w-2/3">
            {mockCartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="lg:w-1/3 mt-8 lg:mt-0 bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="flex justify-between items-center mb-3">
              <p className="text-gray-700">Subtotal:</p>
              <p className="text-lg font-semibold text-gray-900">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
              <p className="text-xl font-bold text-gray-900">Total:</p>
              <p className="text-xl font-bold text-blue-600">${subtotal.toFixed(2)}</p>
            </div>
            <Link to="/checkout">
              <Button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;