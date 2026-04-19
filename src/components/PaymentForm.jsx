import React, { useState } from 'react';

function PaymentForm({ onPaymentSuccess, onPaymentError, totalAmount }) {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // In a real application, you would integrate with a payment gateway (e.g., Stripe, PayPal) here.
    // This is a placeholder for demonstration.
    console.log('Processing payment for:', totalAmount);
    console.log('Card Details:', { cardNumber, expiry, cvc, nameOnCard });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate success or failure
      if (Math.random() > 0.1) { // 90% chance of success
        onPaymentSuccess({ transactionId: 'txn_' + Date.now() });
      } else {
        throw new Error('Payment failed. Please try again.');
      }
    } catch (error) {
      onPaymentError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="XXXX XXXX XXXX XXXX"
            required
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              id="expiry"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
            <input
              type="text"
              id="cvc"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="XXX"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700">Name on Card</label>
          <input
            type="text"
            id="nameOnCard"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-6 py-3 rounded-lg shadow-md text-white font-semibold transition-all duration-200
                      ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {loading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;