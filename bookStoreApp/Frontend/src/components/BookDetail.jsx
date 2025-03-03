import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext"; // Import useTheme for theme handling

function BookDetail() {
  const { isbn } = useParams(); // Get the ISBN from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { theme } = useTheme(); // Get the current theme from context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        if (!isbn) {
          console.error("No ISBN provided");
          return;
        }

        // Update the API call to use the route format /book/isbn/:isbn
        const response = await axios.get(`http://localhost:2345/book/isbn/${isbn}`);

        if (response.data) {
          setBook(response.data); // Assuming the response data is the full book object
        } else {
          setError("No book found");
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("Could not fetch book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [isbn]);

  const handleAddToCart = () => {
    addToCart(book);
    setStatusMessage("Added to cart!");
    setTimeout(() => navigate("/cart"), 500); // Redirect to cart after 500ms
  };

  const handleAddToWishlist = () => {
    addToWishlist(book);
    setStatusMessage("Added to wishlist!");
    setTimeout(() => setStatusMessage(""), 3000); // Hide status message after 3 seconds
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className={`container mx-auto px-4 md:px-20 py-10 ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-slate-900 text-white'}`}>
        <h1 className="text-4xl font-bold mb-4 mt-4">{book.title}</h1>
        <div className="flex items-center space-x-6 mb-4">
          <img src={book.image} alt={book.name} className="w-64 h-96 object-cover rounded-lg shadow-lg" />
          <div className="flex flex-col justify-between">
            <h2 className="text-2xl font-semibold mb-2">{book.introduction}</h2>
            <p className="mb-4">{book.description}</p>
            <div className="flex space-x-4">
              <button
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out"
                onClick={handleAddToWishlist}
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {statusMessage && <div className="mt-2 text-green-600">{statusMessage}</div>}

        <div className={`bg-gray-100 p-4 rounded-md shadow-md ${theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-800 text-white'}`}>
          <h3 className="text-xl font-semibold mb-2">Book Details</h3>
          <ul>
            <li><strong>Author:</strong> {book.name}</li>
            <li><strong>ISBN:</strong> {book.isbn}</li>
            <li><strong>Publisher:</strong> {book.publisher}</li>
            <li><strong>Printing Date:</strong> {book.printingDate}</li>
            <li><strong>Category:</strong> {book.category}</li>
            <li><strong>Price:</strong> ${book.price.toFixed(2)}</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookDetail;
