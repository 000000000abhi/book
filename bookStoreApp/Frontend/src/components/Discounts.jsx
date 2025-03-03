import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Discounts() {
  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get("http://localhost:2345/book");
        setDiscounts(response.data);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiscounts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 md:px-20 py-10 mt-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Special Discounts
        </h1>
        {isLoading ? (
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
            Loading discounts, please wait...
          </p>
        ) : discounts.length === 0 ? (
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
            No discounts available at the moment. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {discounts.map((discount) => (
              <div
                key={discount.id}
                className="relative rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-105"
              >
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                  {discount.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {discount.description}
                </p>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  Save Up To {discount.discountPercentage}% Off
                </div>
                <div className="absolute top-4 right-4 bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 text-sm font-medium px-3 py-1 rounded-full">
                  {discount.category}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Discounts;
