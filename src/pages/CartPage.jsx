import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';

function CartPage() {
  const navigate = useNavigate();
  // Placeholder for cart items. In a real app, this would come from global state (Context, Redux) or local storage.
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('gallery_store_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('gallery_store_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (portraitId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.portrait.id === portraitId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (portraitId) => {
    setCartItems(prevItems => prevItems.filter(item => item.portrait.id !== portraitId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.portrait.price * item.quantity, 0);
  };

  const totalAmount = calculateTotal();

  // Temporary function to add a dummy item for testing
  const addDummyItem = () => {
    const dummyPortrait = {
      id: `dummy-${Math.random().toString(36).substring(7)}`,
      title: 'Sample Portrait',
      artist_name: 'Jane Doe',
      price: 150.00,
      image_url: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Sample',
    };
    setCartItems(prevItems => [...prevItems, { portrait: dummyPortrait, quantity: 1 }]);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center border border-gray-200">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
          <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200">
            Continue Shopping
          </Link>
          {/* <button onClick={addDummyItem} className="ml-4 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition-all duration-200">
            Add Dummy Item
          </button> */}
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {cartItems.map((item) => (
              <CartItem
                key={item.portrait.id}
                item={item}
                onRemove={removeItem}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="flex justify-between items-center text-lg font-medium text-gray-800 mb-4">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-gray-900 border-t border-gray-200 pt-4 mt-4">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full mt-6 px-6 py-3 bg-green-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
              >
                Proceed to Checkout
              </button>
              <Link to="/" className="block text-center mt-4 text-blue-600 hover:text-blue-700 transition-colors duration-200">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;