// Payment.js
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Payment() {
  const { theme } = useTheme();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [coupon, setCoupon] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  // Handle applying coupon
  const applyCoupon = () => {
    if (coupon) {
      setIsCouponApplied(true);
      alert('Coupon applied successfully!');
    }
  };

  // Handle selecting payment method
  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  // Handle payment submission
  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    if (selectedPaymentMethod) {
      alert(`Payment successful using ${selectedPaymentMethod}!`);
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-gray-100'} flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8`}>
        <div className={`max-w-4xl w-full ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-lg rounded-lg p-8 space-y-6`}>
          <h1 className={`text-4xl font-bold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>Payment</h1>

          {/* Coupon Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Apply Coupon</h2>
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full px-4 py-2 mb-2 rounded-md border border-gray-300 text-gray-800"
            />
            <button
              onClick={applyCoupon}
              disabled={isCouponApplied}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {isCouponApplied ? 'Coupon Applied' : 'Apply Coupon'}
            </button>
          </div>

          {/* Payment Options */}
          <form onSubmit={handlePaymentSubmit}>
            <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Credit Card"
                  checked={selectedPaymentMethod === 'Credit Card'}
                  onChange={() => handlePaymentMethodChange('Credit Card')}
                  className="form-radio text-blue-600"
                />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="PayPal"
                  checked={selectedPaymentMethod === 'PayPal'}
                  onChange={() => handlePaymentMethodChange('PayPal')}
                  className="form-radio text-blue-600"
                />
                <span>PayPal</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={selectedPaymentMethod === 'Cash on Delivery'}
                  onChange={() => handlePaymentMethodChange('Cash on Delivery')}
                  className="form-radio text-blue-600"
                />
                <span>Cash on Delivery</span>
              </label>
            </div>

            {/* Submit Payment */}
            <button
              type="submit"
              className="mt-6 w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Confirm Payment
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
