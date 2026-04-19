import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';
import { supabase } from '../lib/supabase';

function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'failed', 'processing'
  const [paymentMessage, setPaymentMessage] = useState('');
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const savedCart = localStorage.getItem('gallery_store_cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      const calculatedTotal = parsedCart.reduce((sum, item) => sum + item.portrait.price * item.quantity, 0);
      setTotalAmount(calculatedTotal);
    } else {
      navigate('/cart'); // Redirect if cart is empty
    }
  }, [navigate]);

  const handlePaymentSuccess = async (transactionDetails) => {
    setPaymentStatus('processing');
    setPaymentMessage('Payment successful, finalizing order...');

    if (!session?.user?.id) {
      setPaymentStatus('failed');
      setPaymentMessage('User not logged in. Cannot finalize order.');
      return;
    }

    try {
      const orderItems = cartItems.map(item => ({
        portrait_id: item.portrait.id,
        quantity: item.quantity,
        price: item.portrait.price
      }));

      const { data, error } = await supabase.from('orders').insert({
        user_id: session.user.id,
        total: totalAmount,
        status: 'completed',
        items: orderItems,
      }).select();

      if (error) {
        throw error;
      }

      setPaymentStatus('success');
      setPaymentMessage(`Order placed successfully! Transaction ID: ${transactionDetails.transactionId}`);
      localStorage.removeItem('gallery_store_cart'); // Clear cart after successful order
      setTimeout(() => navigate('/dashboard'), 3000); // Redirect to dashboard or order history
    } catch (error) {
      setPaymentStatus('failed');
      setPaymentMessage(`Error finalizing order: ${error.message}`);
    }
  };

  const handlePaymentError = (errorMessage) => {
    setPaymentStatus('failed');
    setPaymentMessage(`Payment failed: ${errorMessage}`);
  };

  if (!session) {
    return (
      <div className="text-center py-12 text-gray-700 text-xl">
        Please <Link to="/login" className="text-blue-600 hover:underline">log in</Link> to proceed to checkout.
      </div>
    );
  }

  if (cartItems.length === 0 && paymentStatus !== 'success') {
    return (
      <div className="text-center py-12 text-gray-700 text-xl">
        Your cart is empty. Please add items to your cart before checking out.
        <br />
        <Link to="/" className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Checkout</h1>

      {paymentStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline ml-2">{paymentMessage}</span>
        </div>
      )}
      {paymentStatus === 'failed' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{paymentMessage}</span>
        </div>
      )}
      {paymentStatus === 'processing' && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Processing...</strong>
          <span className="block sm:inline ml-2">{paymentMessage}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Details</h2>
            {cartItems.map((item) => (
              <div key={item.portrait.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-700">{item.portrait.title} x {item.quantity}</span>
                <span className="font-semibold text-gray-800">${(item.portrait.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200 text-xl font-bold text-gray-900">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3">
          <PaymentForm
            totalAmount={totalAmount}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;