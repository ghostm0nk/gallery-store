import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cartItems = [
    { id: '1', title: 'Portrait of Serenity', price: 199.99, quantity: 1 },
    { id: '2', title: 'Abstract Vision', price: 250.00, quantity: 1 },
  ];
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate payment processing
    try {
      // In a real app, this would involve sending payment details to a backend
      // which then interacts with Stripe or similar.
      console.log('Processing payment with data:', formData);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

      // After successful payment, create an order in Supabase
      // const { data, error } = await supabase.from('orders').insert({ ... });
      // if (error) throw error;

      alert('Order placed successfully!');
      navigate('/dashboard'); // Redirect to dashboard or order confirmation
    } catch (err) {
      setError('Payment failed. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-gray-700 text-sm font-semibold mb-2">Address</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="city" className="block text-gray-700 text-sm font-semibold mb-2">City</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="zip" className="block text-gray-700 text-sm font-semibold mb-2">Zip Code</label>
              <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="country" className="block text-gray-700 text-sm font-semibold mb-2">Country</label>
              <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Information</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="sm:col-span-2">
              <label htmlFor="cardName" className="block text-gray-700 text-sm font-semibold mb-2">Name on Card</label>
              <input type="text" id="cardName" name="cardName" value={formData.cardName} onChange={handleChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-semibold mb-2">Card Number</label>
              <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="cardExpiry" className="block text-gray-700 text-sm font-semibold mb-2">Expiry Date (MM/YY)</label>
              <input type="text" id="cardExpiry" name="cardExpiry" value={formData.cardExpiry} onChange={handleChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="cardCvv" className="block text-gray-700 text-sm font-semibold mb-2">CVV</label>
              <input type="text" id="cardCvv" name="cardCvv" value={formData.cardCvv} onChange={handleChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Processing Payment...' : `Pay $${total.toFixed(2)}`}
          </button>
        </form>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2 border-b border-gray-100 pb-2">
              <span className="text-gray-700">{item.title} (x{item.quantity})</span>
              <span className="text-gray-900 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4 mb-2">
            <span className="text-gray-700">Subtotal:</span>
            <span className="text-gray-900 font-semibold">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700">Shipping:</span>
            <span className="text-gray-900 font-semibold">Free</span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-200 pt-4">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-xl font-bold text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;