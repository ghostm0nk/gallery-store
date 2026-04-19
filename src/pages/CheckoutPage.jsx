import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';

function CheckoutPage() {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleCustomerChange = (e) => {
    const { id, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handlePaymentChange = (e) => {
    const { id, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    alert('Order submitted! (This is a mock checkout)');
    console.log('Customer Info:', customerInfo);
    console.log('Payment Info:', paymentInfo);
    // In a real app, this would integrate with a payment gateway and backend
  };

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Checkout</h1>

      <form onSubmit={handleSubmitOrder} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Information</h2>
        <InputField
          label="Full Name"
          id="name"
          value={customerInfo.name}
          onChange={handleCustomerChange}
          required
        />
        <InputField
          label="Email Address"
          id="email"
          type="email"
          value={customerInfo.email}
          onChange={handleCustomerChange}
          required
        />
        <InputField
          label="Address"
          id="address"
          value={customerInfo.address}
          onChange={handleCustomerChange}
          required
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="City"
            id="city"
            value={customerInfo.city}
            onChange={handleCustomerChange}
            required
          />
          <InputField
            label="Zip Code"
            id="zip"
            value={customerInfo.zip}
            onChange={handleCustomerChange}
            required
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6">Payment Information</h2>
        <InputField
          label="Card Number"
          id="cardNumber"
          type="text"
          value={paymentInfo.cardNumber}
          onChange={handlePaymentChange}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          required
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Expiry Date"
            id="expiry"
            type="text"
            value={paymentInfo.expiry}
            onChange={handlePaymentChange}
            placeholder="MM/YY"
            required
          />
          <InputField
            label="CVV"
            id="cvv"
            type="text"
            value={paymentInfo.cvv}
            onChange={handlePaymentChange}
            placeholder="XXX"
            required
          />
        </div>

        <div className="border-t border-gray-200 pt-6 mt-8">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-bold text-gray-900">Order Total:</p>
            <p className="text-2xl font-bold text-blue-600">$124.99</p> {/* Placeholder total */}
          </div>
          <Button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg transform hover:scale-105"
          >
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;