// Wishlist.js
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext'; // Import CartContext

function Wishlist() {
  const { theme } = useTheme();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart(); // Get addToCart function from Cart context

  const handleMoveToCart = (item) => {
    addToCart(item); // Add item to the cart
    removeFromWishlist(item.id); // Remove from wishlist
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-gray-100'} flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8`}>
        <div className={`max-w-4xl w-full ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-lg rounded-lg p-8 space-y-6`}>
          <h1 className={`text-4xl font-bold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>Your Wishlist</h1>
          
          {wishlist.length > 0 ? (
            <div className="space-y-4">
              {wishlist.map((item) => (
                <div key={item.id} className={`p-4 rounded-lg border ${theme === 'light' ? 'border-gray-300 bg-white text-gray-800' : 'border-gray-700 bg-gray-700 text-gray-200'}`}>
                  <h2 className="text-2xl font-semibold">{item.title}</h2>
                  <p>Author: {item.author}</p>
                  <p>Price: ${item.price}</p>
                  <p>Date Added: {item.addedDate}</p>
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className={`mt-2 px-4 py-2 rounded ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-blue-400 text-gray-900'} hover:bg-blue-700`}
                  >
                    Move to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Your wishlist is currently empty.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Wishlist;
