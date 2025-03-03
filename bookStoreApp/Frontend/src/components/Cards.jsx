import React, { useState } from "react";
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cards({ item }) {
  const { theme } = useTheme();
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const handleAddToWishlist = () => {
    addToWishlist(item);
    setStatusMessage("Added to wishlist!");
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleBuyNow = () => {
    addToCart(item);
    setStatusMessage("Added to cart!");
    setTimeout(() => navigate('/cart'), 500);
  };

  const handleCardClick = () => {
    console.log("Navigating to book with ISBN:", item.isbn);
    navigate(`/book/${item.isbn}`);
  };

  return (
    <div 
      className={`card w-full max-w-xs shadow-xl hover:scale-105 duration-200 border ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-slate-900 text-white'} transform transition-all hover:shadow-2xl`}
      onClick={handleCardClick}
    >
      <figure className="relative overflow-hidden">
        <img src={item.image} alt={item.name} className="object-cover h-48 w-full transition-transform duration-300 transform hover:scale-110" />
        <div className={`absolute top-0 right-0 m-2 badge badge-secondary ${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-700 text-white'}`}>
          {item.category}
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title flex justify-between items-center">
          {item.name}
        </h2>
        <p className="truncate">{item.title}</p>
        <div className="card-actions justify-between items-center">
          <div className={`badge badge-outline ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            ${item.price && !isNaN(item.price) ? item.price.toFixed(2) : "N/A"}
          </div>
          <div className="flex space-x-2">
            <button
              className={`px-2 py-1 rounded-full border-[2px] hover:bg-green-500 hover:text-white duration-200 ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} transform hover:scale-105`}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToWishlist();
              }}
            >
              Add to Wishlist
            </button>
            <button
              className="px-2 py-1 rounded-full border-[2px] bg-blue-500 text-white hover:bg-blue-700 duration-200 transform hover:scale-105 animate-pulse"
              onClick={(e) => {
                e.stopPropagation();
                handleBuyNow();
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
        {statusMessage && <div className="mt-2 text-green-600 animate-fade-in">{statusMessage}</div>}
      </div>
    </div>
  );
}

export default Cards;
