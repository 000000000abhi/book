import React, { useContext } from 'react';
import { useTheme } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; // Import WishlistContext
import { useNavigate } from 'react-router-dom'; // For navigation to payment page
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Cart() {
  const { theme } = useTheme();
  const { cartItems, updateQuantity, removeFromCart, addToCart } = useContext(CartContext);
  const { wishlist } = useWishlist(); // Change this to match your context export
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleCheckout = () => {
    navigate('/payment'); // Redirect to the Payment page
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'} ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'} flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8`}>
        <div className={`max-w-4xl w-full ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-lg rounded-lg p-8 space-y-6`}>
          <h1 className={`text-4xl font-bold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className={`${theme === 'light' ? 'text-gray-800' : 'text-gray-200'} text-center`}>
              <p>Your cart is currently empty.</p>
            </div>
          ) : (
            <div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className={`text-left border-b ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`}>
                    <th className={`pb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Item</th>
                    <th className={`pb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Quantity</th>
                    <th className={`pb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Price</th>
                    <th className={`pb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Total</th>
                    <th className={`pb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className={`border-b ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`}>
                      <td className={`py-4 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>{item.name}</td>
                      <td className={`py-4 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                          className={`w-16 ${theme === 'light' ? 'bg-white' : 'bg-gray-700'} ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'} border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md text-center`}
                        />
                      </td>
                      <td className={`py-4 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>${item.price.toFixed(2)}</td>
                      <td className={`py-4 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>${(item.price * item.quantity).toFixed(2)}</td>
                      <td className={`py-4`}>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={`mt-6 text-right ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                <h2 className="text-2xl font-semibold">Total: ${totalAmount.toFixed(2)}</h2>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              className={`bg-blue-500 ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'} px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300`}
              onClick={() => navigate('/course')} // Redirect to shop page
            >
              Continue Shopping
            </button>
            {cartItems.length > 0 && (
              <button
                onClick={handleCheckout}
                className={`bg-green-500 ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'} px-4 py-2 rounded-md hover:bg-green-600 transition duration-300`}
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>

        {/* Loved Items Section */}
        <div className={`max-w-4xl w-full ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-lg rounded-lg p-8 mt-6 space-y-6`}>
          <h1 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>Your Loved Items</h1>

          {wishlist.length === 0 ? ( // Change wishlistItems to wishlist
            <div className={`${theme === 'light' ? 'text-gray-800' : 'text-gray-200'} text-center`}>
              <p>Your wishlist is currently empty.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {wishlist.map((item) => ( // Change wishlistItems to wishlist
                <li key={item.id} className={`flex justify-between items-center border-b ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`}>
                  <span className={`py-4 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>{item.name}</span>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => addToCart(item)} // Add to cart when clicked
                  >
                    Add to Cart
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
