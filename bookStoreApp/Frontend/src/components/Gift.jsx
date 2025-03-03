import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import Slider from 'react-slick';

function Dashboard() {
  const { theme } = useTheme();

  const [coins, setCoins] = useState(500);
  const [coupons, setCoupons] = useState([
    '20% OFF on Electronics',
    '$10 Cashback on Groceries',
    'Buy 1 Get 1 Free',
  ]);
  const [redeemedCoupons, setRedeemedCoupons] = useState([]);
  const [orders, setOrders] = useState([
    { id: 1, status: 'Delivered', tracking: 'XYZ123', address: '123 Street, City A', date: '2024-12-25' },
    { id: 2, status: 'Shipped', tracking: 'ABC456', address: '456 Avenue, City B', date: '2024-12-28' },
    { id: 3, status: 'Pending', tracking: 'DEF789', address: '789 Boulevard, City C', date: '2024-12-29' },
  ]);
  const [message, setMessage] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [redeemStatus, setRedeemStatus] = useState('');

  const handleCouponRedemption = (coupon) => {
    if (coins < 100) {
      setRedeemStatus('Not enough coins to redeem this coupon.');
      return;
    }
    setCoins(coins - 100);
    setRedeemedCoupons([...redeemedCoupons, coupon]);
    setMessage(`You have redeemed the coupon: ${coupon}`);
    setRedeemStatus('');
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen bg-${theme === 'light' ? 'gray-100' : 'gray-900'} text-${theme === 'light' ? 'gray-800' : 'gray-100'} flex flex-col`}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8"></h1>

          {/* Updated Slider */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Upcoming Sales</h2>
            <Slider {...sliderSettings}>
              <div className="relative w-full h-72 shadow-lg overflow-hidden rounded-lg">
                <img
                  src="https://img.freepik.com/free-photo/front-view-cyber-monday-composition_23-2149055989.jpg?ga=GA1.1.369964002.1736404008&semt=ais_hybrid"
                  alt="Winter Sale"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white">
                  Winter Sale - Up to 50% Off on Select Items!
                </div>
              </div>
              <div className="relative w-full h-72 shadow-lg overflow-hidden rounded-lg">
                <img
                  src="https://img.freepik.com/free-psd/horizontal-banner-template-sales_23-2149313293.jpg?ga=GA1.1.369964002.1736404008&semt=ais_hybrid"
                  alt="Flash Deals"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white">
                  Flash Deals - Limited Time Only!
                </div>
              </div>
              <div className="relative w-full h-72 shadow-lg overflow-hidden rounded-lg">
                <img
                  src="https://img.freepik.com/free-vector/realistic-landing-page-template-cyber-monday-sales_23-2150924547.jpg?ga=GA1.1.369964002.1736404008&semt=ais_hybrid"
                  alt="Holiday Discounts"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white">
                  Holiday Discounts - Save Big on Gifts!
                </div>
              </div>
            </Slider>
          </div>

          {/* Dashboard Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Current Coins */}
            <div className={`bg-${theme === 'light' ? 'white' : 'gray-800'} shadow-md rounded-lg p-6`}>
              <h2 className="text-xl font-bold">Current Coins</h2>
              <p className="mt-4">You have:</p>
              <p className="text-3xl font-bold mt-2">{coins} Coins</p>
            </div>

            {/* Redeem Coins */}
            <div className={`bg-${theme === 'light' ? 'white' : 'gray-800'} shadow-md rounded-lg p-6`}>
              <h2 className="text-xl font-bold">Redeem Coins</h2>
              <button
                className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md"
                onClick={() => setMessage('Redeem Coins functionality coming soon!')}
              >
                Redeem Coins
              </button>
            </div>

            {/* Current Coupons */}
            <div className={`bg-${theme === 'light' ? 'white' : 'gray-800'} shadow-md rounded-lg p-6`}>
              <h2 className="text-xl font-bold">Current Coupons</h2>
              <ul className="mt-4">
                {coupons.map((coupon, index) => (
                  <li key={index} className="flex justify-between items-center py-2">
                    <span>{coupon}</span>
                    <button
                      className="text-blue-500"
                      onClick={() => handleCouponRedemption(coupon)}
                    >
                      Redeem
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Message */}
          {message && <div className="mt-6 text-center text-green-500 font-semibold">{message}</div>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
